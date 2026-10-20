import type { MetadataRoute } from "next";

import { deployment } from "@/config/deployment";
import { menuCategories } from "@/content/menu";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/cardapio", ...menuCategories.map((category) => `/cardapio/${category.slug}`)];
  return paths.map((path) => ({ url: new URL(path, deployment.siteUrl).href }));
}
