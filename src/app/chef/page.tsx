import type { Metadata } from "next";
import Image from "next/image";

import chefPortraitSun from "@/assets/images/chef-retrato-sol.jpg";
import chefPhoto from "@/assets/images/chef-seichele-barboza.jpg";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Carousel } from "@/components/ui/Carousel";
import { DishCard } from "@/components/ui/DishCard";
import { OrganicFrame } from "@/components/ui/OrganicFrame";
import { chefIntro, chefPicksIntro } from "@/content/chef";
import { chefPickSlugs, dishes } from "@/content/menu";
import { resolveDishes } from "@/lib/menu";

export const metadata: Metadata = {
  title: `Chef ${chefIntro.name}`,
  description: chefIntro.lead,
  alternates: { canonical: "/chef" },
};

export default function ChefPage() {
  const picks = resolveDishes(chefPickSlugs, dishes);

  return (
    <main id="conteudo">
      <PageHero
        eyebrow="A chef"
        title={chefIntro.name}
        lead={chefIntro.lead}
        image={chefPhoto}
        imagePosition="50% 22%"
      />

      <WaveDivider from="verde" to="marrom" withLine />

      <Section surface="marrom" labelledBy="historia-titulo" className="luz-de-vela py-secao [--vela-x:20%] [--vela-y:30%]">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-12 md:gap-8">
          <div className="surgir md:col-span-6">
            <h2 id="historia-titulo" className="text-xs uppercase tracking-[0.3em] text-emphasis">
              Trajetória
            </h2>
            {chefIntro.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <OrganicFrame shape="seixo" className="sombra-organica mx-auto aspect-[4/5] w-full max-w-sm">
              <Image
                src={chefPortraitSun}
                alt={chefIntro.photoAlt}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 35vw, 85vw"
                className="object-cover object-[50%_40%]"
              />
            </OrganicFrame>
          </div>
        </div>

        <figure className="surgir vidro-cafe mx-auto mt-20 max-w-3xl rounded-[1.75rem] p-8 text-center sm:p-12">
          <blockquote className="font-display text-2xl leading-snug sm:text-3xl">
            <p>“{chefIntro.quote}”</p>
          </blockquote>
          <figcaption className="mt-6 text-xs uppercase tracking-[0.28em]">
            {chefIntro.name} · <span className="text-emphasis">{chefIntro.signature}</span>
          </figcaption>
        </figure>
      </Section>

      <WaveDivider from="marrom" to="verde" variant="ampla" flip />

      {picks.length > 0 && (
        <Section surface="verde" labelledBy="sugestoes-chef-titulo" className="pb-secao">
          <div className="surgir mx-auto max-w-6xl px-6 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.3em] text-emphasis">{chefPicksIntro.title}</p>
            <h2 id="sugestoes-chef-titulo" className="mt-3 font-display text-4xl leading-none font-semibold uppercase sm:text-5xl">
              {chefPicksIntro.lead}
            </h2>
          </div>
          <Carousel label={chefPicksIntro.title} className="surgir surgir-depois mx-auto mt-10 max-w-6xl">
            {picks.map((dish) => (
              <DishCard key={dish.slug} dish={dish} />
            ))}
          </Carousel>
          <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-center gap-4 px-6 md:justify-start">
            <ReservationTrigger intro="Vim pela página da chef e quero reservar uma mesa.">
              {chefPicksIntro.reserveLabel}
            </ReservationTrigger>
            <ButtonLink href="/agenda" variant="secondary">
              Agenda da chef
            </ButtonLink>
          </div>
        </Section>
      )}

      <WaveDivider from="verde" to="marrom" withLine />
    </main>
  );
}
