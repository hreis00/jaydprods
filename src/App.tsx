import Hero from './components/Hero'
import About from './components/sections/About'
import Work from './components/sections/Work'
import Footer from './components/sections/Footer'

export default function App() {
  return (
    <main className="bg-black">
      <Hero />
      <About />
      <Work />
      <Footer />
    </main>
  )
}
