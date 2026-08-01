import { z } from "zod";
import { blueprintSchema } from "@/lib/ai/schemas";
import { blueprintSectionSchema } from "@/lib/schemas/blueprint-section";
import { createProjectInputSchema } from "@/lib/schemas/project";
import type { GenerationJob, GenerationProgress } from "@/types/generation-job";

export const generationProgressSchema: z.ZodType<GenerationProgress> = z
  .object({
    steps: z
      .array(
        z
          .object({
            section: blueprintSectionSchema,
            pixie: z.string().trim().min(1).max(40),
            status: z.enum(["pending", "running", "done", "failed"]),
          })
          .strict(),
      )
      .max(40),
    updatedAt: z.iso.datetime(),
  })
  .strict();

export const generationJobSchema: z.ZodType<GenerationJob> = z
  .object({
    id: z.string().uuid(),
    projectId: z.string().uuid().optional(),
    ownerId: z.string().uuid().optional(),
    status: z.enum(["queued", "running", "succeeded", "failed"]),
    error: z.string().trim().min(1).optional(),
    input: createProjectInputSchema.optional(),
    blueprint: blueprintSchema.optional(),
    progress: generationProgressSchema.optional(),
    attemptCount: z.number().int().min(0).optional(),
    leaseExpiresAt: z.iso.datetime().optional(),
    queueMessageId: z.string().trim().min(1).optional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
    startedAt: z.iso.datetime().optional(),
    completedAt: z.iso.datetime().optional(),
  })
  .strict();

export const generationJobResponseSchema = z
  .object({ job: generationJobSchema })
  .strict();
