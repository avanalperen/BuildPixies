import { z } from "zod";
import { blueprintSchema } from "@/lib/ai/schemas";

const projectGoalSchema = z.enum([
  "bootcamp",
  "startup",
  "portfolio",
  "client",
  "hackathon",
]);

const projectPlatformSchema = z.enum([
  "web",
  "mobile",
  "extension",
  "ai-tool",
  "marketplace",
  "desktop",
]);

const outputDepthSchema = z.enum(["quick", "detailed", "bootcamp-ready"]);

const projectConstraintsSchema = z
  .object({
    teamSize: z.number().int().min(1).max(20).optional(),
    timeline: z.string().trim().min(1).max(120).optional(),
    budget: z.string().trim().min(1).max(120).optional(),
    techPreference: z.string().trim().min(1).max(240).optional(),
  })
  .strict();

export const createProjectInputSchema = z
  .object({
    title: z.string().trim().min(1).max(120).optional(),
    rawIdea: z.string().trim().min(10).max(4_000),
    goal: projectGoalSchema.default("bootcamp"),
    platform: projectPlatformSchema.default("web"),
    targetAudience: z.string().trim().min(1).max(500).default("builders"),
    constraints: projectConstraintsSchema.optional(),
    outputDepth: outputDepthSchema.default("bootcamp-ready").optional(),
  })
  .strict();

export const createProjectRequestSchema = createProjectInputSchema;

export const blueprintSectionSchema = z.enum([
  "orchestrationPlan",
  "productBrief",
  "marketAnalysis",
  "mvpScope",
  "uxFlow",
  "techPlan",
  "codeSkeleton",
  "backlog",
  "testPlan",
  "sprintPlan",
  "readme",
]);

export const generateBlueprintRequestSchema = z
  .object({
    projectId: z.string().trim().min(1).max(160).optional(),
    input: createProjectInputSchema.optional(),
  })
  .strict()
  .refine((value) => value.projectId || value.input, {
    message: "projectId or input is required",
  });

export const regenerateOutputRequestSchema = z
  .object({
    projectId: z.string().trim().min(1).max(160).optional(),
    input: createProjectInputSchema.optional(),
    section: blueprintSectionSchema,
    previousOutputs: blueprintSchema.optional(),
  })
  .strict()
  .refine((value) => value.projectId || value.input, {
    message: "projectId or input is required",
  });

export const exportReadmeRequestSchema = z
  .object({
    projectId: z.string().trim().min(1).max(160).optional(),
    blueprint: blueprintSchema,
  })
  .strict();

export const exportJsonRequestSchema = z
  .object({
    projectId: z.string().trim().min(1).max(160).optional(),
    blueprint: blueprintSchema,
  })
  .strict();
