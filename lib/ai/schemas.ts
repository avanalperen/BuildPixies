import { z } from "zod";
import type { BlueprintSection } from "@/types/output";

const text = z.string().trim().min(1);
const textList = z.array(text).min(1);

export const orchestrationPlanSchema = z.object({
  summary: text,
  missingInformation: z.array(text),
  recommendedSequence: textList,
  guardrails: textList,
}).strict();

export const productBriefSchema = z.object({
  projectName: text,
  oneLiner: text,
  problem: text,
  targetUsers: textList,
  mainValue: text,
  useCases: textList,
  successMetrics: textList,
}).strict();

export const marketAnalysisSchema = z.object({
  competitors: textList,
  positioning: text,
  differentiation: textList,
  marketRisks: textList,
}).strict();

export const mvpScopeSchema = z.object({
  mustHave: z.array(z.object({ feature: text, why: text }).strict()).min(1),
  niceToHave: z.array(
    z.object({ feature: text, whyLater: text }).strict(),
  ),
  outOfScope: z.array(z.object({ feature: text, reason: text }).strict()),
}).strict();

export const backlogSchema = z.object({
  items: z.array(
    z.object({
      title: text,
      userStory: text,
      priority: z.enum(["P0", "P1", "P2"]),
      sprint: z.number().int().min(1).max(6),
      acceptanceCriteria: textList,
    }).strict(),
  ).min(1),
}).strict();

export const uxFlowSchema = z.object({
  journey: text,
  screens: z.array(
    z.object({
      name: text,
      purpose: text,
      primaryAction: text,
      emptyState: text.optional(),
      errorState: text.optional(),
    }).strict(),
  ).min(1),
}).strict();

export const techPlanSchema = z.object({
  recommendedStack: z.object({
    frontend: text.optional(),
    backend: text.optional(),
    database: text.optional(),
    ai: text.optional(),
    deploy: text.optional(),
  }).strict(),
  architecture: text,
  databaseTables: textList,
  apiRoutes: textList,
  risks: textList,
}).strict();

export const codeSkeletonSchema = z.object({
  fileTree: z.array(
    z.object({
      path: text,
      purpose: text,
    }).strict(),
  ).min(1),
  starterTasks: textList,
  conventions: textList,
}).strict();

export const testPlanSchema = z.object({
  happyPath: z.array(
    z.object({
      name: text,
      type: z.literal("happy"),
      steps: textList,
      expectedResult: text,
    }).strict(),
  ).min(1),
  edgeCases: z.array(
    z.object({
      name: text,
      type: z.literal("edge"),
      steps: textList,
      expectedResult: text,
    }).strict(),
  ).min(1),
  errorMessages: textList,
  securityRisks: textList,
  demoChecklist: textList,
}).strict();

export const sprintPlanSchema = z.object({
  sprints: z.array(
    z.object({ name: text, goal: text, items: textList }).strict(),
  ).min(1),
}).strict();

export const blueprintSchema = z.object({
  orchestrationPlan: orchestrationPlanSchema,
  productBrief: productBriefSchema,
  marketAnalysis: marketAnalysisSchema,
  mvpScope: mvpScopeSchema,
  uxFlow: uxFlowSchema,
  techPlan: techPlanSchema,
  codeSkeleton: codeSkeletonSchema,
  backlog: backlogSchema,
  testPlan: testPlanSchema,
  sprintPlan: sprintPlanSchema,
  readme: text,
}).strict();

export const schemas: Record<
  Exclude<BlueprintSection, "readme">,
  z.ZodTypeAny
> = {
  orchestrationPlan: orchestrationPlanSchema,
  productBrief: productBriefSchema,
  marketAnalysis: marketAnalysisSchema,
  mvpScope: mvpScopeSchema,
  backlog: backlogSchema,
  uxFlow: uxFlowSchema,
  techPlan: techPlanSchema,
  codeSkeleton: codeSkeletonSchema,
  testPlan: testPlanSchema,
  sprintPlan: sprintPlanSchema,
};

export function validateSection(
  section: Exclude<BlueprintSection, "readme">,
  data: unknown,
) {
  return schemas[section].safeParse(data);
}
