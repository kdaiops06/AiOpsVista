---
sidebar_position: 12
title: "Weaviate: Open-Source Vector Database"
description: Weaviate deep-dive — open-source vector database with built-in vectorization, hybrid search, multi-tenancy, and Kubernetes-native deployment.
keywords: [weaviate, vector database, open source vector db, hybrid search, rag vector store, kubernetes vector database]
---

# Weaviate

**Open-source vector database with built-in vectorization modules, native hybrid search, and Kubernetes-ready deployment.**

## Overview

Weaviate is an open-source (BSD-3) vector database written in Go that differentiates itself through built-in vectorization modules, native hybrid search (BM25 + vector), and a GraphQL API. Unlike Pinecone (managed-only) or Qdrant (bring-your-own-embeddings), Weaviate can generate embeddings internally via pluggable modules — eliminating the need for a separate embedding pipeline.

For DevOps and platform teams, Weaviate is notable for its Kubernetes-native architecture: it ships as a Helm chart with StatefulSet deployment, configurable replication, and multi-tenancy support. This makes it a natural choice for teams that want full control over data residency and infrastructure.

## Architecture

```
┌────────────────────────────────────────────────────────┐
│                   Weaviate Cluster                      │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │                 API Layer                          │ │
│  │  ┌──────────┐  ┌───────────┐  ┌───────────────┐  │ │
│  │  │ REST API │  │ GraphQL   │  │ gRPC API      │  │ │
│  │  │          │  │ API       │  │ (high-perf)   │  │ │
│  │  └──────────┘  └───────────┘  └───────────────┘  │ │
│  └───────────────────────┬───────────────────────────┘ │
│                          │                              │
│  ┌───────────────────────┼───────────────────────────┐ │
│  │              Core Engine                           │ │
│  │  ┌──────────────┐  ┌────────────────────────────┐ │ │
│  │  │ HNSW Vector  │  │ Inverted Index (BM25)      │ │ │
│  │  │ Index        │  │ Keyword search             │ │ │
│  │  └──────────────┘  └────────────────────────────┘ │ │
│  │                                                    │ │
│  │  ┌──────────────┐  ┌────────────────────────────┐ │ │
│  │  │ Object Store │  │ Metadata / Property Index  │ │ │
│  │  │ (LSM)        │  │                            │ │ │
│  │  └──────────────┘  └────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │           Module Layer                             │ │
│  │  ┌──────────────┐  ┌────────────┐  ┌───────────┐ │ │
│  │  │ text2vec-    │  │ text2vec-  │  │ img2vec-  │ │ │
│  │  │ openai       │  │ transformers  │ openai    │ │ │
│  │  ├──────────────┤  ├────────────┤  ├───────────┤ │ │
│  │  │ generative-  │  │ multi2vec- │  │ reranker- │ │ │
│  │  │ openai       │  │ clip       │  │ cohere    │ │ │
│  │  └──────────────┘  └────────────┘  └───────────┘ │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │     Clustering & Multi-tenancy                     │ │
│  │  • Sharding across nodes                           │ │
│  │  • Configurable replication factor                 │ │
│  │  • Tenant isolation (hot/cold/frozen states)       │ │
│  └───────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

### Key Architecture Features

| Feature | Description |
|---|---|
| **Vectorizer Modules** | Built-in embedding generation via pluggable modules (OpenAI, Cohere, Hugging Face, local transformers) |
| **Hybrid Search** | Native combination of BM25 keyword search and vector similarity in a single query |
| **GraphQL API** | Complex queries with filters, aggregations, and cross-references |
| **Multi-tenancy** | Native tenant isolation with per-tenant activity states (hot, cold, frozen) |
| **Replication** | Configurable replication factor for read throughput and fault tolerance |
| **Generative Modules** | Built-in RAG — retrieve and generate in a single API call |

## Use Cases

### Self-Hosted RAG with Built-in Vectorization

Eliminate the external embedding pipeline:

```python
import weaviate
import weaviate.classes.config as wc

client = weaviate.connect_to_local()

# Create collection with built-in vectorizer
collection = client.collections.create(
    name="KnowledgeBase",
    vectorizer_config=wc.Configure.Vectorizer.text2vec_openai(
        model="text-embedding-3-small",
    ),
    generative_config=wc.Configure.Generative.openai(
        model="gpt-4o",
    ),
    properties=[
        wc.Property(name="content", data_type=wc.DataType.TEXT),
        wc.Property(name="source", data_type=wc.DataType.TEXT),
        wc.Property(name="department", data_type=wc.DataType.TEXT),
    ],
)

