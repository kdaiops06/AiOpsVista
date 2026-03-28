import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import FeatureCard from '../components/FeatureCard';
import FeatureGrid from '../components/FeatureGrid';
import SectionWrapper from '../components/SectionWrapper';
import CTABox from '../components/CTABox';
import '../components/global-premium.css';
import { PiggyBank, AlertTriangle, Shuffle, Flame, Eye, BarChart3, Search, Zap, Map, CheckCircle2, TrendingDown, Timer, Cpu, Repeat, ShieldCheck } from 'lucide-react';
import IconBox from '../components/IconBox';

export default function Home(): ReactNode {
  return (
    <Layout
      title="AI cost reduction + production reliability for LLM and RAG systems"
      description="Cut your AI infrastructure cost by 30–60%. We help teams running LLM, RAG, and GPU workloads reduce cost, improve reliability, and gain visibility into production AI systems.">

      {/* HERO — Sharper AIOpsVista positioning */}
      <header className="hero-section">
        <div className="hero-bg-pattern" />
        <div className="container hero-content">
          <span className="hero-badge">AI cost reduction + production reliability for LLM and RAG systems</span>
          <Heading as="h1" className="hero-title">
            Cut Your LLM & RAG Costs by 30–60% in Production
          </Heading>
          <div className="hero-trustline" style={{fontWeight: 500, color: '#6366f1', marginTop: 12, fontSize: '1.1rem', textAlign: 'center'}}>
            Trusted by teams running production AI workloads
            <div style={{marginTop: 6, color: '#64748b', fontWeight: 500, fontSize: '1rem'}}>
              • 42% LLM cost reduction • 3x faster RAG • 99.9% uptime in production
            </div>
          </div>
          <p className="hero-description">
            Reduce LLM, RAG, and GPU costs while improving production reliability, latency, and visibility.
          </p>
          <div className="hero-actions">
            <Link className="btn-primary" to="/contact">
              Find Where Your AI Spend Is Wasted
            </Link>
            <Link className="btn-secondary" to="/ai-tools">
              Get Your AI Cost Audit
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

      {/* PAIN SECTION — Premium FeatureGrid, dark background */}
      <SectionWrapper dark>
        <h2 className="margin-bottom--md section-title">Most Teams Waste 30–50% of AI Spend</h2>
        <FeatureGrid columns={3}>
          <FeatureCard icon={<PiggyBank size={28} color="#6366f1" />} title="Wasting 40% on Oversized LLMs" description="Paying for large models when smaller, cheaper ones would suffice." dark />
          <FeatureCard icon={<AlertTriangle size={28} color="#6366f1" />} title="Slow, Costly RAG Pipelines" description="Inefficient retrieval and generation increases compute and latency." dark />
          <FeatureCard icon={<Shuffle size={28} color="#6366f1" />} title="No Model Routing = Higher Bills" description="Missing routing logic leads to unnecessary spend and latency." dark />
          <FeatureCard icon={<Flame size={28} color="#6366f1" />} title="Idle GPUs Burn Budget" description="Overprovisioned or idle GPU resources waste thousands monthly." dark />
          <FeatureCard icon={<Eye size={28} color="#6366f1" />} title="No Cost Visibility, No Control" description="Lack of insight into token usage and cost drivers." dark />
        </FeatureGrid>
        <p className="margin-top--md" style={{fontWeight: 500, textAlign: 'center', color: '#fff'}}>
          If you can’t see where your AI spend is going, you can’t control it.
        </p>
      </SectionWrapper>

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

      {/* VALUE PROPS — Premium SaaS card grid */}
      <SectionWrapper>
        <span className="section-label" style={{display: 'block', textAlign: 'center'}}>Why AIOpsVista</span>
        <h2 style={{textAlign: 'center'}}>AI Cost & Reliability Wins</h2>
        <FeatureGrid columns={4}>
          <FeatureCard icon="💸" title="Cut LLM & Inference Cost" description="Slash token and compute spend with model routing, caching, and usage analytics." />
          <FeatureCard icon="⚡" title="Optimize RAG Pipelines" description="Streamline retrieval and generation for lower latency and higher throughput." />
          <FeatureCard icon="🔍" title="Production Reliability" description="Boost uptime and reduce incidents with AI-native observability and automation." />
          <FeatureCard icon="📊" title="Cost & Performance Visibility" description="Gain deep insight into cost drivers, usage, and performance across your stack." />
        </FeatureGrid>
      </SectionWrapper>

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
              <span className="card-link"><Link to="/comparisons/pinecone-vs-weaviate">Pinecone vs Weaviate</Link></span>
            </Link>
            <Link to="/docs/ai-tools/pinecone" className="featured-tool-card">
              <div className="featured-tool-badge">Vector Database</div>
              <h3>Pinecone</h3>
              <p>Fully managed vector database for high-performance similarity search. Serverless architecture with automatic scaling and zero infrastructure management.</p>
              <span className="card-link">View deep-dive →</span>
              <span className="card-link"><Link to="/comparisons/pinecone-vs-weaviate">Pinecone vs Weaviate</Link></span>
            </Link>
            <Link to="/docs/ai-tools/weaviate" className="featured-tool-card">
              <div className="featured-tool-badge">Vector Database</div>
              <h3>Weaviate</h3>
              <p>Open-source vector database with built-in vectorization modules. Self-hosted or cloud-managed with native multi-tenancy support.</p>
              <span className="card-link">View deep-dive →</span>
              <span className="card-link"><Link to="/comparisons/pinecone-vs-weaviate">Pinecone vs Weaviate</Link></span>
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
              <span className="card-link"><Link to="/docs/guides/rag">RAG Guides</Link></span>
            </Link>
            <Link to="/docs/ai-architecture/ai-gateway-architecture" className="arch-card">
              <span className="arch-card-number">02</span>
              <h3>AI Gateway Architecture</h3>
              <p>Centralized gateway patterns for LLM routing, rate limiting, cost governance, and multi-provider failover.</p>
              <span className="card-link"><Link to="/docs/ai-architecture">All Architecture Pages</Link></span>
            </Link>
            <Link to="/docs/ai-architecture/enterprise-ai-security" className="arch-card">
              <span className="arch-card-number">03</span>
              <h3>Enterprise AI Security</h3>
              <p>Comprehensive security frameworks for enterprise AI — access control, data protection, compliance, and audit trails.</p>
              <span className="card-link"><Link to="/docs/ai-architecture">All Architecture Pages</Link></span>
            </Link>
            <Link to="/docs/ai-architecture/ai-observability-stack" className="arch-card">
              <span className="arch-card-number">04</span>
              <h3>AI Observability Stack</h3>
              <p>Full-stack monitoring and observability for AI systems — traces, metrics, logs, and model performance dashboards.</p>
              <span className="card-link"><Link to="/docs/ai-architecture">All Architecture Pages</Link></span>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW — Step 10: Preserve consulting credibility */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Do</span>
            <h2>AI Cost Optimization & Production Reliability Services</h2>
            <p>End-to-end solutions to cut AI infrastructure cost and maximize production reliability for LLM, RAG, and GPU workloads.</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon" style={{background: 'linear-gradient(135deg, #e8f0fe, #d2e3fc)'}}>📊</div>
              <h3>AIOps Consulting</h3>
              <p>Implement AI-driven monitoring, anomaly detection, and automated incident response to reduce MTTR by 60%.</p>
              <Link to="/services#aiops" className="card-link">Reduce AI Cost</Link>
            </div>
            <div className="service-card">
              <div className="service-icon" style={{background: 'linear-gradient(135deg, #e6f4ea, #ceead6)'}}>⚙️</div>
              <h3>DevOps Automation</h3>
              <p>CI/CD pipelines, GitOps workflows, and infrastructure automation that ship code faster with fewer errors.</p>
              <Link to="/services#devops" className="card-link">Reduce AI Cost</Link>
            </div>
            <div className="service-card">
              <div className="service-icon" style={{background: 'linear-gradient(135deg, #fce8e6, #fad2cf)'}}>☁️</div>
              <h3>Cloud Architecture</h3>
              <p>Design scalable, secure, cost-optimized cloud infrastructure on AWS, Azure, or GCP.</p>
              <Link to="/services#cloud" className="card-link">Reduce AI Cost</Link>
            </div>
            <div className="service-card">
              <div className="service-icon" style={{background: 'linear-gradient(135deg, #fef7e0, #feefc3)'}}>🔍</div>
              <h3>Observability & Monitoring</h3>
              <p>Full-stack observability with Prometheus, Grafana, Datadog, and custom dashboards.</p>
              <Link to="/services#observability" className="card-link">Reduce AI Cost</Link>
            </div>
            <div className="service-card">
              <div className="service-icon" style={{background: 'linear-gradient(135deg, #f3e8fd, #e8d5f5)'}}>💰</div>
              <h3>Cost Optimization</h3>
              <p>Reduce cloud spend by 30-50% through rightsizing, reserved capacity, and architecture optimization.</p>
              <Link to="/services#cost" className="card-link">Reduce AI Cost</Link>
            </div>
            <div className="service-card">
              <div className="service-icon" style={{background: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)'}}>⎈</div>
              <h3>Kubernetes Architecture</h3>
              <p>Production-grade Kubernetes clusters with security, scaling, and multi-tenancy best practices.</p>
              <Link to="/services#kubernetes" className="card-link">Reduce AI Cost</Link>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIT VALUE SECTION — Premium FeatureGrid, dark background */}
      <SectionWrapper dark>
        <span className="section-label">Audit Deliverables</span>
        <h2 className="margin-bottom--md section-title">What You Get in an AI Cost Audit</h2>
        <FeatureGrid columns={3}>
          <FeatureCard icon={<BarChart3 size={28} color="#6366f1" />} title="Pinpoint Every Cost Driver" description="See exactly where your LLM, RAG, and GPU spend is going." dark />
          <FeatureCard icon={<Search size={28} color="#6366f1" />} title="Uncover Hidden Cost Leaks" description="Find inefficiencies and waste others miss." dark />
          <FeatureCard icon={<Zap size={28} color="#6366f1" />} title="RAG Pipeline Savings" description="Get specific, actionable recommendations to cut RAG cost." dark />
          <FeatureCard icon={<Cpu size={28} color="#6366f1" />} title="Maximize GPU Efficiency" description="Reduce spend with targeted infra and cloud optimizations." dark />
          <FeatureCard icon={<Map size={28} color="#6366f1" />} title="Step-by-Step Savings Plan" description="A clear, prioritized roadmap to reduce cost and boost performance." dark />
        </FeatureGrid>
      </SectionWrapper>

      {/* TRUST / PROOF SECTION — Premium FeatureGrid */}
      <SectionWrapper>
        <h2 className="margin-bottom--md section-title">Real Results from AI Optimization</h2>
        <FeatureGrid columns={2}>
          <FeatureCard icon={<TrendingDown size={28} color="#6366f1" />} title="40% Lower LLM Spend" description="in production via model routing and optimization." />
          <FeatureCard icon={<Timer size={28} color="#6366f1" />} title="3x Faster RAG Latency" description="with improved retrieval and pipeline tuning." />
          <FeatureCard icon={<Flame size={28} color="#6366f1" />} title="50% Less GPU Waste" description="by rightsizing and autoscaling in production." />
          <FeatureCard icon={<Repeat size={28} color="#6366f1" />} title="99.9% Uptime Achieved" description="for mission-critical AI workloads." />
        </FeatureGrid>
      </SectionWrapper>

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

      {/* LEAD GENERATION — Premium CTA */}
      <SectionWrapper dark>
        <div style={{textAlign: 'center', maxWidth: 700, margin: '0 auto'}}>
          <span className="section-label">AI Infrastructure Audit</span>
          <h2 className="margin-bottom--md">Get a Custom AI Cost & Reliability Audit</h2>
          <p style={{fontSize: '1.15rem', marginBottom: 32}}>
            Uncover hidden cost leaks and reliability risks in your LLM, RAG, and GPU workloads. Our audit delivers a clear, actionable roadmap to reduce spend and boost uptime.
          </p>
          <Link className="btn-primary" to="/contact">
            Request My Audit →
          </Link>
        </div>
      </SectionWrapper>

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
      <CTABox
        headline="Unlock 30–60% AI Cost Savings—Get Your Custom Audit"
        buttonText="Request My AI Cost Audit"
        buttonHref="/contact"
      >
        Discover hidden cost leaks, optimize your LLM, RAG, and GPU stack, and see measurable savings in weeks—not months.
      </CTABox>

      {/* HOW IT WORKS SECTION */}
      <SectionWrapper>
        <span className="section-label">How It Works</span>
        <h2 className="margin-bottom--md section-title">Get Your AI Cost Audit in 4 Steps</h2>
        <FeatureGrid columns={4}>
          <FeatureCard icon={<Cpu size={28} color="#6366f1" />} title="1. Share Your AI Architecture" description="Tell us about your LLM, RAG, and GPU stack." />
          <FeatureCard icon={<Search size={28} color="#6366f1" />} title="2. We Analyze Cost + Performance" description="We review your infra, usage, and cost drivers." />
          <FeatureCard icon={<BarChart3 size={28} color="#6366f1" />} title="3. Get Optimization Report" description="Receive a detailed audit with savings roadmap." />
          <FeatureCard icon={<CheckCircle2 size={28} color="#6366f1" />} title="4. Reduce Cost & Improve Reliability" description="Implement quick wins and long-term optimizations." />
        </FeatureGrid>
      </SectionWrapper>
    </Layout>
  );
}
