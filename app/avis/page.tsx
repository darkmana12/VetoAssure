import type { Metadata } from 'next'
import { getAllAvis } from '@/lib/mdx'
import AvisTable, { type AvisRow } from '@/components/AvisTable'

export const metadata: Metadata = {
  title: 'Comparatif assurances animaux 2026 — tableau des 11 acteurs',
  description:
    'Tableau comparatif 2026 des 11 principales assurances animaux : score, prix dès, différenciant. Triable, indépendant, mis à jour mai 2026.',
  alternates: { canonical: 'https://vetoassure.fr/avis' },
  openGraph: {
    url: 'https://vetoassure.fr/avis',
    title: 'Comparatif assurances animaux 2026 — tableau des 11 acteurs',
    description:
      'Tableau comparatif 2026 des 11 principales assurances animaux : score, prix dès, différenciant.',
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
  const rows: AvisRow[] = (getAllAvis() as AvisData[])
    .filter((a) => a.slug)
    .map((a) => ({
      slug: a.slug,
      nom: a.nom || a.title || a.slug,
      score: typeof a.score === 'number' ? a.score : null,
      prixDes: typeof a.prixDes === 'number' ? a.prixDes : null,
      tagline: a.tagline || '',
    }))

  return (
    <article className="section" style={{ maxWidth: 1040 }}>
      <p className="section-label" style={{ textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-2)', fontSize: 12 }}>
        Comparatif 2026 · {rows.length} assureurs analysés
      </p>
      <h1 className="section-title" style={{ fontSize: 'clamp(26px, 4vw, 36px)', marginBottom: 12 }}>
        Tableau comparatif des assurances animaux 2026
      </h1>
      <p className="section-subtitle" style={{ fontSize: 16, color: 'var(--text-2)', marginBottom: 8, lineHeight: 1.6 }}>
        Vue analytique des {rows.length} principaux assureurs animaux du marché français. Cliquez sur les en-têtes pour trier par score, prix ou nom. Cliquez sur un assureur pour lire l&apos;avis détaillé (score, garanties, points forts et faibles, FAQ).
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 4, fontStyle: 'italic' }}>
        💡 Astuce : ce tableau est triable. Pour un classement éditorial avec verdict, voir nos articles{' '}
        <a href="/blog/top-assurances-chien-2026" style={{ color: 'var(--blue)' }}>Top assurances chien 2026</a> et{' '}
        <a href="/blog/top-assurances-chat-2026" style={{ color: 'var(--blue)' }}>Top assurances chat 2026</a>.
      </p>

      <AvisTable rows={rows} />

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
