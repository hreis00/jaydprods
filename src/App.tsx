import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import SplitShowcase from './components/sections/SplitShowcase'
import About from './components/sections/About'
import Work from './components/sections/Work'
import PhotoGallery from './components/sections/PhotoGallery'
import Footer from './components/sections/Footer'
import LogoIntro from './components/LogoIntro'
import WorkPage from './pages/WorkPage'
import CategoryPage from './pages/CategoryPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <Routes>
      {/* Página de portfólio — sem intro */}
      <Route path="/work" element={<WorkPage />} />
      <Route path="/work/:category" element={<CategoryPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Homepage */}
      <Route path="/" element={
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
            <Footer />
          </motion.main>
        </>
      } />
    </Routes>
  )
}
