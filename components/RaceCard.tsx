import Link from 'next/link'

interface RaceCardProps {
  emoji: string
  name: string
  type: string
  href: string
}

export default function RaceCard({ emoji, name, type, href }: RaceCardProps) {
  return (
    <Link href={href} className="race-card">
      <span className="race-card-emoji">{emoji}</span>
      <span className="race-card-name">{name}</span>
      <span className="race-card-type">{type}</span>
    </Link>
  )
}
