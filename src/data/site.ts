import type { ServiceItem, StatItem } from "@/types";

/**
 * Single source of truth for the brand. Renaming the studio, swapping contact
 * details or pointing at a new domain is a one-file change — nothing below
 * this line is hardcoded into a component.
 */
export const SITE = {
  name: "Atrium Estates",
  tagline: "Modern Homes",
  description:
    "Atrium Estates designs and sells architect-led homes shaped by light, honest materials, and quiet luxury.",
  phone: "+47 22 15 09 82",
  email: "hello@atriumestates.com",
  address: "Strandveien 12, Oslo, Norway",
  motto: "Minimalism. Nature. Architecture.",
  /**
   * Used for canonical URLs, the sitemap and Open Graph tags. Set
   * NEXT_PUBLIC_SITE_URL in the deployment environment once the real domain is
   * known — otherwise these all point at the fallback below.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://atrium-estates.vercel.app",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
} as const;

export const HERO_STATS: StatItem[] = [
  { value: "+25", label: "Completed Homes" },
  { value: "16", label: "Years of Experience" },
  { value: "12", label: "Design Awards" },
];

export const ABOUT_PHASE_STATS: StatItem[] = [
  { value: "16+", label: "Regions Served" },
  { value: "95%", label: "Client Satisfaction" },
  { value: "25+", label: "Move-in Ready Homes" },
];

export const SERVICES: ServiceItem[] = [
  {
    title: "Architectural Design",
    body: "From first sketch to final drawing, we shape floor plans and forms that respond to light, site, and how you actually live.",
  },
  {
    title: "Interior Concept",
    body: "Spaces that feel like an extension of the architecture — natural materials, honest color, and quiet, considered detail.",
  },
  {
    title: "Project Management",
    body: "We coordinate every contractor and milestone so timelines and budgets stay exactly where we promised they would.",
  },
  {
    title: "Landscape & Site",
    body: "The land shapes the home, not the other way around — we design gardens and grounds that belong to the terrain.",
  },
];

export { PROPERTIES as PROJECTS } from "@/data/properties";
