import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const services = [
  {
    id: 'aiops',
    icon: '📊',
    title: 'AIOps Consulting',
    subtitle: 'AI-Driven IT Operations',
    description: 'Transform your operations with artificial intelligence. We implement end-to-end AIOps solutions that reduce alert noise, detect anomalies before they become incidents, and automate remediation.',
    deliverables: [
      'AIOps maturity assessment and roadmap',
      'AI-powered monitoring and anomaly detection setup',
      'Automated incident response and runbook automation',
      'Event correlation and noise reduction (70%+ reduction)',
      'Predictive capacity planning and auto-scaling',
      'Custom ML models for your operational data',
    ],
    result: 'Average 60% reduction in MTTR and 70% fewer false alerts.',
  },
  {
    id: 'devops',
    icon: '⚙️',
    title: 'DevOps Automation',
    subtitle: 'CI/CD & Infrastructure Automation',
    description: 'Accelerate your software delivery with modern DevOps practices. We design and implement CI/CD pipelines, GitOps workflows, and infrastructure automation that your team can own.',
    deliverables: [
      'CI/CD pipeline design and implementation',
      'GitOps workflow with ArgoCD or Flux',
      'Infrastructure as Code (Terraform, Pulumi)',
      'Automated testing and quality gates',
      'Release management and deployment strategies',
      'Developer experience and platform engineering',
    ],
    result: 'Teams ship 3x faster with 80% fewer deployment failures.',
  },
  {
    id: 'cloud',
    icon: '☁️',
    title: 'Cloud Architecture',
    subtitle: 'Scalable & Secure Cloud Design',
    description: 'Design cloud infrastructure that scales with your business. We architect solutions on AWS, Azure, and GCP with security, compliance, and cost-efficiency built in.',
    deliverables: [
      'Cloud architecture design and review',
      'Multi-cloud and hybrid cloud strategy',
      'Security architecture and compliance (SOC2, HIPAA)',
      'Network design and micro-segmentation',
      'Disaster recovery and business continuity',
      'Cloud migration planning and execution',
    ],
    result: 'Production-ready architecture with 99.99% availability.',
  },
  {
    id: 'observability',
    icon: '🔍',
    title: 'Observability & Monitoring',
    subtitle: 'Full-Stack Visibility',
    description: 'Gain complete visibility into your systems with a modern observability stack. We implement metrics, logs, traces, and custom dashboards that give you actionable insights.',
    deliverables: [
      'Observability strategy and tool selection',
      'Prometheus, Grafana, and alerting setup',
      'Distributed tracing with Jaeger or Tempo',
      'Log aggregation with ELK or Loki',
      'Custom dashboards and SLO/SLI tracking',
      'On-call and incident management processes',
    ],
    result: 'Complete visibility with 90% faster root cause identification.',
  },
  {
    id: 'cost',
    icon: '💰',
    title: 'Infrastructure Cost Optimization',
    subtitle: 'Reduce Cloud Spend',
    description: 'Stop overspending on cloud infrastructure. We analyze your current usage, identify waste, and implement strategies to reduce costs without sacrificing performance.',
    deliverables: [
      'Cloud cost audit and waste identification',
      'Rightsizing compute, storage, and network',
      'Reserved instance and savings plan strategy',
      'Spot/preemptible instance automation',
      'FinOps practices and cost governance',
      'Automated cost monitoring and alerting',
    ],
    result: 'Average 35-50% reduction in monthly cloud spend.',
  },
  {
    id: 'kubernetes',
    icon: '⎈',
    title: 'Kubernetes Architecture',
    subtitle: 'Production-Grade Container Orchestration',
    description: 'Build and operate Kubernetes clusters that are secure, scalable, and production-ready. From greenfield deployments to platform engineering at scale.',
    deliverables: [
      'Kubernetes cluster design and deployment',
      'Multi-tenancy and namespace strategy',
      'Security hardening and RBAC policies',
      'Service mesh implementation (Istio, Linkerd)',
      'Auto-scaling (HPA, VPA, Cluster Autoscaler)',
      'Platform engineering and developer self-service',
    ],
    result: 'Production Kubernetes with 99.9% uptime and developer self-service.',
  },
  {
    id: 'ai-infrastructure',
    icon: '🤖',
    title: 'AI Infrastructure Consulting',
    subtitle: 'Production LLM & AI Agent Systems',
    description: 'Design and deploy production-grade AI infrastructure — from secure LLM pipelines to autonomous agent systems. We help teams select, integrate, and operate AI tools at enterprise scale.',
    deliverables: [
      'LLM pipeline architecture and security (prompt injection defense, PII filtering)',
      'AI observability stack (Langfuse, Phoenix, custom eval pipelines)',
      'RAG system design and optimization (retrieval quality, chunking strategy)',
      'AI agent deployment with safety controls and CI/CD',
      'Model serving infrastructure (GPU clusters, auto-scaling, cost optimization)',
      'AI governance framework and compliance (EU AI Act, SOC 2, HIPAA)',
    ],
    result: 'Secure, observable, production-ready AI infrastructure with 40%+ cost savings.',
  },
  {
    id: 'ai-security',
    icon: '🛡️',
    title: 'AI Security & Governance',
    subtitle: 'Enterprise LLM Risk Management',
    description: 'Protect your AI systems from adversarial attacks, data leakage, and compliance risks. We implement defense-in-depth architectures for enterprise LLM deployments.',
    deliverables: [
      'Threat modeling for LLM applications',
      'Prompt injection defense and output guardrails',
      'PII detection and data loss prevention',
      'AI use case risk classification framework',
      'Compliance controls mapping (GDPR, HIPAA, EU AI Act)',
      'Red team exercises and security testing for AI systems',
    ],
    result: 'Enterprise-grade AI security with zero data leakage incidents.',
  },
];

