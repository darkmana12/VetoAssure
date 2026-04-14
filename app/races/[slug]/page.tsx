import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getRace, getAllRaces, getRelatedBlogPosts } from '@/lib/mdx'
import Link from 'next/link'
import BlogReadingProgress from '@/components/blog/BlogReadingProgress'
import BlogArticleTOC from '@/components/blog/BlogArticleTOC'
import BlogArticleTop3 from '@/components/blog/BlogArticleTop3'
import BlogArticleRelated from '@/components/blog/BlogArticleRelated'
import { MdxArticleH2, MdxArticleH3 } from '@/components/blog/MdxArticleHeadings'

interface Props {
  params: { slug: string }
}

type FaqItem = { question: string; answer: string }

const RELATED_CARD_CAT: Record<string, string> = {
  QR: 'Q&R',
  Pathologie: 'Coûts vétérinaires',
  Comparatif: 'Comparatif',
  Guide: 'Bien choisir',
  Race: 'Race',
  Conseil: 'Conseil',
}

const mdxRaceBlogComponents = {
  h2: MdxArticleH2,
  h3: MdxArticleH3,
}

function slugToRaceLabel(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function buildFaqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}

export async function generateStaticParams() {
  const races = getAllRaces()
  return races.map((r: { slug?: string }) => ({ slug: r.slug ?? '' }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { data } = getRace(params.slug)
    const path = `/races/${params.slug}`
    const seoTitle = (data.seoTitle as string) || (data.title as string)
    const description = data.metaDescription as string
    return {
      ...(data.seoTitle
        ? { title: { absolute: seoTitle } }
        : { title: seoTitle }),
      description,
      alternates: { canonical: path },
      openGraph: {
        url: path,
        title: seoTitle,
        description,
      },
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

  const faqRaw = frontmatter.faq
  const faqItems: FaqItem[] = Array.isArray(faqRaw)
    ? (faqRaw as FaqItem[]).filter(
        (x) => x && typeof x.question === 'string' && typeof x.answer === 'string',
      )
    : []

  const raceLabel =
    (typeof frontmatter.raceLabel === 'string' && frontmatter.raceLabel) ||
    slugToRaceLabel(params.slug)

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://vetoassure.fr' },
      { '@type': 'ListItem', position: 2, name: 'Races', item: 'https://vetoassure.fr/races' },
      { '@type': 'ListItem', position: 3, name: raceLabel },
    ],
  }

  const faqJsonLd = faqItems.length > 0 ? buildFaqJsonLd(faqItems) : null

  const title = frontmatter.title as string
  const metaDesc = frontmatter.metaDescription as string
  const dateVerification = frontmatter.dateVerification as string
  const readTime = (frontmatter.readTime as string)?.trim() || '8 min'
  const coverFromFm = typeof frontmatter.coverImage === 'string' ? frontmatter.coverImage.trim() : ''
  const coverSrc = coverFromFm || `/races/${params.slug}.webp`
  const typeRaw = ((frontmatter.type as string) || '').toLowerCase()
  const typeLabel = typeRaw ? typeRaw.charAt(0).toUpperCase() + typeRaw.slice(1) : 'Race'
  const isChat = typeRaw === 'chat'

  /** Slug fictif pour exclure aucun article blog tout en réutilisant l’API related */
  const relatedPosts = getRelatedBlogPosts(`__race__${params.slug}`, 3).map(({ slug, frontmatter: fm }) => {
    const c = fm.category as string
    return {
      slug,
      title: fm.title as string,
      categoryLabel: RELATED_CARD_CAT[c] ?? c,
      readTime: (fm.readTime as string) ?? '5 min',
    }
  })

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <BlogReadingProgress />

      <div className="blog-pages blog-article-page">
        <div className="blog-article-shell">
          <nav className="blog-breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span className="blog-breadcrumb-sep" aria-hidden>
              ›
            </span>
            <Link href="/races">Races</Link>
            <span className="blog-breadcrumb-sep" aria-hidden>
              ›
            </span>
            <span style={{ color: 'var(--text-2)' }}>{raceLabel}</span>
          </nav>

          <p className="race-back-to-list">
            <Link href="/races" className="see-all-link">
              ← Toutes les races
            </Link>
          </p>

          <div className="blog-article-layout">
            <article>
              <header className="blog-article-header">
                <div className="blog-article-category-row">
                  <span
                    className="blog-article-category"
                    style={{ background: '#F5F3FF', color: '#6D28D9' }}
                  >
                    Race
                  </span>
                  <span
                    className="blog-article-category"
                    style={{ background: '#EFF6FF', color: '#1D4ED8' }}
                  >
                    {typeLabel}
                  </span>
                  {Array.isArray(frontmatter.pathologies) &&
                    (frontmatter.pathologies as string[]).map((p) => (
                      <span
                        key={p}
                        className="blog-article-category"
                        style={{ background: '#FEF3C7', color: '#92400E' }}
                      >
                        ⚠ {p}
                      </span>
                    ))}
                </div>

                <h1 className="blog-article-title">{title}</h1>
                <p className="blog-article-intro">{metaDesc}</p>

                <div className="blog-article-meta">
                  <span className="blog-article-meta-badge">
                    <span className="blog-article-meta-dot" aria-hidden />
                    Vérifié le {dateVerification}
                  </span>
                  <span>⏱️ {readTime} de lecture</span>
                </div>
              </header>

              <div className="blog-article-cover">
                <Image
                  src={coverSrc}
                  alt={`Visuel ${raceLabel}`}
                  fill
                  className="blog-article-cover-img"
                  sizes="(max-width: 900px) 100vw, 820px"
                  priority
                />
              </div>

              <div className="blog-content">
                <MDXRemote
                  source={content}
                  components={mdxRaceBlogComponents}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />

                {faqItems.length > 0 && (
                  <section className="race-faq race-faq--in-article" aria-labelledby="race-faq-title">
                    <h2 id="race-faq-title">FAQ — assurance {raceLabel}</h2>
                    <dl className="race-faq-list">
                      {faqItems.map((item, i) => (
                        <div key={i} className="race-faq-item">
                          <dt className="race-faq-q">{item.question}</dt>
                          <dd className="race-faq-a">{item.answer}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                )}
              </div>

              <div className="blog-race-cta-card">
                <p className="blog-race-cta-price">
                  Prix moyen observé : <strong>{frontmatter.prixMoyen as string}€/mois</strong>
                  <span className="blog-race-cta-hint"> (fourchettes selon formule)</span>
                </p>
                <p className="blog-race-cta-note">Données indicatives — comparez les devis pour votre profil.</p>
                <Link href="/#comparatif" className="btn-primary">
                  Comparer les offres →
                </Link>
              </div>

              <BlogArticleTop3 />
              <BlogArticleRelated posts={relatedPosts} />
            </article>

            <aside className="blog-article-sidebar" aria-label="Navigation et actions">
              <BlogArticleTOC />
              <div className="blog-sidebar-cta">
                <span className="blog-sidebar-cta-emoji" aria-hidden>
                  🐾
                </span>
                <h4>{raceLabel} : bien couvert ?</h4>
                <p>
                  {isChat
                    ? 'Maladies chroniques, plafonds, exclusions : confrontez les formules selon votre chat et votre budget.'
                    : 'Plafonds, exclusions, pathologies de race : confrontez les formules selon votre chien et votre budget.'}
                </p>
                <Link href="/#comparatif">Comparer maintenant →</Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
