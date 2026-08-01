import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { CTABand, Container, PageHero, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "À propos — qui sommes-nous",
  description:
    "NOVA Operations : un cabinet de performance opérationnelle qui combine organisation, digital et intelligence artificielle pour les PME françaises.",
};

const team = [
  {
    initials: "AL",
    name: "Direction des opérations",
    role: "Fractional COO",
    bio: "15 ans en direction industrielle et supply chain. Intervient sur les environnements de production multi-sites.",
  },
  {
    initials: "MB",
    name: "Pôle processus",
    role: "Lead Process & Data",
    bio: "Cartographie, mesure des temps, refonte des flux. Ancienne responsable amélioration continue en ETI.",
  },
  {
    initials: "TC",
    name: "Pôle digital",
    role: "Lead Automatisation & IA",
    bio: "Intégrations, automatisations et assistants métiers. Indépendant de tout éditeur, par principe.",
  },
  {
    initials: "SR",
    name: "Réseau d'experts",
    role: "Partenaires associés",
    bio: "Experts-comptables, avocats, ingénieurs et développeurs mobilisés au cas par cas sur les missions.",
  },
];

const values = [
  {
    t: "Pragmatisme",
    d: "Une recommandation qui ne peut pas être mise en œuvre le mois prochain n'a aucune valeur.",
  },
  {
    t: "Transparence",
    d: "Nos chiffrages sont ouverts. Vous voyez comment le ROI est calculé, hypothèse par hypothèse.",
  },
  {
    t: "Indépendance",
    d: "Aucune commission éditeur, aucune revente. Nous n'avons rien à gagner à vous vendre un outil.",
  },
  {
    t: "Durée",
    d: "Nous restons jusqu'à ce que le gain soit constaté dans les chiffres, pas dans une présentation.",
  },
];

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title={<>Des opérationnels, pas des consultants de passage.</>}
        intro="NOVA Operations est née d'un constat simple : les PME n'ont pas besoin d'un rapport de plus. Elles ont besoin de quelqu'un qui reste, qui exécute et qui rend des comptes sur les résultats."
        meta={[
          { label: "Création", value: "2023" },
          { label: "Missions menées", value: "40+" },
          { label: "Basés à", value: "Paris · France entière" },
        ]}
      />

      {/* Story */}
      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <SectionHead eyebrow="Notre histoire" title="Pourquoi nous avons créé NOVA." />
            <div className="max-w-2xl">
              {[
                "Nous avons passé quinze ans à l'intérieur des entreprises, pas en face d'elles : direction industrielle, supply chain, amélioration continue, systèmes d'information. Assez longtemps pour voir défiler les cabinets, les rapports et les projets abandonnés au bout de trois mois.",
                "Le schéma se répétait. Un diagnostic juste, une recommandation raisonnable, puis plus personne pour la porter. Les équipes retournaient à leurs urgences et le rapport rejoignait l'étagère.",
                "NOVA a été conçue à l'inverse : un audit court et chiffré, puis une présence dans la durée. Nous prenons le pilotage, nous coordonnons les prestataires, nous suivons les indicateurs en comité de direction — jusqu'à ce que le gain soit visible dans les chiffres de l'entreprise.",
                "C'est ce qu'on appelle le Fractional COO : l'expertise d'un directeur des opérations expérimenté, à temps partagé, sans la structure de coûts d'un recrutement à 120 000 € chargés.",
              ].map((p, i) => (
                <Reveal key={p} delay={i * 60}>
                  <p className="mt-6 text-[16.5px] leading-[1.75] text-ink/70 first:mt-0">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Vision */}
      <section className="relative overflow-hidden bg-navy-deep py-24 text-white lg:py-32">
        <div className="grid-lines-dark pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute left-1/4 top-0 h-[460px] w-[460px] rounded-full blur-[140px] animate-sheen"
          style={{ background: "radial-gradient(circle, rgba(47,92,255,0.3), transparent 70%)" }}
        />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Notre vision</p>
            <p
              className="mt-8 text-[clamp(1.7rem,3.8vw,2.8rem)] font-semibold leading-[1.2] tracking-[-0.035em]"
              style={{ textWrap: "balance" }}
            >
              Devenir le partenaire de référence des dirigeants de PME pour la performance
              opérationnelle, en combinant organisation, digital et intelligence artificielle
              dans une approche pragmatique, orientée résultats.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32">
        <Container>
          <SectionHead
            eyebrow="L'équipe"
            title="Une équipe restreinte, un réseau étendu."
            intro="Le noyau reste volontairement petit pour garantir que le dirigeant parle toujours à la même personne. Les expertises pointues sont mobilisées au besoin via notre réseau."
          />

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 70} className="bg-white p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mist text-[15px] font-medium text-ink/60">
                  {member.initials}
                </span>
                <h3 className="mt-6 text-[17.5px] font-semibold tracking-[-0.02em]">
                  {member.name}
                </h3>
                <p className="mt-1.5 text-[13.5px] text-azure">{member.role}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-ink/55">{member.bio}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="border-y border-line bg-mist py-24 lg:py-32">
        <Container>
          <SectionHead align="center" eyebrow="Nos valeurs" title="Quatre mots, testés en mission." />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 70} className="rounded-3xl border border-line bg-white p-8">
                <span className="font-mono text-[12px] text-ink/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.02em]">{v.t}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink/55">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
