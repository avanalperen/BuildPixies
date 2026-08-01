import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Workspace } from "@/components/project/workspace";
import { getLatestGenerationJobForProject } from "@/lib/generation-jobs";
import { getProject } from "@/lib/projects";
import { parseOutputGroup, outputGroupParam } from "@/lib/output-groups";
import { resourceIdSchema } from "@/lib/api/schemas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Project workspace",
};

export default async function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const initialGroup = parseOutputGroup((await searchParams)[outputGroupParam]);
  if (!resourceIdSchema.safeParse(id).success) notFound();
  const project = await getProject(id);
  if (!project) notFound();

  // The last run keeps its progress and partial sections visible after a
  // refresh, whether it is still going or stopped early.
  const latestJob = await getLatestGenerationJobForProject(project.id).catch(
    () => null,
  );

  return (
    <AppShell active="projects">
      <div className="mx-auto w-full max-w-[1640px] px-4 py-6 md:px-10 md:py-10">
        <nav className="mb-6 flex items-center gap-2 text-sm font-semibold text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/dashboard" className="transition-colors hover:text-primary">Dashboard</Link>
          <ChevronRight className="size-4" />
          <span className="max-w-[60vw] truncate text-foreground">{project.title}</span>
        </nav>
        <Workspace
          project={project}
          latestJob={latestJob}
          initialGroup={initialGroup}
        />
      </div>
    </AppShell>
  );
}
