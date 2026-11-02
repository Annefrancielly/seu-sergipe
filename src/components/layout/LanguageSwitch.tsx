"use client";

import { usePathname } from "next/navigation";

import { localeMeta, locales, switchLocalePath } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/cn";

type LanguageSwitchProps = {
  className?: string;
};

export function LanguageSwitch({ className }: LanguageSwitchProps) {
  const pathname = usePathname();
  const { locale, t } = useLocale();

  return (
    <nav aria-label={t.header.language} className={className}>
      <ul className="flex items-center text-xs tracking-[0.2em]">
        {locales.map((option, index) => {
          const active = option === locale;
          return (
            <li key={option} className="flex items-center">
              {index > 0 && (
                <span aria-hidden="true" className="px-1 text-ink/40">
                  |
                </span>
              )}
              <a
                href={switchLocalePath(pathname, option)}
                hrefLang={localeMeta[option].htmlLang}
                lang={localeMeta[option].htmlLang}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full transition-colors",
                  active ? "text-accent" : "text-ink/70 hover:text-ink",
                )}
              >
                <span aria-hidden="true">{localeMeta[option].short}</span>
                <span className="sr-only">{localeMeta[option].label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
