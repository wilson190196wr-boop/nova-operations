import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { CTABand, Container, PageHero } from "@/components/ui";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Le journal — performance opérationnelle des PME",
  description:
    "Articles et retours de terrain sur l'optimisation des processus, le rôle de Fractional COO, la transformation digitale et l'automatisation IA en PME.",
};

export default function BlogPage() {
  const [featured, ...rest] = articles;
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <>
      <PageHero
        eyebrow="Le journal"
        title={<>Ce qu&apos;on apprend en salle des machines.</>}
        intro="Pas de veille recyclée : uniquement ce que nous observons en mission chez des PME de 20 à 250 salariés. Un article toutes les deux semaines."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <Reveal className="flex flex-wrap gap-2">
            <span className="rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-white">
              Tous
            </span>
            {categories.map((c) => (
              <span
                key={c}
                className="cursor-default rounded-full border border-line px-4 py-2 text-[13px] text-ink/55 transition-colors hover:border-ink/30 hover:text-ink"
              >
                {c}
              </span>
            ))}
          </Reveal>

          {/* Featured */}
          <Reveal delay={80} className="mt-12">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid gap-10 overflow-hidden rounded-3xl border border-line lg:grid-cols-[1.05fr_0.95fr]"
            >
              <div className="p-9 lg:p-12">
                <span className="text-[12px] uppercase tracking-[0.14em] text-azure">
                  À la une · {featured.category}
                </span>
                <h2 className="mt-6 text-[clamp(1.7rem,3.2vw,2.5rem)] font-semibold leading-[1.14] tracking-[-0.035em] transition-colors group-hover:text-azure">
                  {featured.title}
                </h2>
                <p className="mt-6 max-w-xl text-[16.5px] leading-[1.68] text-ink/60">
                  {featured.excerpt}
                </p>
                <p className="mt-10 flex items-center gap-3 text-[13px] text-ink/40">
                  {featured.date}
                  <span className="h-1 w-1 rounded-full bg-ink/20" />
                  {featured.readingTime} de lecture
                </p>
              </div>

              <div className="relative min-h-[260px] overflow-hidden bg-navy-deep">
                <div className="grid-lines-dark absolute inset-0" />
                <div
                  className="absolute inset-0 animate-sheen"
                  style={{
                    background:
                      "radial-gradient(70% 70% at 70% 30%, rgba(47,92,255,0.45), transparent 70%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-9 lg:p-12">
                  <p className="font-mono text-[clamp(2.4rem,5vw,3.6rem)] font-medium leading-none tracking-[-0.05em] text-white">
                    30 h
                  </p>
                  <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-white/55">
                    perdues chaque semaine dans une PME de 100 salariés, réparties sur sept
                    points de friction.
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Grid */}
          <div className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, i) => (
              <Reveal key={article.slug} delay={i * 70} className="bg-white">
                <Link href={`/blog/${article.slug}`} className="group flex h-full flex-col p-9">
                  <span className="text-[12px] uppercase tracking-[0.14em] text-azure">
                    {article.category}
                  </span>
                  <h3 className="mt-5 text-[19.5px] font-semibold leading-[1.3] tracking-[-0.02em] transition-colors group-hover:text-azure">
                    {article.title}
                  </h3>
                  <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink/55">
                    {article.excerpt}
                  </p>
                  <p className="mt-9 flex items-center gap-3 text-[12.5px] text-ink/40">
                    {article.date}
                    <span className="h-1 w-1 rounded-full bg-ink/20" />
                    {article.readingTime}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Newsletter */}
          <Reveal delay={100} className="mt-6">
            <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-mist p-9 lg:flex-row lg:items-center lg:p-12">
              <div>
                <h2 className="text-[24px] font-semibold tracking-[-0.03em]">
                  Une idée applicable, deux fois par mois.
                </h2>
                <p className="mt-3 max-w-lg text-[15.5px] leading-relaxed text-ink/55">
                  La newsletter Heures Perdues : un cas réel, un calcul de ROI, une action à
                  tester dans la semaine. Lue par 2 400 dirigeants.
                </p>
              </div>
              <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-line bg-white p-1.5">
                <span className="flex-1 px-4 text-[14.5px] text-ink/35">
                  prenom@entreprise.fr
                </span>
                <span className="rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-medium text-white">
                  S&apos;inscrire
                </span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
