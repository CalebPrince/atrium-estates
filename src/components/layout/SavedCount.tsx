"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useSaved } from "@/lib/saved";

/**
 * Shown in the header. Renders nothing until the browser store has been read,
 * so the server markup and first client render agree.
 */
export function SavedCount({ className }: { className?: string }) {
  const { saved, ready } = useSaved();

  return (
    <Link
      href="/saved"
      aria-label={`Saved homes${ready ? ` (${saved.length})` : ""}`}
      className={`relative flex items-center gap-2 text-paper/70 transition-colors hover:text-paper ${className ?? ""}`}
    >
      <Heart className="h-[18px] w-[18px]" strokeWidth={1.75} />
      {ready && saved.length > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-ember px-1 font-body text-[10px] font-semibold text-ink">
          {saved.length}
        </span>
      )}
    </Link>
  );
}
