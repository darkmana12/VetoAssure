import Link from 'next/link'

const ROWS = [
  {
    name: 'Assurance n°1 — Meilleure couverture chirurgie',
    desc: "Remboursement jusqu'à 4 000 €/an · Paiement direct chez le vétérinaire",
    price: 'Dès 15€/mois',
    score: '9.4 / 10',
  },
  {
    name: 'Assurance n°2 — Remboursement en 24h',
    desc: 'Idéal urgences · Sans engagement · Maladies chroniques incluses',
    price: 'Dès 12€/mois',
    score: '8.9 / 10',
  },
  {
    name: 'Assurance n°3 — Le meilleur rapport qualité/prix',
    desc: 'Spécialiste animaux depuis 10 ans · Tarifs compétitifs',
    price: 'Dès 7€/mois',
    score: '8.8 / 10',
  },
] as const

/** Bloc « top 3 » en bas d’article (structure type template HTML, couleurs site) */
export default function BlogArticleTop3() {
  return (
    <div className="blog-top3-block" role="complementary" aria-label="Comparer les assurances">
      <div className="blog-top3-header">
        <div className="blog-top3-shield" aria-hidden>
          🛡️
        </div>
        <div>
          <h3 className="blog-top3-title">Protégez votre animal avant la prochaine urgence</h3>
          <p className="blog-top3-sub">
            Nos 3 meilleures assurances qui couvrent les opérations chirurgicales
          </p>
        </div>
      </div>

      <div className="blog-top3-cards">
        {ROWS.map((row) => (
          <div key={row.name} className="blog-top3-card">
            <div className="blog-top3-card-info">
              <div className="blog-top3-card-name">{row.name}</div>
              <div className="blog-top3-card-desc">{row.desc}</div>
            </div>
            <div className="blog-top3-card-meta">
              <span className="blog-top3-price">{row.price}</span>
              <span className="blog-top3-score">{row.score}</span>
              <Link href="/#comparatif" className="blog-top3-btn">
                Voir →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <p className="blog-top3-footer">
        * Tarifs indicatifs. Mis à jour en avril 2026. Liens partenaires — sans surcoût pour vous.
      </p>
    </div>
  )
}
