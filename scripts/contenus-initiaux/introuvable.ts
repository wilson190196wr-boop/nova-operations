/**
 * Les textes de la page introuvable.
 *
 * Contrairement aux autres fichiers de ce dossier, ceux-ci ne viennent de
 * nulle part : le site n'avait pas de page 404 avant, et servait celle de
 * Next — en anglais, sans en-tête ni pied de page. Ils sont donc écrits ici
 * pour la première fois, et c'est la seule raison pour laquelle ce dossier
 * contient une phrase qui n'existait pas dans le site d'origine.
 *
 * Ils ne sont qu'un point de départ : une fois repris dans Sanity, ils se
 * modifient depuis « Réglages du site → Page introuvable ».
 */
export const pageIntrouvable = {
  surtitre: "Erreur 404",
  titre: "Cette page n'existe pas.",
  texte:
    "Le lien est peut-être incomplet, ou la page a changé d'adresse. Les pages du site sont listées ci-dessous.",
  libelleRetour: "Retour à l'accueil",
  titreLiens: "Les pages du site",
  /**
   * Écrit en entier, suffixe compris : c'est la règle des six autres titres,
   * qui sont publiés tels quels sans passer par un gabarit.
   */
  titreOnglet: "Page introuvable · KELERIA",
};
