import type { Metadata } from "next";
import Link from "next/link";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import { Section } from "@/components/layout/Section";
import { CategoryCard } from "@/components/menu/CategoryCard";
import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { siteConfig } from "@/config/site";
import { menuCategories } from "@/content/menu";

export const metadata: Metadata = {
  title: "Cardápio",
  description: "Navegue pelo cardápio do Seu Sergipe: menus degustação, entradas, pratos principais, moquecas, drinks e sobremesas.",
  alternates: { canonical: "/cardapio" },
};

export default function MenuPage() {
  return (
    <main id="conteudo">
      <Section surface="verde" labelledBy="cardapio-titulo" className="pt-10 pb-14 md:pt-14">
        <div className="mx-auto max-w-5xl px-6 text-center md:text-left">
          <Link href="/" className="inline-block" aria-label={`${siteConfig.name}: voltar ao início`}>
            <BrandLogo size="sm" />
          </Link>
          <h1 id="cardapio-titulo" className="mt-12 font-display text-5xl sm:text-6xl">
            Cardápio
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed md:mx-0">
            Navegue pelo nosso cardápio e descubra as sensações que preparamos para você.
          </p>
        </div>
      </Section>

      <WaveDivider from="verde" to="creme" withLine />

      <Section surface="creme" labelledBy="sumario-titulo" className="pt-6 pb-secao">
        <div className="mx-auto max-w-5xl px-6">
          <h2 id="sumario-titulo" className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-emphasis md:text-left">
            Sumário
          </h2>
          <ul className="mt-6 grid grid-cols-3 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
            {menuCategories.map((category, index) => (
              <li key={category.slug} className="surgir">
                <CategoryCard category={category} index={index} />
              </li>
            ))}
          </ul>

          <div className="surgir mt-16 flex flex-col items-center gap-4 text-center md:text-left md:items-start">
            <p className="font-display text-2xl">Já sabe o que vai pedir?</p>
            <ReservationTrigger intro="Vim pelo cardápio do site e quero reservar uma mesa.">
              Faça sua reserva
            </ReservationTrigger>
          </div>
        </div>
      </Section>

      <WaveDivider from="creme" to="marrom" withLine />
    </main>
  );
}
