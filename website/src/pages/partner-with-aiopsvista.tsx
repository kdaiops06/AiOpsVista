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
  { category: 'LLM Security & Guardrails', examples: 'Prompt injection defense, output filtering, PII detection' },
  { category: 'AI Observability', examples: 'LLM tracing, evaluation, cost tracking, quality monitoring' },
  { category: 'AI Orchestration', examples: 'LLM frameworks, agent builders, workflow engines' },
  { category: 'RAG Platforms', examples: 'Vector databases, retrieval pipelines, document processing' },
  { category: 'MLOps & Model Serving', examples: 'Model deployment, experiment tracking, feature stores' },
  { category: 'AI Agent Frameworks', examples: 'Autonomous agents, multi-agent systems, tool-calling' },
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
