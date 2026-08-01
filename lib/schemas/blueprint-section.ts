import { z } from "zod";
import type { BlueprintSection } from "@/types/output";

export const blueprintSectionSchema: z.ZodType<BlueprintSection> = z.enum([
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
