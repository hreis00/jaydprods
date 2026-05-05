import { useRef, useState } from 'react'

export default function SplitShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const toggleMute = () => {
    if (!videoRef.current) return
    const next = !muted
    videoRef.current.muted = next
    if (!next) videoRef.current.play()
    setMuted(next)
  }

  return (
    <section id="welcome" style={{
      width: '100%',
      background: '#000',
      marginTop: '72px',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      lineHeight: 0,
    }}>

      {/* Wrapper com as dimensões exatas do vídeo 9:16 */}
      <div style={{
        position: 'relative',
        maxHeight: '600px',
        aspectRatio: '9 / 16',
        lineHeight: 0,
        flexShrink: 0,
      }}>
        <video
          ref={videoRef}
          src="/split_video_web.mp4"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover',
          }}
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Botão mute/unmute — canto inferior direito do vídeo */}
        <button
          onClick={toggleMute}
          title={muted ? 'Ativar som' : 'Desativar som'}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            background: 'rgba(0,0,0,0.55)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '999px',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'border-color 0.3s',
            color: '#fff',
            zIndex: 10,
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
        >
          {muted ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          )}
        </button>
      </div>

      {/* Featured Work — área preta à direita do vídeo */}
      <div style={{
        position: 'absolute',
        right: '48px',
        bottom: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '6px',
        lineHeight: 1.2,
      }}>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          fontSize: '8px',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
        }}>
          Featured Work
        </span>
        <div style={{
          width: '28px',
          height: '1px',
          background: 'rgba(255,255,255,0.15)',
        }} />
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          fontSize: '10px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.65)',
        }}>
          Tiago Santos
        </span>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          fontSize: '8px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
        }}>
          Kickboxing World Champion
        </span>
      </div>

    </section>
  )
}
