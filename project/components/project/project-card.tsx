import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/project";

const statusVariant: Record<Project["status"], string> = {
  draft: "bg-muted text-muted-foreground",
  generating: "bg-primary/15 text-primary",
  ready: "bg-success/20 text-success",
  failed: "bg-destructive/15 text-destructive",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border bg-card p-5 transition-shadow hover:pixie-glow">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-heading font-semibold text-foreground">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {project.rawIdea}
          </p>
        </div>
        <Badge variant="secondary" className={statusVariant[project.status]}>
          {project.status}
        </Badge>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {new Date(project.updatedAt).toLocaleDateString()}
        </span>
        <Button asChild size="sm" variant="outline">
          <Link href={`/projects/${project.id}`}>Open project</Link>
        </Button>
      </div>
    </div>
  );
}
