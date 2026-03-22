import React from 'react'

interface KNBoxProps {
  children: React.ReactNode
  bgFrom?: string
  bgTo?: string
  borderColor?: string
}

interface KNProps {
  val: string
  label: string
  color?: string
}

export function KN({ val, label, color = '#1D4ED8' }: KNProps) {
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <span style={{
        fontFamily: 'var(--font-dm-serif)',
        fontSize: 30,
        color,
        display: 'block',
        lineHeight: 1,
      }}>{val}</span>
      <span style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 6, display: 'block', lineHeight: 1.4 }}>
        {label}
      </span>
    </div>
  )
}

export default function KNBox({
  children,
  bgFrom = '#EFF6FF',
  bgTo = '#DBEAFE',
  borderColor = '#BFDBFE',
}: KNBoxProps) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${bgFrom} 0%, ${bgTo} 100%)`,
      border: `1.5px solid ${borderColor}`,
      borderRadius: 16,
      padding: 28,
      marginBottom: 36,
      display: 'flex',
      gap: 20,
    }}>
      {children}
    </div>
  )
}
