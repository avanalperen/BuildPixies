import type { Blueprint } from "@/types/output";

export function buildSampleBlueprint(rawIdea: string): Blueprint {
  const idea = rawIdea.trim() || "a habit tracker for students";
  return {
    orchestrationPlan: {
      summary:
        "Turn the rough idea into a focused MVP blueprint before writing code.",
      missingInformation: [
        "Exact launch platform",
        "Team size",
        "Must-have integrations",
      ],
      recommendedSequence: [
        "Clarify the core user problem",
        "Choose a narrow MVP scope",
        "Map the first user journey",
        "Build the smallest working demo",
      ],
      guardrails: [
        "Avoid social features before the core loop works",
        "Keep AI calls behind server routes",
      ],
    },
    productBrief: {
      projectName: "Habitly",
      oneLiner: `An AI-assisted ${idea.toLowerCase()} that keeps users consistent.`,
      problem: `People struggle to stay consistent with ${idea}. Existing tools track but do not nudge.`,
      targetUsers: ["Students", "Solo founders", "Self-improvement beginners"],
      mainValue: "Gentle AI nudges that turn intentions into daily habits.",
      useCases: [
        "Morning routine tracking",
        "Study streaks",
        "Weekly reflection",
      ],
      successMetrics: [
        "7-day retention > 40%",
        "Average streak length > 5 days",
      ],
    },
    marketAnalysis: {
      competitors: ["Habitica", "Streaks", "Notion habit templates"],
      positioning:
        "A beginner-friendly AI planning and habit consistency tool for students.",
      differentiation: [
        "AI nudges are tied to the user's stated goal",
        "Bootcamp-ready roadmap and demo checklist are included",
      ],
      marketRisks: [
        "Habit tracking is crowded",
        "Users may ignore notifications if nudges are generic",
      ],
    },
    mvpScope: {
      mustHave: [
        { feature: "Create habit", why: "Core action of the product" },
        { feature: "Daily check-in", why: "Drives the streak loop" },
        { feature: "Streak counter", why: "Primary motivation" },
        { feature: "AI nudge", why: "Key differentiator" },
      ],
      niceToHave: [
        { feature: "Friends leaderboard", whyLater: "Needs social graph" },
        { feature: "Widget", whyLater: "Platform-specific work" },
      ],
      outOfScope: [
        { feature: "Payment", reason: "Not needed for MVP demo" },
      ],
    },
    uxFlow: {
      journey:
        "Onboard → pick habits → daily check-in → see streak → AI nudge",
      screens: [
        {
          name: "Dashboard",
          purpose: "Show today's habits and streak",
          primaryAction: "Check in",
          emptyState: "Add your first habit",
          errorState: "Could not load habits",
        },
        {
          name: "New Habit",
          purpose: "Create a habit",
          primaryAction: "Save",
          emptyState: "No habit name yet",
          errorState: "Name required",
        },
      ],
    },
    techPlan: {
      recommendedStack: {
        frontend: "Next.js",
        backend: "Next.js Route Handlers",
        database: "Supabase Postgres",
        ai: "OpenAI",
        deploy: "Vercel",
      },
      architecture:
        "Next.js App Router with Route Handlers, Supabase for data and auth, pgvector for memory.",
      databaseTables: ["habits", "checkins", "users"],
      apiRoutes: ["/api/habits", "/api/checkins", "/api/nudge"],
      risks: ["Streak logic edge cases", "AI nudge latency"],
    },
    codeSkeleton: {
      fileTree: [
        {
          path: "app/page.tsx",
          purpose: "Landing or dashboard entry point",
        },
        {
          path: "app/api/habits/route.ts",
          purpose: "Create and list habits through a server route",
        },
        {
          path: "components/habits/habit-card.tsx",
          purpose: "Display each habit and its current streak",
        },
        {
          path: "lib/db/habits.ts",
          purpose: "Keep persistence logic outside UI components",
        },
      ],
      starterTasks: [
        "Create the habits table",
        "Build the new habit form",
        "Implement daily check-in validation",
      ],
      conventions: [
        "Use server routes for writes",
        "Keep AI prompt logic in lib/ai",
        "Validate request bodies before writing to storage",
      ],
    },
    backlog: {
      items: [
        {
          title: "Set up project",
          userStory: "As a dev, I want a Next.js repo so I can start building.",
          priority: "P0",
          sprint: 1,
          acceptanceCriteria: ["Repo exists", "Dev server runs"],
        },
        {
          title: "Create habit",
          userStory: "As a user, I want to create a habit.",
          priority: "P0",
          sprint: 1,
          acceptanceCriteria: ["Form validates", "Habit saved to DB"],
        },
        {
          title: "Daily check-in",
          userStory: "As a user, I want to mark a habit done today.",
          priority: "P0",
          sprint: 2,
          acceptanceCriteria: ["Streak increments", "Cannot double check-in"],
        },
        {
          title: "AI nudge",
          userStory: "As a user, I want a nudge when I forget.",
          priority: "P1",
          sprint: 2,
          acceptanceCriteria: ["Nudge generated", "Shown on dashboard"],
        },
      ],
    },
    testPlan: {
      happyPath: [
        {
          name: "Create habit",
          type: "happy",
          steps: ["Open app", "Click new habit", "Type name", "Save"],
          expectedResult: "Habit appears on dashboard",
        },
      ],
      edgeCases: [
        {
          name: "Duplicate check-in",
          type: "edge",
          steps: ["Check in twice same day"],
          expectedResult: "Second check-in blocked",
        },
      ],
      errorMessages: ["Name is required", "Something went wrong, retry"],
      securityRisks: ["Unauthenticated writes", "Rate limit AI endpoint"],
      demoChecklist: ["Seed data loaded", "Streak reset for demo"],
    },
    sprintPlan: {
      sprints: [
        {
          name: "Sprint 1",
          goal: "Foundation: repo, habits model, create flow",
          items: ["Set up project", "Create habit"],
        },
        {
          name: "Sprint 2",
          goal: "Core loop: check-in, streak, dashboard",
          items: ["Daily check-in", "Streak counter"],
        },
        {
          name: "Sprint 3",
          goal: "AI + polish: nudge, README, demo",
          items: ["AI nudge", "README", "Deploy"],
        },
      ],
    },
    readme: `# Habitly

An AI-assisted habit tracker.

## Problem
People struggle to stay consistent.

## Stack
Next.js, Supabase, OpenAI.
`,
  };
}
