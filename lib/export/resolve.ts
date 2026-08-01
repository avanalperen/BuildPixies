import "server-only";

import { jsonError } from "@/lib/api/http";
import type { Blueprint } from "@/types/output";
import type { Project } from "@/types/project";

type ExportRequest = {
  projectId?: string;
  blueprint?: Blueprint;
};

type ResolvedExport =
  | { ok: true; project: Project; blueprint: Blueprint }
  | { ok: false; response: Response };

function anonymousProject(blueprint: Blueprint): Project {
  const now = new Date().toISOString();
  return {
    id: "export",
    title: "Untitled idea",
    rawIdea: "",
    goal: "bootcamp",
    platform: "web",
    targetAudience: "",
    constraints: {},
    blueprint,
    status: "ready",
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * A stored project is the source of truth for its own export; a blueprint in
 * the body is only used when the caller has no saved project.
 */
export async function resolveExportProject(
  body: ExportRequest,
  loadProject: (id: string) => Promise<Project | null>,
): Promise<ResolvedExport> {
  if (!body.projectId) {
    if (!body.blueprint) {
      return {
        ok: false,
        response: jsonError("projectId or blueprint is required", 400),
      };
    }
    return {
      ok: true,
      project: anonymousProject(body.blueprint),
      blueprint: body.blueprint,
    };
  }

  const project = await loadProject(body.projectId);
  if (!project) {
    return { ok: false, response: jsonError("Project not found", 404) };
  }

  const blueprint = project.blueprint ?? body.blueprint;
  if (!blueprint) {
    return {
      ok: false,
      response: jsonError("This project has no blueprint to export yet", 409),
    };
  }

  return { ok: true, project, blueprint };
}
