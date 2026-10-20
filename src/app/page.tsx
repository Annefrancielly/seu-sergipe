import { WaveDivider } from "@/components/graphics/WaveDivider";
import { ReservationProvider } from "@/components/reservation/ReservationProvider";
import { ChefSection } from "@/sections/chef/ChefSection";
import { ExperienceSection } from "@/sections/experience/ExperienceSection";
import { LocationSection } from "@/sections/location/LocationSection";
import { RestaurantIntro } from "@/sections/restaurant-intro/RestaurantIntro";

export default function HomePage() {
  return (
    <ReservationProvider>
      <main id="conteudo">
        <RestaurantIntro />
        <WaveDivider from="verde" to="creme" withLine />
        <ChefSection />
        <WaveDivider from="creme" to="marrom" variant="ampla" flip />
        <ExperienceSection />
        <WaveDivider from="marrom" to="creme" withLine />
        <LocationSection />
      </main>
    </ReservationProvider>
  );
}
