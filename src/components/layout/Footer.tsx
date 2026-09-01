import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "@/data/navigation";
import { SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-hairline pb-8 pt-20">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex flex-col justify-between gap-10 border-b border-hairline pb-10 lg:flex-row lg:items-end">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-8 w-8 text-paper" />
            <span className="font-display text-4xl font-semibold tracking-tight text-paper sm:text-6xl">
              {SITE.name}
            </span>
          </Link>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-[13px] uppercase tracking-[0.14em] text-paper/60 hover:text-paper"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/saved"
              className="font-body text-[13px] uppercase tracking-[0.14em] text-paper/60 hover:text-paper"
            >
              Saved
            </Link>
          </nav>

          <div className="flex items-center gap-4 text-paper/60">
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
        </div>

        <div className="flex flex-col gap-2 pt-6 font-body text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>{SITE.motto}</p>
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
