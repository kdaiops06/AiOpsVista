---
sidebar_position: 2
title: "Prompt Engineering Guide"
description: "Master prompt engineering techniques — zero-shot, few-shot, chain-of-thought, and production patterns for LLM applications."
---

# Prompt Engineering Guide

Prompt engineering is the art of designing inputs that get the best outputs from large language models. This guide covers practical techniques for production use.

## Core Techniques

### 1. Zero-Shot Prompting

Give the model a task with no examples:

```
Classify the following support ticket as one of: bug, feature_request, question, billing

Ticket: "The dashboard keeps crashing when I filter by date range. This started after the latest update."

Classification:
```

### 2. Few-Shot Prompting

Provide examples to guide the model:

```
Classify support tickets:

Ticket: "How do I reset my password?" → question
Ticket: "Add dark mode to the settings page" → feature_request
Ticket: "I was charged twice this month" → billing
Ticket: "The export button returns a 500 error" → bug

Ticket: "Can you add Slack integration?" →
```

### 3. Chain-of-Thought (CoT)

Ask the model to reason step by step:

```
A Kubernetes cluster has 3 nodes, each with 8 CPUs and 32GB RAM.
Each pod requests 0.5 CPU and 512MB RAM.
The system components use 1 CPU and 2GB RAM per node.

How many pods can the cluster run? Think step by step.
```

### 4. Role-Based Prompting

```
You are a senior SRE with 10 years of experience in Kubernetes operations.
A team is experiencing intermittent 503 errors on their service.
Their HPA is configured with a target of 80% CPU.
Current pod count: 3, CPU usage: 92%.

Diagnose the issue and provide a remediation plan.
```

## Production Prompt Patterns

### Structured Output

```
Analyze this Terraform plan and respond in JSON format:

{
  "risk_level": "low|medium|high|critical",
  "resources_added": <number>,
  "resources_changed": <number>,
  "resources_destroyed": <number>,
  "concerns": ["list of potential issues"],
  "recommendation": "approve|review|reject"
}

Terraform plan:
...
```

### System + User Message Pattern

```python
messages = [
    {
        "role": "system",
        "content": """You are an AIOps assistant that analyzes 
        infrastructure metrics. You respond with:
        1. Current status assessment
        2. Anomalies detected
        3. Recommended actions
        Keep responses concise and actionable."""
    },
    {
        "role": "user",
        "content": f"Analyze these metrics:\n{metrics_data}"
    }
]
```

### Template with Variables

```python
INCIDENT_ANALYSIS_PROMPT = """
Analyze this incident and provide a structured post-mortem:

Service: {service_name}
Alert: {alert_name}
Duration: {duration}
Impact: {impact}
Timeline: {timeline}

Provide:
1. Root Cause Analysis
2. Contributing Factors
3. Action Items (with owners and deadlines)
4. Lessons Learned
"""
```

## Prompt Engineering Best Practices

| Practice | Example |
|----------|---------|
| **Be specific** | "List 5 items" not "List some items" |
| **Set constraints** | "Respond in under 100 words" |
| **Define format** | "Use bullet points" or "Respond in JSON" |
| **Provide context** | Include relevant background information |
| **Use delimiters** | Wrap input data in ``` or --- |
| **Iterate** | Test, evaluate, and refine prompts |

## Common Pitfalls

1. **Vague instructions** — "Make it better" vs. "Improve readability by using shorter sentences"
2. **Missing context** — Always provide relevant domain knowledge
3. **No output format** — Specify exactly how you want the response structured
4. **Ignoring edge cases** — Test with unusual inputs
5. **Prompt injection vulnerability** — Sanitize user inputs in production

## Next Steps

- [RAG Systems](/docs/ai-learning/rag-systems) — Ground LLMs with your data
- [AI Agents](/docs/ai-learning/getting-started) — Build autonomous workflows
