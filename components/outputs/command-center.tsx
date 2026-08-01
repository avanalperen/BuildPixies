"use client";

import { useState } from "react";
import { Check, Copy, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  buildCommandCenter,
  commandCenterToMarkdown,
  type CommandCenterField,
  type CommandCenterModel,
} from "@/lib/command-center";
import type { PartialBlueprint } from "@/types/generation-job";

function Field({
  field,
  className,
  tone = "default",
}: {
  field: CommandCenterField;
  className?: string;
  tone?: "default" | "warning";
}) {
  return (
    <section
      className={cn(
        "min-w-0 rounded-xl border border-outline-variant/40 bg-surface/60 p-4",
        tone === "warning" && "border-destructive/25 bg-destructive/5",
        className,
      )}
    >
      <h4 className="mb-2 flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {tone === "warning" && <TriangleAlert className="size-3.5" />}
        {field.label}
      </h4>
      {field.lines.length > 0 ? (
        <ul className="flex flex-col gap-1.5">
          {field.lines.map((line, index) => (
            <li key={index} className="break-words text-sm leading-6">
              {line}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm italic text-muted-foreground">
          Not available in this blueprint yet.
        </p>
      )}
    </section>
  );
}

export function CommandCenter({
  blueprint,
  onCopy,
}: {
  blueprint: PartialBlueprint;
  onCopy?: (markdown: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const model: CommandCenterModel = buildCommandCenter(blueprint);

  function handleCopyPlan() {
    onCopy?.(commandCenterToMarkdown(model, ["firstSprint", "nextActions"]));
    setCopied(true);
    setTimeout(() => setCopied(false), 2_000);
  }

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <Field field={model.product} />

      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        <Field field={model.audience} />
        <Field field={model.problem} />
      </div>

      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        <Field field={model.mustHave} />
        <Field field={model.outOfScope} />
      </div>

      <Field field={model.risks} tone="warning" />

      <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-heading text-sm font-semibold">Start here</h4>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleCopyPlan}
          >
            {copied ? (
              <>
                <Check className="size-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                Copy plan
              </>
            )}
          </Button>
        </div>
        <div className="grid min-w-0 gap-4 md:grid-cols-2">
          <Field field={model.firstSprint} className="bg-white/60" />
          <Field field={model.nextActions} className="bg-white/60" />
        </div>
      </div>
    </div>
  );
}
