# AIOps Vista — System Architecture

## Overview

AIOps Vista is a modern, AI-first platform for DevOps & AIOps consulting, built on a Git-based, automated content pipeline. The platform serves as a consulting lead generation engine, technical knowledge base, and content publishing platform.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        aiopsvista.com                               │
│                                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │ Homepage  │  │ Services │  │  About   │  │    Contact       │   │
│  │ (Lead Gen)│  │ (Consult)│  │          │  │ (Calendly/Form)  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘   │
│                                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │   Blog   │  │   Docs   │  │Tech News │  │   Resources      │   │
│  │ (MDX/MD) │  │ (Portal) │  │ (AI Gen) │  │ (Templates/DL)   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴──────────┐
                    │   Docusaurus 3.9   │
                    │   React 19 + TS    │
                    │   Custom CSS       │
                    └─────────┬──────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
     ┌────────┴───────┐ ┌────┴────┐  ┌───────┴──────┐
     │ GitHub Actions  │ │ GitHub  │  │ GitHub Pages │
     │ CI/CD + AI Gen  │ │  Repo   │  │  Hosting     │
     └────────┬───────┘ └─────────┘  └──────────────┘
              │
    ┌─────────┴──────────┐
    │  AI Content Agents  │
    │  (Claude / GPT)     │
    │                     │
    │  • Blog generation  │
    │  • Doc updates      │
    │  • Tech news        │
    └─────────────────────┘
```

---

## 1. Technology Stack

| Layer              | Technology                        | Purpose                                           |
|--------------------|-----------------------------------|---------------------------------------------------|
| **Framework**      | Docusaurus 3.9.2                  | Static site generator with docs + blog built-in   |
| **UI**             | React 19 + TypeScript             | Component-based pages                             |
| **Styling**        | Custom CSS + CSS Modules          | Professional consulting theme                     |
| **Content**        | Markdown / MDX                    | Git-based content management                      |
| **Hosting**        | GitHub Pages                      | Free, fast, reliable static hosting               |
| **CI/CD**          | GitHub Actions                    | Automated build, deploy, and AI content pipelines |
| **AI Automation**  | Claude API / OpenAI API           | Blog generation, doc updates, tech news           |
| **Domain**         | aiopsvista.com                    | Custom domain via CNAME                           |
| **Analytics**      | Google Analytics (planned)        | Traffic and conversion tracking                   |
| **Lead Capture**   | Calendly + Email + Newsletter     | Consulting funnel                                 |

### Why Docusaurus over Next.js

Docusaurus was chosen because it provides:
- **Built-in docs system** with sidebar navigation, versioning, and search
- **Built-in blog** with RSS feeds, tags, authors, and reading time
- **MDX support** for interactive content
- **Zero-config SEO** with sitemaps, meta tags, and social cards
- **GitHub Pages deployment** with no additional hosting cost
- **Plugin ecosystem** for search, analytics, and more

Next.js would require building docs, blog, search, and sidebar systems from scratch. Docusaurus delivers all of these out of the box with a focus on developer documentation — exactly our use case.

---

## 2. Site Structure

```
aiopsvista.com/
├── /                    → Homepage (lead generation, services overview)
├── /services            → Detailed consulting services + case studies
├── /blog                → Technical blog (DevOps, AIOps, Cloud, AI)
├── /blog/tags/devops    → Blog filtered by category
├── /docs/               → Documentation portal (6 categories)
├── /tech-news           → AI-curated tech news and industry updates
├── /resources           → Templates, guides, courses (monetization)
├── /about               → Mission, values, expertise
├── /contact             → Calendly booking, email, FAQ
└── /newsletter          → Newsletter signup landing page
```

### Traffic & Lead Generation Strategy

| Page         | Traffic Source   | Purpose                    | Conversion Goal              |
|--------------|------------------|----------------------------|-------------------------------|
| Blog         | SEO / Social     | Organic traffic engine     | Newsletter signup             |
| Docs         | SEO / Referrals  | Authority building         | Consulting inquiry            |
| Tech News    | SEO / Social     | Recurring traffic          | Newsletter signup             |
| Services     | Direct / Ads     | Service showcase           | Book consultation             |
| Resources    | SEO / Email      | Lead magnet                | Email capture + monetization  |
| Homepage     | Direct / SEO     | First impression           | Navigate to services/docs     |

---

## 3. Content Pipeline

### Git-Based Publishing Flow

```
Author/AI writes Markdown
        │
        ▼
  Git commit + push
        │
        ▼
  GitHub Actions triggers
        │
        ├── Build site (npm run build)
        ├── Run link checker
        ├── Generate sitemap
        │
        ▼
  Deploy to GitHub Pages
        │
        ▼
  Live at aiopsvista.com
