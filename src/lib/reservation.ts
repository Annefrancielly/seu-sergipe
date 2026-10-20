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

export function formatReservationDate(isoDate: string): string | undefined {
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

  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    timeZone: "UTC",
  }).format(date);
}

export function formatReservationTime(time: string): string | undefined {
  const match = TIME_PATTERN.exec(time);
  if (!match) return undefined;

  const hours = Number(match[1]);
  const minutes = match[2];
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
): string {
  const lines = [`Olá! Gostaria de reservar uma mesa no ${restaurantName}.`];

  const intro = sanitizeField(request.intro);
  if (intro) lines.push(intro);

  const details: string[] = [];
  const name = sanitizeField(request.name);
  const date = request.date ? formatReservationDate(request.date) : undefined;
  const time = request.time ? formatReservationTime(request.time) : undefined;
  const occasion = sanitizeField(request.occasion);
  const notes = sanitizeField(request.notes);

  if (name) details.push(`• Nome: ${name}`);
  if (date) details.push(`• Data: ${date}`);
  if (time) details.push(`• Horário: ${time}`);
  if (isValidGuestCount(request.guests)) {
    details.push(`• Pessoas: ${request.guests}`);
  }
  if (occasion) details.push(`• Ocasião: ${occasion}`);
  if (notes) details.push(`• Observações: ${notes}`);

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
