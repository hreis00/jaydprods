import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  {
    id: 'video',
    title: 'Video',
    category: 'Audiovisual',
    thumb: '/service-video.jpg',
    description:
      'Captamos vídeo na sua essência mais pura, transformando a tua história numa experiência cinematográfica que move e inspira. Da concepção ao ecrã, cada frame é construído com intenção.',
  },
  {
    id: 'photography',
    title: 'Photography',
    category: 'Editorial',
    thumb: '/service-photography.jpg',
    description:
      'Da fotografia de retrato editorial a campanhas de marca, o nosso trabalho combina luz, composição e emoção para criar imagens que comunicam mais do que mil palavras.',
  },
  {
    id: 'streaming',
    title: 'Streaming',
    category: 'Live Production',
    thumb: '/service-streaming.jpg',
    description:
      'Levamos os teus eventos, lançamentos e performances a audiências em todo o mundo com produção profissional de transmissão em direto — sem perder qualidade nem impacto.',
  },
]

function ServiceCard({ title, category, thumb, description }: typeof services[0]) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col">
      {/* Foto */}
      <div
        className="relative w-full overflow-hidden group cursor-pointer"
        style={{ aspectRatio: '4/3', background: '#0a0a0a' }}
        onClick={() => setOpen(o => !o)}
      >
        <img
          src={thumb}
          alt={title}
          draggable={false}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            transition: 'transform 0.6s ease',
          }}
          className="group-hover:scale-[1.03]"
        />
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.25)',
            transition: 'background 0.3s',
          }}
          className="group-hover:bg-black/45"
        />
      </div>

      {/* Info + toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '20px 2px',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{
            fontFamily: "'Delight', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(18px, 2vw, 24px)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#fff',
          }}>
            {title}
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
          }}>
            {category}
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'minus' : 'plus'}
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1.4rem',
              fontWeight: 300,
              lineHeight: 1,
              flexShrink: 0,
              marginLeft: '16px',
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
          >
            {open ? '−' : '+'}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* Descrição expansível */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="desc"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.45)',
              padding: '16px 2px 24px',
              margin: 0,
            }}>
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Work() {
  return (
    <section id="work" className="bg-black border-t border-zinc-900" style={{ padding: '96px 48px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div className="flex items-end justify-between mb-16">
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '12px',
            }}>
              What We Do
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
              Services
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {services.map(s => <ServiceCard key={s.id} {...s} />)}
        </div>

      </div>
    </section>
  )
}
