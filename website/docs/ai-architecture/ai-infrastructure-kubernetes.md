---
sidebar_position: 9
title: AI Infrastructure on Kubernetes
description: Kubernetes-native AI infrastructure — GPU scheduling, model serving with vLLM and Triton, inference autoscaling, vector database deployment, and agent orchestration patterns.
keywords: [kubernetes ai, gpu scheduling, model serving, vllm kubernetes, triton inference, ai infrastructure, vector database kubernetes]
---

# AI Infrastructure on Kubernetes

Production architecture for running AI workloads on Kubernetes — GPU resource management, model serving, inference autoscaling, and vector database deployment.

## Why Kubernetes for AI Infrastructure

| Requirement | Kubernetes Capability |
|---|---|
| **GPU Scheduling** | Device plugin framework, NVIDIA GPU Operator, time-slicing, MIG |
| **Model Serving** | KServe, Triton Inference Server, vLLM as StatefulSet |
| **Autoscaling** | KEDA, HPA with custom metrics (queue depth, GPU utilization) |
| **Multi-Tenancy** | Namespaces, ResourceQuotas, PriorityClasses |
| **Storage** | PVCs for model weights, CSI drivers for high-throughput I/O |
| **Observability** | Prometheus, OpenTelemetry, DCGM GPU metrics |
| **CI/CD** | GitOps (ArgoCD), Helm charts, Kustomize overlays |

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 Ingress / API Gateway                 │    │
│  │          (Kong / Envoy / NGINX + AI Gateway)         │    │
│  └──────────────────────┬──────────────────────────────┘    │
│                         │                                    │
│  ┌──────────────────────┼──────────────────────────┐        │
│  │          Model Serving Layer                     │        │
│  │  ┌────────────┐ ┌───────────┐ ┌──────────────┐ │        │
│  │  │ vLLM       │ │ Triton    │ │ KServe       │ │        │
│  │  │ (LLM      │ │ (Multi-   │ │ (Serving     │ │        │
│  │  │  serving)  │ │  model)   │ │  framework)  │ │        │
│  │  └────────────┘ └───────────┘ └──────────────┘ │        │
│  └──────────────────────┬──────────────────────────┘        │
│                         │                                    │
│  ┌──────────────────────┼──────────────────────────┐        │
│  │          Data Layer                              │        │
│  │  ┌────────────┐ ┌───────────┐ ┌──────────────┐ │        │
│  │  │ Weaviate   │ │ Redis     │ │ PostgreSQL   │ │        │
│  │  │ (Vector DB)│ │ (Cache /  │ │ (pgvector)   │ │        │
│  │  │            │ │  Semantic │ │              │ │        │
│  │  │            │ │  Cache)   │ │              │ │        │
│  │  └────────────┘ └───────────┘ └──────────────┘ │        │
│  └──────────────────────┬──────────────────────────┘        │
│                         │                                    │
│  ┌──────────────────────┴──────────────────────────┐        │
│  │          Platform Services                       │        │
│  │  ┌────────────┐ ┌───────────┐ ┌──────────────┐ │        │
│  │  │ NVIDIA GPU │ │ KEDA      │ │ Prometheus   │ │        │
│  │  │ Operator   │ │ Autoscaler│ │ + DCGM       │ │        │
│  │  └────────────┘ └───────────┘ └──────────────┘ │        │
│  └─────────────────────────────────────────────────┘        │
│                                                              │
│  GPU Node Pool          CPU Node Pool         Storage Pool   │
│  ┌──────────────┐      ┌──────────────┐     ┌──────────┐   │
│  │ A100 / H100  │      │ General      │     │ NVMe PVs │   │
│  │ GPU Nodes    │      │ Compute      │     │ for Model │   │
│  │              │      │              │     │ Weights   │   │
│  └──────────────┘      └──────────────┘     └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Architecture Components

### Component 1: GPU Scheduling and Node Management

Configure the NVIDIA GPU Operator and node pools for AI workloads:

```yaml
# gpu-operator-values.yaml — NVIDIA GPU Operator Helm values
operator:
  defaultRuntime: containerd

driver:
  enabled: true

toolkit:
  enabled: true

devicePlugin:
  enabled: true

dcgmExporter:
  enabled: true
  serviceMonitor:
    enabled: true

mig:
  strategy: mixed   # Enable MIG for A100/H100 GPUs
```

```yaml
# gpu-node-pool.yaml — GPU node taints and labels
apiVersion: v1
kind: Node
metadata:
  labels:
    nvidia.com/gpu.product: "NVIDIA-A100-SXM4-80GB"
    node-role.kubernetes.io/gpu-worker: ""
    ai.platform/workload-type: "inference"
spec:
  taints:
    - key: nvidia.com/gpu
      value: "true"
      effect: NoSchedule
```

