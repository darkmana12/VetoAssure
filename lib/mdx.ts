import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * MDX content loaders avec memoization module-level.
 *
 * Pourquoi : sans cache, chaque page builder appelle plusieurs fois
 * getAllBlogPosts() / getAllRaces() / getAllAvis(), qui chacun lisent
 * et parsent N fichiers depuis disque. Au build SSG, on multiplie ainsi
 * ~75 reads de blog × 2 appels par page × 75 pages = ~11 k reads inutiles.
 *
 * Fix : caches Map module-level pour les fichiers individuels + cache
 * mémoïsé pour les listes complètes. Le module persiste sur la durée du
 * process Node (build complet ou dev server). En dev, HMR invalide le
 * module quand un fichier source change → cache reset correctement.
 *
 * Vercel rule réf : server-cache-react / server-cache-lru / server-hoist-static-io.
 */

const contentDir = path.join(process.cwd(), 'content')

type Parsed = ReturnType<typeof matter>

const raceCache = new Map<string, Parsed>()
const blogCache = new Map<string, Parsed>()
const avisCache = new Map<string, Parsed>()

let allRacesCache: Record<string, unknown>[] | null = null
let allBlogCache:
  | { slug: string; frontmatter: Record<string, string> }[]
  | null = null
let allAvisCache: ({ slug: string } & Record<string, unknown>)[] | null = null

function getOrRead(
  cache: Map<string, Parsed>,
  dir: string,
  slug: string,
): Parsed {
  let parsed = cache.get(slug)
  if (!parsed) {
    parsed = matter(fs.readFileSync(path.join(dir, `${slug}.mdx`), 'utf8'))
    cache.set(slug, parsed)
  }
  return parsed
}

export function getRace(slug: string) {
  return getOrRead(raceCache, path.join(contentDir, 'races'), slug)
}

export function getAllRaces() {
  if (allRacesCache) return allRacesCache
  const dir = path.join(contentDir, 'races')
  if (!fs.existsSync(dir)) {
    allRacesCache = []
    return allRacesCache
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  allRacesCache = files.map((f) => {
    const slug = f.replace(/\.mdx$/, '')
    return getOrRead(raceCache, dir, slug).data
  })
  return allRacesCache
}

export function getBlogPost(slug: string) {
  return getOrRead(blogCache, path.join(contentDir, 'blog'), slug)
}

export function getAllBlogPosts() {
  if (allBlogCache) return allBlogCache
  const dir = path.join(contentDir, 'blog')
  if (!fs.existsSync(dir)) {
    allBlogCache = []
    return allBlogCache
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  allBlogCache = files
    .map((f) => {
      const slug = f.replace(/\.mdx$/, '')
      const { data } = getOrRead(blogCache, dir, slug)
      const finalSlug = (data.slug as string) || slug
      return { slug: finalSlug, frontmatter: data as Record<string, string> }
    })
    .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1))
  return allBlogCache
}

/** Articles récents autres que la page courante (pour « À lire aussi »). */
export function getRelatedBlogPosts(currentSlug: string, limit = 3) {
  return getAllBlogPosts()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, limit)
}

export function getAvis(slug: string) {
  return getOrRead(avisCache, path.join(contentDir, 'avis'), slug)
}

export function getAllAvis() {
  if (allAvisCache) return allAvisCache
  const dir = path.join(contentDir, 'avis')
  if (!fs.existsSync(dir)) {
    allAvisCache = []
    return allAvisCache
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  allAvisCache = files.map((f) => {
    const slug = f.replace(/\.mdx$/, '')
    const { data } = getOrRead(avisCache, dir, slug)
    const finalSlug = (data.slug as string) || slug
    return { slug: finalSlug, ...data }
  })
  return allAvisCache
}
