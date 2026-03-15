---
sidebar_position: 8
title: Vector Databases
description: Vector database tools for AI applications — Pinecone, Weaviate, and Qdrant compared for embedding storage, similarity search, and RAG pipelines.
keywords: [vector database, pinecone, weaviate, qdrant, embedding search, similarity search, rag vector store]
---

# Vector Databases

Vector databases are the storage backbone for RAG systems, semantic search, and recommendation engines. They store high-dimensional embeddings and execute fast similarity searches at scale.

## Why Vector Databases Matter

Traditional databases index structured data — rows, columns, keys. AI applications work with embeddings: dense numerical vectors that represent the semantic meaning of text, images, or audio. Vector databases are purpose-built for:

- **Approximate nearest neighbor (ANN) search** at millisecond latency
- **Scaling to billions of vectors** with efficient indexing (HNSW, IVF, PQ)
- **Metadata filtering** — combine vector similarity with attribute filters
- **Real-time ingestion** — continuously index new documents without rebuilding
- **Hybrid search** — combine vector similarity with keyword (BM25) search

## Tool Comparison

| Feature | Pinecone | Weaviate | Qdrant |
|---|---|---|---|
| **Deployment** | Fully managed (SaaS) | Self-hosted or cloud | Self-hosted or cloud |
| **Index Algorithm** | Proprietary (PineconeDB) | HNSW | HNSW |
| **Hybrid Search** | Sparse + dense vectors | BM25 + vector | Sparse + dense vectors |
| **Metadata Filtering** | Yes (server-side) | Yes (with GraphQL) | Yes (payload-based) |
| **Multi-tenancy** | Namespaces | Classes + tenants | Collections + payload |
| **Max Dimensions** | 20,000 | Configurable | Configurable |
| **Built-in Embedding** | No (bring your own) | Yes (modules) | No (bring your own) |
| **Replication** | Managed | Configurable | Raft-based |
| **Language** | Proprietary | Go | Rust |
| **Open Source** | No | Yes (BSD-3) | Yes (Apache 2.0) |
| **Kubernetes Native** | N/A (managed) | Helm chart | Helm chart |

## Pinecone

**Fully managed vector database — zero infrastructure, focus on search quality.**

### Architecture

```
Application
    │
    ▼
┌──────────────────────────────────────────┐
│           Pinecone Service               │
│                                          │
│  ┌────────────┐    ┌─────────────────┐  │
│  │ Index      │    │ Query Engine    │  │
│  │ (Serverless│    │                 │  │
│  │  or Pod)   │    │ • ANN search    │  │
│  │            │    │ • Metadata      │  │
│  │ • Upsert   │    │   filtering    │  │
│  │ • Delete   │    │ • Hybrid search │  │
│  │ • Update   │    │ • Namespaces   │  │
│  └────────────┘    └─────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ Storage Tiers                     │   │
│  │ • Serverless (pay-per-query)     │   │
│  │ • Pods (dedicated compute)       │   │
│  └──────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

### Use Cases

- **Managed RAG** — Teams that want vector search without infrastructure management
- **Serverless workloads** — Variable query volume with pay-per-query pricing
- **Multi-tenant SaaS** — Namespace isolation per customer
- **Production search** — Low-latency similarity search with managed uptime SLAs

### Pros and Cons

**Pros:**
- Zero infrastructure management
- Serverless tier for cost-effective scaling
- Fast query latency with managed optimization
- Simple SDK (Python, Node.js, Go, Java)

**Cons:**
- No self-hosted option — data must reside in Pinecone cloud
- Vendor lock-in with proprietary index format
- Higher cost at scale compared to self-hosted alternatives
- Limited customization of indexing parameters

### Deployment Pattern

```python
from pinecone import Pinecone

# Initialize client
pc = Pinecone(api_key="YOUR_API_KEY")
index = pc.Index("my-rag-index")

# Upsert embeddings
index.upsert(
    vectors=[
        {"id": "doc-1", "values": embedding, "metadata": {"source": "kb", "topic": "devops"}},
    ],
    namespace="production",
)

