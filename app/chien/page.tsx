import type { Metadata } from 'next'
import Link from 'next/link'
import AssuranceListItem from '@/components/AssuranceListItem'
import RaceCard from '@/components/RaceCard'

export const metadata: Metadata = {
  title: 'Meilleure assurance chien 2026 — Comparatif complet',
  description:
    'Quelle assurance chien choisir en 2026 ? Dysplasies, chirurgie, maladies chroniques : on compare les garanties réelles de 14 assureurs pour votre race.',
  alternates: { canonical: 'https://vetoassure.fr/chien' },
  openGraph: {
    url: 'https://vetoassure.fr/chien',
    title: 'Meilleure assurance chien 2026 — Comparatif complet',
    description: 'Quelle assurance chien choisir en 2026 ? Dysplasies, chirurgie, maladies chroniques : on compare les garanties réelles de 14 assureurs pour votre race.',
  },
}

const RACES_CHIEN = [
  { emoji: '🐕', name: 'Golden Retriever', type: 'Chien', href: '/races/golden-retriever' },
  { emoji: '🐕', name: 'Labrador', type: 'Chien', href: '/races/labrador' },
  { emoji: '🐕', name: 'Bulldog Français', type: 'Chien', href: '/races/bulldog-francais' },
  { emoji: '🐕', name: 'Berger Allemand', type: 'Chien', href: '/races/berger-allemand' },
  { emoji: '🐕', name: 'Chihuahua', type: 'Chien', href: '/races/chihuahua' },
  { emoji: '🐕', name: 'Beagle', type: 'Chien', href: '/races/beagle' },
  { emoji: '🐕', name: 'Yorkshire Terrier', type: 'Chien', href: '/races/yorkshire-terrier' },
  { emoji: '🐕', name: 'Boxer', type: 'Chien', href: '/races/boxer' },
]

const LIST_CHIEN = [
  {
    rank: 1, name: 'SantéVet', shortName: 'SVet', color: '#1D4ED8',
    score: 9.2, stars: '★★★★★',
    points: ['Dysplasies dès M1', 'Chirurgie 3000€', 'Pas de limite d\'âge'],
    bonus: '1 mois offert en passant par VetoAssure',
    bonusColor: '#1D4ED8', bonusBorder: '#93C5FD', bonusBg: '#EFF6FF',
    price: '14€', href: '/avis/santeVet',
  },
  {
    rank: 2, name: 'Kozoo', shortName: 'Kzoo', color: '#16A34A',
    score: 8.8, stars: '★★★★½',
    points: ['Remboursement 24h', 'Sans engagement', 'Maladies chroniques'],
    bonus: '-10% avec le code VETO10',
    bonusColor: '#15803D', bonusBorder: '#86EFAC', bonusBg: '#F0FDF4',
    price: '12€', href: '/avis/kozoo',
  },
  {
    rank: 3, name: 'Acheel', shortName: 'Ach', color: '#EA580C',
    score: 8.5, stars: '★★★★½',
    points: ['Moins cher', '1er mois offert', 'CGU claires'],
    bonus: '2 mois offerts en exclusivité via VetoAssure',
    bonusColor: '#C2410C', bonusBorder: '#FDBA74', bonusBg: '#FFF7ED',
    price: '9€', href: '/avis/acheel',
  },
]

export default function ChienPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-badge">Comparatif chiens 2026</div>
        <h1>Meilleure assurance chien 2026</h1>
        <p className="hero-subtitle">
          Comparatif complet de 14 assurances chien — garanties, prix et remboursements réels analysés
          pour vous aider à choisir.
        </p>
        <div className="hero-btns">
          <Link href="/" className="btn-secondary">← Retour au comparatif</Link>
        </div>
      </section>

      <section className="section">
        <p className="section-label">MEILLEURES OFFRES</p>
        <h2 className="section-title">Top assurances chien 2026</h2>

        {LIST_CHIEN.map((item) => (
          <AssuranceListItem key={item.rank} {...item} />
        ))}
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="races">
        <p className="section-label">PAR RACE DE CHIEN</p>
        <h2 className="section-title">Trouvez l&apos;assurance adaptée à votre race</h2>
        <div className="race-grid">
          {RACES_CHIEN.map((r) => (
            <RaceCard key={r.href} {...r} />
          ))}
        </div>
        <Link href="/races" className="see-all-link">Voir toutes les races →</Link>
      </section>
    </>
  )
}
