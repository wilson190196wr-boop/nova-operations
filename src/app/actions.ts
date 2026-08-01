"use server";

import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/lib/content";
import type { ContactState } from "@/lib/contact";

const schema = z.object({
  prenom: z.string().trim().min(1, "Prénom requis"),
  nom: z.string().trim().min(1, "Nom requis"),
  email: z.email("Adresse email invalide"),
  entreprise: z.string().trim().min(1, "Nom de l'entreprise requis"),
  effectif: z.string().trim().min(1, "Sélectionnez un effectif"),
  sujet: z.string().trim().min(1, "Sélectionnez un sujet"),
  message: z.string().trim().min(20, "Décrivez votre situation en quelques lignes (20 caractères minimum)"),
  consentement: z.literal("on", { error: "Votre accord est nécessaire pour vous recontacter" }),
});

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
    effectif: str(formData.get("effectif")),
    sujet: str(formData.get("sujet")),
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante : impossible d'envoyer la demande de contact.");
    return {
      status: "error",
      message: `L'envoi est momentanément indisponible. Écrivez-nous à ${site.email}.`,
      values,
    };
  }

  const d = parsed.data;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.CONTACT_FROM ?? "Site NOVA <site@nova-operations.fr>",
      to: [process.env.CONTACT_TO ?? site.email],
      replyTo: d.email,
      subject: `Demande de diagnostic — ${d.entreprise} (${d.effectif})`,
      text: [
        `${d.prenom} ${d.nom}`,
        `${d.email}`,
        `Entreprise : ${d.entreprise}`,
        `Effectif : ${d.effectif}`,
        `Sujet : ${d.sujet}`,
        "",
        d.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend a refusé l'envoi :", error);
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
