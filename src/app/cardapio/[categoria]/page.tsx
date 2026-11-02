import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowIcon } from "@/components/graphics/ArrowIcon";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import { Section } from "@/components/layout/Section";
import { FlipCard } from "@/components/menu/FlipCard";
import { MenuList } from "@/components/menu/MenuList";
import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { dishes, menuCategories } from "@/content/menu";
import { categoryNeighbors, dishesInCategory, groupDishes } from "@/lib/menu";

type CategoryPageProps = {
  params: Promise<{ categoria: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return menuCategories.map((category) => ({ categoria: category.slug }));
}

function findCategory(slug: string) {
  return menuCategories.find((category) => category.slug === slug);
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = findCategory((await params).categoria);
  if (!category) return {};
  return {
    title: `${category.name} · Cardápio`,
    description: category.description,
    alternates: { canonical: `/cardapio/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoria } = await params;
  const category = findCategory(categoria);
  if (!category) notFound();

  const groups = groupDishes(dishesInCategory(dishes, category.slug));
  const { previous, next } = categoryNeighbors(menuCategories, category.slug);

  return (
    <main id="conteudo">
      <Section surface="verde" labelledBy="categoria-titulo" className="pt-28 pb-12 md:pt-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex justify-center md:justify-start">
            <Link
              href="/cardapio"
              className="group inline-flex min-h-12 items-center gap-2 text-sm font-semibold"
            >
              <ArrowIcon className="rotate-180 transition-transform duration-300 ease-organic group-hover:-translate-x-1" />
              Sumário
            </Link>
          </div>
          <h1 id="categoria-titulo" className="mt-6 font-display text-5xl leading-tight uppercase sm:text-6xl text-center md:text-left">
            {category.name}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-lg leading-relaxed md:mx-0 md:text-left">{category.description}</p>
        </div>
      </Section>

      <WaveDivider from="verde" to="verde" withLine />

      <Section surface="verde" className="pt-6 pb-secao">
        <div className="mx-auto max-w-5xl px-6">
          {groups.map((group, groupIndex) => (
            <section
              key={group.title ?? "itens"}
              aria-labelledby={group.title ? `grupo-${groupIndex}` : undefined}
              className={groupIndex > 0 ? "mt-14" : undefined}
            >
              {group.title && (
                <h2 id={`grupo-${groupIndex}`} className="surgir font-display text-3xl text-center md:text-left">
                  {group.title}
                </h2>
              )}
              {category.layout === "cards" ? (
                <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.dishes.map((dish, index) => (
                    <li key={dish.slug} className="surgir">
                      <FlipCard dish={dish} shape={index % 2 === 0 ? "folha" : "folha-inversa"} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="surgir mt-4">
                  <MenuList dishes={group.dishes} />
                </div>
              )}
            </section>
          ))}

          {category.notes && (
            <div className="mt-12 space-y-2 border-t border-ink/15 pt-6 text-sm text-center md:text-left">
              {category.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          )}

          <div className="surgir mt-12 flex flex-col items-center gap-4 text-center md:text-left md:items-start">
            <p className="font-display text-2xl">Bateu vontade?</p>
            <ReservationTrigger intro={`Vi ${category.name} no cardápio do site e quero reservar uma mesa.`}>
              Faça sua reserva
            </ReservationTrigger>
          </div>

          <nav aria-label="Outras seções do cardápio" className="mt-16 grid gap-4 sm:grid-cols-2">
            {previous && (
              <Link
                href={`/cardapio/${previous.slug}`}
                className="group flex flex-col rounded-folha-inversa border-2 border-ink/15 p-5 transition-colors hover:border-ink/40"
              >
                <span className="text-sm">Anterior</span>
                <span className="mt-1 inline-flex items-center gap-2 font-display text-xl">
                  <ArrowIcon className="rotate-180 transition-transform duration-300 ease-organic group-hover:-translate-x-1" />
                  {previous.name}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={`/cardapio/${next.slug}`}
                className="group flex flex-col items-end rounded-folha border-2 border-ink/15 p-5 text-right transition-colors hover:border-ink/40 sm:col-start-2"
              >
                <span className="text-sm">Próxima</span>
                <span className="mt-1 inline-flex items-center gap-2 font-display text-xl">
                  {next.name}
                  <ArrowIcon className="transition-transform duration-300 ease-organic group-hover:translate-x-1" />
                </span>
              </Link>
            )}
          </nav>
        </div>
      </Section>

      <WaveDivider from="verde" to="marrom" withLine />
    </main>
  );
}
