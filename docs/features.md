# Hermes — Feature Catalog

This is the in-repo source of truth for features. Each feature has an ID, a user
story, Gherkin acceptance criteria, and links to the relevant ADR(s) and roadmap
phase. No external ticket system is used; roadmap phases act as epics.

Status legend: `Planned` · `In progress` · `Done`

| ID      | Feature                                      | Phase      | Status  |
| ------- | -------------------------------------------- | ---------- | ------- |
| HRM-001 | Create upload URL                            | Phase 2    | Planned |
| HRM-002 | Document state machine                       | Phase 2/3  | Planned |
| HRM-003 | Event-driven processing pipeline             | Phase 3    | Planned |
| HRM-004 | Text extraction                              | Phase 3    | Planned |
| HRM-005 | Pluggable processor                          | Phase 3    | Planned |
| HRM-006 | Get document                                 | Phase 4    | Planned |
| HRM-007 | List documents                               | Phase 4    | Planned |
| HRM-008 | Error handling & retries (DLQ + idempotency) | Phase 3/5  | Planned |
| HRM-009 | Observability                                | Phase 5    | Planned |
| HRM-010 | Security                                     | All phases | Planned |
| HRM-011 | CI/CD pipeline                               | Phase 6    | Planned |
| HRM-012 | Frontend                                     | Phase 7    | Planned |

---

## HRM-001 — Create upload URL

**As a** user, **I want** to request an upload for a document **so that** I can
send the file directly to storage without going through the API.

Acceptance criteria:

- Given a valid request with a filename
  When I call `POST /documents`
  Then a `Document` record is created with status `UPLOADED`
  And I receive a `documentId` and a presigned S3 `PUT` URL.
- Given an invalid request (missing/invalid filename or unsupported type)
  When I call `POST /documents`
  Then I receive a `400` with a descriptive validation error
  And no `Document` record is created.
- Given a generated presigned URL
  Then it is scoped to a single object key and expires after a short TTL.

Links: ADR-0001, ADR-0009, ADR-0010 · Phase 2

---

## HRM-002 — Document state machine

**As a** system, **I want** documents to follow a strict status lifecycle **so
that** state is always consistent and reprocessing is safe.

Acceptance criteria:

- Given a document in status `UPLOADED`
  When processing starts
  Then the status transitions to `PROCESSING` via a conditional write.
- Given a document not in the expected source status
  When a transition is attempted
  Then the conditional write fails and the transition is rejected.
- Valid transitions are: `UPLOADED -> PROCESSING -> COMPLETED | FAILED`.

Links: ADR-0003, ADR-0005 · Phase 2/3

---

## HRM-003 — Event-driven processing pipeline

**As a** system, **I want** uploaded documents to be processed asynchronously
**so that** the API stays responsive under load.

Acceptance criteria:

- Given an object is created in the S3 bucket
  When the `ObjectCreated` event is emitted
  Then an EventBridge rule forwards it
  And a message is delivered to the processing SQS queue.
- Given a message on the queue
  When the Processing Lambda runs
  Then the corresponding document is processed and its status updated.

Links: ADR-0004, ADR-0009 · Phase 3

---

## HRM-004 — Text extraction

**As a** system, **I want** to extract text from uploaded PDFs **so that** the
processor has content to analyse.

Acceptance criteria:

- Given a valid PDF in S3
  When the Processing Lambda runs
  Then text content is extracted and passed to the processor.
- Given a corrupt or unreadable file
  When extraction fails
  Then the document status becomes `FAILED` with an error reason.

Links: ADR-0008 · Phase 3

---

## HRM-005 — Pluggable processor

**As a** developer, **I want** document processing behind an interface **so
that** the simulated implementation can be swapped for real AI later.

Acceptance criteria:

- Given the `DocumentProcessor` interface
  Then the default implementation produces a deterministic summary, metadata, and
  keywords from extracted text.
- Given the same input
  When the processor runs multiple times
  Then it produces the same output (deterministic).
- A real AI implementation can be added without changing handlers or services.

Links: ADR-0002, ADR-0008 · Phase 3

---

## HRM-006 — Get document

**As a** user, **I want** to retrieve a document's status and result **so that**
I can see processing progress and outcome.

Acceptance criteria:

- Given an existing document id
  When I call `GET /documents/{id}`
  Then I receive its status and, if completed, its result.
- Given an unknown document id
  When I call `GET /documents/{id}`
  Then I receive a `404`.

Links: ADR-0003 · Phase 4

---

## HRM-007 — List documents

**As a** user, **I want** to list documents (optionally by status) **so that** I
can browse uploads.

Acceptance criteria:

- Given documents exist
  When I call `GET /documents`
  Then I receive a paginated list ordered by `uploadedAt`.
- Given a `status` filter
  Then only documents with that status are returned (served by a GSI).

Links: ADR-0003 · Phase 4 (stretch)

---

## HRM-008 — Error handling & retries (DLQ + idempotency)

**As a** system, **I want** robust failure handling **so that** transient errors
recover and poison messages are isolated.

Acceptance criteria:

- Given processing fails transiently
  When the message is retried
  Then processing succeeds within the configured retry count.
- Given processing fails `maxReceiveCount` times
  Then the message is moved to the DLQ
  And the document status becomes `FAILED`
  And a CloudWatch alarm fires on DLQ depth.
- Given a message is delivered more than once
  When processing runs again
  Then the result is unchanged (idempotent via conditional writes + Powertools
  Idempotency).
- Batch handlers use `ReportBatchItemFailures` so only failed messages retry.

Links: ADR-0004, ADR-0005 · Phase 3/5

---

## HRM-009 — Observability

**As an** operator, **I want** logs, metrics, traces, dashboards, and alarms **so
that** I can understand and operate the system.

Acceptance criteria:

- Every log line is structured and includes correlation ids (request id, document
  id).
- Metrics are emitted for uploads, processing duration, and failures.
- A CloudWatch dashboard shows uploads, failures, and average processing time.
- Alarms exist for DLQ depth and processing error rate.
- Traces span the request and processing path.

Links: ADR-0001 · Phase 5

---

## HRM-010 — Security

**As an** owner, **I want** security best practices applied **so that** the
system is safe by default.

Acceptance criteria:

- IAM roles follow least privilege per Lambda.
- S3 buckets are private; access is via presigned URLs only.
- No secrets in code or Terraform state; secrets come from SSM/Secrets Manager.
- All input is validated with Zod.
- Checkov passes in CI.

Links: ADR-0006 · all phases

---

## HRM-011 — CI/CD pipeline

**As a** developer, **I want** automated checks and deployment **so that** every
change is verified and shipped consistently.

Acceptance criteria:

- Given a pull request
  Then CI runs lint, typecheck, tests, `terraform validate`, and Checkov
  And merge is blocked unless all pass.
- Given a merge to main
  Then CI builds, runs `terraform plan`/`apply`, and deploys to AWS.

Links: ADR-0006, ADR-0007 · Phase 6

---

## HRM-012 — Frontend

**As a** user, **I want** a web UI **so that** I can upload documents and view
results without using the API directly.

Acceptance criteria:

- Given the upload page
  When I select a file and submit
  Then it is uploaded via the presigned URL and I see its status.
- Given a processing document
  Then the UI polls and reflects status changes.
- Given a completed document
  Then the UI shows the summary, metadata, and keywords.

Links: ADR-0002 · Phase 7
