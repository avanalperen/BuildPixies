import "server-only";

import type { Blueprint } from "@/types/output";
import type { CreateProjectInput } from "@/types/project";
import { generateBlueprint } from "@/lib/ai/orchestrator";
import { getSafeErrorMessage } from "@/lib/api/http";
import { createProjectInputSchema } from "@/lib/api/schemas";
import { createAdminClient } from "@/lib/supabase/admin";

const LEASE_SECONDS = 600;

interface ClaimedGenerationJob {
  id: string;
  input: CreateProjectInput;
  leaseToken: string;
  attemptCount: number;
}

type ClaimResult =
  | { state: "claimed"; job: ClaimedGenerationJob }
  | { state: "busy" | "terminal" | "missing" };

export class GenerationLeaseBusyError extends Error {
  constructor() {
    super("Generation job is already being processed");
    this.name = "GenerationLeaseBusyError";
  }
}

export class GenerationAttemptError extends Error {
  constructor(
    readonly jobId: string,
    readonly attemptCount: number,
    message: string,
  ) {
    super(message);
    this.name = "GenerationAttemptError";
  }
}

function firstRow(data: unknown): Record<string, unknown> | null {
  if (Array.isArray(data)) {
    const row = data[0];
    return row && typeof row === "object"
      ? (row as Record<string, unknown>)
      : null;
  }
  return data && typeof data === "object"
    ? (data as Record<string, unknown>)
    : null;
}

async function failInvalidJob(jobId: string): Promise<ClaimResult> {
  await failDurableGenerationJob(jobId, "Invalid generation job input");
  return { state: "terminal" };
}

async function claimGenerationJob(jobId: string): Promise<ClaimResult> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("claim_generation_job", {
    p_job_id: jobId,
    p_lease_seconds: LEASE_SECONDS,
  });
  if (error) throw error;

  const row = firstRow(data);
  if (row) {
    const parsedInput = createProjectInputSchema.safeParse(row.input);
    const leaseToken =
      typeof row.lease_token === "string" ? row.lease_token : null;
    if (!parsedInput.success || !leaseToken) {
      return failInvalidJob(jobId);
    }
    return {
      state: "claimed",
      job: {
        id: String(row.id),
        input: parsedInput.data,
        leaseToken,
        attemptCount:
          typeof row.attempt_count === "number" ? row.attempt_count : 1,
      },
    };
  }

  const { data: existing, error: readError } = await supabase
    .from("generation_jobs")
    .select("status,input")
    .eq("id", jobId)
    .maybeSingle();
  if (readError) throw readError;
  if (!existing) return { state: "missing" };
  if (existing.status === "succeeded" || existing.status === "failed") {
    return { state: "terminal" };
  }
  if (!existing.input) return failInvalidJob(jobId);
  return { state: "busy" };
}

async function completeGenerationJob(
  job: ClaimedGenerationJob,
  blueprint: Blueprint,
): Promise<void> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("complete_generation_job", {
    p_job_id: job.id,
    p_lease_token: job.leaseToken,
    p_blueprint: blueprint,
  });
  if (error) throw error;
  if (!data) throw new GenerationLeaseBusyError();
}

async function releaseGenerationJob(
  job: ClaimedGenerationJob,
  errorMessage: string,
): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.rpc("release_generation_job", {
    p_job_id: job.id,
    p_lease_token: job.leaseToken,
    p_error: errorMessage,
  });
  if (error) throw error;
}

export async function failDurableGenerationJob(
  jobId: string,
  errorMessage: string,
): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.rpc("fail_generation_job_permanently", {
    p_job_id: jobId,
    p_error: errorMessage,
  });
  if (error) throw error;
}

export async function runDurableGenerationJob(jobId: string): Promise<void> {
  const claim = await claimGenerationJob(jobId);
  if (claim.state !== "claimed") {
    if (claim.state === "busy") throw new GenerationLeaseBusyError();
    return;
  }

  const { job } = claim;
  try {
    const blueprint = await generateBlueprint(job.input);
    await completeGenerationJob(job, blueprint);
  } catch (error) {
    if (error instanceof GenerationLeaseBusyError) throw error;
    const message = getSafeErrorMessage(error);
    console.error("Blueprint generation attempt failed", {
      jobId: job.id,
      attemptCount: job.attemptCount,
      errorName: error instanceof Error ? error.name : "UnknownError",
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    });
    await releaseGenerationJob(job, message).catch(() => undefined);
    throw new GenerationAttemptError(job.id, job.attemptCount, message);
  }
}
