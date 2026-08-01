import "server-only";

import type { Blueprint } from "@/types/output";
import type {
  GenerationJob,
  GenerationProgress,
} from "@/types/generation-job";
import type { CreateProjectInput } from "@/types/project";
import { generationJobSchema } from "@/lib/schemas/generation-job";
import {
  assertStorageAvailable,
  canUseLocalFileStore,
  getSupabaseUserClient,
  localStorePath,
} from "@/lib/storage";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const globalStore = globalThis as unknown as {
  __buildpixiesGenerationJobs?: Map<string, GenerationJob>;
  __buildpixiesGenerationJobsLoaded?: boolean;
};

const memory: Map<string, GenerationJob> =
  globalStore.__buildpixiesGenerationJobs ?? new Map<string, GenerationJob>();
globalStore.__buildpixiesGenerationJobs = memory;

const jobsStorePath = localStorePath("buildpixies-generation-jobs.json");

async function hydrateMemoryFromDisk(): Promise<void> {
  if (globalStore.__buildpixiesGenerationJobsLoaded || !canUseLocalFileStore()) {
    return;
  }
  globalStore.__buildpixiesGenerationJobsLoaded = true;
  try {
    const raw = await readFile(jobsStorePath, "utf8");
    const stored = JSON.parse(raw) as unknown;
    if (!Array.isArray(stored)) return;
    stored.forEach((candidate) => {
      const parsed = generationJobSchema.safeParse(candidate);
      if (parsed.success) memory.set(parsed.data.id, parsed.data);
    });
  } catch {
    // Missing or unreadable local fallback is fine; memory starts empty.
  }
}

async function persistMemoryToDisk(): Promise<void> {
  if (!canUseLocalFileStore()) return;
  try {
    await mkdir(path.dirname(jobsStorePath), { recursive: true });
    await writeFile(
      jobsStorePath,
      JSON.stringify(Array.from(memory.values()), null, 2),
      "utf8",
    );
  } catch {
    // Keep local generation usable even if the filesystem is read-only.
  }
}

