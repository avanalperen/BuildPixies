export type OutputType =
  | "orchestration_plan"
  | "product_brief"
  | "market_analysis"
  | "mvp_scope"
  | "backlog"
  | "ux_flow"
  | "tech_plan"
  | "code_skeleton"
  | "test_plan"
  | "sprint_plan"
  | "readme"
  | "pitch";

export interface OrchestrationPlan {
  summary: string;
  missingInformation: string[];
  recommendedSequence: string[];
  guardrails: string[];
}

export interface ProductBrief {
  projectName: string;
  oneLiner: string;
  problem: string;
  targetUsers: string[];
  mainValue: string;
  useCases: string[];
  successMetrics: string[];
}

export interface MarketAnalysis {
  competitors: string[];
  positioning: string;
  differentiation: string[];
  marketRisks: string[];
}

export interface MvpScope {
  mustHave: { feature: string; why: string }[];
  niceToHave: { feature: string; whyLater: string }[];
  outOfScope: { feature: string; reason: string }[];
}

export interface BacklogItem {
  title: string;
  userStory: string;
  priority: "P0" | "P1" | "P2";
  sprint: number;
  acceptanceCriteria: string[];
}

export interface Backlog {
  items: BacklogItem[];
}

export interface UxFlowScreen {
  name: string;
  purpose: string;
  primaryAction: string;
  emptyState?: string;
  errorState?: string;
}

export interface UxFlow {
  journey: string;
  screens: UxFlowScreen[];
}

export interface TechPlan {
  recommendedStack: {
    frontend?: string;
    backend?: string;
    database?: string;
    ai?: string;
    deploy?: string;
  };
  architecture: string;
  databaseTables: string[];
  apiRoutes: string[];
  risks: string[];
}

export interface CodeSkeleton {
  fileTree: {
    path: string;
    purpose: string;
  }[];
  starterTasks: string[];
  conventions: string[];
}

export interface TestCase {
  name: string;
  type: "happy" | "edge" | "error";
  steps: string[];
  expectedResult: string;
}

export interface TestPlan {
  happyPath: TestCase[];
  edgeCases: TestCase[];
  errorMessages: string[];
  securityRisks: string[];
  demoChecklist: string[];
}

export interface SprintPlan {
  sprints: {
    name: string;
    goal: string;
    items: string[];
  }[];
}

export interface Blueprint {
  orchestrationPlan: OrchestrationPlan;
  productBrief: ProductBrief;
  marketAnalysis: MarketAnalysis;
  mvpScope: MvpScope;
  uxFlow: UxFlow;
  techPlan: TechPlan;
  codeSkeleton: CodeSkeleton;
  backlog: Backlog;
  testPlan: TestPlan;
  sprintPlan: SprintPlan;
  readme: string;
}

export type BlueprintSection = keyof Blueprint;
