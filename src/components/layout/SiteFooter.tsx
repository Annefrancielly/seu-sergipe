import Link from "next/link";

import { BrandSeal } from "@/components/brand/BrandSeal";
import { InstagramIcon, WhatsAppIcon } from "@/components/graphics/SocialIcons";
import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { mainNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { openingHours } from "@/content/opening-hours";
import { formatHour, groupOpeningHours } from "@/lib/opening-hours";
import { buildWhatsAppUrl } from "@/lib/reservation";

const linkClasses = "underline decoration-1 underline-offset-4 hover:decoration-2";
const headingClasses = "text-sm font-semibold uppercase tracking-[0.25em] text-emphasis";
const iconCircleClasses =
  "inline-flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-current " +
  "transition-[background-color,scale] duration-300 ease-organic group-hover:bg-ink/10 group-active:scale-95";

export function SiteFooter() {
  const { address, contact, links } = siteConfig;
  const rows = groupOpeningHours(openingHours);
  const year = new Date().getFullYear();

  return (
    <footer data-surface="marrom" className="bg-surface text-ink">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="grid gap-12 text-center md:grid-cols-2 md:text-left lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p>
              <span className="sr-only">{siteConfig.name} — {siteConfig.tagline}</span>
              <BrandSeal className="mx-auto w-40 md:mx-0 md:w-44" />
            </p>
            <p className="mx-auto mt-6 max-w-xs font-display text-xl leading-snug md:mx-0">
              Aqui, é tudo nosso. É sergipanidade em todos os sentidos.
            </p>
            <ReservationTrigger className="mt-8">Faça sua reserva</ReservationTrigger>
          </div>

          <div className="lg:col-span-3">
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

          <div className="lg:col-span-2">
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

          <div className="lg:col-span-3">
            <h2 className={headingClasses}>Fale com a gente</h2>
            <ul className="mt-4 inline-flex flex-col items-start gap-3 text-left md:flex md:flex-row md:flex-wrap md:items-center md:gap-x-5">
              <li>
                <a
                  href={buildWhatsAppUrl(contact.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 font-semibold tabular-nums"
                >
                  <span className={iconCircleClasses}>
                    <WhatsAppIcon />
                  </span>
                  <span className="sr-only">WhatsApp: </span>
                  {contact.phoneDisplay}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
              <li>
                <a
                  href={links.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 font-semibold"
                >
                  <span className={iconCircleClasses}>
                    <InstagramIcon />
                  </span>
                  Instagram
                  <span className="sr-only"> {links.instagram.handle} (abre em nova aba)</span>
                </a>
              </li>
            </ul>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-sm">Restaurante</dt>
                <dd className="mt-1">
                  <a href={`mailto:${links.email}`} className={`break-all ${linkClasses}`}>
                    {links.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm">Contato comercial da chef</dt>
                <dd className="mt-1">
                  <a href={`mailto:${links.chefBusinessEmail}`} className={`break-all ${linkClasses}`}>
                    {links.chefBusinessEmail}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-ink/25 pt-6 text-center text-sm sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {year} {siteConfig.name} · {siteConfig.tagline}
          </p>
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
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
