# 0005 — DLQ and idempotency

- Status: Accepted
- Date: 2026-06-12

## Context

SQS delivers at-least-once, so the Processing Lambda may receive a message more
than once, and some messages may never succeed (corrupt files, bugs). We need to
handle both duplicates and permanent failures.

## Decision

We will make processing idempotent and isolate permanent failures:

- **Idempotency**: DynamoDB conditional writes enforce the state machine
  (`UPLOADED -> PROCESSING` only from `UPLOADED`), plus the AWS Lambda Powertools
  Idempotency utility deduplicates by `documentId` using a DynamoDB store with
  TTL. The default processor is deterministic, so reprocessing is harmless.
- **DLQ**: after `maxReceiveCount` failed attempts a message moves to a Dead
  Letter Queue; the document status is set to `FAILED` and a CloudWatch alarm
  fires on DLQ depth.
- **Partial batch failures**: batch handlers report `ReportBatchItemFailures` so
  only failed messages are retried.

## Consequences

- Duplicates do not corrupt state; transient errors recover via retries.
- Poison messages are isolated and observable, not retried forever.
- A small amount of extra infrastructure (idempotency table, DLQ, alarm) and
  per-handler care is required.

## Alternatives considered

- **No idempotency**: simplest, but duplicate deliveries could double-process and
  corrupt state or call paid APIs twice.
- **No DLQ**: poison messages would retry indefinitely, wasting cost and hiding
  failures.
