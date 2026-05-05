import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onComplete: () => void
}

type Phase = 'boot' | 'scanning' | 'focusing' | 'locked' | 'exit'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function CameraIntro({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('boot')
  const [timecode, setTimecode] = useState('00:00:00:00')
  const [focusJitter, setFocusJitter] = useState({ x: 0, y: 0 })
  const frameRef = useRef(0)
  const secRef = useRef(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('scanning'), 400)
    const t2 = setTimeout(() => setPhase('focusing'), 1400)
    const t3 = setTimeout(() => setPhase('locked'), 2600)
    const t4 = setTimeout(() => setPhase('exit'), 3500)
    const t5 = setTimeout(onComplete, 4100)
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout)
  }, [onComplete])

  // Timecode counter at ~24fps
  useEffect(() => {
    const iv = setInterval(() => {
      frameRef.current++
      if (frameRef.current >= 24) { frameRef.current = 0; secRef.current++ }
      setTimecode(`00:00:${pad(secRef.current)}:${pad(frameRef.current)}`)
    }, 42)
    return () => clearInterval(iv)
  }, [])

  // AF hunting jitter
  useEffect(() => {
    if (phase !== 'focusing') { setFocusJitter({ x: 0, y: 0 }); return }
    const iv = setInterval(() => {
      setFocusJitter({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
      })
    }, 80)
    return () => clearInterval(iv)
  }, [phase])

  const showUI = phase !== 'boot'
  const isLocked = phase === 'locked' || phase === 'exit'
  const isFocusing = phase === 'focusing'

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-black overflow-hidden select-none"
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%)',
            }}
          />

          {/* Boot flicker */}
          {phase === 'boot' && (
            <motion.div
              className="absolute inset-0 bg-white/5"
              animate={{ opacity: [0, 0.08, 0, 0.05, 0] }}
              transition={{ duration: 0.35, times: [0, 0.2, 0.4, 0.7, 1] }}
            />
          )}

          {/* ── TOP LEFT — REC + timecode ── */}
          <div className="absolute top-7 left-8 flex items-center gap-3 z-20">
            <motion.div
              animate={{ opacity: [1, 0.1, 1] }}
              transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
              className="flex items-center gap-1.5"
            >
              <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
              <span className="text-red-400 text-[11px] font-mono tracking-[0.25em]">REC</span>
            </motion.div>
            <span className="text-white/50 text-[11px] font-mono tracking-wider">{timecode}</span>
          </div>

          {/* ── TOP RIGHT — camera settings ── */}
          <AnimatePresence>
            {showUI && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute top-7 right-8 text-right z-20 space-y-[3px]"
              >
                <div className="text-white/60 text-[11px] font-mono tracking-wider">4K  24fps</div>
                <div className="text-white/40 text-[11px] font-mono tracking-wider">ISO 800</div>
                <div className="text-white/40 text-[11px] font-mono tracking-wider">f / 1.4</div>
                <div className="text-white/40 text-[11px] font-mono tracking-wider">1/50s</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── CENTER — focus brackets ── */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <motion.div
              className="relative w-44 h-44"
              animate={isFocusing ? { x: focusJitter.x, y: focusJitter.y } : { x: 0, y: 0 }}
              transition={{ duration: 0.08, ease: 'linear' }}
            >
              {/* Corner brackets */}
              {[
                'top-0 left-0 border-t-2 border-l-2',
                'top-0 right-0 border-t-2 border-r-2',
                'bottom-0 left-0 border-b-2 border-l-2',
                'bottom-0 right-0 border-b-2 border-r-2',
              ].map((cls, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 1.3 }}
                  animate={{ opacity: showUI ? 1 : 0, scale: showUI ? 1 : 1.3 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className={`absolute w-7 h-7 ${cls} ${isLocked ? 'border-green-400' : 'border-white/80'}`}
                  style={{ transition: 'border-color 0.3s' }}
                />
              ))}

              {/* Center cross */}
              <AnimatePresence>
                {showUI && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative w-5 h-5">
                      <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-white/40" />
                      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/40" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AF status label */}
              <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <AnimatePresence mode="wait">
                  {isFocusing && (
                    <motion.span
                      key="focusing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      exit={{ opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 0.45 }}
                      className="text-yellow-300/90 text-[10px] font-mono tracking-[0.3em] uppercase"
                    >
                      FOCUSING...
                    </motion.span>
                  )}
                  {isLocked && (
                    <motion.span
                      key="locked"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, ease: 'backOut' }}
                      className="text-green-400 text-[10px] font-mono tracking-[0.3em] uppercase flex items-center gap-1.5"
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.9)]" />
                      AF LOCKED
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ── BOTTOM LEFT — brand + system ── */}
          <AnimatePresence>
            {showUI && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="absolute bottom-7 left-8 z-20 space-y-[3px]"
              >
                <div className="text-white/70 text-[11px] font-mono tracking-[0.2em]">JAYD PRODS</div>
                <div className="text-white/30 text-[10px] font-mono tracking-wider">VISUAL PRODUCTION</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── BOTTOM CENTER — exposure meter ── */}
          <AnimatePresence>
            {showUI && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-white/30 text-[9px] font-mono">-2</span>
                  <div className="relative w-24 h-[1px] bg-white/20">
                    {[-2, -1, 0, 1, 2].map((v) => (
                      <div
                        key={v}
                        className="absolute top-1/2 -translate-y-1/2 w-px h-2 bg-white/30"
                        style={{ left: `${((v + 2) / 4) * 100}%` }}
                      />
                    ))}
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-px h-3 bg-white/80" />
                  </div>
                  <span className="text-white/30 text-[9px] font-mono">+2</span>
                </div>
                <span className="text-white/25 text-[9px] font-mono tracking-widest">EXPOSURE</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── BOTTOM RIGHT — skip ── */}
          <button
            onClick={onComplete}
            className="absolute bottom-7 right-8 z-20 text-white/25 text-[10px] font-mono tracking-[0.25em] hover:text-white/60 transition-colors"
          >
            SKIP ›
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
