import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Card, Closing, Container, Facts, SectionHead } from "@/components/ui";
import { facts, founder, principles, story, turn } from "@/lib/about";
import { founderPhoto } from "@/lib/photos";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Wilson Rault, fondateur de KELERIA. Six ans à construire des logiciels puis à diriger ceux qui les construisent, chez Expedia, en agence et chez un éditeur.",
};

export default function AProposPage() {
  return (
    <Container>
      <Intro />
      <Story />
      <Turn />
      <Principles />
      <Closing title="Parlons de votre cas." />
    </Container>
  );
}

/* ------------------------------------------------------------------ Intro */

function Intro() {
  return (
    <section
      aria-labelledby="a-propos-title"
      className="grid gap-[clamp(1.75rem,3.5vw,3rem)] pt-[clamp(2rem,4vw,3rem)] lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-start"
    >
      <Reveal>
        <figure className="aspect-[4/5] overflow-hidden rounded-panel bg-clay max-lg:max-w-[360px]">
          <Image
            src={founderPhoto.src}
            alt={founderPhoto.alt}
            width={founderPhoto.width}
            height={founderPhoto.height}
            priority
            className="h-full w-full object-cover"
          />
        </figure>
        <p className="mt-5">
          <strong className="block text-[1.1875rem] font-semibold tracking-[-0.025em]">
            {founder.name}
          </strong>
          <span className="mt-1 block text-fine text-ink-55">{founder.role}</span>
        </p>
      </Reveal>

      <Reveal delay={100}>
        <h1
          id="a-propos-title"
          className="text-[clamp(1.875rem,3.6vw,2.875rem)] font-semibold leading-[1.08] tracking-[-0.04em]"
          style={{ textWrap: "pretty" }}
        >
          {founder.quote}
        </h1>
        <p className="mt-6 max-w-[60ch] text-lead leading-[1.55] text-ink-70">
          Six ans à construire des logiciels, puis à diriger ceux qui les construisent. Dans un
          groupe américain, dans une agence digitale, puis chez un éditeur. KELERIA est né de ce
          que j&apos;y ai vu manquer : une offre adaptée aux besoins des PME et des startups.
        </p>
        <Facts items={facts} />
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ Story */

function Story() {
  return (
    <section aria-labelledby="parcours-title" className="mt-section">
      <SectionHead id="parcours-title" title="Du code à la direction de projets" />
      {/* Sur téléphone, chaque jalon est une ligne séparée par un filet, avec
          la période et le lieu sur une même ligne. Quatre cartes empilées ne
          disaient rien de plus et occupaient deux fois la hauteur. */}
      <ol className="mt-6 grid gap-0 sm:mt-9 sm:gap-card">
        {story.map((entry, i) => (
          <Reveal
            key={entry.period + entry.role}
            as="li"
            delay={i * 70}
            className="border-t border-line py-[1.375rem] last:border-b sm:rounded-card sm:border-0 sm:bg-paper sm:p-[clamp(1.5rem,2.4vw,1.875rem)] sm:last:border-0 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,8fr)] lg:gap-[clamp(1rem,2.4vw,2rem)]"
          >
            <p className="sm:mb-0">
              <span className="font-mono text-mono tracking-[0.06em] text-azure">
                {entry.period}
              </span>
              <span className="ml-2 text-[0.875rem] text-ink-55 sm:ml-0 sm:mt-2 sm:block sm:text-finer">
                {entry.place}
              </span>
            </p>
            <div className="mt-2 sm:mt-3 lg:mt-0">
              <h3 className="text-[1.1875rem] font-semibold leading-[1.22] tracking-[-0.03em] sm:text-[1.375rem] sm:leading-[1.2]">
                {entry.role}
              </h3>
              <p className="mt-1.5 text-fine leading-[1.58] text-ink-70 sm:mt-3 sm:leading-[1.6]">
                {entry.text}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------- Turn */

function Turn() {
  return (
    <section
      aria-labelledby="turn-title"
      className="panel-organic bleed mt-section rounded-panel px-gutter py-9 sm:px-[clamp(1.5rem,3vw,2.75rem)] sm:py-[clamp(2rem,4vw,3.5rem)]"
    >
      <Reveal>
        <h2
          id="turn-title"
          className="max-w-[30ch] text-h2 font-semibold leading-[1.02] tracking-[-0.045em]"
          style={{ textWrap: "pretty" }}
        >
          {turn.title}
        </h2>
        <div className="mt-8 grid max-w-[66ch] gap-[1.125rem]">
          {turn.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-body leading-[1.65] text-ink-70">
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------- Principles */

function Principles() {
  return (
    <section aria-labelledby="regles-title" className="mt-section">
      <SectionHead id="regles-title" title="Quatre règles qui ne se négocient pas" />
      <div className="rail mt-6 sm:mt-9 sm:grid sm:gap-card lg:grid-cols-2">
        {principles.map((principle, i) => (
          <Reveal key={principle.title} as="article" delay={(i % 2) * 90}>
            <Card className="h-full">
              <h3 className="text-h3 font-semibold leading-[1.14] tracking-[-0.035em]">
                {principle.title}
              </h3>
              <p className="mt-3.5 text-body leading-[1.58] text-ink-70">{principle.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
