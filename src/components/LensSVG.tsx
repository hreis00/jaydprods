import { motion, MotionValue } from 'framer-motion'

interface LensSVGProps {
  apertureScale: MotionValue<number>
}

const BLADE_COUNT = 9
const CENTER = 300
const BLADE_OUTER = 148
const BLADE_INNER = 46

function apertureBladePath(index: number): string {
  const angle = (index / BLADE_COUNT) * Math.PI * 2
  const nextAngle = ((index + 1.6) / BLADE_COUNT) * Math.PI * 2
  const midAngle = (angle + nextAngle) / 2
  const x1 = CENTER + Math.cos(angle) * BLADE_OUTER
  const y1 = CENTER + Math.sin(angle) * BLADE_OUTER
  const x2 = CENTER + Math.cos(nextAngle) * BLADE_OUTER
  const y2 = CENTER + Math.sin(nextAngle) * BLADE_OUTER
  const cx = CENTER + Math.cos(midAngle) * BLADE_INNER
  const cy = CENTER + Math.sin(midAngle) * BLADE_INNER
  return `M ${CENTER} ${CENTER} L ${x1} ${y1} Q ${x2} ${y2} ${cx} ${cy} Z`
}

export default function LensSVG({ apertureScale }: LensSVGProps) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        {/* Barrel metal */}
        <radialGradient id="barrelGrad" cx="33%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#858585" />
          <stop offset="20%" stopColor="#404040" />
          <stop offset="55%" stopColor="#1c1c1c" />
          <stop offset="100%" stopColor="#060606" />
        </radialGradient>

        {/* Rim light from bottom-right */}
        <linearGradient id="rimLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="75%" stopColor="white" stopOpacity="0" />
          <stop offset="90%" stopColor="#bbb" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#eee" stopOpacity="0.22" />
        </linearGradient>

        {/* Brushed aluminum for accent rings */}
        <linearGradient id="aluminum" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a0a0a0" />
          <stop offset="25%" stopColor="#585858" />
          <stop offset="50%" stopColor="#787878" />
          <stop offset="75%" stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#6a6a6a" />
        </linearGradient>

        {/* Focus ring surface */}
        <radialGradient id="focusRingGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0c0c0c" />
        </radialGradient>

        {/* Deep glass base */}
        <radialGradient id="glassBase" cx="48%" cy="42%" r="58%">
          <stop offset="0%" stopColor="#040c1a" />
          <stop offset="35%" stopColor="#020608" />
          <stop offset="70%" stopColor="#010305" />
          <stop offset="100%" stopColor="#000002" />
        </radialGradient>

        {/* Blue AR coating */}
        <radialGradient id="coatBlue" cx="42%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#1050a0" stopOpacity="0.3" />
          <stop offset="40%" stopColor="#082850" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#020810" stopOpacity="0.03" />
        </radialGradient>

        {/* Amber warm reflection (bottom-right) */}
        <radialGradient id="coatAmber" cx="68%" cy="72%" r="52%">
          <stop offset="0%" stopColor="#c06010" stopOpacity="0.18" />
          <stop offset="45%" stopColor="#7a3808" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#3a1800" stopOpacity="0" />
        </radialGradient>

        {/* Violet edge shimmer */}
        <radialGradient id="coatViolet" cx="25%" cy="75%" r="48%">
          <stop offset="0%" stopColor="#6020a0" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#200840" stopOpacity="0" />
        </radialGradient>

        {/* Main diffuse highlight upper-left */}
        <radialGradient id="specDiffuse" cx="36%" cy="28%" r="45%">
          <stop offset="0%" stopColor="white" stopOpacity="0.15" />
          <stop offset="45%" stopColor="white" stopOpacity="0.04" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Glass edge vignette */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.85" />
        </radialGradient>

        {/* Glow filter */}
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft glow for center dot */}
        <filter id="centerGlow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Lens clip */}
        <clipPath id="lensClip">
          <circle cx={CENTER} cy={CENTER} r="155" />
        </clipPath>

        {/* Aperture housing clip */}
        <clipPath id="apertureClip">
          <circle cx={CENTER} cy={CENTER} r="170" />
        </clipPath>
      </defs>

      {/* ── Outer shadow halo ── */}
      <circle cx={CENTER} cy={CENTER} r="298" fill="#020202" />
      <circle cx={CENTER} cy={CENTER} r="295" fill="#050505" />

      {/* ── Main outer barrel ── */}
      <circle cx={CENTER} cy={CENTER} r="288" fill="url(#barrelGrad)" />
      <circle cx={CENTER} cy={CENTER} r="288" fill="url(#rimLight)" />

      {/* Outer barrel edge strokes */}
      <circle cx={CENTER} cy={CENTER} r="289" fill="none" stroke="url(#aluminum)" strokeWidth="1.5" opacity="0.6" />
      <circle cx={CENTER} cy={CENTER} r="286" fill="none" stroke="#111" strokeWidth="1" opacity="0.9" />

      {/* ── Brushed aluminum accent band ── */}
      <circle cx={CENTER} cy={CENTER} r="280" fill="none" stroke="url(#aluminum)" strokeWidth="6" opacity="0.75" />
      <circle cx={CENTER} cy={CENTER} r="277" fill="none" stroke="#1a1a1a" strokeWidth="1" />
      <circle cx={CENTER} cy={CENTER} r="283" fill="none" stroke="#1a1a1a" strokeWidth="1" />

      {/* ── Knurled rubber grip ring ── */}
      <circle cx={CENTER} cy={CENTER} r="272" fill="#141414" />
      {Array.from({ length: 80 }).map((_, i) => {
        const a = (i / 80) * Math.PI * 2
        const isWide = i % 2 === 0
        return (
          <line
            key={`grip-${i}`}
            x1={CENTER + Math.cos(a) * 262}
            y1={CENTER + Math.sin(a) * 262}
            x2={CENTER + Math.cos(a) * 272}
            y2={CENTER + Math.sin(a) * 272}
            stroke={isWide ? '#222' : '#0e0e0e'}
            strokeWidth={isWide ? 1.8 : 1.2}
          />
        )
      })}
      <circle cx={CENTER} cy={CENTER} r="262" fill="#131313" />
      <circle cx={CENTER} cy={CENTER} r="272" fill="none" stroke="#2e2e2e" strokeWidth="0.5" />
      <circle cx={CENTER} cy={CENTER} r="261" fill="none" stroke="#0a0a0a" strokeWidth="1.5" />

      {/* Second aluminum accent */}
      <circle cx={CENTER} cy={CENTER} r="258" fill="none" stroke="url(#aluminum)" strokeWidth="4" opacity="0.55" />
      <circle cx={CENTER} cy={CENTER} r="255" fill="none" stroke="#111" strokeWidth="1" />

      {/* ── Focus ring ── */}
      <circle cx={CENTER} cy={CENTER} r="252" fill="url(#focusRingGrad)" />

      {/* Dense tick marks — 72 ticks */}
      {Array.from({ length: 72 }).map((_, i) => {
        const a = (i / 72) * Math.PI * 2 - Math.PI / 2
        const isMajor = i % 9 === 0
        const isMid = i % 3 === 0
        const r2 = isMajor ? 230 : isMid ? 237 : 241
        return (
          <line
            key={`tick-${i}`}
            x1={CENTER + Math.cos(a) * 247}
            y1={CENTER + Math.sin(a) * 247}
            x2={CENTER + Math.cos(a) * r2}
            y2={CENTER + Math.sin(a) * r2}
            stroke={isMajor ? '#909090' : isMid ? '#484848' : '#2a2a2a'}
            strokeWidth={isMajor ? 1.8 : isMid ? 1 : 0.7}
          />
        )
      })}

      {/* Distance labels on focus ring */}
      {(['∞', '5m', '2m', '1m', '0.7m', '0.5m'] as const).map((label, i) => {
        const a = ((i / 6) * Math.PI * 1.5) - Math.PI * 0.82
        const r = 220
        const lx = CENTER + Math.cos(a) * r
        const ly = CENTER + Math.sin(a) * r
        return (
          <text
            key={`dist-${i}`}
            x={lx} y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#787878"
            fontSize="8.5"
            fontFamily="'Courier New', monospace"
            letterSpacing="0.3"
            transform={`rotate(${(a * 180) / Math.PI + 90} ${lx} ${ly})`}
          >
            {label}
          </text>
        )
      })}

      <circle cx={CENTER} cy={CENTER} r="212" fill="none" stroke="#1e1e1e" strokeWidth="1.5" />
      <circle cx={CENTER} cy={CENTER} r="210" fill="#0c0c0c" />

      {/* ── Aperture/f-stop ring ── */}
      {/* F-stop ticks — 48 ticks */}
      {Array.from({ length: 48 }).map((_, i) => {
        const a = (i / 48) * Math.PI * 2 - Math.PI / 2
        const isMajor = i % 6 === 0
        const r2 = isMajor ? 193 : 199
        return (
          <line
            key={`fstop-${i}`}
            x1={CENTER + Math.cos(a) * 207}
            y1={CENTER + Math.sin(a) * 207}
            x2={CENTER + Math.cos(a) * r2}
            y2={CENTER + Math.sin(a) * r2}
            stroke={isMajor ? '#727272' : '#282828'}
            strokeWidth={isMajor ? 1.5 : 0.8}
          />
        )
      })}

      {/* F-stop labels */}
      {['1.4', '2', '2.8', '4', '5.6', '8', '11', '16'].map((label, i) => {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2
        const r = 182
        const lx = CENTER + Math.cos(a) * r
        const ly = CENTER + Math.sin(a) * r
        return (
          <text
            key={`fstop-${i}`}
            x={lx} y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#686868"
            fontSize="8"
            fontFamily="'Courier New', monospace"
            transform={`rotate(${(a * 180) / Math.PI + 90} ${lx} ${ly})`}
          >
            {label}
          </text>
        )
      })}

      {/* ── Inner housing ── */}
      <circle cx={CENTER} cy={CENTER} r="175" fill="#070707" />
      <circle cx={CENTER} cy={CENTER} r="175" fill="none" stroke="url(#aluminum)" strokeWidth="3" opacity="0.3" />
      <circle cx={CENTER} cy={CENTER} r="173" fill="none" stroke="#0a0a0a" strokeWidth="2" />

      {/* ── Aperture iris blades ── */}
      <motion.g
        style={{ scale: apertureScale, originX: '300px', originY: '300px' } as never}
        clipPath="url(#apertureClip)"
      >
        {Array.from({ length: BLADE_COUNT }).map((_, i) => (
          <path
            key={i}
            d={apertureBladePath(i)}
            fill="#060606"
            stroke="#181818"
            strokeWidth="0.5"
            opacity="0.98"
          />
        ))}
      </motion.g>

      {/* ── Front glass element ── */}
      <circle cx={CENTER} cy={CENTER} r="155" fill="url(#glassBase)" />

      {/* Internal lens element rings (optical depth) */}
      <circle cx={CENTER} cy={CENTER} r="138" fill="none" stroke="#0c2040" strokeWidth="1.8" opacity="0.35" />
      <circle cx={CENTER} cy={CENTER} r="118" fill="none" stroke="#081828" strokeWidth="1.2" opacity="0.28" />
      <circle cx={CENTER} cy={CENTER} r="95"  fill="none" stroke="#050f1a" strokeWidth="1"   opacity="0.22" />
      <circle cx={CENTER} cy={CENTER} r="68"  fill="none" stroke="#040c14" strokeWidth="0.8" opacity="0.18" />

      {/* AR coating layers */}
      <circle cx={CENTER} cy={CENTER} r="155" fill="url(#coatBlue)" />
      <circle cx={CENTER} cy={CENTER} r="155" fill="url(#coatAmber)" />
      <circle cx={CENTER} cy={CENTER} r="155" fill="url(#coatViolet)" />

      {/* Diffuse highlight overlay */}
      <circle cx={CENTER} cy={CENTER} r="155" fill="url(#specDiffuse)" />

      {/* Glass edge vignette */}
      <circle cx={CENTER} cy={CENTER} r="155" fill="url(#vignette)" />

      {/* ── Specular highlights ── */}
      {/* Large soft specular arc */}
      <ellipse
        cx={CENTER - 38} cy={CENTER - 52}
        rx="60" ry="22"
        fill="white" opacity="0.055"
        transform={`rotate(-40 ${CENTER - 38} ${CENTER - 52})`}
        filter="url(#glow)"
      />

      {/* Sharp inner specular arc */}
      <ellipse
        cx={CENTER - 18} cy={CENTER - 68}
        rx="32" ry="7"
        fill="white" opacity="0.09"
        transform={`rotate(-30 ${CENTER - 18} ${CENTER - 68})`}
      />

      {/* Tiny bright specular point — upper left */}
      <circle cx={CENTER - 55} cy={CENTER - 60} r="8" fill="white" filter="url(#glow)" opacity="0.22" />
      <circle cx={CENTER - 55} cy={CENTER - 60} r="2.8" fill="white" opacity="0.75" />

      {/* ── Center lens glow (flare dot) ── */}
      <circle cx={CENTER - 16} cy={CENTER - 20} r="22" fill="white" filter="url(#centerGlow)" opacity="0.1" />
      <circle cx={CENTER - 16} cy={CENTER - 20} r="8"  fill="white" filter="url(#centerGlow)" opacity="0.22" />
      <circle cx={CENTER - 16} cy={CENTER - 20} r="2.2" fill="white" opacity="0.92" />

      {/* ── Amber lens flare secondary ── */}
      <circle cx={CENTER + 48} cy={CENTER + 44} r="24" fill="#c06818" filter="url(#glow)" opacity="0.07" />
      <circle cx={CENTER + 48} cy={CENTER + 44} r="8"  fill="#d07820" opacity="0.05" />

      {/* ── Glass element rim bevel ── */}
      <circle cx={CENTER} cy={CENTER} r="155" fill="none" stroke="#1e4a7a" strokeWidth="1.5" opacity="0.45" />
      <circle cx={CENTER} cy={CENTER} r="153" fill="none" stroke="#0a1c2e" strokeWidth="2.5" opacity="0.55" />
      <circle cx={CENTER} cy={CENTER} r="157" fill="none" stroke="#252525" strokeWidth="1" opacity="0.9" />
    </svg>
  )
}
