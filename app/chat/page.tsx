import type { Metadata } from 'next'
import Link from 'next/link'
import AssuranceListItem from '@/components/AssuranceListItem'
import RaceCard from '@/components/RaceCard'

export const metadata: Metadata = {
  title: 'Meilleure assurance chat 2025 — Comparatif complet',
  description:
    'Comparez les meilleures mutuelles chat en France. Garanties, prix et remboursements réels analysés pour 14 assureurs.',
}

const RACES_CHAT = [
  { emoji: '🐈', name: 'Maine Coon', type: 'Chat', href: '/races/maine-coon' },
  { emoji: '🐈', name: 'Bengal', type: 'Chat', href: '/races/bengal' },
  { emoji: '🐈', name: 'Persan', type: 'Chat', href: '/races/persan' },
]

const LIST_CHAT = [
  {
    rank: 1, name: 'Kozoo', shortName: 'Kzoo', color: '#16A34A',
    score: 8.8, stars: '★★★★½',
    points: ['Remboursement 24h', 'Chats appart', 'Sans engagement'],
    bonus: '-10% avec le code VETO10',
    bonusColor: '#15803D', bonusBorder: '#86EFAC', bonusBg: '#F0FDF4',
    price: '12€', href: '/avis/kozoo',
  },
  {
    rank: 2, name: 'SantéVet', shortName: 'SVet', color: '#1D4ED8',
    score: 9.2, stars: '★★★★★',
    points: ['Pas de limite d\'âge', 'Chirurgie 3000€', 'Appli mobile'],
    bonus: '1 mois offert en passant par VetoAssure',
    bonusColor: '#1D4ED8', bonusBorder: '#93C5FD', bonusBg: '#EFF6FF',
    price: '14€', href: '/avis/santeVet',
  },
  {
    rank: 3, name: 'Acheel', shortName: 'Ach', color: '#EA580C',
    score: 8.5, stars: '★★★★½',
    points: ['Moins cher', '1er mois offert', '100% en ligne'],
    bonus: '2 mois offerts en exclusivité via VetoAssure',
    bonusColor: '#C2410C', bonusBorder: '#FDBA74', bonusBg: '#FFF7ED',
    price: '9€', href: '/avis/acheel',
  },
]

export default function ChatPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-badge">Comparatif chats 2025</div>
        <h1>Meilleure assurance chat 2025</h1>
        <p className="hero-subtitle">
          Mutuelle chat : comparatif complet de 14 offres — trouvez la meilleure couverture pour
          votre chat selon sa race et son profil.
        </p>
        <div className="hero-btns">
          <Link href="/" className="btn-secondary">← Retour au comparatif</Link>
        </div>
      </section>

      <section className="section">
        <p className="section-label">MEILLEURES OFFRES CHAT</p>
        <h2 className="section-title">Top assurances chat 2025</h2>

        {LIST_CHAT.map((item) => (
          <AssuranceListItem key={item.rank} {...item} />
        ))}
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="races">
        <p className="section-label">PAR RACE DE CHAT</p>
        <h2 className="section-title">Assurance par race de chat</h2>
        <div className="race-grid">
          {RACES_CHAT.map((r) => (
            <RaceCard key={r.href} {...r} />
          ))}
        </div>
        <Link href="/races" className="see-all-link">Voir toutes les races →</Link>
      </section>
    </>
  )
}
