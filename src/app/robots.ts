import type { MetadataRoute } from "next";

import { deployment } from "@/config/deployment";

export default function robots(): MetadataRoute.Robots {
  if (!deployment.allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/design-system" },
    sitemap: new URL("/sitemap.xml", deployment.siteUrl).href,
  };
}
