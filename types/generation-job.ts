import type { Blueprint } from "@/types/output";
import type { CreateProjectInput } from "@/types/project";

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
  input?: CreateProjectInput;
  blueprint?: Blueprint;
  attemptCount?: number;
  leaseExpiresAt?: string;
  queueMessageId?: string;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
}
