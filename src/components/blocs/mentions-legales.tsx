import { Reveal } from "@/components/reveal";
import { Container, Eyebrow } from "@/components/ui";
import type { BlocMentionsLegales, TypeDeLien } from "@/sanity/types";

type Article = BlocMentionsLegales["articles"][number];
type Ligne = Article["lignes"][number];

/**
 * Marqueur affiché à la place d'une mention obligatoire non renseignée.
 *
 * Il reste dans le code plutôt que d'être recopié dans chaque document : c'est
 * le rendu d'un champ vide, pas une valeur qu'un éditeur saisit. Le stocker
 * six fois aurait rendu possible d'en publier une variante — et une variante
 * ne se repère plus comme un trou.
 */
const A_COMPLETER = "À compléter avant la mise en ligne";

export function MentionsLegales({ bloc }: { bloc: BlocMentionsLegales }) {
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
            {bloc.titre}
          </h1>
          <p className="mt-6 max-w-[62ch] text-lead leading-[1.55] text-ink-70">{bloc.chapeau}</p>
          {/* Une seule expression et non deux enfants séparés par une espace :
              React insère un commentaire entre deux nœuds de texte voisins,
              ce qui ajoutait deux marqueurs dans le HTML pour un rendu
              identique. Composer la chaîne ici produit un seul nœud. */}
          <p className="mt-6 font-mono text-mono tracking-[0.06em] text-ink-55">
            {`${bloc.prefixeMiseAJour} ${bloc.dateMiseAJour}`}
          </p>
        </Reveal>

        {bloc.articles.map((article, i) => (
          <BlocArticle key={article._key} article={article} mot={bloc.motArticle} n={i + 1} />
        ))}
      </div>
    </Container>
  );
}

/**
 * Un article numéroté.
 *
 * La numérotation se calcule depuis l'ordre du tableau : insérer un article ne
 * demande pas de renuméroter les suivants à la main, et aucun numéro ne peut
 * se retrouver en double. En contrepartie, plusieurs paragraphes citent
 * « l'article 1 » en toutes lettres — réordonner les articles rend ces renvois
 * faux, ce que le schéma signale à l'éditeur.
 */
function BlocArticle({ article, mot, n }: { article: Article; mot: string; n: number }) {
  return (
    <Reveal as="section" className="mt-9 sm:mt-section">
      {/* Une seule expression, pour la même raison que la date ci-dessus :
          deux nœuds de texte voisins forcent React à intercaler un
          commentaire dans le HTML. */}
      <p className="font-mono text-mono tracking-[0.12em] text-azure">{`${mot} ${n}`}</p>
      <h2 className="mt-2 text-[1.4375rem] font-semibold leading-[1.12] tracking-[-0.04em] sm:mt-3 sm:text-[1.75rem] sm:leading-[1.1]">
        {article.titre}
      </h2>

      {article.paragraphes.map((paragraphe, i) => (
        <p key={i} className="mt-3.5 text-fine leading-[1.68] text-ink-70 sm:mt-4 sm:text-body">
          {paragraphe}
        </p>
      ))}

      {article.lignes.length ? <Lignes lignes={article.lignes} /> : null}

      {article.sousArticles.map((sousArticle, i) => (
        <div key={sousArticle._key}>
          <h3 className="mt-7 text-[1.0625rem] font-semibold tracking-[-0.025em] sm:mt-8 sm:text-[1.1875rem]">
            {n}.{i + 1} {sousArticle.titre}
          </h3>
          {sousArticle.paragraphes.map((paragraphe, j) => (
            <p key={j} className="mt-3.5 text-fine leading-[1.68] text-ink-70 sm:mt-4 sm:text-body">
              {paragraphe}
            </p>
          ))}
        </div>
      ))}
    </Reveal>
  );
}

/**
 * Décide si une valeur devient un lien, à partir d'un champ explicite.
 *
 * La version précédente devinait à partir de la valeur : toute chaîne d'au
 * moins huit caractères faite de chiffres et d'espaces devenait un lien `tel:`.
 * Un SIRET en compte quatorze — dès qu'il aurait été renseigné, il se serait
 * affiché comme un numéro de téléphone appelable. La version suivante déduisait
 * du libellé, ce qui liait le lien à une chaîne éditable : renommer « Courriel »
 * supprimait le lien sans prévenir. Le choix est désormais un champ à part
 * entière, que rien n'altère par ricochet.
 */
function valeurCliquable(lien: TypeDeLien, valeur: string) {
  const href =
    lien === "courriel"
      ? `mailto:${valeur}`
      : lien === "telephone"
        ? `tel:${valeur.replace(/\s/g, "")}`
        : lien === "site"
          ? `https://${valeur.replace(/^https?:\/\//, "")}`
          : null;

  if (!href) return valeur;

  // Rembourrage compensé par une marge négative : zone tappable de 44 px sans
  // déplacer le texte d'un pixel.
  return (
    <a href={href} className="-my-3 inline-block py-3">
      {valeur}
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
function Lignes({ lignes }: { lignes: Ligne[] }) {
  return (
    <dl className="mt-5 grid gap-y-0 rounded-card bg-paper p-5 sm:mt-6 sm:p-[clamp(1.25rem,2vw,1.75rem)] lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-x-6 lg:gap-y-3.5">
      {lignes.map((ligne) => {
        const manquante = !ligne.valeur;
        return (
          <div key={ligne._key} className="contents">
            <dt className="mt-3.5 self-start first:mt-0 lg:mt-0">
              <Eyebrow uppercase>{ligne.libelle}</Eyebrow>
            </dt>
            <dd
              className={`mt-[0.1875rem] text-fine leading-[1.5] lg:mt-0 ${
                manquante ? "text-[#b23c17]" : ""
              }`}
            >
              {manquante ? A_COMPLETER : valeurCliquable(ligne.lien, ligne.valeur as string)}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
