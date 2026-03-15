import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

interface ComparisonRow {
  dimension: string;
  toolA: string;
  toolB: string;
}

interface StructuredAssessment {
  deploymentComplexity: {toolA: string; toolB: string};
  enterpriseReadiness: {toolA: string; toolB: string};
  securityCapabilities: {toolA: string; toolB: string};
}

interface Comparison {
  slug: string;
  toolA: string;
  toolB: string;
  category: string;
  summary: string;
  rows: ComparisonRow[];
  structured: StructuredAssessment;
  toolAVerdict: string;
  toolBVerdict: string;
  recommendation: string;
}

const comparisons: Comparison[] = [
  {
    slug: 'langchain-vs-haystack',
    toolA: 'LangChain',
    toolB: 'Haystack',
    category: 'LLM Orchestration',
    summary: 'LangChain and Haystack are both frameworks for building LLM applications, but they take fundamentally different design approaches. LangChain offers broad flexibility with a composable chain/agent model, while Haystack provides a structured pipeline architecture optimized for search and RAG workloads.',
    rows: [
      {dimension: 'Architecture', toolA: 'Composable chains and agents via LCEL/LangGraph. Flexible but requires understanding abstractions.', toolB: 'Directed pipeline graphs with typed components. More structured, less flexible.'},
      {dimension: 'Agent Support', toolA: 'LangGraph provides stateful multi-agent support with cycles and branching. Most mature agent framework.', toolB: 'Basic agent support via pipeline branching. Less suited for complex agent patterns.'},
      {dimension: 'RAG Capabilities', toolA: '50+ vector store integrations. Advanced retrieval (MMR, self-query, hybrid). Strong ecosystem.', toolB: 'Excellent document processing pipeline. Built-in support for Elasticsearch, OpenSearch. Production RAG focus.'},
      {dimension: 'Ecosystem', toolA: 'Largest ecosystem — 200+ integrations. Python + TypeScript. LangSmith for observability.', toolB: 'Smaller but focused ecosystem. Python-first. deepset Cloud for enterprise.'},
      {dimension: 'Learning Curve', toolA: 'Steeper — many abstractions, rapid API changes, large surface area.', toolB: 'More approachable — pipeline metaphor is intuitive, API is more stable.'},
      {dimension: 'Production Readiness', toolA: 'Production-proven at scale. Requires LangSmith for production observability.', toolB: 'Production-grade with stable APIs. deepset Cloud adds enterprise features.'},
      {dimension: 'Best For', toolA: 'Complex agent workflows, multi-tool use, conversational AI, rapid prototyping.', toolB: 'Document search, enterprise RAG, semantic search pipelines, stable production systems.'},
    ],
    structured: {
      deploymentComplexity: {
        toolA: 'Moderate to High — many dependencies, abstractions evolve quickly, LangSmith recommended for production. Requires careful version pinning and integration testing.',
        toolB: 'Low to Moderate — stable pipeline API, fewer moving parts, deepset Cloud available for managed deployments. Easier to maintain in production.',
      },
      enterpriseReadiness: {
        toolA: 'Strong — massive ecosystem, production-proven at scale, LangSmith for enterprise observability. Active community and commercial support via LangChain Inc.',
        toolB: 'Strong — API stability, deepset Cloud enterprise offering, SOC2-compliant managed service. Better suited for regulated environments requiring predictable behavior.',
      },
      securityCapabilities: {
        toolA: 'Integrates with Lakera Guard and Guardrails AI via chain middleware. LangSmith provides audit logging. No built-in security — requires external tooling.',
        toolB: 'Pipeline architecture enables security components at any stage. Supports content filtering and validation nodes. deepset Cloud adds enterprise security controls.',
      },
    },
    toolAVerdict: 'LangChain is the right choice when you need maximum flexibility, complex agent patterns, or access to the broadest integration ecosystem. The trade-off is a steeper learning curve and faster-moving API surface.',
    toolBVerdict: 'Haystack excels for focused RAG and search applications where pipeline structure, API stability, and document processing quality are priorities. Better fit for teams that want a more opinionated framework.',
    recommendation: 'Choose LangChain for agent-heavy applications and prototyping speed. Choose Haystack for production RAG systems where pipeline structure and API stability matter more than flexibility.',
  },
  {
    slug: 'lakera-vs-guardrails',
    toolA: 'Lakera Guard',
    toolB: 'Guardrails AI',
    category: 'LLM Security',
    summary: 'Lakera Guard and Guardrails AI both address LLM application security but from different angles. Lakera focuses on real-time prompt injection defense, while Guardrails AI provides input/output validation with structured enforcement — complementary tools rather than direct competitors.',
    rows: [
      {dimension: 'Primary Focus', toolA: 'Prompt injection detection and LLM security threats. Attack prevention.', toolB: 'Input/output validation, structured output enforcement, content moderation.'},
      {dimension: 'Architecture', toolA: 'API middleware — proxy between app and LLM. Real-time detection engine.', toolB: 'Wrapper around LLM calls. Validators run before/after model inference.'},
      {dimension: 'Threat Coverage', toolA: 'Prompt injection, jailbreaks, data exfiltration, harmful content. Attack-pattern focused.', toolB: 'Output format validation (JSON/XML), toxicity, bias, factuality, custom rules.'},
      {dimension: 'Deployment', toolA: 'Cloud API, Docker/K8s self-hosted, edge deployment. Enterprise infrastructure.', toolB: 'Python library integrated into application code. Validator Hub for community validators.'},
      {dimension: 'Open Source', toolA: 'Proprietary core with published research. API-first.', toolB: 'Open-source framework (Apache 2.0). Validator Hub community-driven.'},
      {dimension: 'Enterprise Fit', toolA: 'Purpose-built for enterprise security teams. SOC2, data residency, SIEM integration.', toolB: 'Developer-friendly. Less enterprise security infrastructure, more application-level validation.'},
      {dimension: 'Best For', toolA: 'Security-first teams in regulated industries. Attack prevention at the infrastructure level.', toolB: 'Developers enforcing output quality, structure, and content policies at the application level.'},
    ],
    structured: {
      deploymentComplexity: {
        toolA: 'Low — API middleware deployment, Docker/K8s self-hosted option. No application code changes required. Operates as a transparent proxy layer.',
        toolB: 'Low to Moderate — Python library integrated into application code. Each application must integrate the Guard wrapper. Validator Hub simplifies adding new validators.',
      },
      enterpriseReadiness: {
        toolA: 'Very Strong — purpose-built for enterprise security teams. SOC2 compliant, SIEM integration, data residency options, dedicated enterprise support.',
        toolB: 'Moderate — developer-focused open-source tool. Enterprise plans available but less mature than Lakera for enterprise security workflows.',
      },
      securityCapabilities: {
        toolA: 'Comprehensive — ML-based prompt injection detection, jailbreak prevention, PII scanning, data exfiltration defense, content moderation. Continuously updated threat models.',
        toolB: 'Output-focused — structured output validation, toxicity detection, bias filtering, PII detection in responses, custom business rule enforcement. Community-driven Validator Hub.',
      },
    },
    toolAVerdict: 'Lakera Guard is the stronger choice for teams in regulated industries where prompt injection defense is a security requirement. Its infrastructure-level approach means it can protect all LLM endpoints without modifying application code.',
    toolBVerdict: 'Guardrails AI is ideal for developers who need fine-grained control over LLM outputs — enforcing JSON schemas, filtering toxic content, and running custom validation logic. The open-source model and Validator Hub make it highly extensible.',
    recommendation: 'These tools are complementary. Use Lakera Guard for infrastructure-level prompt injection defense and Guardrails AI for application-level output validation and quality enforcement. Enterprise teams should consider deploying both.',
  },
  {
    slug: 'crewai-vs-autogen',
    toolA: 'CrewAI',
    toolB: 'AutoGen',
    category: 'AI Agent Frameworks',
    summary: 'CrewAI and AutoGen are the two leading multi-agent frameworks. CrewAI uses a role-based crew metaphor with defined processes, while AutoGen uses conversational patterns where agents communicate through message passing. Different mental models for similar outcomes.',
    rows: [
      {dimension: 'Mental Model', toolA: 'Crew of agents with roles, goals, and backstories. Process-based execution (sequential, hierarchical).', toolB: 'Conversational agents that communicate via message passing. Chat-based collaboration.'},
      {dimension: 'Agent Definition', toolA: 'Role + Goal + Backstory + Tools. Declarative, human-readable agent definitions.', toolB: 'AssistantAgent + UserProxyAgent patterns. Code-first agent configuration.'},
      {dimension: 'Orchestration', toolA: 'Built-in process types: sequential, hierarchical, consensual. Crew manages agent coordination.', toolB: 'Flexible conversation patterns. GroupChat for multi-agent coordination. Custom orchestration logic.'},
      {dimension: 'Human-in-the-Loop', toolA: 'Supported via human input tool. Less seamless than AutoGen.', toolB: 'First-class human-in-the-loop via UserProxyAgent. Natural conversation flow with human approval.'},
      {dimension: 'Code Execution', toolA: 'Tool-based code execution. Less emphasis on runtime code generation.', toolB: 'Built-in code execution sandbox. Agents can write and run code as part of problem solving.'},
      {dimension: 'Learning Curve', toolA: 'Lower — intuitive crew/role metaphor. Quick to prototype multi-agent workflows.', toolB: 'Moderate — conversation patterns require understanding message flow and termination conditions.'},
      {dimension: 'Best For', toolA: 'Content pipelines, research workflows, business automation. Clear role-based task division.', toolB: 'Code generation, data analysis, problem solving. Tasks requiring iterative agent collaboration.'},
    ],
    structured: {
      deploymentComplexity: {
        toolA: 'Low — pip install, define agents declaratively with roles/goals, run crew. Minimal infrastructure requirements. Quick to prototype and deploy.',
        toolB: 'Moderate — requires understanding conversation patterns and termination conditions. Code execution sandbox needs isolation. More configuration for production safety.',
      },
      enterpriseReadiness: {
        toolA: 'Growing — backed by CrewAI Inc with enterprise features in development. Community is active but the project is younger. Production adoption increasing.',
        toolB: 'Strong — backed by Microsoft Research with active development. Enterprise adoption for code generation and data analysis use cases. Well-documented.',
      },
      securityCapabilities: {
        toolA: 'Basic — relies on underlying LLM security. Tool execution permissions configurable. No built-in input/output scanning. Requires external security tooling.',
        toolB: 'Moderate — code execution sandboxing built-in. Human-in-the-loop for approval of critical actions. Docker-based code execution isolation. Requires external LLM security.',
      },
    },
    toolAVerdict: 'CrewAI excels at structured, role-based workflows where tasks can be clearly divided among specialized agents. The intuitive metaphor makes it accessible for non-ML engineers and fast to prototype.',
    toolBVerdict: 'AutoGen is stronger for tasks requiring iterative collaboration, code generation, and human-in-the-loop patterns. The conversational approach is more flexible but less structured.',
    recommendation: 'Choose CrewAI for business automation, content generation, and structured research workflows. Choose AutoGen for collaborative problem solving, code generation tasks, and scenarios requiring tight human-AI interaction.',
  },
  {
    slug: 'langfuse-vs-arize',
    toolA: 'Langfuse',
    toolB: 'Arize Phoenix',
    category: 'AI Observability',
    summary: 'Langfuse and Arize Phoenix both provide observability for LLM applications, but serve different needs. Langfuse focuses on production observability with prompt management and cost tracking, while Phoenix specializes in evaluation and debugging with deep RAG analysis capabilities.',
    rows: [
      {dimension: 'Primary Focus', toolA: 'Production LLM observability — tracing, cost analytics, prompt management.', toolB: 'LLM evaluation and debugging — RAG analysis, embedding visualization, hallucination detection.'},
      {dimension: 'Tracing', toolA: 'Hierarchical trace model with spans. Production-grade ingestion with SDKs for Python/TS.', toolB: 'OpenTelemetry-based tracing. Deep span analysis with inline evaluation.'},
      {dimension: 'RAG Analysis', toolA: 'Basic retrieval span tracking. Evaluation via custom scoring functions.', toolB: 'Deep RAG analysis — retrieval relevance scoring, chunk quality, embedding visualization.'},
      {dimension: 'Prompt Management', toolA: 'Built-in prompt versioning, A/B testing, and environment management.', toolB: 'No built-in prompt management. Focused on analysis rather than workflow.'},
      {dimension: 'Cost Tracking', toolA: 'Detailed cost analytics per user, feature, and model. Dashboard-level visibility.', toolB: 'Basic token tracking. Less focus on cost analytics.'},
      {dimension: 'Deployment', toolA: 'Self-hosted (Docker) or Cloud SaaS. PostgreSQL backend.', toolB: 'Open-source, runs locally. Jupyter notebook integration. Lightweight evaluation tool.'},
      {dimension: 'Best For', toolA: 'Production monitoring, cost control, prompt lifecycle management.', toolB: 'Development-time debugging, RAG quality analysis, model evaluation.'},
    ],
    structured: {
      deploymentComplexity: {
        toolA: 'Low to Moderate — Docker Compose for self-hosted (PostgreSQL backend), or use Cloud SaaS. Python/TS SDKs with decorator-based integration. Minimal code changes.',
        toolB: 'Very Low — pip install, runs locally, Jupyter notebook integration. No infrastructure required for development use. Lightweight and portable.',
      },
      enterpriseReadiness: {
        toolA: 'Strong — self-hosted or cloud deployment, team management, prompt versioning for production, cost analytics dashboards. Growing enterprise adoption.',
        toolB: 'Moderate — primarily a development tool. Arize AI offers enterprise cloud platform for production. Phoenix itself is best for dev/staging environments.',
      },
      securityCapabilities: {
        toolA: 'Good — self-hosted option keeps data on-premise. RBAC for team access. Audit logging of prompt changes. No built-in LLM security — focused on observability.',
        toolB: 'Basic — runs locally so data stays on-premise. No built-in access control or audit features. Security through local-only deployment.',
      },
    },
    toolAVerdict: 'Langfuse is the production observability platform — it excels at monitoring live LLM applications, managing prompts, and tracking costs over time. Best for platform teams operating LLM infrastructure.',
    toolBVerdict: 'Arize Phoenix is the best tool for deep LLM evaluation and debugging, especially RAG systems. Its Jupyter integration makes it ideal for data scientists and ML engineers during development.',
    recommendation: 'Use Langfuse for production observability and prompt management. Use Phoenix for development-time RAG analysis and model evaluation. Many teams use both — Phoenix in development, Langfuse in production.',
  },
  {
    slug: 'pinecone-vs-weaviate',
    toolA: 'Pinecone',
    toolB: 'Weaviate',
    category: 'Vector Databases',
    summary: 'Pinecone and Weaviate are the two leading vector databases for AI applications. Pinecone is a fully managed cloud service optimized for simplicity and scale, while Weaviate is an open-source vector database with hybrid search and multi-modal capabilities. The choice depends on your deployment model, search complexity, and operational requirements.',
    rows: [
      {dimension: 'Architecture', toolA: 'Fully managed cloud-native service. Serverless and pod-based deployment options. No self-hosting.', toolB: 'Open-source, self-hosted or Weaviate Cloud. Modular architecture with pluggable vectorizers and modules.'},
      {dimension: 'Hybrid Search', toolA: 'Sparse-dense vectors supported via sparse_values parameter. Requires manual sparse vector generation.', toolB: 'Built-in hybrid search (BM25 + vector) with configurable fusion algorithms. No extra tooling required.'},
      {dimension: 'Multi-tenancy', toolA: 'Namespace-based isolation within indexes. Simple multi-tenant pattern.', toolB: 'Native multi-tenancy with tenant-level isolation, offloading, and resource management.'},
      {dimension: 'Multi-modal', toolA: 'Vector-only — you generate embeddings externally and store vectors.', toolB: 'Built-in vectorizer modules (text, image, multi-modal). Can generate embeddings from raw data.'},
      {dimension: 'Scaling', toolA: 'Automatic scaling with serverless. Pod-based for predictable workloads. No infrastructure management.', toolB: 'Horizontal scaling with replication and sharding. Requires capacity planning for self-hosted.'},
      {dimension: 'Filtering', toolA: 'Metadata filtering with equality, range, and list operators. Filters applied during ANN search.', toolB: 'GraphQL-like filtering with complex boolean logic. Pre-filtering and post-filtering options.'},
      {dimension: 'Best For', toolA: 'Teams wanting zero-ops vector search at scale. Rapid prototyping to production with minimal infrastructure.', toolB: 'Teams needing hybrid search, multi-modal support, or self-hosted deployment with full data control.'},
    ],
    structured: {
      deploymentComplexity: {
        toolA: 'Very Low — fully managed SaaS. No infrastructure provisioning, no capacity planning for serverless tier. API key and SDK are all you need. Production-ready in minutes.',
        toolB: 'Moderate — Docker or Kubernetes deployment for self-hosted. Weaviate Cloud available for managed option. Requires understanding of modules, vectorizers, and schema configuration.',
      },
      enterpriseReadiness: {
        toolA: 'Strong — SOC2 Type II, GDPR compliant, dedicated enterprise tier with private endpoints, SSO, and SLA guarantees. Used by large-scale production systems.',
        toolB: 'Strong — self-hosted option provides full data sovereignty. Weaviate Cloud offers enterprise support. SOC2 compliant. Active enterprise adoption in regulated industries.',
      },
      securityCapabilities: {
        toolA: 'Good — encryption at rest and in transit, API key authentication, private endpoints for enterprise. No self-hosted option limits data sovereignty control.',
        toolB: 'Strong for self-hosted — full data sovereignty, RBAC with API keys, encryption at rest/in transit. Self-hosted model is preferred for regulated environments.',
      },
    },
    toolAVerdict: 'Pinecone is the best choice for teams that want zero-ops vector search. The serverless tier eliminates capacity planning entirely. Ideal when your priority is developer velocity over infrastructure control.',
    toolBVerdict: 'Weaviate excels when you need hybrid search, multi-modal capabilities, or self-hosted deployment. The built-in vectorizer modules reduce pipeline complexity. Better for teams with specific search and data sovereignty requirements.',
    recommendation: 'Choose Pinecone for managed simplicity, fast time-to-production, and predictable scaling. Choose Weaviate for hybrid search, multi-modal support, self-hosted requirements, or complex filtering needs. Both are production-proven at scale.',
  },
  {
    slug: 'slashllm-vs-lakera',
    toolA: 'SlashLLM',
    toolB: 'Lakera Guard',
    category: 'LLM Security',
    summary: 'SlashLLM and Lakera Guard both secure LLM applications but at different layers. SlashLLM provides a full-stack AI security platform with gateway, SOC, and compliance features, while Lakera Guard focuses specifically on real-time prompt injection detection as a lightweight API middleware. The choice depends on whether you need a comprehensive security platform or a focused detection layer.',
    rows: [
      {dimension: 'Scope', toolA: 'Full-stack AI security platform — gateway, guardrails, SOC monitoring, compliance reporting.', toolB: 'Focused prompt injection and threat detection middleware. Single-purpose, does one thing well.'},
      {dimension: 'Architecture', toolA: 'Platform with gateway proxy, policy engine, monitoring dashboard, and SOC integration.', toolB: 'Lightweight API middleware between application and LLM provider. Minimal latency overhead.'},
      {dimension: 'Threat Detection', toolA: 'Prompt injection, data leakage, toxic content, plus SOC-level threat monitoring and alerting.', toolB: 'ML-based prompt injection detection, jailbreak prevention, PII scanning, content moderation. Continuously updated models.'},
      {dimension: 'Compliance', toolA: 'Built-in compliance reporting for SOC2, ISO 27001, HIPAA. Audit trails and policy enforcement.', toolB: 'SOC2 compliant infrastructure. Audit logging. No built-in compliance reporting — focused on detection.'},
      {dimension: 'Integration', toolA: 'Gateway deployment — routes all LLM traffic through the platform. Requires traffic redirection.', toolB: 'API call per request — can be added alongside existing LLM calls with minimal code changes.'},
      {dimension: 'Pricing', toolA: 'Flat-rate enterprise tiers. Higher entry point but includes full platform.', toolB: 'Free tier available. Usage-based pricing. Lower entry point for smaller teams.'},
      {dimension: 'Best For', toolA: 'Enterprise teams needing end-to-end AI security with compliance, SOC monitoring, and policy enforcement.', toolB: 'Teams wanting fast, focused prompt injection defense without platform lock-in. Easy to add to any LLM pipeline.'},
    ],
    structured: {
      deploymentComplexity: {
        toolA: 'Moderate to High — full platform deployment with gateway routing, policy configuration, SOC integration, and dashboard setup. Requires infrastructure commitment.',
        toolB: 'Very Low — single API call integration. No infrastructure changes required. Can be added to existing LLM calls in minutes. Docker/K8s self-hosted option available.',
      },
      enterpriseReadiness: {
        toolA: 'Very Strong — purpose-built enterprise platform with SOC monitoring, compliance dashboards, policy enforcement, audit trails, and dedicated support. All-in-one security solution.',
        toolB: 'Strong — enterprise tier with dedicated support, SOC2 compliance, data residency options, SIEM integration. Focused scope means it integrates into your existing security stack rather than replacing it.',
      },
      securityCapabilities: {
        toolA: 'Comprehensive — end-to-end coverage including prompt injection, data leakage, toxic content, compliance enforcement, SOC monitoring, and incident response. Platform approach covers the full attack surface.',
        toolB: 'Focused — best-in-class prompt injection detection with ML models trained on evolving attack patterns. PII scanning, content moderation, jailbreak prevention. Continuously updated threat models.',
      },
    },
    toolAVerdict: 'SlashLLM is the right choice for enterprise teams that need a complete AI security platform — from gateway-level protection to compliance reporting and SOC monitoring. Best when you want a single vendor for the full security stack.',
    toolBVerdict: 'Lakera Guard excels as a focused, lightweight prompt injection defense layer. Its API-first approach makes it easy to integrate into any pipeline without infrastructure changes. Best for teams that want best-of-breed detection without platform commitment.',
    recommendation: 'Choose SlashLLM for comprehensive enterprise AI security with compliance and SOC capabilities. Choose Lakera Guard for fast, focused prompt injection defense that integrates into existing infrastructure. For maximum coverage, some enterprises deploy Lakera Guard for real-time detection alongside SlashLLM for governance and compliance.',
  },
];