# Insert objects — Weaviate generates embeddings automatically
collection.data.insert({"content": "Kubernetes HPA scales pods...", "source": "docs"})

# Hybrid search (vector + keyword)
results = collection.query.hybrid(
    query="how does pod autoscaling work",
    alpha=0.75,  # 0.75 = 75% vector, 25% keyword
    limit=5,
    filters=weaviate.classes.query.Filter.by_property("source").equal("docs"),
)
```

### RAG in a Single API Call

Use generative modules for retrieve-and-generate:

```python
# Search + generate in one call
response = collection.generate.near_text(
    query="kubernetes autoscaling best practices",
    limit=5,
    grouped_task="Summarize these documents into a concise answer about autoscaling.",
)

print(response.generated)  # LLM-generated summary based on retrieved docs
```

### Multi-Tenant SaaS

Isolate customer data with native multi-tenancy:

```python
# Enable multi-tenancy on collection
collection = client.collections.create(
    name="CustomerDocs",
    multi_tenancy_config=wc.Configure.multi_tenancy(enabled=True),
    vectorizer_config=wc.Configure.Vectorizer.text2vec_openai(),
)

# Create tenants
collection.tenants.create([
    wc.Tenant(name="customer-abc", activity_status=wc.TenantActivityStatus.HOT),
    wc.Tenant(name="customer-xyz", activity_status=wc.TenantActivityStatus.HOT),
])

# Search within a specific tenant
tenant_collection = collection.with_tenant("customer-abc")
results = tenant_collection.query.hybrid(query="deployment patterns", limit=5)
```

### Kubernetes Production Deployment

Deploy Weaviate as a StatefulSet with Helm:

```bash
helm repo add weaviate https://weaviate.github.io/weaviate-helm

helm install weaviate weaviate/weaviate \
  --set replicas=3 \
  --set storage.size=100Gi \
  --set env.AUTHENTICATION_APIKEY_ENABLED=true \
  --set env.AUTHENTICATION_APIKEY_ALLOWED_KEYS="read-key,write-key" \
  --set env.AUTHENTICATION_APIKEY_USERS="reader,writer" \
  --set env.ENABLE_MODULES="text2vec-openai,generative-openai,reranker-cohere" \
  --set env.DEFAULT_VECTORIZER_MODULE="text2vec-openai" \
  --set env.REPLICATION_FACTOR=3
```

## Pros and Cons

### Pros

- **Open-source** — BSD-3 license, full self-hosted control
- **Built-in vectorization** — No external embedding pipeline needed
- **Native hybrid search** — BM25 + vector in a single query
- **Multi-tenancy** — Per-tenant activity states (hot/cold/frozen) for cost management
- **GraphQL API** — Complex queries with filters, aggregations, cross-references
- **Generative modules** — Built-in RAG (retrieve + generate in one call)
- **Kubernetes-native** — Helm chart with StatefulSet, replication, and PVCs

### Cons

- **Memory-intensive** — HNSW indexes require significant RAM for large datasets
- **Operational complexity** — Self-hosted requires cluster management expertise
- **Go codebase** — Harder to debug for Python-centric AI teams
- **Module configuration** — Many modules and settings create configuration complexity
- **Cloud pricing** — Weaviate Cloud Services pricing is not transparent

## Integration with AI Infrastructure

- **Kubernetes**: Deploy on [Kubernetes AI infrastructure](/docs/ai-architecture/ai-infrastructure-kubernetes) as a StatefulSet alongside model serving
- **RAG**: Core retrieval component in [production RAG systems](/docs/ai-architecture/production-rag-systems)
- **Security**: Row-level access control for [secure LLM pipelines](/docs/ai-architecture/secure-llm-pipelines)
- **Monitoring**: Query metrics feed into the [AI observability stack](/docs/ai-architecture/ai-observability-stack)

## Related

- [Vector Databases (category overview) →](./vector-databases)
- [RAG Platforms (Haystack, LlamaIndex) →](./rag-platforms)
- [Production RAG Systems →](/docs/ai-architecture/production-rag-systems)
- [AI Infrastructure on Kubernetes →](/docs/ai-architecture/ai-infrastructure-kubernetes)
- [Pinecone vs Weaviate →](/comparisons/pinecone-vs-weaviate)
- [AI Infrastructure Consulting →](/services)
