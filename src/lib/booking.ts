/**
 * Configuration de la prise de rendez-vous Cal.com.
 *
 * NEXT_PUBLIC_CAL_LINK : identifiant public du type d'événement,
 * au format "<équipe-ou-utilisateur>/<event-type>".
 * Exemple : "nova-operations/diagnostic-45min"
 */
export const calLink = process.env.NEXT_PUBLIC_CAL_LINK ?? "nova-operations/diagnostic-45min";

/** Namespace de l'embed : isole cette instance si plusieurs embeds cohabitent. */
export const calNamespace = "diagnostic";

/** Couleur de marque appliquée à l'intérieur de l'iframe Cal.com. */
export const calBrandColor = "#2f5cff";
