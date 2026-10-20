import { SEAL_EMBLEM_PATH, SEAL_RING_PATH, SEAL_VIEWBOX } from "@/components/brand/brand-paths";
import { cn } from "@/lib/cn";

type BrandSealProps = {
  className?: string;
};

export function BrandSeal({ className }: BrandSealProps) {
  return (
    <svg viewBox={SEAL_VIEWBOX} aria-hidden="true" focusable="false" className={cn("block h-auto", className)}>
      <path fillRule="evenodd" fill="currentColor" d={SEAL_RING_PATH} />
      <path fillRule="evenodd" fill="currentColor" d={SEAL_EMBLEM_PATH} />
    </svg>
  );
}
