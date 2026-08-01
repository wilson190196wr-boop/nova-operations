import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Container, Eyebrow } from "@/components/ui";
import { faq, offers, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — réserver un diagnostic de 45 minutes",
  description:
    "Échangez 45 minutes avec NOVA Operations pour identifier vos trois principales pertes opérationnelles. Sans engagement.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-[128px] pb-24 lg:pt-[168px] lg:pb-32">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-50 mask-fade-b" />
        <div
          className="pointer-events-none absolute -right-32 top-0 h-[520px] w-[520px] rounded-full blur-[140px] animate-sheen"
          style={{ background: "radial-gradient(circle, rgba(47,92,255,0.15), transparent 70%)" }}
        />

        <Container className="relative">
          <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            {/* Left */}
            <div>
              <Reveal>
                <Eyebrow>Contact</Eyebrow>
                <h1
                  className="mt-6 text-[clamp(2.3rem,5.4vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
                  style={{ textWrap: "balance" }}
                >
                  45 minutes pour savoir où partent vos heures.
                </h1>
                <p className="mt-7 max-w-lg text-[17.5px] leading-[1.65] text-ink/60">
                  Un échange cadré, sans slide de vente. Vous décrivez votre organisation, nous
                  identifions les trois pertes les plus probables et nous vous disons franchement
                  si une mission se justifie.
                </p>
              </Reveal>

              <Reveal delay={100} className="mt-12">
                <ul className="flex flex-col gap-px overflow-hidden rounded-2xl border border-line bg-line">
                  {[
                    ["01", "Vous décrivez", "Activité, effectif, outils en place, irritants ressentis."],
                    ["02", "Nous cadrons", "Trois hypothèses de perte, chiffrées à la louche mais argumentées."],
                    ["03", "Vous décidez", "Un audit, un simple conseil, ou rien du tout. Sans relance commerciale."],
                  ].map(([n, t, d]) => (
                    <li key={n} className="flex gap-6 bg-white px-6 py-6">
                      <span className="font-mono text-[12px] text-ink/30">{n}</span>
                      <div>
                        <p className="text-[15.5px] font-medium">{t}</p>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-ink/50">{d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={160} className="mt-12">
                <dl className="grid gap-6 sm:grid-cols-3">
                  {[
                    ["Email", site.email],
                    ["Téléphone", site.phone],
                    ["Adresse", site.address],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[11.5px] uppercase tracking-[0.14em] text-ink/40">
                        {label}
                      </dt>
                      <dd className="mt-2 text-[14.5px] leading-snug text-ink/75">{value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal delay={120}>
              <div className="rounded-3xl border border-line bg-white p-8 shadow-[0_40px_90px_-50px_rgba(8,9,12,0.45)] lg:p-10">
                <div className="flex items-center justify-between">
                  <p className="text-[11.5px] uppercase tracking-[0.16em] text-ink/40">
                    Demande de diagnostic
                  </p>
                  <span className="flex items-center gap-2 text-[12.5px] text-ink/45">
                    <span className="h-1.5 w-1.5 rounded-full bg-azure" />
                    Réponse sous 24 h
                  </span>
                </div>

                <form className="mt-8 flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Prénom" placeholder="Camille" />
                    <Field label="Nom" placeholder="Durand" />
                  </div>
                  <Field label="Email professionnel" placeholder="camille@entreprise.fr" type="email" />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Entreprise" placeholder="Nom de la société" />
                    <SelectField
                      label="Effectif"
                      options={["20 à 50 salariés", "50 à 100 salariés", "100 à 250 salariés", "Plus de 250"]}
                    />
                  </div>
                  <SelectField
                    label="Sujet"
                    options={[...offers.map((o) => o.name), "Je ne sais pas encore"]}
                  />

                  <label className="flex flex-col gap-2">
                    <span className="text-[12.5px] font-medium text-ink/60">
                      Votre situation en quelques lignes
                    </span>
                    <textarea
                      rows={4}
                      placeholder="Ce qui vous prend le plus de temps aujourd'hui, ce que vous avez déjà tenté…"
                      className="resize-none rounded-2xl border border-line bg-mist/60 px-4 py-3.5 text-[14.5px] text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-azure focus:bg-white"
                    />
                  </label>

                  <label className="flex items-start gap-3 text-[13px] leading-relaxed text-ink/50">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-[#2f5cff]"
                    />
                    J&apos;accepte d&apos;être recontacté par NOVA Operations au sujet de ma
                    demande. Aucune donnée n&apos;est transmise à des tiers.
                  </label>

                  <button
                    type="button"
                    className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-[14.5px] font-medium text-white transition-colors hover:bg-navy"
                  >
                    Réserver mes 45 minutes
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
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-mist py-24 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <Eyebrow>Avant de nous écrire</Eyebrow>
              <h2 className="mt-5 text-[clamp(1.7rem,3.4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
                Les réponses aux questions les plus fréquentes.
              </h2>
            </Reveal>
            <div>
              {faq.map((item, i) => (
                <Reveal key={item.q} delay={i * 60} className="border-t border-line py-7 last:border-b">
                  <h3 className="text-[17px] font-medium tracking-[-0.01em]">{item.q}</h3>
                  <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-ink/55">{item.a}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12.5px] font-medium text-ink/60">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="rounded-2xl border border-line bg-mist/60 px-4 py-3.5 text-[14.5px] text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-azure focus:bg-white"
      />
    </label>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12.5px] font-medium text-ink/60">{label}</span>
      <div className="relative">
        <select
          defaultValue=""
          className="w-full appearance-none rounded-2xl border border-line bg-mist/60 px-4 py-3.5 text-[14.5px] text-ink outline-none transition-colors focus:border-azure focus:bg-white"
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
    </label>
  );
}
