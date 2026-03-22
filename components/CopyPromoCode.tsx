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
        border: `1.5px dashed ${color}`,
        borderRadius: 'var(--radius-sm)',
        padding: '16px 20px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
          Code promo exclusif VetoAssure
        </p>
        <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0 }}>
          Utilisez ce code lors de votre souscription pour bénéficier de votre réduction.
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 18,
            fontWeight: 700,
            color,
            background: '#fff',
            border: `1px solid ${color}`,
            borderRadius: 6,
            padding: '6px 14px',
            letterSpacing: '0.1em',
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
            borderRadius: 6,
            padding: '7px 14px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          {copied ? '✓ Copié !' : 'Copier'}
        </button>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'var(--text)',
            color: '#fff',
            borderRadius: 6,
            padding: '7px 14px',
            fontSize: 12,
            fontWeight: 600,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Voir l&apos;offre →
        </a>
      </div>
    </div>
  )
}
