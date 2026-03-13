---
sidebar_position: 3
title: "Model Serving Architecture"
description: "Deploy and serve ML models in production with Triton Inference Server, vLLM, and Kubernetes-native serving platforms."
---

# Model Serving Architecture

Moving models from notebooks to production requires a robust serving infrastructure. This guide covers patterns for serving ML models at scale.

## Serving Architecture Patterns

```
┌─────────────────────────────────────────────────────┐
│                  Load Balancer                       │
│            (NGINX / Istio Gateway)                   │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │  Model A    │  │  Model B    │  │  Model C    │   │
│  │  (Triton)   │  │  (vLLM)     │  │  (TorchServe)│  │
│  │  GPU: A100   │  │  GPU: A100   │  │  CPU only    │  │
│  └────────────┘  └────────────┘  └────────────┘    │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │           Model Registry (MLflow)              │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │         Feature Store (Feast)                  │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

## Serving Frameworks Comparison

| Framework | Best For | Protocol | GPU Support | Auto-scaling |
|-----------|----------|----------|-------------|-------------|
| **Triton** | Multi-framework models | gRPC/HTTP | Excellent | Yes |
| **vLLM** | LLM inference | OpenAI-compatible | Excellent | Yes |
| **TorchServe** | PyTorch models | REST/gRPC | Good | Yes |
| **TF Serving** | TensorFlow models | REST/gRPC | Good | Yes |
| **KServe** | K8s-native serving | REST/gRPC | Good | Built-in |

## Deploying with Triton Inference Server

### Model Repository Structure

```
model_repository/
├── text_classification/
│   ├── config.pbtxt
│   └── 1/
│       └── model.onnx
├── image_detection/
│   ├── config.pbtxt
│   └── 1/
│       └── model.plan
└── embeddings/
    ├── config.pbtxt
    └── 1/
        └── model.pt
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: triton-inference
  namespace: ml-serving
spec:
  replicas: 2
  selector:
    matchLabels:
      app: triton
  template:
    metadata:
      labels:
        app: triton
    spec:
      containers:
      - name: triton
        image: nvcr.io/nvidia/tritonserver:24.01-py3
        args:
        - tritonserver
        - --model-repository=s3://models/repository
        - --log-verbose=1
        ports:
        - containerPort: 8000  # HTTP
        - containerPort: 8001  # gRPC
        - containerPort: 8002  # Metrics
        resources:
          limits:
            nvidia.com/gpu: 1
            memory: "16Gi"
          requests:
            cpu: "4"
            memory: "8Gi"
        livenessProbe:
          httpGet:
            path: /v2/health/live
            port: 8000
          initialDelaySeconds: 30
        readinessProbe:
          httpGet:
            path: /v2/health/ready
            port: 8000
---
apiVersion: v1
kind: Service
metadata:
  name: triton-service
spec:
  selector:
    app: triton
  ports:
  - name: http
    port: 8000
  - name: grpc
    port: 8001
  - name: metrics
    port: 8002
```

## Serving LLMs with vLLM

vLLM provides high-throughput LLM serving with PagedAttention:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vllm-server
spec:
  replicas: 1
  selector:
    matchLabels:
      app: vllm
  template:
    spec:
      containers:
      - name: vllm
        image: vllm/vllm-openai:latest
        args:
        - --model=meta-llama/Llama-3-8B-Instruct
        - --tensor-parallel-size=1
        - --max-model-len=4096
        - --gpu-memory-utilization=0.9
        ports:
        - containerPort: 8000
        resources:
          limits:
            nvidia.com/gpu: 1
        env:
        - name: HUGGING_FACE_HUB_TOKEN
          valueFrom:
            secretKeyRef:
              name: hf-secret
              key: token
```

### Query the LLM (OpenAI-compatible API)

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://vllm-service:8000/v1",
    api_key="not-needed"
)

response = client.chat.completions.create(
    model="meta-llama/Llama-3-8B-Instruct",
    messages=[
        {"role": "user", "content": "Explain AIOps in 3 sentences."}
    ],
    max_tokens=200
)
print(response.choices[0].message.content)
```

## Auto-Scaling Model Servers

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: triton-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: triton-inference
  minReplicas: 1
  maxReplicas: 8
  metrics:
  - type: Pods
    pods:
      metric:
        name: nv_inference_queue_duration_us
      target:
        type: AverageValue
        averageValue: "1000"  # Scale up when queue > 1ms
```

## Best Practices

1. **Batch requests** — group inference requests for higher GPU utilization
2. **Model caching** — pre-load models to avoid cold starts
3. **Health checks** — implement both liveness and readiness probes
4. **A/B testing** — use traffic splitting for model version testing
5. **Monitor latency** — track p50, p95, p99 inference latency

## Next Steps

- [GPU Cluster Setup](/docs/ai-infra/gpu-cluster-setup) — Configure GPU infrastructure
- [MLOps Pipelines](/docs/ai-infra/getting-started) — Automate model lifecycle
