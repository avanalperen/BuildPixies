"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { GenerationProgressPanel } from "@/components/project/generation-progress";
import { requestJson } from "@/lib/api/client";
import { blueprintSchema } from "@/lib/ai/schemas";
import { exportMarkdown } from "@/lib/export/markdown";
import { generationJobResponseSchema } from "@/lib/schemas/generation-job";
import {
  countCompletedSteps,
  describeActiveSteps,
  isJobActive,
  pixieStatusesFromSteps,
} from "@/lib/pixie-progress";
import type { Project } from "@/types/project";
import type {
  GenerationJob,
  GenerationStep,
  PartialBlueprint,
} from "@/types/generation-job";
import type { Blueprint, BlueprintSection } from "@/types/output";
import type { PixieStatus } from "@/types/pixie";
import { PIXIES } from "@/types/pixie";

const firstPollDelayMs = 1_200;
const maxPollDelayMs = 5_000;
const maxPollMs = 6 * 60_000;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const allDone: Record<string, PixieStatus> = Object.fromEntries(
  PIXIES.map((pixie) => [pixie.name, "done" as PixieStatus]),
);

export function Workspace({
  project,
  latestJob = null,
}: {
  project: Project;
  latestJob?: GenerationJob | null;
}) {
  const resumableJob = isJobActive(latestJob) ? latestJob : null;
  const [blueprint, setBlueprint] = useState<Blueprint | null>(
    project.blueprint ?? null,
  );
  const [loading, setLoading] = useState(Boolean(resumableJob));
  const [error, setError] = useState<string | null>(null);
  const [regeneratingSection, setRegeneratingSection] =
    useState<BlueprintSection | null>(null);
  const [steps, setSteps] = useState<GenerationStep[]>(
    latestJob?.progress?.steps ?? [],
  );
  const [partialBlueprint, setPartialBlueprint] = useState<PartialBlueprint>(
    latestJob?.partialBlueprint ?? {},
  );
  const runIdRef = useRef(0);

  const statuses = useMemo<Record<string, PixieStatus>>(() => {
    if (steps.length > 0) return pixieStatusesFromSteps(steps);
    if (loading) return {};
    return blueprint ? allDone : {};
  }, [steps, loading, blueprint]);

  const pollGenerationJob = useCallback(
    async (jobId: string, runId: number): Promise<GenerationJob> => {
      const deadline = Date.now() + maxPollMs;
      let delay = firstPollDelayMs;

      while (Date.now() < deadline) {
        await wait(delay);
        delay = Math.min(Math.round(delay * 1.35), maxPollDelayMs);
        if (runIdRef.current !== runId) {
          throw new Error("Generation tracking was cancelled");
        }

        const data = await requestJson<unknown>(
          `/api/generation-jobs/${jobId}`,
          undefined,
          "Generation status could not be loaded",
        );
        const { job } = generationJobResponseSchema.parse(data);
        if (job.progress) setSteps(job.progress.steps);
        if (job.partialBlueprint) setPartialBlueprint(job.partialBlueprint);
        if (job.status === "succeeded" || job.status === "failed") return job;
      }

      throw new Error("Generation is still running. Try again in a moment.");
    },
    [],
  );

  const trackGenerationJob = useCallback(
    async (jobId: string, runId: number) => {
      try {
        const finishedJob = await pollGenerationJob(jobId, runId);
        if (runIdRef.current !== runId) return;

        if (finishedJob.status === "failed") {
          throw new Error(finishedJob.error || "Generation failed");
        }
        if (!finishedJob.blueprint) {
          throw new Error("Generation finished without a blueprint");
        }
        setBlueprint(finishedJob.blueprint);
      } catch (err) {
        if (runIdRef.current !== runId) return;
        setError(err instanceof Error ? err.message : "Generation failed");
      } finally {
        if (runIdRef.current === runId) setLoading(false);
      }
    },
    [pollGenerationJob],
  );

  // A run started before this page load keeps reporting into this view.
  // `loading` already starts true for it, so the effect only subscribes.
  const activeJobId = resumableJob?.id;
  useEffect(() => {
    if (!activeJobId) return;
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    void trackGenerationJob(activeJobId, runId);
    return () => {
      if (runIdRef.current === runId) runIdRef.current += 1;
    };
  }, [activeJobId, trackGenerationJob]);

  async function handleGenerate() {
    if (loading || regeneratingSection) return;
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    setLoading(true);
    setError(null);
    setSteps([]);
    setPartialBlueprint({});

    try {
      const data = await requestJson<unknown>(
        "/api/generation-jobs",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId: project.id }),
        },
        "Generation failed",
      );
      const { job } = generationJobResponseSchema.parse(data);
      if (job.progress) setSteps(job.progress.steps);
      if (job.partialBlueprint) setPartialBlueprint(job.partialBlueprint);
      await trackGenerationJob(job.id, runId);
    } catch (err) {
      if (runIdRef.current !== runId) return;
      setError(err instanceof Error ? err.message : "Generation failed");
      setLoading(false);
    }
  }

  async function handleExport() {
    if (!blueprint) return;
    setError(null);
    try {
      const data = await requestJson<{
        markdown?: unknown;
        filename?: unknown;
      }>(
        "/api/export-readme",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId: project.id }),
        },
        "Export failed",
      );
      if (typeof data.markdown !== "string") {
        throw new Error("Export returned an invalid document");
      }
      const blob = new Blob([data.markdown], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        typeof data.filename === "string" ? data.filename : "README.md";
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
      const data = await requestJson<{ json?: unknown; filename?: unknown }>(
        "/api/export-json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId: project.id }),
        },
        "Export failed",
      );
      if (typeof data.json !== "string") {
        throw new Error("Export returned invalid JSON");
      }
      const blob = new Blob([data.json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        typeof data.filename === "string" ? data.filename : "blueprint.json";
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
      const data = await requestJson<{
        blueprint?: unknown;
      }>(
        "/api/regenerate-output",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId: project.id,
            section,
          }),
        },
        "Regenerate failed",
      );
      if (!data.blueprint) {
        throw new Error("Regeneration returned an invalid blueprint");
      }
      setBlueprint(blueprintSchema.parse(data.blueprint));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Regenerate failed");
    } finally {
      setRegeneratingSection(null);
    }
  }

  const activeStepLabel = describeActiveSteps(steps);
  const completedSteps = countCompletedSteps(steps);
  const completedSections = Object.keys(partialBlueprint).length;
  const statusMessage = loading
    ? activeStepLabel
      ? `${completedSteps} of ${steps.length} sections ready. Working on ${activeStepLabel}.`
      : "The generation job is queued."
    : error
      ? error
      : blueprint
        ? "The blueprint is ready."
        : "The blueprint has not been generated yet.";

  return (
    <div className={`flex min-w-0 flex-col gap-8${blueprint ? " pb-24 lg:pb-0" : ""}`} aria-busy={loading}>
      <p className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </p>
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
            <button type="button" onClick={handleGenerate} disabled={loading || regeneratingSection !== null} className="magic-button inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50">
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
              {loading
                ? steps.length > 0
                  ? `${completedSteps}/${steps.length} sections`
                  : "Queued"
                : blueprint
                  ? "Ready"
                  : "Waiting"}
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
              Blueprint Output
            </h2>
            <span className="rounded-md bg-surface-container px-2 py-1 text-xs font-medium text-muted-foreground">
              {loading ? "Drafting..." : blueprint ? "Auto-saved" : "Not started"}
            </span>
          </header>
          <div className="relative z-10 min-w-0 p-4 md:p-6">
            {loading ? (
              <div className="flex min-h-[480px] flex-col gap-5">
                <p className="text-sm text-muted-foreground">
                  {activeStepLabel
                    ? `Working on ${activeStepLabel}.`
                    : "The generation job is queued. You can leave this page — progress is saved with the job."}
                </p>
                {steps.length > 0 && (
                  <GenerationProgressPanel
                    steps={steps}
                    partialBlueprint={partialBlueprint}
                  />
                )}
                {blueprint && (
                  <p className="text-xs text-muted-foreground">
                    Your previous blueprint stays saved until the new one is ready.
                  </p>
                )}
              </div>
            ) : blueprint ? (
              <OutputHub
                project={project}
                blueprint={blueprint}
                onExport={handleExport}
                onExportJson={handleExportJson}
                onCopyMarkdown={handleCopyMarkdown}
                onRegenerate={handleRegenerate}
                regeneratingSection={regeneratingSection}
              />
            ) : completedSections > 0 ? (
              // The run stopped early, but the sections it finished are real.
              <div className="flex min-h-[480px] flex-col gap-5">
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                  <h3 className="font-heading text-sm font-semibold">
                    The run stopped before every section was ready
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {completedSections} of {steps.length} sections were produced
                    and saved. Generate again to complete the blueprint.
                  </p>
                </div>
                <GenerationProgressPanel
                  steps={steps}
                  partialBlueprint={partialBlueprint}
                />
              </div>
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

      {blueprint && !loading && (
        <nav className="glass-panel fixed bottom-24 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-center gap-2 overflow-x-auto rounded-full px-4 py-2.5 shadow-xl sm:gap-4 sm:px-6 sm:py-3 md:w-auto md:max-w-none lg:bottom-4 lg:ml-[140px]" aria-label="Blueprint actions">

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
