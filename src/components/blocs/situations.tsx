import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui";
import type { BlocSituations } from "@/sanity/types";

export function Situations({ bloc }: { bloc: BlocSituations }) {
  return (
    <section
      aria-labelledby="situations-title"
      className="panel-organic bleed mt-section rounded-panel px-gutter py-9 sm:px-[clamp(1.5rem,3vw,2.75rem)] sm:py-[clamp(2rem,4vw,3.5rem)]"
    >
      <Reveal>
        <h2
          id="situations-title"
          className="max-w-[30ch] text-h2 font-semibold leading-[1.02] tracking-[-0.045em] sm:leading-[1.03]"
          style={{ textWrap: "pretty" }}
        >
          {bloc.titre}
        </h2>
      </Reveal>

      <div className="rail mt-7 sm:grid sm:gap-card lg:grid-cols-2">
        {bloc.profils.map((profil, i) => (
          <Reveal key={profil._key} delay={i * 90}>
            <Card className="h-full">
              {/* Sur grand écran, cette ligne n'est pas la petite étiquette azur
                  qu'annonce son nom : dans la maquette, la règle `.card p` qui
                  la suit est plus spécifique que `.card__over` et lui reprend
                  sa taille et sa couleur. Seules la graisse monospace et la
                  capitale survivent. C'est le rendu validé — reproduit tel
                  quel, borné au bureau pour ne pas toucher au téléphone. */}
              <p className="font-mono text-mono uppercase tracking-[0.08em] text-azure sm:mt-3 sm:text-body sm:leading-[1.58] sm:text-ink-70">
                {profil.cible}
              </p>
              <h3
                className="mt-3.5 text-h3 font-semibold leading-[1.14] tracking-[-0.035em] sm:mt-3 sm:leading-[1.16]"
                style={{ textWrap: "pretty" }}
              >
                {profil.titre}
              </h3>
              <p className="mt-3.5 text-body leading-[1.58] text-ink-70 sm:mt-3">{profil.texte}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
