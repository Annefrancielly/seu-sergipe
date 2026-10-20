export type CarouselMetrics = {
  scrollLeft: number;
  clientWidth: number;
  scrollWidth: number;
  slideOffsets: readonly number[];
};

export type CarouselState = {
  index: number;
  atStart: boolean;
  atEnd: boolean;
};

const EDGE_TOLERANCE = 2;

export function getCarouselState({
  scrollLeft,
  clientWidth,
  scrollWidth,
  slideOffsets,
}: CarouselMetrics): CarouselState {
  const atStart = scrollLeft <= EDGE_TOLERANCE;
  const atEnd = scrollLeft + clientWidth >= scrollWidth - EDGE_TOLERANCE;

  let index = 0;
  let smallestDistance = Number.POSITIVE_INFINITY;

  slideOffsets.forEach((offset, slideIndex) => {
    const distance = Math.abs(offset - scrollLeft);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      index = slideIndex;
    }
  });

  return { index, atStart, atEnd };
}

export function clampSlideIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(Math.max(index, 0), total - 1);
}
