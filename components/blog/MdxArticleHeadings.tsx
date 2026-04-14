import type { ComponentPropsWithoutRef } from 'react'

/** Titres MDX dans les articles : DM Sans (évite le serif global h1–h3) */
export function MdxArticleH2({ style, ...props }: ComponentPropsWithoutRef<'h2'>) {
  return (
    <h2
      {...props}
      style={{
        ...style,
        fontFamily: 'var(--sans)',
        fontWeight: 700,
      }}
    />
  )
}

export function MdxArticleH3({ style, ...props }: ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3
      {...props}
      style={{
        ...style,
        fontFamily: 'var(--sans)',
        fontWeight: 600,
      }}
    />
  )
}
