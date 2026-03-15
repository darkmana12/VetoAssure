import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-links">
          <Link href="/mentions-legales" className="footer-link">Mentions légales</Link>
          <span style={{ color: 'var(--border-2)' }}>·</span>
          <Link href="/methodologie" className="footer-link">Notre méthodologie</Link>
          <span style={{ color: 'var(--border-2)' }}>·</span>
          <Link href="/contact" className="footer-link">Contact</Link>
          <span style={{ color: 'var(--border-2)' }}>·</span>
          <Link href="/confidentialite" className="footer-link">Confidentialité</Link>
        </div>
        <div className="footer-divider" />
        <p className="footer-disclaimer">
          ⓘ VetoAssure contient des liens affiliés. Si vous souscrivez via nos liens, nous
          percevons une commission — cela ne modifie pas notre indépendance éditoriale ni le
          prix que vous payez.
        </p>
      </div>
    </footer>
  )
}
