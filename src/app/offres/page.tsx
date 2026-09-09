import type { Metadata } from "next";
import { BookingCta } from "@/components/booking-cta";
import { audit, intro, path, sprint, support, training } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Offres",
  description:
    "Audit à 2 500 ou 7 500 € HT, sprints d'automatisation, accompagnement mensuel à partir de 1 600 € et formation des équipes. Les quatre façons de travailler avec NOVA.",
};

export default function OffresPage() {
  return (
    <>
      <Intro />
      <Path />
      <Audit />
      <Sprint />
      <Support />
      <Training />
      <BookingCta title="Par où commencer ?" />
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

/* --------------------------------------------------------------- Parcours */

function Path() {
  return (
    <section className="mt-20 bg-navy-deep py-20 text-white lg:mt-[92px] lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <ol className="grid gap-10 lg:grid-cols-3 lg:gap-6">
          {path.map((step, i) => (
            <li key={step.n}>
              <p
                className="text-[clamp(4.5rem,9vw,8.125rem)] font-semibold leading-[0.84] tracking-[-0.06em]"
                style={{ color: i === path.length - 1 ? "var(--color-azure)" : "var(--color-navy-soft)" }}
              >
                {step.n}
              </p>
              <p className="mt-3.5 text-[30px] font-semibold tracking-[-0.032em]">{step.title}</p>
              <p className="mt-3 max-w-[38ch] text-[15.5px] leading-[1.62] text-white/60">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Audit */

function Audit() {
  return (
    <section id="audit" className="mx-auto w-full max-w-[1440px] scroll-mt-8 px-6 pt-20 lg:px-12 lg:pt-[92px]">
      <OfferHead title={audit.title} text={audit.text} />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {audit.formats.map((format) => (
          <article key={format.name} className="flex flex-col bg-mist p-8 lg:px-[34px] lg:py-9">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="text-[clamp(1.4rem,1.9vw,1.625rem)] font-semibold tracking-[-0.03em]">
                {format.name}
              </h3>
              <p className="text-[clamp(1.4rem,2vw,1.75rem)] font-semibold tracking-[-0.04em] text-azure">
                {format.price}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-[14.5px] text-ink/45">
              <p>{format.duration}</p>
              <p>{format.scope}</p>
            </div>

            <ul className="mt-6">
              {format.items.map((item) => (
                <li
                  key={item}
                  className="border-t border-line py-3 text-[15.5px] leading-[1.5] text-ink/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="mt-8 max-w-[62ch] text-[16px] leading-[1.6] text-ink/70">{audit.note}</p>
    </section>
  );
}

/* ---------------------------------------------------------------- Sprints */

function Sprint() {
  return (
    <section id="sprints" className="mx-auto w-full max-w-[1440px] scroll-mt-8 px-6 pt-20 lg:px-12 lg:pt-[92px]">
      <OfferHead title={sprint.title} text={sprint.text} price={sprint.price} />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {sprint.rules.map((rule) => (
          <article key={rule.title} className="bg-mist p-8 lg:px-[30px] lg:py-9">
            <h3 className="text-[19px] font-semibold leading-[1.28] tracking-[-0.025em]">
              {rule.title}
            </h3>
            <p className="mt-4 text-[15.5px] leading-[1.58] text-ink/70">{rule.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Accompagnement */

function Support() {
  return (
    <section
      id="accompagnement"
      className="mx-auto w-full max-w-[1440px] scroll-mt-8 px-6 pt-20 lg:px-12 lg:pt-[92px]"
    >
      <OfferHead title={support.title} text={support.text} />

      <dl className="mt-12">
        {support.levels.map((level, i) => (
          <div
            key={level.name}
            className={`grid gap-3 border-t border-line py-7 lg:grid-cols-12 lg:gap-6 ${
              i === support.levels.length - 1 ? "border-b" : ""
            }`}
          >
            <dt className="text-[22px] font-semibold tracking-[-0.03em] lg:col-span-3">
              {level.name}
            </dt>
            <dd className="text-[19px] font-semibold tracking-[-0.03em] text-azure lg:col-span-3">
              {level.price}
            </dd>
            <dd className="max-w-[58ch] text-[16px] leading-[1.58] text-ink/70 lg:col-span-6">
              {level.adds}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-6">
        <h3 className="text-[clamp(1.4rem,2.2vw,1.875rem)] font-semibold leading-[1.14] tracking-[-0.035em] lg:col-span-4">
          Ce que contient chaque mois
        </h3>
        <ul className="lg:col-span-7 lg:col-start-6">
          {support.included.map((item) => (
            <li
              key={item}
              className="border-t border-line py-4 text-[16px] leading-[1.55] text-ink/80 last:border-b"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-10 max-w-[62ch] text-[16px] leading-[1.6] text-ink/70">
        {support.commitment}
      </p>
    </section>
  );
}

/* -------------------------------------------------------------- Formation */

function Training() {
  return (
    <section
      id="formation"
      className="mx-auto w-full max-w-[1440px] scroll-mt-8 px-6 pt-20 lg:px-12 lg:pt-[92px]"
    >
      <OfferHead title={training.title} text={training.text} price={training.price} />
      <p className="mt-8 max-w-[62ch] text-[16px] leading-[1.6] text-ink/70">{training.note}</p>
    </section>
  );
}

/* ------------------------------------------------------------------- Head */

function OfferHead({ title, text, price }: { title: string; text: string; price?: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <h2 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.04em] lg:col-span-4">
        {title}
      </h2>
      <div className="lg:col-span-6 lg:col-start-6 lg:self-end">
        <p className="max-w-[56ch] text-[17px] leading-[1.6] text-ink/70">{text}</p>
        {price ? <p className="mt-3 text-[15px] text-ink/45">{price}</p> : null}
      </div>
    </div>
  );
}
