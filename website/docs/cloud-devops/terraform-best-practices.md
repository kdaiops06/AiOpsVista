---
sidebar_position: 3
title: "Terraform Best Practices"
description: "Production Terraform patterns — module design, state management, workspace strategies, and security hardening for infrastructure at scale."
---

# Terraform Best Practices

This guide covers battle-tested Terraform patterns for managing infrastructure at scale across teams and environments.

## Project Structure

```
infrastructure/
├── modules/                    # Reusable modules
│   ├── networking/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── README.md
│   ├── kubernetes/
│   ├── monitoring/
│   └── database/
├── environments/               # Environment configs
│   ├── dev/
│   │   ├── main.tf
│   │   ├── terraform.tfvars
│   │   └── backend.tf
│   ├── staging/
│   └── production/
├── .github/
│   └── workflows/
│       └── terraform.yml
└── .tflint.hcl
```

## Module Design Pattern

```hcl
# modules/networking/main.tf
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = merge(var.tags, {
    Name = "${var.project}-${var.environment}-vpc"
  })
}

resource "aws_subnet" "private" {
  count             = length(var.private_subnet_cidrs)
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = merge(var.tags, {
    Name = "${var.project}-${var.environment}-private-${count.index + 1}"
    Type = "private"
  })
}

resource "aws_subnet" "public" {
  count                   = length(var.public_subnet_cidrs)
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = merge(var.tags, {
    Name = "${var.project}-${var.environment}-public-${count.index + 1}"
    Type = "public"
  })
}
```

```hcl
# modules/networking/variables.tf
variable "project" {
  description = "Project name"
  type        = string
}

variable "environment" {
  description = "Environment (dev, staging, production)"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "Environment must be dev, staging, or production."
  }
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "private_subnet_cidrs" {
  description = "Private subnet CIDR blocks"
  type        = list(string)
}

variable "public_subnet_cidrs" {
  description = "Public subnet CIDR blocks"
  type        = list(string)
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)
}

variable "tags" {
  description = "Common tags"
  type        = map(string)
  default     = {}
}
```

## State Management

### Remote State with S3

```hcl
# environments/production/backend.tf
terraform {
  backend "s3" {
    bucket         = "mycompany-terraform-state"
    key            = "production/infrastructure.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
```

### State Locking with DynamoDB

```hcl
# Bootstrap: create state infrastructure first
resource "aws_s3_bucket" "terraform_state" {
  bucket = "mycompany-terraform-state"

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}
```

## CI/CD Pipeline

```yaml
# .github/workflows/terraform.yml
name: Terraform
on:
  pull_request:
    paths: ['environments/**', 'modules/**']
  push:
    branches: [main]
    paths: ['environments/**', 'modules/**']

jobs:
  plan:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        environment: [dev, staging, production]
    steps:
    - uses: actions/checkout@v4

    - uses: hashicorp/setup-terraform@v3
      with:
        terraform_version: "1.7.0"

    - name: Terraform Init
      working-directory: environments/${{ matrix.environment }}
      run: terraform init

    - name: Terraform Validate
      working-directory: environments/${{ matrix.environment }}
      run: terraform validate

    - name: Terraform Plan
      working-directory: environments/${{ matrix.environment }}
      run: terraform plan -out=tfplan
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

  apply:
    needs: plan
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
    - uses: actions/checkout@v4
    - name: Terraform Apply
      working-directory: environments/production
      run: |
        terraform init
        terraform apply -auto-approve
```

## Security Checklist

- [ ] State files stored remotely with encryption
- [ ] State locking enabled (DynamoDB/GCS)
- [ ] No secrets in `.tfvars` files (use Vault or AWS Secrets Manager)
- [ ] Provider versions pinned
- [ ] `prevent_destroy` on critical resources
- [ ] S3 bucket versioning for state file recovery
- [ ] IAM roles with least-privilege for CI/CD
- [ ] `tfsec` or `checkov` scanning in CI

## Next Steps

- [CI/CD Pipeline Patterns](/docs/cloud-devops/cicd-pipeline-patterns) — Automate deployments
- [Cloud Architecture](/docs/cloud-devops/getting-started) — Cloud design patterns
