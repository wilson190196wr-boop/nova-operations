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
    default: "NOVA — l'IA et le développement applicatif au service de la rentabilité",
    template: "%s · NOVA",
  },
  description:
    "En trois semaines, vous saurez où l'IA vous fait gagner de l'argent — et où elle n'en fait pas. Audit, formation, sprints et accompagnement pour les PME de plus de 30 salariés et les startups sans équipe technique.",
  keywords: [
    "directeur digital à temps partagé",
    "CTO à temps partagé",
    "audit organisation PME",
    "optimisation processus PME",
    "automatisation IA entreprise",
  ],
  openGraph: {
    title: "NOVA — l'IA et le développement applicatif au service de la rentabilité",
    description:
      "En trois semaines, vous saurez où l'IA vous fait gagner de l'argent — et où elle n'en fait pas.",
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
