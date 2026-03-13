import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const caseStudies = [
  {
    id: 'aiops-saas',
    tag: 'AIOps',
    tagColor: '#1a73e8',
    title: '60% MTTR Reduction for B2B SaaS Platform',
    client: 'Series B SaaS Company — 200+ Engineers',
    challenge: 'The engineering team was drowning in alert fatigue. Their monitoring stack generated 500+ alerts daily, with an 85% false-positive rate. Mean time to resolution averaged 45 minutes, with incidents often escalating to senior engineers unnecessarily.',
    solution: [
      'Deployed AI-driven anomaly detection using Isolation Forest models trained on 6 months of historical metric data',
      'Implemented intelligent event correlation to group related alerts into single incidents',
      'Built automated runbook execution for 12 common failure scenarios',
      'Designed custom Grafana dashboards with SLO burn-rate tracking',
      'Established on-call rotation with escalation automation',
    ],
    results: [
      { metric: '60%', label: 'MTTR Reduction', detail: '45 min → 18 min' },
      { metric: '70%', label: 'Fewer Alerts', detail: '500/day → 150/day' },
      { metric: '99.95%', label: 'Uptime Achieved', detail: 'From 99.5%' },
      { metric: '85%', label: 'Auto-Resolved', detail: 'Incidents handled automatically' },
    ],
    technologies: ['Prometheus', 'Grafana', 'Python', 'Scikit-learn', 'PagerDuty', 'Kubernetes'],
    duration: '8 weeks',
  },
  {
    id: 'cloud-fintech',
    tag: 'Cloud',
    tagColor: '#34a853',
    title: '45% Cloud Cost Savings for FinTech Startup',
    client: 'Series A FinTech — AWS Infrastructure',
    challenge: 'Monthly AWS bill had grown to $40K/month with no visibility into cost drivers. The team was over-provisioning resources out of caution, running oversized instances 24/7, and had no cost governance in place.',
    solution: [
      'Conducted comprehensive cloud cost audit across 3 AWS accounts',
      'Identified $18K/month in wasted resources (idle instances, unattached EBS volumes, oversized RDS)',
      'Implemented rightsizing recommendations with automated enforcement',
      'Deployed Spot instances for non-critical workloads with graceful fallback',
      'Set up Reserved Instances and Savings Plans for baseline compute',
      'Built real-time cost dashboards and budget alerts',
    ],
    results: [
      { metric: '45%', label: 'Cost Reduction', detail: '$40K → $22K/month' },
      { metric: '$216K', label: 'Annual Savings', detail: 'First-year impact' },
      { metric: 'Zero', label: 'Performance Impact', detail: 'Same or better performance' },
      { metric: '< 2 weeks', label: 'Time to Value', detail: 'Quick wins in first sprint' },
    ],
    technologies: ['AWS', 'Terraform', 'CloudWatch', 'Spot Instances', 'Cost Explorer', 'Karpenter'],
    duration: '4 weeks',
  },
  {
    id: 'k8s-platform',
    tag: 'Kubernetes',
    tagColor: '#326ce5',
    title: 'Kubernetes Platform for 50+ Microservices',
    client: 'Growth-Stage Startup — Platform Team of 4',
    challenge: 'The company had outgrown their Heroku-based deployment. With 50+ microservices, deployments took 30+ minutes, there was no standardization across teams, and scaling was manual. The small platform team needed a self-service solution.',
    solution: [
      'Designed multi-tenancy Kubernetes architecture with namespace isolation per team',
      'Implemented GitOps with ArgoCD for declarative, auditable deployments',
      'Built standardized Helm chart templates for all service types',
      'Deployed Istio service mesh for traffic management and security',
      'Built developer self-service portal for environment provisioning',
      'Implemented progressive delivery with canary deployments and automated rollbacks',
    ],
    results: [
      { metric: '3x', label: 'Deploy Speed', detail: '30 min → 10 min' },
      { metric: '50+', label: 'Microservices', detail: 'Running on platform' },
      { metric: '99.99%', label: 'Availability', detail: 'Zero unplanned downtime' },
      { metric: '80%', label: 'Less Ops Work', detail: 'For platform team' },
    ],
    technologies: ['Kubernetes', 'ArgoCD', 'Istio', 'Helm', 'Terraform', 'Karpenter'],
    duration: '12 weeks',
  },
  {
    id: 'observability-ecommerce',
    tag: 'Observability',
    tagColor: '#e8710a',
    title: 'Full-Stack Observability for E-Commerce Platform',
    client: 'Mid-Size E-Commerce — 2M+ Monthly Users',
    challenge: 'During peak traffic events (Black Friday, flash sales), the team had zero visibility into system behavior. Debugging production issues required SSH-ing into servers and grepping logs. Average root cause identification took 2+ hours.',
    solution: [
      'Implemented OpenTelemetry across 30+ services for unified telemetry',
      'Deployed Prometheus + Thanos for long-term metrics storage with global querying',
      'Set up Grafana Loki for log aggregation replacing ELK stack (40% cost reduction)',
      'Implemented distributed tracing with Tempo for cross-service request tracking',
      'Built SLO dashboards with error budget tracking for each service',
      'Created on-call runbooks for top 20 failure scenarios',
    ],
    results: [
      { metric: '90%', label: 'Faster RCA', detail: '2 hours → 12 min' },
      { metric: '100%', label: 'Service Coverage', detail: 'All services instrumented' },
      { metric: '40%', label: 'Infra Cost Saved', detail: 'Loki vs ELK migration' },
      { metric: '15 min', label: 'Incident Response', detail: 'From 2+ hours' },
    ],
    technologies: ['OpenTelemetry', 'Prometheus', 'Thanos', 'Grafana', 'Loki', 'Tempo'],
    duration: '10 weeks',
  },
  {
    id: 'devops-transformation',
    tag: 'DevOps',
    tagColor: '#9c27b0',
    title: 'DevOps Transformation for Healthcare SaaS',
    client: 'Healthcare SaaS — HIPAA Compliance Required',
    challenge: 'The team deployed manually via FTP to production servers. No CI/CD, no automated testing, deployments happened once a month on weekends. Rollbacks were manual database restores. HIPAA compliance audit was approaching with no infrastructure documentation.',
    solution: [
      'Designed and implemented CI/CD pipelines with GitHub Actions (code → staging → production)',
      'Built automated testing pipeline: unit tests, integration tests, security scanning',
      'Implemented Infrastructure as Code with Terraform for all environments',
      'Deployed to AWS ECS Fargate with blue-green deployment strategy',
      'Created comprehensive HIPAA compliance documentation and audit trails',
      'Built automated security scanning with Trivy, tfsec, and OWASP ZAP',
    ],
    results: [
      { metric: '10x', label: 'Deploy Frequency', detail: 'Monthly → multiple/day' },
      { metric: '0', label: 'Failed Deployments', detail: 'In 6 months post-launch' },
      { metric: '100%', label: 'HIPAA Compliant', detail: 'Passed audit first try' },
      { metric: '5 min', label: 'Rollback Time', detail: 'From 4+ hours' },
    ],
    technologies: ['GitHub Actions', 'Terraform', 'AWS ECS', 'Trivy', 'Docker', 'PostgreSQL'],
    duration: '10 weeks',
  },
];

