interface CalloutProps {
  type?: 'info' | 'warn' | 'ok'
  children: React.ReactNode
}

const STYLES = {
  info: { bg: '#EFF6FF', border: '#1D4ED8', icon: 'ℹ️' },
  warn: { bg: '#FFFBEB', border: '#F59E0B', icon: '⚠️' },
  ok:   { bg: '#F0FDF4', border: '#16A34A', icon: '✅' },
}

export default function Callout({ type = 'info', children }: CalloutProps) {
  const s = STYLES[type]
  return (
    <div style={{
      background: s.bg,
      borderLeft: `4px solid ${s.border}`,
      borderRadius: 12,
      padding: '16px 20px',
      margin: '24px 0',
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
    }}>
      <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
      <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--text)' }}>{children}</div>
    </div>
  )
}
