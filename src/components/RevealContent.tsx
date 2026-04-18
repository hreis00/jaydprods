import { motion, MotionValue, useTransform } from 'framer-motion'

interface RevealContentProps {
  scrollYProgress: MotionValue<number>
}

export default function RevealContent({ scrollYProgress }: RevealContentProps) {
  const opacity = useTransform(scrollYProgress, [0.55, 0.95], [0, 1])
  const y = useTransform(scrollYProgress, [0.55, 0.95], [40, 0])

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-0 pointer-events-none"
    >
      <p className="text-xs tracking-[0.35em] uppercase text-zinc-500 mb-5 font-medium">
        Visual Production
      </p>
      <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none text-white mb-6">
        JAYD
        <br />
        <span className="text-zinc-400">PRODS</span>
      </h1>
      <p className="text-zinc-400 text-lg max-w-sm leading-relaxed mb-10">
        Crafting cinematic stories through the lens of creativity.
      </p>
      <a
        href="#work"
        className="pointer-events-auto inline-flex items-center gap-3 border border-zinc-700 hover:border-white text-white text-sm tracking-widest uppercase px-8 py-4 transition-colors duration-300"
      >
        View Work
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </motion.div>
  )
}
