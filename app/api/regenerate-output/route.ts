import { NextRequest } from "next/server";
import { regenerateSection } from "@/lib/ai/orchestrator";
import { checkRateLimit } from "@/lib/api/rate-limit";
import { getSafeErrorMessage, jsonError, parseJsonWithSchema } from "@/lib/api/http";
import { regenerateOutputRequestSchema } from "@/lib/api/schemas";
import { blueprintSchema } from "@/lib/ai/schemas";
import { getErrorStatus } from "@/lib/errors";
import { getProject, saveProjectBlueprint } from "@/lib/projects";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const limited = await checkRateLimit(request, "ai:regenerate");
  if (limited) return limited;

  const parsed = await parseJsonWithSchema(
    request,
    regenerateOutputRequestSchema,
    { maxBytes: 24_576 },
  );
  if (!parsed.ok) return parsed.response;

  const body = parsed.data;
  try {
    let input = body.input;
    let previousOutputs = body.previousOutputs;

    if (body.projectId) {
      const project = await getProject(body.projectId);
      if (!project) {
        return jsonError("Project not found", 404);
      }

      input = {
        rawIdea: project.rawIdea,
        goal: project.goal,
        platform: project.platform,
        targetAudience: project.targetAudience,
        constraints: project.constraints,
        outputDepth: project.outputDepth,
      };
      previousOutputs = project.blueprint;
    }

    if (!input) {
      return jsonError("projectId or input is required", 400);
    }

    const output = await regenerateSection(
      input,
      body.section,
      previousOutputs,
    );
    const blueprint = previousOutputs
      ? blueprintSchema.parse({
          ...previousOutputs,
          [body.section]: output,
        })
      : undefined;

    if (body.projectId && blueprint) {
      await saveProjectBlueprint(body.projectId, blueprint);
    }

    return Response.json({ section: body.section, output, blueprint });
  } catch (error) {
    return jsonError(getSafeErrorMessage(error), getErrorStatus(error));
  }
}
