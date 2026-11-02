"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

type TastingMenuCardProps = {
  name: string;
  steps?: number;
  description?: string;
  details: readonly string[];
  photo?: ImageAsset;
  interest: string;
  labels: { reveal: string; close: string; reserve: string };
};

export function TastingMenuCard({ name, steps, description, details, photo, interest, labels }: TastingMenuCardProps) {
  const [open, setOpen] = useState(false);
  const hasInteracted = useRef(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const stepsLabel = steps === undefined ? undefined : `${steps} etapas`;

  useEffect(() => {
    if (!hasInteracted.current) return;
    if (open) panelRef.current?.focus({ preventScroll: true });
    else openButtonRef.current?.focus({ preventScroll: true });
  }, [open]);

  const toggle = (next: boolean) => {
    hasInteracted.current = true;
    setOpen(next);
  };

  return (
    <article className="group sombra-profunda relative isolate aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-cafe-noite">
      {photo && (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw"
          className="-z-20 object-cover transition-transform duration-[1600ms] ease-organic motion-safe:group-hover:scale-105"
          style={{ objectPosition: photo.objectPosition }}
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(26_15_10/0.15)_0%,rgb(26_15_10/0)_30%,rgb(26_15_10/0.6)_62%,rgb(26_15_10/0.96)_100%)]"
      />
      <div aria-hidden="true" className="moldura-foto -z-10" />

      <div
        inert={open}
        className={cn(
          "flex h-full flex-col justify-end p-6 transition-opacity duration-500 ease-organic",
          open && "opacity-0",
        )}
      >
        {stepsLabel && <p className="text-xs uppercase tracking-[0.3em] text-accent">{stepsLabel}</p>}
        <h3 className="mt-2 font-display text-3xl leading-none font-semibold uppercase sm:text-4xl">{name}</h3>
        <button
          ref={openButtonRef}
          type="button"
          onClick={() => toggle(true)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-5 inline-flex min-h-11 items-center gap-3 self-start text-xs uppercase tracking-[0.24em]"
        >
          <span
            aria-hidden="true"
            className="inline-flex size-9 items-center justify-center rounded-full border border-ink/50 transition-colors duration-300 group-hover:border-accent group-hover:text-accent"
          >
            <svg viewBox="0 0 24 24" focusable="false" className="size-4">
              <path className="traco-marca" d="M12 5 L12 19 M5 12 L19 12" />
            </svg>
          </span>
          {labels.reveal}
          <span className="sr-only">: {name}</span>
        </button>
      </div>

      <div
        ref={panelRef}
        id={panelId}
        role="group"
        aria-label={`Sobre o ${name}`}
        tabIndex={-1}
        inert={!open}
        className={cn(
          "vidro absolute inset-x-3 bottom-3 flex max-h-[calc(100%-1.5rem)] flex-col overflow-y-auto rounded-[1.25rem] p-6 transition-[opacity,translate] duration-500 ease-organic",
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
        )}
      >
        {stepsLabel && <p className="text-xs uppercase tracking-[0.3em] text-accent">{stepsLabel}</p>}
        <p className="mt-2 font-display text-2xl leading-none font-semibold uppercase">{name}</p>
        {description && <p className="mt-4 text-sm leading-relaxed">{description}</p>}
        {details.map((detail) => (
          <p key={detail} className="mt-3 text-xs leading-relaxed text-emphasis">
            {detail}
          </p>
        ))}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <ReservationTrigger variant="link" intro={interest} srContext={`: ${name}`}>
            {labels.reserve}
          </ReservationTrigger>
          <button
            type="button"
            onClick={() => toggle(false)}
            className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.24em]"
          >
            {labels.close}
          </button>
        </div>
      </div>
    </article>
  );
}
