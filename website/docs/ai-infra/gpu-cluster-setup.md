---
sidebar_position: 2
title: "GPU Cluster Setup Guide"
description: "How to set up and manage GPU clusters for AI/ML workloads on Kubernetes using NVIDIA GPU Operator and cloud providers."
---

# GPU Cluster Setup Guide

Running AI workloads at scale requires properly configured GPU infrastructure. This guide covers GPU cluster setup on Kubernetes and major cloud providers.

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   GPU Cluster                        │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ GPU Node  │  │ GPU Node  │  │ GPU Node  │         │
│  │ A100 x4   │  │ A100 x4   │  │ A100 x4   │        │
│  └──────────┘  └──────────┘  └──────────┘          │
│       │              │              │                │
│  ┌──────────────────────────────────────────┐       │
│  │        NVIDIA GPU Operator                │       │
│  │  Device Plugin │ DCGM Exporter │ MIG      │       │
│  └──────────────────────────────────────────┘       │
│       │              │              │                │
│  ┌──────────────────────────────────────────┐       │
│  │        Kubernetes Scheduler               │       │
│  │  GPU-aware scheduling │ Topology-aware    │       │
│  └──────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────┘
```

## Cloud Provider GPU Options

| Provider | GPU Type | Instance | Use Case |
|----------|----------|----------|----------|
| **AWS** | A100 80GB | p4d.24xlarge | Large model training |
| **AWS** | L4 | g6.xlarge | Inference |
| **GCP** | A100 80GB | a2-ultragpu-8g | Training |
| **GCP** | L4 | g2-standard-4 | Inference |
| **Azure** | A100 80GB | ND96asr_v4 | Training |
| **Azure** | T4 | NC4as_T4_v3 | Inference |

## Setting Up NVIDIA GPU Operator on Kubernetes

### Prerequisites

- Kubernetes 1.25+
- Nodes with NVIDIA GPUs
- Helm 3.x

### Install GPU Operator

```bash
# Add NVIDIA Helm repo
helm repo add nvidia https://helm.ngc.nvidia.com/nvidia
helm repo update

# Install GPU Operator
helm install gpu-operator nvidia/gpu-operator \
  --namespace gpu-operator \
  --create-namespace \
  --set driver.enabled=true \
  --set toolkit.enabled=true \
  --set devicePlugin.enabled=true \
  --set dcgmExporter.enabled=true
```

### Verify Installation

```bash
# Check GPU nodes
kubectl get nodes -l nvidia.com/gpu.present=true

# Verify GPU resources
kubectl describe node <gpu-node> | grep nvidia.com/gpu

# Check DCGM metrics
kubectl port-forward svc/nvidia-dcgm-exporter 9400:9400 -n gpu-operator
curl localhost:9400/metrics | grep DCGM
```

## GPU Pod Scheduling

### Basic GPU Request

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: gpu-training-job
spec:
  containers:
  - name: trainer
    image: nvcr.io/nvidia/pytorch:24.01-py3
    resources:
      limits:
        nvidia.com/gpu: 2  # Request 2 GPUs
    command: ["python", "train.py"]
  restartPolicy: Never
  tolerations:
  - key: nvidia.com/gpu
    operator: Exists
    effect: NoSchedule
```

### Multi-Instance GPU (MIG) Configuration

MIG lets you partition a single A100 into up to 7 instances:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: inference-server
spec:
  containers:
  - name: model-server
    image: nvcr.io/nvidia/tritonserver:24.01-py3
    resources:
      limits:
        nvidia.com/mig-3g.20gb: 1  # 20GB MIG slice
```

## Cost Optimization Strategies

1. **Use spot/preemptible instances** for training jobs (60-90% savings)
2. **Right-size GPU selection** — use L4/T4 for inference, A100 for training
3. **Time-share GPUs** with MIG for smaller workloads
4. **Auto-scale GPU nodes** to zero when idle
5. **Use mixed-precision training** (FP16/BF16) for 2x throughput

```yaml
# Karpenter provisioner for GPU spot instances
apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: gpu-spot
spec:
  template:
    spec:
      requirements:
      - key: node.kubernetes.io/instance-type
        operator: In
        values: ["g5.xlarge", "g5.2xlarge"]
      - key: karpenter.sh/capacity-type
        operator: In
        values: ["spot"]
      - key: nvidia.com/gpu
        operator: Exists
  limits:
    nvidia.com/gpu: 16
```

## Monitoring GPU Utilization

Set up Prometheus + Grafana dashboards for GPU metrics:

```yaml
# Prometheus scrape config for DCGM
- job_name: 'gpu-metrics'
  kubernetes_sd_configs:
  - role: pod
  relabel_configs:
  - source_labels: [__meta_kubernetes_pod_label_app]
    regex: nvidia-dcgm-exporter
    action: keep
```

Key metrics to track:
- `DCGM_FI_DEV_GPU_UTIL` — GPU utilization %
- `DCGM_FI_DEV_FB_USED` — GPU memory used
- `DCGM_FI_DEV_POWER_USAGE` — Power consumption
- `DCGM_FI_DEV_GPU_TEMP` — Temperature

## Next Steps

- [Model Serving with Triton](/docs/ai-infra/model-serving) — Deploy models at scale
- [MLOps Pipelines](/docs/ai-infra/getting-started) — CI/CD for ML
- [Cost Optimization](/docs/cloud-devops/getting-started) — Reduce cloud spend
