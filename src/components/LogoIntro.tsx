import { useEffect, useRef } from 'react'
import { motion, animate, useMotionValue } from 'framer-motion'

interface Props {
  onComplete: () => void
}

interface Message {
  text: string
  top?: string
  bottom?: string
  left?: string
  right?: string
  delay: number
  maxOpacity: number
  size: string
}

const messages: Message[] = [
  { text: 'Cinematic Visuals',       top: '14%',    left: '6%',   delay: 0.8, maxOpacity: 0.40, size: 'text-[10px]' },
  { text: 'Motion · Light · Emotion',bottom: '18%', right: '5%',  delay: 1.3, maxOpacity: 0.32, size: 'text-[9px]'  },
  { text: 'Every Frame Matters',     top: '13%',    right: '7%',  delay: 1.8, maxOpacity: 0.36, size: 'text-[9px]'  },
  { text: 'Visual Storytelling',     bottom: '22%', left: '4%',   delay: 2.3, maxOpacity: 0.32, size: 'text-[10px]' },
  { text: 'Crafted with Purpose',    top: '44%',    right: '3%',  delay: 2.8, maxOpacity: 0.28, size: 'text-[9px]'  },
  { text: 'From Vision to Screen',   top: '40%',    left: '3%',   delay: 3.3, maxOpacity: 0.30, size: 'text-[9px]'  },
  { text: 'Audio · Visual · Story',  top: '7%',     left: '37%',  delay: 1.0, maxOpacity: 0.18, size: 'text-[8px]'  },
  { text: 'Premium Production',      bottom: '9%',  left: '34%',  delay: 3.8, maxOpacity: 0.24, size: 'text-[8px]'  },
  { text: 'Beyond the Lens',         bottom: '30%', right: '4%',  delay: 4.2, maxOpacity: 0.22, size: 'text-[8px]'  },
  { text: 'Directing Dreams',        top: '24%',    left: '38%',  delay: 4.6, maxOpacity: 0.16, size: 'text-[8px]'  },
]

export default function LogoIntro({ onComplete }: Props) {
  const containerOpacity = useMotionValue(1)
  const logoOpacity = useMotionValue(0)
  const skipped = useRef(false)

  // Função de skip — fade out imediato
  const skip = () => {
    if (skipped.current) return
    skipped.current = true
    animate(containerOpacity, 0, { duration: 0.5, ease: 'easeIn' }).then(onComplete)
  }

  useEffect(() => {
    // Sequência normal
    const seq = async () => {
      await animate(logoOpacity, 1, { duration: 1.0, ease: 'easeOut' })
      await new Promise(r => setTimeout(r, 6500))
      if (skipped.current) return
      await animate(containerOpacity, 0, { duration: 1.0, ease: 'easeIn' })
      onComplete()
    }
    seq()

    // Skip com click
    window.addEventListener('click', skip)

    // Skip com scroll — preventDefault impede a página de descer
    const skipWheel = (e: WheelEvent) => { e.preventDefault(); skip() }
    const skipTouch = (e: TouchEvent) => { e.preventDefault(); skip() }
    window.addEventListener('wheel', skipWheel, { passive: false })
    window.addEventListener('touchmove', skipTouch, { passive: false })

    return () => {
      window.removeEventListener('click', skip)
      window.removeEventListener('wheel', skipWheel)
      window.removeEventListener('touchmove', skipTouch)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden cursor-pointer"
      style={{ opacity: containerOpacity }}
    >
      {/* Mensagens subliminar */}
      {messages.map((msg, i) => (
        <motion.span
          key={i}
          className="absolute uppercase whitespace-nowrap text-white pointer-events-none"
          style={{
            top: msg.top,
            bottom: msg.bottom,
            left: msg.left,
            right: msg.right,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 300,
            fontSize: msg.size.replace('text-[', '').replace(']', ''),
            letterSpacing: '0.3em',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, msg.maxOpacity, msg.maxOpacity, 0] }}
          transition={{
            duration: 3.2,
            delay: msg.delay,
            times: [0, 0.22, 0.72, 1],
            ease: 'easeInOut',
          }}
        >
          {msg.text}
        </motion.span>
      ))}

      {/* Logo central */}
      <motion.img
        src="/logo.png"
        alt="JAYD Prods"
        className="w-[min(65vw,420px)] object-contain select-none pointer-events-none relative z-10"
        style={{ opacity: logoOpacity }}
        draggable={false}
      />

      {/* Hint de skip */}
      <motion.p
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-600 pointer-events-none"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '10px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Click or scroll to skip
      </motion.p>
    </motion.div>
  )
}
