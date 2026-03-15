import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

interface ReviewData {
  name: string;
  tagline: string;
  category: string;
  website: string;
  overview: string;
  architecture: {title: string; description: string}[];
  prosAndCons: {pros: string[]; cons: string[]};
  useCases: {title: string; description: string}[];
  verdict: string;
}

const reviews: Record<string, ReviewData> = {
  'lakera-guard': {
    name: 'Lakera Guard',
    tagline: 'Real-time LLM security and prompt injection defense',
    category: 'LLM Security',
    website: 'https://lakera.ai',
    overview: `Lakera Guard is an LLM security platform that sits between your application and the LLM provider to detect and block prompt injections, data leakage, and harmful content in real time. It operates as an API middleware — every prompt and response passes through Lakera's detection engine before reaching the model or the user.

The platform uses a combination of fine-tuned classifiers, heuristic rules, and continuously updated threat intelligence to catch attacks that static rule systems miss. Lakera's research team maintains one of the largest datasets of prompt injection attacks, which feeds the real-time detection models.

For enterprise teams deploying LLM applications in regulated environments (finance, healthcare, government), Lakera Guard provides the compliance layer that internal security teams require before production approval.`,
    architecture: [
      {title: 'API Gateway Pattern', description: 'Lakera deploys as a middleware proxy between your app and the LLM. Prompts are analyzed in real-time before forwarding to the model. Responses are scanned before delivery to the user. Latency overhead is typically under 100ms.'},
      {title: 'Multi-Layer Detection', description: 'The detection engine uses three layers: (1) heuristic pattern matching for known attack vectors, (2) ML classifiers trained on prompt injection datasets, (3) semantic analysis for novel attack patterns. Each layer catches different threat categories.'},
      {title: 'Deployment Options', description: 'Available as a cloud-hosted API, on-premises container deployment (Docker/Kubernetes), or edge deployment for low-latency requirements. Enterprise customers get dedicated infrastructure with data residency controls.'},
      {title: 'Monitoring Dashboard', description: 'Real-time dashboard showing blocked attacks, threat categories, false positive rates, and latency metrics. Integrates with existing SIEM systems via webhook and log forwarding.'},
    ],
    prosAndCons: {
      pros: [
        'Sub-100ms latency — minimal impact on user experience',
        'Continuously updated threat detection models',
        'Enterprise deployment options (self-hosted, SOC2 compliant)',
        'Easy integration — single API call wrapping existing LLM calls',
        'Active research team publishing prompt injection findings',
        'Comprehensive dashboard for security monitoring',
      ],
      cons: [
        'Cloud-first approach may not suit air-gapped environments',
        'Pricing not fully transparent for enterprise tiers',
        'Primarily focused on prompt injection — less coverage for output validation',
        'SDK available for Python; other language support is via REST API',
      ],
    },
    useCases: [
      {title: 'Enterprise Chatbots', description: 'Protect customer-facing LLM chatbots from jailbreak attempts, data extraction, and prompt manipulation. Critical for financial services and healthcare applications.'},
      {title: 'Internal LLM Tools', description: 'Secure internal AI assistants handling proprietary data — prevent prompt injection that could expose trade secrets, employee data, or confidential documents.'},
      {title: 'RAG Applications', description: 'Add security scanning to RAG pipelines where user queries interact with enterprise knowledge bases. Detect attempts to extract document content through crafted prompts.'},
      {title: 'API Gateway for LLM Services', description: 'Deploy Lakera as part of the API gateway stack to enforce security policies across all LLM endpoints in a microservices architecture.'},
    ],
    verdict: 'Lakera Guard is the most mature prompt injection defense platform available today. The API-first approach makes integration straightforward, and the continuously updated threat models provide real protection against evolving attack vectors. Best suited for teams deploying LLM applications in production where security is non-negotiable.',
  },
  'langfuse': {
    name: 'Langfuse',
    tagline: 'Open-source LLM observability and analytics',
    category: 'AI Observability',
    website: 'https://langfuse.com',
    overview: `Langfuse is an open-source observability platform purpose-built for LLM applications. It provides end-to-end tracing for LLM calls, prompt management, cost analytics, and quality evaluation — the equivalent of Datadog or New Relic, but designed specifically for AI workloads.

Unlike generic application monitoring tools that treat LLM calls as opaque HTTP requests, Langfuse understands the structure of LLM interactions — prompts, completions, token counts, latency, and chaining patterns. This makes it possible to debug complex LLM pipelines (RAG, agents, multi-step chains) at the trace level.

The self-hosted option is a major differentiator. Teams concerned about sending prompt data to third-party services can deploy Langfuse in their own infrastructure while still getting full observability capabilities. The cloud-hosted option is available for teams that prefer managed infrastructure.`,
    architecture: [
      {title: 'Trace-Based Architecture', description: 'Every LLM interaction generates a trace containing spans for each step — prompt construction, retrieval, LLM call, post-processing. Traces are hierarchical, supporting complex multi-step pipelines and agent workflows.'},
      {title: 'SDK Integration', description: 'Native SDKs for Python and TypeScript with decorators/wrappers that auto-instrument LLM calls. Integrations with LangChain, LlamaIndex, OpenAI SDK, and Anthropic SDK. Manual instrumentation available for custom pipelines.'},
      {title: 'Prompt Management', description: 'Version-controlled prompt templates with A/B testing support. Link prompt versions to production traces to measure performance impact of prompt changes. Rollback to previous versions if quality degrades.'},
      {title: 'Evaluation Pipeline', description: 'Run automated evaluations using LLM-as-judge patterns, custom scoring functions, or human review workflows. Track quality metrics over time and correlate with prompt or model changes.'},
    ],
    prosAndCons: {
      pros: [
        'Open-source with full self-hosted option (data stays in your infrastructure)',
        'Deep LLM-native tracing — not just HTTP level observability',
        'Prompt management with version control and A/B testing',
        'Cost tracking per user, feature, or model',
        'Active community and rapid feature development',
        'Native integrations with LangChain, LlamaIndex, and major LLM SDKs',
      ],
      cons: [
        'Self-hosted deployment requires PostgreSQL and container infrastructure',
        'Still maturing — some enterprise features (SSO, RBAC) are cloud-only',
        'Dashboard can be overwhelming for simple use cases',
        'Evaluation features require additional LLM calls (cost consideration)',
      ],
    },
    useCases: [
      {title: 'Production LLM Debugging', description: 'Trace specific user interactions through multi-step LLM pipelines — identify where retrievals fail, prompts produce poor results, or costs spike unexpectedly.'},
      {title: 'Cost Optimization', description: 'Track token usage and costs per feature, user segment, or model. Identify opportunities to switch to smaller models, implement caching, or optimize prompt lengths.'},
      {title: 'Quality Monitoring', description: 'Set up automated evaluation pipelines that continuously score LLM outputs against quality benchmarks. Detect quality degradation before users notice.'},
      {title: 'Prompt Engineering', description: 'A/B test prompt variations in production with statistical significance. Manage prompt templates across environments (dev, staging, production).'},
    ],
    verdict: 'Langfuse is the best open-source LLM observability platform available. The self-hosted option and deep tracing capabilities make it the go-to choice for teams that need production-grade observability for LLM applications without sending data to third-party services. Essential infrastructure for any team running LLMs in production.',
  },
  'langchain': {
    name: 'LangChain',
    tagline: 'Framework for building LLM-powered applications',
    category: 'AI Orchestration',
    website: 'https://langchain.com',
    overview: `LangChain is the most widely adopted framework for building applications powered by large language models. It provides composable building blocks — chains, agents, retrieval systems, memory, and tool integrations — that handle the complex plumbing required to go from a raw LLM API to a production application.

The framework has evolved significantly since its initial release. LangChain Expression Language (LCEL) provides a declarative way to compose chains with streaming, batching, and fallback support. LangGraph adds stateful, multi-step agent workflows with human-in-the-loop capabilities. LangSmith provides observability and evaluation for production deployments.

The ecosystem is massive — hundreds of integrations with vector stores, LLM providers, document loaders, and tools. This breadth is both its strength (you can build almost anything) and its challenge (the abstraction surface area is large and constantly evolving).`,
    architecture: [
      {title: 'LCEL (LangChain Expression Language)', description: 'Declarative chain composition with built-in streaming, batching, and error handling. Chains are defined as sequences of Runnables that can be composed, parallelized, and branched. Production-ready with retry and fallback support.'},
      {title: 'LangGraph for Agents', description: 'State machine-based agent framework replacing the original AgentExecutor. Supports cycles, branching, and human-in-the-loop patterns. Agents can maintain state across turns and coordinate multi-step workflows with tool use.'},
      {title: 'Retrieval Architecture', description: 'Pluggable retrieval system supporting 50+ vector stores, multiple embedding providers, and advanced retrieval strategies (MMR, self-query, parent document). Built-in document processing pipeline with splitters and transformers.'},
      {title: 'LangSmith Platform', description: 'Production observability with trace logging, dataset management, automated evaluation, and prompt playground. Required for serious production deployments to debug chains, monitor quality, and manage costs.'},
    ],
    prosAndCons: {
      pros: [
        'Largest ecosystem of integrations (50+ vector stores, 20+ LLM providers)',
        'LCEL provides clean declarative chain composition',
        'LangGraph solves complex agent patterns with state machines',
        'Excellent documentation with tutorials and cookbooks',
        'Very active development — rapid feature iteration',
        'Python and TypeScript support with feature parity',
      ],
      cons: [
        'Abstraction overhead — simpler to call LLM APIs directly for basic use cases',
        'Rapid API changes can break existing code between versions',
        'Learning curve steeper than alternatives for beginners',
        'Some abstractions are leaky and require understanding internals',
        'LangSmith (observability) is a paid product',
      ],
    },
    useCases: [
      {title: 'Enterprise RAG Applications', description: 'Build knowledge-base chatbots that connect LLMs with internal documents, databases, and APIs. LangChain handles document processing, embedding, retrieval, and augmented generation.'},
      {title: 'Multi-Step Agent Workflows', description: 'Create agents that can use tools, access databases, call APIs, and execute multi-step reasoning. LangGraph provides the state management for complex agent coordination.'},
      {title: 'Conversational AI', description: 'Build chatbots with long-term memory, context management, and multi-turn conversation handling. Memory modules manage conversation history and summarization.'},
      {title: 'Data Analysis Pipelines', description: 'Connect LLMs to SQL databases, CSV files, and analytics tools for natural language data exploration and automated reporting.'},
    ],
    verdict: 'LangChain remains the default choice for building LLM applications due to its ecosystem breadth and active development. The learning curve is real, and simpler alternatives exist for basic use cases. But for production applications that need retrieval, agents, memory, and tool use — LangChain provides the most complete toolkit. Use with LangSmith for production observability.',
  },
};

