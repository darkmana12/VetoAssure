import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos de VetoAssure — Comparateur indépendant',
  description:
    'VetoAssure est un comparateur français d\'assurances animaux 100 % indépendant. Notre mission, notre équipe, nos engagements et notre modèle économique transparent.',
  alternates: { canonical: 'https://vetoassure.fr/a-propos' },
}

const ABOUT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'À propos de VetoAssure',
  url: 'https://vetoassure.fr/a-propos',
  description:
    'Présentation de VetoAssure, comparateur indépendant français d\'assurances animaux. Mission, équipe, modèle économique.',
  mainEntity: {
    '@type': 'Organization',
    name: 'VetoAssure',
    url: 'https://vetoassure.fr',
    logo: 'https://vetoassure.fr/og-image.png',
    foundingDate: '2026',
    areaServed: 'FR',
    description:
      'Comparateur indépendant des 11 principales assurances animaux du marché français. 100 % indépendant, financement par liens affiliés sans incidence sur les classements.',
    sameAs: [
      // À compléter quand les profils seront créés :
      // 'https://www.linkedin.com/company/vetoassure',
      // 'https://fr.trustpilot.com/review/vetoassure.fr',
    ],
  },
}

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://vetoassure.fr' },
    { '@type': 'ListItem', position: 2, name: 'À propos', item: 'https://vetoassure.fr/a-propos' },
  ],
}

export default function AProposPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
      />

      <article className="section" style={{ maxWidth: 760 }}>
        <p className="section-label">À PROPOS</p>
        <h1 className="section-title" style={{ fontSize: 'clamp(22px, 4vw, 32px)', marginBottom: 8 }}>
          VetoAssure&nbsp;: comparateur indépendant assurance animaux
        </h1>
        <p className="section-subtitle">
          Notre mission, notre équipe et nos engagements en 2026
        </p>

        {/* Mission */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Notre mission
          </h2>
          <p className="seo-text" style={{ marginTop: 0 }}>
            VetoAssure est né d&apos;un constat&nbsp;: le marché français de l&apos;assurance
            animaux compte <strong>11 acteurs principaux</strong>, dont les Conditions Générales
            sont denses, les exclusions parfois dissimulées et les comparatifs souvent biaisés
            par des partenariats opaques. Notre objectif est simple&nbsp;:{' '}
            <strong>fournir une information claire, vérifiée et indépendante</strong> pour aider
            les propriétaires d&apos;animaux à choisir une couverture adaptée — sans subir le
            jargon, sans pression commerciale.
          </p>
        </section>

        {/* Ce qu'on fait */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Ce que nous faisons
          </h2>
          <ul style={{ listStyle: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Comparer les 11 principaux assureurs</strong> animaux du marché français
              selon une grille publique de 6 critères pondérés (voir{' '}
              <Link href="/methodologie" style={{ color: 'var(--blue)' }}>
                méthodologie
              </Link>
              )
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Analyser les Conditions Générales</strong> de chaque contrat (taux,
              plafonds, franchises, exclusions, délais de carence)
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Documenter les pathologies vétérinaires courantes</strong> et leurs coûts
              réels en 2026, à partir de sources d&apos;autorité (Sevetys, Fregis, RVC, ANSES)
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Publier des fiches détaillées par race</strong> de chien et de chat avec
              les pathologies à risque et les couvertures adaptées
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Mettre à jour trimestriellement</strong> les scores, garanties et tarifs
            </li>
          </ul>
        </section>

        {/* Ce qu'on ne fait pas */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Ce que nous ne faisons pas
          </h2>
          <ul style={{ listStyle: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Pas de conseil médical vétérinaire personnalisé</strong>. Pour le
              diagnostic ou le suivi de votre animal, consultez un vétérinaire.
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Pas de conseil financier ou d&apos;assurance individuel</strong>. Nos
              analyses sont à vocation informative générale.
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Pas de classement payé</strong>. Aucun assureur ne peut acheter une
              meilleure note ni une position privilégiée.
            </li>
          </ul>
        </section>

        {/* Modèle économique */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Notre modèle économique
          </h2>
          <p className="seo-text" style={{ marginTop: 0 }}>
            VetoAssure est un site <strong>gratuit pour les visiteurs</strong>. Le financement
            repose exclusivement sur des <strong>commissions d&apos;affiliation</strong>{' '}
            perçues lorsqu&apos;un visiteur souscrit un contrat via l&apos;un de nos liens
            sortants vers un assureur partenaire.
          </p>
          <p className="seo-text">
            Cette commission est <strong>identique pour tous les assureurs partenaires</strong>{' '}
            : un assureur mieux classé ne nous rapporte pas davantage qu&apos;un assureur moins
            bien classé. Cela garantit l&apos;indépendance du classement vis-à-vis des accords
            commerciaux.
          </p>
          <p className="seo-text">
            Tous les liens affiliés sont identifiés par l&apos;attribut{' '}
            <code>rel=&quot;sponsored&quot;</code> conforme aux recommandations Google et par
            une mention de transparence en pied de page de chaque article.
          </p>
        </section>

        {/* Équipe éditoriale */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            L&apos;équipe éditoriale
          </h2>
          <p className="seo-text" style={{ marginTop: 0 }}>
            VetoAssure est édité par une équipe de rédacteurs spécialisés assurance et
            consommation, basés en France. Le responsable éditorial supervise la grille de
            notation, valide les scores et assure le respect de la méthodologie publique.
          </p>
          <p className="seo-text">
            Pour toute question sur la méthodologie, signaler une erreur ou suggérer un
            assureur à intégrer au comparatif, contactez-nous via la{' '}
            <Link href="/contact" style={{ color: 'var(--blue)' }}>
              page Contact
            </Link>
            .
          </p>
        </section>

        {/* Engagements */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Nos engagements
          </h2>
          <ul style={{ listStyle: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Transparence totale</strong> sur la méthodologie, les sources et le
              modèle économique
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Mise à jour trimestrielle</strong> des données tarifaires et garanties
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Sources d&apos;autorité</strong> citées et liées explicitement (Ordre des
              vétérinaires, ANSES, Sevetys, Fregis, RVC, Centrale Canine, LOOF)
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Pas de publicité tierce</strong> ni de tracking publicitaire intrusif
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong>Réponse aux signalements d&apos;erreur</strong> sous 5 jours ouvrés
            </li>
          </ul>
        </section>

        {/* Liens utiles */}
        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            En savoir plus
          </h2>
          <ul style={{ listStyle: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li style={{ fontSize: 14, color: 'var(--text-2)' }}>
              <Link href="/methodologie" style={{ color: 'var(--blue)' }}>
                Notre méthodologie complète
              </Link>{' '}
              (6 critères pondérés, exemple chiffré, sources)
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)' }}>
              <Link href="/avis" style={{ color: 'var(--blue)' }}>
                Avis détaillés des 11 assureurs
              </Link>
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)' }}>
              <Link href="/blog" style={{ color: 'var(--blue)' }}>
                Blog &amp; guides assurance animaux
              </Link>
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)' }}>
              <Link href="/mentions-legales" style={{ color: 'var(--blue)' }}>
                Mentions légales
              </Link>
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-2)' }}>
              <Link href="/confidentialite" style={{ color: 'var(--blue)' }}>
                Politique de confidentialité
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </>
  )
}
