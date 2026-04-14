'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Post {
  slug: string
  frontmatter: Record<string, string>
}

interface Props {
  posts: Post[]
  totalQR: number
  totalPatho: number
}

const CAT_LABELS: Record<string, string> = {
  QR: 'Q&R',
  Pathologie: 'Pathologie',
  Comparatif: 'Comparatif',
  Guide: 'Guide',
  Race: 'Race',
  Conseil: 'Conseil',
}

const CAT_COLORS: Record<string, { bg: string; color: string }> = {
  QR:         { bg: '#FEF3C7', color: '#92400E' },
  Pathologie: { bg: '#FCE7F3', color: '#9D174D' },
  Comparatif: { bg: '#EFF6FF', color: '#1D4ED8' },
  Guide:      { bg: '#F0FDF4', color: '#15803D' },
  Race:       { bg: '#F5F3FF', color: '#6D28D9' },
  Conseil:    { bg: '#FFF7ED', color: '#C2410C' },
}

const QR_VISUALS: Record<string, { bg: string; emoji: string }> = {
  'delai-carence-assurance-animaux':          { bg: 'linear-gradient(135deg,#1D4ED8,#1e3a8a)', emoji: '⏱️' },
  'assurer-animal-age':                        { bg: 'linear-gradient(135deg,#7C3AED,#5B21B6)', emoji: '🐾' },
  'assurance-chat-appartement':                { bg: 'linear-gradient(135deg,#0EA5E9,#0284C7)', emoji: '🏠' },
  'assurance-animaux-avec-ou-sans-franchise':  { bg: 'linear-gradient(135deg,#16A34A,#15803D)', emoji: '💰' },
  'sterilisation-remboursement-assurance':     { bg: 'linear-gradient(135deg,#EC4899,#DB2777)', emoji: '✂️' },
  'maladies-preexistantes-assurance-animaux':  { bg: 'linear-gradient(135deg,#F59E0B,#D97706)', emoji: '🩺' },
}

const PATHO_ICONS: Record<string, { bg: string; emoji: string; price: string; animal: string }> = {
  'dysplasie-hanche-chien':             { bg: '#FEF3C7', emoji: '🦴', price: '1 500 – 4 500€', animal: 'Chien' },
  'insuffisance-renale-chronique-chat': { bg: '#FCE7F3', emoji: '🫀', price: '80 – 200€/mois', animal: 'Chat' },
  'dilatation-torsion-estomac-chien':   { bg: '#FEE2E2', emoji: '⚡', price: '2 000 – 5 000€', animal: 'Chien' },
  'diabete-chien-cout-traitement':      { bg: '#EFF6FF', emoji: '💉', price: '50 – 150€/mois', animal: 'Chien' },
  'cancer-chien-cout-traitement':       { bg: '#F3E8FF', emoji: '🔬', price: '2 000 – 10 000€', animal: 'Chien' },
}

const FILTERS = ['Tous', 'Q&R', 'Pathologie', 'Comparatif', 'Guide', 'Race']

/** Slug(s) frontmatter pour l’article comparatif A1 vs A2 (carte « VS ») */
const COMPARATIF_VS_SLUGS = new Set(['santevet-vs-kozoo-comparatif', 'Assurance1-vs-Assurance2-comparatif'])

function coverUrl(fm: Record<string, string>): string | undefined {
  const raw = fm.coverImage?.trim()
  if (!raw) return undefined
  try {
    const u = new URL(raw)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return undefined
    return raw
  } catch {
    return undefined
  }
}

