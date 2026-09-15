import { ContactPanel } from "@/components/contact-panel";
import { Reveal } from "@/components/reveal";
import type { BlocPanneauContact, ParametresSite } from "@/sanity/types";

export function PanneauContact({
  bloc,
  parametres,
}: {
  bloc: BlocPanneauContact;
  parametres: ParametresSite;
}) {
  return (
    <Reveal className="mt-section">
      <ContactPanel textes={bloc} email={parametres.email} />
    </Reveal>
  );
}
