import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FONT = "'Delight', sans-serif"

const services = [
  {
    title: 'Concept',
    description:
      'Every great project starts with a strong idea. We work with you to develop the creative vision — narrative, mood, references and strategy — before a single frame is captured.',
  },
  {
    title: 'Production',
    description:
      'From location scouting to directing on set, we handle every detail of the shoot. Cinematic cameras, lighting design, and a crew focused on one thing: the perfect frame.',
  },
  {
    title: 'Post-Production',
    description:
      'Editing, color grading, sound design and finishing. We shape raw footage into a polished, cinematic final piece that reflects the original vision — and elevates it.',
  },
  {
    title: 'Amplification',
    description:
      'A great film deserves to be seen. We advise on distribution, format adaptation for social and digital platforms, and how to maximise the reach of your content.',
  },
]

export default function Services() {
  const [open, setOpen] = useState<number | null>(null)
  const toggle = (i: number) => setOpen(prev => (prev === i ? null : i))

  return (
    <section
      id="services"
      style={{
        background: '#000',
        padding: '100px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      {/* ── LINHA DE LUZ — elemento independente, cruza a secção de margem a margem ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.08) 80%, transparent 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Glow difuso sobre a linha */}
      <motion.div
        style={{
          position: 'absolute',
          top: 'calc(50% - 3px)',
          left: 0,
          right: 0,
          height: '7px',
          background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.04) 20%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.04) 80%, transparent 100%)',
          filter: 'blur(4px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        animate={{ opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── GRID 50 / 50 ── */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'start',
          gap: '72px',
          position: 'relative',
          zIndex: 1,
        }}
      >

        {/* ── COLUNA ESQUERDA — foto ── */}
        <div style={{
          overflow: 'hidden',
          width: '100%',
          height: '360px',
        }}>
          <img
            src="/img-services.jpg"
            alt="JAYD Prods"
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              display: 'block',
            }}
          />
        </div>

        {/* ── COLUNA DIREITA — lista de serviços ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          {services.map((service, i) => (
            <div key={service.title} style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>

              <button
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '22px',
                  paddingBottom: '22px',
                  paddingLeft: '0',
                  paddingRight: '0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontFamily: FONT,
                  fontWeight: 800,
                  fontSize: 'clamp(1.4rem, 2vw, 1.75rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#fff',
                  transition: 'color 0.25s',
                }}>
                  {service.title}
                </span>

                <AnimatePresence mode="wait" initial={false}>
                  {open === i ? (
                    <motion.span
                      key="minus"
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '1.4rem',
                        fontWeight: 300,
                        lineHeight: 1,
                        marginRight: '0',
                        marginLeft: '16px',
                        flexShrink: 0,
                      }}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.18 }}
                    >−</motion.span>
                  ) : (
                    <motion.span
                      key="plus"
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '1.4rem',
                        fontWeight: 300,
                        lineHeight: 1,
                        marginRight: '0',
                        marginLeft: '16px',
                        flexShrink: 0,
                      }}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.18 }}
                    >+</motion.span>
                  )}
                </AnimatePresence>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="desc"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{
                      color: 'rgba(255,255,255,0.45)',
                      fontSize: '0.875rem',
                      lineHeight: 1.75,
                      paddingBottom: '24px',
                      maxWidth: '500px',
                      fontFamily: "'Inter', sans-serif",
                      margin: 0,
                    }}>
                      {service.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
