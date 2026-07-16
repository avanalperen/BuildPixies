import type { CreateProjectInput } from "@/types/project";
import { generateBlueprint } from "@/lib/ai/orchestrator";
import {
  completeGenerationJob,
  failGenerationJob,
  markGenerationJobRunning,
} from "@/lib/generation-jobs";
import { saveProjectBlueprint, updateProjectStatus } from "@/lib/projects";
import { getSafeErrorMessage } from "@/lib/api/http";

export async function runBlueprintGenerationJob(options: {
  jobId: string;
  projectId?: string;
  input: CreateProjectInput;
}): Promise<void> {
  const { jobId, projectId, input } = options;

  try {
    await markGenerationJobRunning(jobId);
    if (projectId) {
      await updateProjectStatus(projectId, "generating");
    }

    const blueprint = await generateBlueprint(input);

    if (projectId) {
      await saveProjectBlueprint(projectId, blueprint);
    }
    await completeGenerationJob(jobId, blueprint);
  } catch (error) {
    if (projectId) {
      await updateProjectStatus(projectId, "failed").catch(() => undefined);
    }
    await failGenerationJob(jobId, getSafeErrorMessage(error)).catch(
      () => undefined,
    );
  }
}
