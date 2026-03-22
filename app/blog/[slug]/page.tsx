import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getBlogPost, getAllBlogPosts } from '@/lib/mdx'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import Callout from '@/components/blog/Callout'
import KNBox, { KN } from '@/components/blog/KNBox'
import ShortAnswer from '@/components/blog/ShortAnswer'
import CTABlock from '@/components/blog/CTABlock'

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

const mdxComponents = { Callout, KNBox, KN, ShortAnswer, CTABlock }

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { data } = getBlogPost(params.slug)
    const url = `https://vetoassure.fr/blog/${params.slug}`
    return {
      title: data.title as string,
      description: data.description as string,
      alternates: { canonical: url },
      openGraph: {
        url,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Header article */}
      <div style={{ background: '#111827', paddingTop: 36, paddingBottom: 0 }}>
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            <Link href="/" style={{ fontSize: 13, color: '#9CA3AF', textDecoration: 'none' }}>Accueil</Link>
            <span style={{ color: '#4B5563' }}>/</span>
            <Link href="/blog" style={{ fontSize: 13, color: '#9CA3AF', textDecoration: 'none' }}>Blog</Link>
            <span style={{ color: '#4B5563' }}>/</span>
            <span style={{ fontSize: 13, color: '#6B7280' }}>{frontmatter.title as string}</span>
          </div>

          {/* Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ background: cc.bg, color: cc.color, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 7 }}>
              {isPatho ? '🩺 Pathologie' : cat === 'QR' ? '💬 Q&R' : cat}
            </span>
            {isPatho && (
              <span style={{ background: 'rgba(255,255,255,0.08)', color: '#9CA3AF', fontSize: 12, padding: '3px 10px', borderRadius: 20 }}>
                Coûts vétérinaires
              </span>
            )}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-dm-serif)',
            fontSize: 'clamp(26px, 4vw, 40px)',
            color: '#fff',
            lineHeight: 1.15,
            marginBottom: 14,
            maxWidth: 740,
          }}>
            {frontmatter.title as string}
          </h1>

          <p style={{ fontSize: 16, color: '#9CA3AF', lineHeight: 1.65, maxWidth: 640, marginBottom: 28 }}>
            {frontmatter.description as string}
          </p>

          {/* Meta row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            paddingBottom: 32,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: 13, color: '#6B7280' }}>
              📅 Publié le {frontmatter.date as string}
              {frontmatter.updatedAt ? ` · Mis à jour le ${frontmatter.updatedAt as string}` : ''}
            </span>
            <span style={{ fontSize: 13, color: '#6B7280' }}>⏱️ {(frontmatter.readTime as string) ?? '5 min'} de lecture</span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: '#DCFCE7', color: '#16A34A',
              fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
            }}>✅ Vérifié vétérinaire</span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 260px',
          gap: 48,
          paddingTop: 40,
          paddingBottom: 64,
          alignItems: 'start',
        }}>
          {/* Main content */}
          <article>
            <div className="blog-content">
              <MDXRemote source={content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
            </div>

            {/* Bottom CTA */}
            <div style={{
              marginTop: 48,
              background: 'linear-gradient(135deg, #1D4ED8, #1e3a8a)',
              borderRadius: 20,
              padding: 36,
              textAlign: 'center',
              color: '#fff',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', opacity: 0.6, textTransform: 'uppercase', marginBottom: 10 }}>
                Passez à l&apos;action
              </div>
              <div style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 26, marginBottom: 12, lineHeight: 1.2 }}>
                Trouvez la meilleure assurance<br />pour votre animal
              </div>
              <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 24, lineHeight: 1.6 }}>
                Comparez les offres de 7 assureurs — scores calculés sur 6 critères indépendants.
                Obtenez une estimation en 2 minutes.
              </p>
              <Link href="/" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#fff', color: '#1D4ED8',
                padding: '14px 28px', borderRadius: 12,
                fontWeight: 700, fontSize: 15, textDecoration: 'none',
              }}>Comparer les offres →</Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: 90 }}>
            <div style={{
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: 24,
              marginBottom: 16,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-2)', marginBottom: 16 }}>
                À lire aussi
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Link href="/blog" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: 13, color: 'var(--text)', textDecoration: 'none',
                  padding: 10, borderRadius: 10, background: 'var(--bg)',
                  transition: 'background 0.15s',
                }}>
                  <span style={{ fontSize: 20 }}>📚</span>
                  <span>Tous nos guides assurance</span>
                </Link>
                <Link href="/chien" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: 13, color: 'var(--text)', textDecoration: 'none',
                  padding: 10, borderRadius: 10, background: 'var(--bg)',
                }}>
                  <span style={{ fontSize: 20 }}>🐕</span>
                  <span>Meilleures assurances chien</span>
                </Link>
                <Link href="/chat" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: 13, color: 'var(--text)', textDecoration: 'none',
                  padding: 10, borderRadius: 10, background: 'var(--bg)',
                }}>
                  <span style={{ fontSize: 20 }}>🐈</span>
                  <span>Meilleures assurances chat</span>
                </Link>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg,#1D4ED8,#1e3a8a)',
              borderRadius: 16, padding: 20, color: '#fff',
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
                Comparez gratuitement
              </div>
              <p style={{ fontSize: 12, opacity: 0.8, marginBottom: 16, lineHeight: 1.5 }}>
                7 assureurs comparés, score indépendant sur 6 critères
              </p>
              <Link href="/" style={{
                display: 'block', textAlign: 'center',
                background: '#fff', color: '#1D4ED8',
                padding: '10px', borderRadius: 10,
                fontWeight: 700, fontSize: 13, textDecoration: 'none',
              }}>Voir le comparatif →</Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
