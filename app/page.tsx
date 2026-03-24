import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import AssuranceCard from '@/components/AssuranceCard'
import RaceCard from '@/components/RaceCard'
import FaqAccordion from '@/components/FaqAccordion'
import HeroRacesDropdown from '@/components/HeroRacesDropdown'

export const metadata: Metadata = {
  title: 'VetoAssure — Comparatif assurance animaux 2026',
  description:
    'Comparatif indépendant de 8 assurances animaux en France. Scores calculés sur 6 critères, avis vérifiés et offres exclusives pour chien, chat et NAC.',
  alternates: { canonical: 'https://vetoassure.fr' },
  openGraph: {
    url: 'https://vetoassure.fr',
    title: 'VetoAssure — Comparatif assurance animaux 2026',
    description: 'Comparatif indépendant de 8 assurances animaux en France. Scores calculés sur 6 critères, avis vérifiés et offres exclusives pour chien, chat et NAC.',
  },
}

const TOP3 = [
  {
    rank: 1,
    name: 'Assurance1',
    shortName: 'A1',
    color: '#1D4ED8',
    gradientFrom: '#EFF6FF',
    gradientTo: '#DBEAFE',
    tagline: 'Meilleur rapport qualité / garanties',
    score: 9.2,
    facts: [
      { label: 'Prix\u00a0Garanties', value: '9.4' },
      { label: 'Remboursement', value: '48h' },
      { label: 'Avis clients', value: '4.6/5' },
    ],
    checks: [
      'Paiement direct chez le vétérinaire, sans avance de frais',
      'Maladies chroniques et dysplasies couvertes à vie',
      'Remboursement jusqu\'à 4\u00a0000\u00a0€/an',
      'Urgences vétérinaires 24h/7j incluses',
    ],
    price: '15€',
    priceNote: 'Devis en 2 min',
  },
  {
    rank: 2,
    name: 'Assurance2',
    shortName: 'A2',
    color: '#16A34A',
    gradientFrom: '#F0FDF4',
    gradientTo: '#DCFCE7',
    tagline: 'Remboursement le plus rapide (24h)',
    score: 8.8,
    facts: [
      { label: 'Prix\u00a0Garanties', value: '8.9' },
      { label: 'Remboursement', value: '24h' },
      { label: 'Avis clients', value: '4.4/5' },
    ],
    checks: [
      'Remboursement le plus rapide du marché',
      'Idéal pour les chats d\'appartement',
      'Sans engagement, résiliable à tout moment',
      'Maladies chroniques couvertes',
    ],
    price: '12€',
    priceNote: 'Sans engagement',
  },
  {
    rank: 3,
    name: 'Assurance3',
    shortName: 'A3',
    color: '#BE185D',
    gradientFrom: '#FDF2F8',
    gradientTo: '#FBCFE8',
    tagline: 'Spécialiste assurance animaux depuis 10 ans',
    score: 8.7,
    facts: [
      { label: 'Prix\u00a0Garanties', value: '8.8' },
      { label: 'Remboursement', value: '48h' },
      { label: 'Avis clients', value: '4.3/5' },
    ],
    checks: [
      'Spécialiste animaux depuis plus de 10 ans',
      'Tarifs parmi les plus compétitifs',
      'Formules modulables selon votre budget',
      'Devis gratuit et immédiat en ligne',
    ],
    price: '7€',
    priceNote: 'Devis gratuit',
  },
]

