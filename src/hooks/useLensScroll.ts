import { useScroll, useTransform } from 'framer-motion'
import { RefObject } from 'react'

export function useLensScroll(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 540])
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [1, 1, 0.15])
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.85], [1, 1, 0])
  const blur = useTransform(scrollYProgress, [0.5, 1], [0, 10])
  const filter = useTransform(blur, (v) => `blur(${v}px)`)
  const apertureScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.05])

  const revealOpacity = useTransform(scrollYProgress, [0.55, 0.95], [0, 1])
  const revealY = useTransform(scrollYProgress, [0.55, 0.95], [40, 0])

  return {
    scrollYProgress,
    rotate,
    scale,
    opacity,
    filter,
    apertureScale,
    revealOpacity,
    revealY,
  }
}
