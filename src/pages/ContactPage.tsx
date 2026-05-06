import { useNavigate } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'

const whatsapp = 'https://wa.me/351928021263'

export default function ContactPage() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  return (
    <div style={{ background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '72px',
        padding: isMobile ? '0 20px' : '0 48px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <img src="/logo-header.png" alt="JAYD Prods" style={{ height: '16px', width: 'auto' }} draggable={false} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
            Home
          </button>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px' }}>→</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>Contact</span>
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: isMobile ? '60px 24px' : '80px 48px',
        gap: isMobile ? '48px' : '80px',
      }}>

        {/* CTA principal */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', margin: 0 }}>
            New project?
          </p>
          <h1 style={{ fontFamily: "'Delight', sans-serif", fontWeight: 700, fontSize: 'clamp(48px, 8vw, 100px)', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#fff', margin: 0, lineHeight: 1 }}>
            Let's Chat.
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.4)', margin: 0, maxWidth: '480px' }}>
            Have a project in mind? Reach out and let's talk about what we can build together.
          </p>
        </div>

        {/* Botões */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: '16px',
          width: isMobile ? '100%' : 'auto',
          maxWidth: isMobile ? '320px' : 'none',
        }}>
          {[
            { label: 'WhatsApp', href: whatsapp, external: true },
            { label: 'Instagram', href: 'https://www.instagram.com/jaydprods/', external: true },
            { label: 'Email', href: 'mailto:jaydprods@gmail.com', external: false },
          ].map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: '10px',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '999px',
                padding: '18px 48px',
                width: isMobile ? '100%' : 'auto',
                fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '11px',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#fff', textDecoration: 'none', background: 'transparent',
                transition: 'border-color 0.3s, background 0.3s, color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Divisória */}
        <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.08)' }} />

        {/* Info de contacto */}
        <div style={{ display: 'flex', gap: isMobile ? '40px' : '80px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Location</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Aveiro, Portugal</span>
          </div>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Based in</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Available Worldwide</span>
          </div>
        </div>

      </div>
    </div>
  )
}
