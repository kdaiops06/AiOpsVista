---
sidebar_position: 7
title: AI Gateway Architecture
description: Architecture patterns for AI gateways — centralized LLM access control, routing, rate limiting, cost management, and security enforcement.
keywords: [ai gateway, llm gateway, llm proxy, ai api gateway, llm routing, model routing]
---

# AI Gateway Architecture

How to build a centralized AI gateway for LLM access control, intelligent routing, rate limiting, cost management, and security policy enforcement.

## Why You Need an AI Gateway

As organizations scale LLM usage beyond a single application, common problems emerge:

| Problem | Without Gateway | With Gateway |
|---|---|---|
| **Cost visibility** | Each team has separate API keys, no aggregate view | Centralized cost tracking per team/app/user |
| **Security** | Each app implements its own input validation | Centralized prompt injection defense |
| **Rate limiting** | No cross-application rate control | Global and per-app token budgets |
| **Model access** | Teams use whatever model they want | Approved model catalog with routing |
| **Observability** | Fragmented logging across apps | Unified tracing and analytics |
| **Failover** | Single provider dependency | Automatic fallback to alternative models |
| **Compliance** | No audit trail of LLM interactions | Complete audit log with PII detection |

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Applications                           │
│                                                           │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │App 1 │  │App 2 │  │App 3 │  │Agent │  │Internal│    │
│  │(Chat)│  │(RAG) │  │(Code)│  │System│  │Tools   │    │
│  └──┬───┘  └──┬───┘  └──┬───┘  └──┬───┘  └──┬─────┘    │
│     └─────────┴─────────┴─────────┴─────────┘           │
│                         │                                 │
└─────────────────────────┼─────────────────────────────────┘
                          │ Unified API (OpenAI-compatible)
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    AI Gateway                            │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │              Request Pipeline                    │    │
│  │                                                  │    │
│  │  Auth → Rate Limit → Security → Route → Log     │    │
│  │   │        │            │          │        │    │    │
│  │   ▼        ▼            ▼          ▼        ▼    │    │
│  │ API key   Token     Lakera      Model    Langfuse│    │
│  │ / JWT     budget    Guard       selector  trace  │    │
│  │ / OAuth   enforce   scan       (cost/     store  │    │
│  │           per app              quality)          │    │
│  └──────────────────────────┬──────────────────────┘    │
│                              │                           │
│  ┌──────────────────────────▼──────────────────────┐    │
│  │              Model Router                        │    │
│  │                                                  │    │
│  │  ┌─────────────┐  ┌─────────────────────────┐   │    │
│  │  │ Cost-based  │  │ Quality-based           │   │    │
│  │  │ routing     │  │ routing                 │   │    │
│  │  │ gpt-4o-mini │  │ Simple → small model    │   │    │
│  │  │ for simple  │  │ Complex → large model   │   │    │
│  │  │ queries     │  │ Code → specialized      │   │    │
│  │  └─────────────┘  └─────────────────────────┘   │    │
│  │                                                  │    │
│  │  ┌─────────────┐  ┌─────────────────────────┐   │    │
│  │  │ Failover    │  │ Load balancing          │   │    │
│  │  │ routing     │  │ across providers        │   │    │
│  │  │ Primary →   │  │ Round-robin with        │   │    │
│  │  │ Fallback    │  │ health checks           │   │    │
│  │  └─────────────┘  └─────────────────────────┘   │    │
│  └──────────────────────────────────────────────────┘    │
│                              │                           │
│  ┌──────────────────────────▼──────────────────────┐    │
│  │              Response Pipeline                   │    │
│  │                                                  │    │
│  │  Output scan → PII filter → Cost log → Return   │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
└──────────────────────────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌──────────┐   ┌──────────┐   ┌──────────┐
    │ OpenAI   │   │ Anthropic│   │ Self-    │
    │ API      │   │ API      │   │ hosted   │
    │          │   │          │   │ (vLLM)   │
    └──────────┘   └──────────┘   └──────────┘
```

## Core Components

### 1. Authentication & Authorization

Control which applications and users can access which models:

```python
# Gateway auth middleware
from fastapi import Depends, HTTPException

async def verify_gateway_access(api_key: str, request_model: str):
    """Verify application has access to the requested model."""
    app = await get_app_by_key(api_key)
    
    if not app:
        raise HTTPException(status_code=401, detail="Invalid API key")
    
    if request_model not in app.allowed_models:
        raise HTTPException(
            status_code=403, 
            detail=f"App '{app.name}' not authorized for model '{request_model}'"
        )
    
    return app
```

### 2. Rate Limiting & Token Budgets

Enforce per-application and per-user token budgets:

```python
async def enforce_token_budget(app_id: str, estimated_tokens: int):
    """Check and enforce token budgets before routing to LLM."""
    budget = await get_budget(app_id)
    
    if budget.used + estimated_tokens > budget.monthly_limit:
        raise HTTPException(
            status_code=429,
            detail=f"Monthly token budget exceeded ({budget.used}/{budget.monthly_limit})"
        )
    
    # Reserve tokens before making the call
    await reserve_tokens(app_id, estimated_tokens)
