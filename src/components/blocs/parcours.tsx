import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui";
import type { BlocParcours } from "@/sanity/types";

export function Parcours({ bloc }: { bloc: BlocParcours }) {
  return (
    <section aria-labelledby="parcours-title" className="mt-section">
      <SectionHead id="parcours-title" title={bloc.titre} />
      {/* Sur téléphone, chaque jalon est une ligne séparée par un filet, avec
          la période et le lieu sur une même ligne. Quatre cartes empilées ne
          disaient rien de plus et occupaient deux fois la hauteur. */}
      <ol className="mt-6 grid gap-0 sm:mt-9 sm:gap-card">
        {bloc.jalons.map((jalon, i) => (
          <Reveal
            key={jalon._key}
            as="li"
            delay={i * 70}
            className="border-t border-line py-[1.375rem] last:border-b sm:rounded-card sm:border-0 sm:bg-paper sm:p-[clamp(1.5rem,2.4vw,1.875rem)] sm:last:border-0 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,8fr)] lg:gap-[clamp(1rem,2.4vw,2rem)]"
          >
            <p className="sm:mb-0">
              <span className="font-mono text-mono tracking-[0.06em] text-azure">
                {jalon.periode}
              </span>
              <span className="ml-2 text-[0.875rem] text-ink-55 sm:ml-0 sm:mt-2 sm:block sm:text-finer">
                {jalon.lieu}
              </span>
            </p>
            <div className="mt-2 sm:mt-3 lg:mt-0">
              <h3 className="text-[1.1875rem] font-semibold leading-[1.22] tracking-[-0.03em] sm:text-[1.375rem] sm:leading-[1.2]">
                {jalon.role}
              </h3>
              <p className="mt-1.5 text-fine leading-[1.58] text-ink-70 sm:mt-3 sm:leading-[1.6]">
                {jalon.texte}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
