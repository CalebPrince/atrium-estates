"use client";

import Link from "next/link";
import { HeartOff } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PROPERTIES } from "@/data/properties";
import { useSaved } from "@/lib/saved";

export function SavedList() {
  const { saved, clear, ready } = useSaved();

  if (!ready) {
    // Placeholder keeps the page from jumping while localStorage is read.
    return <div className="h-64" aria-hidden="true" />;
  }

  const properties = PROPERTIES.filter((p) => saved.includes(p.slug));

  if (properties.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-hairline bg-ink-soft/40 px-8 py-24 text-center">
        <HeartOff
          className="mx-auto h-8 w-8 text-paper/25"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <p className="mt-6 font-display text-2xl font-semibold text-paper">
          Nothing saved yet
        </p>
        <p className="mx-auto mt-3 max-w-sm font-body text-sm leading-relaxed text-paper/50">
          Tap the heart on any home to keep it here. Your shortlist stays on
          this device — no account needed.
        </p>
        <Link
          href="/properties"
          className="mt-8 inline-block rounded-full bg-ember px-6 py-3 font-body text-[13px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ember-glow"
        >
          Browse Properties
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <p className="font-body text-sm text-paper/50">
          <span className="font-display text-base font-semibold text-paper">
            {properties.length}
          </span>{" "}
          {properties.length === 1 ? "home" : "homes"} shortlisted
        </p>
        <button
          type="button"
          onClick={clear}
          className="rounded-full border border-paper/20 px-4 py-2 font-body text-[12px] uppercase tracking-[0.14em] text-paper/70 transition-colors hover:border-ember hover:text-ember-glow"
        >
          Clear all
        </button>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.slug} property={property} />
        ))}
      </div>
    </>
  );
}
