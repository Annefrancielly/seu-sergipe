import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { type Locale, isLocale, languageAlternates, localeMeta, localizePath, locales } from "@/i18n/config";

export type LocaleParams = { params: Promise<{ lang: string }> };

export function generateLocaleParams(): { lang: Locale }[] {
  return locales.map((lang) => ({ lang }));
}

export async function resolveLocale(params: LocaleParams["params"]): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}

type PageMetadataInput = {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
};

export function pageMetadata({ locale, path, title, description }: PageMetadataInput): Metadata {
  const url = localizePath(locale, path);
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      url,
      locale: localeMeta[locale].openGraph,
      alternateLocale: locales.filter((other) => other !== locale).map((other) => localeMeta[other].openGraph),
      ...(title ? { title } : {}),
      description,
    },
  };
}
