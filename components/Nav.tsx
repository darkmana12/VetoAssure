'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'

export default function Nav() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleDropdownEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setDropdownOpen(true)
  }

  const handleDropdownLeave = () => {
    closeTimerRef.current = setTimeout(() => setDropdownOpen(false), 100)
  }

  return (
    <>
      {/* Trust Bar */}
      <div className="trust-bar">
        <span>14 assurances comparées</span>
        <span className="trust-sep">·</span>
        <span>Vérifié mars 2026</span>
        <span className="trust-sep">·</span>
        <span>100% indépendant</span>
        <span className="trust-sep">·</span>
        <span>Sans publicité</span>
      </div>

      {/* Sticky Nav */}
      <nav className="nav">
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <div className="nav-logo-icon">
              <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
                <ellipse cx="9" cy="4.5" rx="2.5" ry="3" />
                <ellipse cx="15" cy="4.5" rx="2.5" ry="3" />
                <ellipse cx="4.5" cy="10" rx="3" ry="2.5" />
                <ellipse cx="19.5" cy="10" rx="3" ry="2.5" />
                <path d="M12 22c-3.5 0-7-2.5-7-6.5 0-2 1.5-3.5 3-4.5 1-.7 2.5-1 4-1s3 .3 4 1c1.5 1 3 2.5 3 4.5 0 4-3.5 6.5-7 6.5z" />
              </svg>
            </div>
            <div className="nav-logo-text">
              <span>Veto</span><span>Assure</span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="nav-links">
            <li><Link href="/" className="nav-link">TOP</Link></li>
            <li><Link href="/chien" className="nav-link">Chien</Link></li>
            <li><Link href="/chat" className="nav-link">Chat</Link></li>

            {/* Dropdown Races */}
            <li
              className={`nav-dropdown${dropdownOpen ? ' open' : ''}`}
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <div className="nav-dropdown-trigger">
                Races
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M2 3.5L5 6.5L8 3.5" />
                </svg>
              </div>
              <div className="nav-dropdown-menu">
                <Link href="/races" className="nav-dropdown-item">🐕 Races de chiens</Link>
                <Link href="/races#chats" className="nav-dropdown-item">🐈 Races de chats</Link>
              </div>
            </li>

            <li><Link href="/avis" className="nav-link">Avis</Link></li>
            <li><Link href="/autres-animaux" className="nav-link">Autres animaux</Link></li>
          </ul>

          {/* Burger */}
          <button
            className="nav-burger"
            aria-label="Menu"
            onClick={() => setDrawerOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`nav-drawer-overlay${drawerOpen ? ' open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`nav-drawer${drawerOpen ? ' open' : ''}`}>
        <button className="nav-drawer-close" onClick={() => setDrawerOpen(false)}>×</button>
        <Link href="/chien" className="nav-drawer-link" onClick={() => setDrawerOpen(false)}>Chien</Link>
        <Link href="/chat" className="nav-drawer-link" onClick={() => setDrawerOpen(false)}>Chat</Link>
        <Link href="/races" className="nav-drawer-link" onClick={() => setDrawerOpen(false)}>Races</Link>
        <Link href="/avis" className="nav-drawer-link" onClick={() => setDrawerOpen(false)}>Avis</Link>
        <Link href="/autres-animaux" className="nav-drawer-link" onClick={() => setDrawerOpen(false)}>Autres animaux</Link>
      </div>
    </>
  )
}
