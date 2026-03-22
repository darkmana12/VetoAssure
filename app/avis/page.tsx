import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Avis assurances animaux 2026 — Tests indépendants',
  description:
    'Retrouvez tous nos avis détaillés sur les assurances animaux : SantéVet, Kozoo, Acheel, Fidanimo et plus.',
  alternates: { canonical: 'https://vetoassure.fr/avis' },
  openGraph: {
    url: 'https://vetoassure.fr/avis',
    title: 'Avis assurances animaux 2026 — Tests indépendants',
    description: 'Retrouvez tous nos avis détaillés sur les assurances animaux : SantéVet, Kozoo, Acheel, Fidanimo et plus.',
  },
}

const AVIS_LIST = [
  {
    slug: 'santeVet', name: 'SantéVet', shortName: 'SVet', color: '#1D4ED8', logo: '/logos-assurances/santevet_logo.png',
    tagline: 'Meilleur rapport qualité / garanties',
    points: ['Payvet : avance des frais directement chez le véto', 'Couvert à vie une fois assuré', 'Remboursement jusqu\'à 4 000€/an'],
  },
  {
    slug: 'kozoo', name: 'Kozoo', shortName: 'Kzoo', color: '#16A34A', logo: '/logos-assurances/kozoo_logo.jpeg',
    tagline: 'Remboursement le plus rapide (24h)',
    points: ['Remboursement le plus rapide du marché', 'Idéal pour les chats d\'appartement', 'Sans engagement, résiliable à tout moment'],
  },
  {
    slug: 'assuropoil', name: 'AssurOPoil', shortName: 'AOP', color: '#BE185D',
    tagline: 'Spécialiste assurance animaux depuis 10 ans',
    points: ['Spécialiste animaux depuis plus de 10 ans', 'Tarifs parmi les plus compétitifs du marché', 'Formules modulables selon votre budget'],
  },
  {
    slug: 'acheel', name: 'Acheel', shortName: 'Ach', color: '#EA580C',
    tagline: 'Le moins cher du marché',
    points: ['Le moins cher pour la couverture offerte', '1er mois offert à la souscription', 'Souscription 100% en ligne en 3 minutes'],
  },
  {
    slug: 'fidanimo', name: 'Fidanimo', shortName: 'Fida', color: '#7C3AED',
    tagline: 'Meilleur pour les maladies chroniques',
    points: ['Maladies chroniques prises en charge', 'Téléconsultation vétérinaire incluse', 'Devis en ligne immédiat'],
  },
  {
    slug: 'dalma', name: 'Dalma', shortName: 'Dalm', color: '#0891B2',
    tagline: '100% digital et sans engagement',
    points: ['Souscription et gestion 100% en ligne', 'Accidents et maladies couverts', 'Application mobile intuitive'],
  },
  {
    slug: 'barkibu', name: 'Barkibu', shortName: 'Bark', color: '#F97316', logo: '/logos-assurances/barkibu_logo.png',
    tagline: 'Aucune franchise · Téléconsultation 24h/24 incluse',
    points: ['Aucune franchise à payer', '100% prévention remboursé (vaccins)', 'Téléconsultation illimitée 24h/24'],
    promoCode: 'vetoassure25',
  },
]

export default function AvisPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-badge">Avis indépendants 2026</div>
        <h1>Avis assurances animaux 2026</h1>
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
              className="list-card"
              style={{ gridTemplateColumns: '160px 1fr auto', alignItems: 'center' }}
            >
              {/* Logo */}
              {'logo' in a && a.logo ? (
                <div style={{ width: '100%', height: 72, background: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 14px' }}>
                  <Image src={a.logo as string} alt={`Logo ${a.name}`} width={130} height={52} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                </div>
              ) : (
                <div className="list-card-logo-circle" style={{ background: a.color }}>
                  {a.shortName}
                </div>
              )}

              {/* Info */}
              <div className="list-card-info">
                <div className="list-card-name">{a.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 6 }}>{a.tagline}</div>
                <ul className="list-card-bullets">
                  {a.points.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
                {'promoCode' in a && a.promoCode && (
                  <span className="list-card-bonus" style={{ color: a.color, borderColor: a.color + '80', background: a.color + '12' }}>
                    Code promo exclusif : {a.promoCode as string}
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className="list-card-cta">
                <span className="list-card-btn" style={{ background: a.color }}>
                  Voir l&apos;offre →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
