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
    padding: '12px 14px',
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: 'var(--text-2)',
    borderBottom: '1px solid var(--border)',
    cursor: 'pointer',
    userSelect: 'none',
    background: '#F9FAFB',
    whiteSpace: 'nowrap',
  }
  const thStatic: React.CSSProperties = { ...th, cursor: 'default' }
  const td: React.CSSProperties = {
    padding: '14px',
    borderBottom: '1px solid var(--border)',
    fontSize: 14,
    verticalAlign: 'top',
  }

  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 8, marginTop: 24, background: '#fff' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
        <thead>
          <tr>
            <th style={th} onClick={() => onSort('nom')}>Assureur{arrow('nom')}</th>
            <th style={th} onClick={() => onSort('score')}>Score{arrow('score')}</th>
            <th style={th} onClick={() => onSort('prixDes')}>Prix dès{arrow('prixDes')}</th>
            <th style={thStatic}>Différenciant</th>
            <th style={thStatic}></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((a) => (
            <tr key={a.slug} style={{ transition: 'background 0.15s' }}>
              <td style={{ ...td, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap' }}>
                {a.nom}
              </td>
              <td style={td}>
                {a.score != null ? (
                  <span style={{ display: 'inline-block', padding: '4px 10px', background: '#EFF6FF', color: '#1D4ED8', borderRadius: 6, fontWeight: 700, fontSize: 13 }}>
                    {a.score.toFixed(1)}/10
                  </span>
                ) : (
                  <span style={{ color: 'var(--text-2)' }}>—</span>
                )}
              </td>
              <td style={td}>
                {a.prixDes != null ? (
                  <span style={{ display: 'inline-block', padding: '4px 10px', background: '#F0FDF4', color: '#15803D', borderRadius: 6, fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>
                    {a.prixDes} €/mois
                  </span>
                ) : (
                  <span style={{ color: 'var(--text-2)' }}>—</span>
                )}
              </td>
              <td style={{ ...td, color: 'var(--text-2)', lineHeight: 1.5, minWidth: 240 }}>
                {a.tagline || '—'}
              </td>
              <td style={{ ...td, whiteSpace: 'nowrap' }}>
                <Link
                  href={`/avis/${a.slug}`}
                  style={{ color: 'var(--blue)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
                >
                  Voir l&apos;avis →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
