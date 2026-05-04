import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-nav" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, marginBottom: 24, textAlign: 'left' }}>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-2)', margin: '0 0 12px' }}>Comparateur</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><Link href="/chien" className="footer-link">Assurance chien</Link></li>
              <li><Link href="/chat" className="footer-link">Assurance chat</Link></li>
              <li><Link href="/autres-animaux" className="footer-link">Autres animaux (NAC)</Link></li>
              <li><Link href="/races" className="footer-link">Toutes les races</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-2)', margin: '0 0 12px' }}>Avis assureurs</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><Link href="/avis" className="footer-link">Tous les avis</Link></li>
              <li><Link href="/blog/top-assurances-chien-2026" className="footer-link">Top assurances chien 2026</Link></li>
              <li><Link href="/blog/top-assurances-chat-2026" className="footer-link">Top assurances chat 2026</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-2)', margin: '0 0 12px' }}>Ressources</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><Link href="/blog" className="footer-link">Blog & guides</Link></li>
              <li><Link href="/blog/combien-coute-veterinaire-2026" className="footer-link">Prix vétérinaire 2026</Link></li>
              <li><Link href="/methodologie" className="footer-link">Notre méthodologie</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-2)', margin: '0 0 12px' }}>VetoAssure</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><Link href="/a-propos" className="footer-link">À propos</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
              <li><Link href="/mentions-legales" className="footer-link">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="footer-link">Confidentialité</Link></li>
            </ul>
          </div>
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
