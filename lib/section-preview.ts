import type { PartialBlueprint } from "@/types/generation-job";
import type { BlueprintSection } from "@/types/output";

/**
 * Turns a validated section into a few readable lines, so a completed section
 * is worth opening before the rest of the pipeline finishes. Every branch
 * reads schema-guaranteed fields only.
 */
export function previewSection(
  section: BlueprintSection,
  blueprint: PartialBlueprint,
): string[] {
  switch (section) {
    case "orchestrationPlan": {
      const value = blueprint.orchestrationPlan;
      return value ? [value.summary, ...value.recommendedSequence] : [];
    }
    case "productBrief": {
      const value = blueprint.productBrief;
      return value
        ? [value.oneLiner, value.problem, `Value: ${value.mainValue}`]
        : [];
    }
    case "marketAnalysis": {
      const value = blueprint.marketAnalysis;
      return value
        ? [value.positioning, `Competitors: ${value.competitors.join(", ")}`]
        : [];
    }
    case "mvpScope": {
      const value = blueprint.mvpScope;
      return value
        ? value.mustHave.map((item) => `${item.feature} — ${item.why}`)
        : [];
    }
    case "uxFlow": {
      const value = blueprint.uxFlow;
      return value
        ? [value.journey, ...value.screens.map((screen) => screen.name)]
        : [];
    }
    case "techPlan": {
      const value = blueprint.techPlan;
      return value ? [value.architecture, ...value.databaseTables] : [];
    }
    case "codeSkeleton": {
      const value = blueprint.codeSkeleton;
      return value ? value.fileTree.map((file) => file.path) : [];
    }
    case "backlog": {
      const value = blueprint.backlog;
      return value
        ? value.items.map((item) => `${item.priority} · ${item.title}`)
        : [];
    }
    case "testPlan": {
      const value = blueprint.testPlan;
      return value ? value.happyPath.map((test) => test.name) : [];
    }
    case "sprintPlan": {
      const value = blueprint.sprintPlan;
      return value
        ? value.sprints.map((sprint) => `${sprint.name}: ${sprint.goal}`)
        : [];
    }
    case "readme": {
      const value = blueprint.readme;
      return value ? value.split("\n").filter(Boolean).slice(0, 6) : [];
    }
  }
}
