import type { Metadata } from "next";

import { WaveDivider } from "@/components/graphics/WaveDivider";
import { ChefPicksSection } from "@/sections/chef-picks/ChefPicksSection";
import { HeroSection } from "@/sections/hero/HeroSection";
import { PortalsSection } from "@/sections/portals/PortalsSection";
import { RestaurantIntro } from "@/sections/restaurant-intro/RestaurantIntro";
import { TastingMenusSection } from "@/sections/tasting-menus/TastingMenusSection";
import { VisitSection } from "@/sections/visit/VisitSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main id="conteudo">
      <HeroSection />
      <RestaurantIntro />
      <WaveDivider from="verde" to="marrom" withLine />
      <TastingMenusSection />
      <WaveDivider from="marrom" to="verde" variant="ampla" flip />
      <ChefPicksSection />
      <WaveDivider from="verde" to="marrom" withLine />
      <PortalsSection />
      <WaveDivider from="marrom" to="verde" variant="ampla" />
      <VisitSection />
      <WaveDivider from="verde" to="marrom" withLine />
    </main>
  );
}
