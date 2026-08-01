"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Download, FileJson, FileText } from "lucide-react";
import { BootcampMode } from "@/components/project/bootcamp-mode";
import { Button } from "@/components/ui/button";
import { requestJson } from "@/lib/api/client";
import type { Project } from "@/types/project";

function download(content: string, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function DeliveryPack({ project }: { project: Project }) {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<"readme" | "json" | null>(null);
  const hasBlueprint = Boolean(project.blueprint);

  async function handleExport(kind: "readme" | "json") {
    setError(null);
    setBusy(kind);
    try {
      if (kind === "readme") {
        const data = await requestJson<{ markdown?: unknown; filename?: unknown }>(
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
        download(
          data.markdown,
          typeof data.filename === "string" ? data.filename : "README.md",
          "text/markdown",
        );
      } else {
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
        download(
          data.json,
          typeof data.filename === "string" ? data.filename : "blueprint.json",
          "application/json",
        );
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Export failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="font-heading text-2xl leading-8 font-semibold tracking-[-0.01em] md:text-[32px] md:leading-10">
          Delivery Pack
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Everything you hand in for {project.title}: the blueprint exports and
          the Scrum documents built from your own progress notes.
        </p>
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to the workspace
        </Link>
      </header>

      <section
        aria-labelledby="delivery-exports-title"
        className="app-card flex flex-col gap-4 p-5 md:p-6"
      >
        <div>
          <h2
            id="delivery-exports-title"
            className="flex items-center gap-2 font-heading text-lg font-semibold"
          >
            <FileText className="size-5 text-tertiary" />
            Blueprint exports
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {hasBlueprint
              ? "Downloaded straight from the saved project, so exports always match what is stored."
              : "Generate the blueprint in the workspace first; exports become available afterwards."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={!hasBlueprint || busy !== null}
            onClick={() => handleExport("readme")}
          >
            <Download className="size-4" />
            {busy === "readme" ? "Preparing..." : "Download README.md"}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={!hasBlueprint || busy !== null}
            onClick={() => handleExport("json")}
          >
            <FileJson className="size-4" />
            {busy === "json" ? "Preparing..." : "Download blueprint.json"}
          </Button>
        </div>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
      </section>

      <BootcampMode project={project} />
    </div>
  );
}
