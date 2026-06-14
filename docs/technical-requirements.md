# Hermes — Technical Requirements

This document defines the technology stack (with rationale) and the quality bar
the project holds itself to. It is the reference for every implementation choice.

## 1. Technology stack

### Language & monorepo

- **TypeScript** everywhere, `strict` mode. No `any` without an explicit,
  justified exception.
- **pnpm workspaces + Turborepo** for the monorepo. pnpm for fast, disk-efficient
  installs; Turborepo for task orchestration and caching across packages.

### Backend (AWS serverless)

- **AWS Lambda** (Node.js 22 runtime). Native handlers — no Fastify; the
  architecture does not need a web framework inside Lambda.
- **Middy** middleware for cross-cutting concerns (parsing, validation, error
  handling).
- **Zod** for input validation and type inference at the boundaries.
- **AWS SDK v3** (modular clients) for DynamoDB, S3, EventBridge, SQS.
- **AWS Lambda Powertools for TypeScript** — Logger (structured logging),
  Metrics (EMF), Tracer (X-Ray), and the Idempotency utility.

### Infrastructure as Code

- **Terraform (HCL)** — all AWS resources, no manual console changes.
- Organised as reusable **modules** with per-**environment** configuration
  (`local` for LocalStack, `dev` for real AWS).
- Quality gates: `terraform fmt`, `terraform validate`, **tflint**, **Checkov**
  (security/static analysis).

### Local development

- **Docker Compose + LocalStack** to emulate AWS locally. LocalStack-first keeps
  iteration fast and free; real AWS deployment comes later via CI/CD. See
  [adr/0007-localstack-first-development.md](./adr/0007-localstack-first-development.md).

### Testing

- **Vitest** for unit and integration tests.
- Unit tests use **`aws-sdk-client-mock`** to mock AWS clients.
- Integration tests run against **LocalStack**.

### CI/CD

- **GitHub Actions**. Pull requests run lint, typecheck, tests, `terraform
validate`, and Checkov. The main branch additionally builds and runs
  `terraform plan`/`apply` to deploy to AWS.

### Frontend (later phase)

- **Next.js + TypeScript + Tailwind + React Query** — upload UI, status polling,
  and result view.

### Conventions

- Repository artifacts (README, ADRs, code, code comments, rules) are written in
  **English**.
- Feature tracking is **in-repo only** ([features.md](./features.md) is the source
  of truth); roadmap phases act as epics.

## 2. Quality bar

These are non-negotiable expectations for every change.

### Code quality

- TypeScript `strict`; no implicit `any`; explicit return types on exported
  functions.
- **ESLint + Prettier** enforced; formatting is not debated.
- **Pre-commit hooks** (husky + lint-staged) run lint/format/typecheck on staged
  files.
- Small, focused modules; one concern per file; clear layering
  (handler → service → repository/processor).

### Testing

- All business logic (services, processors, utilities) is **unit tested**.
- Each Lambda has at least one **integration test** against LocalStack.
- Coverage thresholds are enforced in CI (target: meaningful coverage of domain
  logic, not vanity 100%).
- Tests are deterministic and independent; no reliance on external network.

### Git & process

- **Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`,
  `test:`...).
- All changes go through **pull requests**; CI must be green before merge.
- Significant decisions are captured as **ADRs** in [adr/](./adr/).

### Security

- **IAM least privilege** — each Lambda gets only the permissions it needs.
- **Private S3 buckets**; access via presigned URLs only.
- **No secrets in code or Terraform state** — use SSM Parameter Store / Secrets
  Manager and environment configuration.
- **Input validation** with Zod at every boundary.
- Checkov runs in CI to catch insecure infrastructure.

### Observability

- **Structured logging** with correlation IDs (request id, document id) on every
  log line.
- **Metrics** for uploads, processing duration, and failures.
- **CloudWatch dashboard** and **alarms** (e.g. DLQ depth > 0) defined in
  Terraform.
- **Tracing** via X-Ray/Powertools across the request and processing path.

### Reliability

- Processing is **idempotent** (SQS is at-least-once): conditional writes for
  state transitions plus the Powertools Idempotency utility.
- A **Dead Letter Queue** isolates poison messages; failures set document status
  to `FAILED` and raise an alarm.
- Batch handlers use **`ReportBatchItemFailures`** so only failed messages are
  retried.

## 3. Definition of Done (per change)

A change is done when:

- [ ] Code compiles under `strict` and passes ESLint/Prettier.
- [ ] Unit tests cover the new business logic; integration tests cover new
      Lambdas.
- [ ] Terraform `fmt`/`validate`/tflint/Checkov pass for infra changes.
- [ ] Logging/metrics added where relevant; correlation IDs preserved.
- [ ] IAM permissions reviewed for least privilege.
- [ ] Docs updated (feature acceptance criteria, ADR if a decision was made).
- [ ] CI is green.
