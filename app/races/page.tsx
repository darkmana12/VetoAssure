import type { Metadata } from 'next'
import RaceCard from '@/components/RaceCard'

export const metadata: Metadata = {
  title: 'Assurance par race — Chien & Chat',
  description:
    'Trouvez la meilleure assurance pour votre race de chien ou de chat. Comparatifs spécialisés par race.',
}

const ALL_RACES = [
  { emoji: '🐕', name: 'Golden Retriever', type: 'Chien', href: '/races/golden-retriever' },
  { emoji: '🐕', name: 'Labrador', type: 'Chien', href: '/races/labrador' },
  { emoji: '🐕', name: 'Bulldog Français', type: 'Chien', href: '/races/bulldog-francais' },
  { emoji: '🐕', name: 'Berger Allemand', type: 'Chien', href: '/races/berger-allemand' },
  { emoji: '🐕', name: 'Chihuahua', type: 'Chien', href: '/races/chihuahua' },
  { emoji: '🐕', name: 'Beagle', type: 'Chien', href: '/races/beagle' },
  { emoji: '🐕', name: 'Yorkshire Terrier', type: 'Chien', href: '/races/yorkshire-terrier' },
  { emoji: '🐈', name: 'Maine Coon', type: 'Chat', href: '/races/maine-coon' },
  { emoji: '🐈', name: 'Bengal', type: 'Chat', href: '/races/bengal' },
  { emoji: '🐈', name: 'Persan', type: 'Chat', href: '/races/persan' },
  { emoji: '🐈', name: 'Siamois', type: 'Chat', href: '/races/siamois' },
  { emoji: '🐈', name: 'Ragdoll', type: 'Chat', href: '/races/ragdoll' },
]

export default function RacesPage() {
  const chiens = ALL_RACES.filter((r) => r.type === 'Chien')
  const chats = ALL_RACES.filter((r) => r.type === 'Chat')

  return (
    <>
      <section className="hero">
        <div className="hero-badge">Guide par race</div>
        <h1>Assurance par race d&apos;animal</h1>
        <p className="hero-subtitle">
          Chaque race a ses propres pathologies et besoins. Trouvez la meilleure assurance adaptée
          à votre animal.
        </p>
      </section>

      <section className="section">
        <p className="section-label">RACES DE CHIENS</p>
        <h2 className="section-title">Assurance chien par race</h2>
        <div className="race-grid" style={{ marginTop: 16 }}>
          {chiens.map((r) => (
            <RaceCard key={r.href} {...r} />
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-label">RACES DE CHATS</p>
        <h2 className="section-title">Assurance chat par race</h2>
        <div className="race-grid" style={{ marginTop: 16 }}>
          {chats.map((r) => (
            <RaceCard key={r.href} {...r} />
          ))}
        </div>
      </section>
    </>
  )
}
