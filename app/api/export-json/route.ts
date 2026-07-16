import { NextRequest } from "next/server";
import { exportJson } from "@/lib/export/json";
import { getProject } from "@/lib/projects";
import {
  getSafeErrorMessage,
  jsonError,
  parseJsonWithSchema,
} from "@/lib/api/http";
import { exportJsonRequestSchema } from "@/lib/api/schemas";
import { getErrorStatus } from "@/lib/errors";

export async function POST(request: NextRequest) {
  const parsed = await parseJsonWithSchema(
    request,
    exportJsonRequestSchema,
    { maxBytes: 96_000 },
  );
  if (!parsed.ok) return parsed.response;

  const body = parsed.data;
  try {
    let project = body.projectId ? await getProject(body.projectId) : null;
    if (!project) {
      project = {
        id: "export",
        title: "Untitled idea",
        rawIdea: "",
        goal: "bootcamp",
        platform: "web",
        targetAudience: "",
        constraints: {},
        blueprint: body.blueprint,
        status: "ready",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    const json = exportJson(project, body.blueprint);
    return Response.json({ json, filename: "blueprint.json" });
  } catch (error) {
    return jsonError(getSafeErrorMessage(error), getErrorStatus(error));
  }
}