```

### AI Content Automation Flow

```
Scheduled GitHub Action (weekly)
        │
        ▼
  AI Agent (Claude API)
        │
        ├── Generate blog post draft
        ├── Generate tech news roundup
        ├── Update documentation
        │
        ▼
  Create Pull Request
        │
        ▼
  Human review + merge
        │
        ▼
  Auto-deploy via CI/CD
```

---

## 4. Blog System

### Categories (via tags)

| Tag                    | Description                                    |
|------------------------|------------------------------------------------|
| `devops`               | CI/CD, GitOps, automation, pipelines          |
| `aiops`                | AI for IT operations, anomaly detection        |
| `cloud`                | AWS, Azure, GCP, multi-cloud                  |
| `platform-engineering` | Internal developer platforms, self-service     |
| `ai-operations`        | ML models in production, AI infra             |
| `kubernetes`           | Container orchestration, service mesh         |
| `observability`        | Monitoring, tracing, logging                  |

### File Structure

```
website/blog/
├── authors.yml                    # Author profiles
├── tags.yml                       # Tag definitions with descriptions
├── 2026-03-13-aiops-guide/
│   ├── index.md                   # Blog post content
│   └── img/                       # Post images
├── 2026-03-10-kubernetes-prod/
│   └── index.md
└── ...
```

### Blog Post Template

```markdown
---
title: "Post Title"
slug: post-url-slug
authors: [kdinesh]
tags: [devops, aiops]
description: "SEO description under 160 characters."
image: ./img/cover.png
---

Introduction paragraph (shown in blog listing).

<!-- truncate -->

Full post content here...
```

---

## 5. Documentation Portal

### Category Structure

```
website/docs/
├── intro.md                           # Welcome page (slug: /)
├── aiops/
│   ├── _category_.json
│   ├── getting-started.md
│   ├── anomaly-detection.md
│   ├── incident-automation.md
│   └── aiops-architecture.md
├── cloud-devops/
│   ├── _category_.json
│   ├── getting-started.md
│   ├── terraform-best-practices.md
│   ├── cicd-automation.md
│   └── aws-architecture.md
├── ai-infra/
│   ├── _category_.json
│   ├── getting-started.md
│   ├── gpu-clusters.md
│   └── model-serving.md
├── tool-setup/
│   ├── _category_.json
│   ├── getting-started.md
│   ├── docker-setup.md
│   └── kubernetes-setup.md
├── ai-learning/
│   └── ...
└── labs/
    └── ...
```

### Documentation Template

```markdown
---
title: "Document Title"
sidebar_position: 2
description: "What this document covers."
tags: [aiops, monitoring]
---

# Document Title

## Overview

Brief description of the topic.

## Prerequisites

- Requirement 1
- Requirement 2

## Step-by-Step Guide

### Step 1: Setup

Instructions...

### Step 2: Configure

Instructions...

## Best Practices

- Practice 1
- Practice 2

## Troubleshooting

| Issue | Solution |
|-------|----------|
| ...   | ...      |

## Next Steps

