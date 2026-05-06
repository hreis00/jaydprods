import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { categories, clients, Project, Video } from '../data/work'
import { useIsMobile } from '../hooks/useIsMobile'
import { useScrollLock } from '../hooks/useScrollLock'

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
function Lightbox({ photos, index, onClose }: { photos: string[], index: number, onClose: () => void }) {
  const [current, setCurrent] = useState(index)
  const total = photos.length
  const isMobile = useIsMobile()

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent(c => (c - 1 + total) % total) }
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent(c => (c + 1) % total) }

  useScrollLock()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setCurrent(c => (c - 1 + total) % total)
      if (e.key === 'ArrowRight') setCurrent(c => (c + 1) % total)
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [total, onClose])

  const arrowStyle: React.CSSProperties = {
    position: 'fixed', top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%',
    width: isMobile ? '36px' : '44px',
    height: isMobile ? '36px' : '44px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'rgba(255,255,255,0.6)', fontSize: '16px', cursor: 'pointer',
    transition: 'border-color 0.2s, color 0.2s', zIndex: 1001,
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: isMobile ? '16px' : '80px',
        cursor: 'zoom-out',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={photos[current]} alt=""
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          draggable={false}
          onClick={e => e.stopPropagation()}
        />
      </AnimatePresence>

      {total > 1 && (
        <>
          <button onClick={prev} style={{ ...arrowStyle, left: isMobile ? '8px' : '24px' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}>
            ←
          </button>
          <button onClick={next} style={{ ...arrowStyle, right: isMobile ? '8px' : '24px' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}>
            →
          </button>
        </>
      )}

      <button onClick={onClose} style={{ position: 'fixed', top: '20px', right: '24px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '24px', cursor: 'pointer', lineHeight: 1, zIndex: 1001 }}>✕</button>
    </motion.div>
  )
}

// ─── PHOTO VIEWER ─────────────────────────────────────────────────────────────
function PhotoViewer({ photos }: { photos: string[] }) {
  const [center, setCenter]       = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused]       = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const total    = photos.length
  const isMobile = useIsMobile()
  const height   = isMobile ? 220 : 340

  const go = (dir: number) => {
    setDirection(dir)
    setCenter(c => (c + dir + total) % total)
  }

  const pausedRef = useRef(paused)
  useEffect(() => { pausedRef.current = paused }, [paused])

  useEffect(() => {
    if (total <= 1) return
    const t = setInterval(() => {
      if (!pausedRef.current) {
        setDirection(1)
        setCenter(c => (c + 1) % total)
      }
    }, 3500)
    return () => clearInterval(t)
  }, [total])

  const indices = [
    (center - 1 + total) % total,
    center,
    (center + 1) % total,
  ]

  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div style={{ position: 'relative', height: `${height}px`, overflow: 'hidden' }}>
          <AnimatePresence mode="sync" custom={direction} initial={false}>
            <motion.div
              key={center}
              custom={direction}
              variants={{
                enter:  (d: number) => ({ x: d > 0 ? '33.5%' : '-33.5%' }),
                center: { x: '0%' },
                exit:   (d: number) => ({ x: d > 0 ? '-33.5%' : '33.5%' }),
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px' }}
            >
              {indices.map((photoIdx, slotPos) => {
                const isCenter = slotPos === 1
                const handleClick = () => {
                  if (slotPos === 0) go(-1)
                  else if (slotPos === 2) go(1)
                  else setLightboxIndex(photoIdx)
                }
                return (
                  <motion.div
                    key={photoIdx}
                    animate={{ opacity: isCenter ? 1 : 0.22 }}
                    transition={{ duration: 0.45 }}
                    onClick={handleClick}
                    style={{ height: `${height}px`, overflow: 'hidden', cursor: isCenter ? 'zoom-in' : 'pointer', background: '#000' }}
                  >
                    <img
                      src={photos[photoIdx]}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                      draggable={false}
                    />
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {total > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px' }}>
            <button
              onClick={() => go(-1)}
              style={{
                background: 'none',
                border: isMobile ? '1px solid rgba(255,255,255,0.25)' : 'none',
                borderRadius: isMobile ? '50%' : '0',
                color: isMobile ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                width: isMobile ? '40px' : 'auto',
                height: isMobile ? '40px' : 'auto',
                padding: isMobile ? '0' : '0 4px',
                fontSize: isMobile ? '18px' : '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'color 0.2s, border-color 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = isMobile ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)')}
            >←</button>

            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > center ? 1 : -1); setCenter(i) }}
                  style={{ width: i === center ? '18px' : '5px', height: '2px', background: i === center ? '#fff' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.35s ease', borderRadius: '1px' }}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              style={{
                background: 'none',
                border: isMobile ? '1px solid rgba(255,255,255,0.25)' : 'none',
                borderRadius: isMobile ? '50%' : '0',
                color: isMobile ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                width: isMobile ? '40px' : 'auto',
                height: isMobile ? '40px' : 'auto',
                padding: isMobile ? '0' : '0 4px',
                fontSize: isMobile ? '18px' : '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'color 0.2s, border-color 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = isMobile ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)')}
            >→</button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox photos={photos} index={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

// ─── VIDEO LIGHTBOX ───────────────────────────────────────────────────────────
function VideoLightbox({ title, type, src, portrait, onClose }: Omit<Video, 'id' | 'thumb'> & { onClose: () => void }) {
  const [loaded, setLoaded] = useState(false)

  useScrollLock()

  const embedUrl = type === 'youtube'
    ? `https://www.youtube.com/embed/${src}?rel=0&modestbranding=1&color=white&autoplay=1`
    : type === 'vimeo'
    ? `https://player.vimeo.com/video/${src}?color=ffffff&title=0&byline=0&portrait=0&dnt=1&autoplay=1`
    : type === 'gumlet'
    ? `https://play.gumlet.io/embed/${src}?background=false&autoplay=true&loop=false&disable_player_controls=false&start_quality=1080p`
    : null

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', aspectRatio: portrait ? '9/16' : '16/9', height: portrait ? '85vh' : 'auto', width: portrait ? 'auto' : '85vw', maxWidth: '100%', maxHeight: '90vh', background: '#000' }}
      >
        {embedUrl && (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            onLoad={() => setTimeout(() => setLoaded(true), 600)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', background: '#000', colorScheme: 'dark', opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' } as React.CSSProperties}
          />
        )}
        {type === 'local' && (
          <video src={src} controls autoPlay style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#000' }} />
        )}
      </motion.div>
      <button onClick={onClose} style={{ position: 'fixed', top: '20px', right: '24px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '24px', cursor: 'pointer', lineHeight: 1 }}>✕</button>
    </motion.div>
  )
}

// ─── VIDEO EMBED ──────────────────────────────────────────────────────────────
function VideoEmbed({ title, type, src, portrait, thumb }: Video) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [playing,      setPlaying]      = useState(false)
  const [loaded,       setLoaded]       = useState(false)

  const embedUrl = type === 'youtube'
    ? `https://www.youtube.com/embed/${src}?rel=0&modestbranding=1&color=white`
    : type === 'vimeo'
    ? `https://player.vimeo.com/video/${src}?color=ffffff&title=0&byline=0&portrait=0&dnt=1`
    : type === 'gumlet'
    ? `https://play.gumlet.io/embed/${src}?background=false&autoplay=false&loop=false&disable_player_controls=false`
    : null

  // Modo capa: thumbnail → abre lightbox
  if (thumb) {
    return (
      <>
        <div
          className="group"
          onClick={() => setLightboxOpen(true)}
          style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#000', cursor: 'pointer' }}
        >
          <img
            src={thumb}
            alt={title}
            draggable={false}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
            className="group-hover:scale-[1.03]"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', transition: 'background 0.3s' }} className="group-hover:bg-black/55" />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              style={{ width: '44px', height: '44px', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.3s, transform 0.3s' }}
              className="group-hover:border-white group-hover:scale-110"
            >
              <div style={{ width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: '13px solid rgba(255,255,255,0.85)', marginLeft: '3px' }} />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {lightboxOpen && (
            <VideoLightbox title={title} type={type} src={src} portrait={portrait} onClose={() => setLightboxOpen(false)} />
          )}
        </AnimatePresence>
      </>
    )
  }

  // Modo inline (sem capa)
  const ratio = portrait ? '9/16' : '16/9'
  return (
    <div
      className="group"
      style={{ position: 'relative', width: '100%', aspectRatio: ratio, background: '#000', cursor: playing ? 'default' : 'pointer' }}
      onClick={() => !playing && setPlaying(true)}
    >
      {playing && embedUrl ? (
        <>
          {!loaded && <div style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 2 }} />}
          <iframe
            src={`${embedUrl}&autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            onLoad={() => setLoaded(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', background: '#000', colorScheme: 'dark' } as React.CSSProperties}
          />
        </>
      ) : playing && type === 'local' ? (
        <video src={src} controls autoPlay style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#000' }} />
      ) : (
        <>
          {type === 'youtube' && (
            <img src={`https://img.youtube.com/vi/${src}/maxresdefault.jpg`} alt={title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} draggable={false} />
          )}
          {type === 'gumlet' && (
            <img src={`https://video.gumlet.io/${src}/thumbnail.jpg`} alt={title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} draggable={false} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} className="group-hover:bg-black/60" />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '60px', height: '60px', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.3)', transition: 'border-color 0.3s, transform 0.3s' }} className="group-hover:border-white group-hover:scale-110">
              <div style={{ width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: '16px solid rgba(255,255,255,0.9)', marginLeft: '4px' }} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ─── PROJECT BLOCK ────────────────────────────────────────────────────────────
function ProjectBlock({ title, description, videos = [], photos = [], process = [] }: Project) {
  const mainVideo   = videos[0]
  const extraVideos = videos.slice(1)
  const hasVideo    = !!mainVideo
  const hasPhotos   = photos.length > 0
  const hasProcess  = process.length > 0
  const isMobile    = useIsMobile()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '48px' : '88px', padding: '40px 0' }}>

      {/* Título */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.18)', flexShrink: 0 }} />
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
          {title}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* Vídeo + Conceito */}
      {(hasVideo || description) && (() => {
        const hasCover = hasVideo && mainVideo.thumb
        return hasCover ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Short Film</span>
            <VideoEmbed {...mainVideo} />
            {description && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: isMobile ? '16px' : '18px', lineHeight: 1.85, color: 'rgba(255,255,255,0.55)', margin: 0, marginTop: '46px', textAlign: 'center' }}>
                {description}
              </p>
            )}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '32px' : '48px',
            alignItems: 'center',
          }}>
            {hasVideo && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Short Film</span>
                <VideoEmbed {...mainVideo} />
              </div>
            )}
            {description && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Concept</span>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: isMobile ? '16px' : '18px', lineHeight: 1.85, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
                  {description}
                </p>
              </div>
            )}
          </div>
        )
      })()}

      {/* Galeria */}
      {hasPhotos && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Photography</span>
          <PhotoViewer photos={photos} />
        </div>
      )}

      {/* More Videos */}
      {extraVideos.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>More Videos</span>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '3px' }}>
            {extraVideos.map(v => <VideoEmbed key={v.id} {...v} />)}
          </div>
        </div>
      )}

      {/* Processo */}
      {hasProcess && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Process</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
            {process.map((src, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: isMobile ? '100%' : '80%' }}>
                <img src={src} alt="Process" draggable={false} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '2px' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Timeline screenshot</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

// ─── CLIENT ACCORDION ROW ─────────────────────────────────────────────────────
function ClientRow({ name, projects = [] }: { name: string, projects: Project[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'Delight', sans-serif", fontWeight: 700, fontSize: 'clamp(20px, 2.5vw, 30px)', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff' }}>
            {name.split(' — ')[0]}
          </span>
          {name.includes(' — ') && (
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(10px, 1.1vw, 13px)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>
              {name.split(' — ')[1]}
            </span>
          )}
        </span>

        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? 'minus' : 'plus'} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.15 }} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.5rem', fontWeight: 300, flexShrink: 0, marginLeft: '24px' }}>
            {open ? '−' : '+'}
          </motion.span>
        </AnimatePresence>
      </button>

      <div style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        gridTemplateColumns: '1fr',
        opacity: open ? 1 : 0,
        transition: 'grid-template-rows 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease',
      }}>
        <div style={{ overflow: 'hidden', width: '100%' }}>
          {projects.length === 0 ? (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', paddingBottom: '32px', margin: 0 }}>Em breve</p>
          ) : (
            projects.map((p, i) => (
              <div key={p.id}>
                {i > 0 && <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '8px 0' }} />}
                <ProjectBlock {...p} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// ─── PÁGINA ───────────────────────────────────────────────────────────────────
export default function CategoryPage() {
  const { category } = useParams()
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const cat = categories.find(c => c.id === category)
  const catClients = clients[category ?? ''] ?? []

  if (!cat) return (
    <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.2em' }}>Categoria não encontrada</p>
    </div>
  )

  const sidePad = isMobile ? '20px' : '48px'

  return (
    <div style={{
      background: '#000',
      minHeight: '100vh',
      paddingLeft: sidePad,
      paddingRight: isMobile ? sidePad : 'calc(48px + (100vw - 100%))',
      paddingBottom: '100px',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '72px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        marginBottom: isMobile ? '40px' : '72px',
      }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <img src="/logo-header.png" alt="JAYD Prods" style={{ height: '16px', width: 'auto' }} draggable={false} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate('/work')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
            Work
          </button>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px' }}>→</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>{cat.label}</span>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
        {catClients.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Em breve</p>
          </div>
        ) : (
          catClients.map(c => <ClientRow key={c.id} name={c.name} projects={c.projects ?? []} />)
        )}
      </div>
    </div>
  )
}
