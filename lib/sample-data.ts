import type { Project } from "@/types/project";
import type { Blueprint } from "@/types/output";

const sampleBlueprint: Blueprint = {
  orchestrationPlan: {
    summary: "A mobile application for professional dog walkers to track routes, manage schedules, and process payments automatically.",
    missingInformation: ["Specific payment gateway preferences", "Details on walker verification process"],
    recommendedSequence: ["product_brief", "ux_flow", "tech_plan", "backlog"],
    guardrails: ["Ensure GPS tracking is battery efficient", "Secure payment data handling"]
  },
  productBrief: {
    projectName: "DogWalker Pro",
    oneLiner: "The all-in-one route tracking and automated payment solution for professional dog walkers.",
    problem: "Dog walkers struggle with manual route tracking, unreliable client updates, and chasing payments.",
    targetUsers: ["Professional Dog Walkers", "Busy Pet Owners"],
    mainValue: "Automates the administrative burden of dog walking, providing peace of mind to owners and guaranteed payments to walkers.",
    useCases: ["Tracking a walk route via GPS", "Sending automated photo updates", "Processing automatic post-walk payments"],
    successMetrics: ["Walks completed per month", "Payment processing success rate", "Owner retention rate"]
  },
  marketAnalysis: {
    competitors: ["Rover", "Wag!", "Local independent businesses"],
    positioning: "A premium tool for independent professionals rather than a marketplace for gig workers.",
    differentiation: ["Focus on walker empowerment", "Zero marketplace fee (SaaS model)", "Advanced GPS and biometric features"],
    marketRisks: ["High competition from established marketplaces", "GPS tracking privacy concerns"]
  },
  mvpScope: {
    mustHave: [
      { feature: "GPS Route Tracking", why: "Core value proposition for owner peace of mind." },
      { feature: "Automated Payments", why: "Solves the primary pain point for walkers." },
      { feature: "Photo Updates", why: "Standard expectation in the industry." }
    ],
    niceToHave: [
      { feature: "Multi-dog tracking", whyLater: "Adds complexity to MVP UI, can wait for v2." },
      { feature: "In-app messaging", whyLater: "SMS/WhatsApp is sufficient for early validation." }
    ],
    outOfScope: [
      { feature: "Walker marketplace matching", reason: "Strategic decision to focus on SaaS tools for existing professionals." }
    ]
  },
  uxFlow: {
    journey: "Walker starts a walk, tracks the route, sends an update, and completes the walk triggering payment.",
    screens: [
      { name: "Dashboard", purpose: "View today's schedule and start walks.", primaryAction: "Start Walk" },
      { name: "Active Walk", purpose: "Show real-time GPS route and time elapsed.", primaryAction: "Complete Walk" },
      { name: "Walk Summary", purpose: "Review route, add photos, and confirm.", primaryAction: "Send to Owner" }
    ]
  },
  techPlan: {
    recommendedStack: {
      frontend: "React Native (Expo)",
      backend: "Node.js with Express",
      database: "PostgreSQL with PostGIS",
      deploy: "Vercel / AWS"
    },
    architecture: "Client-server model with RESTful APIs. WebSockets or polling for real-time GPS updates.",
    databaseTables: ["Users (Walkers/Owners)", "Dogs", "Schedules", "Walks", "Payments"],
    apiRoutes: ["POST /api/walks/start", "PUT /api/walks/:id/location", "POST /api/walks/:id/complete"],
    risks: ["Battery drain from continuous GPS usage", "Inconsistent mobile network coverage during walks"]
  },
  codeSkeleton: {
    fileTree: [
      { path: "src/screens/DashboardScreen.tsx", purpose: "Main view for walkers" },
      { path: "src/services/LocationTracking.ts", purpose: "Background GPS service" },
      { path: "src/api/paymentClient.ts", purpose: "Stripe integration" }
    ],
    starterTasks: ["Initialize Expo project", "Set up Stripe SDK", "Configure background location permissions"],
    conventions: ["Use functional components", "Strict TypeScript checking", "Prettier for formatting"]
  },
  backlog: {
    items: [
      {
        title: "Implement Background GPS",
        userStory: "As a walker, I want the app to track my location even when screen is locked.",
        priority: "P0",
        sprint: 1,
        acceptanceCriteria: ["Tracks location within 10m accuracy", "Works while app is backgrounded"]
      },
      {
        title: "Stripe Payment Integration",
        userStory: "As a walker, I want payments to be processed automatically upon walk completion.",
        priority: "P0",
        sprint: 2,
        acceptanceCriteria: ["Captures funds successfully", "Handles failed payment methods gracefully"]
      }
    ]
  },
  testPlan: {
    happyPath: [
      { name: "Complete a standard walk", type: "happy", steps: ["Tap Start", "Walk 1km", "Add Photo", "Tap Complete"], expectedResult: "Walk recorded, payment triggered, owner notified." }
    ],
    edgeCases: [
      { name: "Loss of GPS signal", type: "edge", steps: ["Start walk", "Enter tunnel", "Exit tunnel"], expectedResult: "App interpolates path or resumes tracking gracefully without crashing." }
    ],
    errorMessages: ["Payment Failed: Please ask the owner to update their card.", "GPS Required: Enable location services to start a walk."],
    securityRisks: ["Location spoofing", "Unauthorized access to pet locations"],
    demoChecklist: ["Ensure GPS mock data is ready", "Use Stripe test cards"]
  },
  sprintPlan: {
    sprints: [
      { name: "Sprint 1: Core Tracking", goal: "Prove reliable background GPS tracking.", items: ["Initialize app", "Background GPS service", "Basic map UI"] },
      { name: "Sprint 2: Payments & Photos", goal: "Complete the walk flow and monetization.", items: ["Stripe integration", "Camera access", "Walk summary screen"] }
    ]
  },
  readme: "# DogWalker Pro\n\nA premium tool for independent dog walking professionals.\n\n## Getting Started\n1. `npm install`\n2. `npx expo start`"
};

export const sampleProject: Project = {
  id: "sample-project-dog-walker",
  title: "DogWalker Pro",
  rawIdea: "I want an app for dog walkers where they can track their routes and get paid automatically...",
  goal: "startup",
  platform: "mobile",
  targetAudience: "Professional dog walkers and busy pet owners",
  constraints: {
    timeline: "2 months",
    budget: "$5,000"
  },
  outputDepth: "detailed",
  status: "ready",
  blueprint: sampleBlueprint,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
