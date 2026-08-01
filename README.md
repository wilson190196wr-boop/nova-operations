# NOVA Operations — site vitrine

Site vitrine du cabinet NOVA Operations (Fractional COO & performance
opérationnelle des PME). Next.js 16 (App Router), Tailwind CSS v4, TypeScript.

## Démarrer

```bash
npm run dev
```

Le site est servi sur [http://localhost:3000](http://localhost:3000).

## Configuration

Copiez `.env.example` vers `.env.local` et renseignez les valeurs.

### Prise de rendez-vous — Cal.com

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_CAL_LINK` | Identifiant public du type d'événement, au format `<équipe-ou-utilisateur>/<event-type>` |

L'embed est monté dans [`src/components/cal-embed.tsx`](src/components/cal-embed.tsx),
la configuration (couleur de marque, namespace) dans [`src/lib/booking.ts`](src/lib/booking.ts).
Tant que la variable n'est pas renseignée, l'iframe pointe vers un lien de
démonstration inexistant et affiche une page vide.

### Formulaire de contact — Resend

| Variable | Rôle |
| --- | --- |
| `RESEND_API_KEY` | Clé API Resend. Sans elle, le formulaire valide la saisie puis affiche un repli invitant à écrire directement |
| `CONTACT_FROM` | Expéditeur. Le domaine doit être vérifié dans Resend (SPF + DKIM) |
| `CONTACT_TO` | Destinataire des demandes |

La Server Action vit dans [`src/app/actions.ts`](src/app/actions.ts), la validation
Zod y est faite côté serveur. Le formulaire est un composant client
([`src/components/contact-form.tsx`](src/components/contact-form.tsx)) branché via
`useActionState`.

> Une Server Action est joignable en POST direct. Un piège à robots est en place ;
> pour un site en production, ajoutez une limitation de débit (Upstash, Cloudflare
> Turnstile) avant d'ouvrir le formulaire au public.

## Photos

Les fichiers de `public/photos/` sont des **images d'attente** (dégradés générés,
signalés par une pastille en développement). Pour publier une vraie photo :
remplacez le fichier en gardant le même nom, puis mettez à jour `alt` et
`placeholder: false` dans [`src/lib/photos.ts`](src/lib/photos.ts).

| Fichier | Ratio | Emplacement |
| --- | --- | --- |
| `bureaux-espace-travail.png` | 4:3 | Accueil — photo principale « Au contact des équipes » |
| `bureaux-revue.png` | 4:5 | Accueil — vignette revue de processus |
| `bureaux-pilotage.png` | 4:5 | Accueil — vignette comité de pilotage |
| `portrait-fondateur.jpg` | 4:5 | À propos — portrait, cadrage buste ✅ |

Le texte alternatif n'est pas décoratif : il est lu par les lecteurs d'écran et
indexé. Décrivez ce qu'on voit, pas ce que la photo évoque.

## Contenu

Textes, offres, piliers, cas clients, articles et FAQ sont centralisés dans
[`src/lib/content.ts`](src/lib/content.ts) — un seul fichier à éditer pour faire
évoluer le site.

## Hébergement

Les Server Actions nécessitent un runtime Node (Vercel, Netlify, conteneur, Node
autohébergé). En export statique (`output: "export"`), le formulaire doit être
remplacé par un service tiers ; la prise de rendez-vous Cal.com, elle, fonctionne
partout.
