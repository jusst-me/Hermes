# 0006 — Terraform for Infrastructure as Code

- Status: Accepted
- Date: 2026-06-12

## Context

All AWS resources must be provisioned reproducibly, with no manual console
changes. The author wants to learn Infrastructure as Code from first principles,
and the project should send a strong signal to recruiters and senior engineers.

## Decision

We will manage all infrastructure with Terraform (HCL), organised as reusable
modules with per-environment configuration (`local` for LocalStack, `dev` for
real AWS). Quality gates: `terraform fmt`, `terraform validate`, tflint, and
Checkov.

## Consequences

- Industry-standard, cloud-agnostic IaC skill and a clear audit trail.
- Learning IaC "from scratch" (state, providers, modules, variables, outputs).
- More verbose than serverless-native frameworks; we manage wiring explicitly.
- Terraform state must be handled carefully (local for LocalStack, remote backend
  for AWS later).

## Alternatives considered

- **AWS CDK (TypeScript)**: leverages existing TS skills, but AWS-specific and
  less "pure IaC" learning value.
- **SST / Serverless Framework**: fastest serverless DX, but hides much of what
  we explicitly want to learn.
