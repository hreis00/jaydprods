import { motion } from 'framer-motion'

const messages = [
  { text: 'Cinematic Visuals',        top: '8%',  left: '5%'  },
  { text: 'Motion · Light · Emotion', top: '17%', right: '4%' },
  { text: 'Every Frame Matters',      top: '29%', left: '3%'  },
  { text: 'Visual Storytelling',      top: '43%', right: '6%' },
  { text: 'Crafted with Purpose',     top: '56%', left: '6%'  },
  { text: 'From Vision to Screen',    top: '67%', right: '3%' },
  { text: 'Audio · Visual · Story',   top: '11%', left: '38%' },
  { text: 'Premium Production',       top: '78%', left: '34%' },
  { text: 'Beyond the Lens',          top: '88%', right: '5%' },
  { text: 'Directing Dreams',         top: '23%', left: '41%' },
]

export default function SubtleMessages() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none">
      {messages.map((msg, i) => (
        <motion.span
          key={i}
          className="absolute uppercase text-white whitespace-nowrap"
          style={{
            top: msg.top,
            left: 'left' in msg ? (msg as any).left : undefined,
            right: 'right' in msg ? (msg as any).right : undefined,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 300,
            fontSize: '9px',
            letterSpacing: '0.3em',
          }}
          animate={{ opacity: [0, 0.18, 0.18, 0] }}
          transition={{
            duration: 5,
            delay: i * 1.1,          // stagger entre mensagens
            repeat: Infinity,
            repeatDelay: messages.length * 1.1 - 5, // espera que todas passem antes de repetir
            ease: 'easeInOut',
            times: [0, 0.2, 0.8, 1],
          }}
        >
          {msg.text}
        </motion.span>
      ))}
    </div>
  )
}
