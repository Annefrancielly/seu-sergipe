import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/config/site";
import { heroIntro } from "@/content/home";
import { type HeroSlide, HeroSlideshow } from "@/sections/hero/HeroSlideshow";

const slides: readonly HeroSlide[] = [
  { word: heroIntro.words[0], image: "/images/casa/prato-coco.jpg", objectPosition: "55% 45%" },
  { word: heroIntro.words[1], image: "/images/casa/casa-noite.jpg", objectPosition: "40% 55%" },
  { word: heroIntro.words[2], image: "/images/casa/jantar-flambado.jpg", objectPosition: "48% 40%" },
];

export function HeroSection() {
  return (
    <section
      id="inicio"
      data-surface="verde"
      aria-roledescription="carrossel"
      aria-label="Destaques do Seu Sergipe"
      className="bg-surface text-ink"
    >
      <HeroSlideshow slides={slides}>
        <h1 className="sr-only">
          {siteConfig.name} — {siteConfig.tagline}
        </h1>
        <p className="mt-4 text-xs uppercase tracking-[0.32em] text-emphasis sm:text-sm">
          {heroIntro.words.join(" · ")}
        </p>
        <p className="mt-5 max-w-xl font-display text-2xl leading-snug sm:text-3xl">{heroIntro.lead}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ReservationTrigger>{heroIntro.reserveLabel}</ReservationTrigger>
          <ButtonLink href="/cardapio" variant="secondary">
            {heroIntro.menuLabel}
          </ButtonLink>
        </div>
      </HeroSlideshow>
    </section>
  );
}
