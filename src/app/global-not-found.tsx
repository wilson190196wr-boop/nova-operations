import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button, Eyebrow, PageHead } from "@/components/ui";
import { lireParametres } from "@/sanity/lire";
import type { ParametresSite, TextesPageIntrouvable } from "@/sanity/types";

/**
 * La page servie sur toute adresse que le site ne connaît pas.
 *
 * Elle est déclarée en `global-not-found` et non en `not-found` : l'application
 * a deux racines de mise en page — le site et le Studio — et aucune mise en
 * page au-dessus d'elles. Sans racine unique, Next n'a aucune mise en page à
 * partir de laquelle composer un 404 global ; la raison du drapeau
 * `experimental.globalNotFound` et les deux emplacements écartés sont détaillés
 * dans `next.config.ts`.
 *
 * La contrepartie de ce choix est ici, en toutes lettres : ce fichier contourne
 * les mises en page, donc il doit rapporter lui-même tout ce qu'elles
 * fournissent — la balise `<html lang="fr">`, `globals.css`, les familles de
 * caractères (voir plus bas, c'est le seul point où la charte cède) ainsi que
 * l'en-tête et le pied de page. Ce qu'il ne reprend pas, et volontairement,
 * c'est le pont d'édition visuelle de la prévisualisation : cette page n'est
 * atteignable par aucune adresse fixe, donc l'outil Presentation du Studio ne
 * saurait pas où l'ouvrir. Ses textes se modifient dans le formulaire, comme
 * n'importe quel réglage du site.
 */

/**
 * Les deux familles, en polices système.
 *
 * C'est la seule façon de ne rien changer aux six pages. `next/font` produit
 * une feuille de style par déclaration : en appeler une ici ajoutait un second
 * `<link rel="stylesheet">` au HTML des six pages, et partager la déclaration
 * de la mise en page renommait les classes qu'elles portent sur `<html>`. Dans
 * les deux cas, une page 404 modifiait le rendu du site — ce que la
 * vérification de fidélité refuse, à juste titre.
 *
 * La documentation de Next recommande d'ailleurs une famille plus simple sur
 * cette page, qui est servie sans passer par aucune mise en page. Le reste de
 * la charte tient : couleurs, échelle typographique, graisses, filets et
 * rythme viennent de `globals.css` et ne bougent pas.
 */
const POLICES = {
  "--font-geist-sans":
    'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  "--font-geist-mono": 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
} as CSSProperties;

/**
 * Le titre d'onglet vient de Sanity, comme les six autres.
 *
 * Aucune adresse canonique, aucune donnée de partage : la page répond à des
 * adresses qui n'existent pas, il n'y a rien à désigner ni à partager. Next
 * pose lui-même `noindex` sur toute page rendue avec un code 404 — inutile de
 * le répéter ici.
 */
export async function generateMetadata(): Promise<Metadata> {
  const parametres = await lireParametres();
  return { title: textes(parametres).titreOnglet };
}

export default async function PageIntrouvable() {
  const parametres = await lireParametres();
  const contenu = textes(parametres);

  // Les mêmes entrées que le pied de page : le menu, puis ce qui ne figure
  // qu'en bas. Une liste propre à cette page aurait fini par oublier une
  // rubrique ajoutée ailleurs.
  const liens = [...parametres.navPrincipale, ...parametres.navPiedDePage];

  return (
    <html lang="fr" className="h-full antialiased" style={POLICES}>
      <body className="flex min-h-full flex-col">
        <SiteHeader
          nom={parametres.nom}
          navigation={parametres.navPrincipale}
          libelleRendezVous={parametres.libelleRendezVous}
        />
        <main className="flex-1">
          <PageHead eyebrow={contenu.surtitre} title={contenu.titre} lead={contenu.texte}>
            <div className="mt-8 sm:mt-10">
              <Button href="/" size="lg">
                {contenu.libelleRetour}
              </Button>
            </div>
            {/* Une colonne à filets, et non la rangée compacte du pied de
                page : celui-ci porte exactement les mêmes entrées, à deux cents
                pixels d'ici. Répétées à l'identique, elles se lisaient comme un
                pied de page en double ; en liste, elles se lisent comme la
                réponse à la question que pose la page. */}
            <nav aria-label={contenu.titreLiens} className="mt-section max-w-[34ch]">
              <Eyebrow uppercase>{contenu.titreLiens}</Eyebrow>
              <ul className="mt-4">
                {liens.map((lien) => (
                  <li key={lien._key} className="border-t border-line last:border-b">
                    {/* La rangée fait au moins 52 px : la liste est la seule
                        commande de la page avec le bouton, et elle se touche au
                        doigt aussi souvent qu'elle se clique. */}
                    <Link
                      href={lien.chemin}
                      className="flex min-h-[52px] items-center text-body font-medium transition-colors hover:text-azure"
                    >
                      {lien.libelle}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </PageHead>
        </main>
        <SiteFooter nom={parametres.nom} accroche={parametres.accroche} navigation={liens} />
      </body>
    </html>
  );
}

/**
 * Les textes de la page, ou une panne qui se voit.
 *
 * Le champ manque sur un jeu de données rempli avant l'ajout de cette page : la
 * reprise des contenus n'écrase jamais un document existant, elle ne l'ajoutera
 * donc pas au document « Réglages du site » déjà créé. Le cas se règle en
 * quelques secondes dans le Studio — mais il doit se signaler, et à la
 * construction, pas par une page 404 aux titres vides que personne ne relit.
 */
function textes(parametres: ParametresSite): TextesPageIntrouvable {
  if (!parametres.pageIntrouvable) {
    throw new Error(
      "Les textes de la page introuvable sont absents des réglages du site. " +
        "Ouvrez le Studio → Réglages du site → Page introuvable, remplissez les six champs et publiez. " +
        "La reprise des contenus ne les ajoutera pas d'elle-même : elle n'écrit jamais dans un document qui existe déjà.",
    );
  }
  return parametres.pageIntrouvable;
}
