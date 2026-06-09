import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
})

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vetoassure.fr'),
  // Title simple (pas de template "%s | VetoAssure" qui ajoutait 13 chars
  // sur chaque page et poussait la majorité des titles >70 chars (seuil Bing).
  // La marque reste visible dans og:site_name, Schema.org Organization,
  // breadcrumbs, et l'URL elle-même).
  title: 'VetoAssure — Comparatif assurance animaux 2026',
  description:
    'Comparez les meilleures assurances animaux en France. Scores indépendants, avis vérifiés et offres exclusives pour chien, chat et NAC.',
  openGraph: {
    siteName: 'VetoAssure',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VetoAssure — Comparatif assurance animaux',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: 'https://vetoassure.fr',
  },
}

// Schema.org Organization site-wide (hoisted module-level — alloué et stringifié
// une seule fois au load du module, plutôt qu'à chaque render du RootLayout).
// Vercel rule réf : server-hoist-static-io.
//
// Note : volontairement NON typé en InsuranceAgency car VetoAssure est un comparateur
// indépendant et pas un assureur. Comparator/aggregator + Organization sont les types
// les plus précis pour un comparatif d'assurance avec affiliation.
// Champs founder / sameAs à activer post-ORIAS et post-création des profils sociaux.
const ORGANIZATION_LD_JSON = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VetoAssure',
  alternateName: 'VetoAssure — Comparatif assurance animaux',
  url: 'https://vetoassure.fr',
  logo: {
    '@type': 'ImageObject',
    url: 'https://vetoassure.fr/og-image.png',
    width: 1200,
    height: 630,
  },
  description:
    'Comparateur indépendant français des 11 principales assurances animaux. Guides, fiches par race, méthodologie publique et outil de comparaison transparent.',
  foundingDate: '2026',
  areaServed: { '@type': 'Country', name: 'France' },
  knowsAbout: [
    'Assurance animaux',
    'Assurance chien',
    'Assurance chat',
    'Assurance NAC',
    'Comparateur assurance',
    'Médecine vétérinaire',
    'Pathologies vétérinaires',
  ],
  publishingPrinciples: 'https://vetoassure.fr/methodologie',
  // À activer post-ORIAS / post-profils :
  // founder: { '@type': 'Person', name: '...', identifier: 'ORIAS XXXX' },
  // sameAs: ['https://www.linkedin.com/company/vetoassure', 'https://fr.trustpilot.com/review/vetoassure.fr'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ORGANIZATION_LD_JSON }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
        {/* Vercel Web Analytics : cookieless, pas de bannière de consentement
            requise (RGPD/CNIL ok). Pageviews + referrers + devices. À activer
            aussi dans le dashboard Vercel : Project → Analytics → Enable. */}
        <Analytics />
      </body>
    </html>
  )
}
