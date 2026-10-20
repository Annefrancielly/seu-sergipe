export const SURFACES = ["creme", "verde", "marrom"] as const;

export type Surface = (typeof SURFACES)[number];

export const surfaceFillClass: Record<Surface, string> = {
  creme: "fill-creme",
  verde: "fill-verde-profundo",
  marrom: "fill-marrom-terroso",
};