function ComparisonPage({comp}: {comp: Comparison}): ReactNode {
  return (
    <Layout
      title={`${comp.toolA} vs ${comp.toolB} — Technical Comparison`}
      description={`${comp.toolA} vs ${comp.toolB}: Side-by-side technical comparison. Architecture, features, pros and cons, and recommendation for ${comp.category}.`}>

      <header className="page-hero">
        <div className="container">
          <span className="hero-badge">{comp.category}</span>
          <h1>{comp.toolA} vs {comp.toolB}</h1>
          <p className="page-hero-description">{comp.summary}</p>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="container" style={{maxWidth: '960px', margin: '0 auto'}}>

            {/* Comparison Table */}
            <div className="review-block">
              <h2>Side-by-Side Comparison</h2>
              <div className="comparison-table-wrap">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th style={{width: '18%'}}>Dimension</th>
                      <th style={{width: '41%'}}>{comp.toolA}</th>
                      <th style={{width: '41%'}}>{comp.toolB}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comp.rows.map(row => (
                      <tr key={row.dimension}>
                        <td><strong>{row.dimension}</strong></td>
                        <td>{row.toolA}</td>
                        <td>{row.toolB}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Structured Assessment */}
            <div className="review-block">
              <h2>Deployment & Enterprise Assessment</h2>

              <h3 style={{fontSize: '1.05rem', marginTop: '1.5rem', marginBottom: '0.75rem'}}>Deployment Complexity</h3>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem'}}>
                <div className="pros-card">
                  <h4 style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>{comp.toolA}</h4>
                  <p style={{fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--ifm-color-emphasis-700)', margin: 0}}>{comp.structured.deploymentComplexity.toolA}</p>
                </div>
                <div className="pros-card">
                  <h4 style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>{comp.toolB}</h4>
                  <p style={{fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--ifm-color-emphasis-700)', margin: 0}}>{comp.structured.deploymentComplexity.toolB}</p>
                </div>
              </div>

              <h3 style={{fontSize: '1.05rem', marginTop: '1.5rem', marginBottom: '0.75rem'}}>Enterprise Readiness</h3>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem'}}>
                <div className="pros-card">
                  <h4 style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>{comp.toolA}</h4>
                  <p style={{fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--ifm-color-emphasis-700)', margin: 0}}>{comp.structured.enterpriseReadiness.toolA}</p>
                </div>
                <div className="pros-card">
                  <h4 style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>{comp.toolB}</h4>
                  <p style={{fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--ifm-color-emphasis-700)', margin: 0}}>{comp.structured.enterpriseReadiness.toolB}</p>
                </div>
              </div>

              <h3 style={{fontSize: '1.05rem', marginTop: '1.5rem', marginBottom: '0.75rem'}}>Security Capabilities</h3>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem'}}>
                <div className="pros-card">
                  <h4 style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>{comp.toolA}</h4>
                  <p style={{fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--ifm-color-emphasis-700)', margin: 0}}>{comp.structured.securityCapabilities.toolA}</p>
                </div>
                <div className="pros-card">
                  <h4 style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>{comp.toolB}</h4>
                  <p style={{fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--ifm-color-emphasis-700)', margin: 0}}>{comp.structured.securityCapabilities.toolB}</p>
                </div>
              </div>
            </div>

            {/* Verdicts */}
            <div className="review-block">
              <h2>Verdict</h2>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem'}}>
                <div className="pros-card">
                  <h3 style={{fontSize: '1rem', marginBottom: '0.75rem'}}>{comp.toolA}</h3>
                  <p style={{fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--ifm-color-emphasis-700)', margin: 0}}>{comp.toolAVerdict}</p>
                </div>
                <div className="pros-card">
                  <h3 style={{fontSize: '1rem', marginBottom: '0.75rem'}}>{comp.toolB}</h3>
                  <p style={{fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--ifm-color-emphasis-700)', margin: 0}}>{comp.toolBVerdict}</p>
                </div>
              </div>
              <div className="service-result" style={{fontSize: '1rem', lineHeight: 1.8}}>
                <strong>Recommendation:</strong> {comp.recommendation}
              </div>
            </div>

            {/* Related */}
            <div className="review-block" style={{marginTop: '3rem'}}>
              <div className="section-header">
                <span className="section-label">Related</span>
                <h2>Explore Further</h2>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem'}}>
                <Link to="/ai-tools" className="doc-card">
                  <h3>Tool Directory</h3>
                  <p>Browse all AI infrastructure tools.</p>
                </Link>
                <Link to="/tools" className="doc-card">
                  <h3>Full Reviews</h3>
                  <p>In-depth tool reviews.</p>
                </Link>
                <Link to="/services" className="doc-card">
                  <h3>Need Help Choosing?</h3>
                  <p>Our consultants can help.</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

// Export individual comparison page components
export function LangchainVsHaystack(): ReactNode {
  const comp = comparisons.find(c => c.slug === 'langchain-vs-haystack')!;
  return <ComparisonPage comp={comp} />;
}
export function LakeraVsGuardrails(): ReactNode {
  const comp = comparisons.find(c => c.slug === 'lakera-vs-guardrails')!;
  return <ComparisonPage comp={comp} />;
}
export function CrewaiVsAutogen(): ReactNode {
  const comp = comparisons.find(c => c.slug === 'crewai-vs-autogen')!;
  return <ComparisonPage comp={comp} />;
}
export function LangfuseVsArize(): ReactNode {
  const comp = comparisons.find(c => c.slug === 'langfuse-vs-arize')!;
  return <ComparisonPage comp={comp} />;
}
export function PineconeVsWeaviate(): ReactNode {
  const comp = comparisons.find(c => c.slug === 'pinecone-vs-weaviate')!;
  return <ComparisonPage comp={comp} />;
}
export function SlashllmVsLakera(): ReactNode {
  const comp = comparisons.find(c => c.slug === 'slashllm-vs-lakera')!;
  return <ComparisonPage comp={comp} />;
}

export default function ComparisonsIndex(): ReactNode {
  return (
    <Layout
      title="AI Tool Comparisons — Side-by-Side Technical Analysis"
      description="Side-by-side technical comparisons of AI infrastructure tools. LangChain vs Haystack, Lakera vs Guardrails, CrewAI vs AutoGen, and more.">

      <header className="page-hero">
        <div className="container">
          <span className="hero-badge">Head-to-Head</span>
          <h1>AI Tool Comparisons</h1>
          <p className="page-hero-description">
            Side-by-side technical analysis to help you choose the right tools for your AI infrastructure.
          </p>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="container">
            <div className="why-grid" style={{maxWidth: '1000px'}}>
              {comparisons.map(comp => (
                <Link key={comp.slug} to={`/comparisons/${comp.slug}`} className="doc-card" style={{padding: '2rem'}}>
                  <span className="case-tag">{comp.category}</span>
                  <h3 style={{marginTop: '0.75rem', fontSize: '1.15rem'}}>{comp.toolA} vs {comp.toolB}</h3>
                  <p style={{fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '0.5rem'}}>{comp.summary.slice(0, 160)}...</p>
                  <span className="card-link">Read Comparison →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Need Help Choosing?</h2>
          <p>Our consultants help engineering teams evaluate and implement AI infrastructure tools.</p>
          <Link className="btn-primary" to="/contact" style={{background: '#fff', color: '#0f62fe'}}>
            Book a Free Consultation →
          </Link>
        </section>
      </main>
    </Layout>
  );
}
