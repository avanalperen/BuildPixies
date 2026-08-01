import { Check, CircleAlert, LoaderCircle, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { countCompletedSteps, sectionLabels } from "@/lib/pixie-progress";
import { previewSection } from "@/lib/section-preview";
import type {
  GenerationStep,
  PartialBlueprint,
} from "@/types/generation-job";

const statusLabel: Record<GenerationStep["status"], string> = {
  pending: "Waiting",
  running: "Drafting",
  done: "Done",
  failed: "Failed",
};

function StepIcon({ status }: { status: GenerationStep["status"] }) {
  if (status === "done") return <Check className="size-4 text-success" />;
  if (status === "failed") {
    return <CircleAlert className="size-4 text-destructive" />;
  }
  if (status === "running") {
    return <LoaderCircle className="size-4 animate-spin text-primary" />;
  }
  return <Minus className="size-4 text-outline" />;
}

export function GenerationProgressPanel({
  steps,
  partialBlueprint,
}: {
  steps: GenerationStep[];
  partialBlueprint?: PartialBlueprint;
}) {
  const completed = countCompletedSteps(steps);
  const percent = steps.length
    ? Math.round((completed / steps.length) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-4" aria-live="polite">
      <div>
        <div className="mb-2 flex items-center justify-between text-xs font-medium">
          <span className="text-muted-foreground">Sections completed</span>
          <span className="font-semibold text-primary">
            {completed}/{steps.length}
          </span>
        </div>
        <span className="block h-1.5 overflow-hidden rounded-full bg-surface-container">
          <span
            className="block h-full rounded-full bg-gradient-to-r from-[#6063ee] to-primary transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </span>
      </div>

      <ul className="flex flex-col gap-1.5">
        {steps.map((step) => {
          const preview = partialBlueprint
            ? previewSection(step.section, partialBlueprint)
            : [];
          const row = (
            <>
              <StepIcon status={step.status} />
              <span className="min-w-0 flex-1">
                <span className="block truncate">
                  {sectionLabels[step.section]}
                </span>
                <span className="block text-xs text-muted-foreground sm:hidden">
                  {step.pixie} · {statusLabel[step.status]}
                </span>
              </span>
              <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
                {step.pixie} · {statusLabel[step.status]}
              </span>
            </>
          );
          const className = cn(
            "rounded-lg border border-outline-variant/30 px-3 py-2 text-sm",
            step.status === "pending" && "opacity-60",
            step.status === "running" && "border-primary/40 bg-primary/5",
            step.status === "failed" && "border-destructive/40",
          );

          // A finished section is readable before the rest of the run ends.
          if (step.status === "done" && preview.length > 0) {
            return (
              <li key={step.section} className={className}>
                <details className="group">
                  <summary className="flex cursor-pointer items-center gap-3 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
                    {row}
                  </summary>
                  <ul className="mt-2 flex flex-col gap-1 border-t border-outline-variant/30 pt-2">
                    {preview.map((line, index) => (
                      <li
                        key={index}
                        className="break-words text-xs text-muted-foreground"
                      >
                        • {line}
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            );
          }

          return (
            <li key={step.section} className={cn(className, "flex items-center gap-3")}>
              {row}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