export default function CaseStudies(): ReactNode {
  return (
    <Layout
      title="Case Studies"
      description="Real-world DevOps & AIOps consulting engagements — measurable results in infrastructure, cloud, Kubernetes, and observability.">

      <header className="page-hero">
        <div className="container">
          <span className="hero-badge">Case Studies</span>
          <h1>Real Results for<br />Real Engineering Teams</h1>
          <p className="page-hero-description">
            Every engagement is measured by outcomes. Here are some of the
            results we have delivered for engineering teams like yours.
          </p>
          <Link className="btn-primary" to="/contact">
            Get Similar Results
          </Link>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="container">
            {caseStudies.map((study) => (
              <div key={study.id} id={study.id} className="case-study-detail">
                <div className="case-study-header">
                  <span
                    className="case-study-tag"
                    style={{backgroundColor: study.tagColor}}>
                    {study.tag}
                  </span>
                  <h2>{study.title}</h2>
                  <div className="case-study-meta">
                    <span className="case-study-client">{study.client}</span>
                    <span className="case-study-duration">Duration: {study.duration}</span>
                  </div>
                </div>

                <div className="case-study-body">
                  <div className="case-study-section">
                    <h3>The Challenge</h3>
                    <p>{study.challenge}</p>
                  </div>

                  <div className="case-study-section">
                    <h3>Our Solution</h3>
                    <ul>
                      {study.solution.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="case-study-results">
                    <h3>Results</h3>
                    <div className="case-study-metrics">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="case-metric-card">
                          <span className="case-metric-number">{result.metric}</span>
                          <span className="case-metric-label">{result.label}</span>
                          <span className="case-metric-detail">{result.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="case-study-tech">
                    <h4>Technologies Used</h4>
                    <div className="tech-tags">
                      {study.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <h2>Ready to See Similar Results?</h2>
            <p>
              Book a free 30-minute consultation to discuss your infrastructure
              challenges and how we can deliver measurable outcomes.
            </p>
            <div className="hero-actions">
              <Link className="btn-primary" to="/contact">
                Book a Consultation
              </Link>
              <Link className="btn-secondary-dark" to="/services">
                View All Services
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
