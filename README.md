# AIOps Vista

**AI Infrastructure Intelligence Hub | DevOps & AIOps Consulting | LLM Security & Observability**

[![Live](https://img.shields.io/badge/Live-aiopsvista.com-0f62fe?style=flat-square)](https://aiopsvista.com) [![Pages](https://img.shields.io/badge/Pages-80+-6929c4?style=flat-square)](#pages) [![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?style=flat-square)](https://github.com/kdaiops06/AiOpsVista/actions) [![Docusaurus](https://img.shields.io/badge/Docusaurus-3.9.2-3ecc5f?style=flat-square)](https://docusaurus.io)

[Live Site](https://aiopsvista.com) · [AI Tool Directory](https://aiopsvista.com/ai-tools) · [Comparisons](https://aiopsvista.com/comparisons) · [Docs](https://aiopsvista.com/docs/) · [Blog](https://aiopsvista.com/blog) · [Partner Program](https://aiopsvista.com/partner-with-aiopsvista)

---

AIOps Vista is a technical growth platform built on three strategic pillars:

1. **AI Infrastructure Intelligence** — In-depth tool reviews, architecture guides, comparisons, and technical documentation for LLM security, AI observability, RAG systems, and agent frameworks
2. **Technical Consulting** — Professional consulting for AI infrastructure, DevOps, cloud architecture, Kubernetes, observability, and LLM security
3. **Startup Partnerships** — AI infrastructure startups grow through technical reviews, architecture guide integration, and consulting referrals

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
Curated directory of 13+ AI infrastructure tools across 7 categories:
- LLM Security (Lakera Guard, Rebuff, Guardrails AI, SlashLLM)
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
Head-to-head feature comparisons with deployment complexity, enterprise readiness, security assessments, and recommendations:
- LangChain vs Haystack
- Lakera vs Guardrails AI
- CrewAI vs AutoGen
- Langfuse vs Arize Phoenix
- Pinecone vs Weaviate
- SlashLLM vs Lakera Guard

### AI Tools Docs (`/docs/ai-tools`)
Detailed documentation for each tool category:
- LLM Security Tools — Lakera Guard, Guardrails AI, Rebuff, SlashLLM
- AI Observability Tools — Langfuse, Arize Phoenix
- LLM Orchestration Tools — LangChain
- RAG Platforms — Haystack, LlamaIndex
- AI Agent Frameworks — CrewAI, AutoGen

### Partnership Program (`/partner-with-aiopsvista`)
AI infrastructure startups can partner for technical reviews, architecture guide integration, tool directory listings, and consulting referrals.

---

## Documentation Portal

In-depth technical guides across 8 categories:

- **AI Tools** — LLM security, AI observability, orchestration, RAG platforms, and agent framework analysis
- **AIOps** — Architecture patterns, AI-powered incident detection, anomaly detection
- **AI Architecture** — Secure LLM pipelines, AI observability stack, production RAG systems, AI gateway architecture, DevOps for AI agents, enterprise AI security & governance
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

| Workflow | Schedule | Output | Categories |
|----------|----------|--------|------------|
| Blog Generator | Weekly (Monday 9AM UTC) | Technical blog post → PR | AI Infrastructure, LLM Security, DevOps, AIOps |
| Tech News | Weekly (Friday 9AM UTC) | Industry news roundup → PR | AI & DevOps |
| Docs Updater | Monthly (1st at 9AM UTC) | Documentation page → PR | aiops, cloud-devops, ai-infra, ai-tools, ai-architecture, tool-setup, ai-learning, labs |

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
│   ├── sidebars.ts             # Auto-generated sidebar config
│   ├── src/
│   │   ├── pages/              # React pages (15+ pages)
│   │   │   ├── index.tsx       # Homepage
│   │   │   ├── ai-tools.tsx    # AI Tool Directory
│   │   │   ├── services.tsx    # Consulting services
│   │   │   ├── tools/          # Individual tool reviews
│   │   │   ├── comparisons/    # Head-to-head comparisons
│   │   │   ├── partner-with-aiopsvista.tsx
│   │   │   └── ...             # About, Contact, Resources, etc.
│   │   └── css/custom.css      # Professional theme
│   ├── docs/                   # Documentation portal (8 categories, 35+ docs)
│   │   ├── ai-tools/           # AI tool analysis by category
│   │   ├── ai-architecture/    # LLM pipelines, observability, RAG, gateway
│   │   ├── aiops/              # AI for IT operations
│   │   ├── ai-infra/           # GPU clusters, model serving
│   │   ├── ai-learning/        # ML, LLMs, prompt engineering
│   │   ├── cloud-devops/       # CI/CD, Terraform, Kubernetes
│   │   ├── labs/               # Hands-on projects
│   │   └── tool-setup/         # Dev environment guides
│   ├── blog/                   # Technical blog (5+ posts, RSS feeds)
│   └── static/                 # Assets, CNAME, images
└── README.md
```

---

## Pages

**70+ pages live** — all returning HTTP 200. TTFB ~115ms via Fastly CDN.

| Page | URL | Status |
|------|-----|--------|
| Home | [`/`](https://aiopsvista.com) | ✅ Live |
| Services | [`/services`](https://aiopsvista.com/services) | ✅ Live |
| AI Tools Directory | [`/ai-tools`](https://aiopsvista.com/ai-tools) | ✅ Live |
| Tool Reviews Index | [`/tools`](https://aiopsvista.com/tools) | ✅ Live |
| Lakera Guard Review | [`/tools/lakera-guard-review`](https://aiopsvista.com/tools/lakera-guard-review) | ✅ Live |
| Langfuse Review | [`/tools/langfuse-review`](https://aiopsvista.com/tools/langfuse-review) | ✅ Live |
| LangChain Review | [`/tools/langchain-review`](https://aiopsvista.com/tools/langchain-review) | ✅ Live |
| Comparisons Index | [`/comparisons`](https://aiopsvista.com/comparisons) | ✅ Live |
| LangChain vs Haystack | [`/comparisons/langchain-vs-haystack`](https://aiopsvista.com/comparisons/langchain-vs-haystack) | ✅ Live |
| Lakera vs Guardrails | [`/comparisons/lakera-vs-guardrails`](https://aiopsvista.com/comparisons/lakera-vs-guardrails) | ✅ Live |
| CrewAI vs AutoGen | [`/comparisons/crewai-vs-autogen`](https://aiopsvista.com/comparisons/crewai-vs-autogen) | ✅ Live |
| Langfuse vs Arize | [`/comparisons/langfuse-vs-arize`](https://aiopsvista.com/comparisons/langfuse-vs-arize) | ✅ Live |
| Pinecone vs Weaviate | [`/comparisons/pinecone-vs-weaviate`](https://aiopsvista.com/comparisons/pinecone-vs-weaviate) | ✅ New |
| SlashLLM vs Lakera | [`/comparisons/slashllm-vs-lakera`](https://aiopsvista.com/comparisons/slashllm-vs-lakera) | ✅ New |
| Partnership Program | [`/partner-with-aiopsvista`](https://aiopsvista.com/partner-with-aiopsvista) | ✅ Live |
| AI Architecture Guides | [`/docs/ai-architecture/`](https://aiopsvista.com/docs/category/ai-architecture) | ✅ Live |
| Secure LLM Pipelines | [`/docs/ai-architecture/secure-llm-pipelines`](https://aiopsvista.com/docs/ai-architecture/secure-llm-pipelines) | ✅ Live |
| AI Observability Stack | [`/docs/ai-architecture/ai-observability-stack`](https://aiopsvista.com/docs/ai-architecture/ai-observability-stack) | ✅ Live |
| DevOps for AI Agents | [`/docs/ai-architecture/devops-for-ai-agents`](https://aiopsvista.com/docs/ai-architecture/devops-for-ai-agents) | ✅ Live |
| Enterprise AI Security | [`/docs/ai-architecture/enterprise-ai-security`](https://aiopsvista.com/docs/ai-architecture/enterprise-ai-security) | ✅ Live |
| Case Studies | [`/case-studies`](https://aiopsvista.com/case-studies) | ✅ Live |
| Docs Portal | [`/docs/`](https://aiopsvista.com/docs/) | ✅ Live |
| Blog | [`/blog`](https://aiopsvista.com/blog) | ✅ Live |
| Tech News | [`/tech-news`](https://aiopsvista.com/tech-news) | ✅ Live |
| Resources | [`/resources`](https://aiopsvista.com/resources) | ✅ Live |
| Newsletter | [`/newsletter`](https://aiopsvista.com/newsletter) | ✅ Live |
| About | [`/about`](https://aiopsvista.com/about) | ✅ Live |
| Contact | [`/contact`](https://aiopsvista.com/contact) | ✅ Live |

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

### How to Add a New Tool Review

Tool reviews live in `website/src/pages/tools/`. To add a new review:

1. Create a new file: `website/src/pages/tools/<tool-name>-review.tsx`
2. Follow the existing review format (see `lakera-guard-review.tsx` for reference)
3. Include: tool overview, architecture diagram, use cases, pros/cons, verdict
4. Add the tool to the directory in `website/src/pages/ai-tools.tsx` (tools array)
5. Add the tool slug to the `REVIEWED_TOOLS` set in `ai-tools.tsx`
6. Optionally add a documentation page in `website/docs/ai-tools/` under the relevant category file

### How to Add a Comparison Page

Comparisons are defined in `website/src/pages/comparisons/index.tsx`:

1. Add a new comparison object to the `comparisons` array in `index.tsx`
2. Include: `slug`, `toolA`, `toolB`, `category`, `summary`, `rows` (comparison dimensions), `structured` (deployment, enterprise, security assessments), `toolAVerdict`, `toolBVerdict`, `recommendation`
3. Create a new route file: `website/src/pages/comparisons/<tool-a>-vs-<tool-b>.tsx`
4. Export the named component from `index.tsx` (see existing examples)
5. Add the comparison to link sections in relevant tool review pages and docs

### How to Add an Architecture Guide

Architecture guides live in `website/docs/ai-architecture/`:

1. Create a new Markdown file: `website/docs/ai-architecture/<guide-name>.md`
2. Add frontmatter: `sidebar_position`, `title`, `description`, `keywords`
3. Include: architecture diagrams (ASCII), deployment patterns, example stack configurations, implementation checklist
4. Add a `## Related` section with links to relevant tools, comparisons, and consulting services
5. Update `website/docs/ai-architecture/getting-started.md` to include the new guide in the navigation table
6. The sidebar updates automatically via the `autogenerated` configuration

### How to Add Documentation Pages

All documentation in `website/docs/` uses Docusaurus auto-generated sidebar:

1. Create a Markdown file in the appropriate category folder (e.g., `docs/aiops/`, `docs/ai-tools/`)
2. Add frontmatter with `sidebar_position`, `title`, `description`, and `keywords`
3. To create a new category, add a folder with a `_category_.json` file (see existing categories for format)
4. The sidebar ordering is controlled by `position` in `_category_.json` and `sidebar_position` in frontmatter

---

## License

This project is licensed under the MIT License.

---

> *Built with passion for the AI & DevOps community — sharing knowledge, one doc at a time.*