```yaml
# gpu-resource-quota.yaml — Enforce GPU limits per namespace
apiVersion: v1
kind: ResourceQuota
metadata:
  name: gpu-quota
  namespace: ai-inference
spec:
  hard:
    requests.nvidia.com/gpu: "4"
    limits.nvidia.com/gpu: "4"
    requests.memory: "256Gi"
    limits.memory: "512Gi"
```

### Component 2: Model Serving with vLLM

Deploy vLLM as a Kubernetes workload for high-throughput LLM inference:

```yaml
# vllm-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vllm-server
  namespace: ai-inference
  labels:
    app: vllm-server
spec:
  replicas: 2
  selector:
    matchLabels:
      app: vllm-server
  template:
    metadata:
      labels:
        app: vllm-server
    spec:
      nodeSelector:
        nvidia.com/gpu.product: "NVIDIA-A100-SXM4-80GB"
      tolerations:
        - key: nvidia.com/gpu
          operator: Equal
          value: "true"
          effect: NoSchedule
      containers:
        - name: vllm
          image: vllm/vllm-openai:latest
          args:
            - "--model"
            - "meta-llama/Llama-3-8B-Instruct"
            - "--tensor-parallel-size"
            - "1"
            - "--max-model-len"
            - "8192"
            - "--gpu-memory-utilization"
            - "0.90"
          ports:
            - containerPort: 8000
              name: http
          resources:
            limits:
              nvidia.com/gpu: "1"
              memory: "80Gi"
            requests:
              nvidia.com/gpu: "1"
              memory: "40Gi"
          readinessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 120
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 180
            periodSeconds: 30
          volumeMounts:
            - name: model-cache
              mountPath: /root/.cache/huggingface
            - name: shm
              mountPath: /dev/shm
      volumes:
        - name: model-cache
          persistentVolumeClaim:
            claimName: model-weights-pvc
        - name: shm
          emptyDir:
            medium: Memory
            sizeLimit: "16Gi"
---
apiVersion: v1
kind: Service
metadata:
  name: vllm-server
  namespace: ai-inference
spec:
  selector:
    app: vllm-server
  ports:
    - port: 8000
      targetPort: 8000
      name: http
```

### Component 3: Inference Autoscaling with KEDA

Scale model serving based on queue depth and request latency:

```yaml
# keda-scaledobject.yaml — Autoscale vLLM based on Prometheus metrics
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: vllm-scaler
  namespace: ai-inference
spec:
  scaleTargetRef:
    name: vllm-server
  minReplicaCount: 1
  maxReplicaCount: 8
  pollingInterval: 15
  cooldownPeriod: 300
  triggers:
    - type: prometheus
      metadata:
        serverAddress: http://prometheus.monitoring:9090
        metricName: vllm_pending_requests
        query: |
          sum(vllm_num_requests_waiting{namespace="ai-inference"})
        threshold: "10"
    - type: prometheus
      metadata:
        serverAddress: http://prometheus.monitoring:9090
        metricName: vllm_gpu_utilization
        query: |
          avg(DCGM_FI_DEV_GPU_UTIL{namespace="ai-inference"})
        threshold: "80"
```

### Component 4: Vector Database Deployment

Deploy Weaviate as a StatefulSet for RAG workloads:

```yaml
# weaviate-statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: weaviate
  namespace: ai-data
spec:
  serviceName: weaviate
  replicas: 3
  selector:
    matchLabels:
      app: weaviate
  template:
    metadata:
      labels:
        app: weaviate
    spec:
      containers:
        - name: weaviate
          image: semitechnologies/weaviate:1.27.0
          ports:
            - containerPort: 8080
              name: http
            - containerPort: 50051
              name: grpc
          env:
            - name: QUERY_DEFAULTS_LIMIT
              value: "25"
            - name: AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED
              value: "false"
            - name: AUTHENTICATION_APIKEY_ENABLED
              value: "true"
            - name: AUTHENTICATION_APIKEY_ALLOWED_KEYS
              valueFrom:
                secretKeyRef:
                  name: weaviate-api-keys
                  key: allowed-keys
            - name: PERSISTENCE_DATA_PATH
              value: "/var/lib/weaviate"
            - name: ENABLE_MODULES
              value: "text2vec-openai,generative-openai"
            - name: CLUSTER_DATA_BIND_PORT
              value: "7001"
          # Note: Replication factor is configured per collection at schema creation time via the Weaviate client, not as a server-level environment variable.
          resources:
            requests:
              memory: "8Gi"
              cpu: "2"
            limits:
              memory: "16Gi"
              cpu: "4"
          volumeMounts:
            - name: weaviate-data
              mountPath: /var/lib/weaviate
  volumeClaimTemplates:
    - metadata:
        name: weaviate-data
      spec:
        accessModes: ["ReadWriteOnce"]
        storageClassName: fast-ssd
        resources:
          requests:
            storage: 100Gi
```

