import { techPrompt } from "@/lib/ai/prompts";
import type { PixieContext } from "@/lib/ai/prompts";

export const techPixie = {
  name: "Tinker",
  role: "tech" as const,
  section: "techPlan" as const,
  build: (ctx: PixieContext) => techPrompt(ctx),
};
