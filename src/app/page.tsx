import Image from "next/image";
import Link from "next/link";
import { alternatives, audiences, brands, heroLines, heroTail, offers, steps } from "@/lib/home";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandBand />
      <Situation />
      <Offers />
      <Alternatives />
      <Booking />
    </>
  );
}

/* ------------------------------------------------------------------ Hero */

function Hero() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-14 lg:px-12 lg:pt-16">
      <h1 className="text-[clamp(2.9rem,11.6vw,10.5rem)] font-semibold leading-[0.84] tracking-[-0.062em]">
        {heroLines.map((line, i) => (
          <span
            key={line}
            className="rise block uppercase"
            style={{
              animationDelay: `${i * 70}ms`,
              color: i === heroLines.length - 1 ? "var(--color-azure)" : undefined,
            }}
          >
            {line}
          </span>
        ))}
      </h1>

      <p className="mt-10 max-w-[44ch] text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.45] text-ink/70 lg:mt-12">
        {heroTail}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------ Brand band */

function BrandBand() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pb-8 pt-16 lg:px-12 lg:pt-[72px]">
      <ul className="grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {brands.map((brand) =>
          brand.logo ? (
            <li key={brand.name} className="flex h-14 items-center">
              <Image
                src={brand.logo.src}
                alt={brand.name}
                width={brand.logo.width}
                height={brand.logo.height}
                style={{ maxHeight: `${44 * (brand.logo.scale ?? 1)}px` }}
                className="w-auto opacity-45 grayscale"
              />
            </li>
          ) : (
            <li key={brand.name} className="flex h-14 items-center text-[16px] font-medium text-ink/25">
              {brand.name}
            </li>
          ),
        )}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------- Situation */

function Situation() {
  return (
    <section className="bg-navy-deep py-20 text-white lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <h2 className="text-[clamp(1.8rem,2.9vw,2.5rem)] font-semibold leading-[1.06] tracking-[-0.038em] lg:col-span-4">
            Deux situations, la même absence d&apos;interlocuteur.
          </h2>

          {audiences.map((audience, i) => (
            <div
              key={audience.who}
              className={i === 0 ? "lg:col-span-3 lg:col-start-6" : "lg:col-span-3 lg:col-start-10"}
            >
              <p className="text-[14.5px] font-medium text-azure-light">{audience.who}</p>
              <p className="mt-4 text-[22px] font-medium leading-[1.3] tracking-[-0.025em]">
                {audience.headline}
              </p>
              <ul className="mt-5 flex flex-col gap-3 text-[15.5px] leading-[1.58] text-white/60">
                {audience.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ol className="mt-20 grid gap-10 lg:grid-cols-3 lg:gap-6">
          {steps.map((step, i) => (
            <li key={step.n}>
              <p
                className="text-[clamp(4.5rem,9vw,8.125rem)] font-semibold leading-[0.84] tracking-[-0.06em]"
                style={{ color: i === steps.length - 1 ? "var(--color-azure)" : "var(--color-navy-soft)" }}
              >
                {step.n}
              </p>
              <p className="mt-3.5 text-[30px] font-semibold tracking-[-0.032em]">{step.title}</p>
              <p className="mt-3 max-w-[34ch] text-[15.5px] leading-[1.62] text-white/60">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Offers */

function Offers() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-20 lg:px-12 lg:pt-[92px]">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.048em] lg:col-span-7">
          Quatre façons de travailler ensemble
        </h2>
        <p className="text-[16px] leading-[1.58] text-ink/70 lg:col-span-4 lg:col-start-9 lg:self-end">
          L&apos;audit qualifie, le sprint prouve, l&apos;accompagnement tient dans la durée. On ne
          les pose jamais toutes sur la table au premier rendez-vous.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:mt-[52px] lg:grid-cols-2">
        {offers.map((offer) => (
          <article
            key={offer.name}
            className={`p-8 lg:px-[34px] lg:py-9 ${
              offer.tone === "dark" ? "bg-navy-deep text-white" : "bg-mist"
            } ${offer.tone === "accent" ? "border-t-2 border-azure" : ""}`}
          >
            <h3 className="text-[clamp(1.5rem,2.1vw,1.875rem)] font-semibold tracking-[-0.032em]">
              {offer.name}
            </h3>
            <p
              className={`mt-4 text-[16px] leading-[1.58] ${
                offer.tone === "dark" ? "text-white/60" : "text-ink/70"
              }`}
            >
              {offer.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Alternatives */

function Alternatives() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-20 lg:px-12 lg:pt-[92px]">
      <h2 className="max-w-[16ch] text-[clamp(1.9rem,3.6vw,3.25rem)] font-semibold leading-[1] tracking-[-0.045em]">
        Ce que vous avez déjà essayé
      </h2>

      <dl className="mt-9">
        {alternatives.map((row, i) => (
          <div
            key={row.name}
            className={`grid gap-2 border-t border-line py-5 md:grid-cols-[0.8fr_1fr_1.3fr] md:gap-6 ${
              i === alternatives.length - 1 ? "border-b" : ""
            }`}
          >
            <dt
              className="text-[18px] font-medium"
              style={{ color: row.highlight ? "var(--color-azure)" : undefined }}
            >
              {row.name}
            </dt>
            <dd className="text-[15.5px] leading-[1.55] text-ink/45">{row.does}</dd>
            <dd
              className="text-[15.5px] leading-[1.55] text-ink/70"
              style={{ color: row.highlight ? "var(--color-azure)" : undefined }}
            >
              {row.flaw}
            </dd>
          </div>
        ))}
      </dl>
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
              Quarante-cinq minutes.
            </p>
            <p className="mt-6 max-w-[46ch] text-[19px] leading-[1.5] text-white/60">
              Vous décrivez votre organisation, je vous dis les trois pertes les plus probables. Si
              aucune mission ne se justifie, je vous le dirai aussi.
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
