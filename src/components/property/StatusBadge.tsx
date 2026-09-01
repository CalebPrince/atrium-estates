import { cn } from "@/lib/cn";
import type { PropertyStatus } from "@/types";

const STATUS_STYLES: Record<PropertyStatus, string> = {
  "For Sale": "border-ember/40 bg-ember/15 text-ember-glow",
  Reserved: "border-paper/25 bg-ink/60 text-paper/80",
  Sold: "border-paper/15 bg-ink/70 text-paper/45",
};

export function StatusBadge({
  status,
  className,
}: {
  status: PropertyStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 font-body text-[11px] uppercase tracking-[0.14em] backdrop-blur-sm",
        STATUS_STYLES[status],
        className,
      )}
    >
      {status}
    </span>
  );
}
