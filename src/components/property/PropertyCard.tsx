import Link from "next/link";
import { ArrowUpRight, Bath, BedDouble, Ruler } from "lucide-react";
import { PropertyVisual } from "@/components/ui/PropertyVisual";
import { SaveButton } from "@/components/property/SaveButton";
import { StatusBadge } from "@/components/property/StatusBadge";
import { formatArea, formatPrice } from "@/lib/format";
import type { Property } from "@/types";

export function PropertyCard({
  property,
  priority = false,
}: {
  property: Property;
  priority?: boolean;
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-hairline bg-ink-soft">
      <div className="relative">
        <PropertyVisual
          photo={property.photo}
          variant={property.variant}
          alt={property.name}
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute left-5 top-5">
          <StatusBadge status={property.status} />
        </div>
        {/* Sits above the stretched link so the save toggle stays clickable. */}
        <SaveButton
          slug={property.slug}
          name={property.name}
          className="absolute right-5 top-5 z-20"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-body text-[11px] uppercase tracking-[0.2em] text-stone">
          {property.type} · {property.location}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-paper">
          {property.name}
        </h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-paper/55">
          {property.summary}
        </p>

        <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-hairline pt-5 font-body text-sm text-paper/60">
          <div className="flex items-center gap-2">
            <BedDouble className="h-4 w-4 text-stone" strokeWidth={1.75} />
            <dt className="sr-only">Bedrooms</dt>
            <dd>{property.beds}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4 text-stone" strokeWidth={1.75} />
            <dt className="sr-only">Bathrooms</dt>
            <dd>{property.baths}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-stone" strokeWidth={1.75} />
            <dt className="sr-only">Floor area</dt>
            <dd>{formatArea(property.area)}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-body text-[11px] uppercase tracking-[0.1em] text-paper/40">
              Guide price
            </p>
            <p className="font-display text-2xl font-semibold text-ember-glow">
              {formatPrice(property.price)}
            </p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper transition-colors group-hover:border-ember group-hover:bg-ember group-hover:text-ink">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </span>
        </div>
      </div>

      {/* Stretched link keeps the whole card clickable with one tab stop. */}
      <Link
        href={`/properties/${property.slug}`}
        className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
      >
        <span className="sr-only">View {property.name}</span>
      </Link>
    </article>
  );
}
