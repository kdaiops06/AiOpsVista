---
sidebar_position: 4
title: "Kubernetes Operations Guide"
description: "Production Kubernetes operations — cluster management, scaling, security hardening, troubleshooting, and day-2 operations."
---

# Kubernetes Operations Guide

This guide covers day-2 Kubernetes operations — keeping your clusters secure, observable, and running smoothly in production.

## Cluster Architecture

```
┌──────────────────────────────────────────────────────────┐
│                   Production Cluster                      │
│                                                           │
│  Control Plane (3 nodes, HA)                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ API Server│  │ API Server│  │ API Server│             │
│  │ etcd      │  │ etcd      │  │ etcd      │            │
│  │ Scheduler │  │ Controller│  │           │             │
│  └──────────┘  └──────────┘  └──────────┘              │
│                                                           │
│  Worker Nodes                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ App Pods  │  │ App Pods  │  │ App Pods  │  │GPU Pods│  │
│  │ Sidecar   │  │ Sidecar   │  │ Sidecar   │  │ML Jobs │  │
│  │ (Envoy)   │  │ (Envoy)   │  │ (Envoy)   │  │        │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
│                                                           │
│  System Components                                        │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Ingress Controller │ cert-manager │ external-dns   │  │
│  │ Prometheus │ Grafana │ Loki │ Karpenter            │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

## Resource Management

### Resource Quotas per Namespace

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-quota
  namespace: team-backend
spec:
  hard:
    requests.cpu: "20"
    requests.memory: 40Gi
    limits.cpu: "40"
    limits.memory: 80Gi
    pods: "50"
    services: "10"
    persistentvolumeclaims: "20"
```

### Limit Ranges (Default Pod Resources)

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: team-backend
spec:
  limits:
  - default:
      cpu: "500m"
      memory: "512Mi"
    defaultRequest:
      cpu: "100m"
      memory: "128Mi"
    max:
      cpu: "4"
      memory: "8Gi"
    min:
      cpu: "50m"
      memory: "64Mi"
    type: Container
```

## Auto-Scaling

### Horizontal Pod Autoscaler (HPA)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-server
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-server
  minReplicas: 3
  maxReplicas: 20
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300  # Wait 5min before scale down
      policies:
      - type: Percent
        value: 10           # Scale down 10% at a time
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 30
      policies:
      - type: Percent
        value: 50           # Scale up 50% at a time
        periodSeconds: 60
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "100"
```

### Cluster Autoscaler with Karpenter

```yaml
apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: default
spec:
  template:
    spec:
      requirements:
      - key: kubernetes.io/arch
        operator: In
        values: ["amd64", "arm64"]
      - key: karpenter.sh/capacity-type
        operator: In
        values: ["on-demand", "spot"]
      - key: node.kubernetes.io/instance-type
        operator: In
        values: ["m6i.large", "m6i.xlarge", "m7g.large", "m7g.xlarge"]
  limits:
    cpu: 100
    memory: 400Gi
  disruption:
    consolidationPolicy: WhenUnderutilized
    expireAfter: 720h  # Replace nodes every 30 days
```

## Security Hardening

### Network Policies

```yaml
# Deny all ingress by default
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress

---
# Allow specific traffic
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-api-to-db
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: database
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: api-server
    ports:
    - protocol: TCP
      port: 5432
```

### Pod Security Standards

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

## Troubleshooting Runbook

### Pod Not Starting

```bash
# Check pod events
kubectl describe pod <pod-name> -n <namespace>

# Check container logs
kubectl logs <pod-name> -n <namespace> --previous

# Common causes:
# - ImagePullBackOff: wrong image name or missing credentials
# - CrashLoopBackOff: application crash, check logs
# - Pending: insufficient resources, check node capacity
# - OOMKilled: increase memory limits
```

### High Latency Investigation

```bash
# Check pod resource usage
kubectl top pods -n <namespace> --sort-by=cpu

# Check node resource pressure
kubectl top nodes

# Check for throttled pods
kubectl get pods -n <namespace> -o json | \
  jq '.items[] | select(.status.containerStatuses[]?.state.waiting.reason == "CrashLoopBackOff") | .metadata.name'

# Check HPA status
kubectl get hpa -n <namespace>

# Check for pending pods (resource starvation)
kubectl get pods --field-selector=status.phase=Pending -A
```

### Cluster Health Check Script

```bash
#!/bin/bash
echo "=== Node Status ==="
kubectl get nodes -o wide

echo -e "\n=== Pod Issues ==="
kubectl get pods -A --field-selector=status.phase!=Running,status.phase!=Succeeded

echo -e "\n=== Resource Usage ==="
kubectl top nodes

echo -e "\n=== Recent Events (Warnings) ==="
kubectl get events -A --field-selector type=Warning --sort-by='.lastTimestamp' | tail -20

echo -e "\n=== PVC Issues ==="
kubectl get pvc -A --field-selector=status.phase!=Bound
```

## Next Steps

- [CI/CD Pipeline Patterns](/docs/cloud-devops/cicd-pipeline-patterns) — Deploy to Kubernetes
- [Observability Stack](/docs/cloud-devops/observability-stack) — Monitor your clusters
- [Terraform Best Practices](/docs/cloud-devops/terraform-best-practices) — IaC for K8s
