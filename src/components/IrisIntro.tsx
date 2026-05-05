import { useState, useEffect, useCallback } from 'react'
import { motion, animate, useMotionValue, useMotionValueEvent } from 'framer-motion'

const BLADES = 9

function irisPoints(radius: number, rotRad: number): string {
  const cx = 50, cy = 50
  return Array.from({ length: BLADES }, (_, i) => {
    const a = (i / BLADES) * Math.PI * 2 - Math.PI / 2 + rotRad
    const r = i % 2 === 0 ? radius : radius * 0.93
    return `${(cx + Math.cos(a) * r).toFixed(3)},${(cy + Math.sin(a) * r).toFixed(3)}`
  }).join(' ')
}

interface Props {
  onComplete: () => void
}

export default function IrisIntro({ onComplete }: Props) {
  const progress = useMotionValue(0)
  const svgOpacity = useMotionValue(1)
  const [points, setPoints] = useState(() => irisPoints(0, 0))
  const [glowR, setGlowR] = useState(0)

  useMotionValueEvent(progress, 'change', (p) => {
    setPoints(irisPoints(p * 100, p * 0.45))
    setGlowR(p * 100)
  })

  const finish = useCallback(() => {
    animate(svgOpacity, 0, { duration: 0.3, onComplete: onComplete })
  }, [svgOpacity, onComplete])

  useEffect(() => {
    const t = setTimeout(() => {
      animate(progress, 1, {
        duration: 1.15,
        ease: [0.25, 1, 0.5, 1],
        onComplete: finish,
      })
    }, 300)
    return () => clearTimeout(t)
  }, [progress, finish])

  // Click or key to skip
  useEffect(() => {
    const skip = () => { progress.jump(1); finish() }
    window.addEventListener('click', skip)
    window.addEventListener('keydown', skip)
    return () => {
      window.removeEventListener('click', skip)
      window.removeEventListener('keydown', skip)
    }
  }, [progress, finish])

  return (
    <motion.svg
      className="fixed inset-0 z-[100] w-full h-full pointer-events-auto"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity: svgOpacity }}
    >
      <defs>
        <mask id="irisMask">
          {/* White = show black overlay, Black = hide overlay (reveals site) */}
          <rect width="100" height="100" fill="white" />
          <polygon points={points} fill="black" />
        </mask>

        {/* Glow ring gradient */}
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="85%" stopColor="transparent" />
          <stop offset="95%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Black overlay with iris hole */}
      <rect width="100" height="100" fill="black" mask="url(#irisMask)" />

      {/* Subtle glow ring at the iris edge */}
      <circle
        cx="50" cy="50"
        r={glowR}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="0.6"
      />
      <circle
        cx="50" cy="50"
        r={Math.max(0, glowR - 1)}
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="1.5"
      />
    </motion.svg>
  )
}
