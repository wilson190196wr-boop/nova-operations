import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { ETIQUETTE_CONTENU } from "@/sanity/lire";

/**
 * Le point d'entrée appelé par Sanity à chaque publication.
 *
 * C'est la pièce qui fait qu'une publication se voit sur le site sans
 * redéploiement. Les six pages sont pré-rendues et servies depuis le cache ;
 * sans ce signal, elles ne changeraient jamais.
 *
 * Trois choix méritent d'être expliqués.
 *
 * La signature est vérifiée, et seul un `true` franc passe : `parseBody`
 * renvoie `null` quand l'en-tête de signature est absent, ce qu'un test de
 * fausseté laisserait filer. Un secret est donc obligatoire — sans lui,
 * n'importe qui pourrait déclencher des régénérations en boucle.
 *
 * `parseBody` attend trois secondes avant de rendre la main : l'entrepôt de
 * contenu de Sanity est à cohérence différée, et invalider trop tôt ferait
 * relire l'ancienne version. C'est l'essentiel du délai entre « Publier » et
 * « visible ».
 *
 * `{ expire: 0 }` demande une expiration franche plutôt que le
 * « périmé pendant la revalidation » par défaut. Avec ce dernier, le premier
 * visiteur après une publication verrait encore l'ancienne page — y compris
 * l'éditeur qui vient de publier et va vérifier. Le coût est une seule requête
 * plus lente ; sur un site de six pages, c'est le bon échange.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();

  if (!secret) {
    console.error("SANITY_REVALIDATE_SECRET manquant : la revalidation est refusée.");
    return Response.json(
      { message: "Revalidation non configurée sur ce serveur." },
      { status: 500 },
    );
  }

  let signatureValide: boolean | null;
  let corps: { _type?: string; _id?: string } | null;

  try {
    const analyse = await parseBody<{ _type?: string; _id?: string }>(request, secret);
    signatureValide = analyse.isValidSignature;
    corps = analyse.body;
  } catch (error) {
    console.error("Corps de webhook illisible :", error);
    return Response.json({ message: "Corps illisible." }, { status: 400 });
  }

  // `null` signifie « pas de signature du tout » : à rejeter comme un faux.
  if (signatureValide !== true) {
    return Response.json({ message: "Signature invalide." }, { status: 401 });
  }

  if (!corps?._type) {
    return Response.json({ message: "Charge utile sans type de document." }, { status: 400 });
  }

  revalidateTag(ETIQUETTE_CONTENU, { expire: 0 });

  return Response.json({
    revalide: true,
    etiquette: ETIQUETTE_CONTENU,
    type: corps._type,
    document: corps._id ?? null,
  });
}
