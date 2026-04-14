'use client'

import { useEffect, useState } from 'react'

function slugify(raw: string): string {
  const s = raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return s || 'section'
}

export default function BlogArticleTOC() {
  const [items, setItems] = useState<{ id: string; text: string }[]>([])
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const root = document.querySelector('.blog-content')
    if (!root) return

    const used = new Set<string>()
    const h2s = root.querySelectorAll('h2')
    const next: { id: string; text: string }[] = []

    h2s.forEach((h) => {
      const text = (h.textContent || '').trim()
      if (!text) return
      let base = slugify(text)
      let id = base
      let n = 2
      while (used.has(id) || document.getElementById(id)) {
        id = `${base}-${n}`
        n += 1
      }
      used.add(id)
      h.id = id
      next.push({ id, text })
    })

    setItems(next)
  }, [])

  useEffect(() => {
    if (items.length === 0) return
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[]
    if (els.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: 0 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="blog-toc" aria-label="Table des matières">
      <div className="blog-toc-title">Dans cet article</div>
      <ul className="blog-toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={active === item.id ? 'active' : undefined}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                history.replaceState(null, '', `#${item.id}`)
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
