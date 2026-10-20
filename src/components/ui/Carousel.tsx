"use client";

import { Children, type ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { ArrowIcon } from "@/components/graphics/ArrowIcon";
import { type CarouselState, clampSlideIndex, getCarouselState } from "@/lib/carousel";
import { cn } from "@/lib/cn";

type CarouselProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

const INITIAL_STATE: CarouselState = { index: 0, atStart: true, atEnd: false };

const controlClasses =
  "inline-flex size-12 items-center justify-center rounded-full border-2 border-current " +
  "transition-[opacity,background-color,scale] duration-300 ease-organic " +
  "hover:bg-ink/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent";

function getSlideOffsets(track: HTMLElement): number[] {
  const slides = Array.from(track.children) as HTMLElement[];
  const first = slides[0];
  if (!first) return [];
  return slides.map((slide) => slide.offsetLeft - first.offsetLeft);
}

export function Carousel({ label, children, className }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState<CarouselState>(INITIAL_STATE);
  const slides = Children.toArray(children);
  const total = slides.length;

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setState(
      getCarouselState({
        scrollLeft: track.scrollLeft,
        clientWidth: track.clientWidth,
        scrollWidth: track.scrollWidth,
        slideOffsets: getSlideOffsets(track),
      }),
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    track.addEventListener("scroll", onScroll, { passive: true });
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
    };
  }, [measure]);

  const goTo = (targetIndex: number) => {
    const track = trackRef.current;
    if (!track) return;
    const offsets = getSlideOffsets(track);
    const left = offsets[clampSlideIndex(targetIndex, offsets.length)] ?? 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
      className={cn("relative", className)}
    >
      <ul
        ref={trackRef}
        tabIndex={0}
        className="flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, slideIndex) => (
          <li
            key={slideIndex}
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} de ${total}`}
            className="shrink-0 basis-[82%] snap-start sm:basis-[46%] lg:basis-[31%]"
          >
            {slide}
          </li>
        ))}
      </ul>

      <div
        className={cn(
          "mt-6 flex items-center justify-end gap-4 px-6",
          state.atStart && state.atEnd && "invisible",
        )}
      >
        <p aria-live="polite" className="mr-auto font-mono text-sm tabular-nums">
          {state.index + 1} de {total}
        </p>
        <button
          type="button"
          onClick={() => goTo(state.index - 1)}
          disabled={state.atStart}
          aria-label="Anterior"
          className={controlClasses}
        >
          <ArrowIcon className="rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => goTo(state.index + 1)}
          disabled={state.atEnd}
          aria-label="Próximo"
          className={controlClasses}
        >
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
}
