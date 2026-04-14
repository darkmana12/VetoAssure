import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export function getRace(slug: string) {
  const file = fs.readFileSync(path.join(contentDir, 'races', `${slug}.mdx`), 'utf8')
  return matter(file)
}

export function getAllRaces() {
  const dir = path.join(contentDir, 'races')
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir)
  return files.map((f) => {
    const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'))
    return data
  })
}


export function getBlogPost(slug: string) {
  const file = fs.readFileSync(path.join(contentDir, 'blog', `${slug}.mdx`), 'utf8')
  return matter(file)
}

export function getAllBlogPosts() {
  const dir = path.join(contentDir, 'blog')
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
  return files
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'))
      const slug = (data.slug as string) || f.replace(/\.mdx$/, '')
      return { slug, frontmatter: data as Record<string, string> }
    })
    .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1))
}

/** Articles récents autres que la page courante (pour « À lire aussi »). */
export function getRelatedBlogPosts(currentSlug: string, limit = 3) {
  return getAllBlogPosts()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, limit)
}
