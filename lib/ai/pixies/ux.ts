import { uxPrompt } from "@/lib/ai/prompts";
import type { PixieContext } from "@/lib/ai/prompts";

export const uxPixie = {
  name: "Luma",
  role: "ux" as const,
  section: "uxFlow" as const,
  build: (ctx: PixieContext) => uxPrompt(ctx),
};
