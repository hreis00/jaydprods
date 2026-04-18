export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="text-xl font-black tracking-tight text-white mb-1">JAYD PRODS</div>
          <p className="text-zinc-600 text-sm">Visual Production Studio · Lisbon</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          <a
            href="mailto:hello@jaydprods.com"
            className="text-zinc-400 hover:text-white text-sm transition-colors"
          >
            hello@jaydprods.com
          </a>
          <div className="flex gap-6">
            {['Instagram', 'Vimeo', 'LinkedIn'].map((s) => (
              <a
                key={s}
                href="#"
                className="text-zinc-600 hover:text-white text-sm transition-colors tracking-wide"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-zinc-900">
        <p className="text-zinc-700 text-xs">© 2024 JAYD Productions. All rights reserved.</p>
      </div>
    </footer>
  )
}
