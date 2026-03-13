import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.heroButtons}>
          <Link className={styles.heroButtonPrimary} to="/docs/">
            Explore Docs
          </Link>
          <Link className={styles.heroButtonSecondary} to="/blog">
            Read Blog
          </Link>
        </div>
      </div>
    </header>
  );
}

const stats = [
  { value: '6+', label: 'Topics' },
  { value: '30+', label: 'Guides' },
  { value: '5+', label: 'Labs' },
  { value: '10+', label: 'Tools' },
];

const features = [
  {
    icon: '📊',
    title: 'AIOps & Observability',
    description: 'Master AI-driven IT operations — monitoring, anomaly detection, incident management, and predictive scaling.',
    tag: 'Operations',
    tagColor: '#e8f5e9',
    tagTextColor: '#2e7d32',
    iconBg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
  },
  {
    icon: '🏗️',
    title: 'AI Infrastructure',
    description: 'Build production-grade AI platforms with GPU clusters, Kubernetes, model serving, and MLOps pipelines.',
    tag: 'Infrastructure',
    tagColor: '#e3f2fd',
    tagTextColor: '#1565c0',
    iconBg: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
  },
  {
    icon: '🧠',
    title: 'AI & ML Learning',
    description: 'From ML fundamentals to LLMs, prompt engineering, RAG, fine-tuning, and building AI agents.',
    tag: 'Learning',
    tagColor: '#fce4ec',
    tagTextColor: '#c62828',
    iconBg: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
  },
  {
    icon: '🛠️',
    title: 'Tool Setup Guides',
    description: 'Step-by-step guides for VS Code, Claude, GitHub Copilot, Cursor, Docker, Jupyter, and more.',
    tag: 'Tools',
    tagColor: '#fff3e0',
    tagTextColor: '#e65100',
    iconBg: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    description: 'Deploy AI on AWS, Azure, and GCP. CI/CD for ML models, monitoring, and production best practices.',
    tag: 'Cloud',
    tagColor: '#ede7f6',
    tagTextColor: '#4527a0',
    iconBg: 'linear-gradient(135deg, #ede7f6, #d1c4e9)',
  },
  {
    icon: '🧪',
    title: 'Hands-On Labs',
    description: 'Build real projects — AIOps pipelines, AI chatbots, log anomaly detection, and RAG assistants.',
    tag: 'Projects',
    tagColor: '#e0f7fa',
    tagTextColor: '#00695c',
    iconBg: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)',
  },
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Knowledge Hub"
      description="AIOps, AI Infrastructure, AI Learning, and Tool Setup — your knowledge-sharing platform.">
      <HomepageHeader />

      {/* Stats Bar */}
      <section className="statsBar">
        <div className="container">
          <div className="statsGrid">
            {stats.map((stat, idx) => (
              <div key={idx} className="statItem">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="featuresSection">
        <div className="sectionTitle">
          <h2>What You Will Learn</h2>
          <p>Comprehensive guides and hands-on labs to master AI operations and infrastructure</p>
        </div>
        <div className="featuresGrid">
          {features.map((feature, idx) => (
            <div key={idx} className="featureCard">
              <div className="featureIcon" style={{ background: feature.iconBg }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span
                className="featureTag"
                style={{
                  background: feature.tagColor,
                  color: feature.tagTextColor,
                }}>
                {feature.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="ctaSection">
        <h2>Ready to Get Started?</h2>
        <p>Dive into our documentation and start building with AI today.</p>
        <Link className={styles.heroButtonPrimary} to="/docs/">
          Start Learning
        </Link>
      </section>
    </Layout>
  );
}
