import { WaveDivider } from "@/components/graphics/WaveDivider";
import { RestaurantIntro } from "@/sections/restaurant-intro/RestaurantIntro";

export default function HomePage() {
  return (
    <main id="conteudo">
      <RestaurantIntro />
      <WaveDivider from="verde" to="creme" withLine />
    </main>
  );
}
