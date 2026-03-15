import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const partnerBenefits = [
  {
    icon: '📝',
    title: 'In-Depth Technical Reviews',
    description: 'Your tool gets a comprehensive, hands-on review published on AIOpsVista — covering architecture, use cases, pros/cons, and implementation guidance.',
  },
  {
    icon: '📊',
    title: 'Head-to-Head Comparisons',
    description: 'Feature in comparison pages against competing tools, helping engineers evaluate your solution in context.',
  },
  {
    icon: '🏗️',
    title: 'Architecture Guide Integration',
    description: 'Your tool gets referenced in our architecture guides and implementation tutorials, showing engineers exactly how to use it.',
  },
  {
    icon: '🎯',
    title: 'AI Tools Directory Listing',
    description: 'Premium placement in our curated AI infrastructure tool directory, reaching engineers actively researching solutions.',
  },
  {
    icon: '📰',
    title: 'Blog & Newsletter Features',
    description: 'Dedicated blog posts and newsletter mentions reaching our subscriber base of DevOps and AI infrastructure engineers.',
  },
  {
    icon: '🤝',
    title: 'Consulting Referrals',
    description: 'When our consulting clients need your category of tool, we recommend partner solutions first — with implementation support.',
  },
];

const partnerTiers = [
  {
    name: 'Community',
    price: 'Free',
    features: [
      'Basic tool directory listing',
      'Category page inclusion',
      'Link to your documentation',
    ],
    cta: 'Submit Your Tool',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: 'Partnership',
    features: [
      'Everything in Community',
      'Full technical review article',
      'Comparison page inclusion',
      'Architecture guide references',
      'Quarterly performance reports',
    ],
    cta: 'Become a Partner',
    highlighted: true,
  },
  {
    name: 'Strategic',
    price: 'Custom',
    features: [
      'Everything in Growth',
      'Dedicated blog posts & tutorials',
      'Newsletter sponsorship',
      'Consulting referral pipeline',
      'Joint webinars & content',
      'Priority editorial calendar',
    ],
    cta: 'Talk to Us',
    highlighted: false,
  },
];

const idealPartners = [
  { category: 'LLM Security & Guardrails', examples: 'Prompt injection defense, output filtering, PII detection, AI firewalls' },
  { category: 'AI Observability', examples: 'LLM tracing, evaluation, cost tracking, quality monitoring, prompt analytics' },
  { category: 'AI Orchestration', examples: 'LLM frameworks, agent builders, workflow engines, chain orchestration' },
  { category: 'RAG Platforms', examples: 'Vector databases, retrieval pipelines, document processing, semantic search' },
  { category: 'MLOps & Model Serving', examples: 'Model deployment, experiment tracking, feature stores, inference optimization' },
  { category: 'AI Agent Frameworks', examples: 'Autonomous agents, multi-agent systems, tool-calling, agent orchestration' },
  { category: 'AI Gateways & Proxies', examples: 'LLM routing, rate limiting, model management, unified API layers' },
  { category: 'AI Compliance & Governance', examples: 'AI risk management, audit tools, policy enforcement, regulatory compliance' },
];

