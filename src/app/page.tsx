import Image from "next/image";
import { BookingCta } from "@/components/booking-cta";
import { alternatives, audiences, brands, heroLines, heroTail, offers, steps } from "@/lib/home";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandBand />
      <Situation />
      <Offers />
      <Alternatives />
      <BookingCta title="Quarante-cinq minutes." />
    </>
  );
}

/* ------------------------------------------------------------------ Hero */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Trame reprise du premier site : carrée, légère, dissoute vers le bas.
          Elle donne de la matière au fond sans croiser le texte sur toute la
          page — c'est ce qui ratait avec des filets pleine hauteur. */}
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60 mask-fade-b" />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pt-14 lg:px-12 lg:pt-16">
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
      </div>
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
        <h2 className="max-w-[20ch] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
          Deux situations, la même absence d&apos;interlocuteur.
        </h2>

        {/* Alignés et cadrés par un filet : ce sont les puces qui faisaient
            diapositive, pas la symétrie. Un décalage vertical sans repère
            visuel se lit comme un défaut d'affichage. */}
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-6">
          {audiences.map((audience, i) => (
            <div
              key={audience.who}
              className={`border-t border-white/20 pt-7 ${
                i === 0 ? "lg:col-span-5 lg:col-start-1" : "lg:col-span-5 lg:col-start-8"
              }`}
            >
              <p className="text-[15px] text-azure-light">{audience.who}</p>
              <p className="mt-4 text-[clamp(1.5rem,2.4vw,2.125rem)] font-semibold leading-[1.14] tracking-[-0.035em]">
                {audience.headline}
              </p>
              <p className="mt-5 max-w-[46ch] text-[16.5px] leading-[1.62] text-white/55">
                {audience.text}
              </p>
            </div>
          ))}
        </div>

        <ol className="mt-24 grid gap-10 lg:mt-28 lg:grid-cols-3 lg:gap-6">
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
            style={{ background: offer.surface.bg, color: offer.surface.fg }}
            className="p-8 lg:px-[34px] lg:py-9"
          >
            <h3 className="text-[clamp(1.5rem,2.1vw,1.875rem)] font-semibold tracking-[-0.032em]">
              {offer.name}
            </h3>
            <p
              className="mt-4 text-[16px] leading-[1.58]"
              style={{ color: offer.surface.muted }}
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

      <dl className="mt-12">
        {alternatives.map((row, i) => (
          <div
            key={row.name}
            className={`grid gap-4 border-t border-line py-9 lg:grid-cols-12 lg:gap-6 ${
              i === alternatives.length - 1 ? "border-b" : ""
            }`}
          >
            <dt
              className="text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-[1.2] tracking-[-0.03em] lg:col-span-4"
              style={{ color: row.highlight ? "var(--color-azure)" : undefined }}
            >
              {row.name}
            </dt>
            <dd
              className={`max-w-[58ch] text-[17px] leading-[1.6] lg:col-span-7 lg:col-start-6 ${
                row.highlight ? "text-ink" : "text-ink/65"
              }`}
            >
              {row.text}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
