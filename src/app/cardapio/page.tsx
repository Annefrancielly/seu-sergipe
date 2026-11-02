import type { Metadata } from "next";

import { WaveDivider } from "@/components/graphics/WaveDivider";
import { Section } from "@/components/layout/Section";
import { MenuIndex } from "@/components/menu/MenuIndex";
import { MenuList } from "@/components/menu/MenuList";
import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { dishes, menuCategories } from "@/content/menu";
import { dishesInCategory, groupDishes } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Cardápio",
  description: "O cardápio do Seu Sergipe: menus degustação, entradas, pratos principais, moquecas, drinks, bebidas e sobremesas.",
  alternates: { canonical: "/cardapio" },
};

export default function MenuPage() {
  return (
    <main id="conteudo">
      <Section surface="verde" labelledBy="cardapio-titulo" className="luz-de-vela pt-36 pb-12 [--vela-x:50%] [--vela-y:60%] md:pt-40">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-emphasis">Casa de Cultura &amp; Arte Gastronômica</p>
          <h1 id="cardapio-titulo" className="mt-3 font-display text-6xl leading-none font-semibold uppercase sm:text-7xl">
            Cardápio
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed">
            Navegue pelo nosso cardápio e descubra as sensações que preparamos para você.
          </p>
        </div>
      </Section>

      <MenuIndex categories={menuCategories} />

      <Section surface="verde" className="pb-secao">
        <div className="mx-auto max-w-3xl px-6">
          {menuCategories.map((category, index) => {
            const groups = groupDishes(dishesInCategory(dishes, category.slug));
            const titleId = `${category.slug}-titulo`;

            return (
              <section key={category.slug} id={category.slug} aria-labelledby={titleId} className="scroll-mt-16 pt-20">
                <header className="text-center">
                  <p aria-hidden="true" className="font-display text-lg text-emphasis">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 id={titleId} className="mt-1 font-display text-4xl leading-none font-semibold uppercase sm:text-5xl">
                    {category.name}
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/70">{category.description}</p>
                  <span aria-hidden="true" className="mx-auto mt-6 block h-px w-16 bg-accent/60" />
                </header>

                {groups.map((group) => (
                  <div key={group.title ?? "itens"} className="mt-8">
                    {group.title && (
                      <h3 className="text-center text-xs uppercase tracking-[0.3em] text-emphasis">{group.title}</h3>
                    )}
                    <MenuList dishes={group.dishes} />
                  </div>
                ))}

                {category.notes && (
                  <div className="mt-6 space-y-1.5 text-center text-xs italic leading-relaxed text-ink/55">
                    {category.notes.map((note) => (
                      <p key={note}>{note}</p>
                    ))}
                  </div>
                )}
              </section>
            );
          })}

          <div className="mt-24 flex flex-col items-center gap-4 text-center">
            <p className="font-display text-3xl uppercase">Bateu vontade?</p>
            <ReservationTrigger intro="Vim pelo cardápio do site e quero reservar uma mesa.">Faça sua reserva</ReservationTrigger>
          </div>
        </div>
      </Section>

      <WaveDivider from="verde" to="marrom" withLine />
    </main>
  );
}
