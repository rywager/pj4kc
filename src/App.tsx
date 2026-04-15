import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { StatsBar } from './components/StatsBar'
import { About } from './components/About'
import { Northland } from './components/Northland'
import { PurpleParty } from './components/PurpleParty'
import { Platform } from './components/Platform'
import { Endorsements } from './components/Endorsements'
import { GetInvolved } from './components/GetInvolved'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-royal-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Northland />
        <PurpleParty />
        <Platform />
        <Endorsements />
        <GetInvolved />
      </main>
      <Footer />
    </div>
  )
}

export default App
