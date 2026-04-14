import type { Metadata } from 'next'
import Link from 'next/link'
import RaceCard from '@/components/RaceCard'

export const metadata: Metadata = {
  title: 'Assurance par race — Chien & Chat 2026',
  description:
    'Trouvez la meilleure assurance pour votre race de chien ou de chat. Comparatifs spécialisés par race.',
  alternates: { canonical: '/races' },
  openGraph: {
    url: '/races',
    title: 'Assurance par race — Chien & Chat 2026',
    description: 'Trouvez la meilleure assurance pour votre race de chien ou de chat. Comparatifs spécialisés par race.',
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

      <section className="section">
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
