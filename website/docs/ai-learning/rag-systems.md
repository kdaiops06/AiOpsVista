---
sidebar_position: 3
title: "Building RAG Systems"
description: "Build Retrieval-Augmented Generation systems — vector databases, embedding models, chunking strategies, and production deployment."
---

# Building RAG Systems

Retrieval-Augmented Generation (RAG) grounds LLM responses with your own data, reducing hallucinations and enabling domain-specific knowledge.

## RAG Architecture

```
┌──────────────────────────────────────────────────────┐
│                    RAG Pipeline                       │
│                                                       │
│  ┌─────────┐     ┌──────────┐     ┌──────────────┐  │
│  │  Query   │────▶│ Embedding │────▶│ Vector Search │ │
│  └─────────┘     │  Model    │     │  (Top-K)      │ │
│                   └──────────┘     └──────┬───────┘  │
│                                           │          │
│                                    Retrieved Docs    │
│                                           │          │
│  ┌─────────┐     ┌──────────┐     ┌──────▼───────┐  │
│  │ Response │◀────│   LLM    │◀────│   Prompt +    │ │
│  └─────────┘     └──────────┘     │   Context     │  │
│                                    └──────────────┘  │
└──────────────────────────────────────────────────────┘
```

## Vector Database Options

| Database | Type | Best For | Scaling |
|----------|------|----------|---------|
| **Chroma** | Embedded | Prototyping, small datasets | Single node |
| **Pinecone** | Managed | Production, zero-ops | Fully managed |
| **Weaviate** | Self-hosted/Cloud | Hybrid search | Horizontal |
| **Qdrant** | Self-hosted/Cloud | Performance-critical | Horizontal |
| **pgvector** | PostgreSQL extension | Existing Postgres users | Vertical |

## Building a RAG Pipeline

### Step 1: Document Loading and Chunking

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import DirectoryLoader

# Load documents
loader = DirectoryLoader("./docs", glob="**/*.md")
documents = loader.load()

# Chunk documents
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\n## ", "\n### ", "\n\n", "\n", " "],
)
chunks = splitter.split_documents(documents)
print(f"Created {len(chunks)} chunks from {len(documents)} documents")
```

### Step 2: Create Embeddings and Store

```python
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# Create embeddings
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

# Store in vector database
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db",
    collection_name="devops_docs"
)
```

### Step 3: Retrieval and Generation

```python
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# Create retriever
retriever = vectorstore.as_retriever(
    search_type="mmr",  # Maximum Marginal Relevance
    search_kwargs={"k": 5, "fetch_k": 10}
)

# Custom prompt
prompt = PromptTemplate.from_template("""
You are a DevOps expert assistant. Answer the question based only 
on the provided context. If the context doesn't contain the answer,
say "I don't have enough information to answer that."

Context:
{context}

Question: {question}

Answer:
""")

# Build RAG chain
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type_kwargs={"prompt": prompt},
    return_source_documents=True,
)

# Query
result = qa_chain.invoke({"query": "How do I set up Prometheus monitoring?"})
print(result["result"])
```

## Chunking Strategies

| Strategy | Best For | Chunk Size |
|----------|----------|------------|
| **Fixed size** | General purpose | 500-1000 tokens |
| **Recursive** | Structured docs (Markdown) | 500-1500 tokens |
| **Semantic** | Dense technical content | Variable |
| **Document** | Short docs (FAQs, tickets) | Full document |

### Overlap Guidelines

- **100-200 tokens** overlap for technical documentation
- **50-100 tokens** for conversational content
- More overlap = better context continuity, but higher storage cost

## Evaluation Metrics

| Metric | Measures | Target |
|--------|----------|--------|
| **Retrieval Precision** | Relevant docs retrieved | > 80% |
| **Answer Faithfulness** | Answer matches context | > 90% |
| **Answer Relevancy** | Answer addresses question | > 85% |
| **Context Recall** | Required info retrieved | > 75% |

## Production Considerations

1. **Hybrid search** — combine vector similarity with keyword search (BM25)
2. **Re-ranking** — use a cross-encoder to re-rank retrieved documents
3. **Caching** — cache frequent queries and embeddings
4. **Monitoring** — track retrieval quality, latency, and user feedback
5. **Incremental updates** — add new documents without re-indexing everything

## Next Steps

- [Prompt Engineering](/docs/ai-learning/prompt-engineering) — Optimize your prompts
- [AI Agents](/docs/ai-learning/getting-started) — Build autonomous systems
