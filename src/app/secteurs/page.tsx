import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { CTABand, Container, PageHero, SectionHead } from "@/components/ui";
import { sectors } from "@/lib/content";

export const metadata: Metadata = {
  title: "Secteurs — Industrie, BTP, Fabrication, Services, Logistique",
  description:
    "NOVA Operations accompagne les PME de 20 à 250 salariés dans l'industrie, le BTP, la fabrication, les cabinets de services et la logistique.",
};

export default function SecteursPage() {
  return (
    <>
      <PageHero
        eyebrow="Secteurs"
        title={<>Des PME où la marge se joue dans l&apos;exécution.</>}
        intro="Nous intervenons là où les opérations sont physiques, contraintes et multi-acteurs — les environnements où une heure gagnée par personne et par jour change réellement le compte de résultat."
        meta={[
          { label: "Taille des clients", value: "20 à 250 salariés" },
          { label: "Secteurs couverts", value: "5" },
          { label: "Zone d'intervention", value: "France entière" },
        ]}
      />

      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
            {sectors.map((sector, i) => (
              <Reveal
                key={sector.name}
                delay={i * 70}
                className={`group bg-white p-9 lg:p-11 ${
                  i === sectors.length - 1 && sectors.length % 2 === 1 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <h2 className="text-[26px] font-semibold tracking-[-0.03em]">{sector.name}</h2>
                  <div className="text-right">
                    <p className="text-[26px] font-semibold tracking-[-0.03em] text-azure">
                      {sector.stat}
                    </p>
                    <p className="mt-1 text-[12.5px] text-ink/45">{sector.statLabel}</p>
                  </div>
                </div>

                <ul className="mt-8 flex flex-col gap-3">
                  {sector.points.map((point) => (
                    <li key={point} className="flex items-start gap-3.5 text-[15px] text-ink/65">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-azure" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
        <div className="grid-lines-dark pointer-events-none absolute inset-0" />
        <Container className="relative">
          <SectionHead
            tone="light"
            align="center"
            eyebrow="Points communs"
            title="Trois signaux qui reviennent dans tous les secteurs."
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-3">
            {[
              {
                t: "Le tableur de secours",
                d: "Un fichier Excel maintenu par une seule personne, sur lequel repose une décision critique. Personne d'autre ne sait le faire tourner.",
              },
              {
                t: "La double saisie invisible",
                d: "La même information ressaisie dans deux à quatre outils, parce que personne n'a jamais eu le temps de les connecter.",
              },
              {
                t: "Le reporting du 15",
                d: "Des chiffres consolidés à la main, disponibles deux semaines après la fin du mois — donc trop tard pour corriger quoi que ce soit.",
              },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 80} className="bg-ink p-9">
                <span className="font-mono text-[12px] text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.02em]">{item.t}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/50">{item.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        title="Votre secteur n'est pas dans la liste ?"
        intro="La méthode ne dépend pas du métier. Si vos opérations sont répétitives, multi-acteurs et sous contrainte de délai, elle s'applique."
      />
    </>
  );
}
