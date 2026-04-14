import type { Metadata } from 'next'
import { getAllBlogPosts } from '@/lib/mdx'
import BlogPageContent from '@/components/BlogPageContent'

export const metadata: Metadata = {
  title: 'Blog – Assurance animaux : guides, Q&R et conseils vétérinaires',
  description: "Réponses à vos questions sur l'assurance chien et chat, coûts des pathologies, guides pratiques pour bien choisir.",
  alternates: { canonical: 'https://vetoassure.fr/blog' },
  openGraph: {
    title: 'Blog Assurance Animaux – VetoAssure',
    description: "Guides, Q&R et analyses des coûts vétérinaires pour vous aider à choisir la meilleure assurance.",
    url: 'https://vetoassure.fr/blog',
  },
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()
  const totalQR    = posts.filter(p => p.frontmatter.category === 'QR').length
  const totalPatho = posts.filter(p => p.frontmatter.category === 'Pathologie').length

  return (
    <main className="blog-pages" style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 64 }}>
      <BlogPageContent
        posts={posts}
        totalQR={totalQR}
        totalPatho={totalPatho}
      />
    </main>
  )
}
