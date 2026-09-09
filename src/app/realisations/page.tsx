import type { Metadata } from "next";
import Link from "next/link";
import { delivered, intro, useCases, useCasesIntro } from "@/lib/work";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Projets livrés en production — machine learning, ERP, CRM, commerce en ligne, application mobile — et les chantiers d'automatisation que NOVA met en place aujourd'hui pour les PME et les startups.",
};

export default function RealisationsPage() {
  return (
    <>
      <Intro />
      <Delivered />
      <UseCases />
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

/* ------------------------------------------------------------- Delivered */

function Delivered() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-14 lg:px-12 lg:pt-16">
      <div className="grid gap-6 lg:grid-cols-2">
        {delivered.map((work) => (
          <article key={work.title} className="flex flex-col bg-mist p-8 lg:px-[34px] lg:py-9">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <p className="text-[14px] text-ink/45">{work.years}</p>
              <p className="text-[14px] text-azure">{work.context}</p>
            </div>
            <h2 className="mt-5 text-[clamp(1.35rem,1.9vw,1.625rem)] font-semibold leading-[1.24] tracking-[-0.03em]">
              {work.title}
            </h2>
            <p className="mt-4 text-[16px] leading-[1.58] text-ink/70">{work.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Use cases */

function UseCases() {
  return (
    <section className="mt-20 bg-navy-deep py-20 text-white lg:mt-[92px] lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] lg:col-span-6">
            {useCasesIntro.title}
          </h2>
          <p className="max-w-[52ch] text-[17px] leading-[1.6] text-white/55 lg:col-span-5 lg:col-start-8 lg:self-end">
            {useCasesIntro.text}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {useCases.map((item) => (
            <article
              key={item.title}
              className="flex flex-col border-t border-white/20 pt-7 lg:pt-8"
            >
              <p className="text-[14.5px] text-azure-light">{item.audience}</p>
              <h3 className="mt-4 text-[clamp(1.35rem,1.9vw,1.625rem)] font-semibold leading-[1.24] tracking-[-0.03em]">
                {item.title}
              </h3>
              <p className="mt-4 max-w-[54ch] text-[16px] leading-[1.58] text-white/55">
                {item.text}
              </p>
              <dl className="mt-6">
                {item.metrics.map((metric) => (
                  <div key={metric} className="border-t border-white/10 py-3">
                    <dd className="text-[15px] leading-[1.5] text-white/75">{metric}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Booking */

function Booking() {
  return (
    <section className="bg-navy-deep pb-20 text-white lg:pb-[84px]">
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
