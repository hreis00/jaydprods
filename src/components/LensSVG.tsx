import { motion, MotionValue } from 'framer-motion'

interface LensSVGProps {
  apertureScale: MotionValue<number>
}

const BLADE_COUNT = 8
const CENTER = 300
const BLADE_OUTER = 148
const BLADE_INNER = 52

function apertureBladePath(index: number): string {
  const angle = (index / BLADE_COUNT) * Math.PI * 2
  const nextAngle = ((index + 1.5) / BLADE_COUNT) * Math.PI * 2
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
        {/* Outer barrel metal gradient */}
        <radialGradient id="barrelGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#6b6b6b" />
          <stop offset="40%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#111" />
        </radialGradient>

        {/* Inner glass gradient */}
        <radialGradient id="glassGrad" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#1a3a5c" />
          <stop offset="35%" stopColor="#0a1a2e" />
          <stop offset="70%" stopColor="#050d18" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>

        {/* Coating tint */}
        <radialGradient id="coatingGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4a90d9" stopOpacity="0.12" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.04" />
        </radialGradient>

        {/* Specular highlight filter */}
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="centerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>

        {/* Clip to lens circle */}
        <clipPath id="lensClip">
          <circle cx={CENTER} cy={CENTER} r="155" />
        </clipPath>
      </defs>

      {/* ── Outermost rim shadow ── */}
      <circle cx={CENTER} cy={CENTER} r="295" fill="#080808" />

      {/* ── Outer barrel ring ── */}
      <circle cx={CENTER} cy={CENTER} r="285" fill="url(#barrelGrad)" />
      <circle cx={CENTER} cy={CENTER} r="285" fill="none" stroke="#444" strokeWidth="1.5" />

      {/* ── Knurled grip ring ── */}
      <circle
        cx={CENTER} cy={CENTER} r="268"
        fill="none"
        stroke="#3a3a3a"
        strokeWidth="18"
        strokeDasharray="4 5"
      />
      <circle cx={CENTER} cy={CENTER} r="258" fill="#1a1a1a" />
      <circle cx={CENTER} cy={CENTER} r="258" fill="none" stroke="#333" strokeWidth="1" />

      {/* ── Focus/zoom ring tick marks ── */}
      {Array.from({ length: 36 }).map((_, i) => {
        const a = (i / 36) * Math.PI * 2 - Math.PI / 2
        const isMajor = i % 6 === 0
        const r1 = 242
        const r2 = isMajor ? 228 : 234
        return (
          <line
            key={i}
            x1={CENTER + Math.cos(a) * r1}
            y1={CENTER + Math.sin(a) * r1}
            x2={CENTER + Math.cos(a) * r2}
            y2={CENTER + Math.sin(a) * r2}
            stroke={isMajor ? '#777' : '#444'}
            strokeWidth={isMajor ? 2 : 1}
          />
        )
      })}

      {/* ── Inner focus ring text ── */}
      <circle cx={CENTER} cy={CENTER} r="222" fill="#141414" />
      <circle cx={CENTER} cy={CENTER} r="222" fill="none" stroke="#2a2a2a" strokeWidth="1" />

      {/* ── Aperture housing ── */}
      <circle cx={CENTER} cy={CENTER} r="195" fill="#0d0d0d" />
      <circle cx={CENTER} cy={CENTER} r="195" fill="none" stroke="#222" strokeWidth="2" />

      {/* ── Aperture blades (iris) ── */}
      <motion.g
        style={{ scale: apertureScale, originX: '300px', originY: '300px' } as never}
        clipPath="url(#lensClip)"
      >
        {Array.from({ length: BLADE_COUNT }).map((_, i) => (
          <path
            key={i}
            d={apertureBladePath(i)}
            fill="#0a0a0a"
            stroke="#1a1a1a"
            strokeWidth="0.5"
            opacity="0.95"
          />
        ))}
      </motion.g>

      {/* ── Glass element ── */}
      <circle cx={CENTER} cy={CENTER} r="155" fill="url(#glassGrad)" />

      {/* ── Anti-reflective coating ── */}
      <circle cx={CENTER} cy={CENTER} r="155" fill="url(#coatingGrad)" />

      {/* ── Primary reflection highlight ── */}
      <ellipse
        cx={CENTER - 42} cy={CENTER - 48}
        rx="52" ry="28"
        fill="white"
        opacity="0.055"
        transform={`rotate(-35 ${CENTER - 42} ${CENTER - 48})`}
        filter="url(#softGlow)"
      />

      {/* ── Secondary small reflection ── */}
      <ellipse
        cx={CENTER + 55} cy={CENTER + 50}
        rx="20" ry="10"
        fill="white"
        opacity="0.03"
        transform={`rotate(-35 ${CENTER + 55} ${CENTER + 50})`}
      />

      {/* ── Center specular dot (glow) ── */}
      <circle cx={CENTER - 30} cy={CENTER - 35} r="10" fill="white" filter="url(#centerGlow)" opacity="0.5" />
      <circle cx={CENTER - 30} cy={CENTER - 35} r="3.5" fill="white" opacity="0.8" />

      {/* ── Lens rim inner bevel ── */}
      <circle cx={CENTER} cy={CENTER} r="155" fill="none" stroke="#1e3a5a" strokeWidth="2" opacity="0.6" />
      <circle cx={CENTER} cy={CENTER} r="152" fill="none" stroke="#0a1520" strokeWidth="3" opacity="0.8" />
    </svg>
  )
}
