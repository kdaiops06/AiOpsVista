---
sidebar_position: 3
title: AI Observability Stack
description: Production monitoring, tracing, and evaluation architecture for LLM applications — Langfuse, Phoenix, OpenTelemetry, and custom metrics.
keywords: [ai observability, llm monitoring, langfuse, ai tracing, llm evaluation]
---

# AI Observability Stack

How to build production-grade observability for LLM applications — tracing, evaluation, cost tracking, and quality monitoring.

## Why Standard APM Falls Short

Traditional APM tools (Datadog, New Relic, Grafana) treat LLM calls as opaque HTTP requests. They can tell you latency and error rates, but not:

- Which prompt version caused quality degradation
- Whether retrieval is returning relevant documents
- How much each feature costs in tokens
- If the LLM is hallucinating more than last week
- Why a specific user got a bad response

**LLM observability requires trace-level understanding of the AI pipeline.**

## Architecture

```
┌─────────────────────────────────────────────────┐
│              Application Layer                   │
│                                                  │
│  User Query → Retrieval → LLM → Post-process    │
│      │            │         │         │          │
│      └────────────┴─────────┴─────────┘          │
│                    │                              │
│          OpenTelemetry Spans                      │
└────────────────────┬────────────────────────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
    ┌─────▼──────┐      ┌──────▼──────┐
    │  Langfuse  │      │   Phoenix   │
    │ (Production│      │ (Dev-time   │
    │  Monitoring│      │  Analysis)  │
    ├────────────┤      ├─────────────┤
    │ Traces     │      │ RAG Quality │
    │ Costs      │      │ Embeddings  │
    │ Prompts    │      │ Evals       │
    │ Evals      │      │ Hallucination│
    └─────┬──────┘      └──────┬──────┘
          │                     │
    ┌─────▼─────────────────────▼─────┐
    │     Alerting & Dashboards        │
    │  ┌──────────┐  ┌──────────────┐ │
    │  │ Grafana   │  │ Slack/PD     │ │
    │  │ Dashboards│  │ Alerts       │ │
    │  └──────────┘  └──────────────┘ │
    └──────────────────────────────────┘
```

## The Four Pillars of LLM Observability

### 1. Trace-Level Monitoring

Every LLM interaction must be traceable from user input to response:

```python
from langfuse.decorators import observe, langfuse_context

@observe()
def handle_query(user_id: str, query: str) -> str:
    """Traced end-to-end: retrieval → augmentation → generation."""
    
    # Each step becomes a span
    docs = retrieve_documents(query)
    context = format_context(docs)
    prompt = build_prompt(query, context)
    response = call_llm(prompt)
    
    # Add metadata for analysis
    langfuse_context.update_current_trace(
        user_id=user_id,
        metadata={"doc_count": len(docs), "model": "gpt-4"}
    )
    
    return response

@observe()
def retrieve_documents(query: str) -> list:
    """Retrieval span with relevance tracking."""
    results = vector_store.similarity_search(query, k=5)
    
    langfuse_context.update_current_observation(
        metadata={"num_results": len(results)}
    )
    
    return results
```

### 2. Cost Analytics

Track token usage and cost per user, feature, and model:

```python
# Tag every LLM call with cost dimensions
@observe()
def call_llm(prompt: str, feature: str = "default") -> str:
    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
    )
    
    # Langfuse auto-tracks tokens, but add business context
    langfuse_context.update_current_observation(
        metadata={
            "feature": feature,
            "input_tokens": response.usage.prompt_tokens,
            "output_tokens": response.usage.completion_tokens,
        }
    )
    
    return response.choices[0].message.content
```

### 3. Quality Evaluation

Automated quality scoring for LLM outputs:

```python
from langfuse import Langfuse

langfuse = Langfuse()

def evaluate_response(trace_id: str, output: str, expected: str):
    """Score LLM output quality."""
    
    # Semantic similarity score
    similarity = compute_similarity(output, expected)
    langfuse.score(
        trace_id=trace_id,
        name="semantic_similarity",
        value=similarity
    )
    
    # Factuality check via LLM-as-judge
    factuality = llm_judge_factuality(output)
    langfuse.score(
        trace_id=trace_id,
        name="factuality",
        value=factuality
    )
```

### 4. Prompt Management

Version-controlled prompts linked to production performance:

```python
# Fetch versioned prompt from Langfuse
prompt = langfuse.get_prompt("rag-answer-v2")

# Use in production — linked to traces for A/B comparison
response = call_llm(
    prompt.compile(context=context, query=query)
)
```

