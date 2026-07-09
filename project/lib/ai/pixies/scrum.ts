import { scrumPrompt } from "@/lib/ai/prompts";
import type { PixieContext } from "@/lib/ai/prompts";

export const scrumPixie = {
  name: "Sprinta",
  role: "scrum" as const,
  section: "sprintPlan" as const,
  build: (ctx: PixieContext) => scrumPrompt(ctx),
};