export default function Services(): ReactNode {
  return (
    <Layout
      title="Consulting Services"
      description="DevOps & AIOps consulting services — cloud architecture, Kubernetes, observability, and cost optimization.">

      <header className="page-hero">
        <div className="container">
          <span className="hero-badge">Consulting Services</span>
          <h1>Expert DevOps & AIOps<br />Consulting</h1>
          <p className="page-hero-description">
            We partner with engineering teams to design, build, and operate
            modern cloud infrastructure. Every engagement is tailored to your
            stack, team, and business goals.
          </p>
          <Link className="btn-primary" to="/contact">
            Book a Free Consultation
          </Link>
        </div>
      </header>

      <main>
        {/* HOW WE WORK */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Our Process</span>
              <h2>How We Work</h2>
            </div>
            <div className="process-grid">
              <div className="process-step">
                <span className="process-number">01</span>
                <h3>Discovery</h3>
                <p>We assess your current infrastructure, understand your goals, and identify bottlenecks.</p>
              </div>
              <div className="process-step">
                <span className="process-number">02</span>
                <h3>Architecture</h3>
                <p>We design a solution with technical specifications, diagrams, and an implementation roadmap.</p>
              </div>
              <div className="process-step">
                <span className="process-number">03</span>
                <h3>Implementation</h3>
                <p>We build and deploy the solution alongside your team, with full documentation.</p>
              </div>
              <div className="process-step">
                <span className="process-number">04</span>
                <h3>Enablement</h3>
                <p>We train your team, hand over runbooks, and ensure you can operate independently.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES DETAIL */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Our Expertise</span>
              <h2>Services</h2>
            </div>
            {services.map((service) => (
              <div key={service.id} id={service.id} className="service-detail">
                <div className="service-detail-header">
                  <span className="service-detail-icon">{service.icon}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <span className="service-subtitle">{service.subtitle}</span>
                  </div>
                </div>
                <p className="service-detail-desc">{service.description}</p>
                <div className="service-deliverables">
                  <h4>What You Get</h4>
                  <ul>
                    {service.deliverables.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="service-result">
                  <strong>Expected Outcome:</strong> {service.result}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CASE STUDIES */}
        <section className="section" id="case-studies">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Results</span>
              <h2>Case Studies</h2>
            </div>
            <div className="case-grid">
              <div className="case-card">
                <span className="case-tag">AIOps</span>
                <h3>60% MTTR Reduction for SaaS Platform</h3>
                <p>Implemented AI-driven anomaly detection and automated incident response for a B2B SaaS company, reducing mean time to resolution from 45 minutes to 18 minutes.</p>
                <div className="case-metrics">
                  <div><strong>60%</strong><span>MTTR Reduction</span></div>
                  <div><strong>70%</strong><span>Fewer Alerts</span></div>
                  <div><strong>99.95%</strong><span>Uptime</span></div>
                </div>
              </div>
              <div className="case-card">
                <span className="case-tag">Cloud</span>
                <h3>45% Cloud Cost Savings for FinTech</h3>
                <p>Performed a comprehensive cloud audit and implemented rightsizing, reserved instances, and spot automation — saving $180K annually.</p>
                <div className="case-metrics">
                  <div><strong>45%</strong><span>Cost Saved</span></div>
                  <div><strong>$180K</strong><span>Annual Savings</span></div>
                  <div><strong>Zero</strong><span>Performance Impact</span></div>
                </div>
              </div>
              <div className="case-card">
                <span className="case-tag">Kubernetes</span>
                <h3>Kubernetes Platform for 50+ Microservices</h3>
                <p>Designed and deployed a production Kubernetes platform with GitOps, service mesh, and developer self-service for a growing startup.</p>
                <div className="case-metrics">
                  <div><strong>3x</strong><span>Deploy Speed</span></div>
                  <div><strong>50+</strong><span>Microservices</span></div>
                  <div><strong>99.99%</strong><span>Availability</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="container">
            <h2>Ready to Transform Your Infrastructure?</h2>
            <p>Get a free 30-minute consultation to discuss your challenges and how we can help.</p>
            <div className="hero-actions">
              <Link className="btn-primary" to="/contact">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
