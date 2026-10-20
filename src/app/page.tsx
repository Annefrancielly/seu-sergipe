import type { Metadata } from "next";

import { WaveDivider } from "@/components/graphics/WaveDivider";
import { ChefSection } from "@/sections/chef/ChefSection";
import { ExperienceSection } from "@/sections/experience/ExperienceSection";
import { LocationSection } from "@/sections/location/LocationSection";
import { RestaurantIntro } from "@/sections/restaurant-intro/RestaurantIntro";
import { TestimonialsSection } from "@/sections/testimonials/TestimonialsSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main id="conteudo">
      <RestaurantIntro />
      <WaveDivider from="verde" to="creme" withLine />
      <ChefSection />
      <WaveDivider from="creme" to="marrom" variant="ampla" flip />
      <ExperienceSection />
      <WaveDivider from="marrom" to="creme" withLine />
      <LocationSection />
      <WaveDivider from="creme" to="verde" variant="ampla" />
      <TestimonialsSection />
      <WaveDivider from="verde" to="marrom" withLine />
    </main>
  );
}
