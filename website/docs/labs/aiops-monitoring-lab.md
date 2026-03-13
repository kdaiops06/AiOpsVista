---
sidebar_position: 2
title: "Lab: Build an AIOps Monitoring Pipeline"
description: "End-to-end lab — build a complete AIOps monitoring and alerting pipeline with Prometheus, Grafana, and Python-based anomaly detection."
---

# Lab: Build an AIOps Monitoring Pipeline

Build a complete AIOps monitoring system that collects metrics, detects anomalies, and sends intelligent alerts.

**Duration**: 2-3 hours  
**Level**: Intermediate  
**Prerequisites**: Docker, Python 3.10+, basic Kubernetes knowledge

## What You'll Build

```
┌──────────┐    ┌────────────┐    ┌───────────────┐
│  App +    │───▶│ Prometheus  │───▶│  Anomaly      │
│  Metrics  │    │  (Scrape)   │    │  Detector     │
└──────────┘    └────────────┘    │  (Python)     │
                      │            └───────┬───────┘
                      ▼                    │
                ┌────────────┐      ┌──────▼───────┐
                │  Grafana    │      │  Alert        │
                │  Dashboard  │      │  Manager      │
                └────────────┘      └──────────────┘
```

## Step 1: Set Up the Application

Create a sample app that exposes Prometheus metrics:

```python
# app.py
from prometheus_client import (
    Counter, Histogram, Gauge, start_http_server
)
import random
import time

# Define metrics
REQUEST_COUNT = Counter(
    'app_requests_total',
    'Total requests',
    ['method', 'endpoint', 'status']
)

REQUEST_LATENCY = Histogram(
    'app_request_duration_seconds',
    'Request latency',
    ['endpoint'],
    buckets=[0.01, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5]
)

ERROR_RATE = Gauge(
    'app_error_rate',
    'Current error rate'
)

def simulate_traffic():
    """Simulate realistic traffic with occasional anomalies."""
    while True:
        # Normal traffic
        endpoint = random.choice(['/api/users', '/api/orders', '/api/health'])
        latency = random.gauss(0.1, 0.02)  # ~100ms avg

        # Inject anomaly every ~5 minutes
        if random.random() < 0.003:
            latency = random.gauss(2.0, 0.5)  # Spike to 2s
            status = '500'
        else:
            status = '200'

        REQUEST_COUNT.labels(
            method='GET', endpoint=endpoint, status=status
        ).inc()

        REQUEST_LATENCY.labels(endpoint=endpoint).observe(
            max(latency, 0.001)
        )

        error_count = REQUEST_COUNT.labels('GET', endpoint, '500')._value.get()
        total_count = sum(
            REQUEST_COUNT.labels('GET', ep, s)._value.get()
            for ep in ['/api/users', '/api/orders', '/api/health']
            for s in ['200', '500']
        ) or 1
        ERROR_RATE.set(error_count / total_count)

        time.sleep(random.uniform(0.05, 0.2))

if __name__ == '__main__':
    start_http_server(8000)
    print("Metrics server started on :8000")
    simulate_traffic()
```

## Step 2: Docker Compose Stack

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports:
      - "8000:8000"

  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana

  anomaly-detector:
    build:
      context: .
      dockerfile: Dockerfile.detector
    environment:
      - PROMETHEUS_URL=http://prometheus:9090

volumes:
  grafana-data:
```

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'app'
    static_configs:
      - targets: ['app:8000']
```

## Step 3: Anomaly Detector

```python
# detector.py
import requests
import numpy as np
from datetime import datetime
import time
import os

PROMETHEUS_URL = os.getenv("PROMETHEUS_URL", "http://localhost:9090")

def query_prometheus(query: str) -> list:
    """Query Prometheus and return results."""
    response = requests.get(
        f"{PROMETHEUS_URL}/api/v1/query",
        params={"query": query},
        timeout=10
    )
    response.raise_for_status()
    data = response.json()
    return data.get("data", {}).get("result", [])

def query_range(query: str, duration: str = "30m") -> list:
    """Query Prometheus range."""
    response = requests.get(
        f"{PROMETHEUS_URL}/api/v1/query_range",
        params={
            "query": query,
            "start": f"now-{duration}",
            "end": "now",
            "step": "15s"
        },
        timeout=10
    )
    response.raise_for_status()
    return response.json().get("data", {}).get("result", [])

def detect_latency_anomaly(threshold_std: float = 3.0):
    """Detect latency anomalies using z-score method."""
    results = query_range(
        'rate(app_request_duration_seconds_sum[1m]) / '
        'rate(app_request_duration_seconds_count[1m])'
    )

    for result in results:
        values = [float(v[1]) for v in result["values"] if v[1] != "NaN"]
        if len(values) < 10:
            continue

        mean = np.mean(values)
        std = np.std(values)
        current = values[-1]

        if std > 0:
            z_score = (current - mean) / std
            if abs(z_score) > threshold_std:
                endpoint = result["metric"].get("endpoint", "unknown")
                print(f"[ANOMALY] {datetime.now()} | "
                      f"endpoint={endpoint} | "
                      f"latency={current:.3f}s | "
                      f"z_score={z_score:.2f} | "
                      f"mean={mean:.3f}s")
                return True
    return False

def detect_error_spike():
    """Detect sudden increase in error rate."""
    results = query_prometheus('app_error_rate')
    for result in results:
        error_rate = float(result["value"][1])
        if error_rate > 0.05:  # 5% error threshold
            print(f"[ALERT] Error rate spike: {error_rate:.2%}")
            return True
    return False

if __name__ == "__main__":
    print("Anomaly detector started...")
    while True:
        detect_latency_anomaly()
        detect_error_spike()
        time.sleep(30)
```

## Step 4: Run the Lab

```bash
# Start the stack
docker compose up -d

# View metrics
open http://localhost:8000/metrics

# Access Prometheus
open http://localhost:9090

# Access Grafana (admin/admin)
open http://localhost:3000

# Watch anomaly detector logs
docker compose logs -f anomaly-detector
```

## Step 5: Create Grafana Dashboard

1. Add Prometheus as a data source (`http://prometheus:9090`)
2. Create a dashboard with these panels:

| Panel | Query | Type |
|-------|-------|------|
| Request Rate | `rate(app_requests_total[1m])` | Time series |
| Latency P95 | `histogram_quantile(0.95, rate(app_request_duration_seconds_bucket[5m]))` | Time series |
| Error Rate | `app_error_rate` | Gauge |
| Request Count | `app_requests_total` | Stat |

## Challenge Extensions

1. **Add Slack alerts** — send anomaly notifications to a Slack channel
2. **ML-based detection** — replace z-score with Isolation Forest
3. **Auto-remediation** — restart pods when anomalies are detected
4. **Dashboard as code** — export Grafana dashboard as JSON

## Next Steps

- [AIOps Architecture](/docs/aiops/architecture-patterns) — Production AIOps design
- [Observability Stack](/docs/cloud-devops/observability-stack) — Full observability guide
