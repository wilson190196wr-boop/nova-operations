import type { Metadata } from "next";
import Image from "next/image";
import { BookingCta } from "@/components/booking-cta";
import { facts, founder, principles, story, turn } from "@/lib/about";
import { founderPhoto } from "@/lib/photos";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Wilson Rault, ingénieur de l'École des Mines d'Alès, passé par Expedia Group, l'agence Glanum et Septeo. Pourquoi NOVA travaille à temps partagé pour les PME et les startups.",
};

export default function AProposPage() {
  return (
    <>
      <Intro />
      <Story />
      <Turn />
      <Principles />
      <BookingCta title="Parlons de votre cas." />
    </>
  );
}

/* ----------------------------------------------------------------- Intro */

function Intro() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-14 lg:px-12 lg:pt-16">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden bg-mist">
            <Image
              src={founderPhoto.src}
              alt={founderPhoto.alt}
              width={founderPhoto.width}
              height={founderPhoto.height}
              sizes="(max-width: 1024px) 80vw, 32vw"
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-5 text-[19px] font-semibold tracking-[-0.03em]">{founder.name}</p>
          <p className="mt-1 text-[14px] text-ink/45">{founder.role}</p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <h1 className="text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.048em]">
            {founder.quote}
          </h1>
          <p className="mt-8 max-w-[52ch] text-[19px] leading-[1.5] text-ink/70">
            Six ans à construire des logiciels, puis à diriger ceux qui les construisent. Dans un
            groupe américain, dans une agence digitale, puis chez un éditeur. NOVA est né de ce que
            j&apos;y ai vu manquer : une offre adaptée aux besoins des PME et des startups.
          </p>

          <dl className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[13.5px] text-ink/45">{fact.label}</dt>
                <dd className="mt-1.5 text-[17px] font-medium tracking-[-0.02em]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Story */

function Story() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-20 lg:px-12 lg:pt-[92px]">
      <h2 className="max-w-[18ch] text-[clamp(1.9rem,3.6vw,3.25rem)] font-semibold leading-[1] tracking-[-0.045em]">
        Du code à la direction de projets
      </h2>

      <ol className="mt-10">
        {story.map((item, i) => (
          <li
            key={item.period}
            className={`grid gap-3 border-t border-line py-8 lg:grid-cols-12 lg:gap-6 ${
              i === story.length - 1 ? "border-b" : ""
            }`}
          >
            <p className="text-[14px] text-ink/45 lg:col-span-2">{item.period}</p>
            <div className="lg:col-span-3">
              <p className="text-[18px] font-medium tracking-[-0.02em]">{item.role}</p>
              <p className="mt-1 text-[14.5px] text-ink/45">{item.place}</p>
            </div>
            <p className="max-w-[62ch] text-[16px] leading-[1.6] text-ink/70 lg:col-span-6 lg:col-start-7">
              {item.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ Turn */

function Turn() {
  return (
    <section className="mt-20 bg-navy-deep py-20 text-white lg:mt-[92px] lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <h2 className="text-[clamp(1.8rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.04em] lg:col-span-5">
            {turn.title}
          </h2>
          <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
            {turn.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-[58ch] text-[17px] leading-[1.62] text-white/60">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Principles */

function Principles() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-20 lg:px-12 lg:pt-[92px]">
      <h2 className="max-w-[16ch] text-[clamp(1.9rem,3.6vw,3.25rem)] font-semibold leading-[1] tracking-[-0.045em]">
        Quatre règles qui ne se négocient pas
      </h2>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {principles.map((principle) => (
          <article key={principle.title} className="bg-mist p-8 lg:px-[34px] lg:py-9">
            <h3 className="text-[22px] font-semibold tracking-[-0.028em]">{principle.title}</h3>
            <p className="mt-4 text-[16px] leading-[1.58] text-ink/70">{principle.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
