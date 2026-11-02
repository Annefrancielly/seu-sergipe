import type { Locale } from "@/i18n/config";

export type ReservationRequest = {
  intro?: string;
  name?: string;
  date?: string;
  time?: string;
  guests?: number;
  occasion?: string;
  notes?: string;
};

export const MAX_FIELD_LENGTH = 280;
export const MAX_GUESTS = 60;

const WHATSAPP_NUMBER_PATTERN = /^55\d{10,11}$/;
const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function buildWhatsAppUrl(phoneNumber: string, message?: string): string {
  if (!WHATSAPP_NUMBER_PATTERN.test(phoneNumber)) {
    throw new Error(`Número de WhatsApp inválido: "${phoneNumber}"`);
  }

  const base = `https://wa.me/${phoneNumber}`;
  const text = message?.trim();

  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function sanitizeField(value: string | undefined): string | undefined {
  if (value === undefined) return undefined;
  const clean = value.replace(/\s+/g, " ").trim().slice(0, MAX_FIELD_LENGTH);
  return clean.length > 0 ? clean : undefined;
}

const MESSAGE_LABELS: Record<Locale, Record<"greeting" | "name" | "date" | "time" | "guests" | "occasion" | "notes", string>> = {
  pt: {
    greeting: "Olá! Gostaria de reservar uma mesa no",
    name: "Nome",
    date: "Data",
    time: "Horário",
    guests: "Pessoas",
    occasion: "Ocasião",
    notes: "Observações",
  },
  en: {
    greeting: "Hello! I would like to book a table at",
    name: "Name",
    date: "Date",
    time: "Time",
    guests: "Guests",
    occasion: "Occasion",
    notes: "Notes",
  },
};

const DATE_LOCALES: Record<Locale, string> = { pt: "pt-BR", en: "en-US" };

export function formatReservationDate(isoDate: string, locale: Locale = "pt"): string | undefined {
  const match = ISO_DATE_PATTERN.exec(isoDate);
  if (!match) return undefined;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  const isRealDate =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;
  if (!isRealDate) return undefined;

  return new Intl.DateTimeFormat(DATE_LOCALES[locale], {
    weekday: "long",
    day: locale === "en" ? "numeric" : "2-digit",
    month: locale === "en" ? "long" : "2-digit",
    timeZone: "UTC",
  }).format(date);
}

export function formatReservationTime(time: string, locale: Locale = "pt"): string | undefined {
  const match = TIME_PATTERN.exec(time);
  if (!match) return undefined;

  const hours = Number(match[1]);
  const minutes = match[2];
  if (locale === "en") {
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    return `${hour12}:${minutes} ${hours < 12 ? "AM" : "PM"}`;
  }
  return minutes === "00" ? `${hours}h` : `${hours}h${minutes}`;
}

function isValidGuestCount(guests: number | undefined): guests is number {
  return (
    guests !== undefined &&
    Number.isInteger(guests) &&
    guests >= 1 &&
    guests <= MAX_GUESTS
  );
}

export function buildReservationMessage(
  request: ReservationRequest,
  restaurantName: string,
  locale: Locale = "pt",
): string {
  const labels = MESSAGE_LABELS[locale];
  const lines = [`${labels.greeting} ${restaurantName}.`];

  const intro = sanitizeField(request.intro);
  if (intro) lines.push(intro);

  const details: string[] = [];
  const name = sanitizeField(request.name);
  const date = request.date ? formatReservationDate(request.date, locale) : undefined;
  const time = request.time ? formatReservationTime(request.time, locale) : undefined;
  const occasion = sanitizeField(request.occasion);
  const notes = sanitizeField(request.notes);

  if (name) details.push(`• ${labels.name}: ${name}`);
  if (date) details.push(`• ${labels.date}: ${date}`);
  if (time) details.push(`• ${labels.time}: ${time}`);
  if (isValidGuestCount(request.guests)) {
    details.push(`• ${labels.guests}: ${request.guests}`);
  }
  if (occasion) details.push(`• ${labels.occasion}: ${occasion}`);
  if (notes) details.push(`• ${labels.notes}: ${notes}`);

  if (details.length > 0) lines.push("", ...details);

  return lines.join("\n");
}


function readText(form: FormData, field: string): string | undefined {
  const value = form.get(field);
  return typeof value === "string" ? value : undefined;
}

export function readReservationForm(form: FormData, intro?: string): ReservationRequest {
  const guestsValue = readText(form, "guests");
  const guests = guestsValue ? Number(guestsValue) : undefined;

  return {
    intro,
    name: readText(form, "name"),
    date: readText(form, "date"),
    time: readText(form, "time"),
    guests: guests !== undefined && Number.isFinite(guests) ? guests : undefined,
    occasion: readText(form, "occasion"),
    notes: readText(form, "notes"),
  };
}
