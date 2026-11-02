import Link from "next/link";

import { siteConfig } from "@/config/site";
import { defaultLocale, localizePath } from "@/i18n/config";

const fallbackPath = localizePath(defaultLocale, "/");

const chooseLanguage = `(function(){var l=(navigator.languages&&navigator.languages[0])||navigator.language||"";location.replace(/^pt/i.test(l)?"/pt":"/en");})();`;

export default function LanguageRedirect() {
  return (
    <html lang="pt-BR">
      <body>
        <title>{`${siteConfig.name} — ${siteConfig.tagline}`}</title>
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={fallbackPath} />
        <script dangerouslySetInnerHTML={{ __html: chooseLanguage }} />
        <noscript>
          <meta httpEquiv="refresh" content={`0; url=${fallbackPath}`} />
        </noscript>
        <p>
          <Link href="/pt">Seu Sergipe em português</Link> · <Link href="/en">Seu Sergipe in English</Link>
        </p>
      </body>
    </html>
  );
}
