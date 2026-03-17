import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="hero" style={{ paddingBottom: 52 }}>
      <div style={{
        fontSize: 72,
        fontFamily: 'var(--font-dm-serif)',
        fontWeight: 700,
        color: 'var(--blue)',
        lineHeight: 1,
        marginBottom: 16,
      }}>
        404
      </div>
      <h1 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
        Page introuvable
      </h1>
      <p className="hero-subtitle">
        Cette page n&apos;existe pas ou a été déplacée. Revenez au comparatif pour trouver
        la meilleure assurance pour votre animal.
      </p>
      <div className="hero-btns">
        <Link href="/" className="btn-primary">← Retour au comparatif</Link>
        <Link href="/avis" className="btn-secondary">Voir tous les avis</Link>
      </div>
    </section>
  )
}
