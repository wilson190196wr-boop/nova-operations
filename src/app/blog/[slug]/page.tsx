import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { CTABand, Container, Eyebrow } from "@/components/ui";
import { articles } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

const body = [
  {
    h: "Le problème n'est presque jamais là où on le cherche",
    p: [
      "Quand un dirigeant nous appelle, il a déjà une hypothèse : « notre ERP est mauvais », « il nous manque une personne », « il faudrait de l'IA ». Dans neuf cas sur dix, l'audit désigne un autre coupable — un enchaînement de tâches qui n'a jamais été repensé depuis que l'entreprise a doublé de taille.",
      "Ce décalage n'a rien d'étonnant. Les pertes opérationnelles ne se voient pas dans un compte de résultat : elles se diluent dans des salaires déjà payés, des heures déjà travaillées, des délais devenus la norme.",
    ],
  },
  {
    h: "Mesurer avant de décider",
    p: [
      "Nous commençons systématiquement par un relevé sur le terrain : combien de fois cette information est-elle saisie ? Combien de personnes la manipulent ? Combien de temps entre la demande et la réponse ? Ces trois questions suffisent à faire apparaître l'essentiel des gains.",
      "Le chiffrage vaut mieux que n'importe quel argumentaire. Une tâche répétée 40 fois par semaine et qui prend 9 minutes de trop représente six heures hebdomadaires — soit un tiers d'équivalent temps plein, chaque année, pour un seul processus.",
    ],
  },
  {
    h: "Supprimer, simplifier, puis outiller",
    p: [
      "L'ordre compte. Automatiser une étape inutile revient à la rendre plus rapidement inutile, et à figer dans un outil une organisation qu'il aurait fallu revoir. Nous éliminons d'abord, nous simplifions ensuite, nous outillons en dernier.",
      "C'est aussi ce qui rend l'IA rentable quand elle arrive. Branchée sur un processus propre et des données fiables, elle produit un gain net et mesurable. Branchée sur le désordre, elle le reproduit à grande vitesse.",
    ],
  },
];

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const others = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-line bg-mist pt-[128px] pb-16 lg:pt-[168px] lg:pb-20">
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-50 mask-fade-b" />
          <Container className="relative">
            <Reveal className="max-w-3xl">
              <Eyebrow>{article.category}</Eyebrow>
              <h1
                className="mt-6 text-[clamp(2.1rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.04em]"
                style={{ textWrap: "balance" }}
              >
                {article.title}
              </h1>
              <p className="mt-7 text-[18px] leading-[1.65] text-ink/60">{article.excerpt}</p>
              <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-6 text-[13.5px] text-ink/45">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[11px] font-medium text-white">
                    NO
                  </span>
                  Équipe NOVA Operations
                </span>
                <span className="h-1 w-1 rounded-full bg-ink/20" />
                {article.date}
                <span className="h-1 w-1 rounded-full bg-ink/20" />
                {article.readingTime} de lecture
              </div>
            </Reveal>
          </Container>
        </header>

        <div className="py-20 lg:py-28">
          <Container>
            <div className="grid gap-16 lg:grid-cols-[1fr_260px] lg:gap-20">
              <div className="max-w-[680px]">
                <Reveal>
                  <p className="text-[19px] leading-[1.6] tracking-[-0.01em] text-ink/85">
                    Une PME de 100 salariés perd en moyenne l&apos;équivalent de trois postes à
                    temps plein en frictions opérationnelles. Ce chiffre n&apos;apparaît dans
                    aucun tableau de bord — voici comment on le retrouve, et ce qu&apos;on en fait.
                  </p>
                </Reveal>

                {body.map((section, i) => (
                  <Reveal key={section.h} delay={i * 60} className="mt-14">
                    <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.03em]">
                      {section.h}
                    </h2>
                    {section.p.map((paragraph) => (
                      <p key={paragraph} className="mt-5 text-[16.5px] leading-[1.75] text-ink/70">
                        {paragraph}
                      </p>
                    ))}
                  </Reveal>
                ))}

                <Reveal className="my-14 border-l-2 border-azure pl-8">
                  <p className="text-[21px] font-medium leading-[1.5] tracking-[-0.02em]">
                    « Ce n&apos;est pas l&apos;outil qui coûte cher. C&apos;est le processus
                    qu&apos;on n&apos;a jamais osé supprimer. »
                  </p>
                </Reveal>

                <Reveal className="rounded-3xl bg-mist p-8 lg:p-10">
                  <p className="text-[11.5px] uppercase tracking-[0.16em] text-ink/40">
                    À retenir
                  </p>
                  <ul className="mt-6 flex flex-col gap-4">
                    {[
                      "Les pertes se mesurent en heures, pas en ressenti.",
                      "Trois questions terrain suffisent à cartographier 80 % des gains.",
                      "L'ordre est toujours : supprimer, simplifier, puis outiller.",
                      "Un chantier sans indicateur avant/après ne devrait pas être lancé.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3.5 text-[15.5px] text-ink/70">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-azure" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <aside className="lg:sticky lg:top-28 lg:self-start">
                <Reveal delay={120} className="rounded-3xl border border-line p-7">
                  <p className="text-[11.5px] uppercase tracking-[0.16em] text-ink/40">
                    Sur le même sujet
                  </p>
                  <div className="mt-6 flex flex-col gap-5">
                    {others.map((other) => (
                      <Link
                        key={other.slug}
                        href={`/blog/${other.slug}`}
                        className="group border-b border-line pb-5 last:border-b-0 last:pb-0"
                      >
                        <p className="text-[11.5px] uppercase tracking-[0.12em] text-azure">
                          {other.category}
                        </p>
                        <p className="mt-2 text-[15px] font-medium leading-snug transition-colors group-hover:text-azure">
                          {other.title}
                        </p>
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="mt-8 flex items-center justify-center rounded-full bg-ink px-5 py-3 text-[13.5px] font-medium text-white transition-colors hover:bg-navy"
                  >
                    Parler de votre cas
                  </Link>
                </Reveal>
              </aside>
            </div>
          </Container>
        </div>
      </article>

      <CTABand />
    </>
  );
}
