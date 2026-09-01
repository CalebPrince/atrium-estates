"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyVisual } from "@/components/ui/PropertyVisual";
import { SaveButton } from "@/components/property/SaveButton";
import { StatusBadge } from "@/components/property/StatusBadge";
import { cn } from "@/lib/cn";
import type { Property } from "@/types";

export function PropertyGallery({ property }: { property: Property }) {
  const [index, setIndex] = useState(0);
  const slides = property.gallery;
  const current = slides[index];

  const go = (delta: number) =>
    setIndex((i) => (i + delta + slides.length) % slides.length);

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-3xl"
        role="group"
        aria-roledescription="carousel"
        aria-label={`${property.name} photographs`}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(-1);
          if (e.key === "ArrowRight") go(1);
        }}
        tabIndex={0}
      >
        <PropertyVisual
          photo={current.photo}
          variant={current.variant}
          alt={`${property.name} — ${current.caption}`}
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="aspect-[16/10]"
        />

        <div className="absolute left-5 top-5 flex items-center gap-3">
          <StatusBadge status={property.status} />
        </div>
        <SaveButton
          slug={property.slug}
          name={property.name}
          className="absolute right-5 top-5"
        />

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photograph"
              className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-paper backdrop-blur-sm transition-colors hover:bg-paper hover:text-ink"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photograph"
              className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-paper backdrop-blur-sm transition-colors hover:bg-paper hover:text-ink"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </>
        )}

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/90 to-transparent p-6 pt-20">
          <p className="font-body text-sm text-paper/80">{current.caption}</p>
          <p className="shrink-0 font-body text-[11px] uppercase tracking-[0.2em] text-paper/50">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {slides.map((slide, i) => (
            <button
              key={`${slide.caption}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View ${slide.caption}`}
              aria-current={i === index}
              className="relative shrink-0 overflow-hidden rounded-xl"
            >
              <PropertyVisual
                photo={slide.photo}
                variant={slide.variant}
                alt={slide.caption}
                glow={false}
                sizes="112px"
                className={cn(
                  "h-16 w-28 transition-opacity",
                  i === index ? "opacity-100" : "opacity-40 hover:opacity-75",
                )}
              />
              {i === index && (
                <span className="absolute inset-0 rounded-xl ring-2 ring-ember" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
