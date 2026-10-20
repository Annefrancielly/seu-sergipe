import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <span
      aria-hidden="true"
      data-placeholder="logotipo-oficial-pendente"
      className={cn("inline-flex flex-col items-start leading-none", className)}
    >
      <span className="font-display text-3xl sm:text-4xl">{siteConfig.name}</span>
      <span className="mt-2 text-[0.7rem] uppercase tracking-[0.28em] text-emphasis sm:text-xs">
        {siteConfig.tagline}
      </span>
    </span>
  );
}
