export default function About() {
  return (
    <section className="bg-black py-32 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-6">About</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
            Every frame<br />
            <span className="text-zinc-500">tells a story.</span>
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            JAYD Productions is a visual production studio specializing in cinematic storytelling,
            brand films, and editorial photography. We believe great visuals move people.
          </p>
          <p className="text-zinc-500 leading-relaxed text-sm">
            Based in Lisbon, working worldwide.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: '200+', label: 'Projects' },
            { value: '8', label: 'Years' },
            { value: '40+', label: 'Clients' },
            { value: '12', label: 'Awards' },
          ].map(({ value, label }) => (
            <div key={label} className="border border-zinc-800 p-6">
              <div className="text-3xl font-black text-white mb-1">{value}</div>
              <div className="text-xs tracking-widest uppercase text-zinc-500">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
