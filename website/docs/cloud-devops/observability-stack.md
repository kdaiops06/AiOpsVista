---
sidebar_position: 5
title: "Observability Stack Guide"
description: "Build a full-stack observability platform with Prometheus, Grafana, Loki, and Tempo — metrics, logs, and traces for production systems."
---

# Observability Stack Guide

Observability is the ability to understand your system's internal state from its external outputs. This guide covers building a production observability stack.

## The Three Pillars

```
┌──────────────────────────────────────────────────────────┐
│                  Observability Platform                    │
│                                                           │
│  ┌──────────────────────────────────────────────────┐    │
│  │                  Grafana                           │    │
│  │    Dashboards │ Alerts │ Explore │ Correlate       │    │
│  └─────────┬──────────┬──────────┬───────────────┘    │
│            │          │          │                      │
│  ┌─────────▼──┐ ┌─────▼─────┐ ┌─▼──────────┐         │
│  │ Prometheus  │ │   Loki     │ │   Tempo     │        │
│  │ (Metrics)   │ │  (Logs)    │ │  (Traces)   │        │
│  └─────────┬──┘ └─────┬─────┘ └─┬──────────┘         │
│            │          │          │                      │
│  ┌─────────▼──────────▼──────────▼───────────────┐    │
│  │            OpenTelemetry Collector              │    │
│  │     Receive │ Process │ Export                   │    │
│  └─────────────────────┬─────────────────────────┘    │
│                        │                               │
│  ┌─────────────────────▼─────────────────────────┐    │
│  │              Applications                       │    │
│  │   SDK Instrumentation │ Auto-instrumentation    │    │
│  └─────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

## Deployment with Helm

### Prometheus Stack

```bash
# Add Helm repos
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Install kube-prometheus-stack (Prometheus + Grafana + AlertManager)
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set grafana.adminPassword=changeme \
  --set prometheus.prometheusSpec.retention=30d \
  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=100Gi
```

### Loki for Logs

```bash
helm install loki grafana/loki-stack \
  --namespace monitoring \
  --set promtail.enabled=true \
  --set loki.persistence.enabled=true \
  --set loki.persistence.size=50Gi
```

### Tempo for Traces

```bash
helm install tempo grafana/tempo \
  --namespace monitoring \
  --set tempo.storage.trace.backend=s3 \
  --set tempo.storage.trace.s3.bucket=my-tempo-traces
```

## OpenTelemetry Instrumentation

### Python Application

```python
# Install: pip install opentelemetry-api opentelemetry-sdk \
#          opentelemetry-instrumentation-flask \
#          opentelemetry-exporter-otlp

from opentelemetry import trace, metrics
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import (
    OTLPSpanExporter
)
from opentelemetry.exporter.otlp.proto.grpc.metric_exporter import (
    OTLPMetricExporter
)
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader

# Setup tracing
trace_provider = TracerProvider()
trace_provider.add_span_processor(
    BatchSpanProcessor(
        OTLPSpanExporter(endpoint="otel-collector:4317")
    )
)
trace.set_tracer_provider(trace_provider)

# Setup metrics
metric_reader = PeriodicExportingMetricReader(
    OTLPMetricExporter(endpoint="otel-collector:4317"),
    export_interval_millis=10000
)
metrics.set_meter_provider(MeterProvider(metric_readers=[metric_reader]))

# Usage
tracer = trace.get_tracer("my-service")
meter = metrics.get_meter("my-service")

request_counter = meter.create_counter(
    "requests_total",
    description="Total requests"
)

@app.route("/api/process")
def process():
    with tracer.start_as_current_span("process-request") as span:
        span.set_attribute("user.id", user_id)
        request_counter.add(1, {"endpoint": "/api/process"})
        result = do_processing()
        return result
```

## SLO/SLI Configuration

### Define SLOs

| Service | SLI | SLO Target |
|---------|-----|------------|
| API Gateway | Availability (2xx / total) | 99.9% |
| API Gateway | Latency (p99 < 500ms) | 99.0% |
| Payment Service | Availability | 99.99% |
| Search Service | Latency (p95 < 200ms) | 95.0% |

### Prometheus Recording Rules

```yaml
# SLO recording rules
groups:
- name: slo-rules
  interval: 30s
  rules:
  # Availability SLI
  - record: sli:availability:ratio
    expr: |
      sum(rate(http_requests_total{status=~"2.."}[5m]))
      /
      sum(rate(http_requests_total[5m]))

  # Latency SLI (% of requests under 500ms)
  - record: sli:latency:ratio
    expr: |
      sum(rate(http_request_duration_seconds_bucket{le="0.5"}[5m]))
      /
      sum(rate(http_request_duration_seconds_count[5m]))

  # Error budget remaining (30-day window)
  - record: slo:error_budget:remaining
    expr: |
      1 - (
        (1 - sli:availability:ratio)
        /
        (1 - 0.999)
      )
```

## Alerting Best Practices

### Multi-Window Multi-Burn Rate Alerts

```yaml
groups:
- name: slo-alerts
  rules:
  # Fast burn: 2% budget consumed in 1 hour
  - alert: SLOBurnRateFast
    expr: |
      (
        1 - sli:availability:ratio:1h > 14.4 * (1 - 0.999)
      )
      and
      (
        1 - sli:availability:ratio:5m > 14.4 * (1 - 0.999)
      )
    for: 2m
    labels:
      severity: critical
    annotations:
      summary: "High error rate burning SLO budget fast"

  # Slow burn: 10% budget consumed in 3 days
  - alert: SLOBurnRateSlow
    expr: |
      (
        1 - sli:availability:ratio:3d > 1.0 * (1 - 0.999)
      )
      and
      (
        1 - sli:availability:ratio:6h > 1.0 * (1 - 0.999)
      )
    for: 1h
    labels:
      severity: warning
```

## Key Dashboards to Build

1. **Service Overview** — Request rate, error rate, latency (RED method)
2. **Infrastructure** — CPU, memory, disk, network per node
3. **SLO Dashboard** — Error budget burn rate, SLI trends
4. **Kubernetes** — Pod health, deployment status, resource utilization
5. **On-Call** — Active alerts, recent incidents, runbook links

## Next Steps

- [AIOps Architecture](/docs/aiops/architecture-patterns) — Add AI to your observability
- [Kubernetes Operations](/docs/cloud-devops/kubernetes-operations) — Cluster management
- [CI/CD Pipelines](/docs/cloud-devops/cicd-pipeline-patterns) — Integrated deployments
