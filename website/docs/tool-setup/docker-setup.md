---
sidebar_position: 3
title: "Docker for Development & Operations"
description: "Docker setup guide — multi-stage builds, Docker Compose for local development, security best practices, and CI/CD integration."
---

# Docker for Development & Operations

Docker is foundational for modern DevOps. This guide covers practical Docker patterns for development and production.

## Multi-Stage Build Pattern

Multi-stage builds produce smaller, more secure images:

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup
WORKDIR /app
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
CMD ["node", "dist/server.js"]
```

## Docker Compose for Local Development

```yaml
# docker-compose.yml
services:
  app:
    build:
      context: .
      target: builder  # Use build stage for hot reload
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/app
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: app
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

volumes:
  pgdata:
```

## Security Best Practices

### Image Scanning

```bash
# Scan with Trivy
trivy image --severity HIGH,CRITICAL myapp:latest

# Scan in CI pipeline
trivy image --exit-code 1 --severity CRITICAL myapp:latest
```

### Dockerfile Security Checklist

```dockerfile
# 1. Use specific base image tags (never :latest in production)
FROM node:20.11-alpine3.19

# 2. Run as non-root user
RUN addgroup -S app && adduser -S app -G app
USER app

# 3. Use COPY instead of ADD
COPY package.json ./

# 4. Don't store secrets in images
# Use build args or runtime env vars instead

# 5. Use .dockerignore
# .git, node_modules, .env, *.md, tests/
```

### .dockerignore

```
.git
.gitignore
node_modules
npm-debug.log
Dockerfile
docker-compose.yml
.env
.env.*
*.md
tests/
coverage/
.github/
```

## Useful Docker Commands

```bash
# Build with no cache
docker build --no-cache -t myapp:latest .

# View image layers and sizes
docker history myapp:latest

# Clean up unused resources
docker system prune -af --volumes

# Export container logs
docker logs --since 1h myapp > app.log 2>&1

# Inspect container resource usage
docker stats --no-stream

# Copy files from container
docker cp myapp:/app/config.json ./config.json

# Execute into running container
docker exec -it myapp sh
```

## CI/CD Integration

### GitHub Actions Docker Build

```yaml
- name: Build and push
  uses: docker/build-push-action@v5
  with:
    context: .
    push: true
    tags: ghcr.io/${{ github.repository }}:${{ github.sha }}
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

## Next Steps

- [VS Code Setup](/docs/tool-setup/vscode-setup) — Editor configuration
- [CI/CD Pipelines](/docs/cloud-devops/cicd-pipeline-patterns) — Automated deployments
