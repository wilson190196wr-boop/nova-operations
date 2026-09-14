import type { Metadata } from "next";
import { metadonnees } from "@/lib/seo";
import { Reveal } from "@/components/reveal";
import { Container, Eyebrow } from "@/components/ui";
import { A_COMPLETER, articles, lastUpdated, type Article } from "@/lib/legal";

export const metadata: Metadata = metadonnees("/mentions-legales");

export default function MentionsLegalesPage() {
  return (
    <Container className="pt-[clamp(2.25rem,4.5vw,3.25rem)]">
      {/* Une colonne de 74 caractères : la charte cale ici sur la longueur de
          ligne d'un document, pas sur la largeur de la page. */}
      <div className="max-w-[74ch]">
        <Reveal>
          <h1
            className="max-w-[24ch] text-page font-semibold leading-none tracking-[-0.05em] max-sm:max-w-none"
            style={{ textWrap: "pretty" }}
          >
            Mentions légales
          </h1>
          <p className="mt-6 max-w-[62ch] text-lead leading-[1.55] text-ink-70">
            Les informations que la loi impose de publier, et ce qui arrive aux données que vous
            laissez sur ce site.
          </p>
          <p className="mt-6 font-mono text-mono tracking-[0.06em] text-ink-55">
            Dernière mise à jour : {lastUpdated}
          </p>
        </Reveal>

        {articles.map((article, i) => (
          <ArticleBlock key={article.title} article={article} n={i + 1} />
        ))}
      </div>
    </Container>
  );
}

/* --------------------------------------------------------------- Article */

function ArticleBlock({ article, n }: { article: Article; n: number }) {
  return (
    <Reveal as="section" className="mt-9 sm:mt-section">
      <p className="font-mono text-mono tracking-[0.12em] text-azure">Article {n}</p>
      <h2 className="mt-2 text-[1.4375rem] font-semibold leading-[1.12] tracking-[-0.04em] sm:mt-3 sm:text-[1.75rem] sm:leading-[1.1]">
        {article.title}
      </h2>

      {article.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-3.5 text-fine leading-[1.68] text-ink-70 sm:mt-4 sm:text-body">
          {paragraph}
        </p>
      ))}

      {article.rows ? <Rows rows={article.rows} /> : null}

      {article.subsections?.map((subsection, i) => (
        <div key={subsection.title}>
          <h3 className="mt-7 text-[1.0625rem] font-semibold tracking-[-0.025em] sm:mt-8 sm:text-[1.1875rem]">
            {n}.{i + 1} {subsection.title}
          </h3>
          {subsection.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-3.5 text-fine leading-[1.68] text-ink-70 sm:mt-4 sm:text-body">
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </Reveal>
  );
}

/**
 * Décide, à partir du libellé, si une valeur devient un lien.
 *
 * La version précédente devinait à partir de la valeur : toute chaîne d'au
 * moins huit caractères faite de chiffres et d'espaces devenait un lien
 * `tel:`. Un SIRET en compte quatorze — dès qu'il aurait été renseigné, il se
 * serait affiché comme un numéro de téléphone appelable. Le libellé, lui, dit
 * sans ambiguïté ce que la valeur représente.
 *
 * Tout libellé non listé reste du texte : c'est le comportement sûr.
 */
function valeurCliquable(label: string, value: string) {
  const href =
    label === "Courriel"
      ? `mailto:${value}`
      : label === "Téléphone"
        ? `tel:${value.replace(/\s/g, "")}`
        : label === "Site"
          ? `https://${value.replace(/^https?:\/\//, "")}`
          : null;

  if (!href) return value;

  // Rembourrage compensé par une marge négative : zone tappable de 44 px sans
  // déplacer le texte d'un pixel.
  return (
    <a href={href} className="-my-3 inline-block py-3">
      {value}
    </a>
  );
}

/**
 * Les lignes d'identification, sur une carte claire.
 *
 * Une valeur manquante s'affiche en rouge plutôt qu'en gris : c'est une
 * mention obligatoire au sens de l'article 6-III de la LCEN, elle doit se voir
 * au premier coup d'œil. La maquette ne prévoit pas ce traitement — c'est un
 * garde-fou conservé volontairement.
 */
function Rows({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="mt-5 grid gap-y-0 rounded-card bg-paper p-5 sm:mt-6 sm:p-[clamp(1.25rem,2vw,1.75rem)] lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-x-6 lg:gap-y-3.5">
      {rows.map((row) => (
        <div key={row.label} className="contents">
          <dt className="mt-3.5 self-start first:mt-0 lg:mt-0">
            <Eyebrow uppercase>{row.label}</Eyebrow>
          </dt>
          <dd
            className={`mt-[0.1875rem] text-fine leading-[1.5] lg:mt-0 ${
              row.value === A_COMPLETER ? "text-[#b23c17]" : ""
            }`}
          >
            {row.value === A_COMPLETER ? row.value : valeurCliquable(row.label, row.value)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
