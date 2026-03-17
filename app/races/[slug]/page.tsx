import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getRace, getAllRaces } from '@/lib/mdx'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const races = getAllRaces()
  return races.map((r: { slug?: string }) => ({ slug: r.slug ?? '' }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { data } = getRace(params.slug)
    const url = `https://vetoassure.fr/races/${params.slug}`
    return {
      title: data.title as string,
      description: data.metaDescription as string,
      alternates: { canonical: url },
      openGraph: { url, title: data.title as string, description: data.metaDescription as string },
    }
  } catch {
    return { title: 'Race non trouvée' }
  }
}

export default function RacePage({ params }: Props) {
  let frontmatter: Record<string, unknown>
  let content: string

  try {
    const { data, content: c } = getRace(params.slug)
    frontmatter = data
    content = c
  } catch {
    notFound()
  }

  return (
    <article className="section" style={{ maxWidth: 720 }}>
      <Link href="/races" className="see-all-link" style={{ marginBottom: 16, display: 'inline-block' }}>
        ← Toutes les races
      </Link>

      <p className="section-label">{frontmatter.type as string}</p>
      <h1 className="section-title" style={{ fontSize: 'clamp(22px, 4vw, 32px)', marginBottom: 24 }}>
        {frontmatter.title as string}
      </h1>

      {Array.isArray(frontmatter.pathologies) && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {(frontmatter.pathologies as string[]).map((p) => (
            <span
              key={p}
              style={{
                background: '#FEF3C7',
                color: '#92400E',
                fontSize: 12,
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: 20,
              }}
            >
              ⚠ {p}
            </span>
          ))}
        </div>
      )}

      <div className="seo-text">
        <MDXRemote source={content} />
      </div>

      <div style={{ marginTop: 32, padding: 20, background: 'var(--blue-light)', borderRadius: 'var(--radius-sm)' }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)', marginBottom: 8 }}>
          Prix moyen : {frontmatter.prixMoyen as string}€/mois
        </p>
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 12 }}>
          Vérifié le {frontmatter.dateVerification as string}
        </p>
        <Link href="/" className="btn-primary">Comparer les offres →</Link>
      </div>
    </article>
  )
}
