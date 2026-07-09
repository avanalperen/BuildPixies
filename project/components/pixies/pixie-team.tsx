import { PIXIES } from "@/types/pixie";
import type { PixieStatus } from "@/types/pixie";
import { PixieCard } from "@/components/pixies/pixie-card";

export function PixieTeam({
  statuses = {},
}: {
  statuses?: Record<string, PixieStatus>;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
      {PIXIES.map((pixie) => (
        <PixieCard
          key={pixie.name}
          pixie={pixie}
          status={statuses[pixie.name] ?? "waiting"}
        />
      ))}
    </div>
  );
}
