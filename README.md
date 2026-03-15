# AIOps Vista

**Technical Intelligence Hub for AI Infrastructure, DevOps & Enterprise LLM Systems**

[aiopsvista.com](https://aiopsvista.com) · [AI Tool Directory](https://aiopsvista.com/ai-tools) · [Documentation](https://aiopsvista.com/docs/) · [Blog](https://aiopsvista.com/blog)

---

AIOps Vista is a technical growth platform serving three purposes:

1. **DevOps & AI Consulting** — Professional consulting for cloud architecture, Kubernetes, observability, AI infrastructure, and LLM security
2. **Technical Authority** — In-depth documentation, architecture guides, tool reviews, and head-to-head comparisons
3. **Growth Partnerships** — AI infrastructure startups grow through technical reviews, architecture guides, and consulting referrals

Powered by Docusaurus 3.9.2, React 19, TypeScript, GitHub Actions, and Claude API.

---

## Consulting Services

| Service | Description |
|---------|-------------|
| **AIOps Consulting** | AI-driven monitoring, anomaly detection, automated incident response |
| **DevOps Automation** | CI/CD pipelines, GitOps workflows, infrastructure automation |
| **Cloud Architecture** | Scalable, secure cloud design on AWS, Azure, and GCP |
| **Observability & Monitoring** | Prometheus, Grafana, distributed tracing, SLO tracking |
| **Cost Optimization** | Cloud cost audits, rightsizing, reserved capacity strategy |
| **Kubernetes Architecture** | Production clusters, service mesh, multi-tenancy, auto-scaling |
| **AI Infrastructure Consulting** | LLM pipelines, AI observability, RAG systems, model serving |
| **AI Security & Governance** | Prompt injection defense, PII protection, compliance, risk frameworks |

---

## AI Tool Intelligence

### Tool Directory (`/ai-tools`)
Curated directory of 12+ AI infrastructure tools across 6 categories:
- LLM Security (Lakera Guard, Rebuff, Guardrails AI)
- AI Observability (Langfuse, Arize Phoenix)
- AI Orchestration (LangChain)
- RAG Platforms (Haystack, LlamaIndex)
- AI Agent Frameworks (CrewAI, AutoGen)
- MLOps (MLflow, Kubeflow)

### Tool Reviews (`/tools`)
In-depth technical reviews with architecture analysis, pros/cons, use cases, and implementation guidance:
- Lakera Guard Review
- Langfuse Review
- LangChain Review

### Comparisons (`/comparisons`)
Head-to-head feature comparisons with scoring tables and recommendations:
- LangChain vs Haystack
- Lakera vs Guardrails AI
- CrewAI vs AutoGen
- Langfuse vs Arize Phoenix

### Partnership Program (`/partner-with-aiopsvista`)
AI infrastructure startups can partner for technical reviews, architecture guide integration, tool directory listings, and consulting referrals.

---

## Documentation Portal

In-depth technical guides across 7 categories:

- **AIOps** — Architecture patterns, AI-powered incident detection, anomaly detection
- **AI Architecture** — Secure LLM pipelines, AI observability stack, DevOps for AI agents, enterprise AI security
- **AI Infrastructure** — GPU cluster setup, model serving with Triton/vLLM, MLOps
- **Cloud & DevOps** — CI/CD pipeline patterns, Terraform best practices, Kubernetes operations, observability stack
- **Tool Setup** — VS Code for DevOps, Docker development workflows
- **AI Learning** — Prompt engineering, RAG systems, LLMs, AI agents
- **Hands-On Labs** — AIOps monitoring pipeline lab, RAG knowledge assistant lab

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | Docusaurus 3.9.2 + React 19 |
| Language | TypeScript |
| Styling | Custom CSS (Inter + JetBrains Mono) |
| Content | Markdown / MDX |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |
| AI Automation | Claude API (Anthropic) |
| DNS | Cloudflare |
| Domain | aiopsvista.com |

---

## AI Content Automation

Three GitHub Actions workflows generate content using the Claude API:

| Workflow | Schedule | Output |
|----------|----------|--------|
| Blog Generator | Weekly (Monday 9AM UTC) | Technical blog post → PR |
| Tech News | Weekly (Friday 9AM UTC) | Industry news roundup → PR |
| Docs Updater | Monthly (1st at 9AM UTC) | Documentation page → PR |

All AI-generated content goes through pull requests for human review before publishing.

---

## Project Structure

```
AiOpsVista/
├── .github/workflows/
│   ├── deploy.yml              # Build & deploy to GitHub Pages
│   ├── ai-blog-generator.yml   # Weekly AI blog generation
│   ├── ai-tech-news.yml        # Weekly tech news roundup
│   └── ai-docs-updater.yml     # Monthly docs update
├── ARCHITECTURE.md             # System architecture document
├── website/
│   ├── docusaurus.config.ts    # Site configuration
│   ├── src/
│   │   ├── pages/              # React pages (15+ pages)
│   │   │   ├── ai-tools.tsx    # AI Tool Directory
│   │   │   ├── tools/          # Individual tool reviews
│   │   │   ├── comparisons/    # Head-to-head comparisons
│   │   │   ├── partner-with-aiopsvista.tsx
│   │   │   └── ...             # Home, Services, About, Contact, etc.
│   │   └── css/custom.css      # Professional theme
│   ├── docs/                   # Documentation portal (7 categories, 25+ docs)
│   │   ├── ai-architecture/    # Secure LLM pipelines, AI observability, etc.
│   │   └── ...                 # AIOps, Cloud-DevOps, Labs, etc.
│   ├── blog/                   # Technical blog (5+ posts, RSS feeds)
│   └── static/                 # Assets, CNAME, images
└── README.md
```

---

## Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Landing page with services, AI tools section, blog, newsletter |
| Services | `/services` | 8 consulting services including AI infrastructure & security |
| AI Tools | `/ai-tools` | Curated directory of 12+ AI infrastructure tools |
| Tool Reviews | `/tools` | In-depth technical reviews (Lakera, Langfuse, LangChain) |
| Comparisons | `/comparisons` | Head-to-head tool comparisons with scoring |
| Case Studies | `/case-studies` | Real-world engagement results with metrics |
| Docs | `/docs/` | Technical documentation portal (7 categories) |
| Blog | `/blog` | Technical articles with tags and RSS |
| Partner | `/partner-with-aiopsvista` | Partnership program for AI startups |
| Tech News | `/tech-news` | Curated industry news by month |
| Resources | `/resources` | Free guides + premium offerings |
| Newsletter | `/newsletter` | Email subscription page |
| About | `/about` | Mission, values, expertise |
| Contact | `/contact` | Email, Calendly, LinkedIn, FAQ |

---

## Local Development

```bash
cd website
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

---

## Contributing

Contributions are welcome. To add a guide, fix an error, or suggest a topic:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

## License

This project is licensed under the MIT License.

---

> *Built with passion for the AI & DevOps community — sharing knowledge, one doc at a time.*
