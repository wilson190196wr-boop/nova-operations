import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Button, CTABand, Container, PageHero, SectionHead } from "@/components/ui";
import { offers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Offres — Audit, Sprint, Partner, Studio",
  description:
    "NOVA Audit™, NOVA Sprint™, NOVA Partner™ et NOVA Studio™ : diagnostic des opérations, déploiement des améliorations, Fractional COO et pilotage des partenaires techniques.",
};

export default function OffresPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos offres"
        title={<>Comprendre. Exécuter. Piloter.</>}
        intro="Quatre modules qui s'enchaînent ou s'activent séparément. La plupart de nos clients commencent par un audit et poursuivent en sprint, puis en accompagnement mensuel."
        meta={[
          { label: "Premier livrable", value: "3 semaines" },
          { label: "Engagement minimum", value: "Aucun" },
          { label: "Missions menées", value: "40+" },
        ]}
      />

      <section className="py-24 lg:py-32">
        <Container>
          <div className="flex flex-col gap-24 lg:gap-32">
            {offers.map((offer, i) => (
              <Reveal key={offer.slug} id={offer.slug} as="article" className="scroll-mt-28">
                <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    <span className="font-mono text-[13px] text-ink/30">{offer.step}</span>
                    <h2 className="mt-4 text-[clamp(2rem,4vw,2.9rem)] font-semibold tracking-[-0.035em]">
                      {offer.name}
                    </h2>
                    <p className="mt-3 text-[17px] text-azure">{offer.tagline}</p>
                    <p className="mt-6 max-w-md text-[16px] leading-[1.68] text-ink/60">
                      {offer.description}
                    </p>

                    <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-5">
                      <div>
                        <dt className="text-[11.5px] uppercase tracking-[0.14em] text-ink/40">
                          Durée
                        </dt>
                        <dd className="mt-1.5 text-[15px] font-medium">{offer.duration}</dd>
                      </div>
                      <div>
                        <dt className="text-[11.5px] uppercase tracking-[0.14em] text-ink/40">
                          Investissement
                        </dt>
                        <dd className="mt-1.5 text-[15px] font-medium">{offer.price}</dd>
                      </div>
                    </dl>

                    <div className="mt-9">
                      <Button href="/contact" variant={i === 0 ? "primary" : "ghost"}>
                        Discuter de {offer.name}
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-line bg-mist p-8 lg:p-10">
                    <p className="text-[11.5px] uppercase tracking-[0.16em] text-ink/40">
                      Ce que vous obtenez
                    </p>
                    <ul className="mt-7 grid gap-px overflow-hidden rounded-2xl bg-line">
                      {offer.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-4 bg-white px-6 py-5">
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
                          <span className="text-[15px] leading-snug text-ink/75">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison */}
      <section className="border-y border-line bg-mist py-24 lg:py-32">
        <Container>
          <SectionHead
            eyebrow="Comparatif"
            title="Quelle offre pour quelle situation ?"
            intro="En cas de doute, l'audit reste le point d'entrée le plus rentable : il coûte le moins cher et évite d'investir au mauvais endroit."
          />

          <div className="mt-14 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-5 pr-6 text-[12px] font-medium uppercase tracking-[0.14em] text-ink/40">
                    Votre situation
                  </th>
                  <th className="py-5 pr-6 text-[12px] font-medium uppercase tracking-[0.14em] text-ink/40">
                    Offre recommandée
                  </th>
                  <th className="py-5 text-[12px] font-medium uppercase tracking-[0.14em] text-ink/40">
                    Premier résultat
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["« Je sens qu'on perd du temps mais je ne sais pas où »", "NOVA Audit™", "Roadmap chiffrée en 4 semaines"],
                  ["« Je sais quoi faire, personne n'a le temps de le faire »", "NOVA Sprint™", "Chantier livré en 6 à 10 semaines"],
                  ["« J'ai besoin d'un DirOp mais pas à plein temps »", "NOVA Partner™", "Comité de pilotage dès le 1er mois"],
                  ["« Il faut développer, je ne veux pas gérer 4 prestataires »", "NOVA Studio™", "Cadrage et planning sous 3 semaines"],
                ].map((row, i) => (
                  <Reveal key={row[0]} as="tr" delay={i * 60} className="border-b border-line">
                    <td className="py-6 pr-6 text-[15.5px] text-ink/65">{row[0]}</td>
                    <td className="py-6 pr-6 text-[15.5px] font-medium">{row[1]}</td>
                    <td className="py-6 text-[15.5px] text-azure">{row[2]}</td>
                  </Reveal>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <CTABand
        title="On commence toujours par écouter."
        intro="Décrivez-nous votre situation en 45 minutes. Nous vous dirons franchement si une mission est justifiée — et laquelle."
      />
    </>
  );
}
