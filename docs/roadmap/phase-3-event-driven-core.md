# Phase 3 — Event-driven core

Wire the asynchronous processing pipeline and make it reliable. Implements
HRM-003, HRM-004, HRM-005, and the core of HRM-008.

## Learning goals

- Understand event-driven flow: S3 → EventBridge → SQS → Lambda.
- Implement reliable processing: retries, DLQ, and idempotency.
- Apply the pluggable processor pattern.

## Concepts to read

- EventBridge rules and event patterns; S3 EventBridge notifications.
- SQS: visibility timeout, `maxReceiveCount`, DLQ, `ReportBatchItemFailures`.
- Idempotency and at-least-once delivery
  ([ADR-0005](../adr/0005-dlq-and-idempotency.md)).
- S3 → EventBridge trigger rationale
  ([ADR-0009](../adr/0009-s3-eventbridge-trigger-flow.md)).

## Steps

1. Enable EventBridge notifications on the S3 bucket (Terraform).
2. Create the EventBridge rule, SQS queue, and DLQ (Terraform).
3. Define the `DocumentProcessor` interface and a deterministic simulated
   implementation (text extraction + summary/metadata/keywords).
4. Implement the `process-document` handler (SQS trigger): get object, extract,
   process, update status with conditional writes.
5. Add idempotency: conditional state transitions + Powertools Idempotency.
6. Configure the DLQ redrive and `ReportBatchItemFailures`.
7. Unit test the processor/service; integration test the full flow on LocalStack.

## Definition of Done

- Uploading a file results in the document reaching `COMPLETED` with a result.
- A forced failure retries, then lands in the DLQ with status `FAILED`.
- Re-delivering a message does not reprocess a completed document.
- Tests cover happy path, failure path, and duplicate delivery.

## Stretch

- Add a second processor implementation stub (e.g. `BedrockProcessor`) to prove
  pluggability.
- Add processing-duration metrics.
