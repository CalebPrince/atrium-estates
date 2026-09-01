import { Mail, MapPin, Phone } from "lucide-react";
import { InquiryForm } from "@/components/property/InquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" className="relative border-t border-hairline py-28">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <h2 className="max-w-xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl">
            Want to build a home that lasts — but don&apos;t know where to
            begin?
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline lg:grid-cols-2">
            <div className="flex flex-col justify-between gap-12 bg-ink-soft p-10">
              <div>
                <div className="mb-4 flex items-center gap-2 text-stone">
                  <span className="text-xs uppercase tracking-[0.2em]">
                    [ Contact Us ]
                  </span>
                </div>
                <p className="max-w-sm font-body text-sm leading-relaxed text-paper/55">
                  Have a plot of land or an idea already in mind? Reach out and
                  we&apos;ll walk you through what building with {SITE.name}{" "}
                  looks like.
                </p>
              </div>

              <dl className="flex flex-col gap-5">
                <div className="flex items-center gap-3 text-paper/70">
                  <dt className="sr-only">Phone</dt>
                  <Phone
                    className="h-4 w-4 shrink-0 text-ember-glow"
                    strokeWidth={1.75}
                  />
                  <dd className="font-body text-sm">
                    <a
                      href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                      className="transition-colors hover:text-paper"
                    >
                      {SITE.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-3 text-paper/70">
                  <dt className="sr-only">Email</dt>
                  <Mail
                    className="h-4 w-4 shrink-0 text-ember-glow"
                    strokeWidth={1.75}
                  />
                  <dd className="font-body text-sm">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="transition-colors hover:text-paper"
                    >
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-3 text-paper/70">
                  <dt className="sr-only">Address</dt>
                  <MapPin
                    className="h-4 w-4 shrink-0 text-ember-glow"
                    strokeWidth={1.75}
                  />
                  <dd className="font-body text-sm">{SITE.address}</dd>
                </div>
              </dl>
            </div>

            <InquiryForm className="bg-ink-soft p-10" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
