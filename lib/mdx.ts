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

let raceSpeciesCache: Record<string, string> | null = null

/** Slug de race → espèce, lu dans le champ `type` (chien | chat) des fiches content/races. */
function raceSpecies(): Record<string, string> {
  if (!raceSpeciesCache) {
    raceSpeciesCache = {}
    for (const r of getAllRaces() as { slug?: string; type?: string }[]) {
      if (r.slug && r.type) raceSpeciesCache[r.slug] = r.type
    }
  }
  return raceSpeciesCache
}

/**
 * Espèce d'une page — sert à ne pas proposer un article chat sur une page chien.
 * Un nom de race (« labrador », « persan ») ne contient ni « chien » ni « chat » :
 * les fiches race et leurs articles jumeaux `meilleure-assurance-<race>` sont donc
 * résolus via le champ `type` des fiches, avant le repli sur le slug.
 */
function speciesOf(slug: string): string | null {
  const races = raceSpecies()
  const breed = slug.replace(/^meilleure-assurance-/, '')
  if (races[breed]) return races[breed]
  // `berger` et `cavalier` : races de chiens publiées sans fiche race (berger australien, cavalier king charles).
  if (/\bchiot|chien|berger|cavalier/.test(slug)) return 'chien'
  if (/\bchaton|chat\b|chat-|felin/.test(slug)) return 'chat'
  if (/lapin|furet|tortue|perroquet|rongeur|cheval|nac/.test(slug)) return 'nac'
  return null
}

/** Mots d'espèce : déjà comptés par speciesOf(), ils ne doivent pas l'être une 2e fois comme token partagé. */
const SPECIES_WORDS = new Set([
  'chien', 'chiens', 'chienne', 'chiot', 'chiots', 'chat', 'chats', 'chatte', 'chaton', 'chatons',
])

function slugTokens(slug: string): string[] {
  const seen: Record<string, true> = {}
  const out: string[] = []
  for (const t of slug.split('-')) {
    if (t.length > 2 && !SLUG_STOPWORDS.has(t) && !SPECIES_WORDS.has(t) && !seen[t]) {
      seen[t] = true
      out.push(t)
    }
  }
  return out
}

/** Hash FNV-1a 32 bits : ordre pseudo-aléatoire mais identique d'un build à l'autre. */
function stableHash(s: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

type BlogPost = ReturnType<typeof getAllBlogPosts>[number]

function relatedScore(
  ref: { category?: string; species: string | null; tokens: string[] },
  candidate: BlogPost,
): number {
  let score = 0
  if (ref.category && candidate.frontmatter.category === ref.category) score += 3
  const species = speciesOf(candidate.slug)
  if (ref.species && species === ref.species) score += 2
  // Espèces connues et différentes (page chat → article chien) : la pénalité annule le
  // bonus de catégorie, un article neutre (sans espèce) passe donc devant.
  else if (ref.species && species && species !== ref.species) score -= 3
  for (const t of slugTokens(candidate.slug)) {
    if (ref.tokens.indexOf(t) !== -1) score += 1
  }
  return score
}

function refFor(source: string, posts: BlogPost[]) {
  const current = posts.find((p) => p.slug === source)
  // Les fiches race appellent getRelatedBlogPosts avec un slug fictif `__race__<slug>` :
  // on score alors sur le slug de la race, sans catégorie de référence.
  const refSlug = current?.slug ?? source.replace(/^__race__/, '')
  return {
    category: current?.frontmatter.category,
    species: speciesOf(refSlug),
    tokens: slugTokens(refSlug),
  }
}

const relatedIndexCache = new Map<number, Map<string, string[]>>()

/**
 * Attribution globale des blocs « À lire aussi », calculée une fois pour toutes les
 * sources (articles blog + fiches race).
 *
 * Historique :
 * - avant la PR #42 : `slice(0, limit)` sur la liste triée par date → les 83 articles
 *   pointaient vers les 3 mêmes (les plus récents) ;
 * - PR #42 : scoring thématique, mais départage par date. Dans un cluster, presque tous
 *   les candidats ont le même score (catégorie +3, espèce +2, et le mot « chien » ou
 *   « chat » recompté comme token +1), donc les 3 articles les plus récents du cluster
 *   raflaient tout : mesuré le 2026-09-25, 36 liens vers un article canicule et 22
 *   articles jamais ciblés, dont cancer-chien, la page n°1 du site.
 *
 * Désormais, à score égal, on choisit l'article qui a reçu le MOINS de liens jusqu'ici
 * (équilibrage), puis un hash stable. Le score reste prioritaire : un vrai sujet
 * partagé (token commun) passe toujours devant.
 */
function buildRelatedIndex(limit: number): Map<string, string[]> {
  const posts = getAllBlogPosts()
  const sources = [
    ...posts.map((p) => p.slug),
    ...getAllRaces().map((r) => `__race__${(r as { slug?: string }).slug ?? ''}`),
  ]
  const indegree: Record<string, number> = {}
  for (const p of posts) indegree[p.slug] = 0

  const index = new Map<string, string[]>()
  for (const source of sources) {
    const ref = refFor(source, posts)
    const picked = posts
      .filter((p) => p.slug !== source)
      .map((p) => ({ slug: p.slug, score: relatedScore(ref, p), tie: stableHash(`${source}|${p.slug}`) }))
      .sort((a, b) => b.score - a.score || indegree[a.slug] - indegree[b.slug] || a.tie - b.tie)
      .slice(0, limit)
      .map((c) => c.slug)
    for (const s of picked) indegree[s]++
    index.set(source, picked)
  }
  return index
}

/** Articles liés pour le bloc « À lire aussi » (cf. buildRelatedIndex). */
export function getRelatedBlogPosts(currentSlug: string, limit = 3) {
  const posts = getAllBlogPosts()
  let index = relatedIndexCache.get(limit)
  if (!index) {
    index = buildRelatedIndex(limit)
    relatedIndexCache.set(limit, index)
  }
  const slugs = index.get(currentSlug)
  if (slugs) {
    return slugs
      .map((s) => posts.find((p) => p.slug === s))
      .filter((p): p is BlogPost => Boolean(p))
  }
  // Source inconnue de l'index : scoring local, sans équilibrage global.
  const ref = refFor(currentSlug, posts)
  return posts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({ post: p, score: relatedScore(ref, p), tie: stableHash(`${currentSlug}|${p.slug}`) }))
    .sort((a, b) => b.score - a.score || a.tie - b.tie)
    .slice(0, limit)
    .map((c) => c.post)
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
