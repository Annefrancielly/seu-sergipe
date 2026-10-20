import Image from "next/image";

import chefPhoto from "@/assets/images/chef-seichele-barboza.jpg";
import { Section } from "@/components/layout/Section";
import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { Carousel } from "@/components/ui/Carousel";
import { DishCard } from "@/components/ui/DishCard";
import { OrganicFrame } from "@/components/ui/OrganicFrame";
import { chefIntro, chefPicksIntro } from "@/content/chef";
import { chefPickSlugs, dishes } from "@/content/menu";
import { resolveDishes } from "@/lib/menu";

export function ChefSection() {
  const chefPicks = resolveDishes(chefPickSlugs, dishes);

  return (
    <Section id="chef" surface="creme" labelledBy="chef-titulo" className="overflow-hidden pt-12 pb-secao md:pt-16">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <OrganicFrame shape="seixo" className="mx-auto aspect-[4/5] w-full max-w-sm md:max-w-none">
            <Image
              src={chefPhoto}
              alt={chefIntro.photoAlt}
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 40vw, 85vw"
              className="object-cover object-[50%_30%]"
            />
          </OrganicFrame>
        </div>

        <div className="surgir text-center md:text-left md:col-span-6 md:col-start-7">
          <h2 id="chef-titulo" className="text-sm font-semibold uppercase tracking-[0.3em] text-emphasis">
            {chefIntro.title}
          </h2>
          <p className="mt-4 font-display text-5xl leading-none sm:text-6xl">{chefIntro.name}</p>
          <p className="mt-8 font-display text-2xl leading-snug">{chefIntro.lead}</p>
          {chefIntro.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}

          <figure className="mt-10">
            <svg viewBox="0 0 40 24" aria-hidden="true" focusable="false" className="mx-auto h-6 w-10 text-accent md:mx-0">
              <path className="traco-marca" d="M2 22 C2 10 8 3 16 2 M22 22 C22 10 28 3 36 2" />
            </svg>
            <blockquote className="mt-3 font-display text-xl leading-snug">
              <p>{chefIntro.quote}</p>
            </blockquote>
            <figcaption className="mt-4 text-sm uppercase tracking-[0.25em]">
              {chefIntro.name} · <span className="text-emphasis">{chefIntro.signature}</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {chefPicks.length > 0 && (
        <div className="mt-24">
          <div className="surgir mx-auto max-w-6xl px-6 text-center md:text-left">
            <h3 className="font-display text-4xl">{chefPicksIntro.title}</h3>
            <p className="mt-3 text-lg">{chefPicksIntro.lead}</p>
          </div>
          <Carousel label={chefPicksIntro.title} className="surgir surgir-depois mx-auto mt-10 max-w-6xl">
            {chefPicks.map((dish) => (
              <DishCard key={dish.slug} dish={dish} />
            ))}
          </Carousel>
          <p className="mx-auto mt-8 max-w-6xl px-6 text-lg text-center md:text-left">
            {chefPicksIntro.closing}{" "}
            <ReservationTrigger
              variant="link"
              intro="Vi as sugestões da chef no site e quero reservar uma mesa."
            >
              {chefPicksIntro.reserveLabel}
            </ReservationTrigger>
          </p>
        </div>
      )}
    </Section>
  );
}
