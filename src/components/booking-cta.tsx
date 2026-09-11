import Link from "next/link";

/**
 * Appel au rendez-vous, identique sur toutes les pages.
 *
 * Le bloc est isolé par une respiration blanche au-dessus de lui. C'est ce qui
 * le détache, y compris sur Réalisations où il suit une section bleu nuit :
 * sans cet écart les deux fonds se touchaient et l'appel disparaissait dans la
 * section précédente.
 *
 * Seul le titre change d'une page à l'autre — le reste du message est le même
 * partout, c'est ce qui le rend reconnaissable.
 */
export function BookingCta({ title }: { title: string }) {
  return (
    <section className="mt-20 bg-navy-deep py-24 text-white lg:mt-[92px] lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-7">
            <p className="text-[clamp(2.2rem,5.3vw,4.75rem)] font-semibold leading-[0.96] tracking-[-0.05em]">
              {title}
            </p>
            <p className="mt-6 max-w-[46ch] text-[19px] leading-[1.5] text-white/60">
              Quarante-cinq minutes pour décrire votre organisation et savoir s&apos;il y a matière.
              Si aucune mission ne se justifie, je vous le dirai aussi.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Link
              href="/contact"
              className="block rounded-lg bg-white px-8 py-5 text-center text-[17px] font-medium text-ink transition-colors hover:bg-white/90"
            >
              Choisir un créneau
            </Link>
            <p className="mt-3 text-center text-[13.5px] text-white/40">
              Visio ou téléphone, sans engagement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
