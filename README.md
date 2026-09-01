# Atrium Estates — Real Estate Website Demo

A working sample of an architect-led property website: a marketing homepage
backed by a real, filterable listings system with individual property pages,
lead capture and SEO built in.

> **This is a demonstration build.** "Atrium Estates" is a placeholder brand and
> every listing, price, agent and location is fictional. The brand, content and
> photography are all designed to be swapped for a real client's.

## What it does

**Listings that behave like a real portal**
- `/properties` — search by name, location or style, and filter by property
  type, location, minimum bedrooms, maximum price and availability
- Sort by price, size or recency; live result count and an empty state that
  offers a way forward instead of a dead end
- Filter options are derived from the data, so adding a listing extends the
  filters automatically

**A property page that answers the buyer's questions**
- `/properties/[slug]` — image gallery with captions and thumbnails, full
  specification, feature checklist and key facts
- An interactive repayment calculator (deposit, rate and term sliders)
- A named advisor with direct phone and email, plus a viewing request form

**Lead capture**
- Server-side validated inquiry form used by both the contact section and each
  property page, with per-field errors and a real confirmation state
- Submissions are validated and recorded; see *Wiring up inquiries* below

**A shortlist**
- Save any property from the card, gallery or homepage; the count appears in the
  header and the shortlist lives at `/saved`
- Persists on the device and syncs across open tabs, with no account required

**Found by search engines**
- Per-page metadata and Open Graph tags; unique title and description per listing
- `RealEstateListing` structured data (price, floor size, address, availability)
  so listings are eligible for rich results rather than plain blue links
- Generated `sitemap.xml` and `robots.txt`
- Every listing is prerendered as static HTML, so pages load instantly

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build
```

## Making it the client's

Content is fully separated from markup — you should not need to touch a
component to change what the site says.

| To change | Edit |
| --- | --- |
| Studio name, phone, email, address, socials, domain | `SITE` in `src/data/site.ts` |
| Listings, prices, photos, agents | `src/data/properties.ts` |
| Services and headline statistics | `src/data/site.ts` |
| Menu structure | `src/data/navigation.ts` |
| Colours, type scale, spacing rules | `src/app/globals.css` and `DESIGN.md` |

Set `NEXT_PUBLIC_SITE_URL` in the deployment environment (Vercel → Settings →
Environment Variables) to the site's real domain. Canonical URLs, the sitemap
and Open Graph tags all read from it; without it they fall back to a
placeholder domain.

Photography lives in `public/images/` as WebP. Any listing without a photo falls
back to an on-brand gradient scene rather than breaking the grid.

## Wiring up inquiries

`submitInquiry` in `src/app/actions.ts` validates each submission and logs it.
Delivery is deliberately left as a single marked line so it can be pointed at
whatever the client already uses — an email provider (Resend, SendGrid), a CRM
webhook, or a database insert. Add spam protection and a rate limit at the same
time.

## Built with

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · Lucide icons

See `DESIGN.md` for the full design system — palette, typography, component
rules and the current list of known gaps.
