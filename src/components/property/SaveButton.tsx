"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/cn";
import { useSaved } from "@/lib/saved";

export function SaveButton({
  slug,
  name,
  className,
  variant = "chip",
}: {
  slug: string;
  name: string;
  className?: string;
  variant?: "chip" | "inline";
}) {
  const { isSaved, toggle, ready } = useSaved();
  const active = ready && isSaved(slug);

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={() => toggle(slug)}
        aria-pressed={active}
        aria-label={active ? `Remove ${name} from saved` : `Save ${name}`}
        className={cn(
          "flex items-center gap-2 rounded-full border px-5 py-3 font-body text-[13px] uppercase tracking-[0.14em] transition-colors",
          active
            ? "border-ember bg-ember/10 text-ember-glow"
            : "border-paper/25 text-paper hover:border-ember hover:text-ember-glow",
          className,
        )}
      >
        <Heart
          className={cn("h-4 w-4", active && "fill-current")}
          strokeWidth={1.75}
        />
        {active ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from saved` : `Save ${name}`}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full bg-ink/50 backdrop-blur-sm transition-colors",
        active
          ? "text-ember-glow hover:bg-ink/70"
          : "text-paper hover:bg-paper hover:text-ink",
        className,
      )}
    >
      <Heart
        className={cn("h-4 w-4", active && "fill-current")}
        strokeWidth={1.75}
      />
    </button>
  );
}
