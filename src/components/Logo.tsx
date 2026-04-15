interface LogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ variant = 'light', size = 'md' }: LogoProps) {
  const textColor = variant === 'light' ? '#FFFFFF' : '#1C0A35'
  const subColor = variant === 'light' ? '#A78BFA' : '#5B21B6'
  const sizes = { sm: 0.65, md: 1, lg: 1.4 }
  const s = sizes[size]

  return (
    <svg
      width={220 * s}
      height={56 * s}
      viewBox="0 0 220 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PJ Guastello Jr. for Kansas City"
    >
      {/* North Star */}
      <g transform="translate(0,4)">
        {/* Outer glow ring */}
        <circle cx="24" cy="24" r="22" fill="#2E1065" opacity="0.5" />
        {/* 8-pointed star */}
        <polygon
          points="24,4 26.8,18.4 38,10.5 30.1,21.7 44.5,24.5 30.1,27.3 38,38.5 26.8,29.6 24,44 21.2,29.6 10,38.5 17.9,27.3 3.5,24.5 17.9,21.7 10,10.5 21.2,18.4"
          fill="#F59E0B"
          opacity="0.95"
        />
        {/* Center jewel */}
        <circle cx="24" cy="24" r="5" fill="#1C0A35" />
        <circle cx="24" cy="24" r="3" fill="#FCD34D" />
      </g>

      {/* PJ wordmark */}
      <text
        x="60"
        y="30"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="800"
        fontSize="28"
        fill={textColor}
        letterSpacing="-0.5"
      >
        PJ GUASTELLO JR.
      </text>

      {/* Tagline */}
      <text
        x="61"
        y="46"
        fontFamily="'Inter', system-ui, sans-serif"
        fontWeight="500"
        fontSize="10"
        fill={subColor}
        letterSpacing="4"
      >
        FOR KANSAS CITY · 2027
      </text>

      {/* Gold accent line */}
      <line x1="60" y1="36" x2="210" y2="36" stroke="#F59E0B" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}
