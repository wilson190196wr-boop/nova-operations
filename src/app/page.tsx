import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Button, Container, Eyebrow, SectionHead, CTABand } from "@/components/ui";
import { MaturityBars, MaturityRadar } from "@/components/maturity-radar";
import { PhotoFrame } from "@/components/photo-frame";
import { officePhotos } from "@/lib/photos";
import { articles, cases, differentiators, offers, pillars, promises, sectors } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Problem />
      <Positioning />
      <Workplace />
      <Offers />
      <Method />
      <Results />
      <CasesPreview />
      <Difference />
      <Journal />
      <CTABand />
    </>
  );
}

/* ------------------------------------------------------------------ Hero */

function Hero() {
  return (
    <section className="relative overflow-hidden pt-[132px] pb-24 lg:pt-[180px] lg:pb-32">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60 mask-fade-b" />
      <div
        className="pointer-events-none absolute -left-40 top-10 h-[560px] w-[560px] rounded-full blur-[150px] animate-sheen"
        style={{ background: "radial-gradient(circle, rgba(47,92,255,0.18), transparent 68%)" }}
      />
      <div
        className="pointer-events-none absolute -right-20 top-52 h-[420px] w-[420px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(10,26,61,0.12), transparent 70%)" }}
      />

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 px-4 py-1.5 text-[12.5px] font-medium text-ink/65 backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-azure" />
                </span>
                Fractional COO · Performance Partner
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1
                className="mt-8 text-[clamp(2.6rem,6.4vw,4.75rem)] font-semibold leading-[0.99] tracking-[-0.045em]"
                style={{ textWrap: "balance" }}
              >
                Nous trouvons les{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">heures perdues</span>
                  <span className="absolute inset-x-0 bottom-1.5 z-0 h-3 bg-azure/20" />
                </span>{" "}
                de votre entreprise.
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-8 max-w-xl text-[18px] leading-[1.62] text-ink/60">
                Les PME perdent chaque semaine des dizaines d&apos;heures en processus
                inefficaces, doubles saisies et outils mal exploités. Nous identifions ces
                pertes, définissons une feuille de route pragmatique et pilotons sa mise en
                œuvre — jusqu&apos;au résultat mesuré.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button href="/contact">Obtenir un diagnostic</Button>
                <Button href="/methode" variant="ghost">
                  La méthode NOVA OS™
                </Button>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <dl className="mt-16 grid max-w-lg grid-cols-3 gap-8 border-t border-line pt-8">
                {[
                  { v: "40+", l: "PME accompagnées" },
                  { v: "18 M€", l: "de gains identifiés" },
                  { v: "11 j", l: "avant le 1er Quick Win" },
                ].map((s) => (
                  <div key={s.l}>
                    <dt className="text-[26px] font-semibold tracking-[-0.03em]">{s.v}</dt>
                    <dd className="mt-1 text-[13px] leading-snug text-ink/50">{s.l}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={180} className="relative">
            <HeroPanel />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function HeroPanel() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[32px] opacity-70 blur-2xl"
        style={{
          background: "radial-gradient(60% 60% at 50% 40%, rgba(47,92,255,0.16), transparent 75%)",
        }}
      />

      <div className="relative overflow-hidden rounded-3xl border border-line bg-white shadow-[0_40px_80px_-40px_rgba(8,9,12,0.35)]">
        <div className="flex items-center justify-between border-b border-line bg-mist/70 px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/40">
              Diagnostic NOVA OS™
            </p>
            <p className="mt-1 text-[14px] font-medium">Fabrication métallique · 140 salariés</p>
          </div>
          <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-medium text-white">
            Score 46/100
          </span>
        </div>

        <div className="px-6 py-7">
          <MaturityBars />
        </div>

        <div className="grid grid-cols-2 gap-px border-t border-line bg-line">
          <div className="bg-white px-6 py-6">
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink/40">
              Heures récupérables
            </p>
            <p className="mt-2 text-[28px] font-semibold tracking-[-0.03em]">4 180 h</p>
            <p className="mt-1 text-[12.5px] text-ink/45">par an, valorisées 168 k€</p>
          </div>
          <div className="bg-white px-6 py-6">
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink/40">ROI estimé</p>
            <p className="mt-2 text-[28px] font-semibold tracking-[-0.03em] text-azure">×6,2</p>
            <p className="mt-1 text-[12.5px] text-ink/45">sur 12 mois</p>
          </div>
        </div>
      </div>

      <div className="animate-float absolute -bottom-20 left-6 hidden max-w-[280px] rounded-2xl border border-line bg-white px-5 py-4 shadow-[0_24px_50px_-24px_rgba(8,9,12,0.35)] sm:block">
        <p className="text-[11px] uppercase tracking-[0.14em] text-ink/40">Quick Win #1</p>
        <p className="mt-1.5 text-[14px] font-medium">Relances client automatisées</p>
        <p className="mt-1 text-[12.5px] text-azure">+11 j de trésorerie · déployé en 6 jours</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ Trust strip */

function TrustStrip() {
  const items = [
    "Industrie",
    "BTP",
    "Fabrication",
    "Logistique",
    "Ingénierie",
    "Cabinets comptables",
    "Architecture",
    "Ressources humaines",
  ];
  return (
    <section className="border-y border-line bg-mist py-7">
      <Container className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <p className="shrink-0 text-[12px] uppercase tracking-[0.18em] text-ink/40">
          PME de 20 à 250 salariés
        </p>
        <div className="mask-fade-x relative flex-1 overflow-hidden">
          <div className="animate-marquee flex w-max gap-10">
            {[...items, ...items].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex items-center gap-10 whitespace-nowrap text-[15px] font-medium text-ink/35"
              >
                {item}
                <span className="h-1 w-1 rounded-full bg-ink/20" />
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- Problem */

function Problem() {
  const leaks = [
    {
      h: "12 h",
      t: "Ressaisies et recopies",
      d: "Les mêmes données circulent d'un outil à l'autre, à la main.",
    },
    {
      h: "8 h",
      t: "Recherche d'information",
      d: "Trouver le bon fichier, la bonne version, la bonne personne.",
    },
    {
      h: "6 h",
      t: "Relances et allers-retours",
      d: "Validations, pièces manquantes, corrections en cascade.",
    },
    {
      h: "5 h",
      t: "Reporting manuel",
      d: "Des tableurs consolidés à la main, périmés dès leur publication.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="grid-lines-dark pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead
            tone="light"
            eyebrow="Le constat"
            title={<>31 heures par semaine s&apos;évaporent dans une PME de 100 salariés.</>}
            intro="Elles n'apparaissent nulle part dans vos comptes. Elles sont dans les plannings, dans les boîtes mail, dans les tableurs de reprise. Elles coûtent pourtant plusieurs points de marge chaque année."
          />

          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
            {leaks.map((leak, i) => (
              <Reveal key={leak.t} delay={i * 70} className="bg-ink p-7">
                <p className="font-mono text-[30px] font-medium tracking-[-0.04em] text-azure-light">
                  {leak.h}
                </p>
                <p className="mt-4 text-[15.5px] font-medium">{leak.t}</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/45">{leak.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------ Positioning */

function Positioning() {
  return (
    <section className="border-b border-line py-24 lg:py-32">
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Positionnement</Eyebrow>
          </div>
          <p
            className="mt-8 text-[clamp(1.8rem,4.2vw,3rem)] font-semibold leading-[1.15] tracking-[-0.035em]"
            style={{ textWrap: "balance" }}
          >
            Nous ne vendons pas de l&apos;IA.{" "}
            <span className="text-ink/35">
              Nous vendons des points de marge, du temps retrouvé et une exécution plus fluide.
            </span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------- Workplace */

function Workplace() {
  const { lead, secondary } = officePhotos;

  return (
    <section className="border-b border-line bg-mist py-24 lg:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="Au contact des équipes"
            title="Nous nous installons chez vous, pas dans une salle de projet."
            intro="Une mission NOVA se passe dans vos bureaux, aux côtés des personnes qui exécutent les processus tous les jours. Ce sont elles qui savent où le temps se perd — encore faut-il aller le leur demander."
          />
          <Reveal delay={120}>
            <Button href="/cas-clients" variant="ghost">
              Voir nos missions
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-[1.32fr_0.68fr]">
          <Reveal>
            <PhotoFrame
              photo={lead}
              overlay="scrim"
              className="h-full min-h-[380px] lg:min-h-[540px]"
              sizes="(max-width: 1024px) 100vw, 62vw"
              priority
            />
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {secondary.map((photo, i) => (
              <Reveal key={photo.src} delay={100 + i * 90} className="h-full">
                <div className="relative h-full">
                  <PhotoFrame
                    photo={photo}
                    className="h-full min-h-[220px] lg:min-h-[260px]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
                  />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-medium text-ink backdrop-blur">
                    {photo.caption}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------------- Offers */

function Offers() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="Nos offres"
            title="Quatre façons de travailler ensemble."
            intro="Un parcours continu : comprendre, exécuter, piloter — et déléguer la technique quand elle devient nécessaire."
          />
          <Reveal delay={120}>
            <Button href="/offres" variant="ghost">
              Voir le détail des offres
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-2">
          {offers.map((offer, i) => (
            <Reveal
              key={offer.slug}
              delay={i * 80}
              className="group relative bg-white p-9 transition-colors duration-500 hover:bg-mist lg:p-11"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[12px] text-ink/30">{offer.step}</span>
                  <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.03em]">{offer.name}</h3>
                  <p className="mt-2 text-[15px] text-azure">{offer.tagline}</p>
                </div>
                <span className="shrink-0 rounded-full border border-line px-3 py-1 text-[11.5px] text-ink/45">
                  {offer.duration}
                </span>
              </div>

              <p className="mt-6 max-w-md text-[15px] leading-[1.65] text-ink/60">
                {offer.description}
              </p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {offer.deliverables.slice(0, 4).map((d) => (
                  <li
                    key={d}
                    className="rounded-full bg-mist px-3.5 py-1.5 text-[12.5px] text-ink/60 transition-colors group-hover:bg-white"
                  >
                    {d}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
                <span className="text-[13px] text-ink/45">{offer.price}</span>
                <Link
                  href="/offres"
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink transition-colors hover:text-azure"
                >
                  En savoir plus
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8h10m0 0-4-4m4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------------- Method */

function Method() {
  return (
    <section className="border-y border-line bg-mist py-24 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <SectionHead
              eyebrow="Méthode NOVA OS™"
              title="Six piliers, un score, une feuille de route."
              intro="Chaque mission commence par une mesure objective. Le score de maturité rend visible ce qui bloque, hiérarchise les chantiers et sert de référence pour mesurer les progrès."
            />

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {pillars.map((pillar, i) => (
                <Reveal key={pillar.id} delay={i * 60} className="bg-white p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[15.5px] font-medium">{pillar.name}</h3>
                    <span className="font-mono text-[13px] text-ink/35">{pillar.score}</span>
                  </div>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink/50">
                    {pillar.description}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200} className="mt-10">
              <Button href="/methode" variant="ghost">
                Comment se déroule une mission
              </Button>
            </Reveal>
          </div>

          <Reveal delay={140} className="flex justify-center">
            <div className="w-full max-w-md rounded-3xl border border-line bg-white p-8 shadow-[0_40px_80px_-50px_rgba(8,9,12,0.4)]">
              <p className="text-[11px] uppercase tracking-[0.16em] text-ink/40">
                Profil de maturité
              </p>
              <div className="mt-4 flex justify-center">
                <MaturityRadar />
              </div>
              <p className="mt-4 border-t border-line pt-5 text-[13.5px] leading-relaxed text-ink/50">
                Un profil typique de PME industrielle : le pilotage tient, l&apos;automatisation
                et l&apos;IA restent inexploitées. C&apos;est précisément là que se trouvent les
                gains les plus rapides.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- Results */

function Results() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHead
          align="center"
          eyebrow="Nos promesses"
          title="Des engagements chiffrés, pas des intentions."
          intro="Chaque chantier est évalué avant, pendant et après. Ce qui ne se mesure pas ne se lance pas."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((item, i) => (
            <Reveal key={item.label} delay={i * 80} className="bg-white p-9">
              <p className="text-[clamp(2rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] text-azure">
                {item.value}
              </p>
              <p className="mt-3 text-[15px] font-medium leading-snug">{item.label}</p>
              <p className="mt-2 text-[13px] text-ink/45">{item.note}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            "Réduire les tâches sans valeur ajoutée",
            "Simplifier et accélérer les flux",
            "Mesurer le ROI de chaque chantier",
          ].map((p) => (
            <div key={p} className="flex items-center gap-3 rounded-2xl bg-mist px-6 py-5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="7.25" stroke="#2f5cff" strokeWidth="1.25" />
                <path
                  d="M5 8.2l2.1 2.1L11 6.4"
                  stroke="#2f5cff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[14.5px] text-ink/70">{p}</span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------- Cases + sectors */

function CasesPreview() {
  return (
    <section className="border-y border-line bg-mist py-24 lg:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead eyebrow="Cas clients" title="Ce que ça donne sur le terrain." />
          <Reveal delay={100}>
            <Button href="/cas-clients" variant="ghost">
              Tous les cas clients
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {cases.slice(0, 3).map((item, i) => (
            <Reveal key={item.slug} delay={i * 90}>
              <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgba(8,9,12,0.4)]">
                <p className="text-[12px] uppercase tracking-[0.14em] text-ink/40">{item.sector}</p>
                <h3 className="mt-4 text-[19.5px] font-semibold leading-[1.28] tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink/55">
                  {item.context}
                </p>
                <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-line pt-6">
                  {item.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="text-[17px] font-semibold tracking-[-0.02em] text-azure">
                        {m.value}
                      </dt>
                      <dd className="mt-1 text-[11.5px] leading-tight text-ink/45">{m.label}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140} className="mt-6 flex flex-wrap gap-2">
          {sectors.map((s) => (
            <Link
              key={s.name}
              href="/secteurs"
              className="rounded-full border border-line bg-white px-4 py-2 text-[13px] text-ink/60 transition-colors hover:border-ink/30 hover:text-ink"
            >
              {s.name}
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------- Difference */

function Difference() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHead
          eyebrow="Différenciation"
          title="Un cabinet de conseil s'arrête à la recommandation. Nous, on reste."
          intro="Nous auditons, nous proposons une feuille de route, nous pilotons les projets, nous coordonnons les partenaires, nous mesurons les résultats — et nous accompagnons dans la durée."
        />

        <div className="mt-14 overflow-hidden rounded-3xl border border-line">
          {differentiators.map((row, i) => (
            <Reveal
              key={row.us}
              delay={i * 70}
              className={`grid gap-6 p-8 md:grid-cols-2 md:gap-12 md:p-9 ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <p className="text-[15.5px] leading-relaxed text-ink/35 line-through decoration-ink/15">
                {row.them}
              </p>
              <p className="flex gap-4 text-[15.5px] font-medium leading-relaxed">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-azure" />
                {row.us}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- Journal */

function Journal() {
  return (
    <section className="border-t border-line py-24 lg:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead eyebrow="Le journal" title="Ce qu'on apprend en salle des machines." />
          <Reveal delay={100}>
            <Button href="/blog" variant="ghost">
              Tous les articles
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {articles.slice(0, 3).map((article, i) => (
            <Reveal key={article.slug} delay={i * 80} className="bg-white">
              <Link href={`/blog/${article.slug}`} className="group flex h-full flex-col p-8">
                <p className="text-[12px] uppercase tracking-[0.14em] text-azure">
                  {article.category}
                </p>
                <h3 className="mt-4 text-[19px] font-semibold leading-[1.3] tracking-[-0.02em] transition-colors group-hover:text-azure">
                  {article.title}
                </h3>
                <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink/55">
                  {article.excerpt}
                </p>
                <p className="mt-8 flex items-center gap-3 text-[12.5px] text-ink/40">
                  {article.date}
                  <span className="h-1 w-1 rounded-full bg-ink/20" />
                  {article.readingTime}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
