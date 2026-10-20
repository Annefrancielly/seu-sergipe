import { siteConfig } from "@/config/site";
import { buildReservationMessage, buildWhatsAppUrl } from "@/lib/reservation";

export function reservationHref(intro?: string): string {
  return buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    buildReservationMessage({ intro }, siteConfig.name),
  );
}
