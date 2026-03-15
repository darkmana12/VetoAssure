import Link from 'next/link'

interface AssuranceCardProps {
  rank: number
  name: string
  shortName: string
  color: string
  gradientFrom: string
  gradientTo: string
  score: number
  facts: { label: string; value: string }[]
  checks: string[]
  price: string
  href: string
}

export default function AssuranceCard({
  rank,
  name,
  shortName,
  color,
  gradientFrom,
  gradientTo,
  score,
  facts,
  checks,
  price,
  href,
}: AssuranceCardProps) {
  return (
    <div
      className="assurance-card"
      style={{ borderColor: color }}
    >
      <div
        className="assurance-card-header"
        style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
      >
        <span
          className="assurance-card-pill"
          style={{ background: color, color: '#fff' }}
        >
          N°{rank}
        </span>
        <div className="assurance-card-logo" style={{ background: color }}>
          {shortName}
        </div>
      </div>

      <div className="assurance-card-body">
        <div className="assurance-card-score" style={{ color }}>
          {score}
        </div>

        <div className="assurance-card-facts">
          {facts.map((f, i) => (
            <span key={i} className="assurance-card-fact">
              {f.value} <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>{f.label}</span>
            </span>
          ))}
        </div>

        <ul className="assurance-card-checks">
          {checks.map((c, i) => (
            <li
              key={i}
              className="assurance-card-check"
              style={{
                '--check-color': color,
              } as React.CSSProperties}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: color + '20',
                  color,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ✓
              </span>
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="assurance-card-footer">
        <span className="assurance-card-price">Dès {price}/mois</span>
        <Link
          href={href}
          className="assurance-card-btn"
          style={{ background: color }}
        >
          Voir l&apos;offre →
        </Link>
      </div>
    </div>
  )
}
