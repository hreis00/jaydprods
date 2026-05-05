import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const navItems = [
  { label: 'Welcome',  href: '#welcome',  route: null      },
  { label: 'Work',     href: null,        route: '/work'   },
  { label: 'Services', href: '#work',     route: null      },
  { label: 'Contact',  href: null,        route: '/contact' },
]

export default function Header() {
  const [active, setActive] = useState('welcome')
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Background sutil ao fazer scroll
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Detecta qual secção está visível
    const sections = ['welcome', 'work', 'contact']

    const observers: IntersectionObserver[] = []

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const handleNav = (href: string | null) => {
    if (!href) return
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else if (id === 'welcome') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActive('welcome')
    }
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        height: '72px',
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      {/* Logo — canto superior esquerdo */}
      <a
        href="#welcome"
        onClick={e => { e.preventDefault(); handleNav('#welcome') }}
        style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
      >
        <img
          src="/logo-header.png"
          alt="JAYD Prods"
          style={{ height: '16px', width: 'auto', objectFit: 'contain' }}
          draggable={false}
        />
      </a>

      {/* Nav — lado direito */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        {navItems.map(({ label, href, route }) => {
          const id = href ? href.replace('#', '') : label.toLowerCase()
          const isActive = href ? active === id : false

          return (
            <a
              key={label}
              href={href ?? route ?? undefined}
              onClick={e => {
                e.preventDefault()
                if (route) { navigate(route) } else { handleNav(href) }
              }}
              style={{
                position: 'relative',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                paddingBottom: '4px',
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
              }}
            >
              {label}
              {/* Underline activo */}
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: '#fff',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                transformOrigin: 'left',
              }} />
            </a>
          )
        })}
      </nav>
    </header>
  )
}
