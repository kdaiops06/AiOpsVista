---
sidebar_position: 10
title: LLM Monitoring and Tracing
description: Production monitoring architecture for LLM applications — OpenTelemetry instrumentation, distributed tracing for chains and agents, SLIs/SLOs, alerting patterns, and dashboard templates.
keywords: [llm monitoring, llm tracing, opentelemetry llm, langfuse tracing, ai observability, llm sli slo, llm alerting]
---

# LLM Monitoring and Tracing

Production monitoring architecture for LLM applications — distributed tracing across chains and agents, custom SLIs/SLOs, alerting patterns, and operational dashboards.

## Why LLM Systems Need Specialized Monitoring

Traditional APM tools monitor latency, throughput, and error rates. LLM systems introduce unique dimensions that require specialized instrumentation:

| Dimension | Why Standard APM Fails |
|---|---|
| **Token usage** | Cost directly tied to tokens consumed — not captured by request metrics |
| **Quality** | Correctness of output cannot be measured by HTTP status codes |
| **Latency variance** | LLM response times vary 10-100× based on output length |
| **Chain tracing** | Multi-step LLM chains need per-step visibility, not just end-to-end |
| **Hallucination** | Silent failures — model returns 200 OK but output is wrong |
| **Rate limits** | Provider-side throttling creates cascading failures |
| **Prompt drift** | Template changes affect quality without changing code |

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     LLM Application                             │
│                                                                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐ │
│  │ Chain Step │  │ Chain Step │  │ Chain Step │  │ Agent    │ │
│  │ (Retrieval)│─▶│ (LLM Call) │─▶│ (Output)   │  │ Loop     │ │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘  └────┬─────┘ │
│        │               │               │               │        │
│        └───────────────┴───────────────┴───────────────┘        │
│                              │                                   │
│                    OpenTelemetry SDK                              │
│                    (Traces + Metrics)                             │
└──────────────────────────────┬──────────────────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
     ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
     │   Langfuse   │  │  Prometheus  │  │   Grafana    │
     │              │  │              │  │              │
     │ • Traces     │  │ • Token      │  │ • Dashboards │
     │ • Sessions   │  │   metrics    │  │ • Alerts     │
     │ • Scores     │  │ • Latency    │  │ • SLO        │
     │ • Cost       │  │   histograms │  │   tracking   │
     │ • Prompts    │  │ • Error      │  │              │
     └──────────────┘  │   counters   │  └──────────────┘
                       └──────────────┘
```

## Architecture Components

### Component 1: OpenTelemetry Instrumentation for LLM Calls

Instrument LLM calls with spans that capture token usage, model, and duration:

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
import time

# Initialize tracer
provider = TracerProvider()
processor = BatchSpanProcessor(OTLPSpanExporter(endpoint="otel-collector:4317"))
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)
tracer = trace.get_tracer("llm-application")

def traced_llm_call(prompt: str, model: str = "gpt-4") -> dict:
    """LLM call with full OpenTelemetry tracing."""
    with tracer.start_as_current_span("llm.completion") as span:
        span.set_attribute("llm.model", model)
        span.set_attribute("llm.prompt.tokens", count_tokens(prompt))
        span.set_attribute("llm.request_type", "completion")
        
        start = time.monotonic()
        try:
            response = call_llm(prompt, model=model)
            
            span.set_attribute("llm.completion.tokens", response["usage"]["completion_tokens"])
            span.set_attribute("llm.total.tokens", response["usage"]["total_tokens"])
            span.set_attribute("llm.cost.usd", calculate_cost(response["usage"], model))
            span.set_attribute("llm.finish_reason", response["choices"][0]["finish_reason"])
            span.set_status(trace.StatusCode.OK)
            
            return response
        except Exception as e:
            span.set_status(trace.StatusCode.ERROR, str(e))
            span.set_attribute("llm.error.type", type(e).__name__)
            span.record_exception(e)
            raise
        finally:
            duration = time.monotonic() - start
            span.set_attribute("llm.duration_ms", duration * 1000)
```

### Component 2: Chain and Agent Tracing with Langfuse

Trace multi-step chains and agent loops with full parent-child span relationships:

```python
from langfuse import Langfuse
from langfuse.decorators import observe

langfuse = Langfuse()

@observe()
def rag_pipeline(query: str) -> str:
    """Full RAG pipeline with per-step tracing."""
    
    # Step 1: Query transformation
    enhanced_query = transform_query(query)
    
    # Step 2: Retrieval
    documents = retrieve_documents(enhanced_query)
    
    # Step 3: LLM generation
    response = generate_response(query, documents)
    
    return response

@observe()
def transform_query(query: str) -> str:
    """Trace query transformation step."""
    return call_llm(
        f"Rewrite this search query for better retrieval: {query}",
        model="gpt-4o-mini",
    )

@observe()
def retrieve_documents(query: str) -> list[dict]:
    """Trace document retrieval with relevance scores."""
    results = vector_db.search(query, top_k=5)
    
    # Log retrieval quality metrics
    langfuse.score(
        name="retrieval_count",
        value=len(results),
    )
    
    return results

@observe()
def generate_response(query: str, documents: list[dict]) -> str:
    """Trace final generation step."""
    context = "\n".join(doc["text"] for doc in documents)
    return call_llm(
        f"Context:\n{context}\n\nQuestion: {query}\nAnswer:",
        model="gpt-4",
    )
```

