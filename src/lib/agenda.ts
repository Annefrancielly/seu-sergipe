import type { Locale } from "@/i18n/config";
import type { Workshop } from "@/types/content";

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

const dateFormatters: Record<Locale, Intl.DateTimeFormat> = {
  pt: new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", timeZone: "UTC" }),
  en: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
};

function parseIsoDate(isoDate: string): Date | undefined {
  const match = ISO_DATE.exec(isoDate);
  if (!match) return undefined;
  const [, year, month, day] = match.map(Number);
  const date = new Date(Date.UTC(year ?? 0, (month ?? 1) - 1, day ?? 1));
  return date.getUTCDate() === day ? date : undefined;
}

export function formatWorkshopDate(isoDate: string, locale: Locale = "pt"): string {
  const date = parseIsoDate(isoDate);
  return date ? dateFormatters[locale].format(date).replace(".", "") : isoDate;
}

export function sortWorkshops(workshops: readonly Workshop[]): Workshop[] {
  return workshops.toSorted((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
}

export function isValidWorkshopDate(isoDate: string): boolean {
  return parseIsoDate(isoDate) !== undefined;
}
