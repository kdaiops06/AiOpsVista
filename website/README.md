# AIOps Vista Documentation & Website

AIOps Vista is a premium documentation and knowledge hub for AI infrastructure, DevOps, AIOps, LLM security, and production AI systems. Built with [Docusaurus 3](https://docusaurus.io/), it features:

- Modular, conversion-optimized homepage and landing pages
- Premium UI with custom React/MDX components
- SEO-friendly guides, tool comparisons, and architecture patterns
- Responsive, dark mode-friendly tables and code blocks
- Internal linking, sidebar navigation, and category landing pages

---

## 📁 Site Structure

```
website/
├── docs/
│   ├── ai-architecture/      # AI architecture guides & patterns
│   ├── ai-infra/             # AI infrastructure, MLOps, GPU, Kubernetes
│   ├── ai-tools/             # Tool reviews, directories, security, observability
│   ├── aiops/                # AIOps, monitoring, incident management
│   ├── cloud-devops/         # Cloud, CI/CD, production deployment
│   ├── comparisons/          # Tool comparison landing pages
│   ├── decision-guides/      # How-to and decision guides
│   ├── finops-ai/            # Cost optimization, FinOps
│   ├── guides/               # How-to guides
│   ├── labs/                 # Hands-on labs and projects
│   ├── tool-setup/           # Tool setup guides
│   ├── resources.md          # Resources landing page
│   └── intro.md              # Docs homepage
├── src/
│   ├── components/           # Custom React components (UI, cards, grids)
│   ├── css/custom.css        # Custom global styles (dark mode, tables, etc.)
│   └── pages/                # Custom pages (homepage, resources, services, etc.)
├── docusaurus.config.ts      # Docusaurus site config
├── sidebars.ts               # Sidebar structure
├── package.json              # Dependencies & scripts
└── README.md                 # This file
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
# or
yarn
```

### 2. Local development
```bash
npm start
# or
yarn start
```
Visit [http://localhost:3000](http://localhost:3000) to view the site.

### 3. Build for production
```bash
npm run build && npm run serve
# or
yarn build && yarn serve
```

### 4. Deploy (Vercel, GitHub Pages, etc.)
- **Vercel:**
  ```bash
  vercel --prod
  ```
- **GitHub Pages:**
  ```bash
  GIT_USER=<Your GitHub username> yarn deploy
  ```

---

## 🛠️ Key Features
- **Responsive, dark mode-friendly tables/code blocks** (see `src/css/custom.css`)
- **Premium UI**: FeatureCard, FeatureGrid, CTABox, IconBox, SectionWrapper
- **SEO & Accessibility**: Internal linking, sidebar, category landing pages
- **Easy content authoring**: Write in Markdown/MDX, use custom React components
- **Modular structure**: Add new guides, tools, or categories easily

---

## 🤝 Contributing
- Fork and clone the repo
- Create a feature branch: `git checkout -b my-feature`
- Make changes, commit, and push
- Open a Pull Request for review

---

## 📚 References
- [Docusaurus Documentation](https://docusaurus.io/docs)
- [AIOps Vista Main Site](https://aiopsvista.com)
- [GitHub Repo](https://github.com/kdaiops06/AiOpsVista)
