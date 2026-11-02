"use client";

import { useEffect, useId, useRef, useState } from "react";

import { PriceList } from "@/components/menu/PriceList";
import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { cn } from "@/lib/cn";
import { DISH_TAG_LABELS, interestPhrase } from "@/lib/menu";
import type { Dish } from "@/types/content";

type FlipCardProps = {
  dish: Dish;
  shape?: "folha" | "folha-inversa";
};

function TurnIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={cn("size-5 shrink-0", className)}>
      <path className="traco-marca" d="M20 12 C20 16.4 16.4 20 12 20 C7.6 20 4 16.4 4 12 C4 7.6 7.6 4 12 4 C14.6 4 16.9 5.2 18.3 7.2 M18.6 3.5 L18.4 7.4 L14.6 7.2" />
    </svg>
  );
}

export function FlipCard({ dish, shape = "folha" }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const hasInteracted = useRef(false);
  const frontButtonRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const backId = useId();
  const radius = shape === "folha" ? "rounded-folha" : "rounded-folha-inversa";

  useEffect(() => {
    if (!hasInteracted.current) return;
    if (flipped) backRef.current?.focus({ preventScroll: true });
    else frontButtonRef.current?.focus({ preventScroll: true });
  }, [flipped]);

  const turn = (next: boolean) => {
    hasInteracted.current = true;
    setFlipped(next);
  };

  return (
    <article id={dish.slug} className="scroll-mt-24 [perspective:1400px]">
      <div
        className={cn(
          "grid h-full transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] [transform-style:preserve-3d]",
          flipped && "motion-safe:[transform:rotateY(180deg)]",
        )}
      >
        <div
          data-surface="verde"
          inert={flipped}
          className={cn(
            "contorno-luz [grid-area:1/1] bg-surface text-ink [backface-visibility:hidden]",
            radius,
            flipped && "motion-reduce:invisible",
          )}
        >
          <button
            ref={frontButtonRef}
            type="button"
            onClick={() => turn(true)}
            aria-expanded={flipped}
            aria-controls={backId}
            className={cn("flex h-full min-h-44 w-full flex-col items-center p-6 text-center transition-[scale] duration-150 active:scale-[0.98] sm:items-start sm:text-left", radius)}
          >
            <span className="font-display text-2xl leading-tight">{dish.name}</span>
            {dish.steps !== undefined && (
              <span className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-emphasis">
                {dish.steps} etapas
              </span>
            )}
            {dish.prices && <PriceList prices={dish.prices} className="mt-4 w-full" />}
            <span className="mt-auto flex w-full flex-col items-center gap-4 pt-6 sm:items-start">
              <svg viewBox="0 0 120 16" aria-hidden="true" focusable="false" className="h-4 w-24 text-accent">
                <path className="traco-marca" d="M2 10 C18 2 30 2 44 8 C58 14 72 14 86 7 C98 2 108 3 118 8" />
              </svg>
              <span className="flex items-center gap-2 text-sm font-semibold text-emphasis">
                <TurnIcon />
                Toque para saber mais
              </span>
            </span>
          </button>
        </div>

        <div
          ref={backRef}
          id={backId}
          tabIndex={-1}
          data-surface="marrom"
          inert={!flipped}
          role="group"
          aria-label={`Sobre ${dish.name}`}
          className={cn(
            "flex flex-col bg-surface p-6 text-ink [grid-area:1/1] [backface-visibility:hidden] motion-safe:[transform:rotateY(180deg)]",
            radius,
            !flipped && "motion-reduce:invisible",
          )}
        >
          <p className="font-display text-xl leading-tight">{dish.name}</p>
          {dish.description && <p className="mt-3 text-[0.95rem] leading-relaxed">{dish.description}</p>}
          {dish.items && (
            <ul className="mt-3 space-y-1 text-sm">
              {dish.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true">·</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
          {dish.story && <p className="mt-3 text-sm italic leading-relaxed text-emphasis">{dish.story}</p>}
          {dish.note && <p className="mt-3 text-sm">{dish.note}</p>}
          {dish.tags?.map((tag) => (
            <p key={tag} className="mt-3 text-sm font-semibold">
              {DISH_TAG_LABELS[tag]}
            </p>
          ))}

          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 pt-5">
            <ReservationTrigger variant="link" intro={interestPhrase(dish)} srContext={`: ${dish.name}`}>
              Quero provar
            </ReservationTrigger>
            <button
              type="button"
              onClick={() => turn(false)}
              className="inline-flex min-h-12 items-center gap-2 text-sm font-semibold"
            >
              <TurnIcon className="-scale-x-100" />
              Voltar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