const LIST_ITEMS = [
  {
    slug: 'assurance-1', name: 'Assurance1', shortName: 'A1', color: '#1D4ED8',
    tagline: 'Meilleur rapport qualité / garanties',
    points: [
      'Paiement direct chez le vétérinaire, sans avance de frais',
      'Maladies chroniques et dysplasies couvertes à vie',
      'Remboursement jusqu\'à 4 000€/an',
      'Urgences vétérinaires 24h/7j incluses',
      'Formules disponibles pour chiens, chats et NAC',
    ],
  },
  {
    slug: 'assurance-2', name: 'Assurance2', shortName: 'A2', color: '#16A34A',
    tagline: 'Remboursement le plus rapide (24h)',
    points: [
      'Remboursement le plus rapide du marché (24h)',
      'Idéal pour les chats d\'appartement',
      'Sans engagement, résiliable à tout moment',
      'Maladies chroniques couvertes',
      'Formules à partir de 12€/mois',
    ],
  },
  {
    slug: 'assurance-3', name: 'Assurance3', shortName: 'A3', color: '#BE185D',
    tagline: 'Spécialiste assurance animaux depuis 10 ans',
    points: [
      'Spécialiste animaux depuis plus de 10 ans',
      'Tarifs parmi les plus compétitifs du marché',
      'Formules modulables selon votre budget',
      'Accidents et maladies couverts dès 7€/mois',
      'Remboursement sous 48h',
    ],
  },
  {
    slug: 'assurance-4', name: 'Assurance4', shortName: 'A4', color: '#F97316',
    tagline: 'Aucune franchise · Téléconsultation 24h/24 incluse',
    points: [
      'Aucune franchise à payer',
      '100% des frais de prévention remboursés (vaccins, bilans)',
      'Téléconsultation vétérinaire illimitée 24h/24',
      'Paiement direct chez le vétérinaire via carte dédiée',
      '95% des remboursements traités en moins de 5 jours',
    ],
  },
  {
    slug: 'assurance-5', name: 'Assurance5', shortName: 'A5', color: '#EA580C',
    tagline: 'Le moins cher du marché',
    points: [
      'Le moins cher pour la couverture offerte',
      '1er mois offert à la souscription',
      'Souscription 100% en ligne en 3 minutes',
      'Conditions très claires, aucune surprise',
      'Résiliation facile, sans frais',
    ],
  },
  {
    slug: 'assurance-6', name: 'Assurance6', shortName: 'A6', color: '#7C3AED',
    tagline: 'Meilleure pour les maladies chroniques',
    points: [
      'Maladies chroniques prises en charge',
      'Téléconsultation vétérinaire incluse',
      '1 consultation vétérinaire offerte à la souscription',
      'Couvre chiens, chats et NAC',
      'Remboursement jusqu\'à 100% des frais réels',
    ],
  },
  {
    slug: 'assurance-7', name: 'Assurance7', shortName: 'A7', color: '#0891B2',
    tagline: '100% digital et sans engagement',
    points: [
      'Souscription et gestion 100% en ligne',
      'Accidents et maladies couverts',
      'Application mobile intuitive',
      'Sans engagement, résiliable à tout moment',
      'Remboursement en 48h',
    ],
  },
  {
    slug: 'assurance-8', name: 'Assurance8', shortName: 'A8', color: '#92400E',
    tagline: 'Idéal pour une couverture accidents essentielle',
    points: [
      'Souscription en moins de 3 minutes',
      'Couverture accidents complète',
      'Résiliation facile, sans frais',
      'Tarif accessible dès 11€/mois',
    ],
  },
]

