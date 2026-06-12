# 0009 — S3 → EventBridge trigger flow

- Status: Accepted
- Date: 2026-06-12

## Context

The original brief had the Upload Lambda publish a `DocumentUploaded` event
immediately. But uploads use a presigned URL, so when the Upload Lambda runs the
file does not exist in S3 yet — processing could start before the object is
available.

## Decision

We will trigger processing from the actual object creation:
`S3 ObjectCreated -> EventBridge -> SQS -> Processing Lambda`. The Upload Lambda
only creates the `UPLOADED` record and returns the presigned URL; it does not
publish a processing event.

## Consequences

- Processing starts only after the file truly exists, eliminating a race
  condition.
- S3 is the single source of truth for "a document arrived".
- We rely on S3 EventBridge notifications being enabled on the bucket.

## Alternatives considered

- **Upload Lambda publishes the event** (original brief): simpler wiring, but
  races against the asynchronous presigned upload.
- **Client notifies the API after upload**: requires a trusted extra round trip
  and can be skipped or spoofed by clients.
