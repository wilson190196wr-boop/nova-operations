"use client";

import Link from "next/link";
import { useActionState } from "react";
import { envoyerDemande } from "@/app/actions";
import { initialContactState } from "@/lib/contact";

/**
 * Le formulaire de contact.
 *
 * Prénom et Nom ne figurent pas dans la maquette, mais ils sont conservés : la
 * validation serveur les exige, ils composent l'objet du courriel et l'adresse
 * de réponse. Supprimer les champs aurait cassé l'envoi.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(envoyerDemande, initialContactState);

  if (state.status === "success") {
    return (
      <div className="mt-6 flex min-h-[420px] flex-col items-center justify-center rounded-tier bg-sand p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-azure/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m6 12.5 4 4 8-9"
              stroke="#2f5cff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="mt-6 text-[1.375rem] font-semibold tracking-[-0.03em]">
          Message bien reçu.
        </h3>
        <p className="mt-3 max-w-sm text-fine leading-[1.58] text-ink-70">
          Je vous réponds sous 24 heures ouvrées. Si c&apos;est urgent, appelez-moi.
        </p>
      </div>
    );
  }

  return (
    /**
     * `required` et `noValidate` ensemble, volontairement : l'attribut annonce
     * le caractère obligatoire aux lecteurs d'écran, tandis que `noValidate`
     * empêche le navigateur d'afficher ses propres bulles. Les messages
     * viennent donc tous de la validation serveur, dans une seule langue et un
     * seul style — mais l'information d'accessibilité n'est plus perdue.
     */
    <form action={formAction} noValidate>
      <Field
        name="prenom"
        label="Prénom"
        autoComplete="given-name"
        required
        errors={state.errors?.prenom}
        defaultValue={state.values?.prenom}
      />
      <Field
        name="nom"
        label="Nom"
        autoComplete="family-name"
        required
        errors={state.errors?.nom}
        defaultValue={state.values?.nom}
      />
      <Field
        name="email"
        label="Email professionnel"
        type="email"
        autoComplete="email"
        required
        errors={state.errors?.email}
        defaultValue={state.values?.email}
      />
      <Field
        name="entreprise"
        label="Entreprise (facultatif)"
        autoComplete="organization"
        errors={state.errors?.entreprise}
        defaultValue={state.values?.entreprise}
      />
      <Field
        name="telephone"
        label="Téléphone (facultatif)"
        type="tel"
        autoComplete="tel"
        errors={state.errors?.telephone}
        defaultValue={state.values?.telephone}
      />

      <div className="mt-[1.125rem] grid gap-[0.4375rem]">
        <label htmlFor="message" className="text-finer font-medium">
          Votre situation en quelques lignes
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={state.values?.message}
          aria-invalid={state.errors?.message?.length ? true : undefined}
          className={`min-h-[120px] resize-y ${inputClass(state.errors?.message)}`}
        />
        <FieldError errors={state.errors?.message} />
      </div>

      {/* Piège à robots : invisible pour les humains, ignoré par les lecteurs d'écran. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)]">
        <label htmlFor="site_web">Ne pas remplir</label>
        <input id="site_web" type="text" name="site_web" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="mt-5 flex items-start gap-3 text-finer leading-[1.5] text-ink-70">
        <input
          key={state.values?.consentement ?? "vide"}
          id="consentement"
          type="checkbox"
          name="consentement"
          required
          defaultChecked={state.values?.consentement === "on"}
          className="mt-[0.15rem] h-5 w-5 shrink-0 accent-azure"
        />
        {/* La phrase « aucune donnée n'est transmise à des tiers » a été
            retirée : l'acheminement passe par Brevo, et la prise de rendez-vous
            par Cal.com. Le consentement ne porte plus que sur le rappel. */}
        <label htmlFor="consentement">
          J&apos;accepte d&apos;être recontacté par KELERIA au sujet de ma demande.
          <FieldError errors={state.errors?.consentement} />
        </label>
      </p>

      {/* Mention séparée de la case : l'information sur l'usage des données ne
          doit pas être incluse dans ce que l'on coche. */}
      <p className="mt-3 text-finer leading-[1.5] text-ink-55">
        Pour savoir comment vos informations sont utilisées, consultez les{" "}
        <Link href="/mentions-legales" className="underline underline-offset-4 hover:text-azure">
          mentions légales
        </Link>
        .
      </p>

      {state.status === "error" && state.message ? (
        <p
          aria-live="polite"
          className="mt-4 rounded-tier border border-[#ffb4a2] bg-[#fff5f2] px-4 py-3 text-finer text-[#b23c17]"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-navy px-6 text-fine font-medium text-white transition-colors hover:bg-[#0b1c3d] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}

function inputClass(errors?: string[]) {
  return `w-full rounded-[14px] border bg-sand px-[0.9375rem] py-[0.8125rem] text-fine text-ink outline-none transition-colors placeholder:text-ink-55/60 ${
    errors?.length ? "border-[#e5734f]" : "border-line"
  }`;
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <span className="mt-1.5 block text-finer text-[#b23c17]">{errors[0]}</span>;
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  required = false,
  errors,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  errors?: string[];
  defaultValue?: string;
}) {
  return (
    <div className="mt-[1.125rem] grid gap-[0.4375rem]">
      <label htmlFor={name} className="text-finer font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        aria-invalid={errors?.length ? true : undefined}
        className={`min-h-12 ${inputClass(errors)}`}
      />
      <FieldError errors={errors} />
    </div>
  );
}
