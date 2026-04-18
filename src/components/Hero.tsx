import { useRef } from 'react'
import CameraLens from './CameraLens'
import RevealContent from './RevealContent'
import { useLensScroll } from '../hooks/useLensScroll'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useLensScroll(heroRef)

  return (
    <section ref={heroRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Subtle grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* Radial ambient glow behind lens */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(30,58,90,0.18) 0%, rgba(0,0,0,0) 70%)',
            }}
          />
        </div>

        <RevealContent scrollYProgress={scrollYProgress} />
        <CameraLens heroRef={heroRef} />

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
          <span className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent" />
        </div>
      </div>
    </section>
  )
}
