'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'

export default function HeroRacesDropdown() {
  const [open, setOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setOpen(true)
  }

  const handleLeave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 100)
  }

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
        🐾 Races
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M2 3.5L5 6.5L8 3.5" />
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          background: '#fff',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
          minWidth: 180,
          zIndex: 100,
          overflow: 'hidden',
        }}>
          <Link href="/races" style={{ display: 'block', padding: '10px 16px', fontSize: 13, color: 'var(--text)', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            onClick={() => setOpen(false)}
          >🐕 Races de chiens</Link>
          <Link href="/races#chats" style={{ display: 'block', padding: '10px 16px', fontSize: 13, color: 'var(--text)', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            onClick={() => setOpen(false)}
          >🐈 Races de chats</Link>
        </div>
      )}
    </div>
  )
}
