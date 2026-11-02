import type { Metadata } from "next";

import { PhotoBackdrop } from "@/components/graphics/PhotoBackdrop";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { agendaContent, workshops } from "@/content/agenda";
import { type LocaleParams, pageMetadata, resolveLocale } from "@/i18n/server";
import { formatWorkshopDate, sortWorkshops } from "@/lib/agenda";
import { formatHour } from "@/lib/opening-hours";
import { whatsappHref } from "@/lib/whatsapp";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { eyebrow, lead } = agendaContent[locale];
  return pageMetadata({ locale, path: "/agenda", title: eyebrow, description: lead });
}

const AGENDA_PHOTO = "/images/casa/chef-encontro.jpg";

export default async function AgendaPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const agendaIntro = agendaContent[locale];
  const upcoming = sortWorkshops(workshops);

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

          {upcoming.length === 0 ? (
            <div className="surgir vidro-cafe mt-8 rounded-[1.75rem] p-8 text-center sm:p-12">
              <p className="font-display text-4xl leading-none font-semibold uppercase">{agendaIntro.emptyTitle}</p>
              <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed">{agendaIntro.emptyText}</p>
              <ButtonLink
                href={whatsappHref(agendaIntro.notifyMessage)}
                locale={locale}
                withArrow
                className="mt-8"
              >
                {agendaIntro.notifyLabel}
              </ButtonLink>
            </div>
          ) : (
            <ol className="mt-8 grid gap-5">
              {upcoming.map((workshop) => (
                <li key={workshop.slug} className="surgir vidro-cafe grid gap-4 rounded-[1.75rem] p-7 sm:grid-cols-[10rem_1fr] sm:p-8">
                  <p className="font-display text-3xl leading-none font-semibold uppercase text-accent">
                    {formatWorkshopDate(workshop.date, locale)}
                    <span className="mt-2 block text-sm font-normal tracking-[0.2em] text-ink">
                      {formatHour(workshop.time, locale)}
                    </span>
                  </p>
                  <div>
                    <h3 className="font-display text-3xl leading-none font-semibold uppercase">{workshop.text[locale].title}</h3>
                    <p className="mt-3 leading-relaxed">{workshop.text[locale].description}</p>
                    <ButtonLink
                      href={whatsappHref(
                        agendaIntro.joinMessage(workshop.text[locale].title, formatWorkshopDate(workshop.date, locale)),
                      )}
                      variant="link"
                      withArrow
                      locale={locale}
                      className="mt-4"
                    >
                      {agendaIntro.joinLabel}
                    </ButtonLink>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <WaveDivider from="marrom" to="marrom" withLine />
    </main>
  );
}
