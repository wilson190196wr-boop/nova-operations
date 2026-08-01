import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nova-operations.fr"),
  title: {
    default: "NOVA Operations — Fractional COO & performance opérationnelle des PME",
    template: "%s · NOVA Operations",
  },
  description:
    "NOVA Operations aide les PME de 20 à 250 salariés à gagner du temps, réduire leurs coûts et améliorer leur rentabilité : audit d'organisation, optimisation des processus, transformation digitale et automatisation IA.",
  keywords: [
    "optimisation processus PME",
    "audit organisation",
    "Fractional COO",
    "transformation digitale PME",
    "automatisation IA entreprise",
  ],
  openGraph: {
    title: "NOVA Operations — Fractional COO & Performance Partner",
    description:
      "Nous trouvons les heures perdues de votre entreprise. Audit, sprints d'exécution et pilotage opérationnel pour PME.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
