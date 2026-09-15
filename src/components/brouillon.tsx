import { quitterPrevisualisation } from "@/app/actions";

/**
 * Le bandeau affiché pendant la prévisualisation des brouillons.
 *
 * Il existe pour une raison précise : le mode brouillon tient à un cookie, et
 * ce cookie survit à la fermeture de l'onglet du Studio. Sans repère visible,
 * on finit par relire le site en brouillon en croyant lire la version
 * publiée — et par corriger deux fois la même chose.
 *
 * La sortie est un bouton dans un formulaire, pas un lien. Un lien serait
 * préchargé par Next au survol, ce qui couperait la prévisualisation avant
 * même qu'on ait cliqué.
 */
export function BandeauBrouillon() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-azure px-4 py-2.5 text-center text-finer text-white">
      <span>
        Prévisualisation des brouillons. Cette page montre le contenu non publié.
      </span>
      <form action={quitterPrevisualisation}>
        <button
          type="submit"
          className="min-h-[32px] rounded-full bg-white px-4 font-medium text-navy transition-colors hover:bg-[#eef1f7]"
        >
          Revenir au site publié
        </button>
      </form>
    </div>
  );
}
