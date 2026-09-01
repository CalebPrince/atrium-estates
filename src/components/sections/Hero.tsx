import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { HERO_STATS } from "@/data/site";

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-end">
      <div className="absolute inset-0">
        <Photo
          src="/images/hero.webp"
          alt="Modern A-frame Atrium Estates home glowing at dusk"
          className="h-full w-full"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/60" />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col px-6 pb-14 pt-40 sm:px-10">
        <Reveal>
          <p className="mb-4 font-body text-[13px] uppercase tracking-[0.28em] text-ember-glow">
            Architecture / Comfort / Elegance
          </p>

          <h1 className="font-display text-[16vw] font-semibold leading-[0.85] tracking-tight text-paper sm:text-[9vw] lg:text-[7.5vw]">
            MODERN
            <br />
            <span className="text-stone">HOMES</span>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col justify-between gap-10 border-t border-hairline pt-8 lg:flex-row lg:items-end">
            <p className="max-w-sm font-body text-base leading-relaxed text-paper/70">
              Contemporary homes created for sophisticated living, designed
              with light, space and balance.
            </p>

            <div className="flex items-center gap-5">
              <a
                href="#projects"
                className="group flex items-center gap-4 rounded-full border border-paper/25 py-2 pl-6 pr-2 font-body text-[13px] uppercase tracking-[0.14em] text-paper transition-colors hover:border-ember"
              >
                View Projects
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink transition-colors group-hover:bg-ember">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                </span>
              </a>
              <a
                href="#about"
                aria-label="Scroll to about"
                className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-paper/25 text-paper/70 hover:text-paper sm:flex"
              >
                <ArrowDown className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>

            <dl className="flex shrink-0 gap-8 rounded-2xl border border-hairline bg-ink/40 px-6 py-4 backdrop-blur-sm">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-semibold text-paper">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 max-w-[7rem] font-body text-[11px] uppercase leading-tight tracking-[0.08em] text-paper/50">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
