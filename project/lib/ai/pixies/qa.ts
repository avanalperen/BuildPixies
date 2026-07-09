import { qaPrompt } from "@/lib/ai/prompts";
import type { PixieContext } from "@/lib/ai/prompts";

export const qaPixie = {
  name: "Bugsy",
  role: "qa" as const,
  section: "testPlan" as const,
  build: (ctx: PixieContext) => qaPrompt(ctx),
};
