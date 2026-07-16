import { PIXIES } from "@/types/pixie";
import type { PixieStatus } from "@/types/pixie";
import { PixieCard } from "@/components/pixies/pixie-card";

export function PixieTeam({
  statuses = {},
  variant = "grid",
}: {
  statuses?: Record<string, PixieStatus>;
  variant?: "grid" | "compact";
}) {
  return (
    <div className={variant === "compact" ? "flex flex-col gap-3" : "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3"}>
      {PIXIES.map((pixie) => (
        <PixieCard
          key={pixie.name}
          pixie={pixie}
          status={statuses[pixie.name] ?? "waiting"}
          variant={variant}
        />
      ))}
    </div>
  );
}
