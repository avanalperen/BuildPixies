import type { CreateProjectInput } from "@/types/project";
import type { Blueprint, BlueprintSection } from "@/types/output";
import { isAIConfigured, runJsonCompletion, runTextCompletion } from "@/lib/ai/client";
import { buildSampleBlueprint } from "@/lib/ai/sample";
import { blueprintSchema, validateSection } from "@/lib/ai/schemas";
import { AIOutputValidationError, ServiceUnavailableError } from "@/lib/errors";
import {
  backlogPrompt,
  codePrompt,
  docsPrompt,
  marketPrompt,
  mvpScopePrompt,
  orchestratorPrompt,
  productPrompt,
  qaPrompt,
  scrumPrompt,
  techPrompt,
  uxPrompt,
  type PixieContext,
} from "@/lib/ai/prompts";

export interface OrchestratorEvent {
  pixie: string;
  section: BlueprintSection;
  status: "running" | "done" | "failed";
}

export type OrchestratorListener = (
  event: OrchestratorEvent,
) => void | Promise<void>;

type PipelineStep =
  | {
      pixie: string;
      section: Exclude<BlueprintSection, "readme">;
      build: (ctx: PixieContext) => { system: string; user: string };
      mode: "json";
    }
  | {
      pixie: string;
      section: "readme";
      build: (ctx: PixieContext) => { system: string; user: string };
      mode: "markdown";
    };

const pipeline: PipelineStep[] = [
  { pixie: "Pip", section: "orchestrationPlan", build: orchestratorPrompt, mode: "json" },
  { pixie: "Pria", section: "productBrief", build: productPrompt, mode: "json" },
  { pixie: "Moxie", section: "marketAnalysis", build: marketPrompt, mode: "json" },
  { pixie: "Pria", section: "mvpScope", build: mvpScopePrompt, mode: "json" },
  { pixie: "Luma", section: "uxFlow", build: uxPrompt, mode: "json" },
  { pixie: "Tinker", section: "techPlan", build: techPrompt, mode: "json" },
  { pixie: "Bitsy", section: "codeSkeleton", build: codePrompt, mode: "json" },
  { pixie: "Bugsy", section: "testPlan", build: qaPrompt, mode: "json" },
  { pixie: "Sprinta", section: "backlog", build: backlogPrompt, mode: "json" },
  { pixie: "Sprinta", section: "sprintPlan", build: scrumPrompt, mode: "json" },
  { pixie: "Quill", section: "readme", build: docsPrompt, mode: "markdown" },
];

/** Ordered pipeline steps, so callers can show every step before it starts. */
export function getPipelineSteps(): { pixie: string; section: BlueprintSection }[] {
  return pipeline.map((step) => ({ pixie: step.pixie, section: step.section }));
}

const pipelineBatches: PipelineStep[][] = [
  [pipeline[0]],
  pipeline.slice(1, 3),
  pipeline.slice(3, 6),
  pipeline.slice(6, 9),
  [pipeline[9]],
  [pipeline[10]],
];

const structuredOutputAttempts = 2;
const transientAttempts = 2;
const transientRetryDelayMs = 1_500;

/**
 * A single slow or busy provider response used to throw away every section
 * the pipeline had already produced, so transient failures get one retry.
 * Schema failures are excluded: `runStructuredSection` already handles those.
 */
async function withTransientRetry<T>(
  section: BlueprintSection,
  run: () => Promise<T>,
): Promise<T> {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await run();
    } catch (error) {
      const retryable =
        error instanceof ServiceUnavailableError &&
        !(error instanceof AIOutputValidationError);
      if (!retryable || attempt >= transientAttempts) throw error;

      console.warn("AI section failed with a transient error; retrying", {
        section,
        attempt,
        maxAttempts: transientAttempts,
        errorMessage: error.message,
      });
      await new Promise((resolve) =>
        setTimeout(resolve, transientRetryDelayMs * attempt),
      );
    }
  }
}
const retryInstruction = [
  "The previous response did not match the required output schema.",
  "Return exactly one JSON object with the requested fields and value types.",
  "Do not include markdown fences or additional fields.",
].join(" ");

class InvalidSectionOutputError extends AIOutputValidationError {
  constructor(readonly issuePaths: string[]) {
    super("AI provider returned invalid structured output");
    this.name = "InvalidSectionOutputError";
  }
}

