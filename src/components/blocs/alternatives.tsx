import type { CSSProperties } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui";
import type { BlocAlternatives } from "@/sanity/types";

/**
 * « Ce que vous avez déjà essayé » — un registre, pas une rangée de cartes.
 *
 * Les alternatives ordinaires sont des lignes séparées par un filet ; celle qui
 * est détachée se pose en carte navy. Le contraste entre les deux registres
 * porte tout l'argument : les options courantes s'alignent comme un constat, le
 * vrai concurrent seul prend une surface. D'où la validation du schéma : une
 * seule entrée détachée, et en dernier.
 *
 * `--band-pad` est déclarée ici plutôt que recopiée dans les classes parce que
 * deux règles doivent en donner exactement la même valeur : le rembourrage de
 * la bande, et la marge négative par laquelle l'entrée détachée la déborde. Ce
 * débordement est ce qui fait tomber ses deux colonnes sur celles des lignes du
 * dessus ; une valeur approchée se verrait.
 *
 * L'argile ne reçoit que de l'encre. L'azur y tombe à 3,86:1, sous le seuil de
 * 4,5:1 — le bleu clair du titre détaché reste donc sur le navy.
 */
export function Alternatives({ bloc }: { bloc: BlocAlternatives }) {
  return (
    <section
      aria-labelledby="essaye-title"
      style={{ "--band-pad": "clamp(1.75rem,3vw,2.75rem)" } as CSSProperties}
      className="mt-section sm:rounded-panel sm:bg-clay sm:px-[var(--band-pad)] sm:py-[clamp(2.25rem,3.6vw,3rem)]"
    >
      <SectionHead id="essaye-title" title={bloc.titre} />
      <div className="mt-7 grid sm:mt-8">
        {bloc.alternatives.map((ligne, i) => (
          <Reveal
            key={ligne._key}
            as="article"
            delay={i * 70}
            className={`sm:grid sm:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] sm:items-baseline sm:gap-[clamp(1.5rem,3vw,2.5rem)] ${
              ligne.detachee
                ? "mt-5 rounded-card bg-navy p-6 text-white sm:mx-[calc(var(--band-pad)*-1)] sm:px-[var(--band-pad)] sm:py-[clamp(1.5rem,2.4vw,1.875rem)]"
                : "border-t border-line py-5 sm:border-[rgba(8,9,12,0.16)] sm:py-6"
            }`}
          >
            <h3
              className={`text-[1.125rem] font-semibold leading-[1.25] tracking-[-0.025em] sm:text-[1.3125rem] sm:tracking-[-0.03em] ${
                ligne.detachee ? "text-azure-light" : ""
              }`}
            >
              {ligne.nom}
            </h3>
            <p
              className={`mt-2 text-fine leading-[1.58] sm:mt-0 sm:max-w-[64ch] sm:text-body ${
                ligne.detachee ? "text-on-navy" : "text-ink-70 sm:text-[#4a4034]"
              }`}
            >
              {ligne.texte}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
