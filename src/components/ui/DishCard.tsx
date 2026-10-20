import Image from "next/image";

import { ArrowIcon } from "@/components/graphics/ArrowIcon";
import { OrganicFrame } from "@/components/ui/OrganicFrame";
import { reservationHref } from "@/lib/whatsapp";
import type { Dish } from "@/types/content";

type DishCardProps = {
  dish: Dish;
};

export function DishCard({ dish }: DishCardProps) {
  return (
    <article id={dish.slug} className="flex h-full flex-col">
      {dish.photo && (
        <OrganicFrame shape="folha" className="aspect-square">
          <Image
            src={dish.photo.src}
            alt={dish.photo.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw"
            className="object-cover"
          />
        </OrganicFrame>
      )}

      <h4 className="mt-6 font-display text-2xl leading-tight">{dish.name}</h4>
      <p className="mt-3 leading-relaxed">{dish.description}</p>

      {dish.story && (
        <details className="group mt-4">
          <summary className="cursor-pointer list-none font-semibold text-emphasis [&::-webkit-details-marker]:hidden">
            <span className="underline decoration-1 underline-offset-4 group-open:no-underline">
              Conhecer a história
            </span>
          </summary>
          <p className="mt-3 leading-relaxed">{dish.story}</p>
        </details>
      )}

      <a
        href={reservationHref(`Vi ${dish.name} no site e quero provar!`)}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link mt-auto inline-flex items-center gap-2 pt-6 font-semibold"
      >
        Quero provar
        <ArrowIcon className="transition-transform duration-300 ease-organic group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1" />
        <span className="sr-only"> {dish.name} (abre o WhatsApp em nova aba)</span>
      </a>
    </article>
  );
}
