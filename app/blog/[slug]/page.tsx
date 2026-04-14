import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getBlogPost, getAllBlogPosts, getRelatedBlogPosts } from '@/lib/mdx'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import Callout from '@/components/blog/Callout'
import KNBox, { KN } from '@/components/blog/KNBox'
import ShortAnswer from '@/components/blog/ShortAnswer'
import CTABlock from '@/components/blog/CTABlock'
import BlogReadingProgress from '@/components/blog/BlogReadingProgress'
import BlogArticleTOC from '@/components/blog/BlogArticleTOC'
import { MdxArticleH2, MdxArticleH3 } from '@/components/blog/MdxArticleHeadings'
import BlogArticleTop3 from '@/components/blog/BlogArticleTop3'
import BlogArticleRelated from '@/components/blog/BlogArticleRelated'

interface Props {
  params: { slug: string }
}

const CAT_COLORS: Record<string, { bg: string; color: string }> = {
  QR:         { bg: '#FEF3C7', color: '#92400E' },
  Pathologie: { bg: '#FCE7F3', color: '#9D174D' },
  Comparatif: { bg: '#EFF6FF', color: '#1D4ED8' },
  Guide:      { bg: '#F0FDF4', color: '#15803D' },
  Race:       { bg: '#F5F3FF', color: '#6D28D9' },
  Conseil:    { bg: '#FFF7ED', color: '#C2410C' },
}

const CAT_LABEL: Record<string, string> = {
  QR: 'Q&R',
  Pathologie: 'Pathologie & coûts',
  Comparatif: 'Comparatif',
  Guide: 'Guide',
  Race: 'Race',
  Conseil: 'Conseil',
}

/** Libellés courts pour les cartes « À lire aussi » (style template) */
const RELATED_CARD_CAT: Record<string, string> = {
  QR: 'Q&R',
  Pathologie: 'Coûts vétérinaires',
  Comparatif: 'Comparatif',
  Guide: 'Bien choisir',
  Race: 'Race',
  Conseil: 'Conseil',
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

function coverImageUrl(raw: unknown): string | null {
  if (typeof raw !== 'string') return null
  const t = raw.trim()
  if (!t) return null
  try {
    const u = new URL(t)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null
    return t
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { data } = getBlogPost(params.slug)
    const path = `/blog/${params.slug}`
    return {
      title: data.title as string,
      description: data.description as string,
      alternates: { canonical: path },
      openGraph: {
        url: path,
        title: data.title as string,
        description: data.description as string,
        type: 'article',
      },
    }
  } catch {
    return { title: 'Article non trouvé' }
  }
}

export default function BlogPostPage({ params }: Props) {
  let frontmatter: Record<string, unknown>
  let content: string

  try {
    const { data, content: c } = getBlogPost(params.slug)
    frontmatter = data
    content = c
  } catch {
    notFound()
  }

  const cat = frontmatter.category as string
  const cc = CAT_COLORS[cat] ?? { bg: '#F3F4F6', color: '#374151' }
  const isPatho = cat === 'Pathologie'
  const cover = coverImageUrl(frontmatter.coverImage)
  const title = frontmatter.title as string

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: (frontmatter.updatedAt as string) || frontmatter.date,
    author: { '@type': 'Organization', name: 'VetoAssure' },
    publisher: { '@type': 'Organization', name: 'VetoAssure', url: 'https://vetoassure.fr' },
    mainEntityOfPage: `https://vetoassure.fr/blog/${params.slug}`,
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://vetoassure.fr' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://vetoassure.fr/blog' },
      { '@type': 'ListItem', position: 3, name: frontmatter.title },
    ],
  }

  const categoryLabel =
    isPatho
      ? '🩺 Pathologie & coûts'
      : cat === 'QR'
        ? `💬 ${CAT_LABEL.QR}`
        : CAT_LABEL[cat] ?? cat

  const relatedPosts = getRelatedBlogPosts(params.slug, 3).map(({ slug, frontmatter }) => {
    const c = frontmatter.category as string
    return {
      slug,
      title: frontmatter.title as string,
      categoryLabel: RELATED_CARD_CAT[c] ?? c,
      readTime: (frontmatter.readTime as string) ?? '5 min',
    }
  })

  return (
    <>
      <BlogReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="blog-pages blog-article-page">
        <div className="blog-article-shell">
          <nav className="blog-breadcrumb" aria-label="Fil d&apos;Ariane">
            <Link href="/">Accueil</Link>
            <span className="blog-breadcrumb-sep" aria-hidden>
              ›
            </span>
            <Link href="/blog">Blog</Link>
            <span className="blog-breadcrumb-sep" aria-hidden>
              ›
            </span>
            <span style={{ color: 'var(--text-2)' }}>{title}</span>
          </nav>

          <div className="blog-article-layout">
            <article>
              <header className="blog-article-header">
                <div className="blog-article-category-row">
                  <span
                    className="blog-article-category"
                    style={{ background: cc.bg, color: cc.color }}
                  >
                    {categoryLabel}
                  </span>
                  {isPatho && (
                    <span
                      className="blog-article-category"
                      style={{ background: 'var(--blue-light)', color: 'var(--blue)' }}
                    >
                      Coûts vétérinaires
                    </span>
                  )}
                </div>

                <h1 className="blog-article-title">{title}</h1>

                <p className="blog-article-intro">{frontmatter.description as string}</p>

                <div className="blog-article-meta">
                  <span className="blog-article-meta-badge">
                    <span className="blog-article-meta-dot" aria-hidden />
                    {frontmatter.updatedAt
                      ? `Mis à jour ${frontmatter.updatedAt as string}`
                      : `Publié le ${frontmatter.date as string}`}
                  </span>
                  <span>⏱️ {(frontmatter.readTime as string) ?? '5 min'} de lecture</span>
                </div>
              </header>

              {cover && (
                <div className="blog-article-cover">
                  <Image
                    src={cover}
                    alt=""
                    fill
                    className="blog-article-cover-img"
                    sizes="(max-width: 900px) 100vw, 820px"
                    priority
                    unoptimized
                  />
                </div>
              )}

              <div className="blog-content">
                <MDXRemote
                  source={content}
                  components={mdxComponents}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
              </div>

              <BlogArticleTop3 />

              <BlogArticleRelated posts={relatedPosts} />
            </article>

            <aside className="blog-article-sidebar" aria-label="Navigation article">
              <BlogArticleTOC />

              <div className="blog-sidebar-cta">
                <span className="blog-sidebar-cta-emoji" aria-hidden>
                  🐾
                </span>
                <h4>Votre animal est-il bien couvert ?</h4>
                <p>Comparez les formules et trouvez celle qui correspond à son âge et à sa race.</p>
                <Link href="/#comparatif">Comparer maintenant →</Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
