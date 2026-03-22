import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

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
  { emoji: '🐇', name: 'Lapin', desc: 'Problèmes dentaires, GI stasis', img: '/races/lapin.webp' },
  { emoji: '🐦', name: 'Oiseau / Perroquet', desc: 'Infections, fractures', img: '/races/oiseau.webp' },
  { emoji: '🦎', name: 'Reptile', desc: 'Infections, parasites', img: '/races/reptile.webp' },
  { emoji: '🐹', name: 'Rongeur', desc: 'Tumeurs, problèmes respiratoires', img: '/races/rongeur.webp' },
  { emoji: '🐠', name: 'Poisson exotique', desc: 'Couverture rare', img: '/races/poisson-exotique.webp' },
  { emoji: '🦔', name: 'Hérisson', desc: 'NAC spécialisé', img: '/races/herisson.webp' },
  { emoji: '🦡', name: 'Furet', desc: 'Mustélidé, frais véto élevés', img: '/races/furet.webp' },
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
      </section>

      <section className="section">
        <p className="section-label">LES NAC</p>
        <h2 className="section-title">Nouveaux Animaux de Compagnie</h2>

        <div className="race-grid" style={{ marginTop: 16 }}>
          {NACS.map((n) => (
            <div key={n.name} className="race-card">
              <div className="race-card-img-wrap">
                <Image
                  src={n.img}
                  alt={`Photo d'un ${n.name}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="race-card-img"
                />
              </div>
              <span className="race-card-name">{n.name}</span>
              <span className="race-card-type">{n.desc}</span>
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

      <section className="section" style={{ paddingTop: 0, textAlign: 'center', paddingBottom: 48 }}>
        <Link href="/" className="btn-secondary">← Retour au comparatif</Link>
      </section>
    </>
  )
}
