import { TastingMenuCard } from "@/components/menu/TastingMenuCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Carousel } from "@/components/ui/Carousel";
import { homeContent } from "@/content/home";
import { getMenu } from "@/content/menu-localized";
import { type Locale, localizePath } from "@/i18n/config";
import { DISH_TAG_LABELS, dishesInCategory, interestPhrase } from "@/lib/menu";

export function TastingMenusSection({ locale }: { locale: Locale }) {
  const tastingMenusIntro = homeContent[locale].tastingMenus;
  const menus = dishesInCategory(getMenu(locale).dishes, "menu-degustacao");

  return (
    <section
      id="menus"
      data-surface="marrom"
      aria-labelledby="menus-titulo"
      className="luz-de-vela relative isolate overflow-hidden bg-surface py-secao text-ink [--vela-x:50%] [--vela-y:55%]"
    >
      <div className="surgir mx-auto max-w-6xl px-6 text-center md:text-left">
        <p className="text-xs uppercase tracking-[0.3em] text-emphasis">{tastingMenusIntro.eyebrow}</p>
        <h2 id="menus-titulo" className="mt-3 font-display text-4xl leading-none sm:text-6xl">
          {tastingMenusIntro.title}
        </h2>
        <p className="mt-4 text-lg">{tastingMenusIntro.lead}</p>
      </div>

      <Carousel label={tastingMenusIntro.eyebrow} className="surgir surgir-depois mx-auto mt-12 max-w-6xl">
        {menus.map((menu) => (
          <TastingMenuCard
            key={menu.slug}
            name={menu.name}
            steps={menu.steps}
            description={menu.description}
            details={(menu.tags ?? []).map((tag) => DISH_TAG_LABELS[locale][tag])}
            photo={menu.photo}
            interest={interestPhrase(menu, locale)}
            labels={{
              reveal: tastingMenusIntro.revealLabel,
              close: tastingMenusIntro.closeLabel,
              reserve: tastingMenusIntro.reserveLabel,
            }}
          />
        ))}
      </Carousel>

      <div className="mx-auto mt-6 flex max-w-6xl flex-col items-center gap-2 px-6 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-sm text-ink/80">{tastingMenusIntro.note}</p>
        <ButtonLink href={localizePath(locale, "/cardapio#menu-degustacao")} variant="link" withArrow>
          {tastingMenusIntro.detailsLabel}
        </ButtonLink>
      </div>
    </section>
  );
}