## Recommended Tools

| Function | Tool | Purpose |
|---|---|---|
| **GPU Management** | NVIDIA GPU Operator | Device plugin, drivers, DCGM metrics |
| **Model Serving** | vLLM / Triton | High-throughput LLM inference |
| **Serving Framework** | KServe | Multi-model serving with canary rollouts |
| **Autoscaling** | KEDA | Custom metric-based scaling |
| **Vector Database** | [Weaviate / Pinecone](/docs/ai-tools/rag-platforms) | Embedding storage and retrieval |
| **AI Gateway** | [Kong + AI Plugin](./ai-gateway-architecture) | Rate limiting, auth, routing |
| **Observability** | [Langfuse + Prometheus](/docs/ai-tools/ai-observability-tools) | LLM tracing + infrastructure metrics |
| **GitOps** | ArgoCD / Flux | Declarative deployment management |
| **CI/CD** | GitHub Actions | Build, test, and deploy model serving images |

## Security Considerations

1. **Secrets management** — Use Kubernetes Secrets or external providers (Vault, AWS Secrets Manager) for API keys and model access tokens. Never store credentials in manifests.
2. **Network policies** — Restrict egress from model serving pods. LLM inference pods should not have internet access in production.
3. **RBAC** — Limit who can deploy and modify GPU workloads via Kubernetes RBAC.
4. **Image scanning** — Scan model serving images for vulnerabilities before deployment.
5. **PodSecurityStandards** — Enforce restricted security context on all AI workloads.
6. **Model weight integrity** — Verify checksums of model weights before loading.

```yaml
# network-policy.yaml — Restrict model serving egress
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: restrict-inference-egress
  namespace: ai-inference
spec:
  podSelector:
    matchLabels:
      app: vllm-server
  policyTypes:
    - Egress
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              name: ai-data
      ports:
        - port: 8080
        - port: 50051
    - to:
        - namespaceSelector:
            matchLabels:
              name: monitoring
      ports:
        - port: 9090
```

## Best Practices

1. **Separate GPU and CPU node pools** — Use taints and tolerations to prevent non-GPU workloads on expensive GPU nodes
2. **Pre-pull model weights** — Use init containers or DaemonSets to pre-download models to local NVMe storage
3. **Set memory limits carefully** — LLM inference consumes large amounts of GPU VRAM and system RAM
4. **Use shared memory** — Mount `/dev/shm` as emptyDir for multi-process model serving
5. **Monitor GPU utilization** — Deploy DCGM exporter and set alerts for low utilization (wasted cost) and high utilization (capacity risk)
6. **Implement graceful shutdown** — Configure `preStop` hooks and `terminationGracePeriodSeconds` for in-flight request draining
7. **Use PriorityClasses** — Ensure model serving pods preempt batch jobs during resource contention
8. **Version model deployments** — Tag deployments with model name, version, and quantization level

## Implementation Checklist

- [ ] Install NVIDIA GPU Operator in cluster
- [ ] Configure GPU node pools with appropriate taints and labels
- [ ] Set ResourceQuotas for GPU usage per namespace
- [ ] Deploy model serving (vLLM or Triton) with proper GPU resource requests
- [ ] Configure PersistentVolumeClaims for model weight caching
- [ ] Deploy KEDA and configure autoscaling triggers
- [ ] Deploy vector database with replication and persistent storage
- [ ] Set up NetworkPolicies for inference workloads
- [ ] Configure DCGM exporter and Prometheus scraping for GPU metrics
- [ ] Implement GitOps pipeline (ArgoCD) for model serving deployments
- [ ] Set up alerts for GPU utilization, inference latency, and error rate

## Related Guides

- [AI Gateway Architecture →](./ai-gateway-architecture)
- [AI Observability Stack →](./ai-observability-stack)
- [AI Cost Optimization →](./ai-cost-optimization)
- [Multi-Model LLM Routing →](./multi-model-llm-routing)
- [LLM Monitoring and Tracing →](./llm-monitoring-tracing)
- [RAG Platforms and Vector Databases →](/docs/ai-tools/rag-platforms)
- [AI Observability Tools →](/docs/ai-tools/ai-observability-tools)
- [Pinecone vs Weaviate →](/comparisons/pinecone-vs-weaviate)
- [Kubernetes Operations →](/docs/cloud-devops/kubernetes-operations)
- [Architecture Playbooks Index →](./architecture-playbooks)
- [AI Infrastructure Consulting →](/services)
