import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarDays,
  Check,
  Layers,
  Mail,
  MapPin,
  Phone,
  Ruler,
  Trees,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyCard } from "@/components/property/PropertyCard";
import { MortgageCalculator } from "@/components/property/MortgageCalculator";
import { InquiryForm } from "@/components/property/InquiryForm";
import { SaveButton } from "@/components/property/SaveButton";
import { StatusBadge } from "@/components/property/StatusBadge";
import { Reveal } from "@/components/ui/Reveal";
import {
  PROPERTIES,
  getProperty,
  getSimilarProperties,
} from "@/data/properties";
import { SITE } from "@/data/site";
import { formatArea, formatPrice } from "@/lib/format";

/** Pre-renders every listing at build time — each one is a static HTML page. */
export function generateStaticParams() {
  return PROPERTIES.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata(
  props: PageProps<"/properties/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const property = getProperty(slug);

  if (!property) {
    return { title: "Property not found" };
  }

  const title = `${property.name}, ${property.location}`;
  const description = `${property.summary} ${property.beds} bedrooms · ${formatArea(property.area)} · ${formatPrice(property.price)}.`;

  return {
    title,
    description,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      type: "article",
      title: `${title} | ${SITE.name}`,
      description,
      url: `/properties/${property.slug}`,
      images: [{ url: property.photo, width: 2400, height: 1600 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: [property.photo],
    },
  };
}

export default async function PropertyPage(
  props: PageProps<"/properties/[slug]">,
) {
  const { slug } = await props.params;
  const property = getProperty(slug);

  if (!property) {
    notFound();
  }

  const similar = getSimilarProperties(property);

  const facts = [
    { icon: BedDouble, label: "Bedrooms", value: String(property.beds) },
    { icon: Bath, label: "Bathrooms", value: String(property.baths) },
    { icon: Layers, label: "Floors", value: String(property.floors) },
    { icon: Ruler, label: "Interior", value: formatArea(property.area) },
    { icon: Trees, label: "Plot", value: formatArea(property.plot) },
    { icon: CalendarDays, label: "Built", value: String(property.yearBuilt) },
    { icon: Zap, label: "Energy", value: `Rating ${property.energyRating}` },
    { icon: MapPin, label: "Region", value: property.country },
  ];

  /**
   * Structured data so the listing is eligible for rich results in Google
   * rather than appearing as a plain blue link.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.name,
    description: property.summary,
    url: `${SITE.url}/properties/${property.slug}`,
    image: `${SITE.url}${property.photo}`,
    datePosted: `${property.yearBuilt}-01-01`,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "USD",
      availability:
        property.status === "For Sale"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
    about: {
      "@type": "SingleFamilyResidence",
      name: property.name,
      numberOfBedrooms: property.beds,
      numberOfBathroomsTotal: property.baths,
      numberOfRooms: property.beds + property.baths,
      floorSize: {
        "@type": "QuantitativeValue",
        value: property.area,
        unitCode: "MTK",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: property.city,
        addressCountry: property.country,
      },
    },
    broker: {
      "@type": "RealEstateAgent",
      name: SITE.name,
      telephone: SITE.phone,
      email: SITE.email,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar variant="solid" />

      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-6 pt-10 sm:px-10">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 font-body text-[13px] uppercase tracking-[0.14em] text-paper/50 transition-colors hover:text-paper"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            All properties
          </Link>
        </div>

        <section className="py-10">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
            <Reveal>
              <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div>
                  <p className="font-body text-[11px] uppercase tracking-[0.2em] text-stone">
                    {property.type} · {property.location}
                  </p>
                  <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
                    {property.name}
                  </h1>
                </div>
                <div className="flex flex-wrap items-end gap-6">
                  <div>
                    <p className="font-body text-[11px] uppercase tracking-[0.1em] text-paper/40">
                      Guide price
                    </p>
                    <p className="font-display text-3xl font-semibold text-ember-glow">
                      {formatPrice(property.price)}
                    </p>
                  </div>
                  <SaveButton
                    slug={property.slug}
                    name={property.name}
                    variant="inline"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <PropertyGallery property={property} />
            </Reveal>

            <div className="mt-16 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
              <div>
                <Reveal>
                  <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-4">
                    {facts.map((fact) => (
                      <div key={fact.label} className="bg-ink-soft p-5">
                        <fact.icon
                          className="h-4 w-4 text-ember-glow"
                          strokeWidth={1.75}
                        />
                        <dt className="mt-3 font-body text-[11px] uppercase tracking-[0.1em] text-paper/40">
                          {fact.label}
                        </dt>
                        <dd className="mt-1 font-display text-lg font-semibold text-paper">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>

                <Reveal delay={0.05}>
                  <div className="mt-14">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="font-body text-xs uppercase tracking-[0.2em] text-stone">
                        [ The House ]
                      </span>
                      <StatusBadge status={property.status} />
                    </div>
                    {property.description.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="mt-5 max-w-2xl font-body text-base leading-relaxed text-paper/60"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.05}>
                  <div className="mt-14">
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-stone">
                      [ Specification ]
                    </span>
                    <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                      {property.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 border-b border-hairline pb-4 font-body text-sm text-paper/70"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-ember-glow"
                            strokeWidth={2}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

              <aside className="flex flex-col gap-8">
                <Reveal>
                  <section className="rounded-3xl border border-hairline bg-ink-soft p-8">
                    <span className="font-body text-[11px] uppercase tracking-[0.2em] text-stone">
                      [ Your Advisor ]
                    </span>
                    <div className="mt-6 flex items-center gap-4">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ember/40 bg-ember/10 font-display text-lg font-semibold text-ember-glow">
                        {property.agent.initials}
                      </span>
                      <div>
                        <p className="font-display text-lg font-semibold text-paper">
                          {property.agent.name}
                        </p>
                        <p className="font-body text-sm text-paper/50">
                          {property.agent.role}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 border-t border-hairline pt-6">
                      <a
                        href={`tel:${property.agent.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-3 font-body text-sm text-paper/70 transition-colors hover:text-paper"
                      >
                        <Phone
                          className="h-4 w-4 shrink-0 text-ember-glow"
                          strokeWidth={1.75}
                        />
                        {property.agent.phone}
                      </a>
                      <a
                        href={`mailto:${property.agent.email}`}
                        className="flex items-center gap-3 font-body text-sm text-paper/70 transition-colors hover:text-paper"
                      >
                        <Mail
                          className="h-4 w-4 shrink-0 text-ember-glow"
                          strokeWidth={1.75}
                        />
                        {property.agent.email}
                      </a>
                    </div>

                    <InquiryForm
                      propertyName={property.name}
                      heading="Arrange a viewing"
                      submitLabel="Request Viewing"
                      className="mt-8 border-t border-hairline pt-8"
                    />
                  </section>
                </Reveal>

                <Reveal delay={0.05}>
                  <MortgageCalculator price={property.price} />
                </Reveal>
              </aside>
            </div>
          </div>
        </section>

        {similar.length > 0 && (
          <section className="border-t border-hairline py-24">
            <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
              <Reveal>
                <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  <span className="text-stone">You might also</span> consider
                </h2>
              </Reveal>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((item, i) => (
                  <Reveal key={item.slug} delay={i * 0.08}>
                    <PropertyCard property={item} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
