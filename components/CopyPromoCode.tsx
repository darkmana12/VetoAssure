'use client'
import { useState } from 'react'

interface CopyPromoCodeProps {
  code: string
  href: string
  color?: string
}

export default function CopyPromoCode({ code, href, color = '#F97316' }: CopyPromoCodeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea')
      el.value = code
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      style={{
        background: color + '0D',
        border: `1.5px solid ${color}`,
        borderRadius: 'var(--radius-sm)',
        padding: '16px 20px',
        marginBottom: 24,
        display: 'flex',
        gap: 12,
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontSize: 18, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          Code promo exclusif VetoAssure
        </p>
        <p style={{ fontSize: 17, color: 'var(--text-2)', margin: 0 }}>
          Utilisez ce code lors de votre souscription pour bénéficier de votre réduction.
        </p>
      </div>
      {/* Ligne code + bouton copier */}
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 10, width: '100%', marginTop: 14 }}>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 22,
            fontWeight: 700,
            color,
            background: '#fff',
            flex: 1,
            padding: '10px 20px',
            letterSpacing: '0.12em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1.5px solid ${color}`,
            borderRadius: 8,
          }}
        >
          {code}
        </div>
        <button
          onClick={handleCopy}
          style={{
            background: copied ? '#16A34A' : color,
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0 28px',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {copied ? '✓ Copié !' : 'Copier le code'}
        </button>
      </div>

      {/* Bouton voir l'offre pleine largeur */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: 10,
          background: color,
          color: '#fff',
          borderRadius: 8,
          padding: '13px 20px',
          fontSize: 15,
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Aller sur le site de la marque →
      </a>
    </div>
  )
}
