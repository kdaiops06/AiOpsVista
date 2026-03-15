---
sidebar_position: 4
title: DevOps for AI Systems
description: CI/CD pipelines, testing strategies, deployment patterns, and operational practices for AI applications — agents, RAG systems, and LLM-powered services.
keywords: [ai devops, ai cicd, agent deployment, crewai, autogen, ai agent testing, llm deployment, rag deployment]
---

# DevOps for AI Systems

How to build reliable CI/CD pipelines, testing strategies, and deployment infrastructure for AI applications — including autonomous agents, RAG pipelines, and LLM-powered services.

## Why Agent DevOps Is Different

Traditional microservices are deterministic — same input, same output. AI agents are:

- **Non-deterministic**: Same prompt can produce different tool calls
- **Multi-step**: Agents chain decisions, amplifying error probability
- **Resource-unpredictable**: Token usage varies wildly per execution
- **Tool-dependent**: Agents interact with external APIs, databases, file systems
- **Hard to test**: Success criteria are often qualitative, not binary

| DevOps Concern | Microservice | AI Agent |
|---|---|---|
| Testing | Unit + integration | Unit + integration + eval |
| Deployment | Blue-green / canary | Shadow mode + gradual rollout |
| Monitoring | Latency, errors | Latency, errors, quality, cost, tool success |
| Rollback | Code version | Code + model + prompt version |
| Cost control | Compute | Compute + tokens + API calls |
| Safety | Input validation | Input validation + output guardrails + action limits |

## Architecture Diagram

```
┌──────────────────────────────────────────────────────┐
│                    Agent Gateway                      │
│  ┌─────────┐  ┌──────────┐  ┌────────────────────┐  │
│  │ Auth &   │  │ Rate     │  │ Action Approval    │  │
│  │ Routing  │  │ Limiting │  │ (Human-in-loop)    │  │
│  └────┬─────┘  └────┬─────┘  └────────┬───────────┘  │
│       └──────────────┴────────────────┘               │
└───────────────────────┬──────────────────────────────┘
                        │
          ┌─────────────┴─────────────┐
          │                           │
    ┌─────▼──────┐            ┌───────▼──────┐
    │  CrewAI     │            │  AutoGen     │
    │  Agents     │            │  Agents      │
    ├────────────┤            ├──────────────┤
    │ Role-based │            │ Multi-agent  │
    │ Sequential │            │ Conversational│
    │ Workflows  │            │ Workflows    │
    └─────┬──────┘            └───────┬──────┘
          │                           │
    ┌─────▼───────────────────────────▼──────┐
    │            Tool Registry                │
    │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
    │  │Search│ │ DB   │ │ API  │ │ Code │  │
    │  │Tools │ │Tools │ │Tools │ │Exec  │  │
    │  └──────┘ └──────┘ └──────┘ └──────┘  │
    └─────────────────────────────────────────┘
```

## Testing Strategy

### Level 1: Unit Tests (Deterministic)

Test tool functions and data transformations independently:

```python
import pytest

def test_search_tool_returns_results():
    """Tool functions are deterministic — test like normal code."""
    results = search_knowledge_base("kubernetes pod crash")
    assert len(results) > 0
    assert all("kubernetes" in r.content.lower() for r in results)

def test_prompt_template_formatting():
    """Verify prompt templates produce valid prompts."""
    prompt = build_agent_prompt(
        role="SRE",
        task="Investigate high latency",
        context="p99 latency spiked to 5s"
    )
    assert "SRE" in prompt
    assert "high latency" in prompt
```

### Level 2: Integration Tests (Semi-Deterministic)

Test agent workflows with mocked LLM responses:

```python
from unittest.mock import patch

def test_incident_investigation_workflow():
    """Test agent decision flow with controlled LLM responses."""
    mock_responses = [
        "I'll check the metrics dashboard first.",
        "High CPU on node-3. Let me check pod logs.",
        "Root cause: memory leak in payment-service v2.3.1.",
    ]
    
    with patch("agent.call_llm", side_effect=mock_responses):
        result = run_incident_agent(
            alert="High latency on payment-service"
        )
    
    assert result.root_cause is not None
    assert "payment-service" in result.root_cause
    assert len(result.tools_used) >= 2
```

### Level 3: Evaluation Tests (Non-Deterministic)

Run agents against real LLMs and score outputs:

```python
def test_agent_quality_evaluation():
    """Run 20 scenarios and assert quality thresholds."""
    scenarios = load_test_scenarios("incident_investigation")
    scores = []
    
    for scenario in scenarios:
        result = run_incident_agent(alert=scenario.alert)
        score = evaluate_response(
            result.summary,
            scenario.expected_findings,
            criteria=["accuracy", "completeness", "actionability"]
        )
        scores.append(score)
    
    avg_score = sum(scores) / len(scores)
    assert avg_score >= 0.75, f"Quality below threshold: {avg_score:.2f}"
```

## CI/CD Pipeline

```yaml
# .github/workflows/agent-ci.yml
name: Agent CI/CD
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.txt
      - run: pytest tests/unit/ -v

  integration-tests:
    runs-on: ubuntu-latest
    needs: unit-tests
    steps:
      - uses: actions/checkout@v4
      - run: pytest tests/integration/ -v --mock-llm

  evaluation:
    runs-on: ubuntu-latest
    needs: integration-tests
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - run: pytest tests/eval/ -v --real-llm
      - run: python scripts/compare_eval_results.py
      # Fail if quality regression detected

  deploy-shadow:
    needs: evaluation
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - run: |
          # Deploy to shadow environment
          # Mirror production traffic, compare results
          kubectl apply -f k8s/shadow-deployment.yaml

  promote-production:
    needs: deploy-shadow
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production  # Requires manual approval
    steps:
      - run: kubectl apply -f k8s/production-deployment.yaml
```

