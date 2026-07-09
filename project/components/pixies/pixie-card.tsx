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
}: {
  pixie: Pixie;
  status?: PixieStatus;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 rounded-2xl border bg-card p-4 transition-shadow hover:pixie-glow",
      )}
      style={{ borderColor: `${pixie.accent}33` }}
    >
      <div className="flex items-center justify-between">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
          style={{ backgroundColor: `${pixie.accent}1a` }}
        >
          {pixie.emoji}
        </span>
        <Badge variant="secondary" className={cn("font-medium", statusClass[status])}>
          {statusLabel[status]}
        </Badge>
      </div>
      <div>
        <p className="font-heading font-semibold text-foreground">{pixie.name}</p>
        <p className="text-xs text-muted-foreground">{pixie.title}</p>
      </div>
      <p className="text-sm text-muted-foreground">{pixie.produces}</p>
    </div>
  );
}
