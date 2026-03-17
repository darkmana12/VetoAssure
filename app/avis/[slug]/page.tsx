import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAvis, getAllAvis } from '@/lib/mdx'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const avis = getAllAvis()
  return avis.map((a: { slug?: string }) => ({ slug: a.slug ?? '' }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { data } = getAvis(params.slug)
    const url = `https://vetoassure.fr/avis/${params.slug}`
    const description = `Notre avis complet sur ${data.nom as string} — score ${data.score as number}/10, remboursement ${data.remboursementDelai as string}, dès ${data.prixDes as number}€/mois.`
    return {
      title: data.title as string,
      description,
      alternates: { canonical: url },
      openGraph: { url, title: data.title as string, description },
    }
  } catch {
    return { title: 'Avis non trouvé' }
  }
}

export default function AvisSlugPage({ params }: Props) {
  let frontmatter: Record<string, unknown>
  let content: string

  try {
    const { data, content: c } = getAvis(params.slug)
    frontmatter = data
    content = c
  } catch {
    notFound()
  }

  const score = frontmatter.score as number
  const color =
    score >= 9 ? '#1D4ED8' : score >= 8.5 ? '#16A34A' : score >= 8 ? '#EA580C' : '#7C3AED'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'InsuranceAgency',
      name: frontmatter.nom as string,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: score,
      bestRating: 10,
      worstRating: 0,
    },
    author: { '@type': 'Organization', name: 'VetoAssure' },
    publisher: { '@type': 'Organization', name: 'VetoAssure', url: 'https://vetoassure.fr' },
    reviewBody: frontmatter.tagline as string,
  }

  return (
    <article className="section" style={{ maxWidth: 720 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/avis" className="see-all-link" style={{ marginBottom: 16, display: 'inline-block' }}>
        ← Tous les avis
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 13,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {(frontmatter.nom as string).slice(0, 4)}
        </div>
        <div>
          <h1 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            {frontmatter.nom as string} — Avis 2026
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-2)' }}>{frontmatter.tagline as string}</p>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontSize: 36,
            fontWeight: 700,
            color,
            marginLeft: 'auto',
          }}
        >
          {score}
        </div>
      </div>

      {Array.isArray(frontmatter.pointsForts) && (
        <div style={{ background: color + '10', borderRadius: 'var(--radius-sm)', padding: 16, marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            Points forts
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(frontmatter.pointsForts as string[]).map((p) => (
              <li key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text)' }}>
                <span style={{ color, fontWeight: 700 }}>✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
        {[
          { label: 'Dès', value: `${frontmatter.prixDes as number}€/mois` },
          { label: 'Remboursement', value: frontmatter.remboursementDelai as string },
          { label: 'Avis clients', value: `${frontmatter.avisClients as number}/5 ★` },
        ].map((s) => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color, fontFamily: 'var(--font-dm-serif)' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="seo-text">
        <MDXRemote source={content} />
      </div>

      <div style={{ marginTop: 32 }}>
        <Link href="/" className="btn-primary">Comparer toutes les offres →</Link>
      </div>
    </article>
  )
}
