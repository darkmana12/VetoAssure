import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales — VetoAssure',
  description: "Mentions légales du site VetoAssure — éditeur, hébergeur, propriété intellectuelle et conditions d'utilisation.",
  alternates: { canonical: 'https://vetoassure.fr/mentions-legales' },
}

export default function MentionsLegalesPage() {
  return (
    <article className="section" style={{ maxWidth: 720 }}>
      <h1 className="section-title" style={{ fontSize: 'clamp(22px, 4vw, 30px)', marginBottom: 32 }}>
        Mentions légales
      </h1>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Éditeur du site</h2>
        <p className="seo-text" style={{ marginTop: 0 }}>
          Le site <strong>VetoAssure</strong> (vetoassure.fr) est édité par une personne physique.
          Pour toute question, vous pouvez nous contacter à l&apos;adresse : <strong>contact@vetoassure.fr</strong>
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Hébergement</h2>
        <p className="seo-text" style={{ marginTop: 0 }}>
          Ce site est hébergé par <strong>Vercel Inc.</strong>, 340 Pine Street, Suite 900, San Francisco, CA 94104, États-Unis.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Propriété intellectuelle</h2>
        <p className="seo-text" style={{ marginTop: 0 }}>
          L&apos;ensemble du contenu de ce site (textes, scores, analyses, design) est la propriété exclusive de VetoAssure.
          Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Liens affiliés</h2>
        <p className="seo-text" style={{ marginTop: 0 }}>
          VetoAssure contient des <strong>liens affiliés</strong>. Lorsque vous souscrivez une assurance via nos liens,
          nous pouvons percevoir une commission de la part de l&apos;assureur. Cette rémunération ne modifie en aucun cas
          notre indépendance éditoriale, ni le prix que vous payez. Nos scores et classements sont établis
          objectivement sur la base de critères publics et vérifiables.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Limitation de responsabilité</h2>
        <p className="seo-text" style={{ marginTop: 0 }}>
          Les informations publiées sur VetoAssure sont fournies à titre indicatif et ne constituent pas un conseil
          en assurance au sens réglementaire. VetoAssure ne peut être tenu responsable des décisions prises
          sur la base de ces informations. Consultez toujours les conditions générales des assureurs avant de souscrire.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Droit applicable</h2>
        <p className="seo-text" style={{ marginTop: 0 }}>
          Le présent site est soumis au droit français. Tout litige relatif à son utilisation sera de la
          compétence exclusive des tribunaux français.
        </p>
      </section>
    </article>
  )
}
