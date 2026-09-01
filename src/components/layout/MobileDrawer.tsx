"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Heart, Mail, Phone, X } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "@/data/navigation";
import { SITE } from "@/data/site";
import { cn } from "@/lib/cn";
import { useSaved } from "@/lib/saved";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileDrawer({
  id,
  open,
  onClose,
  /** Focus returns here on close, so the toggle keeps its place in the page. */
  returnFocusTo,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { saved, ready } = useSaved();

  // Move focus into the drawer on open and hand it back on close.
  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      return;
    }
    // Only reclaim focus if it is still inside the (now closed) drawer,
    // otherwise we would steal it from wherever the user has moved on to.
    if (panelRef.current?.contains(document.activeElement)) {
      returnFocusTo.current?.focus();
    }
  }, [open, returnFocusTo]);

  // Stop the page behind the drawer from scrolling.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Growing past the `md` breakpoint (rotating a phone, resizing a window)
  // hides the drawer but would otherwise leave the page scroll-locked with no
  // visible way to release it.
  useEffect(() => {
    if (!open) return;
    const query = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, [open, onClose]);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;

    // Keep Tab cycling inside the drawer while it is the modal surface.
    const items = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    // `inert` keeps the closed drawer out of the tab order and away from
    // assistive tech while still allowing it to animate out.
    <div
      className={cn(
        "fixed inset-0 z-[60] md:hidden",
        !open && "pointer-events-none",
      )}
      inert={!open}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "absolute inset-0 h-full w-full cursor-default bg-ink/70 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          "absolute inset-y-0 right-0 flex w-[min(360px,86vw)] flex-col border-l border-hairline bg-ink-soft transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-hairline px-6 py-6">
          <span className="flex items-center gap-2.5">
            <Logo className="h-6 w-6 text-paper" />
            <span className="font-display text-lg font-semibold tracking-tight text-paper">
              {SITE.name}
            </span>
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper transition-colors hover:border-ember hover:bg-ember hover:text-ink"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-8">
          <p className="font-body text-[11px] uppercase tracking-[0.2em] text-stone">
            [ Menu ]
          </p>

          <ul className="mt-6 flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-hairline">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-4 font-display text-2xl font-semibold tracking-tight text-paper transition-colors hover:text-ember-glow"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-hairline">
              <Link
                href="/saved"
                onClick={onClose}
                className="flex items-center justify-between gap-3 py-4 font-display text-2xl font-semibold tracking-tight text-paper transition-colors hover:text-ember-glow"
              >
                <span className="flex items-center gap-3">
                  <Heart className="h-5 w-5" strokeWidth={1.75} />
                  Saved
                </span>
                {ready && saved.length > 0 && (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-ember px-2 font-body text-xs font-semibold text-ink">
                    {saved.length}
                  </span>
                )}
              </Link>
            </li>
          </ul>

          <dl className="mt-10 flex flex-col gap-4">
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
          </dl>
        </nav>

        <div className="border-t border-hairline px-6 py-6">
          <Link
            href="/#contact"
            onClick={onClose}
            className="block rounded-full bg-ember px-4 py-3.5 text-center font-body text-[13px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ember-glow"
          >
            Get in Touch
          </Link>
          <div className="mt-6 flex items-center gap-5 text-paper/60">
            <a
              href={SITE.social.instagram}
              aria-label="Instagram"
              className="transition-colors hover:text-paper"
            >
              <FaInstagram className="h-[18px] w-[18px]" />
            </a>
            <a
              href={SITE.social.facebook}
              aria-label="Facebook"
              className="transition-colors hover:text-paper"
            >
              <FaFacebookF className="h-[15px] w-[15px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
