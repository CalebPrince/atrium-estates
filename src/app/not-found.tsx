import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar variant="solid" />
      <main className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-32 sm:px-10">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-stone">
            [ 404 ]
          </p>
          <h1 className="mt-6 max-w-2xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-7xl">
            <span className="text-stone">That page</span> has moved{" "}
            <span className="text-ember-glow">on</span>.
          </h1>
          <p className="mt-8 max-w-md font-body text-base leading-relaxed text-paper/55">
            The address you followed does not point anywhere on this site — the
            listing may have sold or the link may be out of date.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/properties"
              className="rounded-full bg-ember px-6 py-3 font-body text-[13px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ember-glow"
            >
              Browse Properties
            </Link>
            <Link
              href="/"
              className="rounded-full border border-paper/25 px-6 py-3 font-body text-[13px] uppercase tracking-[0.14em] text-paper transition-colors hover:border-ember hover:text-ember-glow"
            >
              Back Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