### Component 3: Custom Metrics with Prometheus

Export LLM-specific metrics via Prometheus client:

```python
from prometheus_client import Counter, Histogram, Gauge, start_http_server

# Token metrics
llm_tokens_total = Counter(
    "llm_tokens_total",
    "Total tokens consumed",
    ["model", "type"],  # type: prompt | completion
)

# Latency metrics
llm_request_duration = Histogram(
    "llm_request_duration_seconds",
    "LLM request duration in seconds",
    ["model", "endpoint"],
    buckets=[0.5, 1.0, 2.0, 5.0, 10.0, 30.0, 60.0],
)

# Cost metrics
llm_cost_total = Counter(
    "llm_cost_usd_total",
    "Total LLM cost in USD",
    ["model", "application"],
)

# Error metrics
llm_errors_total = Counter(
    "llm_errors_total",
    "Total LLM errors",
    ["model", "error_type"],  # rate_limit, timeout, 5xx, etc.
)

# Quality metrics
llm_quality_score = Histogram(
    "llm_quality_score",
    "LLM output quality score (0-1)",
    ["model", "evaluation_method"],
    buckets=[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
)

# Active requests
llm_active_requests = Gauge(
    "llm_active_requests",
    "Currently in-flight LLM requests",
    ["model"],
)

# Start metrics server
start_http_server(9090)
```

### Component 4: SLIs and SLOs for LLM Systems

Define measurable service level indicators specific to LLM applications:

| SLI | Target SLO | Measurement |
|---|---|---|
| **Availability** | 99.9% | % of requests returning non-error response |
| **Latency (p95)** | < 5s for chat, < 30s for generation | Request duration histogram |
| **Token cost per request** | < $0.05 per average request | Cost counter / request counter |
| **Quality score** | > 0.8 on evaluation suite | Automated evaluation pipeline |
| **Hallucination rate** | < 5% of responses | Grounded-ness check failures |
| **Rate limit errors** | < 0.1% of total requests | Error counter by type |

```yaml
# prometheus-slo-rules.yaml
groups:
  - name: llm-slos
    rules:
      # Availability SLO: 99.9% of requests succeed
      - record: llm:availability:ratio
        expr: |
          1 - (
            sum(rate(llm_errors_total[5m]))
            /
            sum(rate(llm_request_duration_seconds_count[5m]))
          )

      # Latency SLO: 95% of requests under 5 seconds
      - record: llm:latency:p95
        expr: |
          histogram_quantile(0.95,
            sum(rate(llm_request_duration_seconds_bucket[5m])) by (le, model)
          )

      # Cost tracking: hourly cost by model
      - record: llm:cost:hourly_usd
        expr: |
          sum(increase(llm_cost_usd_total[1h])) by (model, application)

      # Error budget alert
      - alert: LLMErrorBudgetBurn
        expr: llm:availability:ratio < 0.999
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "LLM error budget burning — availability at {{ $value }}"
```

## Alerting Patterns

### Recommended Alert Rules

```yaml
# llm-alerts.yaml
groups:
  - name: llm-alerts
    rules:
      # High error rate
      - alert: LLMHighErrorRate
        expr: |
          sum(rate(llm_errors_total[5m])) by (model)
          /
          sum(rate(llm_request_duration_seconds_count[5m])) by (model)
          > 0.05
        for: 3m
        labels:
          severity: critical
        annotations:
          summary: "LLM error rate > 5% for model {{ $labels.model }}"
          runbook: "Check provider status page, verify API keys, check rate limits"

      # Latency spike
      - alert: LLMLatencySpike
        expr: |
          histogram_quantile(0.95,
            sum(rate(llm_request_duration_seconds_bucket[5m])) by (le, model)
          ) > 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "LLM p95 latency > 10s for model {{ $labels.model }}"

      # Cost anomaly
      - alert: LLMCostAnomaly
        expr: |
          sum(increase(llm_cost_usd_total[1h])) by (application)
          > 2 * avg_over_time(sum(increase(llm_cost_usd_total[1h])) by (application)[7d:1h])
        for: 15m
        labels:
          severity: warning
        annotations:
          summary: "LLM cost 2× above 7-day average for {{ $labels.application }}"

      # Rate limit pressure
      - alert: LLMRateLimitPressure
        expr: |
          sum(rate(llm_errors_total{error_type="rate_limit"}[5m])) by (model) > 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "LLM rate limits being hit for model {{ $labels.model }}"

      # Quality degradation
      - alert: LLMQualityDrop
        expr: |
          (
            sum(rate(llm_quality_score_sum{evaluation_method="automated"}[5m]))
            /
            sum(rate(llm_quality_score_count{evaluation_method="automated"}[5m]))
          ) < 0.7
        for: 30m
        labels:
          severity: warning
        annotations:
          summary: "LLM quality score below 0.7 — check for prompt drift or model changes"
```

