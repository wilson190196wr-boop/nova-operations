import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Button, Card, Closing, Container, Eyebrow, Facts, PageHead, SectionHead } from "@/components/ui";
import { comparison, hero, offers, speeds, type Offer } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Offres",
  description:
    "Audit, sprints, accompagnement et formation. Quatre offres qui s'enchaînent ou s'activent séparément, avec un seul interlocuteur du début à la fin.",
};

export default function OffresPage() {
  return (
    <>
      <PageHead title={hero.title} lead={hero.intro}>
        <Facts items={hero.meta.map((m) => ({ label: m.label, value: m.value }))} />
      </PageHead>
      <Container>
        {offers.map((offer, i) => (
          <OfferBlock key={offer.slug} offer={offer} rang={i} />
        ))}
        <Speeds />
        <Comparison />
        <Closing title="Par où commencer ?" />
      </Container>
    </>
  );
}

/* ------------------------------------------------------------ Offer block */

/**
 * Un palier d'offre.
 *
 * Sur téléphone les quatre blocs se suivent en bandes pleine largeur qui
 * alternent blanc cassé et sable : sans marge entre eux, c'est le changement
 * de fond qui marque la séparation, et la page se lit comme une succession de
 * registres plutôt que comme quatre cartes identiques. Au-delà, chaque bloc
 * redevient un panneau arrondi détaché du fond.
 */
