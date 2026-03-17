import Link from 'next/link'
import Image from 'next/image'

interface RaceCardProps {
  emoji: string
  name: string
  type: string
  href: string
  img?: string
}

export default function RaceCard({ emoji, name, type, href, img }: RaceCardProps) {
  return (
    <Link href={href} className="race-card">
      {img ? (
        <div className="race-card-img-wrap">
          <Image
            src={img}
            alt={`Photo d'un ${name}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="race-card-img"
          />
        </div>
      ) : (
        <span className="race-card-emoji">{emoji}</span>
      )}
      <span className="race-card-name">{name}</span>
      <span className="race-card-type">{type}</span>
    </Link>
  )
}
