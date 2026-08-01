import type { PartialBlueprint } from "@/types/generation-job";

export interface CommandCenterField {
  label: string;
  /** Empty when the blueprint does not carry this answer yet. */
  lines: string[];
}

export interface CommandCenterModel {
  product: CommandCenterField;
  audience: CommandCenterField;
  problem: CommandCenterField;
  mustHave: CommandCenterField;
  outOfScope: CommandCenterField;
  risks: CommandCenterField;
  firstSprint: CommandCenterField;
  nextActions: CommandCenterField;
}

const maxRisks = 3;
const maxNextActions = 3;

/**
 * Maps a validated blueprint onto the one decision-per-row overview.
 * Deterministic and partial-safe: a missing section yields an empty field
 * instead of throwing, so the same component serves sample, partial and
 * finished projects.
 */
export function buildCommandCenter(
  blueprint: PartialBlueprint,
): CommandCenterModel {
  const brief = blueprint.productBrief;
  const scope = blueprint.mvpScope;
  const firstSprint = blueprint.sprintPlan?.sprints[0];

  const risks = [
    ...(blueprint.techPlan?.risks ?? []),
    ...(blueprint.marketAnalysis?.marketRisks ?? []),
  ].slice(0, maxRisks);

  // Prefer concrete starter tasks; fall back to the highest priority backlog.
  const starterTasks = blueprint.codeSkeleton?.starterTasks ?? [];
  const p0Backlog =
    blueprint.backlog?.items
      .filter((item) => item.priority === "P0")
      .map((item) => item.title) ?? [];
  const nextActions = (starterTasks.length > 0 ? starterTasks : p0Backlog).slice(
    0,
    maxNextActions,
  );

  return {
    product: {
      label: "What you are building",
      lines: brief ? [brief.oneLiner] : [],
    },
    audience: {
      label: "Who it is for",
      lines: brief?.targetUsers ?? [],
    },
    problem: {
      label: "Problem it solves",
      lines: brief ? [brief.problem] : [],
    },
    mustHave: {
      label: "Must-have scope",
      lines: scope?.mustHave.map((item) => `${item.feature} — ${item.why}`) ?? [],
    },
    outOfScope: {
      label: "Deliberately out of scope",
      lines:
        scope?.outOfScope.map((item) => `${item.feature} — ${item.reason}`) ?? [],
    },
    risks: {
      label: "Biggest risks",
      lines: risks,
    },
    firstSprint: {
      label: firstSprint ? `First sprint — ${firstSprint.goal}` : "First sprint",
      lines: firstSprint?.items ?? [],
    },
    nextActions: {
      label: "Next three actions",
      lines: nextActions,
    },
  };
}

export function commandCenterToMarkdown(
  model: CommandCenterModel,
  fields: (keyof CommandCenterModel)[],
): string {
  return fields
    .map((key) => {
      const field = model[key];
      const lines =
        field.lines.length > 0
          ? field.lines.map((line) => `- ${line}`)
          : ["- Not available in this blueprint."];
      return [`## ${field.label}`, ...lines].join("\n");
    })
    .join("\n\n");
}
