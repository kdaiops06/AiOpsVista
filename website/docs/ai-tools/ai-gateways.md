---
sidebar_position: 9
title: AI Gateways
description: AI gateway tools for LLM traffic management — routing, security enforcement, rate limiting, cost tracking, and multi-provider failover.
keywords: [ai gateway, llm gateway, llm routing, ai proxy, portkey, litellm, kong ai gateway]
---

# AI Gateways

AI gateways sit between your applications and LLM providers, providing centralized routing, security enforcement, cost tracking, and failover across multiple AI models.

## Why AI Gateways Exist

As organizations scale from one LLM application to many, common problems emerge:

| Problem | Without Gateway | With Gateway |
|---|---|---|
| **Multi-provider routing** | Each app manages its own API keys and endpoints | Centralized routing to any provider |
| **Rate limiting** | Per-app rate limit handling, inconsistent | Global rate limiting with per-user/app quotas |
| **Cost tracking** | Scattered billing across providers | Unified cost dashboard, per-feature attribution |
| **Security** | Each app implements its own input validation | Centralized security policies (prompt injection, PII) |
| **Failover** | App-level retry logic, provider outages cascade | Automatic provider failover with load balancing |
| **Observability** | Logging in each application | Centralized request/response logging |
| **Model upgrades** | Code changes in every app | Routing table change in gateway config |

## Tool Comparison

| Feature | Portkey | LiteLLM | Kong AI Gateway | SlashLLM |
|---|---|---|---|---|
| **Type** | Managed + OSS | Open-source proxy | Plugin for Kong | Enterprise platform |
| **Core Strength** | AI-specific gateway | OpenAI-compatible proxy | API gateway + AI | Security-first gateway |
| **LLM Providers** | 200+ | 100+ | OpenAI, Anthropic, etc. | All major providers |
| **Rate Limiting** | Yes | Basic | Advanced (Kong) | Yes |
| **Security** | Basic | Minimal | Plugin-based | Full stack (injection, PII, SOC) |
| **Cost Tracking** | Yes | Yes | Via plugins | Yes |
| **Failover** | Yes | Yes | Via plugins | Yes |
| **Caching** | Semantic cache | Simple cache | Via plugins | Yes |
| **Observability** | Built-in + integrations | Callbacks | Kong analytics | Built-in + SOC |
| **Self-hosted** | Yes | Yes | Yes | Check with vendor |
| **Open Source** | Yes (gateway) | Yes (Apache 2.0) | Partial (Kong OSS) | No |

## Portkey

**AI gateway with unified API, semantic caching, and observability for 200+ LLM providers.**

### Architecture

```
Application
    │
    ▼
┌──────────────────────────────────────────┐
│              Portkey Gateway             │
│                                          │
│  ┌────────────┐    ┌─────────────────┐  │
│  │ Unified    │    │ Routing Engine  │  │
│  │ API        │    │                 │  │
│  │            │    │ • Load balance  │  │
│  │ • OpenAI-  │    │ • Fallback      │  │
│  │   compatible│   │ • A/B testing   │  │
│  │ • Single   │    │ • Conditional   │  │
│  │   endpoint │    │   routing      │  │
│  └────────────┘    └─────────────────┘  │
│                                          │
│  ┌────────────┐    ┌─────────────────┐  │
│  │ Semantic   │    │ Request Logs    │  │
│  │ Cache      │    │ & Analytics     │  │
│  └────────────┘    └─────────────────┘  │
└──────────────────────────┬───────────────┘
                           │
            ┌──────────────┼──────────────┐
            ▼              ▼              ▼
      ┌──────────┐  ┌──────────┐  ┌──────────┐
      │ OpenAI   │  │ Anthropic│  │ Azure    │
      │          │  │          │  │ OpenAI   │
      └──────────┘  └──────────┘  └──────────┘
```

### Use Cases

- **Multi-provider routing** — Send traffic to the cheapest or fastest provider per request
- **Semantic caching** — Cache similar queries to reduce cost and latency
- **A/B testing** — Route traffic between model versions for quality comparison
- **Automatic failover** — Switch providers when one is down or rate-limited

### Deployment Pattern

```python
from portkey_ai import Portkey

portkey = Portkey(
    api_key="PORTKEY_API_KEY",
    config={
        "strategy": {
            "mode": "fallback",  # Try providers in order
        },
        "targets": [
            {"provider": "openai", "api_key": "...", "weight": 0.7},
            {"provider": "anthropic", "api_key": "...", "weight": 0.3},
        ],
        "cache": {"mode": "semantic", "max_age": 3600},
    },
)

response = portkey.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Explain Kubernetes HPA"}],
)
```

### When to Choose Portkey

Choose Portkey when you need multi-provider routing, semantic caching, and cost analytics without building custom infrastructure. Good for teams scaling from 1 to 10+ LLM applications.

---

## LiteLLM

**Open-source proxy that provides a unified OpenAI-compatible API for 100+ LLM providers.**

### Architecture

