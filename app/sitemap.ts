import { MetadataRoute } from 'next'
import { getAllRaces, getAllBlogPosts, getAllAvis } from '@/lib/mdx'

const BASE = 'https://vetoassure.fr'

function parseDate(value: unknown): Date {
  if (value instanceof Date) return value
  if (typeof value === 'string' && value) {
    const d = new Date(value)
    if (!isNaN(d.getTime())) return d
  }
  return new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blog = getAllBlogPosts()
  const latestBlog = blog.reduce<Date>((acc, p) => {
    const d = parseDate(p.frontmatter.updatedAt ?? p.frontmatter.date)
    return d > acc ? d : acc
  }, new Date(0))
  const homeLastMod = latestBlog.getTime() === 0 ? new Date() : latestBlog

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                       lastModified: homeLastMod, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/chien`,            lastModified: homeLastMod, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/chat`,             lastModified: homeLastMod, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/races`,            lastModified: homeLastMod, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/autres-animaux`,   lastModified: homeLastMod, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog`,             lastModified: homeLastMod, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/avis`,             lastModified: homeLastMod, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/methodologie`,     lastModified: new Date('2026-01-01'), changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/contact`,          lastModified: new Date('2026-01-01'), changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/mentions-legales`, lastModified: new Date('2026-01-01'), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/confidentialite`,  lastModified: new Date('2026-01-01'), changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const racesPages: MetadataRoute.Sitemap = getAllRaces().map(
    (r: { slug?: string; updatedAt?: string; dateVerification?: string; date?: string }) => ({
      url: `${BASE}/races/${r.slug ?? ''}`,
      lastModified: parseDate(r.updatedAt ?? r.dateVerification ?? r.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  )

  const blogPages: MetadataRoute.Sitemap = blog.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: parseDate(p.frontmatter.updatedAt ?? p.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const avisPages: MetadataRoute.Sitemap = getAllAvis().map(
    (a: { slug?: string; updatedAt?: string; date?: string }) => ({
      url: `${BASE}/avis/${a.slug ?? ''}`,
      lastModified: parseDate(a.updatedAt ?? a.date),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })
  )

  return [...staticPages, ...racesPages, ...blogPages, ...avisPages]
}