export default function PartnerWithAiopsvista(): ReactNode {
  return (
    <Layout
      title="Partner With AIOpsVista"
      description="AI infrastructure startup partnership program — grow your user base through technical reviews, architecture guides, and consulting referrals.">

      <header className="page-hero">
        <div className="container">
          <span className="hero-badge">Partnership Program</span>
          <h1>Grow Your AI Tool Through<br />Technical Authority</h1>
          <p className="page-hero-description">
            We help AI infrastructure startups reach enterprise engineering teams
            through in-depth technical content, honest reviews, and consulting referrals.
          </p>
          <Link className="btn-primary" to="/contact">
            Start a Conversation
          </Link>
        </div>
      </header>

      <main>
        {/* WHY PARTNER */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Why AIOpsVista</span>
              <h2>What Partners Get</h2>
              <p>Technical content that drives qualified engineering leads — not banner ads.</p>
            </div>
            <div className="services-grid">
              {partnerBenefits.map((benefit, idx) => (
                <div key={idx} className="service-card">
                  <div className="service-icon" style={{background: 'rgba(15, 98, 254, 0.08)'}}>
                    {benefit.icon}
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNER TIERS */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Partnership Tiers</span>
              <h2>Choose Your Level</h2>
            </div>
            <div className="partner-tiers">
              {partnerTiers.map((tier, idx) => (
                <div key={idx} className={`partner-tier-card${tier.highlighted ? ' partner-tier-highlighted' : ''}`}>
                  <h3>{tier.name}</h3>
                  <div className="partner-tier-price">{tier.price}</div>
                  <ul>
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx}>{feature}</li>
                    ))}
                  </ul>
                  <Link className={tier.highlighted ? 'btn-primary' : 'btn-outline'} to="/contact">
                    {tier.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IDEAL PARTNERS */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Who We Work With</span>
              <h2>Ideal Partner Categories</h2>
              <p>We partner with tools across the AI infrastructure stack.</p>
            </div>
            <div className="why-grid">
              {idealPartners.map((partner, idx) => (
                <div key={idx} className="why-card">
                  <h3>{partner.category}</h3>
                  <p>{partner.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Process</span>
              <h2>How Partnerships Work</h2>
            </div>
            <div className="process-grid">
              <div className="process-step">
                <span className="process-number">01</span>
                <h3>Connect</h3>
                <p>Reach out through our contact form. Tell us about your tool and target audience.</p>
              </div>
              <div className="process-step">
                <span className="process-number">02</span>
                <h3>Evaluate</h3>
                <p>Our team does a hands-on evaluation of your tool — architecture, UX, and value proposition.</p>
              </div>
              <div className="process-step">
                <span className="process-number">03</span>
                <h3>Publish</h3>
                <p>We create and publish technical content — reviews, comparisons, and architecture guides.</p>
              </div>
              <div className="process-step">
                <span className="process-number">04</span>
                <h3>Grow</h3>
                <p>Track performance with quarterly reports. Iterate on content based on audience engagement.</p>
              </div>
            </div>
          </div>
        </section>

        {/* OUR AUDIENCE */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Our Reach</span>
              <h2>The AIOpsVista Technical Audience</h2>
              <p>Engineering decision-makers actively evaluating AI infrastructure tools.</p>
            </div>
            <div className="why-grid">
              <div className="why-card">
                <h3>Platform & Infrastructure Engineers</h3>
                <p>Engineers building internal AI platforms, deploying LLM pipelines, and managing GPU clusters. They choose the tools their teams use.</p>
              </div>
              <div className="why-card">
                <h3>DevOps & SRE Teams</h3>
                <p>Teams responsible for deploying, monitoring, and scaling AI systems in production. They prioritize reliability, security, and observability.</p>
              </div>
              <div className="why-card">
                <h3>Engineering Managers & CTOs</h3>
                <p>Technical leaders evaluating AI infrastructure investments for their organizations. They need vendor-neutral technical analysis to make decisions.</p>
              </div>
              <div className="why-card">
                <h3>AI/ML Engineers</h3>
                <p>Engineers building RAG systems, AI agents, and LLM-powered applications. They need tools for orchestration, evaluation, and deployment.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PROMOTION MODEL */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Content Strategy</span>
              <h2>How We Promote Partner Tools</h2>
              <p>Technical content that drives qualified engineering leads — not banner ads.</p>
            </div>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon" style={{background: 'rgba(15, 98, 254, 0.08)'}}>📝</div>
                <h3>Technical Reviews</h3>
                <p>1500+ word in-depth reviews covering architecture, deployment, pros/cons, use cases, and implementation guidance. Published in our <Link to="/tools">Tool Reviews</Link> section.</p>
              </div>
              <div className="service-card">
                <div className="service-icon" style={{background: 'rgba(15, 98, 254, 0.08)'}}>🏗️</div>
                <h3>Architecture Guides</h3>
                <p>Your tool referenced in production architecture patterns. Engineers see how your tool fits into real infrastructure stacks. Published in <Link to="/docs/category/ai-architecture">Architecture Guides</Link>.</p>
              </div>
              <div className="service-card">
                <div className="service-icon" style={{background: 'rgba(15, 98, 254, 0.08)'}}>📊</div>
                <h3>Head-to-Head Comparisons</h3>
                <p>Feature-level comparisons against competing tools with deployment, enterprise, and security assessments. Published in <Link to="/comparisons">Comparisons</Link>.</p>
              </div>
              <div className="service-card">
                <div className="service-icon" style={{background: 'rgba(15, 98, 254, 0.08)'}}>🗂️</div>
                <h3>Directory Listing</h3>
                <p>Premium placement in our <Link to="/ai-tools">AI Tool Directory</Link> with category tagging, use case descriptions, and links to documentation.</p>
              </div>
              <div className="service-card">
                <div className="service-icon" style={{background: 'rgba(15, 98, 254, 0.08)'}}>📰</div>
                <h3>Blog & Newsletter</h3>
                <p>Dedicated blog posts and newsletter features reaching our subscriber base of DevOps and AI infrastructure engineers.</p>
              </div>
              <div className="service-card">
                <div className="service-icon" style={{background: 'rgba(15, 98, 254, 0.08)'}}>🤝</div>
                <h3>Consulting Referrals</h3>
                <p>When our <Link to="/services">consulting clients</Link> need your category of tool, we recommend partner solutions first — with implementation support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT FOR PARTNERSHIPS */}
        <section className="section">
          <div className="container" style={{maxWidth: '800px', margin: '0 auto'}}>
            <div className="section-header">
              <span className="section-label">Get Started</span>
              <h2>Start a Partnership</h2>
              <p>Three ways to reach us:</p>
            </div>
            <div className="why-grid" style={{gridTemplateColumns: '1fr 1fr 1fr'}}>
              <Link to="/contact" className="doc-card" style={{textAlign: 'center', padding: '2rem'}}>
                <h3>📧 Contact Form</h3>
                <p>Fill out our contact form and mention you're interested in the partnership program.</p>
              </Link>
              <a href="mailto:partnerships@aiopsvista.com" className="doc-card" style={{textAlign: 'center', padding: '2rem', textDecoration: 'none'}}>
                <h3>📬 Email</h3>
                <p>partnerships@aiopsvista.com</p>
              </a>
              <a href="https://github.com/kdaiops06/AiOpsVista" className="doc-card" style={{textAlign: 'center', padding: '2rem', textDecoration: 'none'}} target="_blank" rel="noopener noreferrer">
                <h3>🐙 GitHub</h3>
                <p>Open an issue on our repository to propose a partnership.</p>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="container">
            <h2>Ready to Reach More Engineers?</h2>
            <p>Let's discuss how AIOpsVista can help your AI infrastructure tool grow.</p>
            <div className="hero-actions">
              <Link className="btn-primary" to="/contact">
                Start a Partnership Conversation
              </Link>
              <Link className="btn-secondary" to="/ai-tools">
                Browse Our Tool Directory
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
