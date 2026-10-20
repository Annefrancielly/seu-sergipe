import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { Carousel } from "@/components/ui/Carousel";
import { OrganicFrame } from "@/components/ui/OrganicFrame";
import { experienceIntro } from "@/content/experience";
import { dishes } from "@/content/menu";
import { DISH_TAG_LABELS, dishesInCategory, interestPhrase, lowestPrice } from "@/lib/menu";
import { formatPrice } from "@/lib/price";

export function ExperienceSection() {
  const tastingMenus = dishesInCategory(dishes, "menu-degustacao").toSorted(
    (a, b) => (a.steps ?? 0) - (b.steps ?? 0),
  );

  return (
    <Section id="experiencia" surface="marrom" labelledBy="experiencia-titulo" className="py-secao">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-12 md:gap-8">
        <div className="surgir text-center md:text-left md:col-span-6 lg:col-span-5">
          <h2 id="experiencia-titulo" className="font-display text-4xl leading-tight sm:text-5xl">
            {experienceIntro.title}
          </h2>
          <p className="mt-6 font-display text-2xl leading-snug text-emphasis">
            {experienceIntro.lead}
          </p>
          <p className="mt-4 text-lg leading-relaxed">{experienceIntro.body}</p>
          <p className="mt-4 text-lg leading-relaxed">{experienceIntro.closing}</p>
          <ReservationTrigger className="mt-10">{experienceIntro.reserveLabel}</ReservationTrigger>
        </div>

        <div className="md:col-span-6 lg:col-start-7">
          <OrganicFrame shape="folha" className="mx-auto aspect-[5/4] w-full max-w-md md:max-w-none">
            <Image
              src={experienceIntro.photo.src}
              alt={experienceIntro.photo.alt}
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="scale-[1.35] object-cover"
            />
          </OrganicFrame>
        </div>
      </div>

      <div className="mt-20">
        <h3 className="surgir mx-auto max-w-6xl px-6 font-display text-3xl text-center md:text-left">{experienceIntro.menusTitle}</h3>
        <Carousel label={experienceIntro.menusTitle} className="surgir surgir-depois mx-auto mt-8 max-w-6xl">
          {tastingMenus.map((menu, index) => (
            <div
              key={menu.slug}
              data-surface="verde"
              className={`flex h-full flex-col bg-surface p-7 text-ink ${index % 2 === 0 ? "rounded-folha" : "rounded-folha-inversa"}`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emphasis">
                {menu.steps} etapas
              </p>
              <h4 className="mt-3 font-display text-2xl leading-tight">{menu.name}</h4>
              <p className="mt-3 leading-relaxed">{menu.description}</p>
              {menu.tags?.map((tag) => (
                <p key={tag} className="mt-4 text-sm font-semibold">
                  {DISH_TAG_LABELS[tag]}
                </p>
              ))}
              {lowestPrice(menu) !== undefined && (
                <p className="mt-4 text-sm">
                  A partir de <span className="font-display text-xl text-emphasis">{formatPrice(lowestPrice(menu) ?? 0)}</span>
                </p>
              )}
              <ReservationTrigger
                variant="link"
                intro={interestPhrase(menu)}
                srContext={`: ${menu.name}`}
                className="mt-auto self-start pt-6"
              >
                Quero viver esta experiência
              </ReservationTrigger>
            </div>
          ))}
        </Carousel>
        <div className="mx-auto mt-6 flex max-w-6xl flex-col items-center gap-2 px-6 text-center md:text-left md:items-start">
          <p className="text-sm">{experienceIntro.menusNote}</p>
          <ButtonLink href="/cardapio/menu-degustacao" variant="link" withArrow>
            Ver detalhes e valores no cardápio
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
