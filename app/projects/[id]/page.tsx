import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Workspace } from "@/components/project/workspace";
import { getProject } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <AppShell active="projects">
      <div className="mx-auto w-full max-w-[1640px] px-4 py-6 md:px-10 md:py-10">
        <nav className="mb-6 flex items-center gap-2 text-sm font-semibold text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/dashboard" className="transition-colors hover:text-primary">Dashboard</Link>
          <ChevronRight className="size-4" />
          <span className="max-w-[60vw] truncate text-foreground">{project.title}</span>
        </nav>
        <Workspace project={project} />
      </div>
    </AppShell>
  );
}
