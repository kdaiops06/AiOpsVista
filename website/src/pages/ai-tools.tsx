import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

type ToolBadge = 'featured' | 'trending' | 'startup';

interface Tool {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  categoryColor: string;
  description: string;
  useCases: string[];
  techStack: string[];
  pricing: string;
  website: string;
  badge?: ToolBadge;
  docsPath?: string;
  comparisonPaths?: {label: string; path: string}[];
}

const BADGE_CONFIG: Record<ToolBadge, {label: string; color: string; bg: string}> = {
  featured: {label: '⭐ Featured', color: '#b45309', bg: '#fef3c7'},
  trending: {label: '🔥 Trending', color: '#dc2626', bg: '#fee2e2'},
  startup: {label: '🚀 Startup', color: '#7c3aed', bg: '#ede9fe'},
};

const CATEGORIES = [
  {label: 'All', value: 'all'},
  {label: 'LLM Security', value: 'llm-security'},
  {label: 'Vector Databases', value: 'vector-databases'},
  {label: 'AI Observability', value: 'ai-observability'},
  {label: 'AI Orchestration', value: 'ai-orchestration'},
  {label: 'RAG Platforms', value: 'rag-platforms'},
  {label: 'AI Agent Frameworks', value: 'ai-agent-frameworks'},
  {label: 'AI Gateways', value: 'ai-gateways'},
  {label: 'MLOps', value: 'mlops'},
];

const REVIEWED_TOOLS = new Set(['lakera-guard', 'langfuse', 'langchain']);

