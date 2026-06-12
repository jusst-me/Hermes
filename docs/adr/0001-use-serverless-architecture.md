# 0001 — Use a serverless architecture

- Status: Accepted
- Date: 2026-06-12

## Context

Hermes is a portfolio project that should look like a realistic, production-ready
SaaS while keeping operational cost and maintenance low. The workload is
bursty (uploads arrive irregularly) and naturally asynchronous (documents are
processed after upload). The author wants to learn cloud-native, event-driven
design.

## Decision

We will build Hermes as a serverless system on AWS using Lambda, API Gateway,
S3, DynamoDB, EventBridge, and SQS. Compute is event-driven and scales to zero.

## Consequences

- Pay-per-use and no servers to manage; scales automatically with load.
- Forces good event-driven design and clear function boundaries.
- Cold starts and per-service limits must be considered.
- Local development needs emulation (LocalStack) — see ADR-0007.

## Alternatives considered

- **Containers on ECS/Fargate**: more control and no cold starts, but always-on
  cost, more ops, and less of the serverless learning we want.
- **A single monolithic Node service**: simplest to start, but does not
  demonstrate cloud architecture or scale-to-zero economics.
