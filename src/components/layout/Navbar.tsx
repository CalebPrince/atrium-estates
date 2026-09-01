"use client";

import { useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { Logo } from "@/components/ui/Logo";
import { SavedCount } from "@/components/layout/SavedCount";
import { NAV_LINKS } from "@/data/navigation";
import { SITE } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * `overlay` floats the bar over the homepage hero; `solid` gives interior
 * pages a header that occupies layout space and sticks on scroll.
 */
export function Navbar({
  variant = "overlay",
}: {
  variant?: "overlay" | "solid";
}) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "z-50",
        variant === "overlay"
          ? "absolute inset-x-0 top-0"
          : "sticky top-0 border-b border-hairline bg-ink/85 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-6 w-6 text-paper" />
          <span className="font-display text-lg font-semibold tracking-tight text-paper">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-[13px] uppercase tracking-[0.14em] text-paper/70 transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <SavedCount />
          <div className="flex items-center gap-3 text-paper/60">
            <a
              href={SITE.social.instagram}
              aria-label="Instagram"
              className="hover:text-paper"
            >
              <FaInstagram className="h-[18px] w-[18px]" />
            </a>
            <a
              href={SITE.social.facebook}
              aria-label="Facebook"
              className="hover:text-paper"
            >
              <FaFacebookF className="h-[15px] w-[15px]" />
            </a>
          </div>
          <Link
            href="/#contact"
            className="rounded-full border border-paper/25 px-5 py-2.5 font-body text-[13px] uppercase tracking-[0.14em] text-paper transition-colors hover:border-ember hover:bg-ember hover:text-ink"
          >
            Get in Touch
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <SavedCount />
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className={`h-px w-6 bg-paper transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 bg-paper transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-6 mb-4 flex flex-col gap-1 rounded-2xl border border-hairline bg-ink-soft p-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 font-body text-sm uppercase tracking-[0.14em] text-paper/80 hover:bg-white/5 hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/saved"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-3 font-body text-sm uppercase tracking-[0.14em] text-paper/80 hover:bg-white/5 hover:text-paper"
          >
            Saved
          </Link>
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-ember px-4 py-3 text-center font-body text-[13px] uppercase tracking-[0.14em] text-ink"
          >
            Get in Touch
          </Link>
        </div>
      )}
    </header>
  );
}
