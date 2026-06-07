import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/variants'
import { supabase } from '../lib/supabase'

const SOCIAL_PROOF = [
  { icon: '🔥', text: '147 people joined this week' },
  { icon: '⚡', text: 'Launching Q3 2026' },
  { icon: '🎁', text: 'Exclusive early access perks' },
]

export function WaitlistCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    try {
      const { error } = await supabase.from('waitlist').insert({ email: email.trim() })
      if (error && error.code !== '23505') throw error
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      className="relative bg-white"
      style={{ zIndex: 2 }}
    >
      {/* Wave top */}
      <div className="w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 56" fill="none" className="w-full">
          <path d="M0 0 C360 56 1080 56 1440 0 L1440 56 L0 56 Z" fill="#ECFDF5" />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center pb-24 pt-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {/* Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            <span className="text-[13px] text-primary font-medium">Now accepting early access</span>
          </div>

          <h2
            className="text-[36px] sm:text-[52px] font-semibold text-fore leading-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Be among the first <br />
            <span style={{ color: 'var(--color-primary)' }}>10,000 members</span>
          </h2>

          <p className="text-[17px] text-slate-500 mb-8 leading-relaxed">
            Join early and be the first to experience smarter nutrition tracking. No credit card. No commitment.
          </p>

          {status === 'done' ? (
            <div className="inline-flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-primary rounded-2xl px-6 py-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" fill="#059669" opacity="0.15" />
                <path d="M7 12l3 3 7-7" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[15px] font-medium">You're on the list! We'll be in touch soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === 'loading'}
                className="flex-1 rounded-full border border-slate-200 px-5 py-3 text-[15px] text-fore placeholder:text-slate-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white text-[15px] font-semibold px-6 py-3 rounded-full hover:bg-emerald-700 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" />
                  </svg>
                ) : 'Join the waitlist'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-[13px] text-red-500 mt-3">Something went wrong — try again or email us at hello@trollii.app</p>
          )}

          {/* Social proof strip */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8">
            {SOCIAL_PROOF.map((s) => (
              <div key={s.text} className="flex items-center gap-2 text-[13px] text-slate-500">
                <span>{s.icon}</span>
                <span>{s.text}</span>
              </div>
            ))}
          </div>

          <p className="text-[12px] text-slate-400 mt-5">
            Your data is private, encrypted, and never sold.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
