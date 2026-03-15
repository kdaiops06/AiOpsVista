---
sidebar_position: 10
title: "LangSmith: LLM Development Platform"
description: LangSmith deep-dive — LLM application debugging, testing, evaluation, and monitoring platform from the LangChain team.
keywords: [langsmith, llm debugging, llm testing, llm evaluation, langchain monitoring, prompt testing, llm tracing]
---

# LangSmith

**LLM application development platform — tracing, debugging, testing, evaluation, and monitoring from the LangChain team.**

## Overview

LangSmith is the development and operations platform built by the LangChain team for debugging, testing, evaluating, and monitoring LLM applications. While [Langfuse](/docs/ai-tools/ai-observability-tools) focuses on production observability, LangSmith is tightly integrated with the LangChain/LangGraph ecosystem and emphasizes the development lifecycle: from prototyping prompts to running evaluation suites to monitoring production deployments.

LangSmith addresses the core challenge of LLM development: outputs are non-deterministic, making traditional debugging and testing approaches insufficient. LangSmith provides trace-level visibility into chain execution, automated evaluation frameworks, and dataset management for regression testing.

## Architecture

```
┌──────────────────────────────────────────────────────┐
│                   LangSmith Platform                  │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │                 Tracing Engine                    │ │
│  │                                                   │ │
│  │  • Auto-instrumentation for LangChain/LangGraph  │ │
│  │  • Manual tracing via SDK (@traceable decorator)  │ │
│  │  • Nested spans (chain → retriever → LLM → tool) │ │
│  │  • Token usage, latency, input/output capture     │ │
│  └────────────────────────┬────────────────────────┘ │
│                           │                           │
│  ┌────────────┐  ┌────────┴────────┐  ┌───────────┐ │
│  │ Playground │  │ Evaluation      │  │ Dataset   │ │
│  │            │  │ Framework       │  │ Management│ │
│  │ • Prompt   │  │                 │  │           │ │
│  │   testing  │  │ • Custom evals  │  │ • Golden  │ │
│  │ • Model    │  │ • LLM-as-judge  │  │   datasets│ │
│  │   compare  │  │ • Heuristic     │  │ • Version │ │
│  │ • Variable │  │   evaluators    │  │   control │ │
│  │   sweeps   │  │ • CI/CD         │  │ • Sampling│ │
│  │            │  │   integration   │  │   from    │ │
│  │            │  │                 │  │   traces  │ │
│  └────────────┘  └─────────────────┘  └───────────┘ │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │              Monitoring & Alerting               │ │
│  │                                                   │ │
│  │  • Production trace monitoring                    │ │
│  │  • Feedback collection (user thumbs up/down)      │ │
│  │  • Regression detection                           │ │
│  │  • Cost and latency dashboards                    │ │
│  └─────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

### Core Components

| Component | Function |
|---|---|
| **Tracing** | Capture every step of LLM chain execution with inputs, outputs, tokens, latency |
| **Playground** | Interactive prompt testing with model comparison and variable sweeps |
| **Datasets** | Manage golden test datasets; sample interesting traces into datasets |
| **Evaluators** | Run automated evaluations (correctness, relevance, faithfulness) |
| **Monitoring** | Production dashboards for latency, cost, error rates, and user feedback |
| **Hub** | Community prompt repository for sharing and versioning prompts |

## Use Cases

### LLM Application Debugging

Trace the full execution of a chain to identify where failures occur:

```python
from langsmith import traceable

@traceable
def rag_pipeline(query: str) -> str:
    """Each function call becomes a nested span in LangSmith."""
    docs = retrieve(query)
    context = format_context(docs)
    response = generate(query, context)
    return response

@traceable
def retrieve(query: str) -> list:
    # Retrieval step traced with inputs/outputs
    return vector_store.similarity_search(query, k=5)

@traceable
def generate(query: str, context: str) -> str:
    # LLM call traced with prompt, response, tokens
    return llm.invoke(f"Context: {context}\n\nQuestion: {query}")
```

**Result**: In the LangSmith UI, see the full chain execution tree with timing, inputs/outputs, and token usage at every step.

### Automated Evaluation in CI/CD

Run evaluation suites against test datasets as part of CI/CD:

```python
from langsmith import Client
from langsmith.evaluation import evaluate

client = Client()

# Define evaluator
def correctness_evaluator(run, example):
    """Check if the output contains the expected answer."""
    predicted = run.outputs["output"]
    expected = example.outputs["expected_answer"]
    
    # Use LLM-as-judge for semantic comparison
    score = llm_judge(predicted, expected)
    return {"score": score, "key": "correctness"}

