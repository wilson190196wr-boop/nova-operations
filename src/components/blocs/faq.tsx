import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui";
import type { BlocFaq } from "@/sanity/types";

export function Faq({ bloc }: { bloc: BlocFaq }) {
  return (
    <section aria-labelledby="faq-title" className="mt-section">
      <SectionHead id="faq-title" eyebrow={bloc.surtitre ?? undefined} title={bloc.titre} />
      {/* `details` plutôt qu'une liste toujours ouverte : le dépliage est natif,
          donc opérable au clavier et annoncé par les lecteurs d'écran sans une
          ligne de JavaScript. */}
      <div className="mt-6 grid gap-2 sm:mt-9 sm:gap-3">
        {bloc.questions.map((item, i) => (
          <Reveal key={item._key} delay={i * 60}>
            <details className="group rounded-card bg-paper px-5 py-[1.125rem] sm:px-[clamp(1.25rem,2vw,1.75rem)] sm:py-5">
              {/* 44 px au doigt, la hauteur de la maquette à la souris. */}
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold tracking-[-0.02em] sm:text-[1.0625rem] lg:min-h-8 [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="font-mono text-xl leading-none text-azure after:content-['+'] group-open:after:content-['–']"
                />
              </summary>
              <p className="mt-3 max-w-[70ch] text-fine leading-[1.6] text-ink-70 sm:mt-3.5">
                {item.reponse}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
