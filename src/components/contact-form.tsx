"use client";

import { useActionState } from "react";
import { envoyerDemande } from "@/app/actions";
import { initialContactState } from "@/lib/contact";
import { offers } from "@/lib/content";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(envoyerDemande, initialContactState);

  if (state.status === "success") {
    return (
      <div className="flex min-h-[520px] flex-col items-center justify-center rounded-2xl border border-line bg-mist/50 p-10 text-center">
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
        <h3 className="mt-6 text-[22px] font-semibold tracking-[-0.02em]">Demande envoyée.</h3>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink/55">
          Nous revenons vers vous sous 24 heures ouvrées avec trois créneaux. Si c&apos;est urgent,
          appelez-nous directement.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="prenom"
          label="Prénom"
          placeholder="Camille"
          errors={state.errors?.prenom}
          defaultValue={state.values?.prenom}
        />
        <Field
          name="nom"
          label="Nom"
          placeholder="Durand"
          errors={state.errors?.nom}
          defaultValue={state.values?.nom}
        />
      </div>

      <Field
        name="email"
        label="Email professionnel"
        placeholder="camille@entreprise.fr"
        type="email"
        errors={state.errors?.email}
        defaultValue={state.values?.email}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="entreprise"
          label="Entreprise"
          placeholder="Nom de la société"
          errors={state.errors?.entreprise}
          defaultValue={state.values?.entreprise}
        />
        <SelectField
          name="effectif"
          label="Effectif"
          options={["20 à 50 salariés", "50 à 100 salariés", "100 à 250 salariés", "Plus de 250"]}
          errors={state.errors?.effectif}
          defaultValue={state.values?.effectif}
        />
      </div>

      <SelectField
        name="sujet"
        label="Sujet"
        options={[...offers.map((o) => o.name), "Je ne sais pas encore"]}
        errors={state.errors?.sujet}
        defaultValue={state.values?.sujet}
      />

      <label className="flex flex-col gap-2">
        <span className="text-[12.5px] font-medium text-ink/60">
          Votre situation en quelques lignes
        </span>
        <textarea
          name="message"
          rows={4}
          placeholder="Ce qui vous prend le plus de temps aujourd'hui, ce que vous avez déjà tenté…"
          defaultValue={state.values?.message}
          className={inputClass(state.errors?.message)}
        />
        <FieldError errors={state.errors?.message} />
      </label>

      {/* Piège à robots : invisible pour les humains, ignoré par les lecteurs d'écran. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Ne pas remplir
          <input type="text" name="site_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3 text-[13px] leading-relaxed text-ink/50">
        <input
          key={state.values?.consentement ?? "vide"}
          type="checkbox"
          name="consentement"
          defaultChecked={state.values?.consentement === "on"}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-[#2f5cff]"
        />
        <span>
          J&apos;accepte d&apos;être recontacté par NOVA Operations au sujet de ma demande. Aucune
          donnée n&apos;est transmise à des tiers.
          <FieldError errors={state.errors?.consentement} />
        </span>
      </label>

      {state.status === "error" && state.message ? (
        <p
          aria-live="polite"
          className="rounded-2xl border border-[#ffb4a2] bg-[#fff5f2] px-4 py-3 text-[13.5px] text-[#b23c17]"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-[14.5px] font-medium text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Envoi en cours…" : "Envoyer ma demande"}
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10m0 0-4-4m4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </svg>
      </button>
    </form>
  );
}

function inputClass(errors?: string[]) {
  return `rounded-2xl border bg-mist/60 px-4 py-3.5 text-[14.5px] text-ink outline-none transition-colors placeholder:text-ink/30 focus:bg-white ${
    errors?.length ? "border-[#e5734f] focus:border-[#e5734f]" : "border-line focus:border-azure"
  }`;
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <span className="mt-1.5 block text-[12.5px] text-[#b23c17]">{errors[0]}</span>;
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  errors,
  defaultValue,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  errors?: string[];
  defaultValue?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12.5px] font-medium text-ink/60">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={errors?.length ? true : undefined}
        className={inputClass(errors)}
      />
      <FieldError errors={errors} />
    </label>
  );
}

function SelectField({
  name,
  label,
  options,
  errors,
  defaultValue,
}: {
  name: string;
  label: string;
  options: string[];
  errors?: string[];
  defaultValue?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12.5px] font-medium text-ink/60">{label}</span>
      <div className="relative">
        <select
          // Remonte le champ quand l'action renvoie une valeur : `defaultValue`
          // n'est appliqué qu'au montage, la sélection serait sinon perdue.
          key={defaultValue ?? "vide"}
          name={name}
          defaultValue={defaultValue ?? ""}
          aria-invalid={errors?.length ? true : undefined}
          className={`w-full appearance-none ${inputClass(errors)}`}
        >
          <option value="" disabled>
            Sélectionner…
          </option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/40"
          aria-hidden="true"
        >
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <FieldError errors={errors} />
    </label>
  );
}
