import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Button, CTABand, Container, SectionHead } from "@/components/ui";
import { MaturityBars, MaturityRadar } from "@/components/maturity-radar";
import { PageHero } from "@/components/ui";
import { faq, pillars, steps } from "@/lib/content";

export const metadata: Metadata = {
  title: "KELERIA OS™ — la méthode",
  description:
    "KELERIA OS™ : six piliers, un score de maturité, une feuille de route priorisée et un ROI estimé. La méthode d'audit et de pilotage opérationnel de KELERIA.",
};

export default function MethodePage() {
  return (
    <>
      <PageHero
        eyebrow="Méthode"
        title={<>KELERIA OS™ — le système d&apos;exploitation de vos opérations.</>}
        intro="Une méthode unique, appliquée de la même façon à chaque mission : on mesure, on priorise, on exécute, on pilote. Aucune place pour l'intuition non vérifiée."
        meta={[
          { label: "Durée du diagnostic", value: "3 à 4 semaines" },
          { label: "Piliers évalués", value: "6" },
          { label: "Premier Quick Win", value: "≈ 11 jours" },
        ]}
      />

      {/* Pillars */}
      <section className="py-24 lg:py-32">
        <Container>
          <SectionHead
            eyebrow="Les six piliers"
            title="Ce que nous évaluons, systématiquement."
            intro="Une entreprise ne dysfonctionne jamais sur un seul axe. Le score croise six dimensions pour éviter de traiter un symptôme à la place de la cause."
          />

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.id} delay={i * 70} className="group bg-white p-9">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[12px] text-ink/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full bg-mist px-3 py-1 font-mono text-[12px] text-ink/50">
                    {pillar.score}/100
                  </span>
                </div>
                <h3 className="mt-6 text-[20px] font-semibold tracking-[-0.02em]">{pillar.name}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink/55">
                  {pillar.description}
                </p>
                <div className="mt-7 h-1 w-full overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pillar.score}%`,
                      background:
                        pillar.score < 35
                          ? "linear-gradient(90deg,#ff6a3d,#ff9d6e)"
                          : "linear-gradient(90deg,#2f5cff,#7fa0ff)",
                    }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Score */}
      <section className="relative overflow-hidden bg-navy-deep py-24 text-white lg:py-32">
        <div className="grid-lines-dark pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute -right-24 top-0 h-[520px] w-[520px] rounded-full blur-[140px] animate-sheen"
          style={{ background: "radial-gradient(circle, rgba(47,92,255,0.3), transparent 70%)" }}
        />
        <Container className="relative">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <SectionHead
                tone="light"
                eyebrow="Le score"
                title="Une note, pas une opinion."
                intro="Chaque pilier est noté sur 100 à partir d'entretiens terrain, de relevés de temps et de données d'activité. Le score se recalcule à chaque revue trimestrielle : c'est lui qui arbitre les priorités."
              />
              <Reveal delay={120} className="mt-12">
                <MaturityBars tone="dark" />
              </Reveal>
              <Reveal delay={200} className="mt-10">
                <Button href="/contact" variant="light">
                  Obtenir mon score de maturité
                </Button>
              </Reveal>
            </div>

            <Reveal delay={140} className="flex justify-center">
              <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-9 backdrop-blur">
                <div className="flex items-baseline justify-between">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">
                    Score global
                  </p>
                  <p className="font-mono text-[15px] text-white/60">46 / 100</p>
                </div>
                <div className="mt-6 flex justify-center">
                  <MaturityRadar tone="dark" />
                </div>
                <p className="mt-6 border-t border-white/10 pt-5 text-[13.5px] leading-relaxed text-white/50">
                  Le déséquilibre entre pilotage (71) et automatisation (18) est le profil le plus
                  fréquent : une entreprise qui sait ce qui ne va pas, mais qui n&apos;a pas les
                  moyens d&apos;agir vite.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Steps */}
      <section className="py-24 lg:py-32">
        <Container>
          <SectionHead
            eyebrow="Déroulé"
            title="Cinq étapes, du premier entretien au pilotage continu."
          />

          <div className="mt-16">
            {steps.map((step, i) => (
              <Reveal
                key={step.n}
                delay={i * 70}
                className="group grid gap-6 border-t border-line py-10 last:border-b md:grid-cols-[auto_1fr_1.2fr] md:items-start md:gap-12"
              >
                <span className="font-mono text-[13px] text-ink/30 md:w-12">{step.n}</span>
                <div>
                  <h3 className="text-[24px] font-semibold tracking-[-0.03em] transition-colors group-hover:text-azure">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13px] uppercase tracking-[0.14em] text-ink/35">
                    {step.duration}
                  </p>
                </div>
                <p className="max-w-xl text-[16px] leading-[1.65] text-ink/60">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="border-y border-line bg-mist py-24 lg:py-32">
        <Container>
          <SectionHead
            align="center"
            eyebrow="Nos principes"
            title="Quatre règles qu'on ne négocie pas."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {[
              {
                t: "Le terrain avant le slide",
                d: "Aucune recommandation n'est écrite sans avoir observé le poste de travail concerné. Les process décrits en réunion ne sont jamais ceux qui tournent.",
              },
              {
                t: "Supprimer avant d'automatiser",
                d: "Automatiser une tâche inutile la rend simplement plus rapide à être inutile. On élimine d'abord, on outille ensuite.",
              },
              {
                t: "Indépendance totale",
                d: "Aucune commission éditeur, aucune revente de licence. Nous recommandons l'outil qui convient, y compris celui que vous avez déjà.",
              },
              {
                t: "La mesure ou rien",
                d: "Chaque chantier porte un indicateur avant/après. Si le gain n'est pas mesurable, il ne rentre pas dans la roadmap.",
              },
            ].map((p, i) => (
              <Reveal key={p.t} delay={i * 80} className="rounded-3xl border border-line bg-white p-9">
                <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{p.t}</h3>
                <p className="mt-4 text-[15px] leading-[1.65] text-ink/55">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHead eyebrow="Questions fréquentes" title="Ce qu'on nous demande le plus." />
            <div>
              {faq.map((item, i) => (
                <Reveal key={item.q} delay={i * 60} className="border-t border-line py-7 last:border-b">
                  <h3 className="text-[17px] font-medium tracking-[-0.01em]">{item.q}</h3>
                  <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-ink/55">{item.a}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
