import { Logo } from "@/components/ui/Logo";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT_PHASE_STATS } from "@/data/site";

export function About() {
  return (
    <section id="about" className="relative border-t border-hairline py-28">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl">
              <span className="text-stone">Architecture</span> isn&apos;t
              walls. It&apos;s the{" "}
              <span className="text-ember-glow">feeling</span> inside them.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2 text-stone">
                <span className="text-xs uppercase tracking-[0.2em]">[</span>
                <Logo className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.2em]">
                  About Us
                </span>
                <span className="text-xs uppercase tracking-[0.2em]">]</span>
              </div>
              <p className="font-body text-lg leading-relaxed text-paper/70">
                Atrium Estates is an architectural studio founded in 2010. We
                design private homes across Scandinavia and Central Europe,
                where natural light, honest materials, and thoughtful
                proportion come together into something quietly extraordinary.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            <Photo
              src="/images/about-1.webp"
              alt="Atrium Estates residence exterior at dusk"
              className="aspect-[4/3] rounded-3xl"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
            <Photo
              src="/images/about-2.webp"
              alt="Atrium Estates living pavilion interior"
              className="aspect-[4/3] rounded-3xl"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-4">
            <div className="flex flex-col justify-center gap-3 bg-ink-soft p-6">
              <span className="font-body text-[11px] uppercase tracking-[0.16em] text-paper/50">
                Current Phase
              </span>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-3/4 rounded-full bg-ember" />
              </div>
              <span className="font-body text-xs text-paper/50">
                Palacio Highlands — 75% built
              </span>
            </div>
            {ABOUT_PHASE_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col justify-center gap-1 bg-ink-soft p-6"
              >
                <span className="font-display text-3xl font-semibold text-paper">
                  {stat.value}
                </span>
                <span className="font-body text-[11px] uppercase tracking-[0.14em] text-paper/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
