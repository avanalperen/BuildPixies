import { NextRequest } from "next/server";
import { generateBlueprint } from "@/lib/ai/orchestrator";
import { getProject, saveProjectBlueprint, updateProjectStatus } from "@/lib/projects";
import { checkRateLimit } from "@/lib/api/rate-limit";
import { getSafeErrorMessage, jsonError, parseJsonWithSchema } from "@/lib/api/http";
import { generateBlueprintRequestSchema } from "@/lib/api/schemas";
import { getErrorStatus } from "@/lib/errors";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const limited = checkRateLimit(request, {
    bucket: "ai:generate",
    limit: 5,
    windowMs: 60_000,
  });
  if (limited) return limited;

  const parsed = await parseJsonWithSchema(
    request,
    generateBlueprintRequestSchema,
    { maxBytes: 12_288 },
  );
  if (!parsed.ok) return parsed.response;

  const body = parsed.data;
  let input = body.input;
  let projectExists = false;
  if (body.projectId) {
    const project = await getProject(body.projectId);
    if (!project) {
      return jsonError("Project not found", 404);
    }
    projectExists = true;
    input ??= {
      rawIdea: project.rawIdea,
      goal: project.goal,
      platform: project.platform,
      targetAudience: project.targetAudience,
      constraints: project.constraints,
      outputDepth: project.outputDepth,
    };
  }

  if (body.projectId && projectExists) {
    await updateProjectStatus(body.projectId, "generating");
  }

  if (!input) {
    return jsonError("projectId or input is required", 400);
  }

  try {
    const blueprint = await generateBlueprint(input);
    if (body.projectId) {
      await saveProjectBlueprint(body.projectId, blueprint);
    }
    return Response.json({
      projectId: body.projectId,
      status: "ready",
      blueprint,
    });
  } catch (error) {
    if (body.projectId) {
      await updateProjectStatus(body.projectId, "failed");
    }
    return jsonError(getSafeErrorMessage(error), getErrorStatus(error));
  }
}
