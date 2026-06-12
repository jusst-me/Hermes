# Architecture Decision Records

This directory records significant architecture decisions for Hermes. Each ADR
captures the context, the decision, its consequences, and the alternatives that
were considered.

We use a lightweight [MADR](https://adr.github.io/madr/)-style format. See
[template.md](./template.md) to add a new one. Number ADRs sequentially and never
delete them — if a decision changes, add a new ADR that supersedes the old one.

## Index

- [0001 — Use a serverless architecture](./0001-use-serverless-architecture.md)
- [0002 — Layered/hexagonal architecture (not MVC)](./0002-layered-hexagonal-architecture.md)
- [0003 — DynamoDB data model (single-table-light)](./0003-dynamodb-data-model.md)
- [0004 — EventBridge + SQS processing pipeline](./0004-eventbridge-sqs-pipeline.md)
- [0005 — DLQ and idempotency](./0005-dlq-and-idempotency.md)
- [0006 — Terraform for Infrastructure as Code](./0006-terraform-for-iac.md)
- [0007 — LocalStack-first development](./0007-localstack-first-development.md)
- [0008 — Simulated, pluggable document processing](./0008-simulated-pluggable-processing.md)
- [0009 — S3 → EventBridge trigger flow](./0009-s3-eventbridge-trigger-flow.md)
- [0010 — Presigned URL uploads](./0010-presigned-url-uploads.md)
