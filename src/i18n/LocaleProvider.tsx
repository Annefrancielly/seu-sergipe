"use client";

import { type ReactNode, createContext, useContext } from "react";

import { type Locale, defaultLocale } from "@/i18n/config";
import { type UiStrings, ui } from "@/i18n/ui";

const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): { locale: Locale; t: UiStrings } {
  const locale = useContext(LocaleContext);
  return { locale, t: ui[locale] };
}
