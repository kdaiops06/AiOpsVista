---
sidebar_position: 3
title: "Lab: Build a RAG Knowledge Assistant"
description: "End-to-end lab — build a knowledge assistant that answers questions about your documentation using RAG with LangChain and Chroma."
---

# Lab: Build a RAG Knowledge Assistant

Build a knowledge assistant that answers questions about your DevOps documentation using Retrieval-Augmented Generation.

**Duration**: 1-2 hours  
**Level**: Intermediate  
**Prerequisites**: Python 3.10+, OpenAI API key or Anthropic API key

## What You'll Build

A CLI assistant that:
1. Loads your Markdown documentation
2. Creates vector embeddings and stores them
3. Answers questions using relevant document context
4. Cites sources in its answers

## Step 1: Project Setup

```bash
mkdir rag-assistant && cd rag-assistant
python -m venv venv
source venv/bin/activate

pip install langchain langchain-community langchain-openai \
            chromadb sentence-transformers rich
```

## Step 2: Create the Document Loader

```python
# loader.py
from pathlib import Path
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain.schema import Document


def load_markdown_docs(docs_dir: str) -> list[Document]:
    """Load all Markdown files from a directory."""
    docs = []
    docs_path = Path(docs_dir)

    for md_file in docs_path.rglob("*.md"):
        try:
            loader = TextLoader(str(md_file), encoding="utf-8")
            file_docs = loader.load()
            # Add source metadata
            for doc in file_docs:
                doc.metadata["source"] = str(
                    md_file.relative_to(docs_path)
                )
            docs.extend(file_docs)
        except Exception as e:
            print(f"Error loading {md_file}: {e}")

    print(f"Loaded {len(docs)} documents")
    return docs


def chunk_documents(
    documents: list[Document],
    chunk_size: int = 1000,
    overlap: int = 200
) -> list[Document]:
    """Split documents into chunks."""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=overlap,
        separators=["\n## ", "\n### ", "\n\n", "\n", " "],
    )
    chunks = splitter.split_documents(documents)
    print(f"Created {len(chunks)} chunks")
    return chunks
```

## Step 3: Build the Vector Store

```python
# vectorstore.py
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.schema import Document

PERSIST_DIR = "./chroma_db"

def create_vectorstore(
    chunks: list[Document]
) -> Chroma:
    """Create and persist a vector store."""
    # Use a free, local embedding model
    embeddings = HuggingFaceEmbeddings(
        model_name="all-MiniLM-L6-v2"
    )

    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=PERSIST_DIR,
        collection_name="devops_docs"
    )

    print(f"Vector store created with {len(chunks)} chunks")
    return vectorstore


def load_vectorstore() -> Chroma:
    """Load an existing vector store."""
    embeddings = HuggingFaceEmbeddings(
        model_name="all-MiniLM-L6-v2"
    )

    return Chroma(
        persist_directory=PERSIST_DIR,
        embedding_function=embeddings,
        collection_name="devops_docs"
    )
```

## Step 4: Create the RAG Chain

```python
# rag_chain.py
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_community.vectorstores import Chroma

PROMPT_TEMPLATE = """You are a DevOps and AIOps expert assistant.
Answer the question based on the provided context from our 
documentation. If the context doesn't contain the answer, 
say so honestly.

Context:
{context}

Question: {question}

Provide a clear, concise answer. Include code examples if 
relevant. Cite the source document when possible.

Answer:"""


def create_rag_chain(vectorstore: Chroma):
    """Create a RAG chain with the vector store."""

    retriever = vectorstore.as_retriever(
        search_type="mmr",
        search_kwargs={"k": 4, "fetch_k": 8}
    )

    prompt = PromptTemplate(
        template=PROMPT_TEMPLATE,
        input_variables=["context", "question"]
    )

    llm = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0
    )

    chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        chain_type_kwargs={"prompt": prompt},
        return_source_documents=True,
    )

    return chain
```

## Step 5: Interactive CLI

```python
# main.py
from rich.console import Console
from rich.markdown import Markdown
from rich.panel import Panel

from loader import load_markdown_docs, chunk_documents
from vectorstore import create_vectorstore, load_vectorstore
from rag_chain import create_rag_chain

import os
import sys

console = Console()


def index_docs(docs_dir: str):
    """Index documentation into vector store."""
    console.print("[bold]Indexing documents...[/bold]")
    docs = load_markdown_docs(docs_dir)
    chunks = chunk_documents(docs)
    create_vectorstore(chunks)
    console.print("[green]Indexing complete![/green]")


def chat():
    """Interactive chat loop."""
    console.print(Panel(
        "[bold]DevOps Knowledge Assistant[/bold]\n"
        "Ask questions about your documentation.\n"
        "Type 'quit' to exit.",
        title="RAG Assistant"
    ))

    vectorstore = load_vectorstore()
    chain = create_rag_chain(vectorstore)

    while True:
        question = console.input("\n[bold cyan]Question:[/bold cyan] ")
        if question.lower() in ("quit", "exit", "q"):
            break

        with console.status("Thinking..."):
            result = chain.invoke({"query": question})

        # Display answer
        console.print("\n[bold green]Answer:[/bold green]")
        console.print(Markdown(result["result"]))

        # Display sources
        sources = set(
            doc.metadata.get("source", "unknown")
            for doc in result["source_documents"]
        )
        console.print(f"\n[dim]Sources: {', '.join(sources)}[/dim]")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "index":
        docs_dir = sys.argv[2] if len(sys.argv) > 2 else "./docs"
        index_docs(docs_dir)
    else:
        chat()
```

## Step 6: Run It

```bash
# Set your API key
export OPENAI_API_KEY="sk-..."

# Index your docs (point to your documentation folder)
python main.py index ../website/docs

# Start chatting
python main.py
```

### Example Session

```
┌─────────────────────────────────┐
│       RAG Assistant             │
│ Ask questions about your docs.  │
│ Type 'quit' to exit.            │
└─────────────────────────────────┘

Question: How do I set up GPU monitoring?

Answer:
To set up GPU monitoring, install the NVIDIA DCGM Exporter 
alongside the GPU Operator. Key metrics to track include:
- `DCGM_FI_DEV_GPU_UTIL` — GPU utilization
- `DCGM_FI_DEV_FB_USED` — Memory usage
...

Sources: ai-infra/gpu-cluster-setup.md
```

## Challenge Extensions

1. **Add Anthropic Claude** — swap OpenAI for Claude as the LLM
2. **Web UI** — build a Streamlit or Gradio frontend
3. **Incremental indexing** — only re-index changed files
4. **Conversation memory** — maintain chat history for follow-up questions

## Next Steps

- [Prompt Engineering](/docs/ai-learning/prompt-engineering) — Write better prompts
- [AIOps Monitoring Lab](/docs/labs/aiops-monitoring-lab) — Build monitoring systems
