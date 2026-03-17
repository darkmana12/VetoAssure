import Link from 'next/link'

interface AssuranceCardProps {
  rank: number
  name: string
  shortName: string
  color: string
  gradientFrom: string
  gradientTo: string
  tagline: string
  score: number
  facts: { label: string; value: string }[]
  checks: string[]
  price: string
  priceNote: string
  href: string
}

export default function AssuranceCard({
  rank,
  name,
  shortName,
  color,
  gradientFrom,
  gradientTo,
  tagline,
  score,
  facts,
  checks,
  price,
  priceNote,
  href,
}: AssuranceCardProps) {
  return (
    <Link href={href} className="assurance-card" style={{ borderColor: color }}>

      {/* Header gradient avec logo centré */}
      <div
        className="assurance-card-header"
        style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
      >
        <div className="assurance-card-logo" style={{ background: color }}>
          {shortName}
        </div>
      </div>

      {/* Body */}
      <div className="assurance-card-body">

        <div className="assurance-card-name">{name}</div>
        <div className="assurance-card-tagline">{tagline}</div>

        {/* Stat boxes */}
        <div className="assurance-card-facts">
          {facts.map((f, i) => (
            <div key={i} className="assurance-card-fact">
              <div className="assurance-card-fact-value">{f.value}</div>
              <div className="assurance-card-fact-label">{f.label}</div>
            </div>
          ))}
        </div>

        {/* Checks */}
        <ul className="assurance-card-checks">
          {checks.map((c, i) => (
            <li key={i} className="assurance-card-check">
              <span
                className="assurance-card-check-icon"
                style={{ background: color + '22', color }}
              >
                ✓
              </span>
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="assurance-card-footer">
        <div>
          <div className="assurance-card-price">Dès {price}/mois</div>
          <div className="assurance-card-price-note">{priceNote}</div>
        </div>
        <span className="assurance-card-btn" style={{ background: color }}>
          Voir →
        </span>
      </div>

    </Link>
  )
}
