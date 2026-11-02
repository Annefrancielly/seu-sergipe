import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/config/site";
import { homeContent } from "@/content/home";
import { type Locale, localizePath } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import { type HeroSlide, HeroSlideshow } from "@/sections/hero/HeroSlideshow";

const SLIDE_IMAGES: readonly Omit<HeroSlide, "word">[] = [
  { image: "/images/casa/prato-coco.jpg", objectPosition: "55% 45%" },
  { image: "/images/casa/casa-noite.jpg", objectPosition: "40% 55%" },
  { image: "/images/casa/jantar-flambado.jpg", objectPosition: "48% 40%" },
];

export function HeroSection({ locale }: { locale: Locale }) {
  const { hero } = homeContent[locale];
  const slides: HeroSlide[] = SLIDE_IMAGES.map((slide, index) => ({ ...slide, word: hero.words[index] ?? "" }));

  return (
    <section
      id="inicio"
      data-surface="verde"
      aria-roledescription={ui[locale].carousel.roleDescription}
      aria-label={ui[locale].hero.label}
      className="bg-surface text-ink"
    >
      <HeroSlideshow slides={slides}>
        <h1 className="sr-only">
          {siteConfig.name} — {siteConfig.tagline}
        </h1>
        <p lang="pt-BR" className="mt-4 text-xs uppercase tracking-[0.32em] text-emphasis sm:text-sm">{hero.words.join(" · ")}</p>
        <p className="mt-5 max-w-xl font-display text-2xl leading-snug sm:text-3xl">{hero.lead}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ReservationTrigger>{hero.reserveLabel}</ReservationTrigger>
          <ButtonLink href={localizePath(locale, "/cardapio")} variant="secondary">
            {hero.menuLabel}
          </ButtonLink>
        </div>
      </HeroSlideshow>
    </section>
  );
}
