"use server";

import { z } from "zod";
import { site } from "@/lib/content";
import type { ContactState } from "@/lib/contact";

/**
 * « entreprise » et « telephone » sont facultatifs : ils acceptent la chaîne
 * vide que le navigateur envoie pour un champ laissé vide. Tous les autres sont
 * exigés.
 */
const schema = z.object({
  prenom: z.string().trim().min(1, "Prénom requis"),
  nom: z.string().trim().min(1, "Nom requis"),
  email: z.email("Adresse email invalide"),
  entreprise: z.string().trim(),
  telephone: z.string().trim(),
  message: z.string().trim().min(20, "Décrivez votre situation en quelques lignes (20 caractères minimum)"),
  consentement: z.literal("on", { error: "Votre accord est nécessaire pour vous recontacter" }),
});

/**
 * L'API transactionnelle de Brevo, appelée directement en `fetch`.
 *
 * Brevo publie un SDK, mais pour un seul appel il apporterait une dépendance et
 * ses propres ennuis de typage sans rien simplifier : la requête tient en
 * quinze lignes.
 *
 * `fetch` n'est pas mis en cache par défaut dans cette version de Next, et un
 * POST ne l'est de toute façon jamais — aucune option de cache à préciser.
 */
const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

export async function envoyerDemande(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Piège à robots : ce champ est masqué, un humain ne le remplit jamais.
  if (formData.get("site_web")) {
    return { status: "success" };
  }

  const parsed = schema.safeParse(Object.fromEntries(formData));

  // Saisie renvoyée telle quelle pour repeupler le formulaire en cas d'échec.
  const values: ContactState["values"] = {
    prenom: str(formData.get("prenom")),
    nom: str(formData.get("nom")),
    email: str(formData.get("email")),
    entreprise: str(formData.get("entreprise")),
    telephone: str(formData.get("telephone")),
    message: str(formData.get("message")),
    consentement: str(formData.get("consentement")),
  };

  if (!parsed.success) {
    return {
      status: "error",
      errors: z.flattenError(parsed.error).fieldErrors,
      message: "Quelques champs demandent une correction.",
      values,
    };
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY manquante : impossible d'envoyer la demande de contact.");
    return {
      status: "error",
      message: `L'envoi est momentanément indisponible. Écrivez-nous à ${site.email}.`,
      values,
    };
  }

  const d = parsed.data;

  // L'expéditeur doit être un expéditeur validé dans Brevo, ou une adresse d'un
  // domaine authentifié chez eux. À défaut, c'est l'adresse du site.
  const expediteur = {
    name: process.env.CONTACT_FROM_NAME ?? `Site ${site.name}`,
    email: process.env.CONTACT_FROM_EMAIL ?? site.email,
  };

  try {
    const reponse = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: expediteur,
        // À défaut de CONTACT_TO, les demandes partent vers l'adresse affichée
        // sur le site : une seule source, donc pas de divergence possible entre
        // ce qu'un visiteur lit et l'endroit où son message arrive.
        to: [{ email: process.env.CONTACT_TO ?? site.email }],
        // Répondre au courriel répond au visiteur, pas au site.
        replyTo: { email: d.email, name: `${d.prenom} ${d.nom}` },
        // L'entreprise complète l'objet quand elle est renseignée : sans elle,
        // l'objet resterait le même pour deux homonymes.
        subject: d.entreprise
          ? `Demande de contact — ${d.prenom} ${d.nom} (${d.entreprise})`
          : `Demande de contact — ${d.prenom} ${d.nom}`,
        textContent: [
          `${d.prenom} ${d.nom}`,
          `${d.email}`,
          d.telephone ? `Téléphone : ${d.telephone}` : null,
          d.entreprise ? `Entreprise : ${d.entreprise}` : null,
          "",
          d.message,
        ]
          .filter((ligne) => ligne !== null)
          .join("\n"),
      }),
    });

    if (!reponse.ok) {
      // Le corps d'erreur de Brevo nomme la cause — expéditeur non validé, clé
      // invalide, quota dépassé. Il part dans les journaux du serveur, jamais
      // vers le visiteur.
      console.error(
        `Brevo a refusé l'envoi (${reponse.status}) :`,
        await reponse.text().catch(() => "corps illisible"),
      );
      return {
        status: "error",
        message: `L'envoi a échoué. Réessayez ou écrivez-nous à ${site.email}.`,
        values,
      };
    }
  } catch (error) {
    console.error("Erreur réseau lors de l'envoi de la demande de contact :", error);
    return {
      status: "error",
      message: `L'envoi a échoué. Réessayez ou écrivez-nous à ${site.email}.`,
      values,
    };
  }

  return { status: "success" };
}

function str(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value : "";
}
