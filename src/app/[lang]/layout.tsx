import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteShell } from "@/components/layout/SiteShell";
import { deployment } from "@/config/deployment";
import { siteConfig } from "@/config/site";
import { localeMeta } from "@/i18n/config";
import { type LocaleParams, generateLocaleParams, resolveLocale } from "@/i18n/server";
import { ui } from "@/i18n/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return generateLocaleParams();
}

const defaultTitle = `${siteConfig.name} — ${siteConfig.tagline}`;

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { description } = ui[locale].meta;

  return {
    metadataBase: deployment.siteUrl,
    title: { default: defaultTitle, template: `%s · ${siteConfig.name}` },
    description,
    applicationName: siteConfig.name,
    openGraph: {
      type: "website",
      locale: localeMeta[locale].openGraph,
      siteName: siteConfig.name,
      title: defaultTitle,
      description,
    },
    robots: deployment.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#151710",
  viewportFit: "cover",
};

export default async function LocaleLayout({ children, params }: Readonly<{ children: ReactNode }> & LocaleParams) {
  const locale = await resolveLocale(params);
  return <SiteShell locale={locale}>{children}</SiteShell>;
}
