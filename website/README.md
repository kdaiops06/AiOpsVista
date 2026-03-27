
# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Decision Guides

Explore the **Decision Guides** section for practical, actionable guides on choosing AI infrastructure, tools, and architectures.

- [How to Choose a Vector Database for RAG (2026 Guide)](docs/decision-guides/vector-db-for-rag.md)
- [Best Vector Databases for RAG (2026)](docs/decision-guides/best-vector-databases-for-rag-2026.md)

To preview or contribute to Decision Guides:

1. Edit or add guides in `docs/decision-guides/`.
2. Run `npm run build` to check formatting and alignment.
3. Use `npm run serve` to preview the production build locally.
4. Open a PR for review.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
