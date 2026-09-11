import type { Metadata } from "next";
import { A_COMPLETER, articles, lastUpdated, type Article } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Éditeur, hébergeur, propriété intellectuelle et traitement des données personnelles du site NOVA.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Hero />
      {articles.map((article, i) => (
        <ArticleBlock key={article.title} article={article} n={i + 1} />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ Hero */

function Hero() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-14 lg:px-12 lg:pt-16">
      <h1 className="max-w-[16ch] text-[clamp(2.4rem,5.6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
        Mentions légales
      </h1>
      <p className="mt-8 max-w-[56ch] text-[18px] leading-[1.6] text-ink/70">
        Les informations que la loi impose de publier, et ce qui arrive aux données que vous
        laissez sur ce site.
      </p>
      <p className="mt-6 text-[14px] text-ink/45">Dernière mise à jour : {lastUpdated}</p>
    </section>
  );
}

/* --------------------------------------------------------------- Article */

/**
 * Une valeur manquante s'affiche en rouge plutôt qu'en gris : c'est une mention
 * obligatoire, elle doit se voir au premier coup d'œil sur la page comme dans
 * une relecture rapide.
 */
function Rows({ rows, dark }: { rows: { label: string; value: string }[]; dark: boolean }) {
  return (
    <dl className="mt-8">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`grid gap-2 border-t py-5 lg:grid-cols-12 lg:gap-6 ${
            dark ? "border-white/15" : "border-line"
          } ${i === rows.length - 1 ? "border-b" : ""}`}
        >
          <dt className={`text-[14px] lg:col-span-3 ${dark ? "text-white/45" : "text-ink/45"}`}>
            {row.label}
          </dt>
          <dd
            className={`text-[16px] leading-[1.5] lg:col-span-9 ${
              row.value === A_COMPLETER
                ? "font-medium text-[#b23c17]"
                : dark
                  ? "text-white/80"
                  : "text-ink/80"
            }`}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ArticleBlock({ article, n }: { article: Article; n: number }) {
  const dark = article.emphasis === true;

  const body = (
    <>
      {/* Le numéro reprend le chiffre en chasse fixe de la page Offres. */}
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
        <p className={`font-mono text-[13px] lg:col-span-3 ${dark ? "text-white/40" : "text-ink/30"}`}>
          Article {n}
        </p>
        <h2
          className={`text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em] lg:col-span-9 ${
            dark ? "text-white" : ""
          }`}
        >
          {article.title}
        </h2>
      </div>

      {article.paragraphs ? (
        <div className="mt-8 grid gap-4 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-4 lg:col-span-9 lg:col-start-4">
            {article.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className={`max-w-[68ch] text-[16px] leading-[1.68] ${
                  dark ? "text-white/60" : "text-ink/70"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ) : null}

      {article.rows ? (
        <div className="grid lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-9 lg:col-start-4">
            <Rows rows={article.rows} dark={dark} />
          </div>
        </div>
      ) : null}

      {article.subsections ? (
        <div className="mt-10 grid lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-9 lg:col-start-4">
            {article.subsections.map((sub, i) => (
              <div
                key={sub.title}
                className={`border-t py-7 last:border-b ${dark ? "border-white/15" : "border-line"}`}
              >
                <h3
                  className={`text-[17px] font-semibold tracking-[-0.02em] ${
                    dark ? "text-white" : ""
                  }`}
                >
                  <span className={`font-mono text-[13px] ${dark ? "text-white/40" : "text-ink/30"}`}>
                    {n}.{i + 1}
                  </span>{" "}
                  {sub.title}
                </h3>
                <div className="mt-3 flex flex-col gap-3">
                  {sub.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className={`max-w-[68ch] text-[16px] leading-[1.68] ${
                        dark ? "text-white/60" : "text-ink/70"
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );

  if (dark) {
    return (
      <section className="mt-20 bg-navy-deep py-20 text-white lg:mt-[92px] lg:py-24">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">{body}</div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-20 lg:px-12 lg:pt-[92px]">
      {body}
    </section>
  );
}
