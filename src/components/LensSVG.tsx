import { motion, MotionValue } from 'framer-motion'

interface LensSVGProps {
  apertureScale: MotionValue<number>
}

const C = 300
const BLADES = 9

function bladePath(i: number): string {
  const span = (1.6 / BLADES) * Math.PI * 2
  const θ0 = (i / BLADES) * Math.PI * 2
  const θ1 = θ0 + span
  const θc = θ0 + span * 0.4

  const Ro = 183
  const Ri = 60
  const Rc = Ri * 1.3

  const ox0 = C + Math.cos(θ0) * Ro
  const oy0 = C + Math.sin(θ0) * Ro
  const ox1 = C + Math.cos(θ1) * Ro
  const oy1 = C + Math.sin(θ1) * Ro
  const ix = C + Math.cos(θc) * Ri
  const iy = C + Math.sin(θc) * Ri
  const cpx = C + Math.cos(θc) * Rc
  const cpy = C + Math.sin(θc) * Rc

  return `M ${ox0.toFixed(1)} ${oy0.toFixed(1)} A ${Ro} ${Ro} 0 0 1 ${ox1.toFixed(1)} ${oy1.toFixed(1)} Q ${cpx.toFixed(1)} ${cpy.toFixed(1)} ${ix.toFixed(1)} ${iy.toFixed(1)} Z`
}

