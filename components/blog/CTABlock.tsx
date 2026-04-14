import Link from 'next/link'

interface CTABlockProps {
  title: string
  text: string
  btnLabel?: string
  href?: string
  color?: string
}

export default function CTABlock({
  title,
  text,
  btnLabel = 'Voir le comparatif →',
  href = '/',
  color = '#1D4ED8',
}: CTABlockProps) {
  return (
    <div
      className="blog-mdx-cta"
      style={{
        background: color,
        borderRadius: 16,
        padding: 28,
        margin: '40px 0',
        color: '#fff',
      }}
    >
      <div className="blog-mdx-cta-title" style={{ fontSize: 22, color: '#fff', marginBottom: 10 }}>
        {title}
      </div>
      <p className="blog-mdx-cta-text" style={{ fontSize: 14, opacity: 0.85, marginBottom: 22, lineHeight: 1.6 }}>
        {text}
      </p>
      <Link
        href={href}
        className="blog-mdx-cta-btn"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: '#fff',
          color: color,
          padding: '12px 24px',
          borderRadius: 11,
          fontWeight: 700,
          fontSize: 14,
          textDecoration: 'none',
        }}
      >
        {btnLabel}
      </Link>
    </div>
  )
}
