import { productPrompt } from "@/lib/ai/prompts";
import type { PixieContext } from "@/lib/ai/prompts";

export const productPixie = {
  name: "Pria",
  role: "product" as const,
  section: "productBrief" as const,
  build: (ctx: PixieContext) => productPrompt(ctx),
};
