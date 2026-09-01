"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Reveal } from "@/components/ui/Reveal";
import {
  PRICE_BOUNDS,
  PROPERTIES,
  PROPERTY_CITIES,
  PROPERTY_TYPES,
} from "@/data/properties";
import { formatPriceCompact } from "@/lib/format";

type SortKey = "featured" | "price-asc" | "price-desc" | "area-desc" | "newest";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "area-desc", label: "Largest first" },
  { value: "newest", label: "Newest first" },
];

const DEFAULTS = {
  query: "",
  type: "all",
  city: "all",
  beds: 0,
  maxPrice: PRICE_BOUNDS.max,
  availableOnly: false,
  sort: "featured" as SortKey,
};

const fieldClass =
  "w-full rounded-xl border border-hairline bg-ink px-4 py-3 font-body text-sm text-paper outline-none transition-colors focus:border-ember";

const labelClass =
  "font-body text-[11px] uppercase tracking-[0.16em] text-paper/40";

export function PropertyBrowser() {
  const [query, setQuery] = useState(DEFAULTS.query);
  const [type, setType] = useState(DEFAULTS.type);
  const [city, setCity] = useState(DEFAULTS.city);
  const [beds, setBeds] = useState(DEFAULTS.beds);
  const [maxPrice, setMaxPrice] = useState(DEFAULTS.maxPrice);
  const [availableOnly, setAvailableOnly] = useState(DEFAULTS.availableOnly);
  const [sort, setSort] = useState<SortKey>(DEFAULTS.sort);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = PROPERTIES.filter((p) => {
      if (type !== "all" && p.type !== type) return false;
      if (city !== "all" && p.city !== city) return false;
      if (p.beds < beds) return false;
      if (p.price > maxPrice) return false;
      if (availableOnly && p.status !== "For Sale") return false;
      if (needle) {
        const haystack =
          `${p.name} ${p.location} ${p.type} ${p.summary}`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "area-desc":
        sorted.sort((a, b) => b.area - a.area);
        break;
      case "newest":
        sorted.sort((a, b) => b.yearBuilt - a.yearBuilt);
        break;
      default:
        sorted.sort(
          (a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price,
        );
    }
    return sorted;
  }, [query, type, city, beds, maxPrice, availableOnly, sort]);

  const isFiltered =
    query !== DEFAULTS.query ||
    type !== DEFAULTS.type ||
    city !== DEFAULTS.city ||
    beds !== DEFAULTS.beds ||
    maxPrice !== DEFAULTS.maxPrice ||
    availableOnly !== DEFAULTS.availableOnly;

  function reset() {
    setQuery(DEFAULTS.query);
    setType(DEFAULTS.type);
    setCity(DEFAULTS.city);
    setBeds(DEFAULTS.beds);
    setMaxPrice(DEFAULTS.maxPrice);
    setAvailableOnly(DEFAULTS.availableOnly);
    setSort(DEFAULTS.sort);
  }

  return (
    <>
      <Reveal>
        <div className="rounded-3xl border border-hairline bg-ink-soft p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-2 text-stone">
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} />
            <span className="font-body text-[11px] uppercase tracking-[0.2em]">
              Refine
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-4">
            <label className="flex flex-col gap-2 lg:col-span-2">
              <span className={labelClass}>Search</span>
              <span className="relative block">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-paper/30"
                  strokeWidth={1.75}
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Name, location or style…"
                  className={`${fieldClass} pl-11`}
                />
              </span>
            </label>

            <label className="flex flex-col gap-2">
              <span className={labelClass}>Property type</span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={fieldClass}
              >
                <option value="all">All types</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className={labelClass}>Location</span>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={fieldClass}
              >
                <option value="all">All locations</option>
                {PROPERTY_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className={labelClass}>Minimum bedrooms</span>
              <select
                value={beds}
                onChange={(e) => setBeds(Number(e.target.value))}
                className={fieldClass}
              >
                <option value={0}>Any</option>
                {[2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}+ bedrooms
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 lg:col-span-2">
              <span className={labelClass}>
                Maximum price · {formatPriceCompact(maxPrice)}
              </span>
              <input
                type="range"
                min={PRICE_BOUNDS.min}
                max={PRICE_BOUNDS.max}
                step={10000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-3 h-1 w-full cursor-pointer appearance-none rounded-full bg-hairline accent-ember"
              />
              <span className="flex justify-between font-body text-[11px] text-paper/30">
                <span>{formatPriceCompact(PRICE_BOUNDS.min)}</span>
                <span>{formatPriceCompact(PRICE_BOUNDS.max)}</span>
              </span>
            </label>

            <label className="flex flex-col gap-2">
              <span className={labelClass}>Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className={fieldClass}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-5">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border-hairline bg-ink accent-ember"
              />
              <span className="font-body text-sm text-paper/70">
                Available only
              </span>
            </label>

            {isFiltered && (
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2 font-body text-[12px] uppercase tracking-[0.14em] text-paper/70 transition-colors hover:border-ember hover:text-ember-glow"
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} />
                Reset
              </button>
            )}
          </div>
        </div>
      </Reveal>

      <p
        aria-live="polite"
        className="mt-10 font-body text-sm text-paper/50"
      >
        Showing{" "}
        <span className="font-display text-base font-semibold text-paper">
          {results.length}
        </span>{" "}
        of {PROPERTIES.length} homes
      </p>

      {results.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-hairline bg-ink-soft/40 px-8 py-20 text-center">
          <p className="font-display text-2xl font-semibold text-paper">
            No homes match those filters
          </p>
          <p className="mx-auto mt-3 max-w-sm font-body text-sm leading-relaxed text-paper/50">
            Try widening the price range or clearing a filter — or tell us what
            you are looking for and we will let you know when it comes up.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 rounded-full bg-ember px-6 py-3 font-body text-[13px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ember-glow"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((property, i) => (
            <Reveal key={property.slug} delay={Math.min(i, 5) * 0.06}>
              <PropertyCard property={property} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
