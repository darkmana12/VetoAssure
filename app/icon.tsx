import { ImageResponse } from 'next/og'

/** Edge évite un bug Windows / Node sur @vercel/og (Invalid URL au prerender). */
export const runtime = 'edge'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#1D4ED8',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
          <ellipse cx="9" cy="4.5" rx="2.5" ry="3" />
          <ellipse cx="15" cy="4.5" rx="2.5" ry="3" />
          <ellipse cx="4.5" cy="10" rx="3" ry="2.5" />
          <ellipse cx="19.5" cy="10" rx="3" ry="2.5" />
          <path d="M12 22c-3.5 0-7-2.5-7-6.5 0-2 1.5-3.5 3-4.5 1-.7 2.5-1 4-1s3 .3 4 1c1.5 1 3 2.5 3 4.5 0 4-3.5 6.5-7 6.5z" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
