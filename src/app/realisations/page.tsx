import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Closing, Container, PageHead } from "@/components/ui";
import { ai, aiCases, aiProjects, appDev, appProjects, intro, type Work } from "@/lib/work";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Six ans de projets livrés en production : CRM, ERP, commerce en ligne, extranets, tableaux de bord, automatisations et intelligence artificielle.",
};

export default function RealisationsPage() {
  return (
    <>
      <PageHead title={intro.title} lead={intro.text} />
      <Container>
        <Group title={appDev.title} id="dev" items={appProjects} />
        {/* Les chantiers types rejoignent les projets datés sous le même titre :
            ils relèvent du même domaine, seule leur datation diffère. */}
        <Group title={ai.title} id="ia" items={[...aiProjects, ...aiCases]} />
        <Closing title="Lequel ressemble au vôtre ?" />
      </Container>
    </>
  );
}

function Group({ title, id, items }: { title: string; id: string; items: Work[] }) {
  return (
    <section aria-labelledby={id}>
      <Reveal>
        <h2
          id={id}
          className="mt-section text-h2-sm font-semibold leading-[1.05] tracking-[-0.045em]"
        >
          {title}
        </h2>
      </Reveal>
      {/* Carrousel sur téléphone, deux colonnes au-delà : six cartes empilées
          à la file donnaient un mur, alors qu'elles se parcourent très bien au
          doigt, une par une. */}
      <div className="rail mt-6 sm:mt-9 sm:grid sm:gap-card lg:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.title} as="article" delay={(i % 2) * 90}>
            <Case item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Case({ item }: { item: Work }) {
  return (
    <div className="flex h-full flex-col rounded-card bg-paper p-6 sm:p-[clamp(1.5rem,2.4vw,1.875rem)]">
      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
        {item.years ? (
          <span className="font-mono text-mono tracking-[0.08em] text-azure">{item.years}</span>
        ) : null}
        <span className="text-finer text-ink-55">{item.context}</span>
      </div>
      <h3
        className="mt-4 text-[1.4375rem] font-semibold leading-[1.2] tracking-[-0.03em]"
        style={{ textWrap: "pretty" }}
      >
        {item.title}
      </h3>
      <p className="mt-3 text-fine leading-[1.58] text-ink-70">{item.text}</p>
      {/* `mt-auto` colle les résultats en bas : dans une rangée de deux cartes
          de hauteurs inégales, ils restent alignés d'une carte à l'autre. Sans
          effet dans le bloc empilé, dont les lignes ne s'alignent pas entre
          elles. */}
      <ul className="mt-auto grid gap-2 pt-5">
        {item.metrics.map((metric) => (
          <li
            key={metric}
            className="relative pl-[1.375rem] text-finer font-medium leading-[1.5] before:absolute before:left-0 before:top-[0.5em] before:h-[7px] before:w-[7px] before:rounded-full before:bg-azure before:content-['']"
          >
            {metric}
          </li>
        ))}
      </ul>
    </div>
  );
}
