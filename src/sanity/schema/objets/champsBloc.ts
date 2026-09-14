import { defineField } from "sanity";

/**
 * Le champ que tout bloc partage : pouvoir le retirer de la page sans le
 * supprimer.
 *
 * Masquer plutôt que supprimer est ce qui rend une section réversible. Le bloc
 * garde son contenu, son `_key` et sa position ; il cesse simplement d'être
 * rendu. Le filtrage se fait dans la requête GROQ (`blocs[masque != true]`),
 * donc un bloc masqué ne descend jamais jusqu'au navigateur — y compris en
 * prévisualisation, où « masqué » doit vouloir dire la même chose que sur le
 * site.
 */
export const champMasque = defineField({
  name: "masque",
  title: "Masquer cette section",
  description:
    "La section reste dans le document mais n'apparaît plus sur le site. À préférer à la suppression : rien n'est perdu et le retour en arrière est immédiat.",
  type: "boolean",
  initialValue: false,
});

/**
 * Complète l'aperçu d'un bloc dans la liste des sections.
 *
 * Sans ce suffixe, une section masquée est indiscernable des autres dans le
 * Studio : on la cherche longtemps quand on se demande pourquoi elle n'est pas
 * sur le site.
 */
export function apercuBloc(titre: string, masque?: boolean, sousTitre?: string) {
  return {
    title: masque ? `${titre} — masquée` : titre,
    subtitle: sousTitre,
  };
}
