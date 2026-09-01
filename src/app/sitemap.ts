import type { MetadataRoute } from "next";
import { PROPERTIES } from "@/data/properties";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/properties`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...PROPERTIES.map((property) => ({
      url: `${SITE.url}/properties/${property.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
