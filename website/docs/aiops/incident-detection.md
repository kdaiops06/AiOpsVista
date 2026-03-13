---
sidebar_position: 3
title: "AI-Powered Incident Detection"
description: "Build AI-driven incident detection with anomaly detection, event correlation, root cause analysis, and automated remediation."
---

# AI-Powered Incident Detection

Traditional threshold-based alerting generates noise. AI-powered incident detection uses machine learning to identify real incidents before users notice.

## How It Works

```
┌──────────────────────────────────────────────────────────┐
│              AI Incident Detection Pipeline               │
│                                                           │
│  ┌─────────────┐                                         │
│  │ Metrics      │──┐                                     │
│  │ Logs         │  │  ┌──────────────┐                   │
│  │ Traces       │──┼─▶│ Feature       │                  │
│  │ Events       │  │  │ Engineering   │                  │
│  │ Deployments  │──┘  └──────┬───────┘                   │
│  └─────────────┘             │                           │
│                       ┌──────▼───────┐                   │
│                       │ ML Models     │                   │
│                       │ • Anomaly Det │                   │
│                       │ • Forecasting │                   │
│                       │ • Correlation │                   │
│                       └──────┬───────┘                   │
│                              │                           │
│                       ┌──────▼───────┐                   │
│                       │ Incident      │                   │
│                       │ Classifier    │                   │
│                       │ • Severity    │                   │
│                       │ • RCA         │                   │
│                       │ • Remediation │                   │
│                       └──────┬───────┘                   │
│                              │                           │
│                    ┌─────────▼──────────┐                │
│                    │ Action Engine       │                │
│                    │ Alert │ Runbook │ Fix│                │
│                    └────────────────────┘                │
└──────────────────────────────────────────────────────────┘
```

## Anomaly Detection Methods

### 1. Statistical Methods (Good Starting Point)

```python
import numpy as np
from scipy import stats

def detect_anomalies_zscore(
    data: list[float],
    threshold: float = 3.0
) -> list[dict]:
    """Detect anomalies using z-score."""
    mean = np.mean(data)
    std = np.std(data)
    anomalies = []

    for i, value in enumerate(data):
        if std > 0:
            z = abs((value - mean) / std)
            if z > threshold:
                anomalies.append({
                    "index": i,
                    "value": value,
                    "z_score": z,
                    "severity": "critical" if z > 5 else "warning"
                })

    return anomalies
```

### 2. Isolation Forest (Unsupervised ML)

```python
from sklearn.ensemble import IsolationForest
import numpy as np

def train_anomaly_detector(
    training_data: np.ndarray,
    contamination: float = 0.05
) -> IsolationForest:
    """Train an Isolation Forest anomaly detector."""
    model = IsolationForest(
        contamination=contamination,
        n_estimators=200,
        random_state=42
    )
    model.fit(training_data)
    return model

def predict_anomalies(
    model: IsolationForest,
    new_data: np.ndarray
) -> np.ndarray:
    """Predict anomalies: -1 = anomaly, 1 = normal."""
    predictions = model.predict(new_data)
    scores = model.decision_function(new_data)
    return predictions, scores

# Example: Multi-metric anomaly detection
# Features: [cpu_usage, memory_usage, request_rate, error_rate, latency_p99]
training_data = np.array([
    [45, 60, 1000, 0.01, 0.12],
    [50, 62, 1100, 0.02, 0.11],
    [48, 58, 950, 0.01, 0.13],
    # ... 30 days of normal data
])

model = train_anomaly_detector(training_data)

# New data point
current = np.array([[92, 85, 2500, 0.15, 1.2]])
pred, score = predict_anomalies(model, current)
# pred = [-1] → Anomaly detected!
```

### 3. Prophet for Time Series Forecasting

```python
from prophet import Prophet
import pandas as pd

def forecast_metric(
    metric_data: pd.DataFrame,
    periods: int = 60  # 60 data points ahead
) -> pd.DataFrame:
    """Forecast metric values and detect deviations."""
    model = Prophet(
        interval_width=0.99,
        changepoint_prior_scale=0.05
    )
    model.fit(metric_data)  # Must have 'ds' and 'y' columns

    future = model.make_future_dataframe(periods=periods, freq='5min')
    forecast = model.predict(future)

    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]
```

## Event Correlation

Correlate related alerts to reduce noise and identify root causes:

```python
from datetime import datetime, timedelta
from collections import defaultdict

def correlate_events(
    events: list[dict],
    time_window: timedelta = timedelta(minutes=5),
    service_graph: dict = None
) -> list[dict]:
    """Group related events into incidents."""
    incidents = []
    used = set()

    # Sort by timestamp
    events.sort(key=lambda e: e["timestamp"])

    for i, event in enumerate(events):
        if i in used:
            continue

        # Find correlated events
        group = [event]
        used.add(i)

        for j, other in enumerate(events[i+1:], i+1):
            if j in used:
                continue

            time_diff = other["timestamp"] - event["timestamp"]
            if time_diff > time_window:
                break

            # Correlation rules
            if (
                same_service(event, other) or
                dependent_services(event, other, service_graph) or
                same_infrastructure(event, other)
            ):
                group.append(other)
                used.add(j)

        if len(group) > 1:
            incidents.append({
                "events": group,
                "severity": max(e["severity"] for e in group),
                "root_cause": identify_root_cause(group, service_graph),
                "started_at": group[0]["timestamp"],
            })

    return incidents
```

## Automated Remediation

```yaml
# remediation-playbook.yml
playbooks:
  high_cpu:
    trigger:
      metric: cpu_usage_percent
      condition: "> 90 for 5m"
    actions:
      - name: Scale up deployment
        type: kubernetes
        action: scale
        params:
          replicas: "+2"
      - name: Notify on-call
        type: slack
        channel: "#incidents"

  disk_pressure:
    trigger:
      metric: disk_usage_percent
      condition: "> 85"
    actions:
      - name: Clean old logs
        type: command
        command: "find /var/log -name '*.gz' -mtime +7 -delete"
      - name: Alert if still high
        type: pagerduty
        severity: warning

  pod_crash_loop:
    trigger:
      event: CrashLoopBackOff
      count: "> 3 in 10m"
    actions:
      - name: Capture diagnostics
        type: command
        command: "kubectl logs {pod} --previous > /tmp/crash-{pod}.log"
      - name: Rollback deployment
        type: kubernetes
        action: rollback
      - name: Create incident ticket
        type: jira
        project: OPS
```

## Implementation Roadmap

| Phase | Timeline | Focus |
|-------|----------|-------|
| **Phase 1** | Week 1-2 | Statistical anomaly detection on key metrics |
| **Phase 2** | Week 3-4 | Event correlation and alert grouping |
| **Phase 3** | Month 2 | ML-based detection (Isolation Forest) |
| **Phase 4** | Month 3 | Automated remediation for common issues |
| **Phase 5** | Month 4+ | Predictive alerting with time series forecasting |

## Next Steps

- [AIOps Architecture Patterns](/docs/aiops/architecture-patterns) — Full platform design
- [Observability Stack](/docs/cloud-devops/observability-stack) — Data collection
- [AIOps Monitoring Lab](/docs/labs/aiops-monitoring-lab) — Hands-on practice
