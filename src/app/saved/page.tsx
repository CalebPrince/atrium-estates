import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SavedList } from "@/components/property/SavedList";

export const metadata: Metadata = {
  title: "Saved Homes",
  description: "The homes you have shortlisted.",
  alternates: { canonical: "/saved" },
  robots: { index: false },
};

export default function SavedPage() {
  return (
    <>
      <Navbar variant="solid" />
      <main className="flex-1">
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
            <div className="mb-4 flex items-center gap-2 text-stone">
              <span className="font-body text-xs uppercase tracking-[0.2em]">
                [ Shortlist ]
              </span>
            </div>
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              <span className="text-stone">Your</span> saved{" "}
              <span className="text-ember-glow">homes</span>
            </h1>

            <div className="mt-14">
              <SavedList />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
