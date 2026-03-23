import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAvis, getAllAvis } from '@/lib/mdx'
import Link from 'next/link'
import Image from 'next/image'
import CopyPromoCode from '@/components/CopyPromoCode'
import remarkGfm from 'remark-gfm'

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
  let frontmatter: Record<string, unknown> = {}
  let content: string = ''

  try {
    const { data, content: c } = getAvis(params.slug)
    frontmatter = data
    content = c
  } catch {
    notFound()
  }

  const score = frontmatter.score as number
  const prixDes = frontmatter.prixDes as number
  const remboursementDelai = frontmatter.remboursementDelai as string
  const avisClients = frontmatter.avisClients as number
  const nom = frontmatter.nom as string
  const tagline = frontmatter.tagline as string
  const logo = frontmatter.logo as string | undefined
  const promoCode = frontmatter.promoCode as string | undefined
  const promoHref = frontmatter.promoHref as string | undefined
  const pointsForts = frontmatter.pointsForts as string[] | undefined
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
    <article className="section" style={{ maxWidth: 860, background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', padding: '44px 64px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/avis" className="see-all-link" style={{ marginBottom: 16, display: 'inline-block' }}>
        ← Tous les avis
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        {logo ? (
          <div style={{ width: 120, height: 64, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '8px 14px' }}>
            <Image src={logo} alt={`Logo ${nom}`} width={100} height={48} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
          </div>
        ) : (
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
            {nom.slice(0, 4)}
          </div>
        )}
        <div>
          <h1 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            {nom} — Avis 2026
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-2)' }}>{tagline}</p>
        </div>
      </div>

      {Array.isArray(pointsForts) && (
        <div style={{ background: color + '10', borderRadius: 'var(--radius-sm)', padding: 16, marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            Points forts
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {pointsForts.map((p) => (
              <li key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: 'var(--text)' }}>
                <span style={{ color, fontWeight: 700 }}>✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
        {([
          { label: 'Dès', value: `${prixDes}€/mois` },
          { label: 'Remboursement', value: remboursementDelai },
          { label: 'Avis clients', value: `${avisClients}/5 ★` },
        ] as { label: string; value: string }[]).map((s) => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 700, color, fontFamily: 'var(--font-dm-serif)' }}>{s.value}</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {promoCode && (
        <CopyPromoCode
          code={promoCode}
          href={promoHref || 'https://www.barkibu.com/fr/'}
          color={color}
        />
      )}

      <div className="blog-content">
        <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>

      <div style={{ marginTop: 32 }}>
        <Link href="/" className="btn-primary">Comparer toutes les offres →</Link>
      </div>
    </article>
  )
}
