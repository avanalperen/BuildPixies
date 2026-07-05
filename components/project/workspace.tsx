"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PixieTeam } from "@/components/pixies/pixie-team";
import { OutputHub } from "@/components/outputs/output-hub";
import type { Project } from "@/types/project";
import type { GenerationJob } from "@/types/generation-job";
import type { Blueprint } from "@/types/output";
import type { PixieStatus } from "@/types/pixie";
import { PIXIES } from "@/types/pixie";

const pipelineNames = PIXIES.map((pixie) => pixie.name);
const pollDelayMs = 1500;
const maxPollAttempts = 120;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function Workspace({ project }: { project: Project }) {
  const [blueprint, setBlueprint] = useState<Blueprint | null>(
    project.blueprint ?? null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="flex flex-col gap-4 rounded-2xl border bg-card p-5">
        <div className="min-w-0">
          <h2 className="break-words font-heading font-semibold">
            {project.title}
          </h2>
          <p className="break-words text-sm text-muted-foreground">
            {project.rawIdea}
          </p>
        </div>
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <span>Goal: {project.goal}</span>
          <span>Platform: {project.platform}</span>
          <span>Audience: {project.targetAudience}</span>
        </div>
        <Button onClick={handleGenerate} disabled={loading} className="pixie-glow">
          {loading ? "Pixies are working..." : blueprint ? "Regenerate" : "Generate blueprint"}
        </Button>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
      </aside>

      <div className="min-w-0 flex flex-col gap-6" aria-live="polite">
        <section>
          <h3 className="mb-3 font-heading text-sm font-medium text-muted-foreground">
            Pixie team
          </h3>
          <PixieTeam statuses={statuses} />
        </section>

        {blueprint ? (
          <section>
            <h3 className="mb-3 font-heading text-sm font-medium text-muted-foreground">
              Blueprint
            </h3>
            <OutputHub project={project} blueprint={blueprint} onExport={handleExport} />
          </section>
        ) : (
          <section className="rounded-2xl border border-dashed bg-card p-6">
            <h3 className="font-heading text-lg font-semibold">
              No blueprint yet
            </h3>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Generate a blueprint to create the product brief, market angle,
              MVP scope, UX flow, tech plan, code skeleton, backlog, tests and
              README export for this idea.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
