import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { CTABand, Container, PageHero, SectionHead } from "@/components/ui";
import { cases } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cas clients — résultats mesurés",
  description:
    "Missions NOVA Operations en industrie, BTP, ingénierie et logistique : heures récupérées, marge gagnée, délais réduits. Résultats mesurés avant et après.",
};

export default function CasClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Cas clients"
        title={<>Des résultats mesurés, pas des témoignages de complaisance.</>}
        intro="Chaque mission est chiffrée avant, pendant et après. Les entreprises citées sont anonymisées à leur demande — les chiffres, eux, ne le sont pas."
        meta={[
          { label: "Gains identifiés", value: "18 M€" },
          { label: "Heures récupérées", value: "94 000 / an" },
          { label: "Missions reconduites", value: "82 %" },
        ]}
      />

      <section className="py-24 lg:py-32">
        <Container>
          <div className="flex flex-col gap-6">
            {cases.map((item, i) => (
              <Reveal key={item.slug} delay={i * 70}>
                <article className="group grid gap-10 rounded-3xl border border-line p-9 transition-all duration-500 hover:border-ink/20 hover:bg-mist lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:p-12">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[12px] uppercase tracking-[0.14em] text-ink/40">
                        {item.sector}
                      </span>
                      {item.program.map((p) => (
                        <span
                          key={p}
                          className="rounded-full border border-line bg-white px-3 py-1 text-[11.5px] text-ink/55"
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    <h2 className="mt-6 max-w-2xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-[1.18] tracking-[-0.03em]">
                      {item.title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-[16px] leading-[1.68] text-ink/60">
                      {item.context}
                    </p>
                  </div>

                  <dl className="grid grid-cols-3 gap-px self-start overflow-hidden rounded-2xl border border-line bg-line">
                    {item.metrics.map((m) => (
                      <div key={m.label} className="bg-white px-4 py-7 text-center">
                        <dt className="text-[clamp(1.25rem,2vw,1.6rem)] font-semibold tracking-[-0.03em] text-azure">
                          {m.value}
                        </dt>
                        <dd className="mt-2 text-[12px] leading-tight text-ink/45">{m.label}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-mist py-24 lg:py-32">
        <Container>
          <SectionHead
            eyebrow="Paroles de dirigeants"
            title="Ce qu'ils en disent, une fois la mission terminée."
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {[
              {
                q: "On avait déjà payé deux cabinets. La différence, c'est qu'ici quelqu'un est resté jusqu'à ce que ça tourne.",
                a: "Directeur général",
                c: "Groupe BTP, 210 salariés",
              },
              {
                q: "Le rapport d'audit tenait en 22 pages et chaque ligne avait un chiffre en face. On a décidé en une réunion.",
                a: "Directrice administrative et financière",
                c: "Fabrication, 140 salariés",
              },
              {
                q: "Je ne voulais pas d'IA. On a commencé par supprimer trois formulaires papier. L'IA est venue six mois après.",
                a: "Président",
                c: "Cabinet d'ingénierie, 55 salariés",
              },
            ].map((t, i) => (
              <Reveal
                key={t.c}
                delay={i * 80}
                className="flex flex-col rounded-3xl border border-line bg-white p-9"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9.5 6C6.5 7.5 5 10 5 13v5h6v-6H8c0-2 .8-3.4 2.5-4.3L9.5 6Zm9 0C15.5 7.5 14 10 14 13v5h6v-6h-3c0-2 .8-3.4 2.5-4.3L18.5 6Z"
                    fill="#2f5cff"
                    fillOpacity="0.25"
                  />
                </svg>
                <p className="mt-6 flex-1 text-[16.5px] leading-[1.6] tracking-[-0.01em]">
                  « {t.q} »
                </p>
                <div className="mt-8 border-t border-line pt-5">
                  <p className="text-[14px] font-medium">{t.a}</p>
                  <p className="mt-1 text-[13px] text-ink/45">{t.c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        title="Le prochain cas client, c'est peut-être vous."
        intro="Un échange de 45 minutes suffit pour savoir s'il y a matière. Nous vous le dirons honnêtement, même si la réponse est non."
      />
    </>
  );
}
