import { cn } from "@/lib/cn";
import { type Surface, surfaceFillClass } from "@/lib/surfaces";

const WAVES = {
  suave: "M0 96 C240 40 480 40 720 80 C960 120 1200 128 1440 72",
  ampla: "M0 40 C320 140 640 150 900 90 C1120 40 1300 30 1440 60",
} as const;

type WaveVariant = keyof typeof WAVES;

type WaveDividerProps = {
  from: Surface;
  to: Surface;
  variant?: WaveVariant;
  flip?: boolean;
  withLine?: boolean;
};

export function WaveDivider({
  from,
  to,
  variant = "suave",
  flip = false,
  withLine = false,
}: WaveDividerProps) {
  const crest = WAVES[variant];

  return (
    <div
      aria-hidden="true"
      data-surface={from}
      className="relative -my-px bg-surface"
    >
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        focusable="false"
        className={cn("block h-(--altura-onda) w-full", flip && "-scale-x-100")}
      >
        <path d={`${crest} L1440 160 L0 160 Z`} className={surfaceFillClass[to]} />
        {withLine && <path d={crest} className="traco-marca text-accent" />}
      </svg>
    </div>
  );
}
