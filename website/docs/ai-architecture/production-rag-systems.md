---
sidebar_position: 6
title: Production RAG Systems
description: Architecture patterns for production retrieval-augmented generation — hybrid retrieval, re-ranking, caching, evaluation, and deployment strategies.
keywords: [rag architecture, production rag, retrieval augmented generation, vector search, rag pipeline]
---

# Production RAG Systems

Architecture patterns for building retrieval-augmented generation systems that perform reliably at scale — hybrid retrieval, re-ranking, caching, evaluation, and deployment strategies.

## Why Most RAG Systems Fail in Production

The gap between a RAG demo and a production RAG system is enormous:

| RAG Demo | Production RAG |
|---|---|
| Single document source | Dozens of sources, multiple formats |
| Simple similarity search | Hybrid retrieval + re-ranking |
| No quality measurement | Automated evaluation pipelines |
| No cost tracking | Per-query cost monitoring |
| Static knowledge | Continuous ingestion + indexing |
| No access control | Row-level document security |
| Manual updates | CI/CD for knowledge base changes |

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                    RAG Application Layer                      │
│                                                               │
│  User Query                                                   │
│     │                                                         │
│     ▼                                                         │
│  ┌──────────────┐                                            │
│  │ Query Router │ ← Route by intent (search / QA / chat)     │
│  └──────┬───────┘                                            │
│         │                                                     │
│  ┌──────▼───────────────────────────────────────────────┐    │
│  │           Retrieval Pipeline                          │    │
│  │                                                       │    │
│  │  ┌──────────┐  ┌──────────────┐  ┌────────────┐     │    │
│  │  │ Query    │  │ Hybrid       │  │ Re-ranker  │     │    │
│  │  │ Transform│→ │ Search       │→ │ (Cross-    │     │    │
│  │  │ (HyDE,  │  │ (BM25 +     │  │  Encoder)  │     │    │
│  │  │  expand) │  │  Semantic)   │  │            │     │    │
│  │  └──────────┘  └──────────────┘  └──────┬─────┘     │    │
│  │                                          │           │    │
│  │  ┌──────────────────────────────────────▼────────┐  │    │
│  │  │              Context Builder                   │  │    │
│  │  │  • Chunk deduplication                        │  │    │
│  │  │  • Relevance filtering (score > threshold)    │  │    │
│  │  │  • Context window optimization                │  │    │
│  │  │  • Citation source tracking                   │  │    │
│  │  └───────────────────────┬───────────────────────┘  │    │
│  └──────────────────────────┴──────────────────────────┘    │
│                             │                                │
│  ┌──────────────────────────▼──────────────────────────┐    │
│  │              Generation Pipeline                     │    │
│  │                                                      │    │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────────────┐   │    │
│  │  │ Prompt   │  │ LLM      │  │ Output          │   │    │
│  │  │ Builder  │→ │ Inference│→ │ Validation      │   │    │
│  │  │ (with    │  │ (cached  │  │ (Guardrails,    │   │    │
│  │  │ context) │  │  routing) │  │  citations)     │   │    │
│  │  └──────────┘  └──────────┘  └─────────────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                  Observability Layer                    │  │
│  │  Langfuse traces · Retrieval quality · Cost tracking   │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

## Retrieval Patterns

### 1. Hybrid Search (BM25 + Semantic)

Combine keyword matching with embedding-based similarity for more robust retrieval:

```python
from haystack.components.retrievers import (
    InMemoryBM25Retriever,
    InMemoryEmbeddingRetriever,
)
from haystack.components.joiners import DocumentJoiner

# BM25 for exact keyword / entity matches
bm25_retriever = InMemoryBM25Retriever(document_store=doc_store)

# Semantic for conceptual similarity
embedding_retriever = InMemoryEmbeddingRetriever(document_store=doc_store)

# Fuse results with reciprocal rank fusion
joiner = DocumentJoiner(join_mode="reciprocal_rank_fusion")
```

**When to use:** Always in production. Pure semantic search misses exact keyword matches; pure BM25 misses semantic intent.

### 2. Query Transformation

Improve retrieval quality by transforming the user query before search:

