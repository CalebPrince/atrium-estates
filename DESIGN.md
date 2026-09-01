# Atrium Estates — Design System

## Brand Personality

An architecture and real-estate studio brand built on Scandinavian restraint: minimalism, natural materials, and quiet luxury. The tone is confident and editorial rather than salesy — large type, generous negative space, and cinematic dusk photography do the persuading instead of badges, banners, or urgency copy. Every surface should feel considered, not decorated.

**Positioning**: premium, boutique, design-led. Not a volume homebuilder — a studio that designs a small number of exceptional private homes per year.

## Color System

Single dark theme (no light mode — the brand's photography and mood depend on the dark ground).

| Token | Value | Usage |
|---|---|---|
| `--color-ink` | `#0e0d0a` | Page background |
| `--color-ink-soft` | `#16140f` | Card / panel background |
| `--color-ink-elevated` | `#1d1a14` | Raised surfaces (rarely used) |
| `--color-hairline` | `#2c2820` | 1px borders, dividers, grid seams |
| `--color-stone` | `#a39a8c` | Secondary / muted text, de-emphasized headline words |
| `--color-paper` | `#f6f3ec` | Primary text, warm off-white (never pure `#fff`) |
| `--color-ember` | `#c98a4b` | Primary accent — CTAs, active states, price |
| `--color-ember-dim` | `#8a5c31` | Ember at low emphasis (gradients) |
| `--color-ember-glow` | `#e7ac6f` | Ember highlight (headline emphasis words, links) |

Rules:
- No blue/purple gradients. The only accent hue is the warm ember/amber, echoing lit windows at dusk.
- Photography supplies color; UI chrome stays near-monochrome (ink/paper/stone) so photos read as the brightest, warmest elements on the page.
- `::selection` uses ember-on-ink.

## Typography

Pairing: a heavy geometric display face for headlines against a plain grotesque for body copy — never the same face for both.

- **Display** — `Bricolage Grotesque` (`--font-display`), weights 400–800. Used for all headings, the nav wordmark, stat numbers, and the footer wordmark. Set tight (`tracking-tight`) and heavy (`font-semibold`/`font-bold`) at large sizes.
- **Body** — `Manrope` (`--font-body`), weights 400–700. Used for paragraphs, nav links, labels, form fields. Nav links, eyebrows, and small labels are set uppercase with `tracking-[0.14em]`–`[0.28em]`.

Scale (approximate, fluid where noted):
- Hero H1: `text-[16vw]` mobile → `lg:text-[7.5vw]` desktop, `leading-[0.85]`
- Section H2: `text-4xl` → `sm:text-5xl`, `leading-[1.1]`
- Stat figures: `text-2xl`–`text-3xl` display, semibold
- Eyebrow / bracket labels (`[ About Us ]`): 11–13px, uppercase, `tracking-[0.2em]`

A headline convention used throughout: mix `text-stone` (de-emphasized words) with `text-paper` (default) and `text-ember-glow` (the one emphasized word), e.g. *"Architecture isn't walls. It's the **feeling** inside them."*

## Spacing & Grid

- Container: `max-w-[1400px]`, `px-6` mobile / `sm:px-10` desktop.
- Section rhythm: `py-28` vertical padding, `border-t border-hairline` between every section (the hairline is the only separator device — no shadows between sections).
- Card/stat grids use `gap-px bg-hairline` with solid-background cells to fake 1px internal grid lines instead of individual borders.
- Breakpoints follow Tailwind defaults; the meaningful jump is `lg` (1024px) where multi-column layouts (About images, Projects spotlight, Services accordion+photo) collapse to one column.

## Component Rules

- **Radius**: `rounded-3xl` for photo panels and major cards, `rounded-2xl` for secondary panels, `rounded-full` for buttons/pills/badges. No small `rounded-md` boxes — either fully rounded or generously rounded, never a token in between.
- **Borders over shadows**: every card/panel edge is a 1px `border-hairline` stroke. No `box-shadow` anywhere in the system except the soft ember blur used behind gradient placeholder scenes.
- **Buttons**:
  - Primary: solid `bg-ember` (or `bg-paper`), `text-ink`, `rounded-full`, uppercase 13px label, `tracking-[0.14em]`.
  - Secondary/outline: `border border-paper/25`, transparent fill, hover fills `border-ember`.
  - Icon-affordance CTA: pill button with a trailing circular icon chip (`ArrowUpRight` on `bg-paper`) — used for every primary CTA (`View Projects`, `Get in Touch`, project bookmark).
- **Photos**: always `object-cover` inside a rounded/clipped container, always paired with a 1px inset white/5 ring for edge definition against the dark ground.

## Imagery Direction

- Style: moody, cinematic, dusk/blue-hour architectural photography. Dark timber cladding, glass facades glowing warm amber from interior lighting, minimal landscape (snow, bare trees, still water). No daylight, no people, no text baked into images.
- Generated via `nano_banana_pro` (see `public/images/`) — 8 sourced photos: `hero`, `about-1`, `about-2`, `signature`, `project-1/2/3`, `services`.
- **Fallback**: `components/ui/Scene.tsx` renders a gradient + faint house-silhouette line art in the same palette for any slot without a sourced photo (used for Projects 4–5). This keeps the system extensible without breaking the mood when a photo is missing.
- **Signature motif**: one photo per page is clipped to a house/roofline silhouette via `clip-path: polygon(...)` (`SignatureCard`) — the single most distinctive brand device on the page. Reuse sparingly (once per page) so it stays a signature, not a pattern.

## Motion Rules

- Scroll reveals only, via the shared `<Reveal>` wrapper (`components/ui/Reveal.tsx`, Framer Motion): `opacity 0→1`, `y: 24→0`, `duration: 0.6s`, ease `[0.16, 1, 0.3, 1]` (expo-out), `viewport={{ once: true }}`.
- Stagger sibling reveals with small `delay` increments (0.1–0.2s) rather than a single simultaneous fade.
- `useReducedMotion()` disables the transform/opacity animation entirely when the user prefers reduced motion — content renders in its final state immediately.
- Hover/interactive transitions use plain CSS (`transition-colors`, `transition-opacity`, `duration-300`/`500`) — Framer Motion is reserved for scroll-triggered reveals, not micro-interactions.

## Accessibility & Responsive Rules

- Body copy never drops below 14px; interactive labels never below 11px and always uppercase+tracked to stay legible at that size.
- All icon-only buttons (mobile menu toggle, save/bookmark, social links) carry `aria-label`.
- Focus/interactive states rely on `hover:` + `aria-expanded` (accordion, mobile menu) — verify visible focus rings before shipping past scaffold stage (currently relies on browser default; add explicit `focus-visible:ring` treatment before production).
- Mobile nav collapses to a hamburger + slide-down panel below `md` (768px); all other multi-column sections collapse to a single column below `lg` (1024px) rather than shrinking desktop grids in place.

## Icon & Asset Rules

- **UI icons**: [Lucide](https://lucide.dev) (`lucide-react`) — arrows, mail, phone, map pin, etc. `strokeWidth={1.75}`, sized `h-4 w-4` inline / `h-[18px] w-[18px]` in nav.
- **Social/brand icons**: Lucide dropped brand marks, so Instagram/Facebook use [react-icons](https://react-icons.github.io/react-icons/) (`react-icons/fa6`) instead of hand-drawn approximations.
- **Logo**: bespoke mark (`components/ui/Logo.tsx`) — a simple roofline/house glyph, original line art, not derived from any third-party brand asset.
- Never approximate a real third-party logo with hand-drawn SVG paths — use the library or a text fallback.

## Architecture

```
src/
  app/
    layout.tsx              # root layout, fonts, site-wide metadata
    page.tsx                # marketing homepage
    properties/page.tsx     # listing index (filter / sort / search)
    properties/[slug]/      # one statically generated page per listing
    saved/page.tsx          # visitor shortlist
    not-found.tsx           # branded 404
    actions.ts              # submitInquiry server action
    sitemap.ts / robots.ts  # generated SEO files
    icon.svg                # favicon (brand mark)
  components/
    layout/                 # Navbar (overlay|solid), Footer, SavedCount
    sections/               # Hero, About, SignatureCard, Projects, Services, Contact
    property/               # PropertyCard, PropertyBrowser, PropertyGallery,
                            # MortgageCalculator, InquiryForm, SaveButton,
                            # SavedList, StatusBadge
    ui/                     # Reveal, Photo, Scene, PropertyVisual, Logo
  data/
    site.ts                 # SITE brand config + stats + services
    properties.ts           # the listings, plus derived filter facets
    navigation.ts
  types/                    # Property, Agent, GallerySlot, NavLink, StatItem
  lib/
    cn.ts                   # clsx + tailwind-merge
    format.ts               # currency / area formatters (Intl)
    mortgage.ts             # amortising repayment maths
    inquiry.ts              # inquiry form state shape
    saved.tsx               # shortlist store (useSyncExternalStore)
public/
  images/                   # sourced photography, WebP
```

All copy and listing content lives in `data/`, typed via `types/`, and is
imported into presentational components — adding or editing a listing, service
or nav link never requires touching component markup. Renaming the studio or
changing contact details is a single edit to `SITE` in `data/site.ts`.

## Listing Page Conventions

- **Cards** use a stretched-link pattern: the whole card is one tab stop via an
  absolutely positioned `<Link>`, with the save toggle raised above it on `z-20`
  so it stays independently clickable.
- **Status** is a first-class visual: `For Sale` (ember), `Reserved` (neutral),
  `Sold` (dimmed) — set in `StatusBadge`.
- **Filter facets** (`PROPERTY_TYPES`, `PROPERTY_CITIES`, `PRICE_BOUNDS`) are
  derived from the data at module scope, so a new listing extends the filters
  automatically.
- **Prices** are stored as numbers and formatted through `Intl.NumberFormat`,
  which is what makes sorting and range filtering possible. Never store a
  pre-formatted price string.
- **Missing photography** falls through to the gradient `Scene` via
  `PropertyVisual` rather than breaking the grid.

## SEO

- Per-page `metadata` with a title template; `generateMetadata` on listings.
- `RealEstateListing` JSON-LD per property (offer, floor size, address, broker)
  so listings are eligible for rich results.
- `sitemap.ts` enumerates every listing; `robots.ts` excludes `/saved`.
- Every listing is prerendered as static HTML via `generateStaticParams`.

## Motion Safety

Framer Motion applies reveals as inline `opacity: 0` styles, which would leave
content permanently invisible without JavaScript. `Reveal` therefore carries a
`.reveal` class that `globals.css` (`@media (scripting: none)`) and a `<noscript>`
style in the root layout both force back to visible. Listings must never depend
on JS to be readable.

## Known Gaps (flag before production)

- **Brand is a placeholder.** "Atrium Estates" is a neutral sample name, not a
  real business — replace the `SITE` block, logo and photography with the
  client's own before any real deployment. Listings, prices, agents and
  locations are all fictional demo content.
- **Inquiries are not delivered.** `submitInquiry` validates and logs the lead;
  the delivery step (email provider, CRM, or database insert) is marked with a
  comment and still needs wiring, plus spam protection and a rate limit.
- Focus-visible styling is explicit on listing cards only; the rest of the
  interactive surface still relies on the browser default ring.
- No image `blurDataURL` placeholders yet — large photos pop in on slow links.
- Gallery is inline only; there is no full-screen lightbox.
- The shortlist is per-device (`localStorage`), so it does not follow a visitor
  between phone and desktop. That needs accounts to solve.