## Key Metrics to Track

| Metric | What It Measures | Alert Threshold |
|---|---|---|
| **Latency (p50/p95/p99)** | User experience | p95 > 5s |
| **Token usage per request** | Cost efficiency | > 2x baseline |
| **Retrieval relevance** | RAG quality | Score < 0.5 |
| **Hallucination rate** | Output reliability | > 5% |
| **Error rate** | System reliability | > 1% |
| **Cost per user** | Unit economics | > budget |
| **Prompt injection blocks** | Security | Any increase |
| **Evaluation scores** | Quality over time | Declining trend |

## Alerting Patterns for LLM Systems

Define alerts that catch LLM-specific failures before users report them:

```yaml
# prometheus-llm-alerts.yaml
groups:
  - name: llm-observability-alerts
    rules:
      # Quality degradation — catch before users complain
      - alert: LLMQualityDrop
        expr: |
          (rate(llm_quality_score_sum[1h]) / rate(llm_quality_score_count[1h])) < 0.7
          and
          (rate(llm_quality_score_sum[24h]) / rate(llm_quality_score_count[24h])) > 0.8
        for: 30m
        labels:
          severity: warning
        annotations:
          summary: "LLM quality score dropped below 0.7 (24h avg was above 0.8)"

      # Cost spike — prevent runaway spending
      - alert: LLMCostSpike
        expr: |
          sum(increase(llm_cost_usd_total[1h])) > 
          2 * avg_over_time(sum(increase(llm_cost_usd_total[1h]))[7d:1h])
        for: 15m
        labels:
          severity: critical
        annotations:
          summary: "LLM cost is 2x the 7-day hourly average"

      # Retrieval quality — RAG returning irrelevant docs
      - alert: LLMRetrievalQualityLow
        expr: rate(llm_retrieval_relevance_score_sum[1h]) / rate(llm_retrieval_relevance_score_count[1h]) < 0.5
        for: 20m
        labels:
          severity: warning
        annotations:
          summary: "RAG retrieval relevance score below 0.5 — check index freshness"
```

## Production Dashboard Design

Structure your Grafana dashboard with these panels for complete LLM visibility:

| Row | Panels | Purpose |
|---|---|---|
| **Overview** | Request rate, error rate, active requests, SLO burn | At-a-glance health |
| **Latency** | p50/p95/p99 time series, latency heatmap | Performance tracking |
| **Cost** | Hourly cost by model, tokens breakdown, cost per request | Spend monitoring |
| **Quality** | Quality score trend, hallucination rate, evaluation pass rate | Output reliability |
| **RAG** | Retrieval relevance, cache hit rate, document count | Retrieval health |

```python
# Export dashboard-ready metrics from your application
from prometheus_client import Histogram, Counter

llm_request_duration = Histogram(
    "llm_request_duration_seconds",
    "LLM request duration",
    ["model", "feature"],
    buckets=[0.5, 1.0, 2.0, 5.0, 10.0, 30.0, 60.0],
)

llm_cost_total = Counter(
    "llm_cost_usd_total",
    "Total LLM cost in USD",
    ["model", "feature"],
)

llm_retrieval_relevance = Histogram(
    "llm_retrieval_relevance_score",
    "RAG retrieval relevance score",
    ["collection"],
    buckets=[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
)
```

## Implementation Checklist

- [ ] Deploy Langfuse (self-hosted or cloud) for production tracing
- [ ] Instrument all LLM calls with OpenTelemetry spans
- [ ] Set up cost tracking per user, feature, and model
- [ ] Implement automated evaluation pipelines (quality scores)
- [ ] Create Grafana dashboards for business metrics
- [ ] Configure alerts for latency, cost, and quality anomalies
- [ ] Set up prompt versioning and A/B testing
- [ ] Use Phoenix for development-time RAG quality analysis

## Related

- [LLM Monitoring and Tracing →](./llm-monitoring-tracing)
- [Secure LLM Pipelines →](./secure-llm-pipelines)
- [Production RAG Systems →](./production-rag-systems)
- [AI Gateway Architecture →](./ai-gateway-architecture)
- [AI Observability Tools →](/docs/ai-tools/ai-observability-tools)
- [Langfuse Review →](/tools/langfuse-review)
- [Langfuse vs Arize Phoenix →](/comparisons/langfuse-vs-arize)
- [Observability Stack Blog Post →](/blog/complete-observability-stack-2026)
- [AI Infrastructure Consulting →](/services)
