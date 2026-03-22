import Link from 'next/link'

interface BlogCardProps {
  title: string
  slug: string
  description: string
  date: string
  category: string
  categoryColor?: string
}

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Guide: { bg: '#DBEAFE', text: '#1D4ED8' },
  Comparatif: { bg: '#DCFCE7', text: '#16A34A' },
  Race: { bg: '#FEF3C7', text: '#92400E' },
  Conseil: { bg: '#F3E8FF', text: '#7C3AED' },
}

export default function BlogCard({ title, slug, description, date, category }: BlogCardProps) {
  const colors = CAT_COLORS[category] ?? { bg: '#F3F4F6', text: '#374151' }
  return (
    <Link
      href={`/blog/${slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        padding: 20,
        textDecoration: 'none',
        color: 'inherit',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      }}
      className="blog-card"
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          background: colors.bg,
          color: colors.text,
          padding: '3px 10px',
          borderRadius: 20,
          alignSelf: 'flex-start',
          marginBottom: 12,
        }}
      >
        {category}
      </span>
      <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', lineHeight: 1.4, marginBottom: 8 }}>
        {title}
      </span>
      <span style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, flex: 1 }}>
        {description}
      </span>
      <span style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 12, opacity: 0.7 }}>
        {date}
      </span>
    </Link>
  )
}
