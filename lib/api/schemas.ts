import { z } from "zod";
import { blueprintSchema } from "@/lib/ai/schemas";
import { blueprintSectionSchema } from "@/lib/schemas/blueprint-section";
import { createProjectInputSchema } from "@/lib/schemas/project";

export { createProjectInputSchema } from "@/lib/schemas/project";
export { blueprintSectionSchema } from "@/lib/schemas/blueprint-section";

export const resourceIdSchema = z.string().uuid();

export const createProjectRequestSchema = createProjectInputSchema;

export const generateBlueprintRequestSchema = z
  .object({
    projectId: resourceIdSchema.optional(),
    input: createProjectInputSchema.optional(),
  })
  .strict()
  .refine((value) => value.projectId || value.input, {
    message: "projectId or input is required",
  });

export const regenerateOutputRequestSchema = z
  .object({
    projectId: resourceIdSchema.optional(),
    input: createProjectInputSchema.optional(),
    section: blueprintSectionSchema,
    instruction: z.string().trim().min(3).max(300).optional(),
    previousOutputs: blueprintSchema.optional(),
  })
  .strict()
  .refine((value) => value.projectId || value.input, {
    message: "projectId or input is required",
  });

export const bootcampReportRequestSchema = z
  .object({
    projectId: resourceIdSchema,
    sprintName: z.string().trim().min(1).max(120).default("Current Sprint"),
    sprintGoal: z.string().trim().min(1).max(500).optional(),
    progressNotes: z.string().trim().min(20).max(8_000),
  })
  .strict();

const exportRequestSchema = z
  .object({
    projectId: resourceIdSchema.optional(),
    blueprint: blueprintSchema.optional(),
  })
  .strict()
  .refine((value) => value.projectId || value.blueprint, {
    message: "projectId or blueprint is required",
  });

export const exportReadmeRequestSchema = exportRequestSchema;

export const exportJsonRequestSchema = exportRequestSchema;
