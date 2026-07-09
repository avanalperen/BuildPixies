import { after, NextRequest } from "next/server";
import { createGenerationJob } from "@/lib/generation-jobs";
import { runBlueprintGenerationJob } from "@/lib/generation-runner";
import { getProject } from "@/lib/projects";
import { checkRateLimit } from "@/lib/api/rate-limit";
import { getSafeErrorMessage, jsonError, parseJsonWithSchema } from "@/lib/api/http";
import { generateBlueprintRequestSchema } from "@/lib/api/schemas";
import { getErrorStatus } from "@/lib/errors";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const limited = checkRateLimit(request, {
    bucket: "ai:generation-jobs",
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

  try {
    if (body.projectId) {
      const project = await getProject(body.projectId);
      if (!project) {
        return jsonError("Project not found", 404);
      }
      input ??= {
        rawIdea: project.rawIdea,
        goal: project.goal,
        platform: project.platform,
        targetAudience: project.targetAudience,
        constraints: project.constraints,
        outputDepth: project.outputDepth,
      };
    }

    const generationInput = input;
    if (!generationInput) {
      return jsonError("projectId or input is required", 400);
    }

    const job = await createGenerationJob({ projectId: body.projectId });

    after(() =>
      runBlueprintGenerationJob({
        jobId: job.id,
        projectId: body.projectId,
        input: generationInput,
      }),
    );

    return Response.json({ job }, { status: 202 });
  } catch (error) {
    return jsonError(getSafeErrorMessage(error), getErrorStatus(error));
  }
}
