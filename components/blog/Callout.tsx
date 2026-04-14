interface CalloutProps {
  type?: 'info' | 'warn' | 'ok'
  children: React.ReactNode
}

const TYPE_CLASS: Record<string, string> = {
  info: 'blog-callout blog-callout--info',
  warn: 'blog-callout blog-callout--warning',
  ok: 'blog-callout blog-callout--success',
}

const ICON: Record<string, string> = {
  info: 'ℹ️',
  warn: '⚠️',
  ok: '✅',
}

export default function Callout({ type = 'info', children }: CalloutProps) {
  return (
    <div className={TYPE_CLASS[type] ?? TYPE_CLASS.info}>
      <span className="blog-callout-icon" aria-hidden>
        {ICON[type] ?? ICON.info}
      </span>
      <div className="blog-callout-content">{children}</div>
    </div>
  )
}
