import type { Metadata } from "next";

import { AgendaList } from "@/components/agenda/AgendaList";
import { PhotoBackdrop } from "@/components/graphics/PhotoBackdrop";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import { PageHero } from "@/components/layout/PageHero";
import { agendaContent, agendaItems } from "@/content/agenda";
import { type LocaleParams, pageMetadata, resolveLocale } from "@/i18n/server";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { title, lead } = agendaContent[locale];
  return pageMetadata({ locale, path: "/agenda", title, description: lead });
}

const AGENDA_PHOTO = "/images/casa/chef-encontro.jpg";

export default async function AgendaPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const agendaIntro = agendaContent[locale];

  return (
    <main id="conteudo">
      <PageHero eyebrow={agendaIntro.eyebrow} title={agendaIntro.title} lead={agendaIntro.lead} image={AGENDA_PHOTO} imagePosition="50% 44%" />

      <WaveDivider from="verde" to="marrom" withLine />

      <section
        data-surface="marrom"
        aria-labelledby="datas-titulo"
        className="relative isolate overflow-hidden bg-surface py-secao text-ink"
      >
        <PhotoBackdrop image="/images/casa/cozinha-passe.jpg" />
        <div className="mx-auto max-w-4xl px-6">
          <h2 id="datas-titulo" className="text-center text-xs uppercase tracking-[0.3em] text-emphasis md:text-left">
            {agendaIntro.upcomingTitle}
          </h2>
          <AgendaList items={agendaItems} />
        </div>
      </section>

      <WaveDivider from="marrom" to="marrom" withLine />
    </main>
  );
}