function QrCardVisual({
  post,
  comparatifVs,
  useCategoryGlyph,
}: {
  post: Post
  comparatifVs: boolean
  useCategoryGlyph?: boolean
}) {
  const cover = coverUrl(post.frontmatter)
  if (comparatifVs && !cover) {
    return (
      <div className="blog-qr-visual" style={{ background: 'linear-gradient(135deg,#1e3a8a,#14532d)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 12px' }}>
        <div style={{ background: '#1D4ED8', borderRadius: 6, padding: '6px 12px', display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>A1</div>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>VS</span>
        <div style={{ background: '#16A34A', borderRadius: 6, padding: '6px 12px', display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>A2</div>
      </div>
    )
  }
  if (cover) {
    return (
      <div className="blog-qr-visual blog-qr-visual--cover">
        <Image
          src={cover}
          alt=""
          fill
          className="blog-qr-cover-img"
          sizes="(max-width: 768px) 50vw, 33vw"
          unoptimized
        />
      </div>
    )
  }
  if (useCategoryGlyph) {
    const cat = post.frontmatter.category
    const emoji =
      cat === 'Comparatif' ? '⚖️' : cat === 'Guide' ? '📖' : cat === 'Race' ? '🐕' : '💡'
    return (
      <div className="blog-qr-visual" style={{ background: '#111827' }}>
        <span style={{ fontSize: 44 }}>{emoji}</span>
      </div>
    )
  }
  if (post.frontmatter.category === 'Pathologie') {
    const p = PATHO_ICONS[post.slug]
    if (p) {
      return (
        <div className="blog-qr-visual" style={{ background: p.bg }}>{p.emoji}</div>
      )
    }
  }
  const vis = QR_VISUALS[post.slug] ?? { bg: 'linear-gradient(135deg,#374151,#111827)', emoji: '❓' }
  return <div className="blog-qr-visual" style={{ background: vis.bg }}>{vis.emoji}</div>
}

export default function BlogPageContent({ posts, totalQR, totalPatho }: Props) {
  const [active, setActive] = useState('Tous')

  const filtered = active === 'Tous'
    ? posts
    : posts.filter(p => {
        const cat = p.frontmatter.category
        if (active === 'Q&R') return cat === 'QR'
        return cat === active
      })

  const pathoOrdered = posts.filter(p => p.frontmatter.category === 'Pathologie')
  /** Deux premières pathologies en cartes (remplace l’ancien hero plein écran) */
  const heroSpotlightPosts = active === 'Tous' ? pathoOrdered.slice(0, 2) : []

  const pinnedPathoSlugs = new Set(heroSpotlightPosts.map(p => p.slug))

  const pathoPosts = filtered.filter(p => {
    if (p.frontmatter.category !== 'Pathologie') return false
    if (active === 'Tous' && pinnedPathoSlugs.has(p.slug)) return false
    return true
  })

  const qrPosts = filtered.filter(p => p.frontmatter.category === 'QR')
  const otherPosts = filtered.filter(
    p => p.frontmatter.category !== 'QR' && p.frontmatter.category !== 'Pathologie',
  )
  const racePosts = otherPosts.filter(p => p.frontmatter.category === 'Race')
  const otherPostsSansRace = otherPosts.filter(p => p.frontmatter.category !== 'Race')

  function renderOtherCard(post: Post) {
    const cat = post.frontmatter.category
    const c = CAT_COLORS[cat] ?? { bg: '#F3F4F6', color: '#374151' }
    return (
      <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-qr-card">
        <QrCardVisual post={post} comparatifVs={COMPARATIF_VS_SLUGS.has(post.slug)} useCategoryGlyph />
        <div className="blog-qr-body">
          <span className="blog-qr-tag" style={{ background: c.bg, color: c.color }}>
            {CAT_LABELS[cat] ?? cat}
          </span>
          <div className="blog-qr-title">{post.frontmatter.title}</div>
          <div className="blog-qr-foot">
            <span className="blog-qr-time">⏱️ {post.frontmatter.readTime ?? '5 min'}</span>
            <span className="blog-qr-arrow">→</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <>
      <section className="blog-page-hero">
        <div className="container" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32 }}>
          <div>
            <p className="blog-page-hero-kicker">
              Assurance animaux · Blog
            </p>
            <h1 className="blog-page-hero-title">
              Guides &amp; Conseils
            </h1>
            <p className="blog-page-hero-lead">
              Réponses aux questions des propriétaires, coûts des pathologies et guides complets pour bien choisir.
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="blog-filters container">
          {FILTERS.map(tab => (
            <button
              key={tab}
              className={`blog-filter-tab${active === tab ? ' active' : ''}`}
              onClick={() => setActive(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <div className="container" style={{ paddingTop: 48 }}>

        {/* Deux premières pathologies — cartes (pas de hero plein écran) */}
        {heroSpotlightPosts.length > 0 && (
          <section className="blog-hero-spotlight" aria-label="À la une" style={{ marginBottom: 52 }}>
            <div className="blog-section-head">
              <h3>À la une</h3>
            </div>
            <div className="blog-qr-grid blog-qr-grid--hero-spotlight">
              {heroSpotlightPosts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-qr-card">
                  <QrCardVisual post={post} comparatifVs={COMPARATIF_VS_SLUGS.has(post.slug)} useCategoryGlyph={false} />
                  <div className="blog-qr-body">
                    <span className="blog-qr-tag blog-qr-tag-spotlight">À la une</span>
                    <div className="blog-qr-title">{post.frontmatter.title}</div>
                    <div className="blog-qr-foot">
                      <span className="blog-qr-time">⏱️ {post.frontmatter.readTime ?? '5 min'}</span>
                      <span className="blog-qr-arrow">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Q&R */}
        {qrPosts.length > 0 && (
          <section style={{ marginBottom: 52 }}>
            <div className="blog-section-head">
              <h3>💬 Questions &amp; Réponses</h3>
            </div>
            <div className="blog-qr-grid">
              {qrPosts.map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-qr-card">
                    <QrCardVisual post={post} comparatifVs={COMPARATIF_VS_SLUGS.has(post.slug)} useCategoryGlyph={false} />
                    <div className="blog-qr-body">
                      <span className="blog-qr-tag blog-qr-tag-qr">Q&amp;R</span>
                      <div className="blog-qr-title">{post.frontmatter.title}</div>
                      <div className="blog-qr-foot">
                        <span className="blog-qr-time">⏱️ {post.frontmatter.readTime ?? '4 min'}</span>
                        <span className="blog-qr-arrow">→</span>
                      </div>
                    </div>
                  </Link>
              ))}
            </div>
          </section>
        )}

        {/* Pathologies */}
        {pathoPosts.length > 0 && (
          <section style={{ marginBottom: 52 }}>
            <div className="blog-section-head">
              <h3>🏥 Pathologies &amp; Coûts vétérinaires</h3>
            </div>
            <div className="blog-patho-grid">
              {pathoPosts.map(post => {
                const p = PATHO_ICONS[post.slug] ?? { bg: '#EFF6FF', emoji: '🐾', price: 'Variable', animal: '—' }
                const cover = coverUrl(post.frontmatter)
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-patho-card">
                    {cover ? (
                      <div className="blog-patho-thumb-wrap">
                        <Image src={cover} alt="" fill className="blog-patho-cover-img" sizes="72px" unoptimized />
                      </div>
                    ) : (
                      <div className="blog-patho-icon" style={{ background: p.bg }}>{p.emoji}</div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div className="blog-patho-tag">{p.animal}</div>
                      <div className="blog-patho-title">{post.frontmatter.title}</div>
                      <div className="blog-patho-price">
                        {p.price}
                        <span className="blog-patho-price-sub">coût de traitement</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Guides & Comparatifs — filtre Tous : tout sauf les articles Race (section « Par race » en bas) */}
        {active === 'Tous' && otherPostsSansRace.length > 0 && (
          <section style={{ marginBottom: 52 }}>
            <div className="blog-section-head">
              <h3>📚 Guides &amp; Comparatifs</h3>
            </div>
            <div className="blog-qr-grid">{otherPostsSansRace.map(renderOtherCard)}</div>
          </section>
        )}

        {/* Par race — filtre « Tous » : en bas de page après les autres blocs */}
        {active === 'Tous' && racePosts.length > 0 && (
          <section style={{ marginBottom: 52 }}>
            <div className="blog-section-head">
              <h3>🐕 Par race</h3>
            </div>
            <div className="blog-qr-grid">{racePosts.map(renderOtherCard)}</div>
          </section>
        )}

        {/* Autres — un seul filtre actif (Race, Guide, Comparatif, Conseil…) */}
        {active !== 'Tous' && otherPosts.length > 0 && (
          <section style={{ marginBottom: 52 }}>
            <div className="blog-section-head">
              <h3>
                {active === 'Comparatif' && '⚖️ Comparatifs'}
                {active === 'Guide' && '📖 Guides pratiques'}
                {active === 'Race' && '🐕 Par race'}
                {active === 'Conseil' && '💡 Conseils'}
              </h3>
            </div>
            <div className="blog-qr-grid">{otherPosts.map(renderOtherCard)}</div>
          </section>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-2)', fontSize: 15 }}>
            Aucun article dans cette catégorie pour le moment.
          </div>
        )}

      </div>
    </>
  )
}
