import type { Metadata } from "next";
import { Sections } from "@/components/blocs/registre";
import { DonneesStructurees } from "@/components/structured-data";
import { metadonnees } from "@/lib/seo";
import { graphePersonne } from "@/lib/structured-data";
import { lirePage, lireParametres } from "@/sanity/lire";

const ROUTE = "/a-propos";

export function generateMetadata(): Promise<Metadata> {
  return metadonnees(ROUTE);
}

export default async function APropos() {
  const [page, parametres] = await Promise.all([lirePage(ROUTE), lireParametres()]);

  /**
   * Le balisage Person décrit ce que la page affiche, et rien de plus : le nom
   * et le rôle sont pris dans le bloc de présentation lui-même, jamais dans
   * une seconde saisie qui pourrait le contredire. Sans ce bloc, pas de
   * balisage — plutôt qu'un balisage qui affirmerait ce que la page ne montre
   * pas.
   */
  const presentation = page.blocs.find((bloc) => bloc._type === "blocIntroFondateur");

  return (
    <>
      {presentation ? (
        <DonneesStructurees
          noeuds={graphePersonne({ nom: presentation.nom, role: presentation.role })}
        />
      ) : null}
      <Sections blocs={page.blocs} parametres={parametres} />
    </>
  );
}
