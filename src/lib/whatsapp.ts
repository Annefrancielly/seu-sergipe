import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { buildReservationMessage, buildWhatsAppUrl } from "@/lib/reservation";

export function reservationHref(intro?: string, locale: Locale = "pt"): string {
  return buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    buildReservationMessage({ intro }, siteConfig.name, locale),
  );
}

export function whatsappHref(message: string): string {
  return buildWhatsAppUrl(siteConfig.contact.whatsappNumber, message);
}
