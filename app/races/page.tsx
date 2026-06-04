import type { Metadata } from 'next'
import Link from 'next/link'
import RaceCard from '@/components/RaceCard'

export const metadata: Metadata = {
  title: 'Assurance par race — Chien & Chat 2026 : guide complet',
  description:
    'Pourquoi la race influence le prix et la couverture de l\'assurance animaux : prédispositions héréditaires, exclusions, fourchettes 2026 pour 16 races chien et chat.',
  alternates: { canonical: '/races' },
  openGraph: {
    url: '/races',
    title: 'Assurance par race — Chien & Chat 2026 : guide complet',
    description:
      'Pourquoi la race influence le prix et la couverture de l\'assurance animaux : prédispositions, exclusions et fourchettes 2026 pour 16 races chien et chat.',
  },
}

const ALL_RACES = [
  { emoji: '🐕', name: 'Golden Retriever', type: 'Chien', href: '/races/golden-retriever', img: '/races/golden-retriever.webp' },
  { emoji: '🐕', name: 'Labrador', type: 'Chien', href: '/races/labrador', img: '/races/labrador.webp' },
  { emoji: '🐕', name: 'Bouledogue Français', type: 'Chien', href: '/races/bouledogue-francais', img: '/races/bouledogue-francais.webp' },
  { emoji: '🐕', name: 'Berger Allemand', type: 'Chien', href: '/races/berger-allemand', img: '/races/berger-allemand.webp' },
  { emoji: '🐕', name: 'Chihuahua', type: 'Chien', href: '/races/chihuahua', img: '/races/chihuahua.webp' },
  { emoji: '🐕', name: 'Beagle', type: 'Chien', href: '/races/beagle', img: '/races/beagle.webp' },
  { emoji: '🐕', name: 'Yorkshire Terrier', type: 'Chien', href: '/races/yorkshire-terrier', img: '/races/yorkshire-terrier.webp' },
  { emoji: '🐕', name: 'Boxer', type: 'Chien', href: '/races/boxer', img: '/races/boxer.webp' },
  { emoji: '🐈', name: 'Maine Coon', type: 'Chat', href: '/races/maine-coon', img: '/races/maine-coon.webp' },
  { emoji: '🐈', name: 'Bengal', type: 'Chat', href: '/races/bengal', img: '/races/bengal.webp' },
  { emoji: '🐈', name: 'Persan', type: 'Chat', href: '/races/persan', img: '/races/persan.webp' },
  { emoji: '🐈', name: 'Siamois', type: 'Chat', href: '/races/siamois', img: '/races/siamois.webp' },
  { emoji: '🐈', name: 'Ragdoll', type: 'Chat', href: '/races/ragdoll', img: '/races/ragdoll.webp' },
  { emoji: '🐈', name: 'Sphynx', type: 'Chat', href: '/races/sphynx', img: '/races/sphynx.webp' },
  { emoji: '🐈', name: 'British Shorthair', type: 'Chat', href: '/races/british-shorthair', img: '/races/british-shorthair.webp' },
  { emoji: '🐈', name: 'Abyssin', type: 'Chat', href: '/races/abyssin', img: '/races/abyssin.webp' },
]

export default function RacesPage() {
  const chiens = ALL_RACES.filter((r) => r.type === 'Chien')
  const chats = ALL_RACES.filter((r) => r.type === 'Chat')

  return (
    <>
      <section className="hero-wrap">
        <div className="hero">
          <div className="hero-content">
            <div className="hero-badge">Guide par race</div>
            <h1>Assurance par race d&apos;animal</h1>
            <p className="hero-subtitle">
              Chaque race a ses propres pathologies et besoins. Trouvez la meilleure assurance adaptée
              à votre animal.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 880, margin: '0 auto', lineHeight: 1.7, color: 'var(--text)' }}>
          <h2 className="section-title" style={{ fontSize: 22, marginBottom: 16 }}>
            Pourquoi la race influence le prix et la couverture
          </h2>
          <p style={{ marginBottom: 14 }}>
            Le prix d&apos;une assurance animaux varie de <strong>1 à 4</strong> selon la race, à
            profil et formule équivalents. Trois facteurs expliquent cet écart : la
            <strong> prévalence des pathologies héréditaires</strong> propres à la race (dysplasie
            de la hanche chez le Berger Allemand, HCM chez le Maine Coon, BOAS chez le Bouledogue
            Français), l&apos;<strong>espérance de vie moyenne</strong> qui détermine le risque
            cumulé sur le contrat, et la <strong>fréquence des actes chirurgicaux</strong> recensée
            sur les bases d&apos;indemnisation des assureurs.
          </p>
          <p style={{ marginBottom: 14 }}>
            Sur les races les plus à risque, certains contrats <strong>excluent par défaut</strong>
            les pathologies héréditaires connues : c&apos;est le cas de la dysplasie sur les
            grands chiens chez 6 assureurs sur 11. La parade : souscrire avant 12 mois et avant
            tout dépistage, puis comparer les{' '}
            <Link href="/blog/delai-carence-assurance-animaux" style={{ color: 'var(--blue)' }}>
              délais de carence
            </Link>{' '}
            et les{' '}
            <Link href="/blog/maladies-preexistantes-assurance-animaux" style={{ color: 'var(--blue)' }}>
              clauses sur les maladies préexistantes
            </Link>{' '}
            ligne à ligne dans les Conditions Générales.
          </p>
          <p>
            Chaque fiche race ci-dessous détaille les pathologies attendues, les fourchettes de
            prix 2026 par formule (accidents seuls / accidents + maladies / tous risques), les
            exclusions courantes par assureur et les{' '}
            <Link href="/avis" style={{ color: 'var(--blue)' }}>
              avis détaillés des 11 acteurs du marché
            </Link>
            . Pour un guide général de choix toutes races confondues, voir aussi{' '}
            <Link
              href="/blog/comment-choisir-assurance-animaux-2026"
              style={{ color: 'var(--blue)' }}
            >
              comment choisir une assurance animaux en 2026
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-label">RACES DE CHIENS</p>
        <h2 className="section-title">Assurance chien par race</h2>
        <div className="race-grid" style={{ marginTop: 16 }}>
          {chiens.map((r) => (
            <RaceCard key={r.href} {...r} />
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="chats">
        <p className="section-label">RACES DE CHATS</p>
        <h2 className="section-title">Assurance chat par race</h2>
        <div className="race-grid" style={{ marginTop: 16 }}>
          {chats.map((r) => (
            <RaceCard key={r.href} {...r} />
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, textAlign: 'center', paddingBottom: 48 }}>
        <Link href="/" className="btn-secondary">← Retour au comparatif</Link>
      </section>
    </>
  )
}
