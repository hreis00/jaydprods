import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const navItems = [
  { label: 'Welcome',  href: '#welcome',  route: null       },
  { label: 'Work',     href: null,        route: '/work'    },
  { label: 'Services', href: '#work',     route: null       },
  { label: 'Contact',  href: null,        route: '/contact' },
]

export default function Header() {
  const [active, setActive]     = useState('welcome')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate  = useNavigate()
  const isMobile  = useIsMobile()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
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

  // Fecha menu ao mudar para desktop
  useEffect(() => { if (!isMobile) setMenuOpen(false) }, [isMobile])

  // Bloqueia scroll enquanto menu está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

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
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 20px' : '0 48px',
          height: '72px',
          background: scrolled || menuOpen ? 'rgba(0,0,0,0.95)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a
          href="#welcome"
          onClick={e => { e.preventDefault(); handleNav('#welcome'); setMenuOpen(false) }}
          style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
        >
          <img src="/logo-header.png" alt="JAYD Prods" style={{ height: '16px', width: 'auto', objectFit: 'contain' }} draggable={false} />
        </a>

        {/* Desktop nav */}
        {!isMobile && (
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
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
                >
                  {label}
                  <span style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
                    background: '#fff', opacity: isActive ? 1 : 0,
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    transformOrigin: 'left',
                  }} />
                </a>
              )
            })}
          </nav>
        )}

        {/* Mobile — hambúrguer */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px', zIndex: 51 }}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', width: '22px', height: '1.5px', background: '#fff', transformOrigin: 'center' }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              style={{ display: 'block', width: '22px', height: '1.5px', background: '#fff' }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', width: '22px', height: '1.5px', background: '#fff', transformOrigin: 'center' }}
            />
          </button>
        )}
      </header>

      {/* Mobile — overlay do menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 45,
              background: '#000',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '44px',
            }}
          >
            {navItems.map(({ label, href, route }, i) => (
              <motion.a
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
                href={href ?? route ?? undefined}
                onClick={e => {
                  e.preventDefault()
                  setMenuOpen(false)
                  if (route) navigate(route)
                  else handleNav(href)
                }}
                style={{
                  fontFamily: "'Delight', sans-serif",
                  fontWeight: 700,
                  fontSize: '38px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
