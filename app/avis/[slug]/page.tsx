import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getAvis, getAllAvis } from '@/lib/mdx'
import KNBox, { KN } from '@/components/blog/KNBox'
import Callout from '@/components/blog/Callout'
import ShortAnswer from '@/components/blog/ShortAnswer'
import CTABlock from '@/components/blog/CTABlock'
import BlogReadingProgress from '@/components/blog/BlogReadingProgress'
import { MdxArticleH2, MdxArticleH3 } from '@/components/blog/MdxArticleHeadings'

interface Props {
  params: { slug: string }
}

const mdxComponents = {
  Callout,
  KNBox,
  KN,
  ShortAnswer,
  CTABlock,
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
        type: 'article',
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
  const description = (frontmatter.description as string) || ''
  const tagline = (frontmatter.tagline as string) || ''
  const score = frontmatter.score as number | undefined
  const prixDes = frontmatter.prixDes as number | undefined
  const updatedAt = (frontmatter.updatedAt as string) || (frontmatter.date as string) || ''
  const date = (frontmatter.date as string) || ''
  const faq = Array.isArray(frontmatter.faq)
    ? (frontmatter.faq as Array<{ q: string; a: string }>)
    : []

  const reviewLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'InsuranceAgency',
      name: nom,
    },
    author: { '@type': 'Organization', name: 'VetoAssure' },
    publisher: { '@type': 'Organization', name: 'VetoAssure', url: 'https://vetoassure.fr' },
    reviewBody: description,
    datePublished: date,
    dateModified: updatedAt,
    url: `https://vetoassure.fr/avis/${params.slug}`,
  }
  if (typeof score === 'number') {
    reviewLd.reviewRating = {
      '@type': 'Rating',
      ratingValue: score,
      bestRating: 10,
      worstRating: 0,
    }
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://vetoassure.fr' },
      { '@type': 'ListItem', position: 2, name: 'Avis', item: 'https://vetoassure.fr/avis' },
      { '@type': 'ListItem', position: 3, name: title },
    ],
  }

  const faqLd = faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      }
    : null

  return (
    <>
      <BlogReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <div className="blog-pages blog-article-page">
        <div className="blog-article-shell">
          <nav className="blog-breadcrumb" aria-label="Fil d&apos;Ariane">
            <Link href="/">Accueil</Link>
            <span className="blog-breadcrumb-sep" aria-hidden>›</span>
            <Link href="/avis">Avis</Link>
            <span className="blog-breadcrumb-sep" aria-hidden>›</span>
            <span style={{ color: 'var(--text-2)' }}>{nom}</span>
          </nav>

          <div className="blog-article-layout">
            <article>
              <header className="blog-article-header">
                <div className="blog-article-category-row">
                  <span
                    className="blog-article-category"
                    style={{ background: '#EFF6FF', color: '#1D4ED8' }}
                  >
                    Avis indépendant 2026
                  </span>
                </div>

                <h1 className="blog-article-title">{title}</h1>

                {description && (
                  <p className="blog-article-intro">{description}</p>
                )}

                {(typeof score === 'number' || typeof prixDes === 'number' || tagline) && (
                  <div
                    style={{
                      display: 'flex',
                      gap: 12,
                      flexWrap: 'wrap',
                      marginTop: 16,
                      marginBottom: 12,
                    }}
                  >
                    {typeof score === 'number' && (
                      <div
                        style={{
                          padding: '8px 14px',
                          background: '#EFF6FF',
                          color: '#1D4ED8',
                          borderRadius: 8,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        Score : {score}/10
                      </div>
                    )}
                    {typeof prixDes === 'number' && (
                      <div
                        style={{
                          padding: '8px 14px',
                          background: '#F0FDF4',
                          color: '#15803D',
                          borderRadius: 8,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        Dès {prixDes} €/mois
                      </div>
                    )}
                  </div>
                )}

                {tagline && (
                  <p
                    style={{
                      fontSize: 15,
                      color: 'var(--text-2)',
                      fontStyle: 'italic',
                      marginTop: 4,
                      marginBottom: 16,
                    }}
                  >
                    {tagline}
                  </p>
                )}

                <div className="blog-article-meta">
                  <span className="blog-article-meta-badge">
                    <span className="blog-article-meta-dot" aria-hidden />
                    {updatedAt ? `Mis à jour ${updatedAt}` : `Publié le ${date}`}
                  </span>
                </div>
              </header>

              <div className="blog-content">
                <MDXRemote
                  source={content}
                  components={mdxComponents}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
              </div>

              {faq.length > 0 && (
                <section style={{ marginTop: 48 }}>
                  <h2
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: 'var(--text)',
                      marginBottom: 20,
                    }}
                  >
                    Questions fréquentes
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {faq.map((item, idx) => (
                      <details
                        key={idx}
                        style={{
                          padding: '16px 20px',
                          background: '#fff',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        <summary
                          style={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: 'var(--text)',
                            cursor: 'pointer',
                            lineHeight: 1.5,
                          }}
                        >
                          {item.q}
                        </summary>
                        <p
                          style={{
                            fontSize: 14,
                            color: 'var(--text-2)',
                            marginTop: 12,
                            lineHeight: 1.7,
                          }}
                        >
                          {item.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              <p style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 40 }}>
                <Link href="/avis" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>
                  ← Retour aux avis assurances animaux
                </Link>
              </p>
            </article>

            <aside className="blog-article-sidebar" aria-label="Navigation avis">
              <div className="blog-sidebar-cta">
                <span className="blog-sidebar-cta-emoji" aria-hidden>
                  🐾
                </span>
                <h4>Comparer les assurances</h4>
                <p>Trouvez la formule la mieux adaptée à votre animal en quelques minutes.</p>
                <Link href="/#comparatif">Comparer maintenant →</Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
