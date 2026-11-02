import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { chefPicksMini } from "@/content/home";
import { chefPickSlugs, dishes } from "@/content/menu";
import { resolveDishes } from "@/lib/menu";

export function ChefPicksSection() {
  const picks = resolveDishes(chefPickSlugs, dishes);
  if (picks.length === 0) return null;

  return (
    <Section id="sugestoes" surface="verde" labelledBy="sugestoes-titulo" className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-2 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <h2 id="sugestoes-titulo" className="text-xs uppercase tracking-[0.3em] text-emphasis">
            {chefPicksMini.eyebrow}
          </h2>
          <ButtonLink href="/cardapio" variant="link" withArrow>
            {chefPicksMini.menuLabel}
          </ButtonLink>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {picks.map((dish) => (
            <li
              key={dish.slug}
              className="surgir contorno-luz flex items-center gap-4 rounded-[1.25rem] bg-ink/[0.03] p-3 pr-5 transition-colors duration-300 hover:bg-ink/[0.07]"
            >
              {dish.photo && (
                <span className="sombra-profunda relative size-20 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={dish.photo.src}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                    style={{ objectPosition: dish.photo.objectPosition }}
                  />
                </span>
              )}
              <div className="min-w-0">
                <p className="font-display text-xl leading-tight font-semibold uppercase">{dish.name}</p>
                <ReservationTrigger
                  variant="link"
                  withArrow={false}
                  intro={`Vi ${dish.name} nas sugestões da chef e quero provar!`}
                  srContext={`: ${dish.name}`}
                >
                  {chefPicksMini.tasteLabel}
                </ReservationTrigger>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
