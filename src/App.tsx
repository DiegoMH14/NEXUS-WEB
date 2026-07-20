import { useState } from 'react'
import SplashIntro from './components/SplashIntro'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import About from './components/About'
import Comparison from './components/Comparison'
import Sectors from './components/Sectors'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      {!introDone && <SplashIntro onComplete={() => setIntroDone(true)} />}

      <div style={{ opacity: introDone ? 1 : 0, transition: 'opacity .5s ease' }}>
        {introDone && <ScrollProgress />}
        <Navbar />
        <main>
          <Hero />
          <TrustBar />
          <About />
          <Comparison />
          <Sectors />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  )
}
