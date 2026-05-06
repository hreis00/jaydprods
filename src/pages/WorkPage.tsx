import { useNavigate } from 'react-router-dom'
import { categories } from '../data/work'
import { useIsMobile } from '../hooks/useIsMobile'

function CategoryCard({ id, label, cover, objectPosition }: typeof categories[0]) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/work/${id}`)}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '14px' }}
    >
      <div
        className="group"
        style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#0a0a0a' }}
      >
        <img
          src={cover}
          alt={label}
          draggable={false}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: objectPosition,
            transition: 'transform 0.6s ease',
          }}
          className="group-hover:scale-[1.04]"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.35)',
          transition: 'background 0.3s',
        }}
          className="group-hover:bg-black/55"
        />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Delight', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(18px, 2.2vw, 28px)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#fff',
          }}>
            {label}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function WorkPage() {
  const navigate  = useNavigate()
  const isMobile  = useIsMobile()

  return (
    <div style={{ background: '#000', minHeight: '100vh', padding: isMobile ? '0 20px 80px' : '0 48px 100px' }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        marginBottom: isMobile ? '40px' : '72px',
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
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>Work</span>
        </div>
      </div>

      {/* Grelha de categorias */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? '16px' : '24px',
        }}>
          {categories.map(c => <CategoryCard key={c.id} {...c} />)}
        </div>
      </div>

    </div>
  )
}
