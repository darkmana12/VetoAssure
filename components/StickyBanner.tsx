'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function StickyBanner() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const shouldShow =
    pathname !== '/' &&
    (pathname.startsWith('/races/') ||
      pathname === '/chien' ||
      pathname === '/chat')

  useEffect(() => {
    if (!shouldShow) return

    const handleScroll = () => {
      const scrolled = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0 && scrolled / docHeight >= 0.4) {
        setVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [shouldShow])

  if (!shouldShow || !visible || dismissed) return null

  return (
    <div className="sticky-banner">
      <p className="sticky-banner-text">
        🐾 Comparez les meilleures assurances animaux — offres exclusives disponibles
      </p>
      <div className="sticky-banner-right">
        <Link href="/" className="btn-primary" style={{ fontSize: 13, padding: '8px 18px' }}>
          Comparer →
        </Link>
        <button
          className="sticky-banner-close"
          onClick={() => setDismissed(true)}
          aria-label="Fermer"
        >
          ×
        </button>
      </div>
    </div>
  )
}
