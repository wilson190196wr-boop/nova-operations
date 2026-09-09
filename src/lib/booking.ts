/**
 * Configuration de la prise de rendez-vous Cal.com.
 *
 * Le lien réel est la valeur par défaut : ce n'est pas un secret, et le coder
 * ici évite l'oubli classique — une variable `NEXT_PUBLIC_` est figée dans le
 * bundle au moment de la compilation, donc l'oublier sur l'hébergeur casse la
 * prise de rendez-vous sans erreur visible.
 *
 * NEXT_PUBLIC_CAL_LINK reste disponible pour pointer un autre type
 * d'événement, par exemple sur un environnement de test.
 */
export const calLink = process.env.NEXT_PUBLIC_CAL_LINK ?? "wilson-rault-vclkvp/45min";

/** Namespace de l'embed : isole cette instance si plusieurs embeds cohabitent. */
export const calNamespace = "diagnostic";

/** Couleur de marque appliquée à l'intérieur de l'iframe Cal.com. */
export const calBrandColor = "#2f5cff";
