import { NextRequest } from "next/server";
import { getProject } from "@/lib/projects";
import { getSafeErrorMessage, jsonError } from "@/lib/api/http";
import { getErrorStatus } from "@/lib/errors";

export async function GET(
  _request: NextRequest,
  context: RouteContext<"/api/projects/[id]">,
) {
  const { id } = await context.params;
  try {
    const project = await getProject(id);
    if (!project) {
      return jsonError("Project not found", 404);
    }
    return Response.json({ project });
  } catch (error) {
    return jsonError(getSafeErrorMessage(error), getErrorStatus(error));
  }
}
