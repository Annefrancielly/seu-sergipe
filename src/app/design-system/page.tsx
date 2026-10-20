import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import chefPhoto from "@/assets/images/chef-seichele-barboza.jpg";
import salaoPhoto from "@/assets/images/salao-seu-sergipe.jpg";
import { TerritoryLine } from "@/components/graphics/TerritoryLine";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Carousel } from "@/components/ui/Carousel";
import { DishCard } from "@/components/ui/DishCard";
import { OrganicFrame } from "@/components/ui/OrganicFrame";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { deployment } from "@/config/deployment";
import { ORGANIC_SHAPES, type OrganicShapeName } from "@/lib/organic-shapes";
import type { Dish, Testimonial } from "@/types/content";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const PALETTE = [
  { name: "Verde profundo", token: "verde-profundo", hex: "#003122", swatch: "bg-verde-profundo" },
  { name: "Marrom terroso", token: "marrom-terroso", hex: "#84431D", swatch: "bg-marrom-terroso" },
  { name: "Laranja quente", token: "laranja-quente", hex: "#F69719", swatch: "bg-laranja-quente" },
  { name: "Vermelho telha", token: "vermelho-telha", hex: "#DA4324", swatch: "bg-vermelho-telha" },
  { name: "Creme", token: "creme", hex: "#FAE8DC", swatch: "bg-creme" },
] as const;

const EXAMPLE_DISHES: Dish[] = Array.from({ length: 5 }, (_, index) => ({
  slug: `exemplo-${index + 1}`,
  name: `Prato de exemplo ${index + 1}`,
  description: "Texto provisório para avaliar o card. Os pratos reais serão escolhidos pela chef.",
  categorySlug: "exemplo",
  story: index % 2 === 0 ? "Espaço para a história ou homenagem cultural por trás do prato." : undefined,
  photo:
    index === 0
      ? { src: salaoPhoto.src, alt: "", width: salaoPhoto.width, height: salaoPhoto.height }
      : undefined,
}));

const EXAMPLE_TESTIMONIALS: Testimonial[] = [1, 2, 3].map((number) => ({
  author: `Pessoa de exemplo ${number}`,
  text: "Texto provisório para avaliar o card. As avaliações reais virão de clientes que autorizarem a publicação.",
  source: number === 2 ? "depoimento-autorizado" : "google",
  rating: number === 3 ? 4 : 5,
}));

const SHAPE_NAMES = Object.keys(ORGANIC_SHAPES) as OrganicShapeName[];

