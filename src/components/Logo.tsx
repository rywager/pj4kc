interface LogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

const StarIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <polygon
      points="24,3 27.5,17 41,17 30.5,25.5 34,39.5 24,31 14,39.5 17.5,25.5 7,17 20.5,17"
      fill="#F59E0B"
      opacity="0.95"
    />
    <circle cx="24" cy="24" r="6" fill="#1C0A35" />
    <circle cx="24" cy="24" r="3.5" fill="#FCD34D" />
  </svg>
)

export function Logo({ variant = 'light', size = 'md' }: LogoProps) {
  const nameColor = variant === 'light' ? '#FFFFFF' : '#1C0A35'
  const subColor = variant === 'light' ? '#A78BFA' : '#5B21B6'

  const config = {
    sm: { starSize: 26, nameSize: '13px', subSize: '8px', gap: '8px', subTracking: '0.18em' },
    md: { starSize: 36, nameSize: '18px', subSize: '10px', gap: '10px', subTracking: '0.22em' },
    lg: { starSize: 48, nameSize: '24px', subSize: '12px', gap: '14px', subTracking: '0.25em' },
  }[size]

  return (
    <div
      style={{ display: 'inline-flex', alignItems: 'center', gap: config.gap, flexShrink: 0 }}
      aria-label="PJ Guastello Jr. for Kansas City"
      role="img"
    >
      <StarIcon size={config.starSize} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <span
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 800,
            fontSize: config.nameSize,
            color: nameColor,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          PJ GUASTELLO JR.
        </span>
        <span
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 500,
            fontSize: config.subSize,
            color: subColor,
            letterSpacing: config.subTracking,
            textTransform: 'uppercase' as const,
            whiteSpace: 'nowrap',
          }}
        >
          FOR KANSAS CITY · 2027
        </span>
      </div>
    </div>
  )
}
