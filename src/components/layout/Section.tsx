import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { Surface } from "@/lib/surfaces";

type SectionProps = {
  id?: string;
  surface?: Surface;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  surface = "verde",
  labelledBy,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      data-surface={surface}
      aria-labelledby={labelledBy}
      className={cn("relative bg-surface text-ink", className)}
    >
      {children}
    </section>
  );
}