| Technique | How It Works | When to Use |
|---|---|---|
| **HyDE** | Generate a hypothetical answer, embed that | Abstract or conceptual queries |
| **Query expansion** | Add synonyms and related terms | Short or ambiguous queries |
| **Sub-question decomposition** | Break complex query into sub-queries | Multi-faceted questions |
| **Step-back prompting** | Generate a more general query first | Narrow technical questions |

### 3. Re-ranking

Re-rank retrieval results using a cross-encoder model for higher precision:

```python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-12-v2")

def rerank_documents(query: str, docs: list, top_k: int = 5):
    """Re-rank retrieved documents using cross-encoder."""
    pairs = [(query, doc.content) for doc in docs]
    scores = reranker.predict(pairs)
    
    ranked = sorted(zip(docs, scores), key=lambda x: x[1], reverse=True)
    return [doc for doc, score in ranked[:top_k]]
```

**Impact:** Re-ranking typically improves retrieval precision by 10-25% over embedding-only retrieval.

## Chunking Strategies

The single biggest factor in RAG quality is how you chunk documents:

| Strategy | Chunk Size | Best For |
|---|---|---|
| **Fixed-size** | 256-512 tokens | General purpose, quick setup |
| **Sentence-based** | Natural sentence boundaries | Conversational content |
| **Semantic** | Embedding-based boundary detection | Technical documentation |
| **Recursive** | Hierarchical splitting with overlap | Long-form content, code docs |
| **Document-aware** | Respect headings, sections, paragraphs | Structured documents (PDF, DOCX) |

**Rule of thumb:** Start with recursive chunking (512 tokens, 50-token overlap), then optimize based on retrieval quality metrics.

## Caching Architecture

Production RAG benefits from multi-layer caching:

```
User Query
    │
    ▼
┌──────────────────┐
│ Semantic Cache    │ ← Cache similar queries (embedding similarity > 0.95)
│ (Redis + vectors) │
└────────┬─────────┘
         │ miss
         ▼
┌──────────────────┐
│ Retrieval Cache   │ ← Cache retrieval results for identical queries
│ (Redis/Memcached) │
└────────┬─────────┘
         │ miss
         ▼
┌──────────────────┐
│ LLM Response Cache│ ← Cache deterministic (temp=0) responses
│ (Redis)           │
└──────────────────┘
```

**Impact:** Semantic caching can reduce LLM costs by 30-60% for applications with repetitive query patterns.

## Evaluation Pipeline

Measure RAG quality automatically to detect degradation:

| Metric | What It Measures | Target |
|---|---|---|
| **Retrieval Recall@k** | Relevant docs in top-k results | > 0.8 |
| **Retrieval Precision@k** | Fraction of top-k that are relevant | > 0.6 |
| **Answer Relevance** | Does the answer address the query? | > 0.8 (LLM-judge) |
| **Faithfulness** | Is the answer supported by retrieved context? | > 0.9 (LLM-judge) |
| **Answer Completeness** | Does the answer cover all aspects of the query? | > 0.7 |
| **Latency (p95)** | End-to-end response time | < 3s |
| **Cost per query** | Token + compute cost | Within budget |

```python
from langfuse import Langfuse

langfuse = Langfuse()

def evaluate_rag_response(trace_id, query, context_docs, response):
    """Score RAG response quality."""
    
    # Faithfulness: Is the response grounded in retrieved context?
    faithfulness = llm_judge(
        criteria="Is the response fully supported by the provided context?",
        response=response,
        context=context_docs,
    )
    langfuse.score(trace_id=trace_id, name="faithfulness", value=faithfulness)
    
    # Relevance: Does the response actually answer the query?
    relevance = llm_judge(
        criteria="Does the response directly answer the user's question?",
        response=response,
        query=query,
    )
    langfuse.score(trace_id=trace_id, name="relevance", value=relevance)
```

## Example Stack Configuration

### Startup RAG Stack

```yaml
# Minimal production RAG
retrieval:
  framework: LlamaIndex
  vector_store: Pinecone (managed)
  embedding: text-embedding-3-small
  search: semantic only
  
generation:
  model: gpt-4o-mini
  
observability:
  tool: Langfuse Cloud
  
security:
  input: basic rate limiting
  output: none (internal tool)
```

