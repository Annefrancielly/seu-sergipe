"use client";

import type { MouseEvent, ReactNode } from "react";

import { ArrowIcon } from "@/components/graphics/ArrowIcon";
import { useReservation } from "@/components/reservation/ReservationProvider";
import { arrowMotionClasses, type ButtonVariant, buttonVariantClasses } from "@/lib/button-styles";
import { cn } from "@/lib/cn";
import { reservationHref } from "@/lib/whatsapp";

type ReservationTriggerProps = {
  intro?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  withArrow?: boolean;
  srContext?: string;
  className?: string;
};

export function ReservationTrigger({
  intro,
  children,
  variant = "primary",
  withArrow = true,
  srContext,
  className,
}: ReservationTriggerProps) {
  const reservation = useReservation();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!reservation) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    reservation.openReservation(intro);
  };

  return (
    <a
      href={reservationHref(intro)}
      target="_blank"
      rel="noopener noreferrer"
      aria-haspopup={reservation ? "dialog" : undefined}
      onClick={handleClick}
      className={cn(buttonVariantClasses[variant], className)}
    >
      {children}
      {withArrow && <ArrowIcon className={arrowMotionClasses} />}
      {srContext && <span className="sr-only"> {srContext}</span>}
    </a>
  );
}
