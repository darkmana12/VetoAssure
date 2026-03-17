import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notre méthodologie — VetoAssure',
  description: 'Découvrez comment VetoAssure note et compare les assurances animaux : critères, sources et processus de vérification indépendant.',
  alternates: { canonical: 'https://vetoassure.fr/methodologie' },
}

export default function MethodologiePage() {
  return (
    <article className="section" style={{ maxWidth: 720 }}>
      <p className="section-label">TRANSPARENCE</p>
      <h1 className="section-title" style={{ fontSize: 'clamp(22px, 4vw, 30px)', marginBottom: 8 }}>
        Notre méthodologie
      </h1>
      <p className="section-subtitle">Comment on note et compare les assurances animaux</p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Indépendance éditoriale</h2>
        <p className="seo-text" style={{ marginTop: 0 }}>
          VetoAssure est un comparatif <strong>100% indépendant</strong>. Nos scores sont calculés sur la base
          de critères objectifs et publics. Aucun assureur ne peut acheter une meilleure note.
          Les liens affiliés nous permettent de financer le site, mais n&apos;influencent pas les classements.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Les 6 critères de notation</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
          {[
            { num: '01', title: 'Prix & Garanties', desc: 'Rapport entre le tarif demandé et l\'étendue réelle des garanties, testé sur 5 profils types (chien/chat, race, âge).' },
            { num: '02', title: 'Qualité des garanties', desc: 'Couverture des dysplasies, maladies chroniques, chirurgie, prévention. Analyse des CGU pour traquer les exclusions cachées.' },
            { num: '03', title: 'Délai de remboursement', desc: 'Mesure réelle des délais de remboursement via Trustpilot, Google Reviews et forums spécialisés.' },
            { num: '04', title: 'Satisfaction client', desc: 'Agrégation des avis Trustpilot, Google et forums. Pondération selon le volume et la récence des avis.' },
            { num: '05', title: 'Transparence', desc: 'Clarté des conditions générales, absence de jargon trompeur, facilité de résiliation.' },
            { num: '06', title: 'Service & Digital', desc: 'Qualité de l\'application mobile, réactivité du service client, facilité de gestion des sinistres.' },
          ].map((c) => (
            <div key={c.num} style={{ display: 'flex', gap: 16, padding: '16px', background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 22, fontFamily: 'var(--font-dm-serif)', fontWeight: 700, color: 'var(--blue)', minWidth: 32, flexShrink: 0 }}>{c.num}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{c.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Fréquence de mise à jour</h2>
        <p className="seo-text" style={{ marginTop: 0 }}>
          Les scores sont mis à jour <strong>tous les trimestres</strong> ou dès qu&apos;un assureur modifie
          significativement ses tarifs ou garanties. La date de dernière vérification est indiquée sur chaque fiche.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Sources utilisées</h2>
        <ul style={{ listStyle: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            'Conditions générales officielles de chaque assureur',
            'Devis réels obtenus via les sites des assureurs',
            'Avis Trustpilot et Google Reviews (vérifiés)',
            'Forums spécialisés (Chien.fr, Chat.fr, 60 Millions de consommateurs)',
          ].map((s) => (
            <li key={s} style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{s}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}
