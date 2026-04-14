/**
 * Server-only Unsplash helpers. Uses UNSPLASH_ACCESS_KEY from env.
 * @see https://unsplash.com/documentation
 */

export type UnsplashPhoto = {
  id: string
  urls: { regular: string; small: string; thumb: string }
  alt_description: string | null
  description: string | null
  user: { name: string; links: { html: string } }
  links: { html: string }
}

export type HeroUnsplashImage = {
  url: string
  alt: string
  photographerName: string
  photographerUrl: string
  photoPageUrl: string
}

function photoToHero(p: UnsplashPhoto): HeroUnsplashImage {
  const utm = 'utm_source=vetoassure&utm_medium=referral'
  const photoPage = p.links.html.includes('?')
    ? `${p.links.html}&${utm}`
    : `${p.links.html}?${utm}`
  const photographerUrl = p.user.links.html.includes('?')
    ? `${p.user.links.html}&${utm}`
    : `${p.user.links.html}?${utm}`
  return {
    url: p.urls.regular,
    alt: p.alt_description || p.description || 'Photo Unsplash',
    photographerName: p.user.name,
    photographerUrl,
    photoPageUrl: photoPage,
  }
}

export async function fetchRandomPhoto(query: string): Promise<UnsplashPhoto | null> {
  const key = process.env.UNSPLASH_ACCESS_KEY
  if (!key) return null
  try {
    const url = new URL('https://api.unsplash.com/photos/random')
    url.searchParams.set('query', query)
    url.searchParams.set('orientation', 'landscape')
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Client-ID ${key}` },
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    return res.json() as Promise<UnsplashPhoto>
  } catch {
    return null
  }
}

export async function fetchHeroUnsplashImage(slug: string, category: string): Promise<HeroUnsplashImage | null> {
  const q = heroUnsplashQuery(slug, category)
  const photo = await fetchRandomPhoto(q)
  return photo ? photoToHero(photo) : null
}

export function heroUnsplashQuery(slug: string, category: string): string {
  const bySlug: Record<string, string> = {
    'cancer-chien-cout-traitement': 'golden retriever dog portrait',
    'diabete-chien-cout-traitement': 'dog insulin veterinary',
    'dilatation-torsion-estomac-chien': 'large dog portrait',
    'insuffisance-renale-chronique-chat': 'cat veterinarian',
    'dysplasie-hanche-chien': 'dog walking',
  }
  if (bySlug[slug]) return bySlug[slug]
  if (category === 'QR') return 'pet owner with dog'
  return 'veterinary care dog cat'
}

export async function searchPhotos(query: string, perPage = 10): Promise<UnsplashPhoto[] | null> {
  const key = process.env.UNSPLASH_ACCESS_KEY
  if (!key) return null
  try {
    const url = new URL('https://api.unsplash.com/search/photos')
    url.searchParams.set('query', query)
    url.searchParams.set('per_page', String(Math.min(perPage, 30)))
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Client-ID ${key}` },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const data = (await res.json()) as { results: UnsplashPhoto[] }
    return data.results ?? []
  } catch {
    return null
  }
}
