import type { Metadata, Viewport } from "next";

import { fonteTexto, fonteTitulos } from "@/app/fonts";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
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
  themeColor: "#151710",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fonteTitulos.variable} ${fonteTexto.variable}`}>
      <body className="overflow-x-clip bg-surface text-ink antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-creme focus:px-5 focus:py-3 focus:text-cafe"
        >
          Pular para o conteúdo
        </a>
        <ReservationProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ReservationProvider>
      </body>
    </html>
  );
}
