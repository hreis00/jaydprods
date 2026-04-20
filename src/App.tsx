import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import SplitShowcase from './components/sections/SplitShowcase'
import About from './components/sections/About'
import Work from './components/sections/Work'
import PhotoGallery from './components/sections/PhotoGallery'
import CTA from './components/sections/CTA'
import Footer from './components/sections/Footer'
import LogoIntro from './components/LogoIntro'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!introDone && <LogoIntro key="intro" onComplete={() => setIntroDone(true)} />}
      </AnimatePresence>

      <motion.main
        className="bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      >
        {introDone && <Header />}
        <SplitShowcase />
        <About introDone={introDone} />
        <Work />
        <PhotoGallery />
        <CTA />
        <Footer />
      </motion.main>
    </>
  )
}
