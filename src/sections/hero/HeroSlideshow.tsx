"use client";

import Image, { type StaticImageData } from "next/image";
import { type ReactNode, useEffect, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";

export type HeroSlide = {
  word: string;
  image: StaticImageData | string;
  objectPosition?: string;
};

type HeroSlideshowProps = {
  slides: readonly HeroSlide[];
  intervalMs?: number;
  children: ReactNode;
};

type PlaybackChoice = "auto" | "playing" | "paused";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => true,
  );
}

export function HeroSlideshow({ slides, intervalMs = 7000, children }: HeroSlideshowProps) {
  const [active, setActive] = useState(0);
  const [choice, setChoice] = useState<PlaybackChoice>("auto");
  const [holding, setHolding] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const playing = choice === "auto" ? !reduceMotion : choice === "playing";
  const total = slides.length;
  const current = slides[active];

  useEffect(() => {
    if (!playing || holding || total < 2) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % total), intervalMs);
    return () => window.clearInterval(timer);
  }, [playing, holding, total, intervalMs]);

  return (
    <div
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden"
      onPointerEnter={(event) => event.pointerType === "mouse" && setHolding(true)}
      onPointerLeave={() => setHolding(false)}
      onFocus={() => setHolding(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHolding(false);
      }}
    >
      {slides.map((slide, index) => (
        <Image
          key={slide.word}
          src={slide.image}
          alt=""
          fill
          priority={index === 0}
          sizes="100vw"
          className={cn(
            "-z-20 object-cover transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none",
            index === active ? "opacity-100" : "opacity-0",
          )}
          style={{ objectPosition: slide.objectPosition }}
        />
      ))}
      <div
        aria-hidden="true"
        className="hero-veu absolute inset-0 -z-10"
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-32 pb-6">
        <p
          key={current?.word}
          aria-hidden="true"
          className="hero-palavra font-display text-[clamp(2.75rem,10.5vw,8.5rem)] leading-[0.9] font-semibold uppercase"
        >
          {current?.word}
        </p>

        {children}

        <div className="mt-10 flex items-center justify-between gap-6">
          <p aria-live={playing ? "off" : "polite"} className="sr-only">
            {current ? `Destaque ${active + 1} de ${total}: ${current.word}` : ""}
          </p>
          <div className="flex items-center gap-1">
            {slides.map((slide, index) => (
              <button
                key={slide.word}
                type="button"
                onClick={() => setActive(index)}
                aria-current={index === active ? "true" : undefined}
                className="group flex h-11 items-center px-1"
              >
                <span className="sr-only">
                  Mostrar destaque {index + 1}: {slide.word}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-0.5 w-8 rounded-full transition-colors duration-300",
                    index === active ? "bg-accent" : "bg-ink/40 group-hover:bg-ink/70",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setChoice(playing ? "paused" : "playing")}
            className="inline-flex size-11 items-center justify-center rounded-full border border-ink/40 transition-colors hover:border-ink"
          >
            <span className="sr-only">{playing ? "Pausar apresentação de fotos" : "Retomar apresentação de fotos"}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="size-4">
              {playing ? (
                <path className="traco-marca" d="M9 6 L9 18 M15 6 L15 18" />
              ) : (
                <path className="traco-marca" d="M8 5 L19 12 L8 19 Z" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
