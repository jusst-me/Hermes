# 0004 — EventBridge + SQS processing pipeline

- Status: Accepted
- Date: 2026-06-12

## Context

Document processing must be decoupled from upload so the API stays responsive,
work can be buffered, and failures can be retried and isolated.

## Decision

We will route events through EventBridge and buffer them in SQS:
`S3 ObjectCreated -> EventBridge rule -> SQS queue -> Processing Lambda`, with an
SQS Dead Letter Queue for poison messages.

## Consequences

- Loose coupling: producers and consumers evolve independently; new consumers can
  subscribe to the same events.
- SQS provides retries, backpressure, and a DLQ.
- More moving parts to configure (rule, queue, DLQ, permissions).
- At-least-once delivery requires idempotent processing — see ADR-0005.

## Alternatives considered

- **S3 → Lambda directly**: simplest, but no buffering/backpressure and weaker
  retry/DLQ semantics; harder to add fan-out later.
- **EventBridge → Lambda directly (no SQS)**: loses the buffer and the
  queue-level DLQ and throttling controls.