const RACES = [
  { emoji: '🐕', name: 'Golden Retriever', type: 'Chien', href: '/races/golden-retriever', img: '/races/golden-retriever.webp' },
  { emoji: '🐕', name: 'Labrador', type: 'Chien', href: '/races/labrador', img: '/races/labrador.webp' },
  { emoji: '🐕', name: 'Bouledogue Français', type: 'Chien', href: '/races/bouledogue-francais', img: '/races/bouledogue-francais.webp' },
  { emoji: '🐕', name: 'Berger Allemand', type: 'Chien', href: '/races/berger-allemand', img: '/races/berger-allemand.webp' },
  { emoji: '🐈', name: 'Maine Coon', type: 'Chat', href: '/races/maine-coon', img: '/races/maine-coon.webp' },
  { emoji: '🐈', name: 'Bengal', type: 'Chat', href: '/races/bengal', img: '/races/bengal.webp' },
  { emoji: '🐕', name: 'Chihuahua', type: 'Chien', href: '/races/chihuahua', img: '/races/chihuahua.webp' },
  { emoji: '🐈', name: 'Persan', type: 'Chat', href: '/races/persan', img: '/races/persan.webp' },
]

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero-wrap">
        <div className="hero">
          <div className="hero-content">
            <div className="hero-badge">Comparatif 2026 mis à jour</div>
            <h1>Quelle assurance pour votre animal ?</h1>
            <p className="hero-subtitle">
              Nous avons analysé 8 assurances animaux pour vous. Comparez les garanties,
              les prix et les remboursements réels — par race et par profil.
            </p>
            <div className="hero-btns">
              <Link href="/chien" className="btn-secondary">🐕 Mon chien</Link>
              <Link href="/chat" className="btn-secondary">🐈 Mon chat</Link>
              <HeroRacesDropdown />
            </div>
          </div>
        </div>
      </section>

      {/* ===== TOP 3 + LISTE ===== */}
      <section className="section">
        <p className="section-label">NOTRE SÉLECTION</p>
        <h2 className="section-title">Top 3 assurances animaux 2026</h2>
        <p className="section-subtitle">Scores calculés sur 6 critères — Vérifié {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>

        {/* Top 3 */}
        <div className="top3-grid">
          {TOP3.map((item) => (
            <AssuranceCard key={item.rank} {...item} />
          ))}
        </div>

        {/* Separator */}
        <div className="list-separator">Toutes les assurances analysées</div>

        {/* Liste complète format avis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
          {LIST_ITEMS.map((a) => (
            <div
              key={a.slug}
              className="list-card"
              style={{ gridTemplateColumns: '160px 1fr auto', alignItems: 'center' }}
            >
              <div className="list-card-logo-circle" style={{ background: a.color }}>
                {a.shortName}
              </div>
              <div className="list-card-info">
                <div className="list-card-name">{a.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 6 }}>{a.tagline}</div>
                <ul className="list-card-bullets">
                  {a.points.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <div className="list-card-cta">
                <span className="list-card-btn" style={{ background: a.color }}>
                  Voir l&apos;offre →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PAR RACE ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-label">PAR RACE</p>
        <h2 className="section-title">Trouvez l&apos;assurance adaptée à votre race</h2>

        <div className="race-grid">
          {RACES.map((r) => (
            <RaceCard key={r.href} {...r} />
          ))}
        </div>
        <Link href="/races" className="see-all-link">Voir toutes les races →</Link>
      </section>

      {/* ===== CHIFFRES CLÉS ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-label">EN CHIFFRES</p>
        <h2 className="section-title">La réalité des soins vétérinaires en France</h2>

        <div className="stats-grid">
          <div className="stat-card" style={{ '--bar-color': '#1D4ED8' } as React.CSSProperties}>
            <style>{`.stat-card:nth-child(1)::before { background: #1D4ED8; }`}</style>
            <div className="stat-card-value" style={{ color: '#1D4ED8' }}>1/3</div>
            <div className="stat-card-label">des chiens nécessitent des soins urgents chaque année</div>
          </div>
          <div className="stat-card">
            <style>{`.stat-card:nth-child(2)::before { background: #DC2626; }`}</style>
            <div className="stat-card-value" style={{ color: '#DC2626' }}>1 200€</div>
            <div className="stat-card-label">coût moyen d&apos;une opération vétérinaire en France</div>
          </div>
          <div className="stat-card">
            <style>{`.stat-card:nth-child(3)::before { background: #D97706; }`}</style>
            <div className="stat-card-value" style={{ color: '#D97706' }}>5 000€</div>
            <div className="stat-card-label">jusqu&apos;où peut aller une intervention chirurgicale complexe</div>
          </div>
          <div className="stat-card">
            <style>{`.stat-card:nth-child(4)::before { background: #16A34A; }`}</style>
            <div className="stat-card-value" style={{ color: '#16A34A' }}>85%</div>
            <div className="stat-card-label">des propriétaires assurés recommandent leur assurance</div>
          </div>
        </div>

        <p className="seo-text">
          En France, le coût des soins vétérinaires a{' '}
          <strong>augmenté de plus de 40 % en dix ans</strong>. Une simple consultation chez le
          vétérinaire coûte en moyenne 40 à 70 €, et les interventions chirurgicales peuvent
          rapidement atteindre plusieurs milliers d&apos;euros. Face à ces dépenses imprévues, une{' '}
          <strong>assurance chien ou une assurance chat</strong> permet de couvrir tout ou partie des
          frais vétérinaires — et de soigner son animal sans se ruiner.
        </p>
        <p className="seo-text">
          Que vous ayez un labrador, un golden retriever, un chat de gouttière ou un bengal,{' '}
          <strong>les risques de santé existent pour tous les animaux de compagnie</strong>, quelle
          que soit leur race ou leur âge. Comparer les offres d&apos;assurance animaux avant de
          souscrire est donc indispensable pour trouver la formule la mieux adaptée à votre profil
          et à votre budget.
        </p>
      </section>

      {/* ===== POURQUOI ASSURER ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-label">POURQUOI ASSURER</p>
        <h2 className="section-title">Faut-il vraiment souscrire une assurance pour son animal ?</h2>

        <div className="why-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 14, paddingBottom: 14, justifyContent: 'space-between', height: '100%' }}>
            <p className="seo-text" style={{ marginTop: 0 }}>
              La question revient souvent :{' '}
              <strong>est-ce vraiment utile d&apos;assurer son chien ou son chat ?</strong> La réponse
              est presque toujours oui — surtout si votre animal est jeune et en bonne santé.
              C&apos;est précisément le moment idéal pour souscrire, avant l&apos;apparition de toute
              maladie préexistante qui pourrait être exclue du contrat.
            </p>
            <p className="seo-text" style={{ marginTop: 0 }}>
              Une <strong>bonne assurance animaux rembourse les frais vétérinaires</strong> liés aux
              accidents, aux maladies, aux hospitalisations et parfois même aux actes de prévention
              comme la vaccination ou la stérilisation. Selon la formule choisie, le{' '}
              <strong>taux de remboursement peut atteindre 100 % des frais réels</strong>, avec ou
              sans franchise.
            </p>
            <p className="seo-text" style={{ marginTop: 0 }}>
              Certaines races de chiens et de chats sont génétiquement prédisposées à des pathologies
              coûteuses — dysplasies chez le golden retriever, problèmes cardiaques chez le cavalier
              king charles, insuffisance rénale chez le chat persan. Pour ces animaux,{' '}
              <strong>souscrire une assurance vétérinaire adaptée à leur race</strong> est
              particulièrement recommandé.
            </p>
          </div>

          <div className="why-cards">
            <div className="why-card">
              <div className="why-card-icon" style={{ background: '#DBEAFE' }}>🏥</div>
              <div className="why-card-content">
                <div className="why-card-title">Soins imprévus couverts</div>
                <div className="why-card-desc">
                  Accidents, maladies soudaines, hospitalisations — les dépenses non planifiées sont
                  prises en charge.
                </div>
              </div>
            </div>
            <div className="why-card">
              <div className="why-card-icon" style={{ background: '#DCFCE7' }}>💊</div>
              <div className="why-card-content">
                <div className="why-card-title">Maladies chroniques</div>
                <div className="why-card-desc">
                  Diabète, insuffisance rénale, maladies de peau — certaines assurances couvrent les
                  traitements au long cours.
                </div>
              </div>
            </div>
            <div className="why-card">
              <div className="why-card-icon" style={{ background: '#FEF3C7' }}>🧬</div>
              <div className="why-card-content">
                <div className="why-card-title">Prédispositions raciales</div>
                <div className="why-card-desc">
                  Certaines races sont plus exposées. S&apos;assurer tôt évite les refus pour maladie
                  préexistante.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CE QUE COUVRE ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-label">LES GARANTIES</p>
        <h2 className="section-title">Ce que couvre une assurance animaux</h2>

        <p className="seo-text" style={{ marginTop: 0, marginBottom: 16 }}>
          Toutes les <strong>assurances animaux ne se valent pas</strong>. Les formules d&apos;entrée
          de gamme couvrent généralement les accidents et les maladies graves, tandis que les offres
          premium incluent aussi les actes de prévention, la médecine douce et la téléconsultation
          vétérinaire. Avant de choisir, il est essentiel de bien comprendre ce que couvre réellement
          votre contrat — et surtout <strong>ce qu&apos;il exclut</strong>.
        </p>

        <div className="covers-grid">
          <div className="cover-card">
            <div className="cover-card-header" style={{ background: '#EFF6FF' }}>
              <div className="cover-card-icon" style={{ background: '#DBEAFE' }}>🚑</div>
              <div className="cover-card-title">Accidents</div>
            </div>
            <ul className="cover-card-list">
              {['Fractures et blessures', 'Ingestion corps étranger', 'Morsures/accidents route', 'Chirurgie urgence'].map((item) => (
                <li key={item} style={{ '--puce-color': '#1D4ED8' } as React.CSSProperties}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#1D4ED8', flexShrink: 0, display: 'inline-block' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="cover-card">
            <div className="cover-card-header" style={{ background: '#F0FDF4' }}>
              <div className="cover-card-icon" style={{ background: '#DCFCE7' }}>🩺</div>
              <div className="cover-card-title">Maladies</div>
            </div>
            <ul className="cover-card-list">
              {['Maladies infectieuses', 'Tumeurs et cancers', 'Maladies digestives', 'Problèmes cardiaques'].map((item) => (
                <li key={item}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#16A34A', flexShrink: 0, display: 'inline-block' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="cover-card">
            <div className="cover-card-header" style={{ background: '#FFFBEB' }}>
              <div className="cover-card-icon" style={{ background: '#FEF3C7' }}>🔬</div>
              <div className="cover-card-title">Examens & soins</div>
            </div>
            <ul className="cover-card-list">
              {['Consultations vétérinaires', 'Analyses et biopsies', 'Radios et échographies', 'Médicaments'].map((item) => (
                <li key={item}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#D97706', flexShrink: 0, display: 'inline-block' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="cover-card">
            <div className="cover-card-header" style={{ background: '#FAF5FF' }}>
              <div className="cover-card-icon" style={{ background: '#F3E8FF' }}>✨</div>
              <div className="cover-card-title">Options & prévention</div>
            </div>
            <ul className="cover-card-list">
              {['Vaccinations annuelles', 'Stérilisation/castration', 'Médecines douces', 'Téléconsultation'].map((item) => (
                <li key={item}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#7C3AED', flexShrink: 0, display: 'inline-block' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="seo-text">
          La plupart des contrats prévoient un <strong>délai de carence</strong> — une période après
          la souscription pendant laquelle les sinistres ne sont pas couverts. Ce délai varie de 0 à
          30 jours selon les assureurs. Certaines offres proposent également des{' '}
          <strong>plafonds de remboursement annuels</strong> à comparer attentivement : 1 000 €,
          2 000 € ou sans limite.
        </p>

        <div className="cover-warning">
          ⚠ Les garanties varient selon les assureurs et les formules. Les maladies préexistantes ne
          sont jamais couvertes. Consultez les conditions générales avant de souscrire.
        </div>
      </section>

      {/* ===== NOTRE MÉTHODE ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-label">NOTRE MÉTHODE</p>
        <h2 className="section-title">Comment on compare</h2>
        <p className="section-subtitle">Une notation indépendante basée sur des données réelles</p>

        <div className="method-grid">
          {[
            { icon: '📋', title: 'Analyse des CGU', desc: 'Clauses cachées traquées' },
            { icon: '💶', title: 'Comparaison des prix', desc: 'Devis réels, 5 profils types' },
            { icon: '⏱', title: 'Test des remboursements', desc: 'Délais mesurés sur Trustpilot' },
            { icon: '⭐', title: 'Avis clients vérifiés', desc: 'Trustpilot + Google + forums' },
          ].map((m) => (
            <div key={m.title} className="method-item">
              <div className="method-icon">{m.icon}</div>
              <div>
                <div className="method-title">{m.title}</div>
                <div className="method-desc">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-label">QUESTIONS FRÉQUENTES</p>
        <h2 className="section-title">Ce que vous nous demandez souvent</h2>
        <div style={{ marginTop: 16 }}>
          <FaqAccordion />
        </div>
      </section>
    </>
  )
}
