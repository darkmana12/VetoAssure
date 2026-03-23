import Image from 'next/image'

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
  href?: string
  logo?: string
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
  logo,
}: AssuranceListItemProps) {
  return (
    <div className="list-card">
      {/* Rank */}
      <div className="list-card-rank">{rank}</div>

      {/* Logo */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 2 }}>
        {logo ? (
          <div style={{ width: 200, height: 110, background: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 16px' }}>
            <Image src={logo} alt={`Logo ${name}`} width={176} height={86} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
          </div>
        ) : (
          <div className="list-card-logo-circle" style={{ background: color }}>
            {shortName}
          </div>
        )}
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
    </div>
  )
}
