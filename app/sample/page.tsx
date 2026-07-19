import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Workspace } from "@/components/project/workspace";
import { sampleProject } from "@/lib/sample-data";

export const metadata: Metadata = {
  title: "Sample Blueprint Workspace",
};

export default function SampleProjectPage() {
  return (
    <AppShell active="projects">
      <div className="mx-auto w-full max-w-[1640px] px-4 py-6 md:px-10 md:py-10">
        <nav className="mb-6 flex items-center justify-between" aria-label="Breadcrumb">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <ChevronRight className="size-4" />
            <span className="max-w-[60vw] truncate text-foreground">{sampleProject.title} (Sample)</span>
          </div>
          <Link href="/projects/new" className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20">
            Create your own <ExternalLink className="size-3" />
          </Link>
        </nav>
        <Workspace project={sampleProject} />
      </div>
    </AppShell>
  );
}
