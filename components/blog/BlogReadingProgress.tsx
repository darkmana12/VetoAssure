'use client'

import { useEffect, useState } from 'react'

export default function BlogReadingProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const h = el.scrollHeight - el.clientHeight
      setPct(h > 0 ? Math.min(100, Math.round((el.scrollTop / h) * 100)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="blog-reading-progress"
      style={{ width: `${pct}%` }}
      aria-hidden
    />
  )
}