function ToolReviewPage({slug}: {slug: string}): ReactNode {
  const review = reviews[slug];
  if (!review) return null;

  return (
    <Layout
      title={`${review.name} Review — Architecture, Pros & Cons, Enterprise Use Cases`}
      description={`In-depth technical review of ${review.name}: ${review.tagline}. Architecture analysis, deployment patterns, pros and cons, and enterprise use cases.`}>

      <header className="page-hero">
        <div className="container">
          <span className="hero-badge">{review.category}</span>
          <h1>{review.name} — Technical Review</h1>
          <p className="page-hero-description">{review.tagline}</p>
          <div className="hero-actions">
            <a className="btn-primary" href={review.website} target="_blank" rel="noopener noreferrer">
              Visit {review.name} ↗
            </a>
            <Link className="btn-secondary" to="/ai-tools">
              ← Back to Directory
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="container" style={{maxWidth: '860px', margin: '0 auto'}}>

            {/* Overview */}
            <div className="review-block">
              <h2>Overview</h2>
              {review.overview.split('\n\n').map((p, i) => (
                <p key={i} style={{fontSize: '1rem', lineHeight: 1.8, color: 'var(--ifm-color-emphasis-700)', marginBottom: '1rem'}}>{p}</p>
              ))}
            </div>

            {/* Architecture */}
            <div className="review-block">
              <h2>🏗️ Technical Architecture</h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
                {review.architecture.map(a => (
                  <div key={a.title} className="expertise-item">
                    <strong>{a.title}</strong>
                    <p>{a.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="review-block">
              <h2>⚖️ Pros & Cons</h2>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pros-card">
                  <h3 style={{color: '#059669', fontSize: '1rem', marginBottom: '1rem'}}>✅ Strengths</h3>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                    {review.prosAndCons.pros.map(p => (
                      <li key={p} style={{fontSize: '0.88rem', padding: '0.4rem 0', paddingLeft: '1.4rem', position: 'relative', color: 'var(--ifm-color-emphasis-700)'}}>
                        <span style={{position: 'absolute', left: 0, color: '#059669', fontWeight: 700}}>+</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="cons-card">
                  <h3 style={{color: '#dc2626', fontSize: '1rem', marginBottom: '1rem'}}>⚠️ Limitations</h3>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                    {review.prosAndCons.cons.map(c => (
                      <li key={c} style={{fontSize: '0.88rem', padding: '0.4rem 0', paddingLeft: '1.4rem', position: 'relative', color: 'var(--ifm-color-emphasis-700)'}}>
                        <span style={{position: 'absolute', left: 0, color: '#dc2626', fontWeight: 700}}>−</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="review-block">
              <h2>🎯 Enterprise Use Cases</h2>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem'}}>
                {review.useCases.map(uc => (
                  <div key={uc.title} className="value-card">
                    <h3>{uc.title}</h3>
                    <p>{uc.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verdict */}
            <div className="review-block">
              <h2>📋 Verdict</h2>
              <div className="service-result" style={{fontSize: '1rem', lineHeight: 1.8}}>
                {review.verdict}
              </div>
            </div>

            {/* Related */}
            <div className="review-block" style={{marginTop: '3rem'}}>
              <div className="section-header">
                <span className="section-label">Related</span>
                <h2>Continue Exploring</h2>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem'}}>
                <Link to="/ai-tools" className="doc-card">
                  <h3>Tool Directory</h3>
                  <p>Browse all AI infrastructure tools.</p>
                </Link>
                <Link to="/comparisons" className="doc-card">
                  <h3>Comparisons</h3>
                  <p>Side-by-side tool analysis.</p>
                </Link>
                <Link to="/services" className="doc-card">
                  <h3>Consulting</h3>
                  <p>Need help implementing? Talk to us.</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

// Individual review pages — Docusaurus file-based routing
export function LakeraGuardReview(): ReactNode { return <ToolReviewPage slug="lakera-guard" />; }
export function LangfuseReview(): ReactNode { return <ToolReviewPage slug="langfuse" />; }
export function LangChainReview(): ReactNode { return <ToolReviewPage slug="langchain" />; }

export default function ToolReviewIndex(): ReactNode {
  return (
    <Layout
      title="AI Tool Reviews — In-Depth Technical Analysis"
      description="In-depth technical reviews of AI infrastructure tools — architecture, deployment patterns, pros & cons, and enterprise use cases.">

      <header className="page-hero">
        <div className="container">
          <span className="hero-badge">Technical Reviews</span>
          <h1>AI Tool Reviews</h1>
          <p className="page-hero-description">
            In-depth technical reviews by practitioners. Architecture analysis, deployment patterns, and honest assessments.
          </p>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="container">
            <div className="services-grid">
              {Object.entries(reviews).map(([slug, review]) => (
                <Link key={slug} to={`/tools/${slug}-review`} className="doc-card" style={{padding: '2rem'}}>
                  <span className="case-tag">{review.category}</span>
                  <h3 style={{marginTop: '0.75rem'}}>{review.name}</h3>
                  <p style={{marginBottom: '0.5rem'}}>{review.tagline}</p>
                  <span className="card-link">Read Full Review →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
