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
    padding: '10px 12px',
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--text-2)',
    borderBottom: '1px solid var(--border)',
    cursor: 'pointer',
    userSelect: 'none',
    background: '#FAFAFA',
    whiteSpace: 'nowrap',
  }
  const thStatic: React.CSSProperties = { ...th, cursor: 'default' }
  const td: React.CSSProperties = {
    padding: '10px 12px',
    borderBottom: '1px solid var(--border)',
    fontSize: 14,
    verticalAlign: 'middle',
    color: 'var(--text)',
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
            <tr key={a.slug}>
              <td style={{ ...td, fontWeight: 600, whiteSpace: 'nowrap' }}>
                {a.nom}
              </td>
              <td style={{ ...td, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                {a.score != null ? `${a.score.toFixed(1)} / 10` : '—'}
              </td>
              <td style={{ ...td, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                {a.prixDes != null ? `${a.prixDes} €/mois` : '—'}
              </td>
              <td style={{ ...td, color: 'var(--text-2)', lineHeight: 1.5, minWidth: 240 }}>
                {a.tagline || '—'}
              </td>
              <td style={{ ...td, whiteSpace: 'nowrap', textAlign: 'right' }}>
                <Link
                  href={`/avis/${a.slug}`}
                  style={{ color: 'var(--text-2)', fontSize: 13, textDecoration: 'underline' }}
                >
                  Fiche détaillée
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
