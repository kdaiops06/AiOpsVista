import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Home(): ReactNode {
  return (
    <Layout
      title="AI Infrastructure Intelligence & DevOps Consulting"
      description="AIOps Vista — AI infrastructure intelligence hub. Architecture intelligence, AI tool discovery, and DevOps consulting for modern AI platforms.">

      {/* HERO — Step 1: Enhanced positioning with three pillars */}
      <header className="hero-section">
        <div className="hero-bg-pattern" />
        <div className="container hero-content">
          <span className="hero-badge">AI Infrastructure Intelligence &middot; Developer Tool Discovery &middot; DevOps Consulting</span>
          <Heading as="h1" className="hero-title">
            Build Secure, Production-Ready<br />AI Infrastructure
          </Heading>
          <p className="hero-description">
            Architecture intelligence, AI tool discovery, and DevOps consulting for modern AI platforms.
            From LLM pipeline security and AI observability to Kubernetes architecture
            and AIOps implementation — we deliver results.
          </p>
          <div className="hero-actions">
            <Link className="btn-primary" to="/contact">
              Book a Free Consultation
            </Link>
            <Link className="btn-secondary" to="/ai-tools">
              Explore AI Tools
            </Link>
          </div>
          <div className="hero-trust">
            <span>Trusted by teams building on</span>
            <div className="trust-logos">
              <span className="trust-item">AWS</span>
              <span className="trust-item">Azure</span>
              <span className="trust-item">GCP</span>
              <span className="trust-item">Kubernetes</span>
              <span className="trust-item">LLM/AI</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* STATS */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-row">
              <div className="stat-block">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="stat-block">
                <span className="stat-number">40%</span>
                <span className="stat-label">Avg. Cost Reduction</span>
              </div>
              <div className="stat-block">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime Achieved</span>
              </div>
              <div className="stat-block">
                <span className="stat-number">3x</span>
                <span className="stat-label">Deployment Speed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: AI INFRASTRUCTURE INTELLIGENCE — Authority Section */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Deep Technical Expertise</span>
              <h2>AI Infrastructure Intelligence</h2>
              <p>Production-tested architecture guides, tool evaluations, and infrastructure patterns for engineering teams building AI systems.</p>
            </div>
            <div className="authority-grid">
              <Link to="/docs/ai-architecture/secure-llm-pipelines" className="authority-card">
                <div className="authority-icon">🔐</div>
                <h3>Secure LLM Pipeline Architecture</h3>
                <p>End-to-end security patterns for LLM deployments — input validation, output filtering, prompt injection defense, and data governance.</p>
                <span className="card-link">Read guide →</span>
              </Link>
              <Link to="/docs/ai-architecture/ai-observability-stack" className="authority-card">
                <div className="authority-icon">📡</div>
                <h3>AI Observability Stack</h3>
                <p>Full-stack observability for AI systems — trace LLM calls, monitor model performance, track token costs, and detect drift.</p>
                <span className="card-link">Read guide →</span>
              </Link>
              <Link to="/docs/ai-architecture/production-rag-systems" className="authority-card">
                <div className="authority-icon">🧠</div>
                <h3>RAG Production Deployment</h3>
                <p>Production architecture for retrieval-augmented generation — vector databases, embedding pipelines, chunking strategies, and evaluation.</p>
                <span className="card-link">Read guide →</span>
              </Link>
              <Link to="/docs/ai-architecture/prompt-injection-defense" className="authority-card">
                <div className="authority-icon">🛡️</div>
                <h3>Prompt Injection Defense</h3>
                <p>Multi-layer defense architecture against prompt injection attacks — input sanitization, output validation, and runtime guardrails.</p>
                <span className="card-link">Read guide →</span>
              </Link>
            </div>
            <div style={{textAlign: 'center', marginTop: '2rem'}}>
              <Link className="btn-primary" to="/docs/category/ai-architecture">
                View All Architecture Guides →
              </Link>
            </div>
          </div>
        </section>

        {/* Step 3: FEATURED AI INFRASTRUCTURE TOOLS */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Tool Discovery</span>
              <h2>Featured AI Infrastructure Tools</h2>
              <p>In-depth reviews and architecture analysis of the tools powering modern AI infrastructure.</p>
            </div>
            <div className="featured-tools-grid">
              <Link to="/docs/ai-tools/slashllm" className="featured-tool-card featured-tool-highlight">
                <div className="featured-tool-badge">AI Security Gateway</div>
                <h3>SlashLLM</h3>
                <p>Unified AI gateway with multi-layer security — prompt injection defense, policy governance, red teaming, and SOC-level monitoring for enterprise LLM deployments.</p>
                <span className="card-link">View deep-dive →</span>
              </Link>
              <Link to="/docs/ai-tools/pinecone" className="featured-tool-card">
                <div className="featured-tool-badge">Vector Database</div>
                <h3>Pinecone</h3>
                <p>Fully managed vector database for high-performance similarity search. Serverless architecture with automatic scaling and zero infrastructure management.</p>
                <span className="card-link">View deep-dive →</span>
              </Link>
              <Link to="/docs/ai-tools/weaviate" className="featured-tool-card">
                <div className="featured-tool-badge">Vector Database</div>
                <h3>Weaviate</h3>
                <p>Open-source vector database with built-in vectorization modules. Self-hosted or cloud-managed with native multi-tenancy support.</p>
                <span className="card-link">View deep-dive →</span>
              </Link>
              <Link to="/docs/ai-tools/langsmith" className="featured-tool-card">
                <div className="featured-tool-badge">LLM Observability</div>
                <h3>LangSmith</h3>
                <p>LLM development platform for tracing, evaluation, prompt engineering, and production monitoring across the full LLM lifecycle.</p>
                <span className="card-link">View deep-dive →</span>
              </Link>
              <Link to="/tools/lakera-guard-review" className="featured-tool-card">
                <div className="featured-tool-badge">LLM Security</div>
                <h3>Lakera Guard</h3>
                <p>Real-time LLM security layer that detects prompt injections, jailbreaks, and data leakage with sub-millisecond latency.</p>
                <span className="card-link">View review →</span>
              </Link>
            </div>
            <div style={{textAlign: 'center', marginTop: '2rem'}}>
              <Link className="btn-primary" to="/ai-tools">
                Browse All AI Tools →
              </Link>
            </div>
          </div>
        </section>

        {/* Step 4: ARCHITECTURE INTELLIGENCE SHOWCASE */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Architecture Patterns</span>
              <h2>Architecture Intelligence</h2>
              <p>Battle-tested architecture patterns for secure, observable, and scalable AI systems in production.</p>
            </div>
            <div className="arch-showcase-grid">
              <Link to="/docs/ai-architecture/secure-llm-pipelines" className="arch-card">
                <span className="arch-card-number">01</span>
                <h3>Secure LLM Pipeline Architecture</h3>
                <p>Design defense-in-depth LLM pipelines with input validation, output filtering, and runtime security controls.</p>
              </Link>
              <Link to="/docs/ai-architecture/ai-gateway-architecture" className="arch-card">
                <span className="arch-card-number">02</span>
                <h3>AI Gateway Architecture</h3>
                <p>Centralized gateway patterns for LLM routing, rate limiting, cost governance, and multi-provider failover.</p>
              </Link>
              <Link to="/docs/ai-architecture/enterprise-ai-security" className="arch-card">
                <span className="arch-card-number">03</span>
                <h3>Enterprise AI Security</h3>
                <p>Comprehensive security frameworks for enterprise AI — access control, data protection, compliance, and audit trails.</p>
              </Link>
              <Link to="/docs/ai-architecture/ai-observability-stack" className="arch-card">
                <span className="arch-card-number">04</span>
                <h3>AI Observability Stack</h3>
                <p>Full-stack monitoring and observability for AI systems — traces, metrics, logs, and model performance dashboards.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* SERVICES OVERVIEW — Step 10: Preserve consulting credibility */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-label">What We Do</span>
              <h2>Consulting Services</h2>
              <p>End-to-end AI infrastructure, DevOps, and AIOps solutions tailored for your engineering team.</p>
            </div>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon" style={{background: 'linear-gradient(135deg, #e8f0fe, #d2e3fc)'}}>📊</div>
                <h3>AIOps Consulting</h3>
                <p>Implement AI-driven monitoring, anomaly detection, and automated incident response to reduce MTTR by 60%.</p>
                <Link to="/services#aiops" className="card-link">Learn more →</Link>
              </div>
              <div className="service-card">
                <div className="service-icon" style={{background: 'linear-gradient(135deg, #e6f4ea, #ceead6)'}}>⚙️</div>
                <h3>DevOps Automation</h3>
                <p>CI/CD pipelines, GitOps workflows, and infrastructure automation that ship code faster with fewer errors.</p>
                <Link to="/services#devops" className="card-link">Learn more →</Link>
              </div>
              <div className="service-card">
                <div className="service-icon" style={{background: 'linear-gradient(135deg, #fce8e6, #fad2cf)'}}>☁️</div>
                <h3>Cloud Architecture</h3>
                <p>Design scalable, secure, cost-optimized cloud infrastructure on AWS, Azure, or GCP.</p>
                <Link to="/services#cloud" className="card-link">Learn more →</Link>
              </div>
              <div className="service-card">
                <div className="service-icon" style={{background: 'linear-gradient(135deg, #fef7e0, #feefc3)'}}>🔍</div>
                <h3>Observability & Monitoring</h3>
                <p>Full-stack observability with Prometheus, Grafana, Datadog, and custom dashboards.</p>
                <Link to="/services#observability" className="card-link">Learn more →</Link>
              </div>
              <div className="service-card">
                <div className="service-icon" style={{background: 'linear-gradient(135deg, #f3e8fd, #e8d5f5)'}}>💰</div>
                <h3>Cost Optimization</h3>
                <p>Reduce cloud spend by 30-50% through rightsizing, reserved capacity, and architecture optimization.</p>
                <Link to="/services#cost" className="card-link">Learn more →</Link>
              </div>
              <div className="service-card">
                <div className="service-icon" style={{background: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)'}}>⎈</div>
                <h3>Kubernetes Architecture</h3>
                <p>Production-grade Kubernetes clusters with security, scaling, and multi-tenancy best practices.</p>
                <Link to="/services#kubernetes" className="card-link">Learn more →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Why AIOps Vista</span>
              <h2>Engineering-First Approach</h2>
              <p>We are practitioners, not just advisors. Real solutions from real engineers.</p>
            </div>
            <div className="why-grid">
              <div className="why-card">
                <h3>🎯 Battle-Tested Solutions</h3>
                <p>Every recommendation comes from production experience, not theory. We have built and operated systems at scale.</p>
              </div>
              <div className="why-card">
                <h3>📐 Architecture-First</h3>
                <p>We design systems that scale. Our approach starts with architecture reviews and ends with production-ready infrastructure.</p>
              </div>
              <div className="why-card">
                <h3>🤖 AI-Native Operations</h3>
                <p>We integrate AI into your operations pipeline — from LLM security and observability to predictive scaling and autonomous remediation.</p>
              </div>
              <div className="why-card">
                <h3>📚 Knowledge Transfer</h3>
                <p>We do not just build — we teach. Every engagement includes documentation, runbooks, and team enablement.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 5: DEVELOPER DISCOVERY NAVIGATION */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Developer Resources</span>
              <h2>Explore AI Infrastructure Intelligence</h2>
              <p>Navigate our growing library of architecture guides, tool reviews, and infrastructure patterns.</p>
            </div>
            <div className="discovery-grid">
              <Link to="/ai-tools" className="discovery-card">
                <div className="discovery-icon">🗂️</div>
                <h3>AI Tool Directory</h3>
                <p>Curated directory of AI infrastructure tools — security, observability, orchestration, RAG, vector databases, and agent frameworks.</p>
              </Link>
              <Link to="/comparisons" className="discovery-card">
                <div className="discovery-icon">⚖️</div>
                <h3>Tool Comparisons</h3>
                <p>Side-by-side feature comparisons — LangChain vs Haystack, Lakera vs Guardrails, Langfuse vs Arize, and more.</p>
              </Link>
              <Link to="/docs/category/ai-architecture" className="discovery-card">
                <div className="discovery-icon">🏗️</div>
                <h3>Architecture Guides</h3>
                <p>Production architecture patterns for LLM pipelines, AI gateways, observability stacks, and enterprise security.</p>
              </Link>
              <Link to="/tools" className="discovery-card">
                <div className="discovery-icon">📝</div>
                <h3>Tool Reviews</h3>
                <p>Hands-on technical reviews with architecture analysis, deployment guidance, and integration patterns.</p>
              </Link>
              <Link to="/docs/category/cloud-devops" className="discovery-card">
                <div className="discovery-icon">☁️</div>
                <h3>Cloud & DevOps</h3>
                <p>CI/CD pipeline patterns, Kubernetes production checklists, Terraform modules, and cloud architecture guides.</p>
              </Link>
              <Link to="/docs/category/labs" className="discovery-card">
                <div className="discovery-icon">🧪</div>
                <h3>Hands-On Labs</h3>
                <p>Build real projects — RAG systems, AI chatbots, anomaly detection pipelines, and AIOps implementations.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Step 6: LEAD GENERATION — Work With Experts */}
        <section className="section">
          <div className="container">
            <div className="lead-gen-section">
              <div className="lead-gen-content">
                <span className="section-label">Expert Consulting</span>
                <h2>Work With AI Infrastructure Experts</h2>
                <p>
                  AIOpsVista helps engineering teams design, build, and secure production AI systems.
                  Whether you are deploying your first LLM pipeline or scaling enterprise AI infrastructure,
                  our team brings hands-on expertise across the full stack.
                </p>
                <div className="lead-gen-capabilities">
                  <div className="lead-gen-item">
                    <span>🏗️</span>
                    <span>AI platform architecture design and review</span>
                  </div>
                  <div className="lead-gen-item">
                    <span>🔐</span>
                    <span>LLM security, governance, and compliance</span>
                  </div>
                  <div className="lead-gen-item">
                    <span>📡</span>
                    <span>AI observability and monitoring implementation</span>
                  </div>
                  <div className="lead-gen-item">
                    <span>⚙️</span>
                    <span>DevOps automation for AI/ML systems</span>
                  </div>
                </div>
                <Link className="btn-primary" to="/contact">
                  Schedule a Consultation →
                </Link>
              </div>
              <div className="lead-gen-proof">
                <div className="lead-gen-proof-card">
                  <span className="lead-gen-proof-label">What We Deliver</span>
                  <ul>
                    <li>Architecture design documents</li>
                    <li>Security and compliance reviews</li>
                    <li>Tool selection and evaluation</li>
                    <li>Production deployment runbooks</li>
                    <li>Team enablement and training</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 7: STARTUP PARTNERSHIP SECTION */}
        <section className="section section-alt">
          <div className="container">
            <div className="partnership-section">
              <div className="section-header">
                <span className="section-label">Partnership Program</span>
                <h2>For AI Infrastructure Startups</h2>
                <p>AIOpsVista collaborates with AI infrastructure companies to bring developer visibility through technical content and architecture integration.</p>
              </div>
              <div className="partnership-grid">
                <div className="partnership-card">
                  <h3>🏗️ Architecture Guides</h3>
                  <p>Your tool featured in production architecture patterns read by engineering teams evaluating AI infrastructure.</p>
                </div>
                <div className="partnership-card">
                  <h3>📝 Tool Reviews</h3>
                  <p>In-depth technical reviews with architecture analysis, deployment guidance, and hands-on evaluation.</p>
                </div>
                <div className="partnership-card">
                  <h3>⚖️ Comparison Content</h3>
                  <p>Head-to-head comparisons that help developers understand your tool's strengths in context.</p>
                </div>
                <div className="partnership-card">
                  <h3>👥 Developer Visibility</h3>
                  <p>Reach engineering teams actively researching AI infrastructure tools and architecture patterns.</p>
                </div>
              </div>
              <div style={{textAlign: 'center', marginTop: '2rem'}}>
                <Link className="btn-primary" to="/partner-with-aiopsvista">
                  Explore Partnership Program →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED BLOG POSTS — Step 8: Traffic growth content */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">From the Blog</span>
              <h2>Latest Articles</h2>
              <p>Practical guides and insights on AI infrastructure, DevOps patterns, and tool evaluations.</p>
            </div>
            <div className="blog-grid">
              <Link to="/blog/building-aiops-strategy" className="blog-card">
                <span className="blog-card-tag">AIOps</span>
                <h3>Building an AIOps Strategy: From Reactive to Predictive</h3>
                <p>A 90-day plan to transform your operations with AI-driven monitoring and automation.</p>
                <span className="card-link">Read article →</span>
              </Link>
              <Link to="/blog/kubernetes-production-checklist" className="blog-card">
                <span className="blog-card-tag">Kubernetes</span>
                <h3>Kubernetes in Production: The 15-Point Checklist</h3>
                <p>Security, observability, networking, and operational readiness for production K8s.</p>
                <span className="card-link">Read article →</span>
              </Link>
              <Link to="/blog/terraform-module-patterns" className="blog-card">
                <span className="blog-card-tag">Terraform</span>
                <h3>Terraform at Scale: Module Patterns That Work</h3>
                <p>Battle-tested patterns for structuring Terraform at scale across teams and environments.</p>
                <span className="card-link">Read article →</span>
              </Link>
            </div>
            <div style={{textAlign: 'center', marginTop: '2rem'}}>
              <Link className="btn-primary" to="/blog">
                View All Articles →
              </Link>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="section section-alt">
          <div className="container">
            <div className="newsletter-section">
              <div className="newsletter-text">
                <span className="section-label">Newsletter</span>
                <h2>Stay Ahead of the Curve</h2>
                <p>
                  Weekly AI infrastructure, DevOps, and LLM operations insights — practical guides, tool reviews,
                  and industry news delivered to your inbox. No spam, unsubscribe anytime.
                </p>
                <Link className="btn-primary" to="/newsletter">
                  Subscribe to Newsletter →
                </Link>
              </div>
              <div className="newsletter-preview">
                <div className="newsletter-preview-card">
                  <span className="newsletter-preview-label">What's Inside</span>
                  <ul>
                    <li>📰 Weekly tech news digest</li>
                    <li>🛠️ Practical tutorials and guides</li>
                    <li>📊 Architecture patterns from the field</li>
                    <li>🎯 Tool reviews and comparisons</li>
                    <li>🚀 Early access to courses and templates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="container">
            <h2>Let's Build Something Great Together</h2>
            <p>Whether you are modernizing your infrastructure, securing your LLM pipelines, or implementing AIOps from scratch — we can help.</p>
            <div className="hero-actions">
              <Link className="btn-primary" to="/contact">
                Schedule a Consultation
              </Link>
              <Link className="btn-secondary-dark" to="/services">
                Explore Services
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
