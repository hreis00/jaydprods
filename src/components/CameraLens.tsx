import { motion } from 'framer-motion'
import { RefObject } from 'react'
import { useLensScroll } from '../hooks/useLensScroll'
import LensSVG from './LensSVG'

interface CameraLensProps {
  heroRef: RefObject<HTMLElement | null>
}

export default function CameraLens({ heroRef }: CameraLensProps) {
  const { rotate, scale, opacity, filter, apertureScale } = useLensScroll(heroRef)

  return (
    <motion.div
      style={{ rotate, scale, opacity, filter }}
      className="absolute w-[min(82vw,580px)] aspect-square z-10 pointer-events-none"
    >
      <LensSVG apertureScale={apertureScale} />
    </motion.div>
  )
}
