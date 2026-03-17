import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact — VetoAssure',
  description: 'Contactez l\'équipe VetoAssure pour toute question, signalement d\'erreur ou demande de partenariat.',
  alternates: { canonical: 'https://vetoassure.fr/contact' },
}

export default function ContactPage() {
  return (
    <article className="section" style={{ maxWidth: 720 }}>
      <p className="section-label">CONTACT</p>
      <h1 className="section-title" style={{ fontSize: 'clamp(22px, 4vw, 30px)', marginBottom: 8 }}>
        Nous contacter
      </h1>
      <p className="section-subtitle">Une question, une erreur à signaler, un partenariat ?</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>

        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '20px 24px' }}>
          <div style={{ fontSize: 24, marginBottom: 10 }}>✉️</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Email général</div>
          <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 12 }}>
            Pour toute question sur nos comparatifs, nos scores ou notre site.
          </p>
          <a href="mailto:contact@vetoassure.fr" style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}>
            contact@vetoassure.fr
          </a>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '20px 24px' }}>
          <div style={{ fontSize: 24, marginBottom: 10 }}>🔍</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Signaler une erreur</div>
          <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 12 }}>
            Vous avez repéré une information incorrecte ou obsolète sur notre site ? Merci de nous le signaler,
            nous corrigeons sous 48h.
          </p>
          <a href="mailto:erreur@vetoassure.fr" style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}>
            erreur@vetoassure.fr
          </a>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '20px 24px' }}>
          <div style={{ fontSize: 24, marginBottom: 10 }}>🤝</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Partenariat & presse</div>
          <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 12 }}>
            Vous êtes assureur, journaliste ou blogueur animalier ? Contactez-nous pour toute demande de partenariat.
          </p>
          <a href="mailto:partenariat@vetoassure.fr" style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}>
            partenariat@vetoassure.fr
          </a>
        </div>

      </div>

      <div style={{ marginTop: 32, padding: 20, background: 'var(--blue-light)', borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
        ℹ️ VetoAssure ne fournit pas de conseils en assurance au sens réglementaire.
        Pour toute question sur un contrat en cours, contactez directement votre assureur.
        Consultez nos <Link href="/mentions-legales" style={{ color: 'var(--blue)' }}>mentions légales</Link> pour plus d&apos;informations.
      </div>
    </article>
  )
}