const tools: Tool[] = [
  // ── LLM Security ──
  {
    slug: 'lakera-guard',
    name: 'Lakera Guard',
    tagline: 'Real-time LLM security and prompt injection defense',
    category: 'llm-security',
    categoryColor: '#dc2626',
    description: 'Lakera Guard provides real-time protection against prompt injection, data leakage, and harmful content in LLM applications. Deploys as a middleware layer between your application and the LLM provider.',
    useCases: ['Prompt injection detection', 'PII/data leakage prevention', 'Content moderation for LLM outputs', 'Compliance enforcement'],
    techStack: ['REST API', 'Python SDK', 'Docker', 'Kubernetes'],
    pricing: 'Free tier available, Enterprise custom',
    website: 'https://lakera.ai',
    docsPath: '/docs/ai-tools/llm-security-tools',
    comparisonPaths: [{label: 'Lakera vs Guardrails AI', path: '/comparisons/lakera-vs-guardrails'}],
  },
  {
    slug: 'rebuff',
    name: 'Rebuff',
    tagline: 'Self-hardening prompt injection detection',
    category: 'llm-security',
    categoryColor: '#dc2626',
    description: 'Rebuff is a prompt injection detection tool that uses multiple layers — heuristics, LLM-based analysis, and a vector database of known attacks — to protect LLM applications.',
    useCases: ['Multi-layer prompt injection defense', 'Attack pattern learning', 'API gateway integration', 'Red team testing'],
    techStack: ['Python', 'Vector DB', 'LLM-based detection'],
    pricing: 'Open-source',
    website: 'https://github.com/protectai/rebuff',
    docsPath: '/docs/ai-tools/llm-security-tools',
  },
  {
    slug: 'guardrails-ai',
    name: 'Guardrails AI',
    tagline: 'Input/output validation for LLM applications',
    category: 'llm-security',
    categoryColor: '#dc2626',
    description: 'Guardrails AI provides validators for LLM inputs and outputs — enforce structure, detect toxicity, check factuality, and ensure compliance in production LLM systems.',
    useCases: ['Output format validation (JSON, XML)', 'Toxicity and bias filtering', 'Factuality checking', 'Custom business rule enforcement'],
    techStack: ['Python', 'Validator Hub', 'LLM agnostic'],
    pricing: 'Open-source, Enterprise plans',
    website: 'https://guardrailsai.com',
    docsPath: '/docs/ai-tools/llm-security-tools',
    comparisonPaths: [{label: 'Lakera vs Guardrails AI', path: '/comparisons/lakera-vs-guardrails'}],
  },
  {
    slug: 'slashllm',
    name: 'SlashLLM',
    tagline: 'Integrated Service Provider for AI Security — platform, operations, and governance',
    category: 'llm-security',
    categoryColor: '#dc2626',
    badge: 'startup',
    description: 'SlashLLM is the ISP for AI Security — a fully integrated platform that sits between your applications and any LLM provider. Combines API gateway, guardrails, observability, red-teaming, and governance into one service with 24/7 AI-SOC monitoring and compliance evidence generation.',
    useCases: ['End-to-end LLM security with gateway + guardrails + observability', '24/7 AI-SOC monitoring for prompt injection and data exfiltration', 'Compliance automation (SOC 2, ISO 27001, HIPAA, GDPR, EU AI Act)', 'Automated red-teaming and jailbreak testing in CI/CD'],
    techStack: ['Docker', 'Kubernetes', 'Multi-model gateway', 'CI/CD integration', 'SIEM/IAM integration'],
    pricing: 'Flat predictable pricing, Foundation / Growth / Strategic tiers',
    website: 'https://slashllm.com',
    docsPath: '/docs/ai-tools/llm-security-tools',
    comparisonPaths: [{label: 'SlashLLM vs Lakera', path: '/comparisons/slashllm-vs-lakera'}],
  },
  {
    slug: 'protect-ai',
    name: 'Protect AI',
    tagline: 'ML supply chain security and model scanning',
    category: 'llm-security',
    categoryColor: '#dc2626',
    description: 'Protect AI provides security scanning for ML models, pipelines, and supply chains. Detects vulnerabilities in model artifacts, serialized objects, and AI/ML dependencies before deployment.',
    useCases: ['ML model vulnerability scanning', 'Supply chain security for AI pipelines', 'Malicious model detection', 'CI/CD security gates for ML'],
    techStack: ['Python', 'CLI', 'CI/CD plugins', 'ModelScan'],
    pricing: 'Open-source tools, Enterprise platform',
    website: 'https://protectai.com',
    docsPath: '/docs/ai-tools/llm-security-tools',
  },
  {
    slug: 'robust-intelligence',
    name: 'Robust Intelligence',
    tagline: 'AI firewall and continuous model validation',
    category: 'llm-security',
    categoryColor: '#dc2626',
    description: 'Robust Intelligence provides an AI firewall that continuously validates model inputs and outputs in production. Detects adversarial attacks, data drift, and model degradation in real time.',
    useCases: ['Real-time AI firewall for production models', 'Adversarial attack detection', 'Model stress testing and red-teaming', 'Continuous validation and monitoring'],
    techStack: ['Python SDK', 'REST API', 'Kubernetes', 'Cloud-native'],
    pricing: 'Enterprise',
    website: 'https://robustintelligence.com',
    docsPath: '/docs/ai-tools/llm-security-tools',
  },
  // ── Vector Databases ──
  {
    slug: 'pinecone',
    name: 'Pinecone',
    tagline: 'Managed vector database for similarity search at scale',
    category: 'vector-databases',
    categoryColor: '#0d9488',
    badge: 'featured',
    description: 'Pinecone is a fully managed vector database built for high-performance similarity search. Handles billions of vectors with low-latency queries, automatic scaling, and zero operational overhead.',
    useCases: ['Production RAG vector storage', 'Semantic search at scale', 'Recommendation engines', 'Anomaly detection with embeddings'],
    techStack: ['Python', 'REST API', 'gRPC', 'Serverless / Pod-based'],
    pricing: 'Free tier, Standard and Enterprise plans',
    website: 'https://pinecone.io',
    docsPath: '/docs/ai-tools/pinecone',
    comparisonPaths: [
      {label: 'Pinecone vs Qdrant', path: '/docs/comparisons/pinecone-vs-qdrant'},
      {label: 'Pinecone vs Weaviate', path: '/comparisons/pinecone-vs-weaviate'},
    ],
  },
  {
    slug: 'weaviate',
    name: 'Weaviate',
    tagline: 'AI-native vector database with built-in vectorization',
    category: 'vector-databases',
    categoryColor: '#0d9488',
    badge: 'featured',
    description: 'Weaviate is an open-source vector database with built-in vectorization modules, hybrid search (vector + keyword), and multi-tenancy support. Extensible via modules for different ML models.',
    useCases: ['Hybrid search applications', 'Multi-tenant RAG systems', 'Generative search with built-in LLM integration', 'Knowledge graph augmented retrieval'],
    techStack: ['Go', 'REST/GraphQL API', 'Docker', 'Kubernetes', 'Helm'],
    pricing: 'Open-source, Weaviate Cloud managed service',
    website: 'https://weaviate.io',
    docsPath: '/docs/ai-tools/weaviate',
    comparisonPaths: [
      {label: 'Weaviate vs Qdrant', path: '/docs/comparisons/weaviate-vs-qdrant'},
      {label: 'Pinecone vs Weaviate', path: '/comparisons/pinecone-vs-weaviate'},
    ],
  },
  {
    slug: 'qdrant',
    name: 'Qdrant',
    tagline: 'High-performance open-source vector search engine',
    category: 'vector-databases',
    categoryColor: '#0d9488',
    badge: 'trending',
    description: 'Qdrant is a Rust-based vector search engine optimized for speed and efficiency. Features advanced filtering, payload indexing, and quantization for production-scale similarity search.',
    useCases: ['Low-latency vector search', 'Filtered similarity queries', 'Multi-vector and sparse vector support', 'Edge deployment with quantization'],
    techStack: ['Rust', 'Python/JS/Go SDKs', 'gRPC', 'Docker', 'Kubernetes'],
    pricing: 'Open-source (Apache 2.0), Qdrant Cloud managed',
    website: 'https://qdrant.tech',
    docsPath: '/docs/ai-tools/qdrant',
    comparisonPaths: [
      {label: 'Pinecone vs Qdrant', path: '/docs/comparisons/pinecone-vs-qdrant'},
      {label: 'Weaviate vs Qdrant', path: '/docs/comparisons/weaviate-vs-qdrant'},
    ],
  },
  {
    slug: 'chromadb',
    name: 'ChromaDB',
    tagline: 'Lightweight open-source embedding database',
    category: 'vector-databases',
    categoryColor: '#0d9488',
    description: 'Chroma is a lightweight, developer-friendly embedding database designed for LLM applications. Runs in-memory or persistent mode with zero-config setup — ideal for prototyping and small-scale RAG.',
    useCases: ['Rapid RAG prototyping', 'Local development and testing', 'Small-scale embedding storage', 'Notebook-friendly vector search'],
    techStack: ['Python', 'JavaScript/TypeScript', 'SQLite backend', 'REST API'],
    pricing: 'Open-source (Apache 2.0)',
    website: 'https://trychroma.com',
    docsPath: '/docs/ai-tools/vector-databases',
  },
  {
    slug: 'lancedb',
    name: 'LanceDB',
    tagline: 'Serverless vector database built on Lance format',
    category: 'vector-databases',
    categoryColor: '#0d9488',
    description: 'LanceDB is a serverless vector database built on the Lance columnar format. Supports multi-modal data (text, images, video), automatic versioning, and zero-copy integration with ML pipelines.',
    useCases: ['Serverless vector search', 'Multi-modal embedding storage', 'Data versioning for ML experiments', 'Cost-efficient large-scale storage'],
    techStack: ['Python', 'Rust', 'Lance format', 'S3/GCS compatible'],
    pricing: 'Open-source, LanceDB Cloud (beta)',
    website: 'https://lancedb.com',
    docsPath: '/docs/ai-tools/vector-databases',
  },
  // ── AI Observability ──
  {
    slug: 'langfuse',
    name: 'Langfuse',
    tagline: 'Open-source LLM observability and analytics',
    category: 'ai-observability',
    categoryColor: '#7c3aed',
    badge: 'trending',
    description: 'Langfuse is an open-source observability platform for LLM applications. It provides tracing, evaluation, prompt management, and cost analytics for production AI systems.',
    useCases: ['LLM call tracing and debugging', 'Prompt versioning and A/B testing', 'Cost tracking per model/feature', 'Quality evaluation pipelines'],
    techStack: ['TypeScript', 'Python SDK', 'OpenTelemetry', 'PostgreSQL', 'Self-hosted or Cloud'],
    pricing: 'Open-source (self-hosted free), Cloud plans available',
    website: 'https://langfuse.com',
    docsPath: '/docs/ai-tools/ai-observability-tools',
    comparisonPaths: [
      {label: 'Langfuse vs Arize', path: '/comparisons/langfuse-vs-arize'},
      {label: 'LangSmith vs Langfuse', path: '/docs/comparisons/langsmith-vs-langfuse'},
    ],
  },
  {
    slug: 'arize-phoenix',
    name: 'Arize Phoenix',
    tagline: 'AI observability for LLMs, embeddings, and RAG',
    category: 'ai-observability',
    categoryColor: '#7c3aed',
    badge: 'featured',
    description: 'Phoenix by Arize provides deep observability into LLM and ML systems including retrieval analysis for RAG, embedding drift detection, and trace-level debugging of AI pipelines.',
    useCases: ['RAG retrieval quality analysis', 'LLM trace visualization', 'Embedding drift monitoring', 'Hallucination detection'],
    techStack: ['Python', 'OpenTelemetry', 'Jupyter integration', 'Self-hosted'],
    pricing: 'Open-source',
    website: 'https://phoenix.arize.com',
    docsPath: '/docs/ai-tools/ai-observability-tools',
    comparisonPaths: [{label: 'Langfuse vs Arize', path: '/comparisons/langfuse-vs-arize'}],
  },
  {
    slug: 'whylabs',
    name: 'WhyLabs',
    tagline: 'AI observability with data and model monitoring',
    category: 'ai-observability',
    categoryColor: '#7c3aed',
    description: 'WhyLabs provides AI observability focused on data quality monitoring, model performance tracking, and LLM security. Built on the open-source whylogs profiling library for lightweight data monitoring.',
    useCases: ['Data drift and quality monitoring', 'LLM guardrails and content safety', 'Model performance degradation alerts', 'Embedding and feature monitoring'],
    techStack: ['Python', 'whylogs', 'REST API', 'Integrations (Spark, Airflow)'],
    pricing: 'Free tier, Growth and Enterprise plans',
    website: 'https://whylabs.ai',
    docsPath: '/docs/ai-tools/ai-observability-tools',
  },
  {
    slug: 'braintrust',
    name: 'Braintrust',
    tagline: 'End-to-end LLM evaluation and observability platform',
    category: 'ai-observability',
    categoryColor: '#7c3aed',
    badge: 'trending',
    description: 'Braintrust provides evaluation, logging, and prompt playground for LLM applications. Features CI-integrated eval scoring, dataset management, and real-time production tracing.',
    useCases: ['LLM evaluation with custom scoring', 'A/B testing for prompts and models', 'Production logging and tracing', 'Dataset curation for fine-tuning'],
    techStack: ['Python', 'TypeScript', 'REST API', 'CI/CD integration'],
    pricing: 'Free tier, Pro and Enterprise plans',
    website: 'https://braintrust.dev',
    docsPath: '/docs/ai-tools/ai-observability-tools',
  },
  {
    slug: 'fiddler-ai',
    name: 'Fiddler AI',
    tagline: 'Enterprise AI observability and model monitoring',
    category: 'ai-observability',
    categoryColor: '#7c3aed',
    description: 'Fiddler provides enterprise-grade AI observability with explainability, drift detection, fairness monitoring, and LLM analytics. Designed for regulated industries requiring model governance.',
    useCases: ['Model explainability and bias detection', 'Data drift monitoring at scale', 'LLM token and cost analytics', 'Regulatory compliance and audit trails'],
    techStack: ['Python SDK', 'REST API', 'Cloud-native', 'SOC 2 compliant'],
    pricing: 'Enterprise',
    website: 'https://fiddler.ai',
    docsPath: '/docs/ai-tools/ai-observability-tools',
  },
  // ── AI Orchestration ──
  {
    slug: 'langchain',
    name: 'LangChain',
    tagline: 'Framework for building LLM-powered applications',
    category: 'ai-orchestration',
    categoryColor: '#0891b2',
    description: 'LangChain provides composable building blocks for LLM application development — chains, agents, retrieval, memory, and tool use. The most widely adopted orchestration framework in the LLM ecosystem.',
    useCases: ['Conversational AI with memory', 'RAG pipelines with vectorstores', 'Multi-step agent workflows', 'Tool-augmented LLM systems'],
    techStack: ['Python', 'TypeScript/JS', 'LangSmith (observability)', 'LangGraph (agents)'],
    pricing: 'Open-source, LangSmith paid plans',
    website: 'https://langchain.com',
    docsPath: '/docs/ai-tools/llm-orchestration-tools',
    comparisonPaths: [
      {label: 'LangChain vs Haystack', path: '/comparisons/langchain-vs-haystack'},
      {label: 'LangChain vs LlamaIndex', path: '/docs/comparisons/langchain-vs-llamaindex'},
    ],
  },
  // ── RAG Platforms ──
  {
    slug: 'haystack',
    name: 'Haystack',
    tagline: 'Production-ready framework for RAG and NLP pipelines',
    category: 'rag-platforms',
    categoryColor: '#059669',
    description: 'Haystack by deepset is a framework for building production-grade RAG, search, and NLP pipelines. It provides a pipeline-based architecture with built-in document processing, retrieval, and generation.',
    useCases: ['Document search and retrieval', 'Question answering systems', 'Semantic search pipelines', 'Multi-modal RAG'],
    techStack: ['Python', 'Pipeline API', 'Elasticsearch', 'OpenSearch', 'Weaviate'],
    pricing: 'Open-source, deepset Cloud enterprise',
    website: 'https://haystack.deepset.ai',
    docsPath: '/docs/ai-tools/rag-platforms',
    comparisonPaths: [
      {label: 'LangChain vs Haystack', path: '/comparisons/langchain-vs-haystack'},
      {label: 'Haystack vs LlamaIndex', path: '/docs/comparisons/haystack-vs-llamaindex'},
    ],
  },
  {
    slug: 'llamaindex',
    name: 'LlamaIndex',
    tagline: 'Data framework for LLM applications and RAG',
    category: 'rag-platforms',
    categoryColor: '#059669',
    description: 'LlamaIndex provides the data infrastructure for LLM applications — data ingestion, indexing, retrieval, and query engines. Optimized for connecting LLMs with enterprise data sources.',
    useCases: ['Enterprise knowledge bases', 'Multi-source data ingestion', 'Structured + unstructured RAG', 'Query planning over complex data'],
    techStack: ['Python', 'TypeScript', 'LlamaCloud', 'Vector stores'],
    pricing: 'Open-source, LlamaCloud paid',
    website: 'https://llamaindex.ai',
    docsPath: '/docs/ai-tools/rag-platforms',
    comparisonPaths: [
      {label: 'LangChain vs LlamaIndex', path: '/docs/comparisons/langchain-vs-llamaindex'},
      {label: 'Haystack vs LlamaIndex', path: '/docs/comparisons/haystack-vs-llamaindex'},
    ],
  },
  // ── AI Agent Frameworks ──
  {
    slug: 'crewai',
    name: 'CrewAI',
    tagline: 'Framework for orchestrating multi-agent AI systems',
    category: 'ai-agent-frameworks',
    categoryColor: '#d97706',
    description: 'CrewAI enables building teams of AI agents that collaborate to accomplish complex tasks. Agents have roles, goals, and backstories, and work together through defined processes.',
    useCases: ['Multi-agent research workflows', 'Automated content pipelines', 'Code review and analysis agents', 'Business process automation'],
    techStack: ['Python', 'LLM agnostic', 'Tool integration API'],
    pricing: 'Open-source',
    website: 'https://crewai.com',
    docsPath: '/docs/ai-tools/ai-agent-frameworks',
    comparisonPaths: [{label: 'CrewAI vs AutoGen', path: '/comparisons/crewai-vs-autogen'}],
  },
  {
    slug: 'autogen',
    name: 'AutoGen',
    tagline: 'Multi-agent conversational AI framework by Microsoft',
    category: 'ai-agent-frameworks',
    categoryColor: '#d97706',
    description: 'AutoGen enables building multi-agent systems where agents can converse with each other to solve tasks. Supports human-in-the-loop patterns and complex conversation flows.',
    useCases: ['Collaborative problem solving', 'Code generation and execution', 'Task decomposition with agent teams', 'Human-AI collaborative workflows'],
    techStack: ['Python', 'Multi-model support', 'Code execution sandbox'],
    pricing: 'Open-source (MIT)',
    website: 'https://microsoft.github.io/autogen/',
    docsPath: '/docs/ai-tools/ai-agent-frameworks',
    comparisonPaths: [{label: 'CrewAI vs AutoGen', path: '/comparisons/crewai-vs-autogen'}],
  },
  // ── AI Gateways ──
  {
    slug: 'portkey',
    name: 'Portkey',
    tagline: 'AI gateway with guardrails, caching, and observability',
    category: 'ai-gateways',
    categoryColor: '#6366f1',
    description: 'Portkey is a full-featured AI gateway that sits between your application and LLM providers. Provides unified API, semantic caching, guardrails, fallbacks, load balancing, and cost tracking across 25+ providers.',
    useCases: ['Multi-provider LLM routing and fallbacks', 'Semantic caching for cost reduction', 'Guardrails and content filtering', 'LLM spend analytics and budgeting'],
    techStack: ['REST API', 'Python/JS SDKs', 'OpenAI-compatible', 'Cloud or self-hosted'],
    pricing: 'Free tier, Growth and Enterprise plans',
    website: 'https://portkey.ai',
    docsPath: '/docs/ai-tools/ai-gateways',
    comparisonPaths: [{label: 'Portkey vs LiteLLM', path: '/docs/comparisons/portkey-vs-litellm'}],
  },
  {
    slug: 'litellm',
    name: 'LiteLLM',
    tagline: 'Lightweight open-source LLM proxy and gateway',
    category: 'ai-gateways',
    categoryColor: '#6366f1',
    description: 'LiteLLM is a lightweight proxy that provides a unified OpenAI-compatible interface to 100+ LLM providers. Features model fallbacks, spend tracking, rate limiting, and virtual API keys.',
    useCases: ['Unified API across LLM providers', 'Cost tracking and budget enforcement', 'Rate limiting and access control', 'Provider failover and load balancing'],
    techStack: ['Python', 'Docker', 'OpenAI-compatible API', 'PostgreSQL'],
    pricing: 'Open-source (MIT), Enterprise support',
    website: 'https://litellm.ai',
    docsPath: '/docs/ai-tools/ai-gateways',
    comparisonPaths: [{label: 'Portkey vs LiteLLM', path: '/docs/comparisons/portkey-vs-litellm'}],
  },
  // ── MLOps ──
  {
    slug: 'mlflow',
    name: 'MLflow',
    tagline: 'Open-source platform for ML lifecycle management',
    category: 'mlops',
    categoryColor: '#2563eb',
    description: 'MLflow manages the full ML lifecycle — experiment tracking, model registry, deployment, and monitoring. Now with LLM tracking and evaluation features for the AI/LLM era.',
    useCases: ['Experiment tracking and comparison', 'Model versioning and registry', 'LLM evaluation and benchmarking', 'Model deployment and serving'],
    techStack: ['Python', 'REST API', 'SQL backend', 'Docker', 'Kubernetes'],
    pricing: 'Open-source (Apache 2.0)',
    website: 'https://mlflow.org',
  },
  {
    slug: 'kubeflow',
    name: 'Kubeflow',
    tagline: 'ML toolkit for Kubernetes',
    category: 'mlops',
    categoryColor: '#2563eb',
    description: 'Kubeflow provides a portable, scalable ML platform on Kubernetes. Includes pipeline orchestration, notebook servers, model training, serving, and experiment tracking.',
    useCases: ['ML pipeline orchestration', 'Distributed model training', 'Model serving at scale', 'Jupyter notebook management on K8s'],
    techStack: ['Kubernetes', 'Python', 'Istio', 'Knative', 'TensorFlow/PyTorch'],
    pricing: 'Open-source (Apache 2.0)',
    website: 'https://kubeflow.org',
  },
  {
    slug: 'together-ai',
    name: 'Together AI',
    tagline: 'Inference and fine-tuning cloud for open-source models',
    category: 'mlops',
    categoryColor: '#2563eb',
    badge: 'trending',
    description: 'Together AI provides a cloud platform for running, fine-tuning, and deploying open-source LLMs. Offers fast inference via custom hardware, serverless endpoints, and fine-tuning APIs.',
    useCases: ['Fast inference for open-source LLMs', 'Custom fine-tuning with your data', 'Serverless model endpoints', 'Batch processing for embeddings'],
    techStack: ['REST API', 'Python SDK', 'OpenAI-compatible', 'NVIDIA GPUs'],
    pricing: 'Pay-per-token, volume discounts',
    website: 'https://together.ai',
  },
  {
    slug: 'anyscale',
    name: 'Anyscale',
    tagline: 'Scalable AI compute platform built on Ray',
    category: 'mlops',
    categoryColor: '#2563eb',
    description: 'Anyscale provides a managed platform for Ray — the distributed computing framework for ML and AI workloads. Simplifies scaling training, serving, and data processing across GPU clusters.',
    useCases: ['Distributed model training', 'Scalable model serving with Ray Serve', 'Data preprocessing at scale', 'Reinforcement learning workloads'],
    techStack: ['Ray', 'Python', 'Kubernetes', 'AWS/GCP', 'NVIDIA GPUs'],
    pricing: 'Pay-as-you-go compute, Enterprise plans',
    website: 'https://anyscale.com',
  },
];

