import type { Metadata } from "next";
import Link from "next/link";
import { intro, works } from "@/lib/work";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Six ans de projets menés comme ingénieur, chef de projet puis directeur de production : machine learning en production, industrialisation de l'IA, pilotage de prestataires, méthode agile.",
};

export default function RealisationsPage() {
  return (
    <>
      <Intro />
      <Works />
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

/* ----------------------------------------------------------------- Works */

function Works() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-14 lg:px-12 lg:pt-16">
      <div className="grid gap-6 lg:grid-cols-2">
        {works.map((work) => (
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

/* --------------------------------------------------------------- Booking */

function Booking() {
  return (
    <section className="mt-20 bg-navy-deep py-20 text-white lg:mt-[92px] lg:py-[84px]">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-7">
            <p className="text-[clamp(2.2rem,5.3vw,4.75rem)] font-semibold leading-[0.96] tracking-[-0.05em]">
              Le prochain projet est peut-être le vôtre.
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
