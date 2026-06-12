# 0002 — Layered/hexagonal architecture (not MVC)

- Status: Accepted
- Date: 2026-06-12

## Context

We need a code structure for the Lambda functions that is testable, keeps AWS
details out of business logic, and lets us swap implementations (LocalStack ↔
AWS, simulated ↔ real processing). MVC is a common default, but it assumes a
long-running HTTP server with a View layer.

## Decision

We will use a layered/ports-and-adapters (hexagonal) structure per function:

```text
handler (adapter)  -> translates the AWS event, validates (Zod), logs
  service (domain) -> business logic, no AWS details
    repository     -> data access behind an interface (DynamoDB, S3)
    processor      -> document processing behind an interface
```

We will not use MVC.

## Consequences

- Services are unit-testable in isolation with mocked repositories/processors.
- Infrastructure is swappable behind interfaces.
- The same service can be invoked from different triggers (HTTP, SQS).
- Slightly more boilerplate (interfaces + wiring) than a flat handler.

## Alternatives considered

- **MVC**: does not fit — the backend has no View layer (the view is the separate
  Next.js frontend), and triggers are heterogeneous (HTTP, SQS, S3 events), not
  only HTTP routes/controllers.
- **Flat handlers** (all logic in the handler): fastest to write, but untestable
  and tightly coupled to AWS.
