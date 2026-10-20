import { cn } from "@/lib/cn";

const PATHS = {
  descida: "M150 0 C40 120 40 260 110 360 S180 600 60 800",
  meandro: "M60 0 C160 100 170 220 90 320 C20 410 30 520 120 600 S170 740 100 800",
} as const;

type TerritoryLineProps = {
  variant?: keyof typeof PATHS;
  className?: string;
};

export function TerritoryLine({ variant = "descida", className }: TerritoryLineProps) {
  return (
    <svg
      viewBox="0 0 200 800"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none text-accent revelar-na-rolagem", className)}
    >
      <path d={PATHS[variant]} className="traco-marca" />
    </svg>
  );
}
