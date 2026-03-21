import type { Metadata } from 'next'
import Link from 'next/link'
import AssuranceListItem from '@/components/AssuranceListItem'
import RaceCard from '@/components/RaceCard'

export const metadata: Metadata = {
  title: 'Meilleure assurance chat 2026 — Comparatif complet',
  description:
    'Quelle assurance chat choisir en 2026 ? Insuffisance rénale, maladies chroniques, chat d\'appartement : on compare les remboursements réels de 14 assureurs.',
  alternates: { canonical: 'https://vetoassure.fr/chat' },
  openGraph: {
    url: 'https://vetoassure.fr/chat',
    title: 'Meilleure assurance chat 2026 — Comparatif complet',
    description: 'Quelle assurance chat choisir en 2026 ? Insuffisance rénale, maladies chroniques, chat d\'appartement : on compare les remboursements réels de 14 assureurs.',
  },
}

const RACES_CHAT = [
  { emoji: '🐈', name: 'Maine Coon', type: 'Chat', href: '/races/maine-coon', img: '/races/maine-coon.webp' },
  { emoji: '🐈', name: 'Bengal', type: 'Chat', href: '/races/bengal', img: '/races/bengal.webp' },
  { emoji: '🐈', name: 'Persan', type: 'Chat', href: '/races/persan', img: '/races/persan.webp' },
  { emoji: '🐈', name: 'Siamois', type: 'Chat', href: '/races/siamois', img: '/races/siamois.webp' },
  { emoji: '🐈', name: 'Ragdoll', type: 'Chat', href: '/races/ragdoll', img: '/races/ragdoll.webp' },
  { emoji: '🐈', name: 'Sphynx', type: 'Chat', href: '/races/sphynx', img: '/races/sphynx.webp' },
  { emoji: '🐈', name: 'British Shorthair', type: 'Chat', href: '/races/british-shorthair', img: '/races/british-shorthair.webp' },
  { emoji: '🐈', name: 'Abyssin', type: 'Chat', href: '/races/abyssin', img: '/races/abyssin.webp' },
]

const LIST_CHAT = [
  {
    rank: 1, name: 'Kozoo', shortName: 'Kzoo', color: '#16A34A',
    score: 8.8, stars: '★★★★½',
    points: ['Remboursement 24h', 'Chats appart', 'Sans engagement'],
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
        <div className="hero-badge">Comparatif assurances chat 2026</div>
        <h1>Meilleure assurance chat 2026</h1>
        <p className="hero-subtitle">
          Assurance chat : comparatif complet de 14 offres — trouvez la meilleure couverture pour
          votre chat selon sa race et son profil.
        </p>
      </section>

      <section className="section">
        <p className="section-label">MEILLEURES OFFRES CHAT</p>
        <h2 className="section-title">Top assurances chat 2026</h2>

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

      <section className="section" style={{ paddingTop: 0, textAlign: 'center', paddingBottom: 48 }}>
        <Link href="/" className="btn-secondary">← Retour au comparatif</Link>
      </section>
    </>
  )
}