export default function LensSVG({ apertureScale }: LensSVGProps) {
  return (
    <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        {/* ── Barrel gradients ── */}
        <radialGradient id="barrelRadial" cx="38%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#8a8a8a" />
          <stop offset="25%" stopColor="#4a4a4a" />
          <stop offset="55%" stopColor="#242424" />
          <stop offset="100%" stopColor="#0e0e0e" />
        </radialGradient>

        <linearGradient id="barrelLinear" x1="20%" y1="15%" x2="80%" y2="85%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.07" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0.01" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>

        {/* Metallic sheen arc highlight */}
        <linearGradient id="rimHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bbb" stopOpacity="0.35" />
          <stop offset="30%" stopColor="#888" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>

        {/* Focus ring gradient */}
        <radialGradient id="focusRingGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e1e1e" />
          <stop offset="100%" stopColor="#141414" />
        </radialGradient>

        {/* ── Glass gradients ── */}
        <radialGradient id="glassBase" cx="42%" cy="36%" r="68%">
          <stop offset="0%" stopColor="#0d1f35" />
          <stop offset="30%" stopColor="#060f1c" />
          <stop offset="65%" stopColor="#020810" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>

        {/* AR coating iridescence */}
        <radialGradient id="arCoating" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#00e5cc" stopOpacity="0.09" />
          <stop offset="30%" stopColor="#4a5cff" stopOpacity="0.07" />
          <stop offset="60%" stopColor="#9b2aff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#00aa88" stopOpacity="0.03" />
        </radialGradient>

        {/* Lens element rings (internal glass groups) */}
        <radialGradient id="innerRing1" cx="50%" cy="50%" r="50%">
          <stop offset="82%" stopColor="transparent" />
          <stop offset="87%" stopColor="#1a3a5a" stopOpacity="0.15" />
          <stop offset="92%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="innerRing2" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="transparent" />
          <stop offset="66%" stopColor="#0f2a42" stopOpacity="0.12" />
          <stop offset="72%" stopColor="transparent" />
        </radialGradient>

        {/* ── Filters ── */}
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="specularGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="gripShadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.4" />
        </filter>

        {/* ── Clip paths ── */}
        <clipPath id="apertureClip">
          <circle cx={C} cy={C} r="188" />
        </clipPath>
        <clipPath id="glassClip">
          <circle cx={C} cy={C} r="150" />
        </clipPath>
      </defs>

      {/* ══════════════════════════════════════
          OUTER BARREL
      ══════════════════════════════════════ */}

      {/* Deep shadow base */}
      <circle cx={C} cy={C} r="293" fill="#060606" />

      {/* Barrel body — radial + linear overlay */}
      <circle cx={C} cy={C} r="282" fill="url(#barrelRadial)" />
      <circle cx={C} cy={C} r="282" fill="url(#barrelLinear)" />

      {/* Barrel outer chrome ring */}
      <circle cx={C} cy={C} r="282" fill="none" stroke="url(#rimHighlight)" strokeWidth="4" />
      <circle cx={C} cy={C} r="280" fill="none" stroke="#111" strokeWidth="1.5" />

      {/* ── Inner barrel step (depth) ── */}
      <circle cx={C} cy={C} r="270" fill="#161616" />
      <circle cx={C} cy={C} r="270" fill="none" stroke="#3a3a3a" strokeWidth="1" />
      <circle cx={C} cy={C} r="268" fill="none" stroke="#0a0a0a" strokeWidth="1.5" />

      {/* ══════════════════════════════════════
          BRAND TEXT RING
      ══════════════════════════════════════ */}
      <defs>
        {/* Circle path for text — top of the ring (r=252) */}
        <path
          id="brandTextPath"
          d={`M ${C},${C - 252} A 252,252 0 1 1 ${C - 0.01},${C - 252}`}
        />
        <path
          id="brandTextPathBottom"
          d={`M ${C},${C + 252} A 252,252 0 1 0 ${C + 0.01},${C + 252}`}
        />
      </defs>

      {/* Text ring background */}
      <circle cx={C} cy={C} r="260" fill="#121212" />
      <circle cx={C} cy={C} r="260" fill="none" stroke="#2e2e2e" strokeWidth="0.5" />
      <circle cx={C} cy={C} r="244" fill="none" stroke="#2e2e2e" strokeWidth="0.5" />

      {/* Brand text — top arc */}
      <text fontSize="11" fill="#aaaaaa" letterSpacing="4" fontFamily="'Inter', sans-serif" fontWeight="500">
        <textPath href="#brandTextPath" startOffset="12%">
          JAYD PRODS · f/1.8 · ø77mm ·
        </textPath>
      </text>

      {/* Bottom arc label */}
      <text fontSize="9.5" fill="#666" letterSpacing="3" fontFamily="'Inter', sans-serif" fontWeight="400">
        <textPath href="#brandTextPathBottom" startOffset="18%">
          VISUAL PRODUCTION · LISBON
        </textPath>
      </text>

      {/* ══════════════════════════════════════
          RUBBERIZED FOCUS / GRIP RING
      ══════════════════════════════════════ */}
      <circle cx={C} cy={C} r="240" fill="#111" />

      {/* Rubber grip ridges */}
      {Array.from({ length: 52 }).map((_, i) => {
        const a0 = (i / 52) * Math.PI * 2
        const a1 = a0 + (0.7 / 52) * Math.PI * 2
        const r1 = 240, r2 = 224
        const x0o = C + Math.cos(a0) * r1, y0o = C + Math.sin(a0) * r1
        const x1o = C + Math.cos(a1) * r1, y1o = C + Math.sin(a1) * r1
        const x0i = C + Math.cos(a0) * r2, y0i = C + Math.sin(a0) * r2
        const x1i = C + Math.cos(a1) * r2, y1i = C + Math.sin(a1) * r2
        return (
          <path
            key={i}
            d={`M ${x0o.toFixed(1)} ${y0o.toFixed(1)} A ${r1} ${r1} 0 0 1 ${x1o.toFixed(1)} ${y1o.toFixed(1)} L ${x1i.toFixed(1)} ${y1i.toFixed(1)} A ${r2} ${r2} 0 0 0 ${x0i.toFixed(1)} ${y0i.toFixed(1)} Z`}
            fill="#1c1c1c"
            stroke="#282828"
            strokeWidth="0.4"
          />
        )
      })}

      {/* Grip ring edge borders */}
      <circle cx={C} cy={C} r="240" fill="none" stroke="#333" strokeWidth="1" />
      <circle cx={C} cy={C} r="222" fill="none" stroke="#2a2a2a" strokeWidth="1" />

      {/* ══════════════════════════════════════
          FOCUS DISTANCE RING
      ══════════════════════════════════════ */}
      <circle cx={C} cy={C} r="218" fill="url(#focusRingGrad)" />
      <circle cx={C} cy={C} r="218" fill="none" stroke="#2a2a2a" strokeWidth="1" />

      {/* Distance scale tick marks */}
      {Array.from({ length: 48 }).map((_, i) => {
        const a = (i / 48) * Math.PI * 2 - Math.PI / 2
        const isMajor = i % 8 === 0
        const isMid = i % 4 === 0
        const r1 = 212
        const r2 = isMajor ? 197 : isMid ? 202 : 206
        return (
          <line
            key={i}
            x1={(C + Math.cos(a) * r1).toFixed(1)}
            y1={(C + Math.sin(a) * r1).toFixed(1)}
            x2={(C + Math.cos(a) * r2).toFixed(1)}
            y2={(C + Math.sin(a) * r2).toFixed(1)}
            stroke={isMajor ? '#888' : isMid ? '#555' : '#333'}
            strokeWidth={isMajor ? 1.8 : 1}
          />
        )
      })}

      {/* Distance scale numbers */}
      {[0, 1, 2, 4].map((val, idx) => {
        const a = (idx / 4) * Math.PI * 2 - Math.PI / 2
        const r = 190
        const x = C + Math.cos(a) * r
        const y = C + Math.sin(a) * r
        const labels = ['∞', '3', '1', '0.5']
        return (
          <text
            key={val}
            x={x.toFixed(1)}
            y={y.toFixed(1)}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="10"
            fill="#666"
            fontFamily="'Inter', sans-serif"
            transform={`rotate(${(idx / 4) * 360} ${x.toFixed(1)} ${y.toFixed(1)})`}
          >
            {labels[idx]}
          </text>
        )
      })}

      {/* ══════════════════════════════════════
          APERTURE HOUSING
      ══════════════════════════════════════ */}
      <circle cx={C} cy={C} r="192" fill="#0c0c0c" />
      <circle cx={C} cy={C} r="192" fill="none" stroke="#1e1e1e" strokeWidth="2.5" />
      {/* Housing bevel */}
      <circle cx={C} cy={C} r="189" fill="none" stroke="#2a2a2a" strokeWidth="1" />
      <circle cx={C} cy={C} r="186" fill="none" stroke="#0a0a0a" strokeWidth="2" />

      {/* ══════════════════════════════════════
          APERTURE BLADES (IRIS)
      ══════════════════════════════════════ */}
      <motion.g
        style={{ scale: apertureScale, originX: `${C}px`, originY: `${C}px` } as never}
        clipPath="url(#apertureClip)"
      >
        {/* Back layer — darker */}
        {Array.from({ length: BLADES }).map((_, i) => (
          <path
            key={`back-${i}`}
            d={bladePath(i)}
            fill="#080808"
            stroke="#141414"
            strokeWidth="0.8"
            opacity="0.98"
          />
        ))}
        {/* Front layer — slightly lighter for depth illusion */}
        {Array.from({ length: BLADES }).map((_, i) => (
          <path
            key={`front-${i}`}
            d={bladePath((i + Math.floor(BLADES / 2)) % BLADES)}
            fill="#101010"
            stroke="#1c1c1c"
            strokeWidth="0.5"
            opacity="0.85"
          />
        ))}
      </motion.g>

      {/* ══════════════════════════════════════
          GLASS ELEMENT
      ══════════════════════════════════════ */}

      {/* Outer lens element rim */}
      <circle cx={C} cy={C} r="152" fill="#050a12" />
      <circle cx={C} cy={C} r="152" fill="none" stroke="#1e3555" strokeWidth="2.5" opacity="0.7" />
      <circle cx={C} cy={C} r="149" fill="none" stroke="#0a1a2e" strokeWidth="2" />

      {/* Glass base */}
      <circle cx={C} cy={C} r="147" fill="url(#glassBase)" />

      {/* Inner lens group rings (simulates multiple glass elements) */}
      <circle cx={C} cy={C} r="147" fill="url(#innerRing1)" />
      <circle cx={C} cy={C} r="147" fill="url(#innerRing2)" />

      {/* AR multi-coating iridescence */}
      <circle cx={C} cy={C} r="147" fill="url(#arCoating)" />

      {/* Subtle Fresnel ring */}
      <circle cx={C} cy={C} r="115" fill="none" stroke="#1a3a5a" strokeWidth="0.8" opacity="0.18" />
      <circle cx={C} cy={C} r="88" fill="none" stroke="#1a3a5a" strokeWidth="0.5" opacity="0.12" />

      {/* ── Reflections ── */}

      {/* Large primary reflection crescent (top-left) */}
      <ellipse
        cx={C - 38}
        cy={C - 44}
        rx="58"
        ry="30"
        fill="white"
        opacity="0.042"
        transform={`rotate(-38 ${C - 38} ${C - 44})`}
        filter="url(#softGlow)"
        clipPath="url(#glassClip)"
      />

      {/* Secondary arc reflection */}
      <path
        d={`M ${C - 60} ${C - 110} A 120 120 0 0 1 ${C + 55} ${C - 95}`}
        stroke="white"
        strokeWidth="10"
        strokeOpacity="0.025"
        strokeLinecap="round"
        fill="none"
        filter="url(#softGlow)"
      />

      {/* Small bottom-right reflection */}
      <ellipse
        cx={C + 48}
        cy={C + 42}
        rx="22"
        ry="10"
        fill="white"
        opacity="0.022"
        transform={`rotate(-38 ${C + 48} ${C + 42})`}
        clipPath="url(#glassClip)"
      />

      {/* Green AR coating spot */}
      <ellipse
        cx={C + 20}
        cy={C - 60}
        rx="30"
        ry="18"
        fill="#00ffcc"
        opacity="0.028"
        transform={`rotate(20 ${C + 20} ${C - 60})`}
        filter="url(#softGlow)"
        clipPath="url(#glassClip)"
      />

      {/* ── Specular dot ── */}
      {/* Glow bloom */}
      <circle cx={C - 28} cy={C - 32} r="14" fill="white" filter="url(#specularGlow)" opacity="0.55" clipPath="url(#glassClip)" />
      {/* Sharp center */}
      <circle cx={C - 28} cy={C - 32} r="3.5" fill="white" opacity="0.9" />
      <circle cx={C - 28} cy={C - 32} r="1.5" fill="white" opacity="1" />
    </svg>
  )
}
