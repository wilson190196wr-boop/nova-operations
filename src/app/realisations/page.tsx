import type { Metadata } from "next";
import Link from "next/link";
import { ai, aiCases, aiCasesNote, aiProjects, appDev, appProjects, intro } from "@/lib/work";

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
      <Booking />
    </>
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

/* ------------------------------------------------- Développement applicatif */

function AppDev() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-20 lg:px-12 lg:pt-[92px]">
      <div className="grid gap-6 lg:grid-cols-12">
        <h2 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.04em] lg:col-span-5">
          {appDev.title}
        </h2>
        <p className="max-w-[52ch] text-[17px] leading-[1.6] text-ink/70 lg:col-span-5 lg:col-start-7 lg:self-end">
          {appDev.text}
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {appProjects.map((project) => (
          <article key={project.title} className="flex flex-col bg-mist p-8 lg:px-[34px] lg:py-9">
            <ProjectMeta years={project.years} context={project.context} />
            <h3 className="mt-5 text-[clamp(1.3rem,1.8vw,1.5rem)] font-semibold leading-[1.24] tracking-[-0.03em]">
              {project.title}
            </h3>
            <p className="mt-4 text-[16px] leading-[1.58] text-ink/70">{project.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------- Automatisation et IA */

function Ai() {
  return (
    <section className="mt-20 bg-navy-deep py-20 text-white lg:mt-[92px] lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.04em] lg:col-span-5">
            {ai.title}
          </h2>
          <p className="max-w-[52ch] text-[17px] leading-[1.6] text-white/55 lg:col-span-5 lg:col-start-7 lg:self-end">
            {ai.text}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {aiProjects.map((project) => (
            <article key={project.title} className="flex flex-col bg-white/[0.06] p-8 lg:px-[34px] lg:py-9">
              <ProjectMeta years={project.years} context={project.context} dark />
              <h3 className="mt-5 text-[clamp(1.3rem,1.8vw,1.5rem)] font-semibold leading-[1.24] tracking-[-0.03em]">
                {project.title}
              </h3>
              <p className="mt-4 text-[16px] leading-[1.58] text-white/55">{project.text}</p>
            </article>
          ))}
        </div>

        <p className="mt-16 max-w-[62ch] border-t border-white/20 pt-7 text-[16px] leading-[1.6] text-white/50">
          {aiCasesNote}
        </p>

        <div className="mt-10 grid gap-x-6 gap-y-10 lg:grid-cols-2">
          {aiCases.map((item) => (
            <article key={item.title} className="flex flex-col">
              <p className="text-[14.5px] text-azure-light">{item.audience}</p>
              <h3 className="mt-3 text-[clamp(1.25rem,1.7vw,1.4rem)] font-semibold leading-[1.26] tracking-[-0.028em]">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[54ch] text-[15.5px] leading-[1.58] text-white/55">
                {item.text}
              </p>
              <ul className="mt-5">
                {item.metrics.map((metric) => (
                  <li
                    key={metric}
                    className="border-t border-white/15 py-3 text-[15px] leading-[1.5] text-white/80"
                  >
                    {metric}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectMeta({
  years,
  context,
  dark = false,
}: {
  years: string;
  context: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
      <p className={`text-[14px] ${dark ? "text-white/40" : "text-ink/45"}`}>{years}</p>
      <p className={`text-[14px] ${dark ? "text-azure-light" : "text-azure"}`}>{context}</p>
    </div>
  );
}

/* --------------------------------------------------------------- Booking */

function Booking() {
  return (
    <section className="mt-20 bg-navy-deep py-20 text-white lg:mt-0 lg:pb-[84px] lg:pt-0">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-10 border-t border-white/20 pt-16 lg:grid-cols-12 lg:items-end lg:gap-6 lg:pt-20">
          <div className="lg:col-span-7">
            <p className="text-[clamp(2.2rem,5.3vw,4.75rem)] font-semibold leading-[0.96] tracking-[-0.05em]">
              Lequel ressemble au vôtre ?
            </p>
            <p className="mt-6 max-w-[46ch] text-[19px] leading-[1.5] text-white/60">
              Quarante-cinq minutes pour décrire votre organisation et savoir s&apos;il y a matière.
              Si aucune mission ne se justifie, je vous le dirai aussi.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Link
              href="/contact"
              className="block rounded-lg bg-azure px-8 py-5 text-center text-[17px] font-medium text-white transition-opacity hover:opacity-90"
            >
              Choisir un créneau
            </Link>
            <p className="mt-3 text-center text-[13.5px] text-white/40">
              Visio ou téléphone, sans engagement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
