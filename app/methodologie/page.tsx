import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Notre méthodologie — VetoAssure',
  description:
    'Comment VetoAssure note et compare les 11 assurances animaux en 2026 : 6 critères pondérés, exemple chiffré, sources, indépendance et déclaration d\'intérêts.',
  alternates: { canonical: 'https://vetoassure.fr/methodologie' },
}

const CRITERES = [
  {
    num: '01',
    title: 'Qualité des garanties',
    weight: 30,
    desc: 'Étendue de la couverture sur 12 postes : maladie, accident, chirurgie, hospitalisation, dysplasies, maladies chroniques, dentaire, prévention, médecine douce, NAC, frais de fin de vie, maladies héréditaires. Lecture des Conditions Générales pour traquer les exclusions cachées.',
  },
  {
    num: '02',
    title: 'Prix & rapport garanties/cotisation',
    weight: 20,
    desc: 'Devis réels collectés sur 5 profils types (chiot Berger Allemand, chien moyen 5 ans, chat appartement, chat senior 12 ans, NAC). Calcul du ratio (couverture obtenue ÷ prime annuelle).',
  },
  {
    num: '03',
    title: 'Délai de remboursement',
    weight: 15,
    desc: 'Mesure réelle des délais via Trustpilot, Google Reviews et forums spécialisés. Engagement contractuel vs vécu client. Pénalité si écart > 5 jours.',
  },
  {
    num: '04',
    title: 'Satisfaction client',
    weight: 15,
    desc: 'Agrégation des avis Trustpilot et Google. Pondération par volume (n ≥ 500 avis requis) et récence (24 derniers mois). Lecture qualitative des avis 1-2 étoiles pour identifier les motifs récurrents de mécontentement.',
  },
  {
    num: '05',
    title: 'Transparence',
    weight: 10,
    desc: 'Clarté des Conditions Générales (lisibilité, jargon), facilité de résiliation (loi Hamon respectée, préavis), absence de clauses abusives. Test pratique d\'un parcours de souscription.',
  },
  {
    num: '06',
    title: 'Service & digital',
    weight: 10,
    desc: 'Qualité de l\'application mobile, réactivité du service client (test de 3 demandes envoyées), simplicité de la procédure de remboursement (nombre de clics, délai upload facture).',
  },
]

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VetoAssure',
  url: 'https://vetoassure.fr',
  logo: 'https://vetoassure.fr/og-image.png',
  description:
    'Comparateur indépendant de 11 assurances animaux en France. Méthodologie publique, financement par liens affiliés sans incidence sur les classements.',
  foundingDate: '2026',
  areaServed: 'FR',
  knowsAbout: [
    'Assurance animaux',
    'Assurance chien',
    'Assurance chat',
    'Comparateur assurance',
    'Médecine vétérinaire',
  ],
}

const ABOUT_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Méthodologie VetoAssure',
  url: 'https://vetoassure.fr/methodologie',
  description:
    'Méthodologie de notation des assurances animaux : 6 critères pondérés, sources publiques, indépendance éditoriale.',
  mainEntity: {
    '@type': 'Organization',
    name: 'VetoAssure',
  },
}

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://vetoassure.fr' },
    { '@type': 'ListItem', position: 2, name: 'Méthodologie', item: 'https://vetoassure.fr/methodologie' },
  ],
}

