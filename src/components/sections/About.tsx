import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const stats = [
  { num: 200,       suffix: '+',  label: 'Projects' },
  { num: 6,         suffix: '',   label: 'Years' },
  { num: 40,        suffix: '+',  label: 'Clients' },
  { num: 1_000_000, suffix: '',   label: 'Views' },
]

function formatCount(count: number, suffix: string): string {
  if (count >= 1_000_000) return '1M+'
  if (count >= 1_000)     return `${Math.floor(count / 1_000)}K`
  return `${count}${suffix}`
}

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0)
  const raf = useRef<number>()
  const t0  = useRef<number>()

  useEffect(() => {
    if (!started) return
    t0.current = undefined
    setCount(0)

    const step = (ts: number) => {
      if (!t0.current) t0.current = ts
      const elapsed  = ts - t0.current
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) raf.current = requestAnimationFrame(step)
    }

    raf.current = requestAnimationFrame(step)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [started, target, duration])

  return count
}

function StatCard({ num, suffix, label, introDone }: typeof stats[0] & { introDone: boolean }) {
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-60px' })
  const count   = useCountUp(num, 3000, inView && introDone)

  return (
    <div ref={ref} className="border border-zinc-800 p-6">
      <div className="text-3xl font-black text-white mb-1">
        {formatCount(count, suffix)}
      </div>
      <div className="text-xs tracking-widest uppercase text-zinc-500">{label}</div>
    </div>
  )
}

export default function About({ introDone }: { introDone: boolean }) {
  return (
    <section className="bg-black py-32 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
            Every frame<br />
            <span className="text-zinc-500">tells a story.</span>
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            JAYD Productions is a visual production studio specializing in cinematic storytelling,
            brand films, and editorial photography. We believe great visuals move people.
          </p>
          <p className="text-zinc-500 leading-relaxed text-sm">
            Based in Aveiro, working worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} introDone={introDone} />)}
        </div>
      </div>
    </section>
  )
}
