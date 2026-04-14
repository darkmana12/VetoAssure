import Link from 'next/link'

export type BlogRelatedItem = {
  slug: string
  title: string
  categoryLabel: string
  readTime: string
}

function formatReadTime(raw: string | undefined): string {
  const t = (raw ?? '5 min').trim()
  if (/lecture/i.test(t)) return t
  return `${t} de lecture`
}

/** Section « À lire aussi » — structure type template HTML, couleurs site */
export default function BlogArticleRelated({ posts }: { posts: BlogRelatedItem[] }) {
  if (posts.length === 0) return null

  return (
    <section className="blog-related" aria-labelledby="blog-related-heading">
      <h2 id="blog-related-heading" className="blog-related-title">
        À lire aussi
      </h2>
      <div className="blog-related-grid">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-related-card">
            <div className="blog-related-card-cat">{p.categoryLabel}</div>
            <div className="blog-related-card-title">{p.title}</div>
            <div className="blog-related-card-time">{formatReadTime(p.readTime)}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
