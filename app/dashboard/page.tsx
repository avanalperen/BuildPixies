import Link from "next/link";
import { WandSparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { ProjectCard } from "@/components/project/project-card";
import { Button } from "@/components/ui/button";
import { listProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { projects, loadError } = await listProjects().then(
    (items) => ({ projects: items, loadError: null as string | null }),
    () => ({
      projects: [],
      loadError: "Projects could not be loaded. Check storage configuration and try again.",
    }),
  );

  return (
    <AppShell active="dashboard">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 md:px-10 md:py-16">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="font-heading text-2xl leading-8 font-semibold tracking-[-0.01em] md:text-[32px] md:leading-10">
              My Projects
            </h1>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              Manage and track your active pixie teams.
            </p>
          </div>
          <Link href="/projects/new" className="magic-button inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-6 text-sm font-semibold tracking-[0.02em] transition-all md:w-auto">
            <WandSparkles className="size-4" />
            Summon New Team
          </Link>
        </div>

        {loadError ? (
          <div role="alert" className="app-card flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <h2 className="font-heading text-xl font-semibold">Projects are unavailable</h2>
            <p className="max-w-sm text-sm text-muted-foreground">{loadError}</p>
            <Button asChild variant="outline">
              <Link href="/dashboard">Retry</Link>
            </Button>
          </div>
        ) : projects.length === 0 ? (
          <div className="app-card flex flex-col items-center justify-center px-6 py-20 text-center">
            <span className="mb-6 flex size-24 items-center justify-center rounded-full bg-surface-low text-primary/60">
              <WandSparkles className="size-10" />
            </span>
            <h2 className="font-heading text-2xl font-medium">No ideas yet</h2>
            <p className="mt-2 mb-8 max-w-md text-base leading-6 text-muted-foreground">
              Your workspace is quiet. Summon your first pixie team to start building magical experiences.
            </p>
            <Link href="/projects/new" className="magic-button inline-flex h-11 items-center rounded-xl px-5 text-sm font-semibold transition-all">
              Summon your first team
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
