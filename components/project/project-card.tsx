import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Project } from "@/types/project";

const presentation: Record<
  Project["status"],
  { count: number; label: string; dot: string; progress: string }
> = {
  draft: {
    count: 0,
    label: "Waiting for Idea",
    dot: "bg-outline-variant",
    progress: "bg-outline-variant",
  },
  generating: {
    count: 3,
    label: "Drafting UX Flow",
    dot: "bg-primary-fixed-dim",
    progress: "bg-primary/50",
  },
  ready: {
    count: 7,
    label: "Blueprint Ready",
    dot: "bg-[#ffb95f] shadow-[0_0_8px_rgba(255,185,95,0.8)]",
    progress: "bg-gradient-to-r from-[#6063ee] to-primary",
  },
  failed: {
    count: 1,
    label: "Needs Attention",
    dot: "bg-destructive",
    progress: "bg-destructive/60",
  },
};

const platformLabels: Record<Project["platform"], string> = {
  web: "Web App",
  mobile: "Mobile App",
  extension: "Browser Extension",
  "ai-tool": "AI Tool",
  marketplace: "Marketplace",
  desktop: "Desktop App",
};

export function ProjectCard({ project }: { project: Project }) {
  const state = presentation[project.status];
  const percent = Math.round((state.count / 7) * 100);

  return (
    <article className="app-card group relative flex min-h-[244px] flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(11,28,48,0.08)]">
      {project.status === "ready" && (
        <Sparkles className="absolute top-4 right-4 size-5 text-[#ffb95f]" fill="currentColor" aria-hidden="true" />
      )}
      <div className="mb-4 pr-6">
        <span className="mb-2 inline-block rounded-md bg-surface-high px-2.5 py-1 text-xs font-medium text-primary">
          {platformLabels[project.platform]}
        </span>
        <h2 className="line-clamp-2 font-heading text-2xl leading-8 font-medium transition-colors group-hover:text-primary">
          {project.title}
        </h2>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-medium">
          <span className="text-muted-foreground">Pixies Assembled</span>
          <span className="font-semibold text-primary">{state.count}/7</span>
        </div>
        <span className="block h-1.5 overflow-hidden rounded-full bg-surface-container">
          <span className={`block h-full rounded-full ${state.progress}`} style={{ width: `${percent}%` }} />
        </span>
      </div>

      <div className="mt-auto flex items-end justify-between border-t border-outline-variant/30 pt-4">
        <div>
          <span className="mb-1 block text-xs font-medium text-muted-foreground">Status</span>
          <span className="flex items-center gap-1.5 text-sm font-semibold">
            <span className={`size-2 rounded-full ${state.dot}`} />
            {state.label}
          </span>
        </div>
        <Link href={`/projects/${project.id}`} aria-label={`Open ${project.title}`} className="flex size-8 items-center justify-center rounded-full bg-surface-low text-primary transition-colors hover:bg-surface-highest">
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </article>
  );
}
