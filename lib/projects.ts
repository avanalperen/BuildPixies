import "server-only";

import type { Project, CreateProjectInput } from "@/types/project";
import type { Blueprint, BootcampReport } from "@/types/output";
import { projectSchema } from "@/lib/schemas/project";
import {
  assertStorageAvailable,
  canUseLocalFileStore,
  getSupabaseUserClient,
  localStorePath,
} from "@/lib/storage";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const globalStore = globalThis as unknown as {
  __buildpixiesMemory?: Map<string, Project>;
  __buildpixiesMemoryLoaded?: boolean;
};
const memory: Map<string, Project> =
  globalStore.__buildpixiesMemory ?? new Map<string, Project>();
globalStore.__buildpixiesMemory = memory;

const projectsStorePath = localStorePath("buildpixies-projects.json");

async function hydrateMemoryFromDisk(): Promise<void> {
  if (globalStore.__buildpixiesMemoryLoaded || !canUseLocalFileStore()) return;
  globalStore.__buildpixiesMemoryLoaded = true;
  try {
    const raw = await readFile(projectsStorePath, "utf8");
    const stored = JSON.parse(raw) as unknown;
    if (!Array.isArray(stored)) return;
    stored.forEach((candidate) => {
      const parsed = projectSchema.safeParse(candidate);
      if (parsed.success) memory.set(parsed.data.id, parsed.data);
    });
  } catch {
    // Missing or unreadable local fallback is fine; memory starts empty.
  }
}

async function persistMemoryToDisk(): Promise<void> {
  if (!canUseLocalFileStore()) return;
  try {
    await mkdir(path.dirname(projectsStorePath), { recursive: true });
    await writeFile(
      projectsStorePath,
      JSON.stringify(Array.from(memory.values()), null, 2),
      "utf8",
    );
  } catch {
    // Keep the demo usable even if the local filesystem is read-only.
  }
}

/** Derives a readable title without cutting the last word in half. */
function titleFromIdea(rawIdea: string): string {
  const idea = rawIdea.trim();
  if (idea.length <= 60) return idea;
  const clipped = idea.slice(0, 60);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${(lastSpace > 20 ? clipped.slice(0, lastSpace) : clipped).trimEnd()}…`;
}

function toProject(input: CreateProjectInput): Project {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: input.title?.trim() || titleFromIdea(input.rawIdea) || "Untitled idea",
    rawIdea: input.rawIdea,
    goal: input.goal,
    platform: input.platform,
    targetAudience: input.targetAudience,
    constraints: input.constraints ?? {},
    outputDepth: input.outputDepth ?? "bootcamp-ready",
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };
}

export async function createProject(input: CreateProjectInput): Promise<Project> {
  assertStorageAvailable();
  const project = toProject(input);
  const context = await getSupabaseUserClient();
  if (context) {
    const { supabase, userId } = context;
    const ownedProject = { ...project, ownerId: userId };
    const { error } = await supabase.from("projects").insert({
      id: ownedProject.id,
      owner_id: userId,
      title: ownedProject.title,
      raw_idea: ownedProject.rawIdea,
      goal: ownedProject.goal,
      platform: ownedProject.platform,
      target_audience: ownedProject.targetAudience,
      constraints: ownedProject.constraints,
      output_depth: ownedProject.outputDepth,
      blueprint: ownedProject.blueprint,
      status: ownedProject.status,
      created_at: ownedProject.createdAt,
      updated_at: ownedProject.updatedAt,
    });
    if (error) throw error;
    return ownedProject;
  }
  await hydrateMemoryFromDisk();
  memory.set(project.id, project);
  await persistMemoryToDisk();
  return project;
}

export async function listProjects(): Promise<Project[]> {
  assertStorageAvailable();
  const context = await getSupabaseUserClient();
  if (context) {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("owner_id", userId)
      .order("updated_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(rowToProject);
  }
  await hydrateMemoryFromDisk();
  return Array.from(memory.values()).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );
}

export async function getProject(id: string): Promise<Project | null> {
  assertStorageAvailable();
  const context = await getSupabaseUserClient();
  if (context) {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .eq("owner_id", userId)
      .maybeSingle();
    if (error) throw error;
    return data ? rowToProject(data) : null;
  }
  await hydrateMemoryFromDisk();
  return memory.get(id) ?? null;
}

export async function updateProjectStatus(
  id: string,
  status: Project["status"],
): Promise<void> {
  assertStorageAvailable();
  const updatedAt = new Date().toISOString();
  const context = await getSupabaseUserClient();
  if (context) {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("projects")
      .update({ status, updated_at: updatedAt })
      .eq("id", id)
      .eq("owner_id", userId);
    if (error) throw error;
    return;
  }
  await hydrateMemoryFromDisk();
  const existing = memory.get(id);
  if (existing) {
    memory.set(id, { ...existing, status, updatedAt });
    await persistMemoryToDisk();
  }
}

/**
 * A failed run must not hide a blueprint the project already owns; those
 * projects stay `ready` so the dashboard keeps telling the truth.
 */
export async function markProjectGenerationFailed(id: string): Promise<void> {
  const project = await getProject(id);
  if (!project) return;
  await updateProjectStatus(id, project.blueprint ? "ready" : "failed");
}

export async function saveProjectBlueprint(
  id: string,
  blueprint: Blueprint,
): Promise<void> {
  assertStorageAvailable();
  const updatedAt = new Date().toISOString();
  const context = await getSupabaseUserClient();
  if (context) {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("projects")
      .update({ blueprint, status: "ready", updated_at: updatedAt })
      .eq("id", id)
      .eq("owner_id", userId);
    if (error) throw error;
    return;
  }
  await hydrateMemoryFromDisk();
  const existing = memory.get(id);
  if (existing) {
    memory.set(id, { ...existing, blueprint, status: "ready", updatedAt });
    await persistMemoryToDisk();
  }
}

export async function saveProjectBootcampReport(
  id: string,
  bootcampReport: BootcampReport,
): Promise<void> {
  assertStorageAvailable();
  const updatedAt = new Date().toISOString();
  const context = await getSupabaseUserClient();
  if (context) {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("projects")
      .update({ bootcamp_report: bootcampReport, updated_at: updatedAt })
      .eq("id", id)
      .eq("owner_id", userId);
    if (error) throw error;
    return;
  }
  await hydrateMemoryFromDisk();
  const existing = memory.get(id);
  if (existing) {
    memory.set(id, { ...existing, bootcampReport, updatedAt });
    await persistMemoryToDisk();
  }
}

function rowToProject(row: Record<string, unknown>): Project {
  return projectSchema.parse({
    id: String(row.id),
    ownerId: row.owner_id ? String(row.owner_id) : undefined,
    title: String(row.title ?? ""),
    rawIdea: String(row.raw_idea ?? ""),
    goal: (row.goal as Project["goal"]) ?? "bootcamp",
    platform: (row.platform as Project["platform"]) ?? "web",
    targetAudience: String(row.target_audience ?? ""),
    constraints: (row.constraints as Project["constraints"]) ?? {},
    outputDepth: row.output_depth ?? "bootcamp-ready",
    blueprint: row.blueprint ?? undefined,
    bootcampReport: row.bootcamp_report ?? undefined,
    status: row.status ?? "draft",
    createdAt: String(row.created_at ?? new Date().toISOString()),
    updatedAt: String(row.updated_at ?? new Date().toISOString()),
  });
}
