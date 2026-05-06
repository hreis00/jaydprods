import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useScrollLock } from '../../hooks/useScrollLock'

const photos = [
  '/slideshow/4.jpg',
  '/slideshow/2.jpg',
  '/slideshow/DSC05065.jpg',
  '/slideshow/6.jpg',
]

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
function Lightbox({ startIndex, onClose }: { startIndex: number, onClose: () => void }) {
  const [current, setCurrent] = useState(startIndex)
  const total = photos.length

  useScrollLock()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  setCurrent(c => (c - 1 + total) % total)
      if (e.key === 'ArrowRight') setCurrent(c => (c + 1) % total)
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [total, onClose])

  const arrowBtn: React.CSSProperties = {
    position: 'fixed', top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%',
    width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'rgba(255,255,255,0.7)', fontSize: '18px', cursor: 'pointer',
    transition: 'border-color 0.2s, color 0.2s', zIndex: 1001,
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.93)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', cursor: 'zoom-out' }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={photos[current]}
          alt=""
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          draggable={false}
          onClick={e => e.stopPropagation()}
        />
      </AnimatePresence>

      <button onClick={e => { e.stopPropagation(); setCurrent(c => (c - 1 + total) % total) }}
        style={{ ...arrowBtn, left: '16px' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}>
        ←
      </button>
      <button onClick={e => { e.stopPropagation(); setCurrent(c => (c + 1) % total) }}
        style={{ ...arrowBtn, right: '16px' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}>
        →
      </button>

      <button onClick={onClose} style={{ position: 'fixed', top: '20px', right: '24px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '24px', cursor: 'pointer', lineHeight: 1, zIndex: 1001 }}>✕</button>
    </motion.div>
  )
}

// ─── GALERIA PRINCIPAL ────────────────────────────────────────────────────────
export default function PhotoGallery() {
  const [index, setIndex]         = useState(0)
  const [direction, setDirection] = useState(1)
  const [lightbox, setLightbox]   = useState<number | null>(null)
  const isMobile = useIsMobile()

  const go = (dir: number) => {
    setDirection(dir)
    setIndex(prev => (prev + dir + photos.length) % photos.length)
  }

  return (
    <section style={{
      background: '#000',
      padding: isMobile ? '60px 16px' : '100px 48px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 300, fontSize: '10px', letterSpacing: '0.35em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '12px',
          }}>
            Photography
          </p>
          <h2 style={{
            fontFamily: "'Delight', sans-serif",
            fontWeight: 700, fontSize: 'clamp(32px, 4vw, 56px)',
            letterSpacing: '0.04em', textTransform: 'uppercase', color: '#fff', margin: 0,
          }}>
            Selected Work
          </h2>
        </div>

        {/* Frame da foto — clicável para lightbox */}
        <div
          onClick={() => setLightbox(index)}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: isMobile ? '4/3' : '16/9',
            overflow: 'hidden',
            background: '#0a0a0a',
            cursor: 'zoom-in',
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={index}
              src={photos[index]}
              alt={`Photo ${index + 1}`}
              custom={direction}
              variants={{
                enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
                center: { opacity: 1, x: 0 },
                exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center',
              }}
              draggable={false}
            />
          </AnimatePresence>

          {/* Hint zoom-in */}
          <div style={{
            position: 'absolute', bottom: '14px', right: '14px',
            background: 'rgba(0,0,0,0.5)', borderRadius: '999px',
            padding: '5px 10px',
            fontFamily: "'Inter', sans-serif", fontSize: '9px',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            backdropFilter: 'blur(6px)',
            pointerEvents: 'none',
          }}>
            Expandir
          </div>
        </div>

        {/* Controlos */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '28px' }}>

          {/* Seta esquerda */}
          <button
            onClick={() => go(-1)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'none', border: '1px solid rgba(255,255,255,0.18)', color: '#fff',
              padding: isMobile ? '10px 18px' : '12px 24px',
              cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase',
              transition: 'border-color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)')}
          >
            ← {!isMobile && 'Prev'}
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
                style={{
                  width: i === index ? '24px' : '6px', height: '2px',
                  background: i === index ? '#fff' : 'rgba(255,255,255,0.25)',
                  border: 'none', padding: 0, cursor: 'pointer',
                  transition: 'all 0.4s ease', borderRadius: '1px',
                }}
              />
            ))}
          </div>

          {/* Seta direita */}
          <button
            onClick={() => go(1)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'none', border: '1px solid rgba(255,255,255,0.18)', color: '#fff',
              padding: isMobile ? '10px 18px' : '12px 24px',
              cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase',
              transition: 'border-color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)')}
          >
            {!isMobile && 'Next'} →
          </button>

        </div>

        {/* Counter */}
        <p style={{
          textAlign: 'center', marginTop: '20px',
          fontFamily: "'Inter', sans-serif", fontSize: '11px',
          letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)',
        }}>
          {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
        </p>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox startIndex={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>

    </section>
  )
}
