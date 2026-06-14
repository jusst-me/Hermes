export const DocumentStatus = {
  UPLOADED: "UPLOADED",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;

export type DocumentStatus = (typeof DocumentStatus)[keyof typeof DocumentStatus];

export interface DocumentResult {
  summary: string;
  keywords: string[];
  metadata: Record<string, string>;
}

export interface Document {
  documentId: string;
  filename: string;
  status: DocumentStatus;
  uploadedAt: string;
  result?: DocumentResult;
}
