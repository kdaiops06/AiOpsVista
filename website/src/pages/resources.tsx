import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const freeResources = [
  {
    icon: '📋',
    title: 'Kubernetes Production Checklist',
    description: 'A 15-point checklist covering security, observability, networking, and operational readiness for production Kubernetes.',
    link: '/blog/kubernetes-production-checklist',
    type: 'Blog Guide',
  },
  {
    icon: '📊',
    title: 'AIOps Maturity Assessment',
    description: 'Evaluate your organization\'s AIOps maturity across data collection, anomaly detection, automation, and predictive operations.',
    link: '/blog/building-aiops-strategy',
    type: 'Blog Guide',
  },
  {
    icon: '🔍',
    title: 'Observability Stack Architecture',
    description: 'Complete reference architecture for building a modern observability stack with Prometheus, Grafana, Loki, and Tempo.',
    link: '/blog/complete-observability-stack-2026',
    type: 'Blog Guide',
  },
  {
    icon: '📦',
    title: 'Terraform Module Patterns',
    description: 'Battle-tested patterns for structuring Terraform modules at scale — monorepo, composition, state management.',
    link: '/blog/terraform-module-patterns',
    type: 'Blog Guide',
  },
  {
    icon: '📖',
    title: 'AIOps Documentation',
    description: 'Comprehensive documentation on AIOps architecture, anomaly detection, incident automation, and best practices.',
    link: '/docs/category/aiops',
    type: 'Documentation',
  },
  {
    icon: '🧪',
    title: 'Hands-On Labs',
    description: 'End-to-end projects and labs for building AIOps pipelines, chatbots, anomaly detection systems, and more.',
    link: '/docs/labs',
    type: 'Documentation',
  },
];

const premiumResources = [
  {
    icon: '🎓',
    title: 'AIOps Fundamentals Course',
    description: 'A complete course on building and operating AIOps platforms — from data collection to automated remediation.',
    status: 'Coming Soon',
  },
  {
    icon: '📐',
    title: 'DevOps Templates Bundle',
    description: 'Production-ready Terraform modules, Helm charts, CI/CD pipelines, and Kubernetes manifests used in our consulting engagements.',
    status: 'Coming Soon',
  },
  {
    icon: '📘',
    title: 'Kubernetes Operations Playbook',
    description: 'Comprehensive runbooks, troubleshooting guides, and operational procedures for production Kubernetes clusters.',
    status: 'Coming Soon',
  },
];

export default function Resources(): ReactNode {
  return (
    <Layout
      title="Resources"
      description="Free and premium DevOps and AIOps resources — guides, templates, courses, and documentation.">

      <header className="page-hero">
        <div className="container">
          <span className="hero-badge">Resources</span>
          <h1>Guides, Templates<br />& Courses</h1>
          <p className="page-hero-description">
            Free guides and documentation to help you build better infrastructure.
            Premium resources coming soon for deeper learning.
          </p>
        </div>
      </header>

      <main>
        {/* FREE RESOURCES */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Free</span>
              <h2>Open Resources</h2>
              <p>Guides, documentation, and reference architectures — all free and open source.</p>
            </div>
            <div className="resources-grid">
              {freeResources.map((resource, idx) => (
                <Link key={idx} to={resource.link} className="resource-card">
                  <div className="resource-icon">{resource.icon}</div>
                  <span className="resource-type">{resource.type}</span>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <span className="card-link">View resource →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PREMIUM RESOURCES */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Premium</span>
              <h2>Coming Soon</h2>
              <p>Deep-dive courses and production-ready templates from our consulting practice.</p>
            </div>
            <div className="resources-grid resources-grid-3">
              {premiumResources.map((resource, idx) => (
                <div key={idx} className="resource-card resource-card-premium">
                  <div className="resource-icon">{resource.icon}</div>
                  <span className="resource-status">{resource.status}</span>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER CTA */}
        <section className="cta-section">
          <div className="container">
            <h2>Get Notified When Resources Launch</h2>
            <p>Subscribe to be the first to know when premium courses and templates are available.</p>
            <Link className="btn-primary" to="/newsletter">
              Subscribe to Newsletter
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
