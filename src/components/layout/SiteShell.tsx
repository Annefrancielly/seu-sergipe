import type { ReactNode } from "react";

import { fonteTexto, fonteTitulos } from "@/app/fonts";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ReservationProvider } from "@/components/reservation/ReservationProvider";
import { type Locale, localeMeta } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { ui } from "@/i18n/ui";

type SiteShellProps = {
  locale: Locale;
  children: ReactNode;
};

export function SiteShell({ locale, children }: SiteShellProps) {
  return (
    <html lang={localeMeta[locale].htmlLang} className={`${fonteTitulos.variable} ${fonteTexto.variable}`}>
      <body suppressHydrationWarning className="overflow-x-clip bg-surface text-ink antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-creme focus:px-5 focus:py-3 focus:text-cafe"
        >
          {ui[locale].skipToContent}
        </a>
        <LocaleProvider locale={locale}>
          <ReservationProvider>
            <SiteHeader />
            {children}
            <SiteFooter locale={locale} />
          </ReservationProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
