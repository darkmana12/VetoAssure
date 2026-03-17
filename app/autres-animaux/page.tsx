import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Assurance NAC & autres animaux 2026',
  description:
    'Assurances pour lapins, oiseaux, reptiles et autres NAC. Comparatif et conseils pour bien protéger votre animal.',
  alternates: { canonical: 'https://vetoassure.fr/autres-animaux' },
  openGraph: {
    url: 'https://vetoassure.fr/autres-animaux',
    title: 'Assurance NAC & autres animaux 2026',
    description: 'Assurances pour lapins, oiseaux, reptiles et autres NAC. Comparatif et conseils pour bien protéger votre animal.',
  },
}

const NACS = [
  { emoji: '🐇', name: 'Lapin', desc: 'Problèmes dentaires, GI stasis' },
  { emoji: '🐦', name: 'Oiseau / Perroquet', desc: 'Infections, fractures' },
  { emoji: '🦎', name: 'Reptile', desc: 'Infections, parasites' },
  { emoji: '🐹', name: 'Rongeur', desc: 'Tumeurs, problèmes respiratoires' },
  { emoji: '🐠', name: 'Poisson exotique', desc: 'Couverture rare' },
  { emoji: '🦔', name: 'Hérisson', desc: 'NAC spécialisé' },
]

export default function AutresAnimauxPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-badge">NAC & autres animaux</div>
        <h1>Assurance pour vos autres animaux</h1>
        <p className="hero-subtitle">
          Lapins, oiseaux, reptiles, rongeurs — les NAC ont aussi besoin d&apos;une couverture
          vétérinaire adaptée. Découvrez les offres disponibles.
        </p>
        <div className="hero-btns">
          <Link href="/" className="btn-secondary">← Retour au comparatif</Link>
        </div>
      </section>

      <section className="section">
        <p className="section-label">LES NAC</p>
        <h2 className="section-title">Nouveaux Animaux de Compagnie</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 12,
            marginTop: 16,
          }}
        >
          {NACS.map((n) => (
            <div
              key={n.name}
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: 16,
                textAlign: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{n.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                {n.name}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{n.desc}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 32,
            padding: 20,
            background: 'var(--blue-light)',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--blue)', marginBottom: 8 }}>
            Peu d&apos;assureurs couvrent les NAC
          </h3>
          <p className="seo-text" style={{ marginTop: 0 }}>
            Contrairement aux chiens et chats, les assurances pour NAC restent rares en France.
            Fidanimo et quelques spécialistes proposent des formules adaptées. Nous travaillons à
            enrichir ce comparatif.
          </p>
          <Link href="/" className="btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>
            Voir le comparatif général →
          </Link>
        </div>
      </section>
    </>
  )
}
