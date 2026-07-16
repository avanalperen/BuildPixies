import type { Blueprint } from "@/types/output";
import type { Project } from "@/types/project";

export function exportJson(project: Project, blueprint: Blueprint): string {
  const payload = {
    project: {
      id: project.id,
      title: project.title,
      rawIdea: project.rawIdea,
      goal: project.goal,
      platform: project.platform,
      targetAudience: project.targetAudience,
    },
    blueprint,
    exportedAt: new Date().toISOString(),
  };

  return JSON.stringify(payload, null, 2);
}
