import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Avis assurances animaux 2025 — Tests indépendants',
  description:
    'Retrouvez tous nos avis détaillés sur les assurances animaux : SantéVet, Kozoo, Acheel, Fidanimo et plus.',
}

const AVIS_LIST = [
  { slug: 'santeVet', name: 'SantéVet', score: 9.2, color: '#1D4ED8', tagline: 'Meilleur rapport qualité / garanties' },
  { slug: 'kozoo', name: 'Kozoo', score: 8.8, color: '#16A34A', tagline: 'Remboursement le plus rapide (24h)' },
  { slug: 'acheel', name: 'Acheel', score: 8.5, color: '#EA580C', tagline: 'Le moins cher du marché' },
  { slug: 'fidanimo', name: 'Fidanimo', score: 8.1, color: '#7C3AED', tagline: 'Meilleur pour les maladies chroniques' },
  { slug: 'dalma', name: 'Dalma', score: 7.9, color: '#0891B2', tagline: '100% digital et sans engagement' },
]

export default function AvisPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-badge">Avis indépendants 2025</div>
        <h1>Avis assurances animaux 2025</h1>
        <p className="hero-subtitle">
          Tests complets et indépendants réalisés par notre équipe. Scores calculés sur 6 critères
          objectifs.
        </p>
      </section>

      <section className="section">
        <p className="section-label">TOUS LES AVIS</p>
        <h2 className="section-title">Nos analyses détaillées</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
          {AVIS_LIST.map((a) => (
            <Link
              key={a.slug}
              href={`/avis/${a.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '16px 20px',
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.15s',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: a.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {a.name.slice(0, 3)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>
                  {a.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{a.tagline}</div>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-dm-serif)',
                  fontSize: 22,
                  fontWeight: 700,
                  color: a.color,
                  minWidth: 40,
                  textAlign: 'right',
                }}
              >
                {a.score}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
