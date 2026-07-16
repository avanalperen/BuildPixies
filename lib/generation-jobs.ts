import type { Blueprint } from "@/types/output";
import type { GenerationJob } from "@/types/generation-job";
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

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

async function hydrateMemoryFromDisk(): Promise<void> {
  if (globalStore.__buildpixiesGenerationJobsLoaded || !canUseLocalFileStore()) {
    return;
  }
  globalStore.__buildpixiesGenerationJobsLoaded = true;
  try {
    const raw = await readFile(jobsStorePath, "utf8");
    const jobs = JSON.parse(raw) as GenerationJob[];
    jobs.forEach((job) => memory.set(job.id, job));
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
}): Promise<GenerationJob> {
  assertStorageAvailable();
  const context = await getSupabaseUserClient();
  const now = new Date().toISOString();
  const job: GenerationJob = {
    id: newId(),
    projectId: input.projectId,
    ownerId: context?.userId,
    status: "queued",
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

export async function markGenerationJobRunning(
  id: string,
): Promise<GenerationJob | null> {
  return updateGenerationJob(id, {
    status: "running",
    startedAt: new Date().toISOString(),
  });
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
  const next = { ...existing, ...patch, updatedAt };
  memory.set(id, next);
  await persistMemoryToDisk();
  return next;
}

function rowToGenerationJob(row: Record<string, unknown>): GenerationJob {
  return {
    id: String(row.id),
    projectId: row.project_id ? String(row.project_id) : undefined,
    ownerId: row.owner_id ? String(row.owner_id) : undefined,
    status: row.status as GenerationJob["status"],
    error: row.error ? String(row.error) : undefined,
    blueprint: row.blueprint as GenerationJob["blueprint"],
    createdAt: String(row.created_at ?? new Date().toISOString()),
    updatedAt: String(row.updated_at ?? new Date().toISOString()),
    startedAt: row.started_at ? String(row.started_at) : undefined,
    completedAt: row.completed_at ? String(row.completed_at) : undefined,
  };
}