function assertValidSection(
  section: Exclude<BlueprintSection, "readme">,
  data: unknown,
) {
  const parsed = validateSection(section, data);
  if (!parsed.success) {
    throw new InvalidSectionOutputError(
      parsed.error.issues.map((issue) => issue.path.join(".") || "root"),
    );
  }
  return parsed.data;
}

async function runStructuredSection(
  section: Exclude<BlueprintSection, "readme">,
  system: string,
  user: string,
): Promise<unknown> {
  let lastError: AIOutputValidationError | undefined;

  for (let attempt = 1; attempt <= structuredOutputAttempts; attempt += 1) {
    try {
      const retrySystem = attempt === 1
        ? system
        : `${system}\n\n${retryInstruction}`;
      const data = await runJsonCompletion(retrySystem, user);
      return assertValidSection(section, data);
    } catch (error) {
      if (!(error instanceof AIOutputValidationError)) throw error;
      lastError = error;
      console.warn("AI structured output validation failed", {
        section,
        attempt,
        maxAttempts: structuredOutputAttempts,
        issuePaths:
          error instanceof InvalidSectionOutputError
            ? error.issuePaths
            : ["root"],
      });
    }
  }

  throw lastError ?? new AIOutputValidationError();
}

export async function generateBlueprint(
  input: CreateProjectInput,
  onEvent?: OrchestratorListener,
): Promise<Blueprint> {
  if (!isAIConfigured()) {
    const sample = buildSampleBlueprint(input.rawIdea);
    for (const step of pipeline) {
      await onEvent?.({
        pixie: step.pixie,
        section: step.section,
        status: "done",
      });
    }
    return sample;
  }

  const outputs: Partial<Record<BlueprintSection, unknown>> = {};
  const ctx = { input, previousOutputs: outputs };

  const runStep = async (step: PipelineStep) => {
    await onEvent?.({
      pixie: step.pixie,
      section: step.section,
      status: "running",
    });
    try {
      const { system, user } = step.build(ctx);
      if (step.mode === "markdown") {
        outputs[step.section] = await withTransientRetry(step.section, () =>
          runTextCompletion(system, user),
        );
      } else {
        const section = step.section;
        outputs[section] = await withTransientRetry(section, () =>
          runStructuredSection(section, system, user),
        );
      }
      await onEvent?.({
        pixie: step.pixie,
        section: step.section,
        status: "done",
      });
    } catch (error) {
      await onEvent?.({
        pixie: step.pixie,
        section: step.section,
        status: "failed",
      });
      throw error;
    }
  };

  for (const batch of pipelineBatches) {
    await Promise.all(batch.map(runStep));
  }

  return blueprintSchema.parse(outputs);
}

export async function regenerateSection(
  input: CreateProjectInput,
  section: BlueprintSection,
  previousOutputs?: Partial<Record<BlueprintSection, unknown>>,
): Promise<unknown> {
  if (!isAIConfigured()) {
    return buildSampleBlueprint(input.rawIdea)[section];
  }
  const ctx = { input, previousOutputs };
  const builders: Record<
    BlueprintSection,
    { mode: "json" | "markdown"; build: () => { system: string; user: string } }
  > = {
    orchestrationPlan: { mode: "json", build: () => orchestratorPrompt(ctx) },
    productBrief: { mode: "json", build: () => productPrompt(ctx) },
    mvpScope: { mode: "json", build: () => mvpScopePrompt(ctx) },
    marketAnalysis: { mode: "json", build: () => marketPrompt(ctx) },
    uxFlow: { mode: "json", build: () => uxPrompt(ctx) },
    techPlan: { mode: "json", build: () => techPrompt(ctx) },
    codeSkeleton: { mode: "json", build: () => codePrompt(ctx) },
    testPlan: { mode: "json", build: () => qaPrompt(ctx) },
    backlog: { mode: "json", build: () => backlogPrompt(ctx) },
    sprintPlan: { mode: "json", build: () => scrumPrompt(ctx) },
    readme: { mode: "markdown", build: () => docsPrompt(ctx) },
  };
  const builder = builders[section];
  if (!builder) throw new Error(`Cannot regenerate section: ${section}`);
  const { system, user } = builder.build();
  if (builder.mode === "markdown") {
    return runTextCompletion(system, user);
  }
  return runStructuredSection(
    section as Exclude<BlueprintSection, "readme">,
    system,
    user,
  );
}
