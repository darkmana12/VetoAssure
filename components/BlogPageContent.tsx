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

export default function BlogPageContent({ posts, totalQR, totalPatho }: Props) {
  const [active, setActive] = useState('Tous')

  const filtered = active === 'Tous'
    ? posts
    : posts.filter(p => {
        const cat = p.frontmatter.category
        if (active === 'Q&R') return cat === 'QR'
        return cat === active
      })

  const qrPosts    = filtered.filter(p => p.frontmatter.category === 'QR')
  const pathoPosts = filtered.filter(p => p.frontmatter.category === 'Pathologie')
  const otherPosts = filtered.filter(p => p.frontmatter.category !== 'QR' && p.frontmatter.category !== 'Pathologie')

  // Hero: first pathologie or first QR from unfiltered list (pinned)
  const heroPost   = active === 'Tous' ? posts.find(p => p.frontmatter.category === 'Pathologie') ?? posts[0] : null
  const heroPatho  = heroPost ? PATHO_ICONS[heroPost.slug] : null
  const heroIsQR   = heroPost ? heroPost.frontmatter.category === 'QR' : false

  return (
    <>
      {/* Dark header */}
      <section style={{ background: '#1e293b', paddingTop: 40, marginBottom: 0 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 10 }}>
              Assurance animaux · Blog
            </p>
            <h1 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 38, color: '#fff', lineHeight: 1.1, marginBottom: 14 }}>
              Guides &amp; Conseils<br />
              <span style={{ color: '#93C5FD' }}>Assurance animaux</span>
            </h1>
            <p style={{ fontSize: 15, color: '#9CA3AF', maxWidth: 520, lineHeight: 1.65, marginBottom: 0, paddingBottom: 36 }}>
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

        {/* HERO — only shown on "Tous" */}
        {heroPost && active === 'Tous' && (
          <Link href={`/blog/${heroPost.slug}`} className="blog-hero-article" style={{ marginBottom: 52 }}>
            <div className="blog-hero-content">
              <div>
                <span className={`blog-hero-tag${heroIsQR ? ' qr' : ''}`}>
                  {heroIsQR ? '💬 Question / Réponse' : '🩺 Pathologie & Coûts'}
                </span>
                <div className="blog-hero-title">{heroPost.frontmatter.title}</div>
                <p className="blog-hero-desc">{heroPost.frontmatter.description}</p>
              </div>
              <div className="blog-hero-bottom">
                <div className="blog-hero-meta">
                  <span>📅 {heroPost.frontmatter.date}</span>
                  <span>⏱️ {heroPost.frontmatter.readTime ?? '5 min'}</span>
                  <span className="blog-hero-verified">✅ Vérifié vétérinaire</span>
                </div>
                <span className="blog-hero-btn">Lire l&rsquo;article →</span>
              </div>
            </div>
            <div className="blog-hero-visual">
              <div className="blog-hero-animal">{heroPatho?.emoji ?? '🐾'}</div>
              {heroPatho && (
                <div className="blog-hero-cost-cards">
                  <div className="blog-hcc">
                    <span className="blog-hcc-label">Coût moyen</span>
                    <span className="blog-hcc-val">{heroPatho.price}</span>
                  </div>
                  <div className="blog-hcc">
                    <span className="blog-hcc-label">Animal concerné</span>
                    <span className="blog-hcc-val">{heroPatho.animal}</span>
                  </div>
                  <div className="blog-hcc">
                    <span className="blog-hcc-label">Remboursé si assuré</span>
                    <span className="blog-hcc-val" style={{ color: '#86EFAC' }}>✓ Oui</span>
                  </div>
                </div>
              )}
            </div>
          </Link>
        )}

        {/* Q&R */}
        {qrPosts.length > 0 && (
          <section style={{ marginBottom: 52 }}>
            <div className="blog-section-head">
              <h3>💬 Questions &amp; Réponses</h3>
            </div>
            <div className="blog-qr-grid">
              {qrPosts.map(post => {
                const vis = QR_VISUALS[post.slug] ?? { bg: 'linear-gradient(135deg,#374151,#111827)', emoji: '❓' }
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-qr-card">
                    {post.slug === 'santevet-vs-kozoo-comparatif' ? (
                      <div className="blog-qr-visual" style={{ background: 'linear-gradient(135deg,#1e3a8a,#14532d)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 12px' }}>
                        <div style={{ background: '#1D4ED8', borderRadius: 6, padding: '6px 12px', display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>A1</div>
                        <span style={{ color: '#fff', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>VS</span>
                        <div style={{ background: '#16A34A', borderRadius: 6, padding: '6px 12px', display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>A2</div>
                      </div>
                    ) : (
                      <div className="blog-qr-visual" style={{ background: vis.bg }}>{vis.emoji}</div>
                    )}
                    <div className="blog-qr-body">
                      <span className="blog-qr-tag blog-qr-tag-qr">Q&amp;R</span>
                      <div className="blog-qr-title">{post.frontmatter.title}</div>
                      <p className="blog-qr-desc">{post.frontmatter.description}</p>
                      <div className="blog-qr-foot">
                        <span className="blog-qr-time">⏱️ {post.frontmatter.readTime ?? '4 min'}</span>
                        <span className="blog-qr-arrow">→</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
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
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-patho-card">
                    <div className="blog-patho-icon" style={{ background: p.bg }}>{p.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div className="blog-patho-tag">{p.animal}</div>
                      <div className="blog-patho-title">{post.frontmatter.title}</div>
                      <p className="blog-patho-desc">{post.frontmatter.description}</p>
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

        {/* Autres */}
        {otherPosts.length > 0 && (
          <section style={{ marginBottom: 52 }}>
            <div className="blog-section-head">
              <h3>
                {active === 'Comparatif' && '⚖️ Comparatifs'}
                {active === 'Guide' && '📖 Guides pratiques'}
                {active === 'Race' && '🐕 Par race'}
                {active === 'Conseil' && '💡 Conseils'}
                {(active === 'Tous' || active === 'Q&R' || active === 'Pathologie') && '📚 Guides & Comparatifs'}
              </h3>
            </div>
            <div className="blog-qr-grid">
              {otherPosts.map(post => {
                const cat = post.frontmatter.category
                const c = CAT_COLORS[cat] ?? { bg: '#F3F4F6', color: '#374151' }
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-qr-card">
                    {post.slug === 'santevet-vs-kozoo-comparatif' ? (
                      <div className="blog-qr-visual" style={{ background: 'linear-gradient(135deg,#1e3a8a,#14532d)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 12px' }}>
                        <div style={{ background: '#1D4ED8', borderRadius: 6, padding: '6px 12px', display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>A1</div>
                        <span style={{ color: '#fff', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>VS</span>
                        <div style={{ background: '#16A34A', borderRadius: 6, padding: '6px 12px', display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>A2</div>
                      </div>
                    ) : (
                      <div className="blog-qr-visual" style={{ background: '#111827' }}>
                        <span style={{ fontSize: 44 }}>
                          {cat === 'Comparatif' ? '⚖️' : cat === 'Guide' ? '📖' : cat === 'Race' ? '🐕' : '💡'}
                        </span>
                      </div>
                    )}
                    <div className="blog-qr-body">
                      <span className="blog-qr-tag" style={{ background: c.bg, color: c.color }}>
                        {CAT_LABELS[cat] ?? cat}
                      </span>
                      <div className="blog-qr-title">{post.frontmatter.title}</div>
                      <p className="blog-qr-desc">{post.frontmatter.description}</p>
                      <div className="blog-qr-foot">
                        <span className="blog-qr-time">⏱️ {post.frontmatter.readTime ?? '5 min'}</span>
                        <span className="blog-qr-arrow">→</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
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
