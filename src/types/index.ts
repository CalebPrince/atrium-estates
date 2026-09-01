export interface NavLink {
  href: string;
  label: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export type SceneVariant = "dusk" | "night" | "interior" | "ember";

export type PropertyStatus = "For Sale" | "Reserved" | "Sold";

export type PropertyType =
  | "Villa"
  | "Cabin"
  | "Pavilion"
  | "Residence"
  | "Townhouse";

export interface GallerySlot {
  /** Sourced photo path, or null to fall back to the gradient `Scene`. */
  photo: string | null;
  variant: SceneVariant;
  caption: string;
}

export interface Agent {
  name: string;
  role: string;
  phone: string;
  email: string;
  initials: string;
}

export interface Property {
  slug: string;
  name: string;
  location: string;
  city: string;
  country: string;
  type: PropertyType;
  status: PropertyStatus;
  /** Numeric so the listing page can filter and sort on it. */
  price: number;
  beds: number;
  baths: number;
  floors: number;
  /** Interior floor area in m². */
  area: number;
  /** Plot size in m². */
  plot: number;
  yearBuilt: number;
  estimate: string;
  energyRating: "A" | "B" | "C";
  summary: string;
  description: string[];
  features: string[];
  variant: SceneVariant;
  photo: string;
  gallery: GallerySlot[];
  agent: Agent;
  featured: boolean;
}

export interface ServiceItem {
  title: string;
  body: string;
}

/** Legacy alias kept so existing homepage sections keep compiling. */
export type Project = Property;
