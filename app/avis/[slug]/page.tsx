import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getAvis, getAllAvis } from '@/lib/mdx'
import KNBox, { KN } from '@/components/blog/KNBox'
import Callout from '@/components/blog/Callout'
import ShortAnswer from '@/components/blog/ShortAnswer'
import { MdxArticleH2, MdxArticleH3 } from '@/components/blog/MdxArticleHeadings'

interface Props {
  params: { slug: string }
}

const mdxComponents = {
  Callout,
  KNBox,
  KN,
  ShortAnswer,
  h2: MdxArticleH2,
  h3: MdxArticleH3,
}

export async function generateStaticParams() {
  return getAllAvis().map((a: { slug?: string }) => ({ slug: a.slug ?? '' }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { data } = getAvis(params.slug)
    const url = `https://vetoassure.fr/avis/${params.slug}`
    return {
      title: (data.title as string) || `Avis ${params.slug} — VetoAssure`,
      description: (data.description as string) || '',
      alternates: { canonical: url },
      openGraph: {
        url,
        title: (data.title as string) || '',
        description: (data.description as string) || '',
      },
    }
  } catch {
    return { title: 'Avis non trouvé — VetoAssure' }
  }
}

export default function AvisSlugPage({ params }: Props) {
  let frontmatter: Record<string, unknown> = {}
  let content: string = ''

  try {
    const parsed = getAvis(params.slug)
    frontmatter = parsed.data as Record<string, unknown>
    content = parsed.content
  } catch {
    notFound()
  }

  const title = (frontmatter.title as string) || ''
  const nom = (frontmatter.nom as string) || params.slug
  const score = frontmatter.score as number | undefined
  const prixDes = frontmatter.prixDes as number | undefined
  const updatedAt = (frontmatter.updatedAt as string) || (frontmatter.date as string) || ''
  const faq = (frontmatter.faq as Array<{ q: string; a: string }>) || []

  const articleSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'InsuranceAgency',
      name: nom,
    },
    author: {
      '@type': 'Organization',
      name: 'VetoAssure',
    },
    reviewBody: (frontmatter.description as string) || '',
    datePublished: (frontmatter.date as string) || '',
    dateModified: updatedAt,
    url: `https://vetoassure.fr/avis/${params.slug}`,
  }
  if (typeof score === 'number') {
    articleSchema.reviewRating = {
      '@type': 'Rating',
      ratingValue: score,
      bestRating: 10,
      worstRating: 0,
    }
  }

  const faqSchema = faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : null

  return (
    <article className="section" style={{ maxWidth: 760 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <p className="section-label" style={{ textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-2)', fontSize: 12 }}>
        Avis indépendant 2026
      </p>
      <h1 className="section-title" style={{ fontSize: 'clamp(24px, 4vw, 32px)', marginBottom: 8 }}>
        {title}
      </h1>

      {(typeof score === 'number' || typeof prixDes === 'number') && (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12, marginBottom: 24 }}>
          {typeof score === 'number' && (
            <div style={{ padding: '6px 12px', background: '#EFF6FF', color: '#1D4ED8', borderRadius: 8, fontSize: 14, fontWeight: 600 }}>
              Score : {score}/10
            </div>
          )}
          {typeof prixDes === 'number' && (
            <div style={{ padding: '6px 12px', background: '#F0FDF4', color: '#15803D', borderRadius: 8, fontSize: 14, fontWeight: 600 }}>
              Dès {prixDes} €/mois
            </div>
          )}
        </div>
      )}

      <div className="prose">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {faq.length > 0 && (
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
            Questions fréquentes
          </h2>
          {faq.map((item, idx) => (
            <details
              key={idx}
              style={{
                marginBottom: 12,
                padding: '14px 16px',
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 8,
              }}
            >
              <summary style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'pointer' }}>
                {item.q}
              </summary>
              <p style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 10, lineHeight: 1.6 }}>
                {item.a}
              </p>
            </details>
          ))}
        </section>
      )}

      <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 32 }}>
        <Link href="/avis" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>
          ← Retour aux avis assurances animaux
        </Link>
      </p>

      {updatedAt && (
        <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 16, fontStyle: 'italic' }}>
          Avis mis à jour le {updatedAt}.
        </p>
      )}
    </article>
  )
}
