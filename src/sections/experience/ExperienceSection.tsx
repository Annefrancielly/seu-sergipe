import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { OrganicFrame } from "@/components/ui/OrganicFrame";
import { experienceIntro, tastingMenus } from "@/content/experience";

export function ExperienceSection() {
  return (
    <Section id="experiencia" surface="marrom" labelledBy="experiencia-titulo" className="py-secao">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6 lg:col-span-5">
          <h2 id="experiencia-titulo" className="font-display text-4xl leading-tight sm:text-5xl">
            {experienceIntro.title}
          </h2>
          <p className="mt-6 font-display text-2xl leading-snug text-emphasis">
            {experienceIntro.lead}
          </p>
          <p className="mt-4 text-lg leading-relaxed">{experienceIntro.body}</p>
          <p className="mt-4 text-lg leading-relaxed">{experienceIntro.closing}</p>
          <ReservationTrigger className="mt-10">{experienceIntro.reserveLabel}</ReservationTrigger>
        </div>

        <div className="md:col-span-6 lg:col-start-7">
          <OrganicFrame shape="folha" className="mx-auto aspect-[5/4] w-full max-w-md md:max-w-none">
            <Image
              src={experienceIntro.photo.src}
              alt={experienceIntro.photo.alt}
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </OrganicFrame>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl px-6">
        <h3 className="font-display text-3xl">{experienceIntro.menusTitle}</h3>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {tastingMenus.map((menu, index) => (
            <li
              key={menu.slug}
              data-surface="verde"
              className={`flex flex-col bg-surface p-7 text-ink ${index % 2 === 0 ? "rounded-folha" : "rounded-folha-inversa"}`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emphasis">
                {menu.steps} etapas
              </p>
              <h4 className="mt-3 font-display text-2xl leading-tight">{menu.name}</h4>
              <p className="mt-3 leading-relaxed">{menu.description}</p>
              {menu.note && <p className="mt-4 text-sm font-semibold">{menu.note}</p>}
              <ReservationTrigger
                variant="link"
                intro={menu.reservationIntro}
                srContext={`: ${menu.name}`}
                className="mt-auto self-start pt-6"
              >
                Quero viver esta experiência
              </ReservationTrigger>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm">{experienceIntro.menusNote}</p>
      </div>
    </Section>
  );
}
