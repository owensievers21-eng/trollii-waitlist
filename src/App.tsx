import { useState, useRef, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import { HeroCanvas } from './components/HeroCanvas'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { FeaturesSection } from './components/FeaturesSection'
import { NutritionSection } from './components/NutritionSection'
import { CommunitySection } from './components/CommunitySection'
import { PlansSection } from './components/PlansSection'
import { WaitlistCTA } from './components/WaitlistCTA'
import { Footer } from './components/Footer'
import { SignInModal } from './components/SignInModal'

export default function App() {
  const [signInOpen, setSignInOpen] = useState(false)
  const [signInMode, setSignInMode] = useState<'signin' | 'signup' | 'magic'>('signin')
  const [user, setUser] = useState<User | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const openSignIn = () => {
    setSignInMode('signin')
    setSignInOpen(true)
  }

  const openSignUp = () => {
    setSignInMode('signup')
    setSignInOpen(true)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="relative overflow-x-hidden">
      <HeroCanvas cardRef={cardRef} textRef={textRef} />
      <Navbar onSignIn={openSignIn} user={user} onSignOut={handleSignOut} />
      <HeroSection cardRef={cardRef} textRef={textRef} onSignIn={openSignUp} />
      <FeaturesSection />
      <NutritionSection />
      <CommunitySection />
      <PlansSection onSignUp={openSignUp} />
      <WaitlistCTA />
      <Footer />
      <SignInModal
        open={signInOpen}
        onClose={() => setSignInOpen(false)}
        initialMode={signInMode}
      />
    </div>
  )
}
