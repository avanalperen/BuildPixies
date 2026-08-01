import "server-only";

import type { CreateProjectInput } from "@/types/project";
import { generateBlueprint } from "@/lib/ai/orchestrator";
import {
  completeGenerationJob,
  failGenerationJob,
  markGenerationJobRunning,
  setGenerationJobProgress,
} from "@/lib/generation-jobs";
import {
  createGenerationProgressTracker,
  createInitialProgress,
} from "@/lib/generation-progress";
import {
  markProjectGenerationFailed,
  saveProjectBlueprint,
  updateProjectStatus,
} from "@/lib/projects";
import { getSafeErrorMessage } from "@/lib/api/http";

export async function runBlueprintGenerationJob(options: {
  jobId: string;
  projectId?: string;
  input: CreateProjectInput;
}): Promise<void> {
  const { jobId, projectId, input } = options;
  const tracker = createGenerationProgressTracker(async (state) => {
    await setGenerationJobProgress(
      jobId,
      state.progress,
      state.partialBlueprint,
    );
  });

  try {
    await markGenerationJobRunning(jobId, createInitialProgress());
    if (projectId) {
      await updateProjectStatus(projectId, "generating");
    }

    const blueprint = await generateBlueprint(input, tracker.onEvent);
    await tracker.flush();

    if (projectId) {
      await saveProjectBlueprint(projectId, blueprint);
    }
    await completeGenerationJob(jobId, blueprint);
  } catch (error) {
    await tracker.flush().catch(() => undefined);
    if (projectId) {
      await markProjectGenerationFailed(projectId).catch(() => undefined);
    }
    await failGenerationJob(jobId, getSafeErrorMessage(error)).catch(
      () => undefined,
    );
  }
}
