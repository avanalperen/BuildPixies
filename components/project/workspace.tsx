"use client";

import { useState } from "react";
import {
  Copy,
  Download,
  FileText,
  Lightbulb,
  Share2,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { PixieTeam } from "@/components/pixies/pixie-team";
import { OutputHub } from "@/components/outputs/output-hub";
import { BootcampMode } from "@/components/project/bootcamp-mode";
import { exportMarkdown } from "@/lib/export/markdown";
import type { Project } from "@/types/project";
import type { GenerationJob } from "@/types/generation-job";
import type { Blueprint, BlueprintSection } from "@/types/output";
import type { PixieStatus } from "@/types/pixie";
import { PIXIES } from "@/types/pixie";

const pipelineNames = PIXIES.map((pixie) => pixie.name);
const pollDelayMs = 1500;
const maxPollAttempts = 240;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function Workspace({ project }: { project: Project }) {
  const [blueprint, setBlueprint] = useState<Blueprint | null>(
    project.blueprint ?? null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [regeneratingSection, setRegeneratingSection] =
    useState<BlueprintSection | null>(null);
  const [statuses, setStatuses] = useState<Record<string, PixieStatus>>(() => {
    if (!project.blueprint) return {};
    const done: Record<string, PixieStatus> = {};
    PIXIES.forEach((p) => (done[p.name] = "done"));
    return done;
  });

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setBlueprint(null);
    const next: Record<string, PixieStatus> = {};
    PIXIES.forEach((p) => (next[p.name] = "waiting"));
    pipelineNames.forEach((n) => (next[n] = "thinking"));
    setStatuses(next);

    try {
      const res = await fetch("/api/generation-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          input: {
            rawIdea: project.rawIdea,
            goal: project.goal,
            platform: project.platform,
            targetAudience: project.targetAudience,
            constraints: project.constraints,
            outputDepth: project.outputDepth,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      const jobId = data.job?.id as string | undefined;
      if (!jobId) throw new Error("Generation job could not be started");

      const finishedJob = await pollGenerationJob(jobId);
      if (finishedJob.status === "failed") {
        throw new Error(finishedJob.error || "Generation failed");
      }
      if (!finishedJob.blueprint) {
        throw new Error("Generation finished without a blueprint");
      }

      setBlueprint(finishedJob.blueprint);
      const done: Record<string, PixieStatus> = {};
      PIXIES.forEach((p) => (done[p.name] = "done"));
      setStatuses(done);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
      const failed: Record<string, PixieStatus> = {};
      PIXIES.forEach((p) => (failed[p.name] = "failed"));
      setStatuses(failed);
    } finally {
      setLoading(false);
    }
  }

  async function pollGenerationJob(jobId: string): Promise<GenerationJob> {
    for (let attempt = 0; attempt < maxPollAttempts; attempt += 1) {
      await wait(pollDelayMs);
      const res = await fetch(`/api/generation-jobs/${jobId}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Generation status could not be loaded");
      }

      const job = data.job as GenerationJob;
      if (job.status === "succeeded" || job.status === "failed") {
        return job;
      }
    }

    throw new Error("Generation is still running. Try again in a moment.");
  }

  async function handleExport() {
    if (!blueprint) return;
    setError(null);
    try {
      const res = await fetch("/api/export-readme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id, blueprint }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Export failed");
      const blob = new Blob([data.markdown], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = data.filename || "README.md";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed");
    }
  }

  async function handleExportJson() {
    if (!blueprint) return;
    setError(null);
    try {
      const res = await fetch("/api/export-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id, blueprint }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Export failed");
      const blob = new Blob([data.json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = data.filename || "blueprint.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed");
    }
  }

  async function handleCopyMarkdown(markdown: string) {
    setError(null);
    try {
      await navigator.clipboard.writeText(markdown);
    } catch {
      setError("Copy failed. Your browser may not allow clipboard access.");
    }
  }

  async function handleShare() {
    setError(null);
    const shareData = {
      title: project.title,
      text: `BuildPixies blueprint for ${project.title}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await navigator.clipboard.writeText(window.location.href);
    } catch (caught) {
      if (caught instanceof DOMException && caught.name === "AbortError") return;
      setError("Share failed. Copy the page URL and try again.");
    }
  }

  async function handleRegenerate(section: BlueprintSection) {
    if (!blueprint || loading || regeneratingSection) return;
    setError(null);
    setRegeneratingSection(section);
    try {
      const res = await fetch("/api/regenerate-output", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          section,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Regenerate failed");
      setBlueprint((prev) => {
        if (data.blueprint) return data.blueprint as Blueprint;
        return prev ? { ...prev, [section]: data.output } : prev;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Regenerate failed");
    } finally {
      setRegeneratingSection(null);
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-8" aria-live="polite">
      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(240px,0.8fr)_minmax(290px,0.95fr)_minmax(390px,1.35fr)]">
        <section className="app-card flex min-h-[620px] min-w-0 flex-col overflow-hidden">
          <header className="flex items-center gap-2 border-b border-outline-variant/30 bg-surface px-6 py-4">
            <Lightbulb className="size-5 text-primary" />
            <h2 className="font-heading text-2xl leading-8 font-medium">Your Idea</h2>
          </header>
          <div className="flex flex-1 flex-col gap-5 p-6">
            <h1 className="break-words font-heading text-xl leading-7 font-semibold">{project.title}</h1>
            <p className="flex-1 whitespace-pre-wrap break-words text-base leading-7 text-muted-foreground">{project.rawIdea}</p>
            <dl className="grid gap-2 border-t border-outline-variant/30 pt-4 text-xs">
              <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Goal</dt><dd className="font-semibold capitalize">{project.goal}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Platform</dt><dd className="font-semibold capitalize">{project.platform.replace("-", " ")}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Audience</dt><dd className="max-w-[60%] truncate font-semibold">{project.targetAudience}</dd></div>
            </dl>
            <button onClick={handleGenerate} disabled={loading || regeneratingSection !== null} className="magic-button inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50">
              <Sparkles className="size-4" />
              {loading ? "Pixies are working..." : blueprint ? "Regenerate all" : "Generate blueprint"}
            </button>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          </div>
        </section>

        <section className="flex min-h-[620px] min-w-0 flex-col">
          <header className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-heading text-2xl leading-8 font-medium">
              <UsersRound className="size-5 text-secondary" />
              The Pixie Team
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-high px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              {loading ? "Processing" : blueprint ? "Ready" : "Waiting"}
            </span>
          </header>
          <div className="custom-scrollbar max-h-[680px] overflow-y-auto pr-1 pb-2">
            <PixieTeam statuses={statuses} variant="compact" />
          </div>
        </section>

        <section className="app-card relative min-h-[620px] min-w-0 overflow-hidden">
          <div className="pointer-events-none absolute top-0 right-0 size-64 -translate-y-1/2 translate-x-1/3 rounded-full bg-primary/5 blur-3xl" />
          <header className="relative z-10 flex items-center justify-between gap-3 border-b border-outline-variant/30 bg-white/50 px-6 py-4 backdrop-blur-md">
            <h2 className="flex items-center gap-2 font-heading text-2xl leading-8 font-medium">
              <FileText className="size-5 text-tertiary" />
              MVP Scope
            </h2>
            <span className="rounded-md bg-surface-container px-2 py-1 text-xs font-medium text-muted-foreground">
              {loading ? "Drafting..." : blueprint ? "Auto-saved" : "Not started"}
            </span>
          </header>
          <div className="relative z-10 min-w-0 p-4 md:p-6">
            {blueprint ? (
              <OutputHub
                project={project}
                blueprint={blueprint}
                onExport={handleExport}
                onExportJson={handleExportJson}
                onCopyMarkdown={handleCopyMarkdown}
                onRegenerate={handleRegenerate}
                regeneratingSection={regeneratingSection}
              />
            ) : (
              <div className="flex min-h-[480px] flex-col items-center justify-center rounded-xl border border-dashed border-outline-variant bg-surface/55 p-8 text-center">
                <span className="mb-5 flex size-14 items-center justify-center rounded-full bg-primary-fixed text-primary"><FileText className="size-6" /></span>
                <h3 className="font-heading text-lg font-semibold">No blueprint yet</h3>
                <p className="mt-2 max-w-sm text-sm leading-5 text-muted-foreground">
                  Generate a blueprint to create the product brief, market angle, MVP scope, UX flow, tech plan, code skeleton, backlog, tests and exports.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <BootcampMode project={project} />

      {blueprint && (
        <nav className="glass-panel fixed bottom-8 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-4 rounded-full px-6 py-3 shadow-xl md:flex lg:ml-[140px]" aria-label="Blueprint actions">
          <button type="button" onClick={handleExport} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-muted-foreground transition-all hover:bg-surface-container hover:text-primary">
            <Download className="size-4" />Download Blueprint
          </button>
          <span className="h-6 w-px bg-outline-variant/30" />
          <button type="button" onClick={() => handleCopyMarkdown(exportMarkdown(project, blueprint))} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-muted-foreground transition-all hover:bg-surface-container hover:text-primary">
            <Copy className="size-4" />Copy Markdown
          </button>
          <span className="h-6 w-px bg-outline-variant/30" />
          <button type="button" onClick={handleShare} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-muted-foreground transition-all hover:bg-surface-container hover:text-primary">
            <Share2 className="size-4" />Share
          </button>
        </nav>
      )}
    </div>
  );
}
