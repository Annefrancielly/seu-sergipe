"use client";

import { useEffect, useState } from "react";

import { openingHours } from "@/content/opening-hours";
import type { Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import { describeOpenStatus, getOpenStatus, getZonedMoment } from "@/lib/opening-hours";

const REFRESH_INTERVAL_MS = 60_000;

function currentStatus(locale: Locale): { text: string; isOpen: boolean } | undefined {
  const status = getOpenStatus(openingHours, getZonedMoment(new Date()));
  const text = describeOpenStatus(status, locale);
  return text ? { text, isOpen: status.state === "open" } : undefined;
}

export function OpenStatus() {
  const { locale } = useLocale();
  const [status, setStatus] = useState<ReturnType<typeof currentStatus>>(undefined);

  useEffect(() => {
    const update = () => setStatus(currentStatus(locale));
    update();
    const timer = window.setInterval(update, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [locale]);

  return (
    <p className="flex min-h-7 items-center gap-2 text-sm font-semibold">
      {status && (
        <>
          <span
            aria-hidden="true"
            className={`size-2.5 rounded-full ${status.isOpen ? "bg-emphasis" : "border-2 border-current"}`}
          />
          {status.text}
        </>
      )}
    </p>
  );
}
