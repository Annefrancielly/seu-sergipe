import Image from "next/image";

import salaoPhoto from "@/assets/images/salao-seu-sergipe.jpg";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { TerritoryLine } from "@/components/graphics/TerritoryLine";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { OrganicFrame } from "@/components/ui/OrganicFrame";
import { siteConfig } from "@/config/site";
import { restaurantIntro } from "@/content/home";

export function RestaurantIntro() {
  return (
    <Section
      id="restaurante"
      surface="verde"
      labelledBy="restaurante-titulo"
      className="overflow-hidden pt-10 pb-16 md:pt-14 md:pb-24"
    >
      <TerritoryLine className="absolute top-1/3 -bottom-4 right-0 w-28 opacity-60 md:right-[6%] md:w-44" />

      <div className="relative mx-auto max-w-6xl px-6">
        <h1>
          <span className="sr-only">
            {siteConfig.name} — {siteConfig.tagline}
          </span>
          <BrandLogo />
        </h1>

        <div className="mt-12 grid items-center gap-14 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6 lg:col-span-5">
            <h2 id="restaurante-titulo" className="font-display text-4xl leading-tight sm:text-5xl">
              {restaurantIntro.title}
            </h2>
            <p className="mt-6 font-display text-2xl leading-snug text-accent">
              {restaurantIntro.lead}
            </p>
            <p className="mt-4 text-lg leading-relaxed">{restaurantIntro.body}</p>
            <p className="mt-4 text-lg leading-relaxed">{restaurantIntro.closing}</p>
            <ButtonLink href="/cardapio" withArrow className="mt-10">
              {restaurantIntro.menuLabel}
            </ButtonLink>
          </div>

          <div className="md:col-span-6 lg:col-start-7">
            <OrganicFrame shape="arco" className="mx-auto aspect-[4/5] w-full max-w-md md:max-w-none">
              <Image
                src={salaoPhoto}
                alt={restaurantIntro.photoAlt}
                fill
                loading="eager"
                placeholder="blur"
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover object-[58%_50%]"
              />
            </OrganicFrame>
          </div>
        </div>
      </div>
    </Section>
  );
}