- [Related Doc 1](./related-doc-1.md)
- [Related Doc 2](./related-doc-2.md)
```

---

## 6. AI Content Automation

### GitHub Actions Workflows

| Workflow                          | Trigger          | Action                                        |
|-----------------------------------|------------------|-----------------------------------------------|
| `deploy.yml`                      | Push to main     | Build and deploy site                         |
| `ai-blog-generator.yml`          | Weekly (Mon)     | Generate blog post draft via AI → PR          |
| `ai-architecture-insights.yml`   | Weekly (Wed)     | Generate architecture insights article → PR   |
| `ai-tech-news.yml`               | Weekly (Fri)     | Generate tech news roundup via AI → PR        |
| `ai-docs-updater.yml`            | Monthly (1st)    | Review and update documentation via AI → PR   |
| `ai-tool-discovery.yml`          | Monthly (15th)   | Generate emerging tool docs via AI → PR       |
| `ai-comparison-expansion.yml`    | Monthly (1st)    | Generate new comparison page via AI → PR      |

### AI Prompt Templates

**Blog Generation Prompt:**
```
Write a technical blog post about {topic} for a DevOps/AIOps consulting audience.
Requirements:
- 1500-2000 words
- Include code examples where relevant
- Use Markdown format with proper headings
- Include a meta description under 160 characters
- Target keywords: {keywords}
- Tone: professional, practical, authoritative
- Include a call-to-action for consulting services at the end
```

**Tech News Prompt:**
```
Summarize the top 5 DevOps/AIOps/Cloud news items from the past week.
Format as a Markdown blog post with:
- Brief intro paragraph
- Each news item as a section with: headline, summary, and why it matters
- Conclude with industry trend observations
```

---

## 7. Lead Generation Architecture

```
                    ┌─────────────────┐
                    │   Website Visit  │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
     ┌──────┴──────┐ ┌──────┴──────┐ ┌───────┴──────┐
     │  Newsletter  │ │  Calendly   │ │   Contact    │
     │   Signup     │ │   Booking   │ │   Email      │
     └──────┬──────┘ └──────┬──────┘ └───────┬──────┘
            │                │                │
            ▼                ▼                ▼
     ┌──────────────────────────────────────────┐
     │             Email List                    │
     │    (ConvertKit / Resend / Buttondown)     │
     └──────────────┬───────────────────────────┘
                    │
          ┌─────────┼─────────┐
          │         │         │
    Nurture Seq  Newsletter  Proposals
```

### Tools

| Tool            | Purpose                          | Integration                |
|-----------------|----------------------------------|----------------------------|
| **Calendly**    | Consultation scheduling          | Embed link on Contact page |
| **Buttondown**  | Newsletter (developer-friendly)  | Embed form on site         |
| **Resend**      | Transactional emails             | API for form submissions   |
| **Google Forms**| Simple lead capture              | Embedded iframe            |

---

## 8. Monetization Roadmap

### Phase 1 — Foundation (Current)
- Free consulting blog content → build authority
- Free documentation → build organic traffic
- Newsletter → build email list
- Consulting services → primary revenue

### Phase 2 — Templates & Resources
- DevOps templates (Terraform modules, Helm charts, CI/CD pipelines)
- Architecture decision records (ADR) templates
- Runbook templates
- Offered as free or gated downloads for lead capture

### Phase 3 — Premium Content
- Online courses (Kubernetes, AIOps, Terraform)
- Premium documentation with deep-dive guides
- Workshop recordings
- Pricing: one-time or subscription

### Phase 4 — Scale
- Sponsored tool reviews and integrations
- Affiliate links for cloud/DevOps tools
- Community membership
- Enterprise consulting packages

### Integration in Site

```
/resources
├── Free Templates          → Email capture
├── DevOps Starter Kit      → Email capture
├── Premium Courses         → Payment (Gumroad/Stripe)
└── Consulting Packages     → Calendly booking
```

---

## 9. SEO Strategy

### Technical SEO (Built-in)
- Docusaurus auto-generates sitemap.xml
- Canonical URLs configured
- RSS/Atom feeds for blog
- Meta descriptions on all pages
- Open Graph and Twitter card meta tags
- Fast static site (< 1s load time)

### Content SEO
- Target long-tail keywords in blog posts
- Documentation covers high-search-volume DevOps topics
- Tech news captures trending keyword traffic
- Internal linking between docs, blog, and services

### Recommended Additions
- [ ] Google Analytics 4 integration
- [ ] Google Search Console verification
- [ ] Structured data (JSON-LD) for articles and services
- [ ] Algolia DocSearch for site-wide search

---

## 10. Implementation Checklist

- [x] Docusaurus project initialized
- [x] GitHub repository set up
- [x] GitHub Actions CI/CD pipeline
- [x] Custom domain (aiopsvista.com)
- [x] Homepage with consulting focus
- [x] Services page with 6 offerings
- [x] About page
- [x] Contact page with Calendly + email
- [x] Documentation portal (6 categories)
- [x] Professional CSS theme
- [x] Dark mode support
- [x] Responsive design
- [ ] Replace sample blog posts with real content
- [ ] Blog author profile and tags setup
- [ ] Tech News page
- [ ] Resources page (templates, courses)
- [ ] Newsletter signup integration
- [ ] AI content generation workflows
- [ ] Google Analytics integration
- [ ] Algolia search integration
- [ ] Custom logo and favicon
- [ ] Social media preview images