### Enterprise RAG Stack

```yaml
# Full production RAG
retrieval:
  framework: Haystack
  vector_store: Elasticsearch (self-hosted)
  embedding: text-embedding-3-large + fine-tuned
  search: hybrid (BM25 + semantic)
  reranker: cross-encoder/ms-marco-MiniLM-L-12-v2
  caching: Redis semantic cache
  
generation:
  model: gpt-4o (primary) + Claude (fallback)
  prompt_management: Langfuse versioned prompts
  
observability:
  tracing: Langfuse (self-hosted)
  evaluation: Arize Phoenix (dev) + automated evals
  dashboards: Grafana
  
security:
  input: Lakera Guard (prompt injection)
  output: Guardrails AI (PII, toxicity)
  access: row-level document security
  audit: compliance logging
```

## Deployment Checklist

- [ ] Implement hybrid retrieval (BM25 + semantic) with reciprocal rank fusion
- [ ] Add cross-encoder re-ranking for top-k results
- [ ] Set up document processing pipeline with appropriate chunking strategy
- [ ] Deploy observability (Langfuse) with retrieval quality metrics
- [ ] Implement semantic caching for cost optimization
- [ ] Create automated evaluation pipeline (faithfulness, relevance)
- [ ] Add citation tracking for verifiable responses
- [ ] Set up CI/CD for knowledge base updates
- [ ] Implement access control for sensitive documents
- [ ] Configure alerts for quality degradation and cost anomalies

## Recommended Tools

| Category | Tool | Purpose |
|----------|------|---------|
| **Vector Database** | [Pinecone →](/docs/ai-tools/pinecone) | Managed vector database for production RAG |
| **Vector Database** | [Weaviate →](/docs/ai-tools/weaviate) | Open-source vector search engine |
| **Vector Database** | [Qdrant →](/docs/ai-tools/qdrant) | High-performance vector similarity search |
| **Observability** | [Langfuse →](/tools/langfuse-review) | RAG pipeline tracing and evaluation |
| **RAG Platforms** | [RAG Platforms →](/docs/ai-tools/rag-platforms) | Haystack, LlamaIndex, and RAG framework tools |
| **Comparison** | [Pinecone vs Weaviate →](/comparisons/pinecone-vs-weaviate) | Vector database comparison for RAG systems |
| **Comparison** | [Pinecone vs Qdrant →](/docs/comparisons/pinecone-vs-qdrant) | Managed vs open-source vector search |
| **Comparison** | [Haystack vs LlamaIndex →](/docs/comparisons/haystack-vs-llamaindex) | RAG framework comparison |

## Related Guides

- [Vector Databases (Pinecone, Weaviate, Qdrant) →](/docs/ai-tools/vector-databases)
- [Pinecone →](/docs/ai-tools/pinecone)
- [Weaviate →](/docs/ai-tools/weaviate)
- [Qdrant →](/docs/ai-tools/qdrant)
- [AI Data Pipeline Architecture →](./ai-data-pipeline)
- [LLM Evaluation & Testing →](./llm-evaluation-testing)
- [AI Observability Stack →](./ai-observability-stack)
- [Secure LLM Pipelines →](./secure-llm-pipelines)
- [RAG Platforms (Haystack, LlamaIndex) →](/docs/ai-tools/rag-platforms)
- [AI Observability Tools →](/docs/ai-tools/ai-observability-tools)
- [Langfuse Review →](/tools/langfuse-review)
- [LangChain vs Haystack →](/comparisons/langchain-vs-haystack)
- [LangChain vs LlamaIndex →](/docs/comparisons/langchain-vs-llamaindex)
- [Haystack vs LlamaIndex →](/docs/comparisons/haystack-vs-llamaindex)
- [Pinecone vs Qdrant →](/docs/comparisons/pinecone-vs-qdrant)
- [Pinecone vs Weaviate →](/comparisons/pinecone-vs-weaviate)
- [Architecture Playbooks Index →](./architecture-playbooks)
- [AI Infrastructure Consulting →](/services)
