import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

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
}

const CATEGORIES = [
  {label: 'All', value: 'all'},
  {label: 'LLM Security', value: 'llm-security'},
  {label: 'AI Observability', value: 'ai-observability'},
  {label: 'AI Orchestration', value: 'ai-orchestration'},
  {label: 'RAG Platforms', value: 'rag-platforms'},
  {label: 'AI Agent Frameworks', value: 'ai-agent-frameworks'},
  {label: 'MLOps', value: 'mlops'},
];

const REVIEWED_TOOLS = new Set(['lakera-guard', 'langfuse', 'langchain']);

const tools: Tool[] = [
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
  },
  {
    slug: 'langfuse',
    name: 'Langfuse',
    tagline: 'Open-source LLM observability and analytics',
    category: 'ai-observability',
    categoryColor: '#7c3aed',
    description: 'Langfuse is an open-source observability platform for LLM applications. It provides tracing, evaluation, prompt management, and cost analytics for production AI systems.',
    useCases: ['LLM call tracing and debugging', 'Prompt versioning and A/B testing', 'Cost tracking per model/feature', 'Quality evaluation pipelines'],
    techStack: ['TypeScript', 'Python SDK', 'OpenTelemetry', 'PostgreSQL', 'Self-hosted or Cloud'],
    pricing: 'Open-source (self-hosted free), Cloud plans available',
    website: 'https://langfuse.com',
  },
  {
    slug: 'arize-phoenix',
    name: 'Arize Phoenix',
    tagline: 'AI observability for LLMs, embeddings, and RAG',
    category: 'ai-observability',
    categoryColor: '#7c3aed',
    description: 'Phoenix by Arize provides deep observability into LLM and ML systems including retrieval analysis for RAG, embedding drift detection, and trace-level debugging of AI pipelines.',
    useCases: ['RAG retrieval quality analysis', 'LLM trace visualization', 'Embedding drift monitoring', 'Hallucination detection'],
    techStack: ['Python', 'OpenTelemetry', 'Jupyter integration', 'Self-hosted'],
    pricing: 'Open-source',
    website: 'https://phoenix.arize.com',
  },
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
  },
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
  },
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
  },
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
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem'}}>
                    <span className="case-tag" style={{background: `${tool.categoryColor}15`, color: tool.categoryColor}}>
                      {CATEGORIES.find(c => c.value === tool.category)?.label}
                    </span>
                    <span style={{fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-500)'}}>{tool.pricing}</span>
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

                  <div style={{display: 'flex', gap: '0.75rem'}}>
                    {REVIEWED_TOOLS.has(tool.slug) && (
                      <Link className="card-link" to={`/tools/${tool.slug}-review`}>
                        Full Review →
                      </Link>
                    )}
                    <a className="card-link" href={tool.website} target="_blank" rel="noopener noreferrer" style={{opacity: 0.7}}>
                      Website ↗
                    </a>
                  </div>
                </div>
              ))}
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
