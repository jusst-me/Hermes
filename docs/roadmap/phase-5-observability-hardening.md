# Phase 5 — Observability & hardening

Make the system observable and resilient. Implements HRM-009 and completes
HRM-008 and HRM-010.

## Learning goals

- Emit and use metrics, traces, dashboards, and alarms.
- Reason about failure modes and edge cases.

## Concepts to read

- CloudWatch metrics (EMF) and Lambda Powertools Metrics.
- X-Ray tracing and Powertools Tracer.
- CloudWatch dashboards and alarms as code (Terraform).

## Steps

1. Add metrics for uploads, processing duration, and failures.
2. Enable tracing across the request and processing path.
3. Build a CloudWatch dashboard in Terraform (uploads, failures, avg duration).
4. Add alarms (DLQ depth > 0, processing error rate) in Terraform.
5. Review IAM for least privilege across all functions.
6. Add edge-case tests (large file, unsupported type, repeated delivery).

## Definition of Done

- Dashboard shows uploads, failures, and average processing time.
- Alarms exist and have been triggered at least once in testing.
- Traces connect the API request to the processing step.
- Edge cases are covered by tests and handled gracefully.

## Stretch

- Add structured anomaly alarms or composite alarms.
- Add a runbook entry describing how to drain/replay the DLQ.
