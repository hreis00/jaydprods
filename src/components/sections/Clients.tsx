const logos = [
  { src: '/logos/nike.png',         alt: 'Nike'         },
  { src: '/logos/sporting.png',     alt: 'Sporting CP'  },
  { src: '/logos/nude-project.png', alt: 'Nude Project' },
  { src: '/logos/umpercento.png',   alt: '1%'           },
  { src: '/logos/afa.png',          alt: 'AFA'          },
  { src: '/logos/fluxo.png',        alt: 'Fluxo'        },
  { src: '/logos/logo-pb5.png',     alt: 'Cliente 7'    },
  { src: '/logos/logo-preto2.png',  alt: 'Cliente 8'    },
  { src: '/logos/brand-1.png',      alt: 'Cliente 9'    },
  { src: '/logos/brand-2.png',      alt: 'Cliente 10'   },
  { src: '/logos/brand-3.png',      alt: 'Cliente 11'   },
]

export default function Clients() {
  return (
    <section className="bg-black py-20 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">

        <p className="text-xs tracking-[0.3em] uppercase text-zinc-600 mb-12 text-center">
          Trusted by
        </p>

        {/* Grelha 6 colunas × 2 linhas */}
        <div className="grid grid-cols-6 gap-px bg-zinc-900">
          {logos.map(({ src, alt }) => (
            <div
              key={src}
              className="bg-black flex items-center justify-center group"
              style={{ height: '100px' }}
            >
              {/* Container fixo para cada logo — garante uniformidade */}
              <div className="flex items-center justify-center" style={{ width: '90px', height: '44px' }}>
                <img
                  src={src}
                  alt={alt}
                  draggable={false}
                  style={{
                    width: '90px',
                    height: '44px',
                    objectFit: 'contain',
                    filter: 'brightness(0) invert(1)',
                    opacity: 0.35,
                    transition: 'opacity 0.4s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.35')}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
