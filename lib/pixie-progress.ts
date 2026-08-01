import type { GenerationStep } from "@/types/generation-job";
import type { BlueprintSection } from "@/types/output";
import type { PixieStatus } from "@/types/pixie";

export const sectionLabels: Record<BlueprintSection, string> = {
  orchestrationPlan: "Orchestration plan",
  productBrief: "Product brief",
  marketAnalysis: "Market analysis",
  mvpScope: "MVP scope",
  uxFlow: "UX flow",
  techPlan: "Tech plan",
  codeSkeleton: "Code skeleton",
  backlog: "Backlog",
  testPlan: "Test plan",
  sprintPlan: "Sprint plan",
  readme: "README",
};

/**
 * Maps the pipeline steps that really ran onto the pixie that owns them.
 * A pixie is only "done" once every section assigned to it is done.
 */
export function pixieStatusesFromSteps(
  steps: GenerationStep[],
): Record<string, PixieStatus> {
  const statuses: Record<string, PixieStatus> = {};

  for (const pixie of new Set(steps.map((step) => step.pixie))) {
    const owned = steps.filter((step) => step.pixie === pixie);
    const has = (status: GenerationStep["status"]) =>
      owned.some((step) => step.status === status);

    statuses[pixie] = has("failed")
      ? "failed"
      : has("running")
        ? "thinking"
        : owned.every((step) => step.status === "done")
          ? "done"
          : has("done")
            ? "drafting"
            : "waiting";
  }

  return statuses;
}

export function countCompletedSteps(steps: GenerationStep[]): number {
  return steps.filter((step) => step.status === "done").length;
}

export function describeActiveSteps(steps: GenerationStep[]): string | null {
  const running = steps.filter((step) => step.status === "running");
  if (running.length === 0) return null;
  return running
    .map((step) => `${step.pixie} · ${sectionLabels[step.section]}`)
    .join(", ");
}
