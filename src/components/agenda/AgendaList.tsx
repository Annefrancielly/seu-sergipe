"use client";

import { useSyncExternalStore } from "react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { agendaContent } from "@/content/agenda";
import { useLocale } from "@/i18n/LocaleProvider";
import { formatAgendaDate, sortAgenda, upcomingAgenda } from "@/lib/agenda";
import { formatHour, formatHourRange, getZonedIsoDate } from "@/lib/opening-hours";
import { formatPrice } from "@/lib/price";
import { whatsappHref } from "@/lib/whatsapp";
import type { AgendaItem } from "@/types/content";

const subscribe = () => () => {};
const getToday = () => getZonedIsoDate(new Date());
const getServerToday = () => null;

export function AgendaList({ items }: { items: readonly AgendaItem[] }) {
  const { locale } = useLocale();
  const copy = agendaContent[locale];
  const today = useSyncExternalStore(subscribe, getToday, getServerToday);
  const visible = today ? upcomingAgenda(items, today) : sortAgenda(items);

  if (visible.length === 0) {
    return (
      <div className="surgir vidro-cafe mt-8 rounded-[1.75rem] p-8 text-center sm:p-12">
        <p className="font-display text-4xl leading-none">{copy.emptyTitle}</p>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed">{copy.emptyText}</p>
        <ButtonLink href={whatsappHref(copy.notifyMessage)} locale={locale} withArrow className="mt-8">
          {copy.notifyLabel}
        </ButtonLink>
      </div>
    );
  }

  return (
    <ol className="mt-8 grid gap-5">
      {visible.map((item) => {
        const text = item.text[locale];
        const date = formatAgendaDate(item.date, locale);
        const time = item.time
          ? item.endTime
            ? formatHourRange(item.time, item.endTime, locale)
            : formatHour(item.time, locale)
          : undefined;
        const when = [text.schedule, time].filter(Boolean).join(" · ");

        return (
          <li key={item.slug} className="vidro-cafe grid gap-4 rounded-[1.75rem] p-7 sm:grid-cols-[10rem_1fr] sm:p-8">
            <div>
              <span className="inline-block rounded-full border border-accent/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-accent">
                {copy.kinds[item.kind]}
              </span>
              <p className="mt-3 font-display text-3xl leading-none text-accent">
                {item.until && <span className="block text-xs font-normal tracking-[0.2em] text-ink/70">{copy.from}</span>}
                {date}
              </p>
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-3xl leading-none">{text.title}</h3>
              {when && <p className="mt-3 text-sm uppercase tracking-[0.18em] text-emphasis">{when}</p>}
              {text.description && <p className="mt-3 leading-relaxed">{text.description}</p>}
              {(text.location || item.priceInCents !== undefined) && (
                <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                  {text.location && (
                    <div className="flex gap-1.5">
                      <dt className="text-ink/60">{copy.venue}:</dt>
                      <dd>{text.location}</dd>
                    </div>
                  )}
                  {item.priceInCents !== undefined && (
                    <div className="flex gap-1.5">
                      <dd className="font-display text-lg leading-none text-emphasis tabular-nums">
                        {formatPrice(item.priceInCents)}
                      </dd>
                      <dt className="text-ink/60">{copy.perPerson}</dt>
                    </div>
                  )}
                </dl>
              )}
              <ButtonLink
                href={whatsappHref(copy.joinMessage(text.title, date))}
                variant="link"
                withArrow
                locale={locale}
                className="mt-4"
              >
                {copy.joinLabel}
              </ButtonLink>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
