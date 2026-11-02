import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowIcon } from "@/components/graphics/ArrowIcon";
import type { Locale } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import { arrowMotionClasses, type ButtonVariant, buttonVariantClasses } from "@/lib/button-styles";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  withArrow?: boolean;
  locale?: Locale;
  className?: string;
};

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  withArrow = false,
  locale = "pt",
  className,
}: ButtonLinkProps) {
  const classes = cn(buttonVariantClasses[variant], className);
  const content = (
    <>
      {children}
      {withArrow && <ArrowIcon className={arrowMotionClasses} />}
    </>
  );

  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
        <span className="sr-only"> {ui[locale].newTab}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
