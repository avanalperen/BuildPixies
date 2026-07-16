import type { CreateProjectInput } from "@/types/project";
import type { Blueprint, BlueprintSection } from "@/types/output";
import { isAIConfigured, runJsonCompletion, runTextCompletion } from "@/lib/ai/client";
import { buildSampleBlueprint } from "@/lib/ai/sample";
import { blueprintSchema, validateSection } from "@/lib/ai/schemas";
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
  status: "thinking" | "done" | "failed";
}

export type OrchestratorListener = (event: OrchestratorEvent) => void;

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

const pipelineBatches: PipelineStep[][] = [
  [pipeline[0]],
  pipeline.slice(1, 3),
  pipeline.slice(3, 6),
  pipeline.slice(6, 9),
  [pipeline[9]],
  [pipeline[10]],
];

function assertValidSection(
  section: Exclude<BlueprintSection, "readme">,
  data: unknown,
) {
  const parsed = validateSection(section, data);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid ${section} output: ${details}`);
  }
  return parsed.data;
}

export async function generateBlueprint(
  input: CreateProjectInput,
  onEvent?: OrchestratorListener,
): Promise<Blueprint> {
  if (!isAIConfigured()) {
    const sample = buildSampleBlueprint(input.rawIdea);
    pipeline.forEach((step) =>
      onEvent?.({ pixie: step.pixie, section: step.section, status: "done" }),
    );
    return sample;
  }

  const outputs: Partial<Record<BlueprintSection, unknown>> = {};
  const ctx = { input, previousOutputs: outputs };

  const runStep = async (step: PipelineStep) => {
    onEvent?.({ pixie: step.pixie, section: step.section, status: "thinking" });
    try {
      const { system, user } = step.build(ctx);
      if (step.mode === "markdown") {
        outputs[step.section] = await runTextCompletion(system, user);
      } else {
        const data = await runJsonCompletion(system, user);
        outputs[step.section] = assertValidSection(step.section, data);
      }
      onEvent?.({ pixie: step.pixie, section: step.section, status: "done" });
    } catch (error) {
      onEvent?.({ pixie: step.pixie, section: step.section, status: "failed" });
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
  const data = await runJsonCompletion(system, user);
  return assertValidSection(section as Exclude<BlueprintSection, "readme">, data);
}
