import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const photos = [
  '/slideshow/4.jpg',
  '/slideshow/2.jpg',
  '/slideshow/DSC05065.jpg',
  '/slideshow/6.jpg',
]

export default function PhotoGallery() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (dir: number) => {
    setDirection(dir)
    setIndex(prev => (prev + dir + photos.length) % photos.length)
  }

  return (
    <section style={{
      background: '#000',
      padding: '100px 48px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <p style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 300,
            fontSize: '10px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: '12px',
          }}>
            Photography
          </p>
          <h2 style={{
            fontFamily: "'Delight', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(32px, 4vw, 56px)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#fff',
            margin: 0,
          }}>
            Selected Work
          </h2>
        </div>

        {/* Viewer */}
        <div style={{ position: 'relative' }}>

          {/* Frame da foto */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            overflow: 'hidden',
            background: '#000',
          }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={index}
                src={photos[index]}
                alt={`Photo ${index + 1}`}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
                  center: { opacity: 1, x: 0 },
                  exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
                draggable={false}
              />
            </AnimatePresence>
          </div>

          {/* Controlos — setas */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '32px',
          }}>

            {/* Seta esquerda */}
            <button
              onClick={() => go(-1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'none',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#fff',
                padding: '12px 24px',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                transition: 'border-color 0.3s, color 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
              }}
            >
              ← Prev
            </button>

            {/* Indicador */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
                  style={{
                    width: i === index ? '24px' : '6px',
                    height: '2px',
                    background: i === index ? '#fff' : 'rgba(255,255,255,0.25)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    borderRadius: '1px',
                  }}
                />
              ))}
            </div>

            {/* Seta direita */}
            <button
              onClick={() => go(1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'none',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#fff',
                padding: '12px 24px',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
              }}
            >
              Next →
            </button>

          </div>

          {/* Counter */}
          <p style={{
            textAlign: 'center',
            marginTop: '20px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.25)',
          }}>
            {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </p>

        </div>
      </div>
    </section>
  )
}
