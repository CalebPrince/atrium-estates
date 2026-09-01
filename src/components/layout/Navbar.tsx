"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { Logo } from "@/components/ui/Logo";
import { SavedCount } from "@/components/layout/SavedCount";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { NAV_LINKS } from "@/data/navigation";
import { SITE } from "@/data/site";
import { cn } from "@/lib/cn";

const DRAWER_ID = "mobile-menu";

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
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Stable identity so the drawer does not resubscribe its listeners each render.
  const closeDrawer = useCallback(() => setOpen(false), []);

  return (
    // The drawer is deliberately a sibling of <header>, not a child: the solid
    // header's `backdrop-blur` establishes a containing block for fixed
    // descendants, which would size the drawer to the header instead of the
    // viewport.
    <>
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
              ref={toggleRef}
              onClick={() => setOpen(true)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls={DRAWER_ID}
            >
              <span className="h-px w-6 bg-paper" />
              <span className="h-px w-6 bg-paper" />
            </button>
          </div>
        </div>

      </header>

      <MobileDrawer
        id={DRAWER_ID}
        open={open}
        onClose={closeDrawer}
        returnFocusTo={toggleRef}
      />
    </>
  );
}