# Query with metadata filter
results = index.query(
    vector=query_embedding,
    top_k=5,
    namespace="production",
    filter={"topic": {"$eq": "devops"}},
    include_metadata=True,
)
```

### When to Choose Pinecone

Choose Pinecone when you want managed infrastructure, need an SLA, and prefer operational simplicity over cost optimization. Best for teams without dedicated infrastructure engineers for vector DB management.

---

## Weaviate

**Open-source vector database with built-in vectorization modules and GraphQL API.**

### Architecture

```
Application
    │
    ▼
┌──────────────────────────────────────────┐
│            Weaviate Cluster              │
│                                          │
│  ┌────────────┐    ┌─────────────────┐  │
│  │ REST /     │    │ Vectorizer      │  │
│  │ GraphQL    │    │ Modules         │  │
│  │ API        │    │                 │  │
│  │            │    │ • text2vec-     │  │
│  │ • CRUD     │    │   openai       │  │
│  │ • Search   │    │ • text2vec-     │  │
│  │ • Classify │    │   transformers │  │
│  │ • Aggregate│    │ • img2vec      │  │
│  └────────────┘    └─────────────────┘  │
│                                          │
│  ┌────────────┐    ┌─────────────────┐  │
│  │ HNSW       │    │ Inverted Index  │  │
│  │ Vector     │    │ (BM25 keyword)  │  │
│  │ Index      │    │                 │  │
│  └────────────┘    └─────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ Multi-tenancy + Replication      │   │
│  └──────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

### Use Cases

- **Self-hosted RAG** — Full control over data residency and infrastructure
- **Hybrid search** — Combine vector similarity with keyword search in one query
- **Built-in vectorization** — Let Weaviate handle embedding generation via modules
- **Multi-modal search** — Text, image, and cross-modal similarity search
- **Kubernetes-native deployments** — Helm chart with StatefulSet for production

### Pros and Cons

**Pros:**
- Open-source (BSD-3 license)
- Built-in vectorization modules — no external embedding pipeline needed
- Native hybrid search (BM25 + vector)
- GraphQL API for complex queries
- Multi-tenancy support for SaaS applications
- Kubernetes Helm chart with replication

**Cons:**
- Higher operational complexity than managed alternatives
- Go codebase — harder to debug for Python-centric teams
- Memory-intensive for large indexes (HNSW requires RAM)
- Module ecosystem adds configuration complexity

### Deployment Pattern (Kubernetes)

```yaml
# Weaviate Helm deployment
helm repo add weaviate https://weaviate.github.io/weaviate-helm
helm install weaviate weaviate/weaviate \
  --set replicas=3 \
  --set storage.size=100Gi \
  --set env.AUTHENTICATION_APIKEY_ENABLED=true \
  --set env.ENABLE_MODULES="text2vec-openai,generative-openai" \
  --set env.QUERY_DEFAULTS_LIMIT=25
```

```python
import weaviate

client = weaviate.connect_to_local()

# Create collection with vectorizer
collection = client.collections.create(
    name="Document",
    vectorizer_config=weaviate.classes.config.Configure.Vectorizer.text2vec_openai(),
    properties=[
        weaviate.classes.config.Property(name="content", data_type=weaviate.classes.config.DataType.TEXT),
        weaviate.classes.config.Property(name="source", data_type=weaviate.classes.config.DataType.TEXT),
    ],
)

# Hybrid search (vector + keyword)
results = collection.query.hybrid(
    query="kubernetes gpu scheduling",
    limit=5,
    alpha=0.75,  # 0 = keyword only, 1 = vector only
)
```

### When to Choose Weaviate

Choose Weaviate when you need self-hosted deployment, built-in vectorization, hybrid search, or multi-modal capabilities. Best for teams with Kubernetes infrastructure who want full control.

---

## Qdrant

**High-performance vector search engine written in Rust — focused on speed and efficiency.**

### Architecture

