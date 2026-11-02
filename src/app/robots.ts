import type { MetadataRoute } from "next";

import { deployment } from "@/config/deployment";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!deployment.allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/pt/design-system", "/en/design-system"] },
    sitemap: new URL("/sitemap.xml", deployment.siteUrl).href,
  };
}
