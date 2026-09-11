import type { Metadata } from "next";
import { BookingCta } from "@/components/booking-cta";
import { ai, aiCases, aiProjects, appDev, appProjects, intro, type Work } from "@/lib/work";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Développement applicatif — CRM, ERP, commerce en ligne, application mobile — et automatisation par l'intelligence artificielle pour les PME de plus de 30 salariés et les startups.",
};

export default function RealisationsPage() {
  return (
    <>
      <Intro />
      <AppDev />
      <Ai />
      <BookingCta title="Lequel ressemble au vôtre ?" />
    </>
  );
}

/* ------------------------------------------------------------------ Carte */

/**
 * Format unique pour toutes les réalisations, claires comme sombres :
 * métadonnées, titre, description, deux indicateurs.
 */
function WorkCard({ work, dark = false }: { work: Work; dark?: boolean }) {
  return (
    <article
      className={`flex flex-col p-8 lg:px-[34px] lg:py-9 ${dark ? "bg-white/[0.06]" : "bg-mist"}`}
    >
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
        {work.years ? (
          <p className={`text-[14px] ${dark ? "text-white/40" : "text-ink/45"}`}>{work.years}</p>
        ) : null}
        <p className={`text-[14px] ${dark ? "text-azure-light" : "text-azure"}`}>{work.context}</p>
      </div>

      <h3 className="mt-5 text-[clamp(1.3rem,1.8vw,1.5rem)] font-semibold leading-[1.24] tracking-[-0.03em]">
        {work.title}
      </h3>

      <p className={`mt-4 text-[16px] leading-[1.58] ${dark ? "text-white/55" : "text-ink/70"}`}>
        {work.text}
      </p>

      <ul className="mt-6">
        {work.metrics.map((metric) => (
          <li
            key={metric}
            className={`border-t py-3 text-[15px] leading-[1.5] ${
              dark ? "border-white/15 text-white/80" : "border-line text-ink/80"
            }`}
          >
            {metric}
          </li>
        ))}
      </ul>
    </article>
  );
}

/**
 * Le chapeau de section. `text` est facultatif : les deux sections n'en ont
 * plus, et rendre un paragraphe vide laisserait une gouttière inexpliquée à
 * droite du titre.
 */
function SectionHead({
  title,
  text,
  dark = false,
}: {
  title: string;
  text?: string;
  dark?: boolean;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <h2 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.04em] lg:col-span-5">
        {title}
      </h2>
      {text ? (
        <p
          className={`max-w-[52ch] text-[17px] leading-[1.6] lg:col-span-5 lg:col-start-7 lg:self-end ${
            dark ? "text-white/55" : "text-ink/70"
          }`}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------------------------- Intro */

function Intro() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-14 lg:px-12 lg:pt-16">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        <h1 className="text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.048em] lg:col-span-7">
          {intro.title}
        </h1>
        <p className="max-w-[52ch] text-[17px] leading-[1.6] text-ink/70 lg:col-span-4 lg:col-start-9 lg:self-end">
          {intro.text}
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------- Développement applicatif */

function AppDev() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-20 lg:px-12 lg:pt-[92px]">
      <SectionHead title={appDev.title} />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {appProjects.map((work) => (
          <WorkCard key={work.title} work={work} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------- Automatisation et IA */

function Ai() {
  return (
    <section className="mt-20 bg-navy-deep py-20 text-white lg:mt-[92px] lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <SectionHead title={ai.title} dark />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {[...aiProjects, ...aiCases].map((work) => (
            <WorkCard key={work.title} work={work} dark />
          ))}
        </div>
      </div>
    </section>
  );
}