export default function AITools(): ReactNode {
  return (
    <Layout
      title="AI Infrastructure Tool Directory"
      description="Curated directory of AI infrastructure tools — LLM security, AI observability, RAG platforms, agent frameworks, and MLOps tools reviewed by practitioners.">

      <header className="page-hero">
        <div className="container">
          <span className="hero-badge">AI Tool Directory</span>
          <h1>AI Infrastructure Tools</h1>
          <p className="page-hero-description">
            Curated directory of AI infrastructure tools reviewed by practitioners.
            LLM security, observability, orchestration, RAG, agents, and MLOps.
          </p>
          <div className="hero-actions">
            <Link className="btn-primary" to="/partner-with-aiopsvista">
              List Your Tool →
            </Link>
            <Link className="btn-secondary" to="/docs/category/ai-infrastructure">
              Architecture Guides
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Category Filter */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Browse by Category</span>
              <h2>{tools.length} Tools Reviewed</h2>
              <p>In-depth technical analysis — not marketing copy.</p>
            </div>

            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '3rem'}}>
              {CATEGORIES.map(cat => (
                <span key={cat.value} className="tool-filter-tag">
                  {cat.label}
                </span>
              ))}
            </div>

            {/* Tool Cards */}
            <div className="tool-directory-grid">
              {tools.map(tool => (
                <div key={tool.slug} className="tool-card">
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap'}}>
                    <span className="case-tag" style={{background: `${tool.categoryColor}15`, color: tool.categoryColor}}>
                      {CATEGORIES.find(c => c.value === tool.category)?.label}
                    </span>
                    {tool.badge && (
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        background: BADGE_CONFIG[tool.badge].bg,
                        color: BADGE_CONFIG[tool.badge].color,
                      }}>
                        {BADGE_CONFIG[tool.badge].label}
                      </span>
                    )}
                    <span style={{fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-500)', marginLeft: 'auto'}}>{tool.pricing}</span>
                  </div>
                  <h3 style={{fontSize: '1.15rem', marginBottom: '0.3rem'}}>{tool.name}</h3>
                  <p style={{fontSize: '0.85rem', color: 'var(--ifm-color-primary)', fontWeight: 600, marginBottom: '0.75rem'}}>{tool.tagline}</p>
                  <p style={{fontSize: '0.88rem', color: 'var(--ifm-color-emphasis-700)', lineHeight: 1.65, marginBottom: '1rem'}}>
                    {tool.description}
                  </p>

                  <div style={{marginBottom: '1rem'}}>
                    <strong style={{fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ifm-color-emphasis-600)'}}>Use Cases</strong>
                    <ul style={{listStyle: 'none', padding: 0, margin: '0.5rem 0 0'}}>
                      {tool.useCases.map(uc => (
                        <li key={uc} style={{fontSize: '0.83rem', padding: '0.2rem 0', paddingLeft: '1.2rem', position: 'relative', color: 'var(--ifm-color-emphasis-700)'}}>
                          <span style={{position: 'absolute', left: 0, color: 'var(--ifm-color-primary)', fontWeight: 700}}>→</span>
                          {uc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem'}}>
                    {tool.techStack.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: 'auto'}}>
                    {REVIEWED_TOOLS.has(tool.slug) && (
                      <Link className="card-link" to={`/tools/${tool.slug}-review`}>
                        Full Review →
                      </Link>
                    )}
                    {tool.docsPath && (
                      <Link className="card-link" to={tool.docsPath}>
                        Docs →
                      </Link>
                    )}
                    <a className="card-link" href={tool.website} target="_blank" rel="noopener noreferrer" style={{opacity: 0.7}}>
                      Website ↗
                    </a>
                  </div>
                  {tool.comparisonPaths && tool.comparisonPaths.length > 0 && (
                    <div style={{marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--card-border)'}}>
                      <span style={{fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ifm-color-emphasis-500)'}}>Comparisons</span>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.4rem'}}>
                        {tool.comparisonPaths.map(comp => (
                          <Link key={comp.path} to={comp.path} style={{fontSize: '0.78rem', color: 'var(--ifm-color-primary)', fontWeight: 500}}>
                            {comp.label} →
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tool Submission */}
        <section className="section">
          <div className="container" style={{maxWidth: '800px'}}>
            <div className="section-header">
              <span className="section-label">Open Directory</span>
              <h2>Submit Your AI Infrastructure Tool</h2>
              <p>
                Building an AI infrastructure tool? Get listed in our directory.
                We review and feature tools used by DevOps engineers and AI platform teams.
              </p>
            </div>
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
            }}>
              <p style={{fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-700)', lineHeight: 1.7, marginBottom: '1.5rem'}}>
                Submissions are reviewed for technical quality, production readiness, and relevance to AI infrastructure.
                Accepted tools receive a directory listing, optional technical review, and cross-linking to architecture guides.
              </p>
              <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
                <Link className="btn-primary" to="/contact">
                  Submit via Contact →
                </Link>
                <Link className="btn-secondary" to="/partner-with-aiopsvista">
                  Partner Program
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Comparisons CTA */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Head-to-Head</span>
              <h2>Tool Comparisons</h2>
              <p>Side-by-side technical analysis to help you choose the right tool.</p>
            </div>
            <div className="services-grid" style={{maxWidth: '900px'}}>
              <Link to="/comparisons/langchain-vs-haystack" className="doc-card">
                <h3>LangChain vs Haystack</h3>
                <p>LLM orchestration frameworks compared — architecture, flexibility, and production readiness.</p>
              </Link>
              <Link to="/comparisons/lakera-vs-guardrails" className="doc-card">
                <h3>Lakera vs Guardrails AI</h3>
                <p>LLM security platforms — prompt injection defense, output validation, compliance.</p>
              </Link>
              <Link to="/comparisons/crewai-vs-autogen" className="doc-card">
                <h3>CrewAI vs AutoGen</h3>
                <p>Multi-agent frameworks — architecture patterns, use cases, and scalability.</p>
              </Link>
              <Link to="/docs/comparisons/pinecone-vs-qdrant" className="doc-card">
                <h3>Pinecone vs Qdrant</h3>
                <p>Managed cloud vs open-source vector search — performance, cost, and operations.</p>
              </Link>
              <Link to="/docs/comparisons/langsmith-vs-langfuse" className="doc-card">
                <h3>LangSmith vs Langfuse</h3>
                <p>Commercial vs open-source LLM observability — tracing, evaluation, and cost.</p>
              </Link>
              <Link to="/docs/comparisons/portkey-vs-litellm" className="doc-card">
                <h3>Portkey vs LiteLLM</h3>
                <p>AI gateway comparison — routing, caching, guardrails, and provider support.</p>
              </Link>
            </div>
            <div style={{textAlign: 'center', marginTop: '2rem'}}>
              <Link className="btn-primary" to="/comparisons">
                View All Comparisons →
              </Link>
            </div>
          </div>
        </section>

        {/* Partnership CTA */}
        <section className="cta-section">
          <h2>Building an AI Infrastructure Tool?</h2>
          <p>
            Get featured in our directory. We write technical reviews, architecture guides, and comparison content
            reaching thousands of engineers and enterprise teams.
          </p>
          <div className="hero-actions">
            <Link className="btn-primary" to="/partner-with-aiopsvista" style={{background: '#fff', color: '#0f62fe'}}>
              Partner With Us →
            </Link>
            <Link className="btn-secondary" to="/contact">
              Contact Us
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
