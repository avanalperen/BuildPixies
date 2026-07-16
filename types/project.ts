import type { Blueprint } from "@/types/output";

export type ProjectStatus = "draft" | "generating" | "ready" | "failed";

export type ProjectGoal =
  | "bootcamp"
  | "startup"
  | "portfolio"
  | "client"
  | "hackathon";

export type ProjectPlatform =
  | "web"
  | "mobile"
  | "extension"
  | "ai-tool"
  | "marketplace"
  | "desktop";

export type OutputDepth = "quick" | "detailed" | "bootcamp-ready";

export interface ProjectConstraints {
  teamSize?: number;
  timeline?: string;
  budget?: string;
  techPreference?: string;
}

export interface Project {
  id: string;
  ownerId?: string;
  title: string;
  rawIdea: string;
  goal: ProjectGoal;
  platform: ProjectPlatform;
  targetAudience: string;
  constraints: ProjectConstraints;
  outputDepth?: OutputDepth;
  blueprint?: Blueprint;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  title?: string;
  rawIdea: string;
  goal: ProjectGoal;
  platform: ProjectPlatform;
  targetAudience: string;
  constraints?: ProjectConstraints;
  outputDepth?: OutputDepth;
}
