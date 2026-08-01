/**
 * Types et état initial du formulaire de contact.
 *
 * Volontairement séparés de `src/app/actions.ts` : un fichier « use server »
 * ne peut exporter que des fonctions async. Ce module reste importable
 * depuis le client sans embarquer Zod ni Resend dans le bundle.
 */

export type ContactField =
  | "prenom"
  | "nom"
  | "email"
  | "entreprise"
  | "effectif"
  | "sujet"
  | "message"
  | "consentement";

export type ContactState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<ContactField, string[]>>;
  message?: string;
  /**
   * Valeurs re-servies en `defaultValue` : React réinitialise un formulaire
   * non contrôlé après l'exécution d'une action, la saisie serait sinon perdue
   * à chaque erreur de validation.
   */
  values?: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactState = { status: "idle" };
