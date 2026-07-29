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

/** Mots vides à ignorer dans le scoring de proximité par slug. */
const SLUG_STOPWORDS = new Set([
  'assurance', 'assurances', 'meilleure', 'prix', 'cout', 'coût', 'de', 'du', 'des',
  'la', 'le', 'les', 'un', 'une', 'et', 'ou', 'pour', 'sur', 'aux', 'en', '2026',
  'traitement', 'animaux', 'animal', 'vs', 'comparatif',
])

/** Espèce déduite du slug — sert à ne pas proposer un article chat sur une page chien. */
function speciesOf(slug: string): string | null {
  if (/\bchiot|chien/.test(slug)) return 'chien'
  if (/\bchaton|chat\b|chat-|felin/.test(slug)) return 'chat'
  if (/lapin|furet|tortue|perroquet|rongeur|cheval|nac/.test(slug)) return 'nac'
  return null
}

function slugTokens(slug: string): string[] {
  const seen: Record<string, true> = {}
  const out: string[] = []
  for (const t of slug.split('-')) {
    if (t.length > 2 && !SLUG_STOPWORDS.has(t) && !seen[t]) {
      seen[t] = true
      out.push(t)
    }
  }
  return out
}

/**
 * Articles liés pour le bloc « À lire aussi ».
 *
 * Historique : cette fonction retournait `slice(0, limit)` sur la liste triée par
 * date — ce qui donnait à TOUS les articles le même bloc pointant vers les 3
 * derniers publiés (soit ~249 liens internes concentrés sur 3 cibles, et 17 pages
 * sans aucun lien entrant). Le scoring ci-dessous redistribue ces liens par
 * proximité thématique.
 *
 * Score : même catégorie (+3), même espèce (+2), chaque token de slug partagé (+1).
 * Départage par date décroissante. Repli sur les plus récents si aucun candidat
 * n'obtient de score (cas d'un article isolé dans sa thématique).
 */
export function getRelatedBlogPosts(currentSlug: string, limit = 3) {
  const all = getAllBlogPosts()
  const current = all.find((p) => p.slug === currentSlug)
  const candidates = all.filter((p) => p.slug !== currentSlug)

  // Pages non-blog (fiches race) appellent cette fonction avec un slug fictif
  // `__race__<slug>` : on score alors sur ce slug, sans catégorie de référence.
  const refSlug = current?.slug ?? currentSlug.replace(/^__race__/, '')
  const refCategory = current?.frontmatter.category
  const refSpecies = speciesOf(refSlug)
  const refTokens = slugTokens(refSlug)

  const scored = candidates.map((p) => {
    let score = 0
    if (refCategory && p.frontmatter.category === refCategory) score += 3
    const sp = speciesOf(p.slug)
    if (refSpecies && sp === refSpecies) score += 2
    for (const t of slugTokens(p.slug)) {
      if (refTokens.indexOf(t) !== -1) score += 1
    }
    return { post: p, score }
  })

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    const da = a.post.frontmatter.date ?? ''
    const db = b.post.frontmatter.date ?? ''
    return db > da ? 1 : db < da ? -1 : 0
  })

  return scored.slice(0, limit).map((s) => s.post)
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
