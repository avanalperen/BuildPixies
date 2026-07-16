import { CheckCircle2, CircleAlert, LoaderCircle, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Pixie, PixieStatus } from "@/types/pixie";

const statusLabel: Record<PixieStatus, string> = {
  waiting: "Waiting",
  thinking: "Thinking",
  drafting: "Drafting",
  done: "Done",
  needs_review: "Needs review",
  failed: "Failed",
};

const statusClass: Record<PixieStatus, string> = {
  waiting: "bg-muted text-muted-foreground",
  thinking: "bg-primary/15 text-primary animate-pulse",
  drafting: "bg-warning/20 text-warning",
  done: "bg-success/20 text-success",
  needs_review: "bg-accent text-accent-foreground",
  failed: "bg-destructive/15 text-destructive",
};

export function PixieCard({
  pixie,
  status = "waiting",
  variant = "grid",
}: {
  pixie: Pixie;
  status?: PixieStatus;
  variant?: "grid" | "compact";
}) {
  if (variant === "compact") {
    const isActive = status === "thinking" || status === "drafting";
    const statusIcon = status === "done"
      ? <CheckCircle2 className="size-5 text-success" fill="currentColor" />
      : status === "failed"
        ? <CircleAlert className="size-5 text-destructive" />
        : isActive
          ? <LoaderCircle className="size-5 animate-spin text-primary" />
          : <Timer className="size-5 text-outline" />;

    return (
      <article
        className={cn(
          "flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md",
          isActive && "pixie-thinking border-2",
          status === "waiting" && "border-outline-variant/30 bg-white/60 opacity-65",
          status === "failed" && "border-destructive/30",
        )}
      >
        <span
          className="flex size-12 shrink-0 items-center justify-center rounded-full text-xl"
          style={{ backgroundColor: `color-mix(in oklch, ${pixie.accent} 12%, transparent)` }}
          aria-hidden="true"
        >
          {pixie.emoji}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-heading text-sm font-semibold">{pixie.name}</span>
          <span className={cn("block truncate text-sm text-muted-foreground", isActive && "font-medium text-primary")}>
            {pixie.title.replace(" Pixie", "")} {isActive ? "• Drafting..." : ""}
          </span>
        </span>
        <span className="shrink-0" aria-label={statusLabel[status]}>{statusIcon}</span>
      </article>
    );
  }

  return (
    <article className="relative flex flex-col gap-2 rounded-2xl border bg-card p-4 transition-shadow hover:pixie-glow" style={{ borderColor: `color-mix(in oklch, ${pixie.accent} 22%, transparent)` }}>
      <div className="flex items-center justify-between">
        <span className="flex size-10 items-center justify-center rounded-xl text-lg" style={{ backgroundColor: `color-mix(in oklch, ${pixie.accent} 12%, transparent)` }}>
          {pixie.emoji}
        </span>
        <Badge variant="secondary" className={cn("font-medium", statusClass[status])}>{statusLabel[status]}</Badge>
      </div>
      <div>
        <p className="font-heading font-semibold">{pixie.name}</p>
        <p className="text-xs text-muted-foreground">{pixie.title}</p>
      </div>
      <p className="text-sm text-muted-foreground">{pixie.produces}</p>
    </article>
  );
}