## Dashboard Templates

### Key Dashboard Panels

A production LLM monitoring dashboard should include these panels:

**Row 1 — Overview**
- Total requests per minute (by model)
- Error rate percentage (by error type)
- Active in-flight requests (gauge)
- Current availability SLO burn rate

**Row 2 — Latency**
- p50, p95, p99 latency (time series)
- Latency distribution heatmap
- Time to first token (streaming endpoints)
- Latency by model and endpoint

**Row 3 — Cost**
- Hourly cost by model (stacked bar)
- Token usage breakdown (prompt vs completion)
- Cost per request (average, p95)
- Monthly cost projection

**Row 4 — Quality**
- Quality score distribution over time
- Hallucination rate (from evaluation pipeline)
- User feedback scores (thumbs up/down)
- Retrieval relevance scores (for RAG)

**Row 5 — Infrastructure**
- GPU utilization (DCGM metrics)
- Model serving pod count and HPA status
- Request queue depth
- Cache hit rate (semantic cache)

```json
// Grafana dashboard panel example — LLM cost tracking
{
  "title": "Hourly LLM Cost by Model",
  "type": "timeseries",
  "targets": [
    {
      "expr": "sum(increase(llm_cost_usd_total[1h])) by (model)",
      "legendFormat": "{{ model }}"
    }
  ],
  "fieldConfig": {
    "defaults": {
      "unit": "currencyUSD",
      "custom": {
        "drawStyle": "bars",
        "stacking": { "mode": "normal" }
      }
    }
  }
}
```

## Recommended Tools

| Layer | Tool | Purpose |
|---|---|---|
| **LLM Tracing** | [Langfuse](/docs/ai-tools/ai-observability-tools) | Trace chains, sessions, evaluate quality, manage prompts |
| **Metrics** | Prometheus + DCGM | Token/cost/latency metrics and GPU monitoring |
| **Dashboards** | Grafana | Visualize all metrics and SLO tracking |
| **Distributed Tracing** | OpenTelemetry + Jaeger | Cross-service trace correlation |
| **Alerting** | Alertmanager + PagerDuty | Route alerts based on severity |
| **Log Aggregation** | Loki / ELK | Structured logs for prompt/response debugging |
| **Evaluation** | Langfuse Scores / custom | Automated quality scoring pipeline |

## Best Practices

1. **Trace every LLM call** — Include model, tokens, cost, and latency as span attributes
2. **Separate prompt and completion tokens** — They have different costs and different optimization strategies
3. **Track cost in real-time** — Don't wait for provider invoices; calculate cost from token counts
4. **Set cost alerts** — Runaway loops or prompt injection can cause massive cost spikes
5. **Monitor quality continuously** — Use automated evaluation to detect quality degradation before users report it
6. **Correlate traces with quality** — Link Langfuse traces to quality scores for root cause analysis
7. **Alert on rate limits** — Rate limit errors indicate capacity planning issues
8. **Dashboard per application** — Different LLM applications have different SLO targets

## Implementation Checklist

- [ ] Instrument all LLM calls with OpenTelemetry spans (model, tokens, cost, latency)
- [ ] Deploy Langfuse for chain-level tracing and session management
- [ ] Export custom Prometheus metrics (tokens, cost, errors, quality)
- [ ] Define SLIs and SLOs for each LLM application
- [ ] Configure Prometheus recording rules for SLO tracking
- [ ] Set up alerting rules (error rate, latency, cost anomaly, rate limits)
- [ ] Build Grafana dashboards (overview, latency, cost, quality, infra)
- [ ] Implement automated quality evaluation pipeline
- [ ] Configure alert routing (PagerDuty for critical, Slack for warnings)
- [ ] Set up weekly SLO review process

## Related Guides

- [AI Observability Stack →](./ai-observability-stack)
- [AI Cost Optimization →](./ai-cost-optimization)
- [LLM Evaluation & Testing →](./llm-evaluation-testing)
- [AI Infrastructure on Kubernetes →](./ai-infrastructure-kubernetes)
- [AI Gateway Architecture →](./ai-gateway-architecture)
- [AI Observability Tools →](/docs/ai-tools/ai-observability-tools)
- [Langfuse Review →](/tools/langfuse-review)
- [Langfuse vs Arize →](/comparisons/langfuse-vs-arize)
- [Architecture Playbooks Index →](./architecture-playbooks)
- [AI Infrastructure Consulting →](/services)
