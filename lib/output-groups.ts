/** Shared between server pages and the client hub, so it must stay framework-free. */
export const groupDescriptions = {
  overview: {
    title: "Overview — the MVP decision",
    hint: "Scope, risks, first sprint and the next three actions on one screen.",
  },
  product: {
    title: "Product — what and for whom",
    hint: "Product brief, MVP scope, market angle, backlog and the build plan.",
  },
  experience: {
    title: "Experience — the user journey",
    hint: "Screens, primary actions and the flow between them.",
  },
  build: {
    title: "Build — how it gets made",
    hint: "Tech plan, code skeleton and the test plan.",
  },
  delivery: {
    title: "Delivery — what you hand in",
    hint: "Sprint plan and the README export.",
  },
} as const;

export type OutputGroup = keyof typeof groupDescriptions;

/** Deep-link parameter, so a demo can point straight at one output group. */
export const outputGroupParam = "view";

export function parseOutputGroup(value: unknown): OutputGroup {
  return typeof value === "string" && value in groupDescriptions
    ? (value as OutputGroup)
    : "overview";
}
