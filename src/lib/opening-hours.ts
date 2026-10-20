import type { OpeningHours, ServicePeriod, Weekday } from "@/types/content";

const RESTAURANT_TIME_ZONE = "America/Maceio";

const WEEKDAYS_BY_INDEX: readonly Weekday[] = [
  "domingo",
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
];

const DISPLAY_ORDER: readonly Weekday[] = [
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
  "domingo",
];

const WEEKDAY_LABELS: Record<Weekday, string> = {
  domingo: "domingo",
  segunda: "segunda",
  terca: "terça",
  quarta: "quarta",
  quinta: "quinta",
  sexta: "sexta",
  sabado: "sábado",
};

const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function toMinutes(time: string): number {
  const match = TIME_PATTERN.exec(time);
  if (!match) throw new Error(`Horário inválido: "${time}"`);
  return Number(match[1]) * 60 + Number(match[2]);
}

function fromMinutes(totalMinutes: number): string {
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatHour(time: string): string {
  const [hours = "", minutes = ""] = time.split(":");
  return minutes === "00" ? `${Number(hours)}h` : `${Number(hours)}h${minutes}`;
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function periodsFor(hours: readonly OpeningHours[], day: Weekday): readonly ServicePeriod[] {
  return hours.find((entry) => entry.day === day)?.periods ?? [];
}

function signature(periods: readonly ServicePeriod[]): string {
  return periods.map((period) => `${period.label}|${period.opens}|${period.closes}`).join(";");
}

export type OpeningHoursRow = {
  days: string;
  periods: readonly ServicePeriod[];
};

export function groupOpeningHours(hours: readonly OpeningHours[]): OpeningHoursRow[] {
  const groups: { days: Weekday[]; periods: readonly ServicePeriod[] }[] = [];

  for (const day of DISPLAY_ORDER) {
    const periods = periodsFor(hours, day);
    const last = groups.at(-1);
    if (last && signature(last.periods) === signature(periods)) {
      last.days.push(day);
    } else {
      groups.push({ days: [day], periods });
    }
  }

  return groups.map(({ days, periods }) => {
    const first = WEEKDAY_LABELS[days[0] as Weekday];
    const lastDay = WEEKDAY_LABELS[days.at(-1) as Weekday];
    const label =
      days.length === 1 ? first : days.length === 2 ? `${first} e ${lastDay}` : `${first} a ${lastDay}`;
    return { days: capitalize(label), periods };
  });
}

export type ZonedMoment = {
  weekday: Weekday;
  minutes: number;
};

const SHORT_WEEKDAYS: Record<string, Weekday> = {
  Sun: "domingo",
  Mon: "segunda",
  Tue: "terca",
  Wed: "quarta",
  Thu: "quinta",
  Fri: "sexta",
  Sat: "sabado",
};

export function getZonedMoment(date: Date, timeZone = RESTAURANT_TIME_ZONE): ZonedMoment {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekday = SHORT_WEEKDAYS[get("weekday")];
  if (!weekday) throw new Error("Não foi possível identificar o dia da semana");

  return { weekday, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export type OpenStatus =
  | { state: "open"; period: ServicePeriod }
  | { state: "closed"; daysAhead: number; weekday: Weekday; period: ServicePeriod }
  | { state: "unknown" };

export function getOpenStatus(hours: readonly OpeningHours[], now: ZonedMoment): OpenStatus {
  const todayIndex = WEEKDAYS_BY_INDEX.indexOf(now.weekday);

  for (const period of periodsFor(hours, now.weekday)) {
    if (now.minutes >= toMinutes(period.opens) && now.minutes < toMinutes(period.closes)) {
      return { state: "open", period };
    }
  }

  for (let daysAhead = 0; daysAhead < 7; daysAhead += 1) {
    const weekday = WEEKDAYS_BY_INDEX[(todayIndex + daysAhead) % 7] as Weekday;
    const upcoming = periodsFor(hours, weekday).find(
      (period) => daysAhead > 0 || toMinutes(period.opens) > now.minutes,
    );
    if (upcoming) return { state: "closed", daysAhead, weekday, period: upcoming };
  }

  return { state: "unknown" };
}

export function describeOpenStatus(status: OpenStatus): string | undefined {
  switch (status.state) {
    case "open":
      return `Aberto agora · ${status.period.label.toLowerCase()} até ${formatHour(status.period.closes)}`;
    case "closed": {
      const when =
        status.daysAhead === 0
          ? "hoje"
          : status.daysAhead === 1
            ? "amanhã"
            : WEEKDAY_LABELS[status.weekday];
      return `Fechado agora · abre ${when} às ${formatHour(status.period.opens)}`;
    }
    case "unknown":
      return undefined;
  }
}

export function weekdayFromIsoDate(isoDate: string): Weekday | undefined {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return undefined;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  if (Number.isNaN(date.getTime())) return undefined;
  return WEEKDAYS_BY_INDEX[date.getUTCDay()];
}

const SLOT_INTERVAL_MINUTES = 30;
const LAST_SEATING_BEFORE_CLOSE_MINUTES = 30;

export type TimeSlotGroup = {
  label: string;
  slots: string[];
};

export function listTimeSlots(hours: readonly OpeningHours[], weekday: Weekday): TimeSlotGroup[] {
  return periodsFor(hours, weekday).map((period) => {
    const slots: string[] = [];
    const last = toMinutes(period.closes) - LAST_SEATING_BEFORE_CLOSE_MINUTES;
    for (let minutes = toMinutes(period.opens); minutes <= last; minutes += SLOT_INTERVAL_MINUTES) {
      slots.push(fromMinutes(minutes));
    }
    return { label: period.label, slots };
  });
}

export function getZonedIsoDate(date: Date, timeZone = RESTAURANT_TIME_ZONE): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function availableTimeSlots(
  hours: readonly OpeningHours[],
  isoDate: string,
  now: Date,
): TimeSlotGroup[] {
  const weekday = weekdayFromIsoDate(isoDate);
  if (!weekday) return [];

  const today = getZonedIsoDate(now);
  if (isoDate < today) return [];

  const groups = listTimeSlots(hours, weekday);
  if (isoDate > today) return groups;

  const { minutes } = getZonedMoment(now);
  return groups
    .map((group) => ({ ...group, slots: group.slots.filter((slot) => toMinutes(slot) > minutes) }))
    .filter((group) => group.slots.length > 0);
}
