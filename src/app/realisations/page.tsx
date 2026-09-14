import type { Metadata } from "next";
import { metadonnees } from "@/lib/seo";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Closing, Container, PageHead } from "@/components/ui";
import {
  ai,
  aiCases,
  aiExamples,
  aiProjects,
  appDev,
  appProjects,
  intro,
  type Work,
} from "@/lib/work";

export const metadata: Metadata = metadonnees("/realisations");

export default function RealisationsPage() {
  return (
    <>
      <PageHead title={intro.title} lead={intro.text}>
        <p className="mt-5">
          <Link
            href="/a-propos"
            className="text-fine font-medium underline underline-offset-4 hover:text-azure"
          >
            Voir mon parcours professionnel
          </Link>
        </p>
      </PageHead>
      <Container>
        <Group
          title={appDev.title}
          id="dev"
          items={appProjects}
          lien={{ href: "/offres#accompagnement", libelle: "Découvrir le pilotage de projets applicatifs" }}
        />
        <Group
          title={ai.title}
          id="ia"
          items={aiProjects}
          lien={{ href: "/offres#sprints", libelle: "Découvrir les sprints d'automatisation et d'IA" }}
        />
        {/* Les pistes à évaluer ont leur propre groupe. Mêlées aux projets
            datés sous un titre commun, elles se lisaient comme des résultats
            obtenus — ce qu'elles ne sont pas. */}
        <Group title={aiExamples.title} id="exemples" items={aiCases} illustrative />
        <Closing title="Lequel ressemble au vôtre ?" />
      </Container>
    </>
  );
}

function Group({
  title,
  id,
  items,
  illustrative = false,
  lien,
}: {
  title: string;
  id: string;
  items: Work[];
  illustrative?: boolean;
  lien?: { href: string; libelle: string };
}) {
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
            <Case item={item} illustrative={illustrative} />
          </Reveal>
        ))}
      </div>
      {/* Une sortie par groupe : le visiteur qui reconnaît son besoin dans ces
          projets peut aller voir l'offre correspondante sans revenir au menu. */}
      {lien ? (
        <p className="mt-6">
          <Link
            href={lien.href}
            className="text-fine font-medium underline underline-offset-4 hover:text-azure"
          >
            {lien.libelle}
          </Link>
        </p>
      ) : null}
    </section>
  );
}

function Case({ item, illustrative = false }: { item: Work; illustrative?: boolean }) {
  return (
    <div className="flex h-full flex-col rounded-card bg-paper p-6 sm:p-[clamp(1.5rem,2.4vw,1.875rem)]">
      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
        {item.years ? (
          <span className="font-mono text-mono tracking-[0.08em] text-azure">{item.years}</span>
        ) : null}
        <span className="text-finer text-ink-55">{item.context}</span>
      </div>
      {/* La mention est dans le flux du texte, pas dans une pastille discrète :
          c'est elle qui empêche de lire la carte comme un résultat obtenu. */}
      {illustrative ? (
        <p className="mt-3 text-finer font-medium leading-[1.45] text-ink-70">
          Exemple de chantier — à valider par un diagnostic
        </p>
      ) : null}
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
      {illustrative ? (
        <p className="mt-auto pt-5 font-mono text-mono uppercase tracking-[0.08em] text-ink-55">
          Indicateurs à suivre
        </p>
      ) : null}
      <ul className={`grid gap-2 ${illustrative ? "mt-2.5" : "mt-auto pt-5"}`}>
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
