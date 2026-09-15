import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import "../globals.css";
import { BandeauBrouillon } from "@/components/brouillon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteUrl } from "@/lib/seo";
import { lireParametres } from "@/sanity/lire";
import { SanityLive } from "@/sanity/live";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Seule `metadataBase` est posée ici : c'est une donnée de déploiement,
 * partagée par toutes les pages. Titres et descriptions viennent de Sanity,
 * page par page — y compris pour l'accueil, qui les portait auparavant dans
 * cette mise en page et faisait de lui la seule route sans `metadata` propre.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

/**
 * La mise en page du site public.
 *
 * Le Studio a sa propre racine, hors de ce groupe : il ne doit hériter ni de
 * `globals.css`, dont les règles de base réécrivent la couleur des liens et la
 * sélection de texte, ni de l'en-tête, ni du pied de page.
 *
 * `draftMode()` est lu ici sans rendre la page dynamique : Next ne compte comme
 * accès dynamique que `enable()` et `disable()`, pas la lecture de l'état. Les
 * six pages restent donc pré-rendues comme avant. Hors prévisualisation, les
 * trois composants de fin ne produisent rien du tout dans le HTML.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [parametres, brouillon] = await Promise.all([lireParametres(), draftMode()]);

  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      {/* Le fond sable est déjà posé sur `body` dans globals.css ; le laisser
          aussi ici en `bg-white` le recouvrait. */}
      <body className="flex min-h-full flex-col">
        <SiteHeader
          nom={parametres.nom}
          navigation={parametres.navPrincipale}
          libelleRendezVous={parametres.libelleRendezVous}
        />
        <main className="flex-1">{children}</main>
        <SiteFooter
          nom={parametres.nom}
          accroche={parametres.accroche}
          navigation={[...parametres.navPrincipale, ...parametres.navPiedDePage]}
        />
        {brouillon.isEnabled ? (
          <>
            <BandeauBrouillon />
            {/* Le pont d'édition visuelle : il relie chaque texte affiché au
                champ qui le porte, et n'est chargé qu'en prévisualisation. */}
            <VisualEditing />
            {/* Le canal temps réel de Sanity, lui aussi réservé à la
                prévisualisation. Le site public n'ouvre aucune connexion vers
                un tiers — c'est ce que disent ses mentions légales, et la mise
                sous CMS ne doit pas rendre cette phrase fausse. */}
            <SanityLive />
          </>
        ) : null}
      </body>
    </html>
  );
}
