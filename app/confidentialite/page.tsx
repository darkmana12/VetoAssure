import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — VetoAssure',
  description: 'Politique de confidentialité et de protection des données personnelles de VetoAssure, conformément au RGPD.',
  alternates: { canonical: 'https://vetoassure.fr/confidentialite' },
}

export default function ConfidentialitePage() {
  return (
    <article className="section" style={{ maxWidth: 720 }}>
      <h1 className="section-title" style={{ fontSize: 'clamp(22px, 4vw, 30px)', marginBottom: 32 }}>
        Politique de confidentialité
      </h1>

      <p className="seo-text" style={{ marginTop: 0, marginBottom: 32 }}>
        Dernière mise à jour : mars 2026. VetoAssure s'engage à protéger votre vie privée conformément
        au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
      </p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Données collectées</h2>
        <p className="seo-text" style={{ marginTop: 0 }}>
          VetoAssure ne collecte <strong>aucune donnée personnelle</strong> directement via le site.
          Nous n'utilisons pas de formulaire d'inscription, pas de compte utilisateur et pas de cookies
          de tracking tiers.
        </p>
        <p className="seo-text">
          Des données techniques anonymes (pages visitées, durée de session) peuvent être collectées
          via des outils d'analyse d'audience dans le but d'améliorer le service. Ces données ne permettent
          pas de vous identifier personnellement.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Liens vers des tiers</h2>
        <p className="seo-text" style={{ marginTop: 0 }}>
          VetoAssure contient des liens vers des sites d'assureurs partenaires. Lorsque vous cliquez sur
          ces liens, vous quittez notre site et êtes soumis à la politique de confidentialité de l'assureur concerné.
          Nous vous encourageons à la consulter avant de saisir vos données.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Cookies</h2>
        <p className="seo-text" style={{ marginTop: 0 }}>
          Ce site utilise uniquement des cookies strictement nécessaires au fonctionnement technique
          (mémorisation de vos préférences de navigation). Aucun cookie publicitaire ou de profilage
          n'est utilisé.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Vos droits</h2>
        <p className="seo-text" style={{ marginTop: 0 }}>
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement et
          d'opposition concernant vos données. Pour exercer ces droits, contactez-nous à :
          <strong> contact@vetoassure.fr</strong>
        </p>
        <p className="seo-text">
          Vous pouvez également introduire une réclamation auprès de la <strong>CNIL</strong> (Commission
          Nationale de l'Informatique et des Libertés) si vous estimez que vos droits ne sont pas respectés.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Contact</h2>
        <p className="seo-text" style={{ marginTop: 0 }}>
          Pour toute question relative à cette politique de confidentialité : <strong>contact@vetoassure.fr</strong>
        </p>
      </section>
    </article>
  )
}
