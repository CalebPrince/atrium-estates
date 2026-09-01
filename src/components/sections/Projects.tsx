"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PropertyVisual } from "@/components/ui/PropertyVisual";
import { SaveButton } from "@/components/property/SaveButton";
import { StatusBadge } from "@/components/property/StatusBadge";
import { Reveal } from "@/components/ui/Reveal";
import { PROPERTIES } from "@/data/properties";
import { formatArea, formatPrice } from "@/lib/format";

export function Projects() {
  const [active, setActive] = useState(0);
  const property = PROPERTIES[active];

  return (
    <section id="projects" className="relative border-t border-hairline py-28">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl text-paper/40">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="font-body text-sm text-paper/40">
                / {String(PROPERTIES.length).padStart(2, "0")}
              </span>
            </div>
            <div className="sm:text-right">
              <p className="max-w-md font-display text-2xl font-medium leading-snug text-paper">
                Modern residences, crafted for those who value space, balance,
                and timeless design.
              </p>
              <Link
                href="/properties"
                className="mt-5 inline-flex items-center gap-2 font-body text-[13px] uppercase tracking-[0.14em] text-ember-glow transition-colors hover:text-paper"
              >
                View all properties
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl">
            <PropertyVisual
              photo={property.photo}
              variant={property.variant}
              alt={property.name}
              className="aspect-[4/3]"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
            <div className="absolute left-5 top-5">
              <StatusBadge status={property.status} />
            </div>
            <SaveButton
              slug={property.slug}
              name={property.name}
              className="absolute right-5 top-5"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-8 pt-16">
              <h3 className="font-display text-2xl font-semibold text-paper">
                {property.name}
              </h3>
              <p className="mt-1 font-body text-sm text-paper/60">
                {property.location}
              </p>
              <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-paper/60">
                {property.description[0]}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <PropertyVisual
              photo={property.gallery[1]?.photo ?? property.photo}
              variant={property.gallery[1]?.variant ?? property.variant}
              alt={`${property.name} interior`}
              className="aspect-[16/10] rounded-2xl"
              glow={false}
              sizes="(min-width: 1024px) 35vw, 100vw"
            />

            <dl className="grid grid-cols-3 gap-4 border-y border-hairline py-5">
              <div>
                <dt className="font-body text-[11px] uppercase tracking-[0.1em] text-paper/40">
                  Bedrooms
                </dt>
                <dd className="mt-1 font-display text-lg font-semibold text-paper">
                  {property.beds}
                </dd>
              </div>
              <div>
                <dt className="font-body text-[11px] uppercase tracking-[0.1em] text-paper/40">
                  Bathrooms
                </dt>
                <dd className="mt-1 font-display text-lg font-semibold text-paper">
                  {property.baths}
                </dd>
              </div>
              <div>
                <dt className="font-body text-[11px] uppercase tracking-[0.1em] text-paper/40">
                  Interior
                </dt>
                <dd className="mt-1 font-display text-lg font-semibold text-paper">
                  {formatArea(property.area)}
                </dd>
              </div>
            </dl>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-body text-[11px] uppercase tracking-[0.1em] text-paper/40">
                  Guide price
                </p>
                <p className="font-display text-2xl font-semibold text-ember-glow">
                  {formatPrice(property.price)}
                </p>
              </div>
              <Link
                href={`/properties/${property.slug}`}
                className="rounded-full bg-paper px-6 py-3 font-body text-[13px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ember"
              >
                View Home
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-3 overflow-x-auto pb-2">
          {PROPERTIES.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setActive(i)}
              aria-label={`View ${p.name}`}
              aria-current={i === active}
              className="relative shrink-0 overflow-hidden rounded-xl"
            >
              <PropertyVisual
                photo={p.photo}
                variant={p.variant}
                alt={p.name}
                glow={false}
                sizes="96px"
                className={`h-16 w-24 transition-opacity ${i === active ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
              />
              {i === active && (
                <span className="absolute inset-0 rounded-xl ring-2 ring-ember" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
