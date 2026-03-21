import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
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
  variable: '--font-dm-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vetoassure.fr'),
  title: {
    template: '%s | VetoAssure',
    default: 'VetoAssure — Comparatif assurance animaux 2026',
  },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
