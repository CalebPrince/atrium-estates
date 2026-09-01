import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

export function SignatureCard() {
  return (
    <section className="relative border-t border-hairline py-28">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal className="mx-auto w-full max-w-2xl">
          <div className="relative">
            <div
              className="relative aspect-[9/10] w-full"
              style={{
                clipPath:
                  "polygon(0% 28%, 50% 0%, 100% 28%, 100% 100%, 0% 100%)",
              }}
            >
              <Photo
                src="/images/signature.webp"
                alt="Signature Atrium Estates A-frame residence at dusk"
                className="h-full w-full"
                sizes="(min-width: 1024px) 672px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/50" />

              <div className="absolute left-8 top-[32%] max-w-[70%]">
                <p className="font-body text-sm uppercase tracking-[0.14em] text-paper/80">
                  Est. 2026 &middot; Scandinavia
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-paper/55">
                  Scandinavian Design Award
                  <br />
                  Best Residential Studio
                </p>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-5 p-8 pt-16">
                <p className="font-display text-2xl font-medium leading-snug text-paper">
                  We build homes that feel like
                  <br />
                  they&apos;ve always been there.
                </p>
                <a
                  href="#contact"
                  className="group flex items-center gap-3 rounded-full border border-paper/30 py-2 pl-5 pr-2 font-body text-[13px] uppercase tracking-[0.14em] text-paper transition-colors hover:border-ember"
                >
                  Get in Touch
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink transition-colors group-hover:bg-ember">
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
