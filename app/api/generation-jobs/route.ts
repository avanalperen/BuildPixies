import { after, NextRequest } from "next/server";
import {
  createGenerationJob,
  failGenerationJob,
  getActiveGenerationJobForProject,
  setGenerationJobQueueMessage,
} from "@/lib/generation-jobs";
import {
  enqueueBlueprintGeneration,
  shouldUseDurableGenerationQueue,
} from "@/lib/generation-queue";
import { createInitialProgress } from "@/lib/generation-progress";
import { runBlueprintGenerationJob } from "@/lib/generation-runner";
import { markProjectGenerationFailed, getProject } from "@/lib/projects";
import { checkRateLimit } from "@/lib/api/rate-limit";
import { getSafeErrorMessage, jsonError, parseJsonWithSchema } from "@/lib/api/http";
import { generateBlueprintRequestSchema } from "@/lib/api/schemas";
import { getErrorStatus, ServiceUnavailableError } from "@/lib/errors";
import { getSupabaseAdminConfig } from "@/lib/supabase/admin-config";

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  const limited = await checkRateLimit(request, "ai:generation-jobs");
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

      // One run per project: a second click must join the run in flight
      // instead of paying for a duplicate pipeline.
      const runningJob = await getActiveGenerationJobForProject(project.id);
      if (runningJob) {
        return Response.json({ job: runningJob }, { status: 202 });
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

    const useDurableQueue = shouldUseDurableGenerationQueue();
    if (useDurableQueue && !getSupabaseAdminConfig()) {
      throw new ServiceUnavailableError(
        "Blueprint generation is not fully configured",
      );
    }

    const job = await createGenerationJob({
      projectId: body.projectId,
      generationInput,
      progress: createInitialProgress(),
    });

    if (useDurableQueue) {
      try {
        const messageId = await enqueueBlueprintGeneration(job.id);
        await setGenerationJobQueueMessage(job.id, messageId);
      } catch {
        await failGenerationJob(job.id, "Background queue unavailable").catch(
          () => undefined,
        );
        if (body.projectId) {
          await markProjectGenerationFailed(body.projectId).catch(
            () => undefined,
          );
        }
        throw new ServiceUnavailableError(
          "Blueprint generation is temporarily unavailable",
        );
      }
    } else {
      after(() =>
        runBlueprintGenerationJob({
          jobId: job.id,
          projectId: body.projectId,
          input: generationInput,
        }),
      );
    }

    return Response.json({ job }, { status: 202 });
  } catch (error) {
    return jsonError(getSafeErrorMessage(error), getErrorStatus(error));
  }
}
