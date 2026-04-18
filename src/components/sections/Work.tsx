const projects = [
  { title: 'Brand Identity Film', category: 'Commercial', aspect: 'aspect-video' },
  { title: 'Urban Portraits', category: 'Photography', aspect: 'aspect-[3/4]' },
  { title: 'Product Launch', category: 'Commercial', aspect: 'aspect-square' },
  { title: 'Documentary Short', category: 'Film', aspect: 'aspect-video' },
  { title: 'Fashion Editorial', category: 'Photography', aspect: 'aspect-[3/4]' },
  { title: 'Event Coverage', category: 'Photography', aspect: 'aspect-square' },
]

export default function Work() {
  return (
    <section id="work" className="bg-black py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-4">Selected Work</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Projects</h2>
          </div>
          <span className="text-zinc-600 text-sm hidden md:block">2020 — 2024</span>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-zinc-900">
          {projects.map(({ title, category, aspect }) => (
            <div
              key={title}
              className={`group relative bg-zinc-950 overflow-hidden cursor-pointer ${aspect}`}
            >
              {/* Placeholder gradient */}
              <div
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
                style={{
                  background: `linear-gradient(135deg, #${Math.floor(Math.random() * 0x111111 + 0x111111).toString(16).padStart(6, '0')}, #0a0a0a)`,
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs tracking-widest uppercase text-zinc-400 mb-1">{category}</p>
                <h3 className="text-white font-semibold">{title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
