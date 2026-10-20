import { TerritoryLine } from "@/components/graphics/TerritoryLine";
import { OpenStatus } from "@/components/hours/OpenStatus";
import { Section } from "@/components/layout/Section";
import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/config/site";
import { openingHours } from "@/content/opening-hours";
import { formatHour, groupOpeningHours } from "@/lib/opening-hours";

export function LocationSection() {
  const { address } = siteConfig;
  const rows = groupOpeningHours(openingHours);

  return (
    <Section id="localizacao" surface="creme" labelledBy="localizacao-titulo" className="overflow-hidden py-secao">
      <TerritoryLine variant="meandro" className="absolute inset-y-0 -left-6 w-24 opacity-50 md:left-[4%] md:w-32" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6 lg:col-span-5">
          <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className="size-12 text-accent">
            <path
              className="traco-marca"
              d="M24 44 C16 34 10 26 10 19 C10 11 16 5 24 5 C32 5 38 11 38 19 C38 26 32 34 24 44 Z M24 14 C27 14 29 16 29 19 C29 22 27 24 24 24 C21 24 19 22 19 19 C19 16 21 14 24 14"
            />
          </svg>
          <h2 id="localizacao-titulo" className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Localização
          </h2>
          <address className="mt-6 text-lg not-italic leading-relaxed">
            {address.street}
            <br />
            {address.neighborhood}, {address.city} – {address.state}
            <br />
            CEP {address.postalCode}
          </address>
          <ButtonLink href={siteConfig.links.maps} withArrow className="mt-8">
            Como chegar
          </ButtonLink>
        </div>

        <div
          data-surface="verde"
          className="rounded-folha-inversa bg-surface p-7 text-ink sm:p-9 md:col-span-6 md:col-start-7"
        >
          <h3 className="font-display text-3xl">Horários</h3>
          <div className="mt-3">
            <OpenStatus />
          </div>
          <dl className="mt-6 space-y-6">
            {rows.map((row) => (
              <div key={row.days}>
                <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-emphasis">{row.days}</dt>
                <dd className="mt-2">
                  {row.periods.length === 0 ? (
                    <p className="text-lg">Fechado</p>
                  ) : (
                    <ul className="space-y-1 text-lg">
                      {row.periods.map((period) => (
                        <li key={period.label} className="flex justify-between gap-6 border-b border-ink/15 pb-1">
                          <span>{period.label}</span>
                          <span className="tabular-nums">
                            {formatHour(period.opens)} às {formatHour(period.closes)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <ReservationTrigger
            variant="link"
            intro="Gostaria de reservar uma mesa para hoje."
            presetToday
            className="mt-6"
          >
            Reservar para hoje
          </ReservationTrigger>
        </div>
      </div>
    </Section>
  );
}
