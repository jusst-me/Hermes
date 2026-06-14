import { describe, it, expect } from "vitest";
import { DocumentStatus } from "../document.js";
import type { Document } from "../document.js";

describe("DocumentStatus", () => {
  it("defines all expected statuses", () => {
    expect(DocumentStatus.UPLOADED).toBe("UPLOADED");
    expect(DocumentStatus.PROCESSING).toBe("PROCESSING");
    expect(DocumentStatus.COMPLETED).toBe("COMPLETED");
    expect(DocumentStatus.FAILED).toBe("FAILED");
  });

  it("has exactly four statuses", () => {
    expect(Object.keys(DocumentStatus)).toHaveLength(4);
  });
});

describe("Document type", () => {
  it("allows constructing a valid document", () => {
    const doc: Document = {
      documentId: "doc-123",
      filename: "invoice.pdf",
      status: DocumentStatus.UPLOADED,
      uploadedAt: new Date().toISOString(),
    };

    expect(doc.status).toBe("UPLOADED");
    expect(doc.result).toBeUndefined();
  });
});
