import type { MetadataRoute } from "next";

import { deployment } from "@/config/deployment";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/chef", "/eventos", "/agenda", "/cardapio"];
  return paths.map((path) => ({ url: new URL(path, deployment.siteUrl).href }));
}
