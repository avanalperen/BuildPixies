export type PixieRole =
  | "orchestrator"
  | "product"
  | "market"
  | "ux"
  | "tech"
  | "code"
  | "docs"
  | "qa"
  | "scrum";

export type PixieStatus =
  | "waiting"
  | "thinking"
  | "drafting"
  | "done"
  | "needs_review"
  | "failed";

export interface Pixie {
  name: string;
  role: PixieRole;
  title: string;
  personality: string;
  produces: string;
  emoji: string;
  accent: string;
}

export interface PixieRun {
  id: string;
  projectId: string;
  pixieName: string;
  role: PixieRole;
  status: PixieStatus;
  input: unknown;
  output: unknown;
  error?: string;
  createdAt: string;
}

export const PIXIES: Pixie[] = [
  {
    name: "Pip",
    role: "orchestrator",
    title: "Orchestrator Pixie",
    personality: "Takım kaptanı",
    produces: "Fikri analiz eder, işleri dağıtır",
    emoji: "✨",
    accent: "oklch(0.55 0.22 286)",
  },
  {
    name: "Pria",
    role: "product",
    title: "Product Pixie",
    personality: "Stratejik",
    produces: "Problem, hedef kitle, değer önerisi",
    emoji: "🌸",
    accent: "oklch(0.62 0.18 330)",
  },
  {
    name: "Moxie",
    role: "market",
    title: "Market Pixie",
    personality: "Gerçekçi",
    produces: "Rakipler, pazar açısı, farklılaşma",
    emoji: "📈",
    accent: "oklch(0.65 0.15 230)",
  },
  {
    name: "Luma",
    role: "ux",
    title: "UX Pixie",
    personality: "Yaratıcı",
    produces: "Kullanıcı akışı, ekran haritası",
    emoji: "🎨",
    accent: "oklch(0.7 0.12 165)",
  },
  {
    name: "Tinker",
    role: "tech",
    title: "Tech Pixie",
    personality: "Mimar",
    produces: "Stack, veri modeli, API planı",
    emoji: "🔧",
    accent: "oklch(0.6 0.16 230)",
  },
  {
    name: "Bitsy",
    role: "code",
    title: "Code Pixie",
    personality: "Pratik",
    produces: "Dosya ağacı, kod iskeleti",
    emoji: "💾",
    accent: "oklch(0.55 0.2 286)",
  },
  {
    name: "Quill",
    role: "docs",
    title: "Docs Pixie",
    personality: "Düzenli",
    produces: "README, pitch, proje dokümanı",
    emoji: "🪶",
    accent: "oklch(0.7 0.12 165)",
  },
  {
    name: "Bugsy",
    role: "qa",
    title: "QA Pixie",
    personality: "Şüpheci",
    produces: "Test senaryoları, riskler",
    emoji: "🐞",
    accent: "oklch(0.6 0.18 22)",
  },
  {
    name: "Sprinta",
    role: "scrum",
    title: "Scrum Pixie",
    personality: "Planlayıcı",
    produces: "Backlog, sprint planı, retro notları",
    emoji: "🗂️",
    accent: "oklch(0.82 0.14 75)",
  },
];

export function getPixie(name: string): Pixie | undefined {
  return PIXIES.find((p) => p.name.toLowerCase() === name.toLowerCase());
}

export function getPixieByRole(role: PixieRole): Pixie | undefined {
  return PIXIES.find((p) => p.role === role);
}
