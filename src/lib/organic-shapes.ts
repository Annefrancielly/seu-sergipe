export type OrganicShape = {
  outline: string;
  accentArc: string;
};

export const ORGANIC_SHAPES = {
  seixo: {
    outline:
      "M8 18 C14 4 38 1 60 3 C84 5 97 16 98 40 C99 62 96 86 78 95 C58 104 26 99 12 88 C1 79 2 56 3 42 C4 32 4 26 8 18 Z",
    accentArc: "M3 42 C4 32 4 26 8 18 C14 4 38 1 60 3",
  },
  folha: {
    outline:
      "M18 4 C40 -2 80 2 94 16 C104 28 98 58 92 76 C84 98 54 100 30 96 C8 92 0 74 2 50 C4 30 2 12 18 4 Z",
    accentArc: "M92 76 C84 98 54 100 30 96",
  },
  arco: {
    outline:
      "M50 2 C80 2 96 22 97 48 L98 86 C98 94 92 98 84 98 L18 97 C8 97 3 91 3 82 L3 46 C4 20 22 2 50 2 Z",
    accentArc: "M50 2 C80 2 96 22 97 48 L98 70",
  },
} as const satisfies Record<string, OrganicShape>;

export type OrganicShapeName = keyof typeof ORGANIC_SHAPES;

export function shapeToMaskImage(outline: string): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path d='${outline}' fill='black'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
