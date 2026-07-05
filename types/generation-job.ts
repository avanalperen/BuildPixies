import type { Blueprint } from "@/types/output";

export type GenerationJobStatus =
  | "queued"
  | "running"
  | "succeeded"
  | "failed";

export interface GenerationJob {
  id: string;
  projectId?: string;
  ownerId?: string;
  status: GenerationJobStatus;
  error?: string;
  blueprint?: Blueprint;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
}