## Deployment Patterns

### Shadow Mode

Run new agent version alongside production without affecting users:

1. Mirror all production requests to shadow agent
2. Compare shadow responses to production responses
3. Score quality delta automatically
4. Promote only if shadow quality >= production quality

### Gradual Rollout with Quality Gates

```
Phase 1: 5% traffic  → Monitor 1 hour → Quality check
Phase 2: 25% traffic → Monitor 2 hours → Quality check
Phase 3: 50% traffic → Monitor 4 hours → Quality check
Phase 4: 100% traffic
```

Each phase requires:
- Error rate < 1%
- Quality scores >= baseline
- Cost per request within 20% of baseline
- No critical safety incidents

## Operational Safety

### Action Budgets

Limit what agents can do per execution:

```python
class AgentSafetyConfig:
    max_llm_calls: int = 10        # Prevent infinite loops
    max_tool_calls: int = 20       # Limit external interactions
    max_tokens: int = 50_000       # Cost ceiling
    max_execution_time: int = 300  # 5-minute timeout
    
    # Dangerous actions require human approval
    requires_approval: list = [
        "delete_resource",
        "modify_production",
        "send_notification",
    ]
```

### Circuit Breakers

Automatically disable agents that malfunction:

```python
class AgentCircuitBreaker:
    def __init__(self, failure_threshold=5, reset_timeout=300):
        self.failures = 0
        self.threshold = failure_threshold
        self.reset_timeout = reset_timeout
    
    def record_failure(self):
        self.failures += 1
        if self.failures >= self.threshold:
            self.trip()
    
    def trip(self):
        """Disable agent, alert on-call, switch to fallback."""
        disable_agent()
        alert_oncall("Agent circuit breaker tripped")
        enable_fallback_workflow()
```

## RAG and LLM Pipeline CI/CD

Agent workflows are not the only AI systems that need CI/CD. RAG pipelines and LLM-powered APIs also require specialized deployment practices:

### RAG Pipeline Deployment Checklist

```yaml
# rag-ci-checks.yml — CI checks for RAG systems
rag_pipeline_checks:
  - name: "Embedding model version"
    check: "Verify embedding model matches production index"
    
  - name: "Retrieval quality"
    check: "Run eval suite against 50 test queries, assert recall > 0.8"
    
  - name: "Index freshness"
    check: "Verify vector index was rebuilt after document updates"
    
  - name: "Chunk size consistency"
    check: "Validate chunk size and overlap match production config"
    
  - name: "Prompt template diff"
    check: "Show prompt changes in PR review, run A/B eval"
```

### Prompt Version Management

Track prompt templates as versioned artifacts alongside code:

```python
# prompts/v2.3/rag_answer.yaml  (checked into Git)
# name: rag-answer
# version: 2.3
# model: gpt-4o
# temperature: 0.3

PROMPT_TEMPLATE = """You are a helpful assistant. Answer the user's question
using ONLY the provided context. If the context doesn't contain the answer,
say "I don't have enough information to answer that."

Context:
{context}

Question: {question}

Answer:"""
```

Every prompt change triggers:
1. Automated evaluation against test dataset
2. Quality score comparison vs current production prompt
3. PR review with before/after quality metrics
4. Staged rollout (5% → 25% → 100%) with rollback on quality drop

## Implementation Checklist

- [ ] Implement three-level testing (unit, integration, evaluation)
- [ ] Set up CI/CD pipeline with quality gates
- [ ] Deploy shadow mode infrastructure
- [ ] Configure action budgets and safety limits
- [ ] Add circuit breakers for production agents
- [ ] Set up cost monitoring and per-request budgets
- [ ] Implement gradual rollout with automated quality checks
- [ ] Create runbooks for agent incidents

## Recommended Tools

| Category | Tool | Purpose |
|----------|------|---------|
| **Agent Frameworks** | [AI Agent Frameworks →](/docs/ai-tools/ai-agent-frameworks) | Production agent orchestration platforms |
| **Observability** | [Langfuse →](/tools/langfuse-review) | Agent execution tracing and evaluation |
| **Observability** | [AI Observability Tools →](/docs/ai-tools/ai-observability-tools) | Monitoring tools for AI agent systems |
| **Security** | [SlashLLM →](/docs/ai-tools/slashllm) | Guardrails and cost controls for agent pipelines |
| **Comparison** | [CrewAI vs AutoGen →](/comparisons/crewai-vs-autogen) | Agent framework comparison for deployment decisions |

## Related Guides

- [AI Agent Infrastructure →](./ai-agent-infrastructure)
- [LLM Evaluation & Testing →](./llm-evaluation-testing)
- [Secure LLM Pipelines →](./secure-llm-pipelines)
- [AI Observability Stack →](./ai-observability-stack)
- [AI Gateway Architecture →](./ai-gateway-architecture)
- [AI Agent Frameworks →](/docs/ai-tools/ai-agent-frameworks)
- [CrewAI vs AutoGen →](/comparisons/crewai-vs-autogen)
- [Kubernetes Operations →](/docs/cloud-devops/kubernetes-operations)
- [Architecture Playbooks Index →](./architecture-playbooks)
- [AI Infrastructure Consulting →](/services)
