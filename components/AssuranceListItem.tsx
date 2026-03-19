import Link from 'next/link'

interface AssuranceListItemProps {
  rank: number
  name: string
  shortName: string
  color: string
  score: number
  stars: string
  points: string[]
  bonus?: string
  bonusColor?: string
  bonusBorder?: string
  bonusBg?: string
  price: string
  href: string
}

export default function AssuranceListItem({
  rank,
  name,
  shortName,
  color,
  score,
  stars,
  points,
  bonus,
  bonusColor,
  bonusBorder,
  bonusBg,
  href,
}: AssuranceListItemProps) {
  return (
    <Link href={href} className="list-card">
      {/* Rank */}
      <div className="list-card-rank">{rank}</div>

      {/* Logo circle */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 2 }}>
        <div className="list-card-logo-circle" style={{ background: color }}>
          {shortName}
        </div>
      </div>

      {/* Main info */}
      <div className="list-card-info">
        <div className="list-card-name">{name}</div>
        <ul className="list-card-bullets">
          {points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
        {bonus && (
          <span
            className="list-card-bonus"
            style={{
              color: bonusColor,
              borderColor: bonusBorder,
              background: bonusBg,
            }}
          >
            {bonus}
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="list-card-cta">
        <div className="list-card-score-big" style={{ color }}>{score}</div>
        <div className="list-card-stars">{stars}</div>
        <span className="list-card-btn" style={{ background: color }}>
          Voir l&apos;offre →
        </span>
      </div>
    </Link>
  )
}
