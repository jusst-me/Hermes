# Phase 2 — First Lambda + API Gateway

Build the first vertical slice: request an upload URL through an HTTP API backed
by a Lambda that writes to DynamoDB. Implements HRM-001 and starts HRM-002.

## Learning goals

- Understand the Lambda + API Gateway (HTTP API) request lifecycle.
- Apply the layered structure (handler → service → repository) in practice.
- Generate S3 presigned URLs and validate input with Zod.
- Add structured logging with Lambda Powertools.

## Concepts to read

- API Gateway HTTP API vs REST API; event shape and proxy integration.
- S3 presigned URLs ([ADR-0010](../adr/0010-presigned-url-uploads.md)).
- Lambda Powertools Logger.
- Layered/hexagonal design ([ADR-0002](../adr/0002-layered-hexagonal-architecture.md)).

## Steps

1. Define the `Document` type and event contracts in `packages/core`.
2. Implement the `create-upload-url` handler with Middy + Zod validation.
3. Add a `DocumentRepository` (DynamoDB) behind an interface.
4. Add an upload service that creates the `UPLOADED` record and a presigned URL.
5. Add Powertools Logger with correlation ids (request id, document id).
6. Provision API Gateway and the Lambda in Terraform; least-privilege IAM.
7. Unit test the service (mocked repo) and integration test the handler against
   LocalStack.

## Definition of Done

- `POST /documents` returns `{ documentId, uploadUrl }` and creates an `UPLOADED`
  record.
- Invalid input returns `400` with a validation error and creates nothing.
- Unit + integration tests pass; logs are structured with correlation ids.
- IAM grants only the permissions the Lambda needs.

## Stretch

- Restrict accepted content types and enforce a max size in the presigned policy.
- Add request-level metrics (upload count) via Powertools Metrics.
