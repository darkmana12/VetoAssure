'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

export interface AvisRow {
  slug: string
  nom: string
  score: number | null
  prixDes: number | null
  tagline: string
}

type SortKey = 'score' | 'prixDes' | 'nom'
type SortDir = 'asc' | 'desc'

/** Score color: red < 7, amber 7-8, green 8-9, blue 9+ */
function scoreColor(score: number): string {
  if (score >= 9) return '#1D4ED8'
  if (score >= 8) return '#15803D'
  if (score >= 7) return '#D97706'
  return '#B91C1C'
}

/** Segment label based on price + score profile */
function segment(row: AvisRow): { label: string; bg: string; color: string } | null {
  if (row.prixDes != null && row.prixDes <= 8) {
    return { label: 'Économique', bg: '#FFF7ED', color: '#C2410C' }
  }
  if (row.score != null && row.score >= 8.8) {
    return { label: 'Premium', bg: '#F5F3FF', color: '#6D28D9' }
  }
  if (row.score != null && row.score >= 7.5) {
    return { label: 'Équilibré', bg: '#EFF6FF', color: '#1D4ED8' }
  }
  return { label: 'Spécialisé', bg: '#F0FDFA', color: '#0F766E' }
}

function ScoreBar({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(100, (score / 10) * 100))
  const color = scoreColor(score)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 140 }}>
      <div
        style={{
          flex: 1,
          height: 6,
          background: '#F3F4F6',
          borderRadius: 999,
          overflow: 'hidden',
          minWidth: 70,
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: color,
            borderRadius: 999,
            transition: 'width 0.3s',
          }}
        />
      </div>
      <span
        style={{
          fontVariantNumeric: 'tabular-nums',
          fontWeight: 700,
          fontSize: 14,
          color,
          whiteSpace: 'nowrap',
        }}
      >
        {score.toFixed(1)}
      </span>
    </div>
  )
}

export default function AvisTable({ rows }: { rows: AvisRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('score')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const sorted = useMemo(() => {
    const arr = [...rows]
    arr.sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (av == null && bv == null) return 0
      if (av == null) return 1
      if (bv == null) return -1
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av
      }
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av))
    })
    return arr
  }, [rows, sortKey, sortDir])

  const onSort = (k: SortKey) => {
    if (k === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(k)
      setSortDir(k === 'nom' ? 'asc' : 'desc')
    }
  }

  const arrow = (k: SortKey) =>
    sortKey === k ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''

  const th: React.CSSProperties = {
    textAlign: 'left',
    padding: '14px 16px',
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: 'var(--text-2)',
    borderBottom: '2px solid var(--border)',
    cursor: 'pointer',
    userSelect: 'none',
    background: '#F9FAFB',
    whiteSpace: 'nowrap',
  }
  const thStatic: React.CSSProperties = { ...th, cursor: 'default' }
  const td: React.CSSProperties = {
    padding: '16px',
    borderBottom: '1px solid var(--border)',
    fontSize: 14,
    verticalAlign: 'middle',
    color: 'var(--text)',
  }

  return (
    <div
      style={{
        overflowX: 'auto',
        border: '1px solid var(--border)',
        borderRadius: 12,
        marginTop: 24,
        background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 820 }}>
        <thead>
          <tr>
            <th style={th} onClick={() => onSort('nom')}>Assureur{arrow('nom')}</th>
            <th style={th} onClick={() => onSort('score')}>Score VetoAssure{arrow('score')}</th>
            <th style={th} onClick={() => onSort('prixDes')}>Prix dès{arrow('prixDes')}</th>
            <th style={thStatic}>Différenciant</th>
            <th style={thStatic}></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((a) => {
            const seg = segment(a)
            return (
              <tr
                key={a.slug}
                style={{ transition: 'background 0.15s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#FAFBFC')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ ...td, whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{a.nom}</span>
                    {seg && (
                      <span
                        style={{
                          alignSelf: 'flex-start',
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: 999,
                          background: seg.bg,
                          color: seg.color,
                          letterSpacing: 0.3,
                        }}
                      >
                        {seg.label}
                      </span>
                    )}
                  </div>
                </td>
                <td style={td}>
                  {a.score != null ? <ScoreBar score={a.score} /> : <span style={{ color: 'var(--text-2)' }}>—</span>}
                </td>
                <td
                  style={{
                    ...td,
                    fontVariantNumeric: 'tabular-nums',
                    whiteSpace: 'nowrap',
                    fontWeight: 600,
                  }}
                >
                  {a.prixDes != null ? `${a.prixDes} €/mois` : '—'}
                </td>
                <td style={{ ...td, color: 'var(--text-2)', lineHeight: 1.5, minWidth: 260 }}>
                  {a.tagline || '—'}
                </td>
                <td style={{ ...td, whiteSpace: 'nowrap', textAlign: 'right' }}>
                  <Link
                    href={`/avis/${a.slug}`}
                    style={{
                      display: 'inline-block',
                      padding: '8px 14px',
                      background: 'var(--blue, #1D4ED8)',
                      color: '#fff',
                      borderRadius: 6,
                      fontWeight: 600,
                      fontSize: 13,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Voir l&apos;avis →
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
