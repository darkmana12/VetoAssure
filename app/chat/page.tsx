import type { Metadata } from 'next'
import Link from 'next/link'
import AssuranceListItem from '@/components/AssuranceListItem'
import RaceCard from '@/components/RaceCard'

export const metadata: Metadata = {
  title: 'Meilleure assurance chat 2026 — Comparatif complet',
  description:
    'Quelle assurance chat choisir en 2026 ? Insuffisance rénale, maladies chroniques, chat d\'appartement : on compare les remboursements réels de 8 assureurs.',
  alternates: { canonical: 'https://vetoassure.fr/chat' },
  openGraph: {
    url: 'https://vetoassure.fr/chat',
    title: 'Meilleure assurance chat 2026 — Comparatif complet',
    description: 'Quelle assurance chat choisir en 2026 ? Insuffisance rénale, maladies chroniques, chat d\'appartement : on compare les remboursements réels de 8 assureurs.',
  },
}

const RACES_CHAT = [
  { emoji: '🐈', name: 'Maine Coon', type: 'Chat', href: '/races/maine-coon', img: '/races/maine-coon.webp' },
  { emoji: '🐈', name: 'Bengal', type: 'Chat', href: '/races/bengal', img: '/races/bengal.webp' },
  { emoji: '🐈', name: 'Persan', type: 'Chat', href: '/races/persan', img: '/races/persan.webp' },
  { emoji: '🐈', name: 'Siamois', type: 'Chat', href: '/races/siamois', img: '/races/siamois.webp' },
  { emoji: '🐈', name: 'Ragdoll', type: 'Chat', href: '/races/ragdoll', img: '/races/ragdoll.webp' },
  { emoji: '🐈', name: 'Sphynx', type: 'Chat', href: '/races/sphynx', img: '/races/sphynx.webp' },
  { emoji: '🐈', name: 'British Shorthair', type: 'Chat', href: '/races/british-shorthair', img: '/races/british-shorthair.webp' },
  { emoji: '🐈', name: 'Abyssin', type: 'Chat', href: '/races/abyssin', img: '/races/abyssin.webp' },
]

const LIST_CHAT = [
  {
    rank: 1, name: 'Kozoo', shortName: 'Kzoo', color: '#16A34A', logo: '/logos-assurances/kozoo_logo.jpeg',
    score: 8.8, stars: '★★★★½',
    points: ['Formule Cat Indoor spécialement conçue pour les chats d\'appartement', 'Insuffisance rénale et maladies chroniques couvertes', 'Remboursement en 24h, sans engagement'],
    bonusColor: '#15803D', bonusBorder: '#86EFAC', bonusBg: '#F0FDF4',
    price: '12€',
  },
  {
    rank: 2, name: 'SantéVet', shortName: 'SVet', color: '#1D4ED8', logo: '/logos-assurances/santevet_logo.png',
    score: 9.2, stars: '★★★★★',
    points: ['Payvet : paiement direct chez le vétérinaire, sans avance', 'Maladies génétiques et chroniques couvertes à vie', 'Remboursement jusqu\'à 4 000€/an pour les soins lourds'],
    bonusColor: '#1D4ED8', bonusBorder: '#93C5FD', bonusBg: '#EFF6FF',
    price: '15€',
  },
  {
    rank: 3, name: 'AssurOPoil', shortName: 'AOP', color: '#BE185D',
    score: 8.7, stars: '★★★★½',
    points: ['Spécialiste assurance chat depuis 10 ans', 'Tarifs parmi les plus compétitifs pour les chats de race', 'Formules modulables selon le profil de votre chat'],
    bonusColor: '#9D174D', bonusBorder: '#F9A8D4', bonusBg: '#FDF2F8',
    price: '7€',
  },
  {
    rank: 4, name: 'Barkibu', shortName: 'Bark', color: '#F97316', logo: '/logos-assurances/barkibu_logo.png',
    score: 8.6, stars: '★★★★½',
    points: ['Aucune franchise — remboursé dès le 1er euro de frais', 'Vaccins et bilans de santé annuels remboursés à 100%', 'Téléconsultation vétérinaire illimitée 24h/24'],
    bonus: 'Code promo exclusif : vetoassure25',
    bonusColor: '#EA580C', bonusBorder: '#FED7AA', bonusBg: '#FFF7ED',
    price: '20€',
  },
  {
    rank: 5, name: 'Acheel', shortName: 'Ach', color: '#EA580C',
    score: 8.5, stars: '★★★★½',
    points: ['Tarif très compétitif, idéal pour les chats sans pedigree', 'Accidents et maladies couverts dès la souscription', 'Souscription 100% en ligne en moins de 3 minutes'],
    bonusColor: '#C2410C', bonusBorder: '#FDBA74', bonusBg: '#FFF7ED',
    price: '9€',
  },
  {
    rank: 6, name: 'Fidanimo', shortName: 'Fida', color: '#7C3AED',
    score: 8.1, stars: '★★★★☆',
    points: ['Insuffisance rénale chronique et maladies longues durées couvertes', 'Téléconsultation vétérinaire incluse dans l\'abonnement', 'Devis en ligne immédiat, sans engagement'],
    bonusColor: '#6D28D9', bonusBorder: '#C4B5FD', bonusBg: '#F5F3FF',
    price: '17€',
  },
  {
    rank: 7, name: 'Dalma', shortName: 'Dalm', color: '#0891B2',
    score: 7.9, stars: '★★★★☆',
    points: ['Souscription et gestion 100% en ligne, très simple', 'Accidents et maladies du chat couverts', 'Application mobile intuitive pour suivre vos remboursements'],
    bonusColor: '#0E7490', bonusBorder: '#A5F3FC', bonusBg: '#ECFEFF',
    price: '16€',
  },
  {
    rank: 8, name: 'Hypnia', shortName: 'Hyp', color: '#92400E',
    score: 7.2, stars: '★★★½☆',
    points: ['Souscription en moins de 3 minutes', 'Couverture accidents complète pour votre chat', 'Résiliation facile, sans frais ni justificatif'],
    bonusColor: '#92400E', bonusBorder: '#FCD34D', bonusBg: '#FEF3C7',
    price: '11€',
  },
]

export default function ChatPage() {
  return (
    <>
      <section className="hero-wrap">
        <div className="hero hero--chat">
          <div className="hero-content">
            <div className="hero-badge">Comparatif assurances chat 2026</div>
            <h1>Meilleure assurance chat 2026</h1>
            <p className="hero-subtitle">
              Assurance chat : comparatif complet de 8 offres — trouvez la meilleure couverture pour
              votre chat selon sa race et son profil.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="section-label">MEILLEURES OFFRES CHAT</p>
        <h2 className="section-title">Top assurances chat 2026</h2>

        {LIST_CHAT.map((item) => (
          <AssuranceListItem key={item.rank} {...item} />
        ))}
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="races">
        <p className="section-label">PAR RACE DE CHAT</p>
        <h2 className="section-title">Assurance par race de chat</h2>
        <div className="race-grid">
          {RACES_CHAT.map((r) => (
            <RaceCard key={r.href} {...r} />
          ))}
        </div>
        <Link href="/races" className="see-all-link">Voir toutes les races →</Link>
      </section>

      <section className="section" style={{ paddingTop: 0, textAlign: 'center', paddingBottom: 48 }}>
        <Link href="/" className="btn-secondary">← Retour au comparatif</Link>
      </section>
    </>
  )
}
