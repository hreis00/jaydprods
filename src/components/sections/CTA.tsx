export default function CTA() {
  const whatsapp = 'https://wa.me/351928021263'

  return (
    <section
      className="bg-black border-t border-zinc-900"
      style={{ padding: '80px 48px' }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
        }}
      >
        {/* Esquerda — texto */}
        <div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
            marginBottom: '10px',
          }}>
            New project?
          </p>
          <h2 style={{
            fontFamily: "'Delight', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(28px, 3vw, 44px)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#fff',
            margin: 0,
            lineHeight: 1,
          }}>
            Let's Chat.
          </h2>
        </div>

        {/* Direita — botão */}
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '999px',
            padding: '14px 32px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#fff',
            textDecoration: 'none',
            background: 'transparent',
            transition: 'border-color 0.3s, background 0.3s, color 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#fff'
            e.currentTarget.style.background = '#fff'
            e.currentTarget.style.color = '#000'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#fff'
          }}
        >
          WhatsApp →
        </a>
      </div>
    </section>
  )
}
