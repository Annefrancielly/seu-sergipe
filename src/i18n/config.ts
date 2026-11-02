export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

type LocaleMeta = {
  htmlLang: string;
  intl: string;
  openGraph: string;
  label: string;
  short: string;
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  pt: { htmlLang: "pt-BR", intl: "pt-BR", openGraph: "pt_BR", label: "Português", short: "PT" },
  en: { htmlLang: "en-US", intl: "en-US", openGraph: "en_US", label: "English", short: "EN" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localizePath(locale: Locale, path: string): string {
  if (/^[a-z]+:/i.test(path)) return path;
  const [pathname = "/", hash] = path.split("#");
  const base = pathname === "/" || pathname === "" ? `/${locale}` : `/${locale}${pathname}`;
  return hash ? `${base}#${hash}` : base;
}

export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  const [first, ...rest] = segments;
  const remainder = first !== undefined && isLocale(first) ? rest : segments;
  return localizePath(target, remainder.length > 0 ? `/${remainder.join("/")}` : "/");
}

export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((locale) => [localeMeta[locale].htmlLang, localizePath(locale, path)])),
    "x-default": localizePath(defaultLocale, path),
  };
}
