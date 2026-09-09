import type { Metadata } from "next";
import Link from "next/link";
import { BookingCta } from "@/components/booking-cta";
import { comparison, hero, offers, type Offer } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Offres",
  description:
    "Audit à 2 500 ou 7 500 € HT, sprints d'automatisation, accompagnement mensuel à partir de 1 600 € et formation des équipes. Les quatre façons de travailler avec NOVA.",
};

export default function OffresPage() {
  return (
    <>
      <Hero />
      <Offers />
      <Comparison />
      <BookingCta title="Par où commencer ?" />
    </>
  );
}

/* ------------------------------------------------------------------ Hero */

function Hero() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-14 lg:px-12 lg:pt-16">
      <h1 className="max-w-[16ch] text-[clamp(2.4rem,5.6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
        {hero.title}
      </h1>
      <p className="mt-8 max-w-[56ch] text-[18px] leading-[1.6] text-ink/70">{hero.intro}</p>

      {/* Bandeau de chiffres repris de la première version de la page. */}
      <dl className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
        {hero.meta.map((item) => (
          <div key={item.label} className="bg-white px-7 py-6">
            <dt className="text-[13.5px] text-ink/45">{item.label}</dt>
            <dd className="mt-2 text-[21px] font-semibold tracking-[-0.03em]">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ---------------------------------------------------------------- Offres */

function Offers() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-20 lg:px-12 lg:pt-[92px]">
      <div className="flex flex-col gap-20 lg:gap-28">
        {offers.map((offer) => (
          <OfferBlock key={offer.slug} offer={offer} />
        ))}
      </div>
    </section>
  );
}

/**
 * Anatomie reprise de la première version : colonne descriptive collante à
 * gauche, carte des livrables à droite. La colonne suit le défilement pendant
 * qu'on parcourt la liste, ce qui garde le prix et le bouton sous les yeux.
 */
function OfferBlock({ offer }: { offer: Offer }) {
  return (
    <article id={offer.slug} className="scroll-mt-8">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-10 lg:self-start">
          <span className="font-mono text-[13px] text-ink/30">{offer.step}</span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,2.9rem)] font-semibold tracking-[-0.04em]">
            {offer.name}
          </h2>
          <p className="mt-3 text-[17px] text-azure">{offer.tagline}</p>
          <p className="mt-6 max-w-md text-[16px] leading-[1.68] text-ink/65">
            {offer.description}
          </p>

          <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-5">
            <div>
              <dt className="text-[13.5px] text-ink/45">Durée</dt>
              <dd className="mt-1.5 text-[15.5px] font-medium">{offer.duration}</dd>
            </div>
            <div>
              <dt className="text-[13.5px] text-ink/45">Investissement</dt>
              <dd className="mt-1.5 text-[15.5px] font-medium">{offer.price}</dd>
            </div>
          </dl>

          <Link
            href="/contact"
            className="mt-9 inline-block rounded-lg bg-ink px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-navy-deep"
          >
            Parler de {offer.name.toLowerCase()}
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          {offer.variants ? (
            <dl className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
              {offer.variants.map((variant) => (
                <div key={variant.name} className="bg-white px-6 py-5">
                  <dt className="text-[16px] font-semibold tracking-[-0.02em]">{variant.name}</dt>
                  <dd className="mt-1 text-[16px] font-semibold tracking-[-0.02em] text-azure">
                    {variant.price}
                  </dd>
                  <dd className="mt-1.5 text-[14px] leading-snug text-ink/55">{variant.detail}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="bg-mist p-8 lg:p-10">
            <p className="text-[13.5px] text-ink/45">Ce que vous obtenez</p>
            <ul className="mt-6 grid gap-px overflow-hidden bg-line">
              {offer.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-4 bg-white px-6 py-5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  >
                    <circle cx="8" cy="8" r="7.25" stroke="#2f5cff" strokeWidth="1.15" />
                    <path
                      d="M5 8.2l2.1 2.1L11 6.4"
                      stroke="#2f5cff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[15.5px] leading-snug text-ink/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------ Comparatif */

function Comparison() {
  return (
    <section className="mt-20 border-y border-line bg-mist py-20 lg:mt-[92px] lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.04em] lg:col-span-5">
            {comparison.title}
          </h2>
          <p className="max-w-[52ch] text-[17px] leading-[1.6] text-ink/70 lg:col-span-5 lg:col-start-7 lg:self-end">
            {comparison.intro}
          </p>
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-ink">
                <th className="py-4 pr-6 text-[13.5px] font-normal text-ink/45">Votre situation</th>
                <th className="py-4 pr-6 text-[13.5px] font-normal text-ink/45">
                  Offre recommandée
                </th>
                <th className="py-4 text-[13.5px] font-normal text-ink/45">Premier résultat</th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.situation} className="border-b border-line last:border-b-0">
                  <td className="py-6 pr-6 text-[16px] leading-[1.5] text-ink/70">
                    {row.situation}
                  </td>
                  <td className="py-6 pr-6 text-[17px] font-medium">{row.offer}</td>
                  <td className="py-6 text-[16px] leading-[1.5] text-azure">{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
