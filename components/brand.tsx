import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Brand({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:-rotate-6",
          compact ? "size-8" : "size-10",
        )}
      >
        <Sparkles className={compact ? "size-4" : "size-5"} fill="currentColor" />
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "block font-heading font-bold leading-none text-primary",
            compact ? "text-xl" : "text-2xl",
          )}
        >
          BuildPixies
        </span>
        {!compact && (
          <span className="mt-1 block text-xs font-medium text-muted-foreground">
            Magical MVP Builder
          </span>
        )}
      </span>
    </Link>
  );
}
