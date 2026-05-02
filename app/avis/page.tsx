import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllAvis } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Avis assurances animaux 2026 — VetoAssure',
  description:
    'Tous nos avis détaillés sur les assurances animaux 2026 : score, prix, garanties, points forts et faibles. Comparatif indépendant.',
  alternates: { canonical: 'https://vetoassure.fr/avis' },
  openGraph: {
    url: 'https://vetoassure.fr/avis',
    title: 'Avis assurances animaux 2026 — VetoAssure',
    description:
      'Tous nos avis détaillés sur les assurances animaux 2026 : score, prix, garanties, points forts et faibles.',
  },
}

interface AvisData {
  slug: string
  title?: string
  nom?: string
  description?: string
  score?: number
  prixDes?: number
  tagline?: string
  updatedAt?: string
}

export default function AvisIndexPage() {
  const avis = (getAllAvis() as AvisData[])
    .filter((a) => a.slug)
    .sort((a, b) => {
      // Tri par score décroissant, puis par slug
      const sa = a.score ?? 0
      const sb = b.score ?? 0
      if (sb !== sa) return sb - sa
      return (a.slug || '').localeCompare(b.slug || '')
    })

  return (
    <article className="section" style={{ maxWidth: 880 }}>
      <p className="section-label" style={{ textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-2)', fontSize: 12 }}>
        Comparatif 2026
      </p>
      <h1 className="section-title" style={{ fontSize: 'clamp(26px, 4vw, 36px)', marginBottom: 12 }}>
        Avis assurances animaux 2026
      </h1>
      <p className="section-subtitle" style={{ fontSize: 16, color: 'var(--text-2)', marginBottom: 24, lineHeight: 1.6 }}>
        Notre analyse indépendante des principaux assureurs animaux du marché français : score sur 10, prix d&apos;entrée, garanties principales et points faibles. Les noms des assureurs sont anonymisés en attendant la finalisation de nos partenariats indépendants.
      </p>

      {avis.length === 0 ? (
        <p style={{ color: 'var(--text-2)' }}>Aucun avis disponible pour le moment.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 24 }}>
          {avis.map((a) => (
            <Link
              key={a.slug}
              href={`/avis/${a.slug}`}
              style={{
                display: 'block',
                padding: 18,
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
                    {a.nom || a.title}
                  </div>
                  {a.tagline && (
                    <div style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 8, lineHeight: 1.5 }}>
                      {a.tagline}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  {typeof a.score === 'number' && (
                    <div style={{ padding: '6px 10px', background: '#EFF6FF', color: '#1D4ED8', borderRadius: 6, fontSize: 13, fontWeight: 600 }}>
                      {a.score}/10
                    </div>
                  )}
                  {typeof a.prixDes === 'number' && (
                    <div style={{ padding: '6px 10px', background: '#F0FDF4', color: '#15803D', borderRadius: 6, fontSize: 13, fontWeight: 600 }}>
                      Dès {a.prixDes} €/mois
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <section style={{ marginTop: 40, padding: 20, background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 8 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#92400E', marginBottom: 8 }}>
          Pourquoi des noms anonymisés ?
        </h2>
        <p style={{ fontSize: 14, color: '#78350F', lineHeight: 1.6, margin: 0 }}>
          VetoAssure construit un comparatif 100&nbsp;% indépendant. Tant que nos partenariats commerciaux ne sont pas formellement signés, les noms des assureurs restent anonymisés (Assurance&nbsp;1 à 11) pour garantir la neutralité de l&apos;évaluation. Le mapping placeholder → marque sera publié dès que les contrats sont finalisés.
        </p>
      </section>
    </article>
  )
}