export async function createGenerationJob(input: {
  projectId?: string;
  generationInput: CreateProjectInput;
  progress?: GenerationProgress;
}): Promise<GenerationJob> {
  assertStorageAvailable();
  const context = await getSupabaseUserClient();
  const now = new Date().toISOString();
  const job: GenerationJob = {
    id: crypto.randomUUID(),
    projectId: input.projectId,
    ownerId: context?.userId,
    status: "queued",
    input: input.generationInput,
    progress: input.progress,
    attemptCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  if (context) {
    const { data, error } = await context.supabase
      .from("generation_jobs")
      .insert({
        id: job.id,
        project_id: job.projectId,
        owner_id: context.userId,
        status: job.status,
        input: job.input,
        progress: job.progress,
        attempt_count: job.attemptCount,
        created_at: job.createdAt,
        updated_at: job.updatedAt,
      })
      .select("*")
      .single();
    if (error) throw error;
    return rowToGenerationJob(data);
  }

  await hydrateMemoryFromDisk();
  memory.set(job.id, job);
  await persistMemoryToDisk();
  return job;
}

export async function getGenerationJob(
  id: string,
): Promise<GenerationJob | null> {
  assertStorageAvailable();
  const context = await getSupabaseUserClient();
  if (context) {
    const { data, error } = await context.supabase
      .from("generation_jobs")
      .select("*")
      .eq("id", id)
      .eq("owner_id", context.userId)
      .maybeSingle();
    if (error) throw error;
    return data ? rowToGenerationJob(data) : null;
  }

  await hydrateMemoryFromDisk();
  return memory.get(id) ?? null;
}

/**
 * A worker that dies mid-run leaves its row in `running`. Treating those as
 * active forever would lock the project out of regenerating, so a job that
 * has not reported in for this long no longer counts as in flight.
 */
const staleJobMs = 10 * 60_000;

function isRecentlyActive(job: GenerationJob): boolean {
  if (job.status !== "queued" && job.status !== "running") return false;
  return Date.now() - new Date(job.updatedAt).getTime() < staleJobMs;
}

export async function getActiveGenerationJobForProject(
  projectId: string,
): Promise<GenerationJob | null> {
  assertStorageAvailable();
  const context = await getSupabaseUserClient();
  if (context) {
    const { data, error } = await context.supabase
      .from("generation_jobs")
      .select("*")
      .eq("project_id", projectId)
      .eq("owner_id", context.userId)
      .in("status", ["queued", "running"])
      .gte("updated_at", new Date(Date.now() - staleJobMs).toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data ? rowToGenerationJob(data) : null;
  }

  await hydrateMemoryFromDisk();
  return (
    Array.from(memory.values())
      .filter((job) => job.projectId === projectId && isRecentlyActive(job))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] ?? null
  );
}

export async function markGenerationJobRunning(
  id: string,
  progress?: GenerationProgress,
): Promise<GenerationJob | null> {
  return updateGenerationJob(id, {
    status: "running",
    progress,
    startedAt: new Date().toISOString(),
  });
}

export async function setGenerationJobProgress(
  id: string,
  progress: GenerationProgress,
): Promise<GenerationJob | null> {
  return updateGenerationJob(id, { progress });
}

export async function completeGenerationJob(
  id: string,
  blueprint: Blueprint,
): Promise<GenerationJob | null> {
  return updateGenerationJob(id, {
    status: "succeeded",
    blueprint,
    completedAt: new Date().toISOString(),
  });
}

export async function failGenerationJob(
  id: string,
  error: string,
): Promise<GenerationJob | null> {
  return updateGenerationJob(id, {
    status: "failed",
    error,
    completedAt: new Date().toISOString(),
  });
}

export async function setGenerationJobQueueMessage(
  id: string,
  queueMessageId: string | null,
): Promise<GenerationJob | null> {
  if (!queueMessageId) return getGenerationJob(id);
  return updateGenerationJob(id, { queueMessageId });
}

async function updateGenerationJob(
  id: string,
  patch: Partial<GenerationJob>,
): Promise<GenerationJob | null> {
  assertStorageAvailable();
  const updatedAt = new Date().toISOString();
  const context = await getSupabaseUserClient();
  if (context) {
    const { data, error } = await context.supabase
      .from("generation_jobs")
      .update({
        status: patch.status,
        error: patch.error,
        blueprint: patch.blueprint,
        progress: patch.progress,
        queue_message_id: patch.queueMessageId,
        updated_at: updatedAt,
        started_at: patch.startedAt,
        completed_at: patch.completedAt,
      })
      .eq("id", id)
      .eq("owner_id", context.userId)
      .select("*")
      .maybeSingle();
    if (error) throw error;
    return data ? rowToGenerationJob(data) : null;
  }

  await hydrateMemoryFromDisk();
  const existing = memory.get(id);
  if (!existing) return null;
  const definedPatch = Object.fromEntries(
    Object.entries(patch).filter(([, value]) => value !== undefined),
  );
  const next = { ...existing, ...definedPatch, updatedAt };
  memory.set(id, next);
  await persistMemoryToDisk();
  return next;
}

function rowToGenerationJob(row: Record<string, unknown>): GenerationJob {
  return generationJobSchema.parse({
    id: String(row.id),
    projectId: row.project_id ? String(row.project_id) : undefined,
    ownerId: row.owner_id ? String(row.owner_id) : undefined,
    status: row.status as GenerationJob["status"],
    error: row.error ? String(row.error) : undefined,
    input: row.input as GenerationJob["input"],
    blueprint: row.blueprint as GenerationJob["blueprint"],
    progress: (row.progress as GenerationJob["progress"]) ?? undefined,
    attemptCount:
      typeof row.attempt_count === "number" ? row.attempt_count : undefined,
    leaseExpiresAt: row.lease_expires_at
      ? String(row.lease_expires_at)
      : undefined,
    queueMessageId: row.queue_message_id
      ? String(row.queue_message_id)
      : undefined,
    createdAt: String(row.created_at ?? new Date().toISOString()),
    updatedAt: String(row.updated_at ?? new Date().toISOString()),
    startedAt: row.started_at ? String(row.started_at) : undefined,
    completedAt: row.completed_at ? String(row.completed_at) : undefined,
  });
}
