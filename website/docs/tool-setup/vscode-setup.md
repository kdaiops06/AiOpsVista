---
sidebar_position: 2
title: "VS Code for DevOps & AI Development"
description: "Complete VS Code setup guide with essential extensions, AI coding assistants, remote development, and productivity workflows."
---

# VS Code for DevOps & AI Development

VS Code is the most popular editor for DevOps and AI development. This guide covers the optimal setup for infrastructure and AI workflows.

## Essential Extensions

### DevOps & Infrastructure

| Extension | Purpose |
|-----------|---------|
| **HashiCorp Terraform** | Terraform syntax, validation, auto-complete |
| **Kubernetes** | Cluster explorer, manifest editing |
| **YAML** | YAML validation (Helm charts, K8s manifests) |
| **Docker** | Dockerfile support, container management |
| **Remote - SSH** | Edit files on remote servers |
| **GitLens** | Advanced Git blame, history, comparison |

### AI Development

| Extension | Purpose |
|-----------|---------|
| **GitHub Copilot** | AI code completion and chat |
| **Jupyter** | Notebook support for ML experiments |
| **Python** | Python language support |
| **Pylance** | Fast Python IntelliSense |
| **REST Client** | Test API endpoints inline |

### Install All at Once

```bash
# DevOps extensions
code --install-extension hashicorp.terraform
code --install-extension ms-kubernetes-tools.vscode-kubernetes-tools
code --install-extension redhat.vscode-yaml
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode-remote.remote-ssh
code --install-extension eamodio.gitlens

# AI development extensions
code --install-extension github.copilot
code --install-extension ms-toolsai.jupyter
code --install-extension ms-python.python
code --install-extension ms-python.vscode-pylance
code --install-extension humao.rest-client
```

## Remote Development Setup

### SSH Config for Jump Hosts

```
# ~/.ssh/config
Host bastion
    HostName bastion.example.com
    User admin
    IdentityFile ~/.ssh/id_ed25519

Host k8s-node-*
    ProxyJump bastion
    User ubuntu
    IdentityFile ~/.ssh/id_ed25519

Host gpu-server
    HostName 10.0.1.50
    ProxyJump bastion
    User ubuntu
    ForwardAgent yes
```

### Dev Containers for Reproducible Environments

```json
// .devcontainer/devcontainer.json
{
  "name": "DevOps Workspace",
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/devcontainers/features/terraform:1": {},
    "ghcr.io/devcontainers/features/kubectl-helm-minikube:1": {},
    "ghcr.io/devcontainers/features/docker-in-docker:2": {},
    "ghcr.io/devcontainers/features/python:1": { "version": "3.12" },
    "ghcr.io/devcontainers/features/aws-cli:1": {}
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "hashicorp.terraform",
        "ms-kubernetes-tools.vscode-kubernetes-tools",
        "redhat.vscode-yaml",
        "github.copilot"
      ]
    }
  }
}
```

## Workspace Settings for DevOps

```json
// .vscode/settings.json
{
  // Terraform
  "terraform.languageServer.enable": true,
  "terraform.validation.enableEnhancedValidation": true,

  // YAML — Kubernetes schema validation
  "yaml.schemas": {
    "kubernetes": ["k8s/**/*.yaml", "manifests/**/*.yaml"],
    "https://json.schemastore.org/github-workflow.json": ".github/workflows/*.yml"
  },

  // Python
  "python.analysis.typeCheckingMode": "basic",
  "python.formatting.provider": "black",

  // Editor
  "editor.formatOnSave": true,
  "editor.rulers": [80, 120],
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,

  // Git
  "git.autofetch": true,
  "git.confirmSync": false
}
```

## Keyboard Shortcuts for Productivity

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+P` | Command palette |
| `Ctrl+`` ` | Toggle terminal |
| `Ctrl+Shift+`` ` | New terminal |
| `Ctrl+P` | Quick file open |
| `Ctrl+Shift+F` | Search across files |
| `Ctrl+K Ctrl+S` | Keyboard shortcuts |
| `F2` | Rename symbol |
| `Alt+Shift+F` | Format document |
| `Ctrl+Shift+G` | Git panel |

## Tasks for Common DevOps Operations

```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Terraform Plan",
      "type": "shell",
      "command": "terraform plan -out=tfplan",
      "group": "build",
      "problemMatcher": []
    },
    {
      "label": "Terraform Apply",
      "type": "shell",
      "command": "terraform apply tfplan",
      "group": "build",
      "problemMatcher": []
    },
    {
      "label": "K8s Port Forward",
      "type": "shell",
      "command": "kubectl port-forward svc/${input:service} ${input:port}:${input:port}",
      "isBackground": true,
      "problemMatcher": []
    }
  ],
  "inputs": [
    { "id": "service", "type": "promptString", "description": "Service name" },
    { "id": "port", "type": "promptString", "description": "Port number", "default": "8080" }
  ]
}
```

## Next Steps

- [Docker Setup Guide](/docs/tool-setup/docker-setup) — Container development workflows
- [Git & GitHub](/docs/tool-setup/getting-started) — Version control best practices