# Run evaluation against dataset
results = evaluate(
    rag_pipeline,
    data="rag-golden-dataset",  # Dataset in LangSmith
    evaluators=[correctness_evaluator],
    experiment_prefix="v2.3-prompt-update",
)

# Assert quality threshold in CI
assert results.aggregate_metrics["correctness"]["mean"] >= 0.8
```

### Prompt Iteration and Testing

Use the LangSmith Playground to test prompt variations:

1. Select a trace from production
2. Modify the prompt in the Playground
3. Run against multiple models simultaneously
4. Compare outputs side-by-side
5. Save winning prompt version to Hub

### Production Monitoring

Monitor deployed LLM applications:

- Track latency trends, error rates, and cost over time
- Collect user feedback (thumbs up/down) linked to specific traces
- Sample traces with low feedback scores for debugging
- Set up alerts for quality degradation or cost spikes

## Pros and Cons

### Pros

- **Deep LangChain integration** — Auto-instrumentation for LangChain and LangGraph applications
- **Evaluation framework** — Built-in support for custom evaluators, LLM-as-judge, and CI/CD integration
- **Dataset management** — Create golden datasets from production traces for regression testing
- **Playground** — Interactive prompt testing with model comparison
- **Tracing depth** — Full chain execution tree with nested spans

### Cons

- **LangChain-centric** — Best experience requires LangChain/LangGraph; manual instrumentation needed for other frameworks
- **SaaS-primary** — Self-hosted option is limited; most features require LangSmith cloud
- **Pricing** — Free tier is limited; enterprise features require paid plan
- **Overlap with Langfuse** — Similar capabilities; teams must choose one tracing platform
- **Less mature monitoring** — Production monitoring features are newer compared to dedicated observability tools

## Deployment Patterns

### Pattern 1: Development + Evaluation (Most Common)

Use LangSmith during development for debugging and evaluation; use a different tool (Langfuse, Datadog) for production monitoring:

```
Development → LangSmith (tracing, playground, evals)
Production  → Langfuse / Datadog (monitoring, alerting)
```

### Pattern 2: Full Lifecycle (LangChain-Heavy Teams)

Use LangSmith across development and production for teams fully committed to the LangChain ecosystem:

```
Development → LangSmith (tracing, playground, evals)
CI/CD       → LangSmith (automated evaluation pipeline)
Production  → LangSmith (monitoring, feedback, alerting)
```

### Pattern 3: Evaluation-Only

Use LangSmith only for its evaluation framework, regardless of what tracing tool you use:

```python
# LangSmith evaluation works with any LLM application
from langsmith.evaluation import evaluate

results = evaluate(
    my_custom_pipeline,  # Any callable
    data="my-test-dataset",
    evaluators=[my_evaluator],
)
```

## Integration with AI Infrastructure

- **CI/CD Pipelines**: LangSmith evaluations integrate into [DevOps CI/CD for AI systems](/docs/ai-architecture/devops-for-ai-agents) as quality gates
- **Observability Stack**: Complements the [AI observability stack](/docs/ai-architecture/ai-observability-stack) — LangSmith for development, Langfuse for production
- **LLM Orchestration**: Native integration with [LangChain](/docs/ai-tools/llm-orchestration-tools) chains and agents
- **Monitoring**: Tracing data feeds into [LLM monitoring and tracing](/docs/ai-architecture/llm-monitoring-tracing) architecture

## LangSmith vs Langfuse

| Dimension | LangSmith | Langfuse |
|---|---|---|
| **Best for** | LangChain-native development + eval | Framework-agnostic production monitoring |
| **Tracing** | Auto for LangChain; manual for others | Manual instrumentation (any framework) |
| **Evaluation** | Built-in framework + CI/CD | Scores API (more manual) |
| **Playground** | Interactive prompt testing | Prompt management (versioning) |
| **Self-hosted** | Limited | Full self-hosted option |
| **Open Source** | Partially (tracing SDK) | Yes (MIT license) |

For a detailed comparison, see [Langfuse vs Arize Phoenix →](/comparisons/langfuse-vs-arize).

## Related

- [LLM Orchestration Tools (LangChain) →](./llm-orchestration-tools)
- [AI Observability Tools (Langfuse, Arize) →](./ai-observability-tools)
- [DevOps for AI Systems →](/docs/ai-architecture/devops-for-ai-agents)
- [AI Observability Stack →](/docs/ai-architecture/ai-observability-stack)
- [LLM Monitoring and Tracing →](/docs/ai-architecture/llm-monitoring-tracing)
- [LangChain Review →](/tools/langchain-review)
- [LangChain vs Haystack →](/comparisons/langchain-vs-haystack)
- [Langfuse vs Arize Phoenix →](/comparisons/langfuse-vs-arize)
- [AI Infrastructure Consulting →](/services)