export default function MethodologiePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_PAGE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
      />

      <article className="section" style={{ maxWidth: 760 }}>
        <p className="section-label">TRANSPARENCE</p>
        <h1 className="section-title" style={{ fontSize: 'clamp(22px, 4vw, 32px)', marginBottom: 8 }}>
          Notre méthodologie
        </h1>
        <p className="section-subtitle">
          Comment VetoAssure note et compare les 11 assurances animaux du marché français en 2026
        </p>

        {/* Indépendance */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Indépendance éditoriale
          </h2>
          <p className="seo-text" style={{ marginTop: 0 }}>
            VetoAssure est un comparatif <strong>100&nbsp;% indépendant</strong>. Aucun assureur
            ne peut acheter une meilleure note ni une position privilégiée. Les classements et
            verdicts sont produits par notre équipe éditoriale et révisés à chaque mise à jour
            trimestrielle.
          </p>
          <p className="seo-text">
            Le site est financé par des <strong>liens affiliés</strong> (commission perçue si
            vous souscrivez via un lien sortant). Cette rémunération est <strong>identique
            pour tous les assureurs partenaires</strong> : un assureur mieux classé ne nous
            rapporte pas davantage qu&apos;un assureur moins bien classé.
          </p>
        </section>

        {/* Critères pondérés */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
            Les 6 critères de notation
          </h2>
          <p className="seo-text" style={{ marginTop: 0, marginBottom: 16 }}>
            Le score final sur 10 est la <strong>moyenne pondérée</strong> de 6 critères. Total
            des poids = 100&nbsp;%. Chaque critère est noté sur 10 selon une grille
            documentée ci-dessous.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {CRITERES.map((c) => (
              <div
                key={c.num}
                style={{
                  display: 'flex',
                  gap: 16,
                  padding: 16,
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontFamily: 'var(--serif)',
                    fontWeight: 700,
                    color: 'var(--blue)',
                    minWidth: 32,
                    flexShrink: 0,
                  }}
                >
                  {c.num}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 4,
                      gap: 12,
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
                      {c.title}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        padding: '3px 10px',
                        background: '#EFF6FF',
                        color: '#1D4ED8',
                        borderRadius: 999,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Poids&nbsp;{c.weight}&nbsp;%
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
                    {c.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Exemple chiffré */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Exemple chiffré&nbsp;: comment Assurance&nbsp;1 obtient 9,0&nbsp;/&nbsp;10
          </h2>
          <div
            style={{
              padding: 20,
              background: '#F9FAFB',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              overflowX: 'auto',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 480 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: '8px 6px', color: 'var(--text-2)', fontWeight: 600 }}>Critère</th>
                  <th style={{ textAlign: 'center', padding: '8px 6px', color: 'var(--text-2)', fontWeight: 600 }}>Note</th>
                  <th style={{ textAlign: 'center', padding: '8px 6px', color: 'var(--text-2)', fontWeight: 600 }}>Poids</th>
                  <th style={{ textAlign: 'right', padding: '8px 6px', color: 'var(--text-2)', fontWeight: 600 }}>Apport</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Qualité des garanties', 9.5, 30, 2.85],
                  ['Prix & rapport garanties', 8.0, 20, 1.6],
                  ['Délai remboursement', 8.5, 15, 1.275],
                  ['Satisfaction client', 9.0, 15, 1.35],
                  ['Transparence', 9.5, 10, 0.95],
                  ['Service & digital', 10.0, 10, 1.0],
                ].map((r) => (
                  <tr key={r[0] as string} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '8px 6px' }}>{r[0]}</td>
                    <td style={{ padding: '8px 6px', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{(r[1] as number).toFixed(1)}/10</td>
                    <td style={{ padding: '8px 6px', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{r[2]}&nbsp;%</td>
                    <td style={{ padding: '8px 6px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: 'var(--text-2)' }}>{(r[3] as number).toFixed(3)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} style={{ padding: '10px 6px', textAlign: 'right', fontWeight: 700 }}>Score final</td>
                  <td style={{ padding: '10px 6px', textAlign: 'right', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--blue)' }}>9,025 / 10</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="seo-text" style={{ marginTop: 12, fontSize: 13, color: 'var(--text-2)' }}>
            Le score affiché sur la fiche est arrondi à un chiffre après la virgule (9,0/10). La
            même grille s&apos;applique aux 11 assureurs analysés.
          </p>
        </section>

        {/* Profils types */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Profils types utilisés pour les devis
          </h2>
          <ul style={{ listStyle: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'Chiot Berger Allemand 6 mois (race à risque dysplasie)',
              'Chien moyen 5 ans, race indifférente (profil standard)',
              'Chat d\'appartement 3 ans, sans pedigree (profil mass-market)',
              'Chat senior 12 ans, race standard (test de l\'âge limite)',
              'NAC : lapin 2 ans (test de la disponibilité multi-espèces)',
            ].map((s) => (
              <li key={s} style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
                {s}
              </li>
            ))}
          </ul>
          <p className="seo-text" style={{ marginTop: 12, fontSize: 13, color: 'var(--text-2)' }}>
            Les 5 devis collectés sur chaque assureur permettent de neutraliser les biais
            tarifaires liés à un profil unique.
          </p>
        </section>

        {/* Sources */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Sources utilisées
          </h2>
          <ul style={{ listStyle: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Conditions Générales</strong> publiques de chaque assureur (lecture
              intégrale, datée et archivée)
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Devis réels</strong> obtenus directement sur les sites des assureurs sur
              les 5 profils types
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Avis Trustpilot et Google Reviews</strong> (vérifiés, n ≥ 500 avis)
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Sources vétérinaires d&apos;autorité</strong> pour les données médicales
              et tarifaires&nbsp;: <a href="https://www.veterinaire.fr/" rel="noopener" target="_blank" style={{ color: 'var(--blue)' }}>Ordre national des vétérinaires</a>,{' '}
              <a href="https://www.anses.fr/" rel="noopener" target="_blank" style={{ color: 'var(--blue)' }}>ANSES</a>,{' '}
              <a href="https://sevetys.fr/" rel="noopener" target="_blank" style={{ color: 'var(--blue)' }}>Sevetys</a>,{' '}
              <a href="https://www.fregis.com/" rel="noopener" target="_blank" style={{ color: 'var(--blue)' }}>Fregis</a>,{' '}
              <a href="https://www.rvc.ac.uk/" rel="noopener" target="_blank" style={{ color: 'var(--blue)' }}>Royal Veterinary College</a>,{' '}
              <a href="https://www.centrale-canine.fr/" rel="noopener" target="_blank" style={{ color: 'var(--blue)' }}>Centrale Canine</a>,{' '}
              <a href="https://www.loof.asso.fr/" rel="noopener" target="_blank" style={{ color: 'var(--blue)' }}>LOOF</a>
            </li>
          </ul>
        </section>

        {/* Fréquence */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Fréquence de mise à jour
          </h2>
          <p className="seo-text" style={{ marginTop: 0 }}>
            Les scores sont révisés <strong>tous les trimestres</strong>, ou immédiatement dès
            qu&apos;un assureur modifie significativement ses tarifs, garanties ou Conditions
            Générales. La date de dernière vérification est indiquée sur chaque fiche
            assureur.
          </p>
          <p className="seo-text" style={{ fontSize: 13, color: 'var(--text-2)' }}>
            <strong>Dernière revue globale&nbsp;:</strong> mai 2026.
          </p>
        </section>

        {/* Conflits d'intérêts */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Déclaration d&apos;intérêts &amp; affiliation
          </h2>
          <p className="seo-text" style={{ marginTop: 0 }}>
            VetoAssure perçoit une commission lorsqu&apos;un visiteur souscrit un contrat via
            l&apos;un de nos liens sortants. Trois principes encadrent cette rémunération&nbsp;:
          </p>
          <ol style={{ listStyle: 'decimal', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Commission identique</strong> pour tous les assureurs partenaires&nbsp;:
              un assureur mieux classé ne nous rapporte pas davantage qu&apos;un assureur moins
              bien classé.
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Aucune influence sur les classements</strong>&nbsp;: les scores sont
              calculés sur les 6 critères ci-dessus, indépendamment des accords commerciaux.
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Tous les liens affiliés sont identifiés</strong> par une mention en
              footer et un attribut <code>rel=&quot;sponsored&quot;</code> conforme aux
              recommandations Google.
            </li>
          </ol>
        </section>

        {/* Équipe & contact */}
        <section style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Équipe éditoriale &amp; contact
          </h2>
          <p className="seo-text" style={{ marginTop: 0 }}>
            VetoAssure est édité par une équipe de rédacteurs spécialisés assurance et
            consommation. Le responsable éditorial supervise la grille de notation, valide les
            scores et assure le respect de la méthodologie. Pour toute question sur la
            méthodologie ou signaler une erreur, contactez-nous via la{' '}
            <Link href="/contact" style={{ color: 'var(--blue)' }}>
              page Contact
            </Link>
            .
          </p>
          <p className="seo-text" style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 12 }}>
            VetoAssure ne prodigue ni conseil médical vétérinaire personnalisé, ni conseil
            d&apos;assurance individuel. Les informations publiées sont à vocation
            exclusivement informative. Pour le diagnostic d&apos;un animal, consultez un
            vétérinaire. Pour la souscription d&apos;un contrat, lisez intégralement les
            Conditions Générales avant signature.
          </p>
        </section>
      </article>
    </>
  )
}
