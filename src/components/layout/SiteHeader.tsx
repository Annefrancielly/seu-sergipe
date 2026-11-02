"use client";

import Link from "next/link";
import { type MouseEvent, useEffect, useId, useRef, useState } from "react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { mainNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

const SCROLL_THRESHOLD = 24;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const menuId = useId();

  useEffect(() => {
    let frame = 0;
    const update = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const openMenu = () => {
    menuRef.current?.showModal();
    setMenuOpen(true);
  };

  const closeMenu = () => menuRef.current?.close();

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) closeMenu();
  };

  return (
    <header
      data-surface="verde"
      className={cn(
        "fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] text-ink transition-[background-color,border-color,backdrop-filter] duration-500 ease-organic",
        "border-b",
        scrolled
          ? "border-ink/[0.06] bg-musgo-noite/75 backdrop-blur-md backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6">
        <Link href="/" aria-label={`${siteConfig.name}: início`} className="shrink-0">
          <BrandLogo size="header" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm uppercase tracking-[0.18em]">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="underline decoration-transparent decoration-1 underline-offset-8 transition-[text-decoration-color] duration-300 hover:decoration-current"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ReservationTrigger variant="compact" withArrow={false}>
              Reservar
            </ReservationTrigger>
          </div>
          <button
            type="button"
            onClick={openMenu}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            className="inline-flex size-12 flex-col items-center justify-center gap-1.5 rounded-full lg:hidden"
          >
            <span className="sr-only">Abrir menu</span>
            <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-current" />
            <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-current" />
            <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-current" />
          </button>
        </div>
      </div>

      <dialog
        ref={menuRef}
        id={menuId}
        aria-label="Menu"
        onClick={handleBackdropClick}
        onClose={() => setMenuOpen(false)}
        data-surface="verde"
        className="menu-movel m-0 h-dvh max-h-none w-full max-w-none bg-surface p-0 text-ink backdrop:bg-cafe-noite/70"
      >
        <div className="flex min-h-full flex-col px-6 pt-[env(safe-area-inset-top)] pb-[max(2rem,env(safe-area-inset-bottom))]">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" onClick={closeMenu} aria-label={`${siteConfig.name}: início`}>
              <BrandLogo size="header" />
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              className="inline-flex size-12 items-center justify-center rounded-full"
            >
              <span className="sr-only">Fechar menu</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="size-6">
                <path className="traco-marca" d="M5 5 L19 19 M19 5 L5 19" />
              </svg>
            </button>
          </div>

          <nav aria-label="Principal" className="mt-10 flex-1">
            <ul className="grid gap-2">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="block py-2 font-display text-4xl uppercase tracking-wide transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div onClickCapture={closeMenu}>
            <ReservationTrigger className="w-full">Reservar mesa</ReservationTrigger>
          </div>
        </div>
      </dialog>
    </header>
  );
}