function OfferBlock({ offer, rang }: { offer: Offer; rang: number }) {
  const pair = rang % 2 === 1;
  return (
    <section
      aria-labelledby={offer.slug}
      className={`bleed border-t border-line-soft px-gutter py-9 first:mt-section sm:mt-section sm:rounded-panel sm:border-0 sm:bg-paper sm:p-[clamp(1.75rem,3.2vw,3rem)] ${
        pair ? "bg-sand-2" : "bg-paper"
      }`}
    >
      <Reveal>
        <p className="font-mono text-mono tracking-[0.12em] text-azure">[ {offer.step} ]</p>
        <h2
          id={offer.slug}
          className="mt-2.5 text-h2-sm font-semibold leading-[1.05] tracking-[-0.045em] sm:mt-3.5"
        >
          {offer.name}
        </h2>
        <p className="mt-3.5 text-lead font-medium leading-[1.4] sm:mt-4 sm:max-w-[34ch]">{offer.tagline}</p>
      </Reveal>

      <div className="mt-6 grid gap-6 sm:mt-7 sm:gap-[clamp(1.75rem,3.5vw,3rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
        <Reveal>
          <p className="text-fine leading-[1.6] text-ink-70 sm:max-w-[62ch] sm:text-body">{offer.description}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 sm:mt-7 sm:flex sm:flex-wrap sm:gap-7">
            <div>
              <dt>
                <Eyebrow uppercase>Durée</Eyebrow>
              </dt>
              <dd className="mt-1.5 text-[1.0625rem] font-medium">{offer.duration}</dd>
            </div>
            <div>
              <dt>
                <Eyebrow uppercase>Investissement</Eyebrow>
              </dt>
              <dd className="mt-1.5 text-[1.0625rem] font-medium">{offer.price}</dd>
            </div>
          </dl>
          <Button href="/contact" className="mt-6 w-full sm:mt-7 sm:w-auto">
            {offer.cta}
          </Button>
        </Reveal>

        <Reveal delay={90}>
          {offer.variants ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {offer.variants.map((variant) => (
                <div key={variant.name} className={`rounded-tier px-[1.0625rem] py-[0.9375rem] sm:px-5 sm:py-[1.125rem] ${pair ? "bg-paper sm:bg-sand" : "bg-sand"}`}>
                  <h3 className="text-[1.0625rem] font-semibold tracking-[-0.02em]">
                    {variant.name}
                  </h3>
                  <p className="mt-1 text-[1.0625rem] font-semibold tracking-[-0.02em] text-azure">
                    {variant.price}
                  </p>
                  <p className="mt-2 text-finer leading-[1.5] text-ink-70">{variant.detail}</p>
                </div>
              ))}
            </div>
          ) : null}

          <div className={`border-t border-line pt-5 sm:border-0 sm:pt-0 ${offer.variants ? "mt-6" : ""}`}>
            <Eyebrow uppercase className="block">
              Ce que vous obtenez
            </Eyebrow>
            <ul className="mt-4 grid gap-[0.6875rem]">
              {offer.deliverables.map((item) => (
                <li
                  key={item}
                  className="relative pl-[1.375rem] text-fine leading-[1.55] text-ink-70 before:absolute before:left-0 before:top-[0.55em] before:h-[7px] before:w-[7px] before:rounded-full before:bg-azure before:content-['']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Speeds */

function Speeds() {
  return (
    <section aria-labelledby="vitesses-title" className="mt-section">
      <SectionHead id="vitesses-title" title={speeds.title} intro={speeds.text} />
      <div className="mt-9 grid gap-4 lg:grid-cols-2">
        {speeds.modes.map((mode, i) => (
          <Reveal key={mode.name} as="article" delay={i * 90}>
            <Card className="h-full">
              <h3 className="text-h3 font-semibold leading-[1.14] tracking-[-0.035em]">
                {mode.name}
              </h3>
              <p className="mt-3.5 text-body leading-[1.58] text-ink-70">{mode.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 max-w-[70ch] text-fine leading-[1.6] text-ink-55">{speeds.note}</p>
    </section>
  );
}

/* ------------------------------------------------------------- Comparison */

function Comparison() {
  return (
    <section aria-labelledby="quelle-title" className="mt-section">
      <SectionHead id="quelle-title" title={comparison.title} intro={comparison.intro} />

      {/* Trois colonnes ne tiennent pas sur un écran de téléphone : le tableau
          demandait 620 px et défilait horizontalement. Sous `lg`, les mêmes
          lignes sont donc empilées en blocs étiquetés — une seule source de
          données, deux présentations, et plus aucun défilement latéral. */}
      <Reveal className="mt-9 grid gap-3 lg:hidden">
        {comparison.rows.map((row) => (
          <div key={row.situation} className="rounded-card bg-paper p-5">
            <p className="text-fine leading-[1.5]">{row.situation}</p>
            <dl className="mt-4 grid gap-3 border-t border-line-soft pt-4">
              <div>
                <dt>
                  <Eyebrow uppercase>Offre recommandée</Eyebrow>
                </dt>
                <dd className="mt-1 text-fine font-semibold">{row.offer}</dd>
              </div>
              <div>
                <dt>
                  <Eyebrow uppercase>Premier résultat</Eyebrow>
                </dt>
                <dd className="mt-1 text-fine leading-[1.5] text-ink-70">{row.result}</dd>
              </div>
            </dl>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-9 hidden rounded-card bg-paper lg:block">
        <table className="w-full border-collapse text-fine">
          <thead>
            <tr>
              {["Votre situation", "Offre recommandée", "Premier résultat"].map((head) => (
                <th
                  key={head}
                  scope="col"
                  className="whitespace-nowrap border-b border-line-soft px-5 py-[1.125rem] text-left font-mono text-mono font-normal uppercase tracking-[0.08em] text-ink-55"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row, i) => (
              <tr key={row.situation}>
                <th
                  scope="row"
                  className={`px-5 py-[1.125rem] text-left align-top font-normal leading-[1.5] ${
                    i === comparison.rows.length - 1 ? "" : "border-b border-line-soft"
                  }`}
                >
                  {row.situation}
                </th>
                <td
                  className={`whitespace-nowrap px-5 py-[1.125rem] align-top font-semibold leading-[1.5] ${
                    i === comparison.rows.length - 1 ? "" : "border-b border-line-soft"
                  }`}
                >
                  {row.offer}
                </td>
                <td
                  className={`px-5 py-[1.125rem] align-top leading-[1.5] ${
                    i === comparison.rows.length - 1 ? "" : "border-b border-line-soft"
                  }`}
                >
                  {row.result}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </section>
  );
}
