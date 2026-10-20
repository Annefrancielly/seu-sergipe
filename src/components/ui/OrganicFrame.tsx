import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";
import {
  ORGANIC_SHAPES,
  type OrganicShapeName,
  shapeToMaskImage,
} from "@/lib/organic-shapes";

type OrganicFrameProps = {
  shape?: OrganicShapeName;
  withAccent?: boolean;
  animated?: boolean;
  className?: string;
  children: ReactNode;
};

export function OrganicFrame({
  shape = "seixo",
  withAccent = true,
  animated = true,
  className,
  children,
}: OrganicFrameProps) {
  const { outline, accentArc } = ORGANIC_SHAPES[shape];
  const mask = shapeToMaskImage(outline);

  const maskStyle: CSSProperties = {
    maskImage: mask,
    WebkitMaskImage: mask,
    maskSize: "100% 100%",
    WebkitMaskSize: "100% 100%",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn("absolute inset-0 overflow-hidden", animated && "moldura-abrir")} style={maskStyle}>
        {children}
      </div>
      {withAccent && (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
          className={cn(
            "pointer-events-none absolute -inset-3 size-[calc(100%_+_1.5rem)] overflow-visible text-accent sm:-inset-4 sm:size-[calc(100%_+_2rem)]",
            animated && "traco-desenhar",
          )}
        >
          <path d={accentArc} className="traco-marca" />
        </svg>
      )}
    </div>
  );
}
