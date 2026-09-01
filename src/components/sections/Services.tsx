"use client";

import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/data/site";

export function Services() {
  const [active, setActive] = useState(1);

  return (
    <section id="services" className="relative border-t border-hairline py-28">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <div className="mb-14 flex items-center gap-2 text-stone">
            <span className="text-xs uppercase tracking-[0.2em]">[</span>
            <span className="text-xs uppercase tracking-[0.2em]">
              Services
            </span>
            <span className="text-xs uppercase tracking-[0.2em]">]</span>
          </div>

          <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl">
            From the first line on paper to the day you walk through the
            door — we&apos;re with you at every step.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.1} className="flex flex-col divide-y divide-hairline border-y border-hairline">
            {SERVICES.map((service, i) => {
              const isOpen = active === i;
              return (
                <button
                  key={service.title}
                  onClick={() => setActive(isOpen ? -1 : i)}
                  className="group flex w-full flex-col gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center justify-between gap-6">
                    <span className="flex items-baseline gap-4">
                      <span
                        className={`font-display text-sm ${isOpen ? "text-ember-glow" : "text-paper/30"}`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`font-display text-2xl font-medium transition-colors sm:text-3xl ${isOpen ? "text-paper" : "text-paper/60 group-hover:text-paper/80"}`}
                      >
                        {service.title}
                      </span>
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-paper/20 text-paper transition-transform ${isOpen ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </div>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <p className="max-w-md overflow-hidden font-body text-sm leading-relaxed text-paper/55">
                      {service.body}
                    </p>
                  </div>
                </button>
              );
            })}
          </Reveal>

          <Reveal delay={0.2}>
            <Photo
              src="/images/services.webp"
              alt="Atrium Estates entrance detail with warm lantern lighting"
              className="aspect-[4/5] rounded-3xl lg:aspect-auto lg:h-full"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
