import { FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-zinc-900 py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="text-xl font-black tracking-tight text-white mb-1">JAYD PRODS</div>
          <p className="text-zinc-600 text-sm">Visual Production Studio · Aveiro</p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://wa.me/351928021263"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors duration-300"
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={22} />
          </a>
          <a
            href="https://instagram.com/jaydprods"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors duration-300"
            aria-label="Instagram"
          >
            <FaInstagram size={22} />
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-zinc-900">
        <p className="text-zinc-700 text-xs">© 2026 JAYD Productions. All rights reserved.</p>
      </div>
    </footer>
  )
}
