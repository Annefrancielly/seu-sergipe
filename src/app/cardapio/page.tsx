import type { Metadata } from "next";

import { WaveDivider } from "@/components/graphics/WaveDivider";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { reservationHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Cardápio",
};

const whatsappUrl = reservationHref("Vim pelo site e gostaria de conhecer o cardápio.");

export default function MenuPage() {
  return (
    <main id="conteudo">
      <Section surface="verde" labelledBy="cardapio-titulo" className="py-secao">
        <div className="mx-auto max-w-2xl px-6">
          <h1 id="cardapio-titulo" className="font-display text-5xl">
            Cardápio
          </h1>
          <p className="mt-6 text-lg leading-relaxed">
            Nosso cardápio interativo está sendo preparado com carinho. Enquanto isso, fale com a
            gente pelo WhatsApp: tiramos suas dúvidas e reservamos sua mesa.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={whatsappUrl} withArrow>
              Falar pelo WhatsApp
            </ButtonLink>
            <ButtonLink href="/" variant="secondary">
              Voltar ao início
            </ButtonLink>
          </div>
        </div>
      </Section>
      <WaveDivider from="verde" to="creme" withLine />
    </main>
  );
}
