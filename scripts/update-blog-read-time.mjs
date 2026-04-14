/**
 * Recalcule readTime dans content/blog/*.mdx à partir du nombre de mots (FR ~200 mots/min).
 * Usage : node scripts/update-blog-read-time.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const blogDir = path.join(__dirname, '..', 'content', 'blog')

/**
 * Mots/min pour lecture écran en français (guides, chiffres, listes :
 * un peu sous le 200‑220 « standard » pour rester réaliste).
 */
const WORDS_PER_MIN = 185

function countWords(markdown) {
  let t = markdown
  t = t.replace(/```[\s\S]*?```/g, ' ')
  t = t.replace(/`[^`]+`/g, ' ')
  t = t.replace(/!\[([^\]]*)\]\([^)]*\)/g, ' ')
  t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  t = t.replace(/^#{1,6}\s+/gm, ' ')
  t = t.replace(/[#*_\-|>]/g, ' ')
  const words = t
    .trim()
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w))
  return words.length
}

function minutesFromWords(n) {
  return Math.max(1, Math.ceil(n / WORDS_PER_MIN))
}

const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'))
let updated = 0

for (const file of files.sort()) {
  const full = path.join(blogDir, file)
  const raw = fs.readFileSync(full, 'utf8')
  const { data, content } = matter(raw)
  const words = countWords(content)
  const mins = minutesFromWords(words)
  const newReadTime = `${mins} min`
  const old = data.readTime

  if (old === newReadTime) continue

  data.readTime = newReadTime
  const out = matter.stringify(content, data)
  fs.writeFileSync(full, out, 'utf8')
  console.log(`${file}: ${JSON.stringify(old)} → ${newReadTime} (${words} mots)`)
  updated++
}

console.log(updated ? `\n${updated} fichier(s) mis à jour.` : 'Aucun changement (déjà à jour).')
