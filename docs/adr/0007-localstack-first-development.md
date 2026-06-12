# 0007 — LocalStack-first development

- Status: Accepted
- Date: 2026-06-12

## Context

Iterating directly against AWS is slow and can incur cost, which is a poor fit for
a learning project. We still want the real AWS experience eventually.

## Decision

We will develop locally against LocalStack (via Docker Compose) first, then
deploy to real AWS through CI/CD in a later phase. Terraform targets a `local`
environment (LocalStack endpoints) and a `dev` environment (real AWS).

## Consequences

- Fast, free iteration loops during the learning phases.
- Integration tests run against LocalStack in CI without AWS credentials.
- Some AWS features differ or are unsupported in LocalStack; we verify on real
  AWS before relying on them.
- A clean separation of environment configuration is required from the start.

## Alternatives considered

- **Real AWS from day one**: most realistic, but slower and potentially costly
  while learning.
- **Mock everything in code**: fast, but does not exercise real IaC or service
  integration.
