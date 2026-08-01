import type { Blueprint, BlueprintSection } from "@/types/output";
import type { CreateProjectInput } from "@/types/project";

export type GenerationJobStatus =
  | "queued"
  | "running"
  | "succeeded"
  | "failed";

export type GenerationStepStatus = "pending" | "running" | "done" | "failed";

/** One pipeline step of the blueprint run, as it really happened. */
export interface GenerationStep {
  section: BlueprintSection;
  pixie: string;
  status: GenerationStepStatus;
}

export interface GenerationProgress {
  steps: GenerationStep[];
  updatedAt: string;
}

export interface GenerationJob {
  id: string;
  projectId?: string;
  ownerId?: string;
  status: GenerationJobStatus;
  error?: string;
  input?: CreateProjectInput;
  blueprint?: Blueprint;
  progress?: GenerationProgress;
  attemptCount?: number;
  leaseExpiresAt?: string;
  queueMessageId?: string;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
}