```
Application
    │
    ▼
┌──────────────────────────────────────────┐
│            Qdrant Cluster                │
│                                          │
│  ┌────────────┐    ┌─────────────────┐  │
│  │ REST /     │    │ HNSW Index      │  │
│  │ gRPC API   │    │                 │  │
│  │            │    │ • On-disk index │  │
│  │ • Points   │    │ • Quantization  │  │
│  │ • Search   │    │   (scalar, PQ)  │  │
│  │ • Scroll   │    │ • Mmap storage  │  │
│  │ • Recommend│    │                 │  │
│  └────────────┘    └─────────────────┘  │
│                                          │
│  ┌────────────┐    ┌─────────────────┐  │
│  │ Payload    │    │ Sparse Vectors  │  │
│  │ Index      │    │ (Hybrid search) │  │
│  │ (Metadata) │    │                 │  │
│  └────────────┘    └─────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ Raft Consensus + Sharding       │   │
│  └──────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

### Use Cases

- **High-throughput search** — Rust engine delivers low-latency queries at scale
- **Cost-efficient deployments** — Quantization and on-disk indexes reduce memory requirements
- **Recommendation systems** — Built-in recommendation API using positive/negative examples
- **Large-scale indexing** — Billions of vectors with sharding and on-disk storage
- **Edge and self-hosted** — Lightweight binary, runs on minimal infrastructure

### Pros and Cons

**Pros:**
- Written in Rust — excellent performance and memory safety
- Quantization support (scalar, product) for reduced memory footprint
- On-disk index option for cost-efficient large-scale deployments
- Sparse vector support for hybrid search
- gRPC API for high-throughput ingestion
- Apache 2.0 license

**Cons:**
- No built-in vectorization — requires external embedding pipeline
- Cloud offering is newer than Pinecone/Weaviate
- Smaller ecosystem and fewer integrations
- Documentation less mature for advanced configurations

### Deployment Pattern

```yaml
# Qdrant Kubernetes deployment
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: qdrant
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: qdrant
          image: qdrant/qdrant:v1.12.0
          ports:
            - containerPort: 6333  # REST
            - containerPort: 6334  # gRPC
          env:
            - name: QDRANT__CLUSTER__ENABLED
              value: "true"
          volumeMounts:
            - name: qdrant-storage
              mountPath: /qdrant/storage
```

```python
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

client = QdrantClient(host="qdrant", port=6333)

# Create collection with quantization
client.create_collection(
    collection_name="documents",
    vectors_config=VectorParams(
        size=1536,
        distance=Distance.COSINE,
        on_disk=True,  # Reduced memory usage
    ),
    quantization_config={
        "scalar": {"type": "int8", "quantile": 0.99, "always_ram": True}
    },
)

# Search with payload filter
results = client.query_points(
    collection_name="documents",
    query=query_embedding,
    query_filter={"must": [{"key": "source", "match": {"value": "knowledge-base"}}]},
    limit=5,
)
```

### When to Choose Qdrant

Choose Qdrant when you need maximum search performance, cost-efficient large-scale deployments (quantization + on-disk), or a lightweight self-hosted solution. Best for teams that prioritize speed and memory efficiency.

## Integration with AI Infrastructure

All three vector databases integrate with the broader AI infrastructure stack:

- **RAG Pipelines**: Serve as the retrieval layer in [production RAG systems](/docs/ai-architecture/production-rag-systems)
- **Kubernetes Deployment**: Weaviate and Qdrant deploy natively on [Kubernetes AI infrastructure](/docs/ai-architecture/ai-infrastructure-kubernetes)
- **Security**: Document access control should be enforced at the vector DB level as part of [secure LLM pipelines](/docs/ai-architecture/secure-llm-pipelines)
- **Monitoring**: Query latency, index size, and cache hit rates feed into the [AI observability stack](/docs/ai-architecture/ai-observability-stack)

## Related

- [RAG Platforms (Haystack, LlamaIndex) →](./rag-platforms)
- [Production RAG Systems →](/docs/ai-architecture/production-rag-systems)
- [AI Infrastructure on Kubernetes →](/docs/ai-architecture/ai-infrastructure-kubernetes)
- [Pinecone vs Weaviate →](/comparisons/pinecone-vs-weaviate)
- [Pinecone vs Qdrant →](/docs/comparisons/pinecone-vs-qdrant)
- [Weaviate vs Qdrant →](/docs/comparisons/weaviate-vs-qdrant)
- [AI Infrastructure Consulting →](/services)
