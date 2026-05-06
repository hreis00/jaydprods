import { useEffect } from 'react'

export function useScrollLock() {
  useEffect(() => {
    const scrollY = window.scrollY

    // Funciona em iOS Safari (overflow: hidden no body não chega)
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      // Restaura a posição exata onde estava
      window.scrollTo(0, scrollY)
    }
  }, [])
}
