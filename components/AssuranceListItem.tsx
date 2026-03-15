import Link from 'next/link'

interface AssuranceListItemProps {
  rank: number
  name: string
  shortName: string
  color: string
  score: number
  stars: string
  points: string[]
  bonus: string
  bonusColor: string
  bonusBorder: string
  bonusBg: string
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
  price,
  href,
}: AssuranceListItemProps) {
  return (
    <Link href={href} className="list-card">
      <div className="list-card-rank">{rank}</div>

      <div className="list-card-logo">
        <div className="list-card-logo-circle" style={{ background: color }}>
          {shortName}
        </div>
        <span className="list-card-logo-name">{name}</span>
      </div>

      <div className="list-card-info">
        <div className="list-card-score">
          {score}★ {stars}
        </div>
        <div className="list-card-points">
          {points.map((p, i) => (
            <span key={i}>{p}</span>
          ))}
        </div>
        <span
          className="list-card-bonus"
          style={{
            color: bonusColor,
            borderColor: bonusBorder,
            background: bonusBg,
          }}
        >
          🎁 {bonus}
        </span>
      </div>

      <div className="list-card-cta">
        <span style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 600 }}>
          Dès {price}/mois
        </span>
        <span
          className="list-card-btn"
          style={{ background: color }}
        >
          Voir l&apos;offre →
        </span>
      </div>
    </Link>
  )
}
