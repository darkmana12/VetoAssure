interface ShortAnswerProps {
  children: React.ReactNode
}

export default function ShortAnswer({ children }: ShortAnswerProps) {
  return (
    <div style={{
      background: '#111827',
      color: '#fff',
      borderRadius: 16,
      padding: 24,
      marginBottom: 32,
    }}>
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
        opacity: 0.5,
        marginBottom: 8,
      }}>La réponse courte</div>
      <div style={{ fontSize: 16, lineHeight: 1.6 }}>{children}</div>
    </div>
  )
}