```
Application (OpenAI SDK)
    │
    ▼
┌──────────────────────────────────────────┐
│              LiteLLM Proxy               │
│                                          │
│  ┌────────────┐    ┌─────────────────┐  │
│  │ OpenAI-    │    │ Provider        │  │
│  │ Compatible │    │ Translation     │  │
│  │ API        │    │                 │  │
│  │            │    │ • OpenAI        │  │
│  │ /chat/     │    │ • Anthropic     │  │
│  │ completions│    │ • Bedrock       │  │
│  │            │    │ • Vertex AI     │  │
│  │ /embeddings│    │ • Ollama        │  │
│  │            │    │ • vLLM          │  │
│  └────────────┘    └─────────────────┘  │
│                                          │
│  ┌────────────┐    ┌─────────────────┐  │
│  │ Budget &   │    │ Logging         │  │
│  │ Rate Limit │    │ Callbacks       │  │
│  └────────────┘    └─────────────────┘  │
└──────────────────────────────────────────┘
```

### Use Cases

- **Provider abstraction** — Switch between LLM providers without changing application code
- **Self-hosted proxy** — Run alongside your infrastructure, no data leaves your network
- **Budget enforcement** — Set spending limits per user, team, or API key
- **Local development** — Proxy local models (Ollama, vLLM) through the same OpenAI-compatible API
- **Multi-cloud AI** — Route to Azure OpenAI, AWS Bedrock, or GCP Vertex AI through one API

### Deployment Pattern

```yaml
# litellm-config.yaml
model_list:
  - model_name: "gpt-4"
    litellm_params:
      model: "openai/gpt-4"
      api_key: "sk-..."
      
  - model_name: "gpt-4"
    litellm_params:
      model: "azure/gpt-4-deployment"
      api_base: "https://my-azure.openai.azure.com"
      api_key: "..."
      
  - model_name: "claude-3"
    litellm_params:
      model: "anthropic/claude-3-opus-20240229"
      api_key: "..."

router_settings:
  routing_strategy: "latency-based-routing"
  num_retries: 3
  fallbacks: [{"gpt-4": ["claude-3"]}]

general_settings:
  master_key: "sk-litellm-master-key"
```

```bash
# Deploy as Docker container
docker run -p 4000:4000 \
  -v ./litellm-config.yaml:/app/config.yaml \
  ghcr.io/berriai/litellm:main-latest \
  --config /app/config.yaml
```

```python
# Application code stays standard OpenAI SDK
import openai

client = openai.OpenAI(
    api_key="sk-litellm-master-key",
    base_url="http://litellm-proxy:4000",
)

response = client.chat.completions.create(
    model="gpt-4",  # Routed by LiteLLM
    messages=[{"role": "user", "content": "..."}],
)
```

### When to Choose LiteLLM

Choose LiteLLM when you need an open-source, self-hosted proxy for multi-provider routing. Best for teams that want provider abstraction with minimal vendor dependency.

---

## Kong AI Gateway

**Enterprise API gateway with AI-specific plugins for rate limiting, security, and analytics.**

### Architecture

```
Application
    │
    ▼
┌──────────────────────────────────────────┐
│            Kong API Gateway              │
│                                          │
│  ┌────────────┐    ┌─────────────────┐  │
│  │ Core       │    │ AI Plugins      │  │
│  │ Gateway    │    │                 │  │
│  │            │    │ • AI Proxy      │  │
│  │ • Auth     │    │ • AI Rate       │  │
│  │ • TLS      │    │   Limiting     │  │
│  │ • Routing  │    │ • AI Request    │  │
│  │ • Load     │    │   Transformer  │  │
│  │   Balance  │    │ • AI Analytics  │  │
│  └────────────┘    └─────────────────┘  │
└──────────────────────────────────────────┘
```

### Use Cases

- **Existing Kong users** — Add AI capabilities to an existing Kong deployment
- **Enterprise API management** — Unified gateway for both traditional APIs and LLM endpoints
- **Advanced authentication** — OAuth 2.0, JWT, mTLS for LLM API access
- **Compliance** — Enterprise audit logging and access control

### When to Choose Kong AI Gateway

Choose Kong when you already use Kong for API management and want to extend it for AI workloads. Not ideal as a standalone AI gateway — better as an add-on to existing Kong infrastructure.

## Integration with AI Infrastructure

AI gateways integrate at the ingress layer of the AI infrastructure stack:

- **Security layer**: Gateways enforce [prompt injection defense](/docs/ai-architecture/prompt-injection-defense) and [secure LLM pipeline](/docs/ai-architecture/secure-llm-pipelines) policies
- **Architecture**: Gateways implement the [AI gateway architecture](/docs/ai-architecture/ai-gateway-architecture) patterns
- **Observability**: Gateway logs and metrics feed into the [AI observability stack](/docs/ai-architecture/ai-observability-stack)
- **Kubernetes**: Gateways deploy as ingress controllers or sidecar proxies on [Kubernetes AI infrastructure](/docs/ai-architecture/ai-infrastructure-kubernetes)

For enterprise teams needing security-first gateway functionality with SOC monitoring, see [SlashLLM](./slashllm).

## Related

- [SlashLLM →](./slashllm)
- [LLM Security Tools →](./llm-security-tools)
- [AI Gateway Architecture →](/docs/ai-architecture/ai-gateway-architecture)
- [Secure LLM Pipelines →](/docs/ai-architecture/secure-llm-pipelines)
- [Prompt Injection Defense →](/docs/ai-architecture/prompt-injection-defense)
- [AI Infrastructure Consulting →](/services)
