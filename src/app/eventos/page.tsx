import type { Metadata } from "next";

import { PhotoBackdrop } from "@/components/graphics/PhotoBackdrop";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { eventFormats, eventsIntro } from "@/content/events";
import { whatsappHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Eventos",
  description: eventsIntro.lead,
  alternates: { canonical: "/eventos" },
};

const quoteMessage = (format?: string) =>
  format
    ? `Olá! Vim pelo site do Seu Sergipe e quero um orçamento de evento: ${format}.`
    : "Olá! Vim pelo site do Seu Sergipe e quero um orçamento de evento.";

export default function EventsPage() {
  return (
    <main id="conteudo">
      <PageHero
        eyebrow={eventsIntro.eyebrow}
        title={eventsIntro.title}
        lead={eventsIntro.lead}
        image="/images/casa/encontro-mesa.jpg"
        imagePosition="50% 45%"
      />

      <WaveDivider from="verde" to="marrom" withLine />

      <section
        data-surface="marrom"
        aria-labelledby="formatos-titulo"
        className="relative isolate overflow-hidden bg-surface py-secao text-ink"
      >
        <PhotoBackdrop image="/images/casa/mesa-montagem.jpg" />
        <h2 id="formatos-titulo" className="sr-only">
          Formatos de evento
        </h2>
        <ul className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-3">
          {eventFormats.map((format, index) => (
            <li
              key={format.slug}
              className={`surgir vidro-cafe flex flex-col rounded-[1.75rem] p-7 sm:p-8 ${index === 1 ? "surgir-depois" : index === 2 ? "surgir-por-ultimo" : ""}`}
            >
              <span aria-hidden="true" className="font-display text-5xl leading-none text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-3xl leading-none font-semibold uppercase">{format.title}</h3>
              <p className="mt-4 leading-relaxed">{format.description}</p>
              <ButtonLink href={whatsappHref(quoteMessage(format.title))} variant="link" withArrow className="mt-auto pt-6">
                {eventsIntro.quoteLabel}
              </ButtonLink>
            </li>
          ))}
        </ul>

        <div className="surgir mx-auto mt-16 max-w-2xl px-6 text-center">
          <h2 className="font-display text-4xl leading-none font-semibold uppercase">{eventsIntro.closingTitle}</h2>
          <p className="mt-4 text-lg leading-relaxed">{eventsIntro.closing}</p>
          <ButtonLink href={whatsappHref(quoteMessage())} withArrow className="mt-8">
            {eventsIntro.quoteLabel}
          </ButtonLink>
        </div>
      </section>

      <WaveDivider from="marrom" to="marrom" withLine />
    </main>
  );
}
