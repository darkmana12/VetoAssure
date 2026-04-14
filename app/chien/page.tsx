import type { Metadata } from 'next'
import Link from 'next/link'
import AssuranceListItem from '@/components/AssuranceListItem'
import RaceCard from '@/components/RaceCard'

export const metadata: Metadata = {
  title: 'Meilleure assurance chien 2026 — Comparatif complet',
  description:
    'Quelle assurance chien choisir en 2026 ? Dysplasies, chirurgie, maladies chroniques : on compare les garanties réelles de 8 assureurs pour votre race.',
  alternates: { canonical: 'https://vetoassure.fr/chien' },
  openGraph: {
    url: 'https://vetoassure.fr/chien',
    title: 'Meilleure assurance chien 2026 — Comparatif complet',
    description: 'Quelle assurance chien choisir en 2026 ? Dysplasies, chirurgie, maladies chroniques : on compare les garanties réelles de 8 assureurs pour votre race.',
  },
}

const RACES_CHIEN = [
  { emoji: '🐕', name: 'Golden Retriever', type: 'Chien', href: '/races/golden-retriever', img: '/races/golden-retriever.webp' },
  { emoji: '🐕', name: 'Labrador', type: 'Chien', href: '/races/labrador', img: '/races/labrador.webp' },
  { emoji: '🐕', name: 'Bouledogue Français', type: 'Chien', href: '/races/bouledogue-francais', img: '/races/bouledogue-francais.webp' },
  { emoji: '🐕', name: 'Berger Allemand', type: 'Chien', href: '/races/berger-allemand', img: '/races/berger-allemand.webp' },
  { emoji: '🐕', name: 'Chihuahua', type: 'Chien', href: '/races/chihuahua', img: '/races/chihuahua.webp' },
  { emoji: '🐕', name: 'Beagle', type: 'Chien', href: '/races/beagle', img: '/races/beagle.webp' },
  { emoji: '🐕', name: 'Yorkshire Terrier', type: 'Chien', href: '/races/yorkshire-terrier', img: '/races/yorkshire-terrier.webp' },
  { emoji: '🐕', name: 'Boxer', type: 'Chien', href: '/races/boxer', img: '/races/boxer.webp' },
]

const LIST_CHIEN = [
  {
    rank: 1, name: 'Assurance1', shortName: 'A1', color: '#1D4ED8',
    score: 9.2, stars: '★★★★★',
    points: ['Paiement direct chez le vétérinaire, sans avance de frais', 'Dysplasies et maladies chroniques couvertes à vie', 'Remboursement jusqu\'à 4 000€/an'],
    bonusColor: '#1D4ED8', bonusBorder: '#93C5FD', bonusBg: '#EFF6FF',
    price: '15€',
  },
  {
    rank: 2, name: 'Assurance2', shortName: 'A2', color: '#16A34A',
    score: 8.8, stars: '★★★★½',
    points: ['Remboursement en 24h — le plus rapide du marché', 'Chirurgies orthopédiques et accidents bien couverts', 'Sans engagement, résiliable à tout moment'],
    bonusColor: '#15803D', bonusBorder: '#86EFAC', bonusBg: '#F0FDF4',
    price: '12€',
  },
  {
    rank: 3, name: 'Assurance3', shortName: 'A3', color: '#BE185D',
    score: 8.7, stars: '★★★★½',
    points: ['Spécialiste assurance chien depuis 10 ans', 'Tarifs compétitifs, même pour les grandes races', 'Formules modulables selon votre budget'],
    bonusColor: '#9D174D', bonusBorder: '#F9A8D4', bonusBg: '#FDF2F8',
    price: '7€',
  },
  {
    rank: 4, name: 'Assurance4', shortName: 'A4', color: '#F97316',
    score: 8.6, stars: '★★★★½',
    points: ['Aucune franchise — remboursé dès le 1er euro', 'Vaccins et bilans de santé annuels remboursés à 100%', 'Téléconsultation vétérinaire illimitée 24h/24'],
    bonusColor: '#EA580C', bonusBorder: '#FED7AA', bonusBg: '#FFF7ED',
    price: '20€',
  },
  {
    rank: 5, name: 'Assurance5', shortName: 'A5', color: '#EA580C',
    score: 8.5, stars: '★★★★½',
    points: ['Tarif parmi les plus bas pour les chiens de grande race', 'Accidents et maladies couverts dès le premier mois', 'Conditions générales claires, aucune mauvaise surprise'],
    bonusColor: '#C2410C', bonusBorder: '#FDBA74', bonusBg: '#FFF7ED',
    price: '9€',
  },
  {
    rank: 6, name: 'Assurance6', shortName: 'A6', color: '#7C3AED',
    score: 8.1, stars: '★★★★☆',
    points: ['Dysplasies et maladies chroniques du chien couvertes', 'Téléconsultation vétérinaire incluse dans l\'abonnement', 'Devis en ligne immédiat, sans engagement'],
    bonusColor: '#6D28D9', bonusBorder: '#C4B5FD', bonusBg: '#F5F3FF',
    price: '17€',
  },
  {
    rank: 7, name: 'Assurance7', shortName: 'A7', color: '#0891B2',
    score: 7.9, stars: '★★★★☆',
    points: ['Souscription et gestion 100% en ligne, très simple', 'Accidents et maladies du chien bien couverts', 'Application mobile intuitive pour suivre vos remboursements'],
    bonusColor: '#0E7490', bonusBorder: '#A5F3FC', bonusBg: '#ECFEFF',
    price: '16€',
  },
  {
    rank: 8, name: 'Assurance8', shortName: 'A8', color: '#92400E',
    score: 7.2, stars: '★★★½☆',
    points: ['Souscription en moins de 3 minutes', 'Couverture accidents complète pour votre chien', 'Résiliation facile, sans frais ni justificatif'],
    bonusColor: '#92400E', bonusBorder: '#FCD34D', bonusBg: '#FEF3C7',
    price: '11€',
  },
]

export default function ChienPage() {
  return (
    <>
      <section className="hero-wrap">
        <div className="hero hero--chien">
          <div className="hero-content">
            <div className="hero-badge">Comparatif assurances chiens 2026</div>
            <h1>Meilleure assurance chien 2026</h1>
            <p className="hero-subtitle">
              Comparatif complet de 8 assurances chien — garanties, prix et remboursements réels analysés
              pour vous aider à choisir.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="section-label">MEILLEURES OFFRES CHIEN</p>
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

      <section className="section" style={{ paddingTop: 0, textAlign: 'center', paddingBottom: 48 }}>
        <Link href="/" className="btn-secondary">← Retour au comparatif</Link>
      </section>
    </>
  )
}
