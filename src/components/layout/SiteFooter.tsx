import Link from "next/link";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { siteConfig } from "@/config/site";
import { openingHours } from "@/content/opening-hours";
import { formatHour, groupOpeningHours } from "@/lib/opening-hours";
import { buildWhatsAppUrl } from "@/lib/reservation";

const linkClasses = "underline decoration-1 underline-offset-4 hover:decoration-2";
const headingClasses = "text-sm font-semibold uppercase tracking-[0.25em] text-emphasis";

export function SiteFooter() {
  const { address, contact, links } = siteConfig;
  const rows = groupOpeningHours(openingHours);
  const year = new Date().getFullYear();

  return (
    <footer data-surface="marrom" className="bg-surface text-ink">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p>
              <span className="sr-only">{siteConfig.name} — {siteConfig.tagline}</span>
              <BrandLogo />
            </p>
            <p className="mt-6 max-w-xs font-display text-xl leading-snug">
              Aqui, é tudo nosso. É sergipanidade em todos os sentidos.
            </p>
            <ReservationTrigger className="mt-8">Faça sua reserva</ReservationTrigger>
          </div>

          <div className="md:col-span-3 md:col-start-6">
            <h2 className={headingClasses}>Visite</h2>
            <address className="mt-4 not-italic leading-relaxed">
              {address.street}
              <br />
              {address.neighborhood}, {address.city} – {address.state}
              <br />
              CEP {address.postalCode}
            </address>
            <a href={links.maps} target="_blank" rel="noopener noreferrer" className={`mt-3 inline-block ${linkClasses}`}>
              Como chegar<span className="sr-only"> (abre o Google Maps em nova aba)</span>
            </a>
          </div>

          <div className="md:col-span-2">
            <h2 className={headingClasses}>Horários</h2>
            <dl className="mt-4 space-y-3 leading-relaxed">
              {rows.map((row) => (
                <div key={row.days}>
                  <dt className="font-semibold">{row.days}</dt>
                  {row.periods.length === 0 ? (
                    <dd>Fechado</dd>
                  ) : (
                    row.periods.map((period) => (
                      <dd key={period.label}>
                        {period.label}: {formatHour(period.opens)} às {formatHour(period.closes)}
                      </dd>
                    ))
                  )}
                </div>
              ))}
            </dl>
          </div>

          <div className="md:col-span-3">
            <h2 className={headingClasses}>Fale com a gente</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={buildWhatsAppUrl(contact.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses}
                >
                  WhatsApp {contact.phoneDisplay}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
              <li>
                <a href={links.instagram.url} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                  Instagram {links.instagram.handle}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${links.email}`} className={linkClasses}>
                  {links.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink/25 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name} · {siteConfig.tagline}
          </p>
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <Link href="/cardapio" className={linkClasses}>
                  Cardápio
                </Link>
              </li>
              <li>
                <a href="#conteudo" className={linkClasses}>
                  Voltar ao topo
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
