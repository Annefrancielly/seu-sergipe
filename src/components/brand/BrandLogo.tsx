import { LOCKUP_SYMBOL_PATH, LOCKUP_VIEWBOX, LOCKUP_WORDMARK_PATH } from "@/components/brand/brand-paths";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type BrandLogoProps = {
  size?: "lg" | "sm" | "header";
  withTagline?: boolean;
  className?: string;
};

const LOGO_WIDTHS = {
  lg: "w-44 sm:w-52 md:w-60",
  sm: "w-28 sm:w-32",
  header: "w-[4.5rem] lg:w-20",
} as const;

export function BrandLogo({ size = "lg", withTagline = size === "lg", className }: BrandLogoProps) {
  return (
    <span aria-hidden="true" className={cn("inline-flex flex-col leading-none", className ?? "items-start")}>
      <svg viewBox={LOCKUP_VIEWBOX} focusable="false" className={cn("block h-auto", LOGO_WIDTHS[size])}>
        <path fillRule="evenodd" className="fill-simbolo" d={LOCKUP_SYMBOL_PATH} />
        <path fillRule="evenodd" fill="currentColor" d={LOCKUP_WORDMARK_PATH} />
      </svg>
      {withTagline && (
        <span className="mt-4 text-[0.62rem] uppercase tracking-[0.2em] text-emphasis sm:text-xs sm:tracking-[0.24em]">
          {siteConfig.tagline}
        </span>
      )}
    </span>
  );
}
