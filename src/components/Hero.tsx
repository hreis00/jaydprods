import { useEffect, useRef } from 'react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: '50vh', minHeight: '360px', maxHeight: '520px' }}>

      {/* Vídeo 2:1 cinematográfico */}
      <video
        ref={videoRef}
        src="/video_hero_2x1.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay escuro subtil para legibilidade */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-zinc-400 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-zinc-400 to-transparent" />
      </div>

    </section>
  )
}
