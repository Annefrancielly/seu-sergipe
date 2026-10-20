"use client";

import { useEffect, useState } from "react";

import { openingHours } from "@/content/opening-hours";
import { describeOpenStatus, getOpenStatus, getZonedMoment } from "@/lib/opening-hours";

const REFRESH_INTERVAL_MS = 60_000;

function currentStatus(): { text: string; isOpen: boolean } | undefined {
  const status = getOpenStatus(openingHours, getZonedMoment(new Date()));
  const text = describeOpenStatus(status);
  return text ? { text, isOpen: status.state === "open" } : undefined;
}

export function OpenStatus() {
  const [status, setStatus] = useState<ReturnType<typeof currentStatus>>(undefined);

  useEffect(() => {
    const update = () => setStatus(currentStatus());
    update();
    const timer = window.setInterval(update, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

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
