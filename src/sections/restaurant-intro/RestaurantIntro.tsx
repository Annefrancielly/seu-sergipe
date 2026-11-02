import { TerritoryLine } from "@/components/graphics/TerritoryLine";
import { Section } from "@/components/layout/Section";
import { homeContent } from "@/content/home";
import type { Locale } from "@/i18n/config";

export function RestaurantIntro({ locale }: { locale: Locale }) {
  const restaurantIntro = homeContent[locale].intro;
  return (
    <Section id="restaurante" surface="verde" labelledBy="restaurante-titulo" className="luz-de-vela overflow-hidden py-secao">
      <TerritoryLine className="absolute -top-8 -bottom-4 left-[44%] hidden w-20 opacity-50 md:block" />

      <div className="relative mx-auto grid max-w-6xl gap-8 px-6 text-center md:grid-cols-12 md:gap-8 md:text-left">
        <h2 id="restaurante-titulo" className="surgir font-display text-4xl leading-tight uppercase sm:text-5xl md:col-span-5">
          {restaurantIntro.title}
        </h2>
        <div className="surgir surgir-depois mx-auto max-w-xl md:col-span-6 md:col-start-7 md:mx-0">
          <p className="text-lg leading-relaxed">{restaurantIntro.body}</p>
          <p className="mt-4 text-lg leading-relaxed text-emphasis">{restaurantIntro.closing}</p>
        </div>
      </div>
    </Section>
  );
}
