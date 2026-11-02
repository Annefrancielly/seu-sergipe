import type { MetadataRoute } from "next";

import { deployment } from "@/config/deployment";
import { languageAlternates, localizePath, locales } from "@/i18n/config";

export const dynamic = "force-static";

const PATHS = ["/", "/chef", "/eventos", "/agenda", "/cardapio"] as const;

function absolute(path: string): string {
  return new URL(path, deployment.siteUrl).href;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([language, href]) => [language, absolute(href)]),
    );
    return locales.map((locale) => ({
      url: absolute(localizePath(locale, path)),
      alternates: { languages },
    }));
  });
}