export default function DesignSystemPage() {
  if (deployment.isProduction) notFound();

  return (
    <main id="conteudo">
      <Section surface="verde" labelledBy="ds-titulo" className="overflow-hidden py-secao">
        <TerritoryLine className="absolute inset-y-0 right-4 w-24 opacity-70 md:right-[12%] md:w-40" />
        <div className="relative mx-auto max-w-5xl px-6">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Etapa 1 · revisão interna</p>
          <h1 id="ds-titulo" className="mt-4 max-w-2xl font-display text-5xl leading-tight md:text-6xl">
            Linhas, curvas e superfícies do Seu Sergipe
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed">
            Página de trabalho para aprovar os componentes antes da composição das seções.
            Não é indexada e não existe em produção.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="#formas" withArrow>
              Botão principal
            </ButtonLink>
            <ButtonLink href="#superficies" variant="secondary">
              Botão secundário
            </ButtonLink>
          </div>
        </div>
      </Section>

      <WaveDivider from="verde" to="creme" withLine />

      <Section surface="creme" labelledBy="paleta-titulo" className="py-secao">
        <div className="mx-auto max-w-5xl px-6">
          <h2 id="paleta-titulo" className="font-display text-4xl">Paleta</h2>
          <p className="mt-3 max-w-xl leading-relaxed">
            Valores extraídos do PDF da marca, a confirmar com a agência.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {PALETTE.map((color) => (
              <li key={color.token}>
                <div
                  className={`aspect-square rounded-folha border border-verde-profundo/15 ${color.swatch}`}
                />
                <p className="mt-3 font-semibold">{color.name}</p>
                <p className="font-mono text-sm">{color.hex}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="formas" surface="creme" labelledBy="formas-titulo" className="pb-secao">
        <div className="mx-auto max-w-5xl px-6">
          <h2 id="formas-titulo" className="font-display text-4xl">Molduras orgânicas</h2>
          <p className="mt-3 max-w-xl leading-relaxed">
            A mesma geometria define a máscara da fotografia e o arco que a abraça.
          </p>
          <ul className="mt-12 grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
            {SHAPE_NAMES.map((shape, index) => (
              <li key={shape}>
                <OrganicFrame shape={shape} className="aspect-[4/5]">
                  <Image
                    src={chefPhoto}
                    alt={
                      index === 0
                        ? "Chef Seichele Barboza sorrindo, de braços cruzados, com dólmã preto diante de uma parede azul entre dois quadros."
                        : ""
                    }
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </OrganicFrame>
                <p className="mt-6 text-center font-mono text-sm">{shape}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section surface="creme" labelledBy="carrossel-titulo" className="pb-secao">
        <div className="mx-auto max-w-5xl px-6">
          <h2 id="carrossel-titulo" className="font-display text-4xl">Carrossel e cards de prato</h2>
          <p className="mt-3 max-w-xl leading-relaxed">
            Arraste no celular, use os botões ou as setas do teclado com o carrossel em foco.
          </p>
        </div>
        <Carousel label="Exemplo de carrossel" className="mx-auto mt-10 max-w-5xl">
          {EXAMPLE_DISHES.map((dish) => (
            <DishCard key={dish.slug} dish={dish} />
          ))}
        </Carousel>
      </Section>

      <WaveDivider from="creme" to="marrom" variant="ampla" flip />

      <Section id="superficies" surface="marrom" labelledBy="superficies-titulo" className="py-secao">
        <div className="mx-auto max-w-5xl px-6">
          <h2 id="superficies-titulo" className="font-display text-4xl">Superfícies contextuais</h2>
          <p className="mt-3 max-w-xl leading-relaxed">
            Os mesmos componentes mudam de cor conforme a superfície em que estão.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {(["creme", "verde", "marrom"] as const).map((surface) => (
              <div
                key={surface}
                data-surface={surface}
                className="rounded-folha bg-surface p-8 text-ink ring-1 ring-creme/20"
              >
                <p className="font-mono text-sm uppercase tracking-widest text-emphasis">{surface}</p>
                <p className="mt-3 font-display text-2xl">Sente-se e fique um pouco mais.</p>
                <div className="mt-6 flex flex-col items-start gap-3">
                  <ButtonLink href="#superficies" withArrow>
                    Reservar
                  </ButtonLink>
                  <ButtonLink href="#superficies" variant="secondary">
                    Cardápio
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <WaveDivider from="marrom" to="verde" withLine />

      <Section surface="verde" labelledBy="fio-titulo" className="relative min-h-[150vh] overflow-hidden py-secao">
        <TerritoryLine variant="meandro" className="absolute inset-y-0 left-1/2 w-48 -translate-x-1/2" />
        <div className="relative mx-auto max-w-5xl px-6">
          <h2 id="fio-titulo" className="font-display text-4xl">Fio do território</h2>
          <p className="mt-3 max-w-md leading-relaxed">
            Role a página: o traço se revela acompanhando a leitura. Com redução de movimento
            ativada, ele aparece completo desde o início.
          </p>
        </div>
      </Section>

      <Section surface="verde" labelledBy="depoimentos-titulo" className="pb-secao">
        <div className="mx-auto max-w-5xl px-6">
          <h2 id="depoimentos-titulo" className="font-display text-4xl">Cards de avaliação</h2>
        </div>
        <Carousel label="Exemplo de avaliações" className="mx-auto mt-10 max-w-5xl">
          {EXAMPLE_TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              testimonial={testimonial}
              shape={index % 2 === 0 ? "folha" : "folha-inversa"}
            />
          ))}
        </Carousel>
      </Section>

      <WaveDivider from="verde" to="marrom" withLine />
    </main>
  );
}
