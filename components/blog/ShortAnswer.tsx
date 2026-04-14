interface ShortAnswerProps {
  children: React.ReactNode
}

export default function ShortAnswer({ children }: ShortAnswerProps) {
  return (
    <div
      className="blog-short-answer"
      style={{
        background: '#111827',
        color: '#fff',
        borderRadius: 16,
        padding: 24,
        marginBottom: 32,
      }}
    >
      <div className="blog-short-answer-kicker">La réponse courte</div>
      <div className="blog-short-answer-body">{children}</div>
    </div>
  )
}
