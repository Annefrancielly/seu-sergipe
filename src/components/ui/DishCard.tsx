import Image from "next/image";

import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { OrganicFrame } from "@/components/ui/OrganicFrame";
import type { Locale } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import type { Dish } from "@/types/content";

type DishCardProps = {
  dish: Dish;
  locale?: Locale;
};

export function DishCard({ dish, locale = "pt" }: DishCardProps) {
  const t = ui[locale].dish;
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
            style={{ objectPosition: dish.photo.objectPosition }}
          />
        </OrganicFrame>
      )}

      <h4 className="mt-6 font-display text-2xl leading-tight">{dish.name}</h4>
      <p className="mt-3 leading-relaxed">{dish.description}</p>

      {dish.story && (
        <details className="group mt-4">
          <summary className="cursor-pointer list-none font-semibold text-emphasis [&::-webkit-details-marker]:hidden">
            <span className="underline decoration-1 underline-offset-4 group-open:no-underline">
              {t.story}
            </span>
          </summary>
          <p className="mt-3 leading-relaxed">{dish.story}</p>
        </details>
      )}

      <ReservationTrigger
        variant="link"
        intro={t.tasteIntro(dish.name)}
        srContext={`: ${dish.name}`}
        className="mt-auto self-start pt-6"
      >
        {t.taste}
      </ReservationTrigger>
    </article>
  );
}
