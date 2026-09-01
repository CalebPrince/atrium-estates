import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Personal shortlist — no value in the index.
      disallow: "/saved",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
