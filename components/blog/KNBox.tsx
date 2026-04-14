import React from 'react'

interface KNBoxProps {
  children: React.ReactNode
  /** @deprecated conservé pour compat MDX existant */
  bgFrom?: string
  bgTo?: string
  borderColor?: string
}

interface KNProps {
  val: string
  label: string
  color?: string
}

export function KN({ val, label, color = 'var(--blue)' }: KNProps) {
  return (
    <div className="blog-kn-stats-item">
      <span className="blog-kn-stats-val" style={{ color }}>
        {val}
      </span>
      <span className="blog-kn-stats-lbl">{label}</span>
    </div>
  )
}

export default function KNBox({ children }: KNBoxProps) {
  return (
    <div className="blog-kn-stats" role="region" aria-label="Chiffres clés">
      {children}
    </div>
  )
}
