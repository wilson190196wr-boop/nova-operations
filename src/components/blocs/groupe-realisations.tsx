import { Reveal } from "@/components/reveal";
import type { BlocGroupeRealisations, Realisation } from "@/sanity/types";

export function GroupeRealisations({ bloc }: { bloc: BlocGroupeRealisations }) {
  return (
    <section aria-labelledby={bloc.ancre}>
      <Reveal>
        <h2
          id={bloc.ancre}
          className="mt-section text-h2-sm font-semibold leading-[1.05] tracking-[-0.045em]"
        >
          {bloc.titre}
        </h2>
      </Reveal>
      {/* Carrousel sur téléphone, deux colonnes au-delà : six cartes empilées
          à la file donnaient un mur, alors qu'elles se parcourent très bien au
          doigt, une par une. */}
      <div className="rail mt-6 sm:mt-9 sm:grid sm:gap-card lg:grid-cols-2">
        {bloc.realisations.map((item, i) => (
          <Reveal key={item.id} as="article" delay={(i % 2) * 90}>
            <Cas item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Cas({ item }: { item: Realisation }) {
  return (
    <div className="flex h-full flex-col rounded-card bg-paper p-6 sm:p-[clamp(1.5rem,2.4vw,1.875rem)]">
      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
        {item.annees ? (
          <span className="font-mono text-mono tracking-[0.08em] text-azure">{item.annees}</span>
        ) : null}
        <span className="text-finer text-ink-55">{item.contexte}</span>
      </div>
      <h3
        className="mt-4 text-[1.4375rem] font-semibold leading-[1.2] tracking-[-0.03em]"
        style={{ textWrap: "pretty" }}
      >
        {item.titre}
      </h3>
      <p className="mt-3 text-fine leading-[1.58] text-ink-70">{item.texte}</p>
      {/* `mt-auto` colle les résultats en bas : dans une rangée de deux cartes
          de hauteurs inégales, ils restent alignés d'une carte à l'autre. Sans
          effet dans le bloc empilé, dont les lignes ne s'alignent pas entre
          elles. */}
      <ul className="mt-auto grid gap-2 pt-5">
        {item.indicateurs.map((indicateur) => (
          <li
            key={indicateur}
            className="relative pl-[1.375rem] text-finer font-medium leading-[1.5] before:absolute before:left-0 before:top-[0.5em] before:h-[7px] before:w-[7px] before:rounded-full before:bg-azure before:content-['']"
          >
            {indicateur}
          </li>
        ))}
      </ul>
    </div>
  );
}