```

### 3. Intelligent Model Routing

Route requests to the optimal model based on complexity, cost, and requirements:

| Routing Strategy | Logic | Cost Impact |
|---|---|---|
| **Complexity-based** | Simple queries → small model, complex → large model | 40-60% savings |
| **Cost-based** | Route to cheapest model that meets quality threshold | 30-50% savings |
| **Failover** | Primary model → fallback model if primary fails/slow | Improved reliability |
| **Geography-based** | Route to nearest region for latency optimization | Improved latency |
| **Compliance-based** | Route regulated data to compliant model/region | Compliance assurance |

```python
async def route_request(request, app_config):
    """Intelligent model routing based on request characteristics."""
    
    # Complexity-based routing
    complexity = estimate_complexity(request.messages)
    
    if complexity == "simple" and app_config.cost_optimize:
        return ModelRoute(
            model="gpt-4o-mini",
            provider="openai",
            reason="simple_query_cost_optimize"
        )
    
    if complexity == "complex" or request.requires_reasoning:
        return ModelRoute(
            model="claude-sonnet-4-20250514",
            provider="anthropic",
            reason="complex_query_quality"
        )
    
    # Default route
    return ModelRoute(
        model=app_config.default_model,
        provider=app_config.default_provider,
        reason="default"
    )
```

### 4. Security Pipeline

Centralized security enforcement for all LLM interactions:

```
Request → Prompt Injection Scan → PII Detection → Model Call
                                                       │
Response ← PII Scan ← Output Validation ← Toxicity ←─┘
```

Integrate tools like [Lakera Guard](/docs/ai-tools/llm-security-tools) for prompt injection and [Guardrails AI](/docs/ai-tools/llm-security-tools) for output validation at the gateway level.

### 5. Observability

Unified tracing across all applications using [Langfuse](/docs/ai-tools/ai-observability-tools):

```python
from langfuse.decorators import observe

@observe(name="gateway_request")
async def process_gateway_request(request, app):
    """Gateway request with full observability."""
    langfuse_context.update_current_trace(
        user_id=request.user_id,
        metadata={
            "app": app.name,
            "model_requested": request.model,
            "model_routed": route.model,
            "routing_reason": route.reason,
        }
    )
    # ... process request
```

## Deployment Patterns

### Pattern 1: Reverse Proxy

Deploy as a reverse proxy that mimics the OpenAI API interface:

```yaml
# docker-compose.yml
services:
  ai-gateway:
    image: your-org/ai-gateway:latest
    ports:
      - "8080:8080"
    environment:
      OPENAI_API_KEY: ${OPENAI_API_KEY}
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY}
      LANGFUSE_HOST: http://langfuse:3000
      LAKERA_API_KEY: ${LAKERA_API_KEY}
    
  langfuse:
    image: langfuse/langfuse:latest
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://langfuse:password@postgres:5432/langfuse
```

Applications point to the gateway instead of directly to OpenAI/Anthropic:

```python
# Application code — no changes needed except base URL
import openai

client = openai.OpenAI(
    base_url="https://ai-gateway.internal.company.com/v1",
    api_key="app-specific-key",
)
```

### Pattern 2: Kubernetes Service Mesh

Deploy as a sidecar or service in a Kubernetes cluster:

```yaml
# k8s/gateway-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-gateway
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: ai-gateway
        image: your-org/ai-gateway:latest
        resources:
          requests:
            cpu: "500m"
            memory: "512Mi"
          limits:
            cpu: "2"
            memory: "2Gi"
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: ai-gateway
spec:
  selector:
    app: ai-gateway
  ports:
  - port: 443
    targetPort: 8080
```

## Example Stack Configuration

### Startup Gateway

```yaml
gateway:
  type: reverse proxy (LiteLLM)
  auth: API key per app
  rate_limiting: basic (per-key RPM)
  routing: single model (gpt-4o-mini)
  security: none (internal only)
  observability: Langfuse Cloud
```

### Enterprise Gateway

```yaml
gateway:
  type: custom FastAPI + Kubernetes
  auth: OAuth2 / JWT with RBAC
  rate_limiting: token budgets per team/app/user
  routing:
    - complexity-based (small → gpt-4o-mini, complex → claude-sonnet)
    - failover (OpenAI → Anthropic → self-hosted)
    - compliance (regulated → self-hosted vLLM)
  security:
    input: Lakera Guard (prompt injection)
    output: Guardrails AI (PII, toxicity)
    audit: complete request/response logging
  observability:
    tracing: Langfuse (self-hosted)
    dashboards: Grafana
    alerts: PagerDuty
  cost_management:
    budgets: per team with approval workflows
    reporting: weekly cost reports per app
    optimization: semantic caching (Redis)
```

## Implementation Checklist

- [ ] Choose gateway approach (LiteLLM proxy vs custom implementation)
- [ ] Implement authentication and per-application API keys
- [ ] Set up token budget enforcement with monitoring
- [ ] Deploy prompt injection scanning (Lakera Guard or equivalent)
- [ ] Implement model routing (cost-based, complexity-based, failover)
- [ ] Add unified observability with Langfuse tracing
- [ ] Create cost dashboards and budget alerts
- [ ] Set up PII detection for inputs and outputs
- [ ] Implement audit logging for compliance
- [ ] Deploy with HA (multiple replicas, health checks)

## Related

- [Secure LLM Pipelines →](./secure-llm-pipelines)
- [AI Observability Stack →](./ai-observability-stack)
- [Enterprise AI Security →](./enterprise-ai-security)
- [LLM Security Tools →](/docs/ai-tools/llm-security-tools)
- [AI Observability Tools →](/docs/ai-tools/ai-observability-tools)
- [AI Infrastructure Consulting →](/services)
