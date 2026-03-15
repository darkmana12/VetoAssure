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

export function getAvis(slug: string) {
  const file = fs.readFileSync(path.join(contentDir, 'avis', `${slug}.mdx`), 'utf8')
  return matter(file)
}

export function getAllAvis() {
  const dir = path.join(contentDir, 'avis')
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir)
  return files.map((f) => {
    const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'))
    return data
  })
}
