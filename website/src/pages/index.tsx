import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Home(): ReactNode {
  return (
    <Layout
      title="AI Infrastructure Intelligence & DevOps Consulting"
      description="AIOps Vista — AI infrastructure intelligence hub. LLM security, AI observability, production RAG systems, and DevOps consulting for enterprise engineering teams.">

      {/* HERO */}
      <header className="hero-section">
        <div className="hero-bg-pattern" />
        <div className="container hero-content">
          <span className="hero-badge">AI Infrastructure Intelligence & DevOps Consulting</span>
          <Heading as="h1" className="hero-title">
            Build Intelligent,<br />Resilient Infrastructure
          </Heading>
          <p className="hero-description">
            We help engineering teams design, secure, and operate AI infrastructure
            at scale. From LLM pipeline security and AI observability to Kubernetes
            architecture and AIOps implementation — we deliver results.
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

        {/* SERVICES OVERVIEW */}
        <section className="section">
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
        <section className="section section-alt">
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

        {/* DOCUMENTATION HIGHLIGHT */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Open Knowledge</span>
              <h2>Technical Documentation</h2>
              <p>Free, in-depth guides on AI infrastructure, LLM operations, and cloud-native engineering.</p>
            </div>
            <div className="docs-highlight-grid">
              <Link to="/docs/category/ai-tools" className="doc-card">
                <h3>🛡️ AI Tools</h3>
                <p>LLM security, observability, orchestration, RAG platforms, and agent framework analysis.</p>
              </Link>
              <Link to="/docs/category/ai-architecture" className="doc-card">
                <h3>🏗️ AI Architecture</h3>
                <p>Secure LLM pipelines, AI observability stack, production RAG systems, and gateway patterns.</p>
              </Link>
              <Link to="/docs/category/aiops" className="doc-card">
                <h3>📊 AIOps</h3>
                <p>Monitoring, anomaly detection, incident management, and predictive operations.</p>
              </Link>
              <Link to="/docs/category/cloud-devops" className="doc-card">
                <h3>☁️ Cloud & DevOps</h3>
                <p>AWS, Azure, GCP services, CI/CD pipelines, and production deployments.</p>
              </Link>
              <Link to="/docs/category/ai-infrastructure" className="doc-card">
                <h3>🖥️ AI Infrastructure</h3>
                <p>GPU clusters, model serving, MLOps pipelines, and infrastructure as code.</p>
              </Link>
              <Link to="/docs/category/labs" className="doc-card">
                <h3>🧪 Hands-On Labs</h3>
                <p>Build real projects — chatbots, anomaly detection, RAG systems.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* AI TOOLS & COMPARISONS */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-label">AI Infrastructure Intelligence</span>
              <h2>AI Tool Intelligence</h2>
              <p>In-depth reviews, comparisons, and architecture guides for AI infrastructure tools.</p>
            </div>
            <div className="services-grid">
              <Link to="/ai-tools" className="doc-card">
                <h3>🗂️ AI Tool Directory</h3>
                <p>Curated directory of AI infrastructure tools — security, observability, orchestration, RAG, agents, and MLOps.</p>
              </Link>
              <Link to="/tools" className="doc-card">
                <h3>📝 Tool Reviews</h3>
                <p>Hands-on technical reviews with architecture analysis, pros/cons, and implementation guidance.</p>
              </Link>
              <Link to="/comparisons" className="doc-card">
                <h3>📊 Head-to-Head Comparisons</h3>
                <p>Side-by-side feature comparisons to help you pick the right tool for your stack.</p>
              </Link>
              <Link to="/docs/category/ai-architecture" className="doc-card">
                <h3>🏗️ Architecture Guides</h3>
                <p>Production architecture patterns for secure LLM pipelines, AI observability, and agent systems.</p>
              </Link>
              <Link to="/partner-with-aiopsvista" className="doc-card">
                <h3>🤝 Partner Program</h3>
                <p>AI infrastructure startups — grow your tool through technical reviews and consulting referrals.</p>
              </Link>
              <Link to="/services#ai-infrastructure" className="doc-card">
                <h3>🤖 AI Infrastructure Consulting</h3>
                <p>Expert consulting for LLM pipelines, AI security, observability, and agent deployment.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURED BLOG POSTS */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-label">From the Blog</span>
              <h2>Latest Articles</h2>
              <p>Practical guides and insights from our consulting practice.</p>
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
        <section className="section">
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
