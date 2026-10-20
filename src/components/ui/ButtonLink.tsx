import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowIcon } from "@/components/graphics/ArrowIcon";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  withArrow?: boolean;
  className?: string;
};

const baseClasses =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-semibold " +
  "transition-[translate,scale,background-color,color] duration-300 ease-organic " +
  "motion-safe:hover:-translate-y-0.5 active:scale-[0.97]";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-action text-on-action",
  secondary: "border-2 border-current text-ink hover:bg-ink/10",
};

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  withArrow = false,
  className,
}: ButtonLinkProps) {
  const classes = cn(baseClasses, variantClasses[variant], className);
  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowIcon className="transition-transform duration-300 ease-organic group-hover:translate-x-1 group-focus-visible:translate-x-1" />
      )}
    </>
  );

  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
