# AIOps Vista

**Professional DevOps & AIOps Consulting Platform**

[aiopsvista.com](https://aiopsvista.com) · [Documentation](https://aiopsvista.com/docs/) · [Blog](https://aiopsvista.com/blog) · [Case Studies](https://aiopsvista.com/case-studies)

---

AIOps Vista is a modern consulting platform for engineering teams building intelligent, resilient infrastructure. The site combines consulting services, technical documentation, AI-generated content, and open knowledge — all powered by Docusaurus, GitHub Actions, and Claude API.

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

---

## Documentation Portal

In-depth technical guides across 6 categories:

- **AIOps** — Architecture patterns, AI-powered incident detection, anomaly detection
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
│   │   ├── pages/              # React pages (Home, Services, Case Studies, etc.)
│   │   └── css/custom.css      # Professional theme
│   ├── docs/                   # Documentation portal (6 categories, 20+ docs)
│   ├── blog/                   # Technical blog (5+ posts, RSS feeds)
│   └── static/                 # Assets, CNAME, images
└── README.md
```

---

## Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Consulting landing page with hero, services, stats, CTA |
| Services | `/services` | 6 detailed services with deliverables and outcomes |
| Case Studies | `/case-studies` | 5 real-world engagement results with metrics |
| Docs | `/docs/` | Technical documentation portal |
| Blog | `/blog` | Technical articles with tags and RSS |
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
