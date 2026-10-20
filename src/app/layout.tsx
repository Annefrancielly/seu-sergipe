import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { ReservationProvider } from "@/components/reservation/ReservationProvider";
import { deployment } from "@/config/deployment";
import { siteConfig } from "@/config/site";

import "./globals.css";

const defaultTitle = `${siteConfig.name} — ${siteConfig.tagline}`;

export const metadata: Metadata = {
  metadataBase: deployment.siteUrl,
  title: {
    default: defaultTitle,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
  },
  robots: deployment.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#003122",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="overflow-x-clip bg-surface text-ink antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-creme focus:px-5 focus:py-3 focus:text-verde-profundo"
        >
          Pular para o conteúdo
        </a>
        <ReservationProvider>
          {children}
          <SiteFooter />
        </ReservationProvider>
      </body>
    </html>
  );
}
