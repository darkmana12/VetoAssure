import { MetadataRoute } from 'next'
import { getAllAvis, getAllRaces } from '@/lib/mdx'

const BASE = 'https://vetoassure.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                          lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/chien`,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/chat`,                lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/avis`,                lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/races`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/autres-animaux`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/methodologie`,        lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/contact`,             lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/mentions-legales`,    lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/confidentialite`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const avisPages: MetadataRoute.Sitemap = getAllAvis().map(
    (a: { slug?: string }) => ({
      url: `${BASE}/avis/${a.slug ?? ''}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })
  )

  const racesPages: MetadataRoute.Sitemap = getAllRaces().map(
    (r: { slug?: string }) => ({
      url: `${BASE}/races/${r.slug ?? ''}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  )

  return [...staticPages, ...avisPages, ...racesPages]
}
