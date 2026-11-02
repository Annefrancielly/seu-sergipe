import type { Metadata } from "next";

import { WaveDivider } from "@/components/graphics/WaveDivider";
import { type LocaleParams, pageMetadata, resolveLocale } from "@/i18n/server";
import { ui } from "@/i18n/ui";
import { ChefPicksSection } from "@/sections/chef-picks/ChefPicksSection";
import { HeroSection } from "@/sections/hero/HeroSection";
import { PortalsSection } from "@/sections/portals/PortalsSection";
import { RestaurantIntro } from "@/sections/restaurant-intro/RestaurantIntro";
import { TastingMenusSection } from "@/sections/tasting-menus/TastingMenusSection";
import { VisitSection } from "@/sections/visit/VisitSection";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata({ locale, path: "/", description: ui[locale].meta.description });
}

export default async function HomePage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);

  return (
    <main id="conteudo">
      <HeroSection locale={locale} />
      <RestaurantIntro locale={locale} />
      <WaveDivider from="verde" to="marrom" withLine />
      <TastingMenusSection locale={locale} />
      <WaveDivider from="marrom" to="verde" variant="ampla" flip />
      <ChefPicksSection locale={locale} />
      <WaveDivider from="verde" to="marrom" withLine />
      <PortalsSection locale={locale} />
      <WaveDivider from="marrom" to="verde" variant="ampla" />
      <VisitSection locale={locale} />
      <WaveDivider from="verde" to="marrom" withLine />
    </main>
  );
}
