import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyBrowser } from "@/components/property/PropertyBrowser";
import { Reveal } from "@/components/ui/Reveal";
import { PROPERTIES } from "@/data/properties";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Properties for Sale",
  description: `Browse ${PROPERTIES.length} architect-designed homes from ${SITE.name} — filter by location, type, bedrooms and budget.`,
  alternates: { canonical: "/properties" },
  openGraph: {
    title: `Properties for Sale | ${SITE.name}`,
    description: `Browse ${PROPERTIES.length} architect-designed homes from ${SITE.name}.`,
    url: "/properties",
  },
};

export default function PropertiesPage() {
  return (
    <>
      <Navbar variant="solid" />
      <main className="flex-1">
        <section className="border-b border-hairline py-20 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
            <Reveal>
              <div className="mb-4 flex items-center gap-2 text-stone">
                <span className="font-body text-xs uppercase tracking-[0.2em]">
                  [ Collection ]
                </span>
              </div>
              <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
                <span className="text-stone">Every home we build</span> is
                designed <span className="text-ember-glow">once</span>.
              </h1>
              <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-paper/55">
                A small, deliberately limited collection of private residences
                across Norway and Sweden. Filter by what matters to you — we
                will tell you honestly which ones fit.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
            <PropertyBrowser />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
