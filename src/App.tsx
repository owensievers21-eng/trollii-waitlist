import { useState, useRef } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { HeroCanvas } from './components/HeroCanvas'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { FeaturesSection } from './components/FeaturesSection'
import { NutritionSection } from './components/NutritionSection'
import { CommunitySection } from './components/CommunitySection'
import { PlansSection } from './components/PlansSection'
import { WaitlistSection } from './components/WaitlistSection'
import { Footer } from './components/Footer'
import { WaitlistModal } from './components/WaitlistModal'

export default function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const openWaitlist = () => setWaitlistOpen(true)

  return (
    <div className="relative overflow-x-hidden">
      <HeroCanvas cardRef={cardRef} textRef={textRef} />
      <Navbar onWaitlist={openWaitlist} />
      <HeroSection cardRef={cardRef} textRef={textRef} onWaitlist={openWaitlist} />
      <FeaturesSection onWaitlist={openWaitlist} />
      <NutritionSection onWaitlist={openWaitlist} />
      <CommunitySection onWaitlist={openWaitlist} />
      <PlansSection onWaitlist={openWaitlist} />
      <WaitlistSection onWaitlist={openWaitlist} />
      <Footer />
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      <Analytics />
    </div>
  )
}
