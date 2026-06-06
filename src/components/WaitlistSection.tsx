import { useForm, ValidationError } from '@formspree/react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface Props { onWaitlist: () => void }

export function WaitlistSection({ onWaitlist }: Props) {
  const [state, handleSubmit] = useForm('xojzvnjp')
  const [ref, visible] = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="waitlist" className="relative bg-white" style={{ zIndex: 2 }}>
      <div className="w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 64" fill="none" className="w-full">
          <path d="M0 64 C360 0 1080 0 1440 64 L1440 0 L0 0 Z" fill="#ECFDF5" />
        </svg>
      </div>

      <div className={`max-w-2xl mx-auto px-5 sm:px-8 py-20 text-center reveal${visible ? ' visible' : ''}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse relative pulse-ring" aria-hidden="true" />
          <span className="text-[13px] text-primary font-medium">Now accepting early access</span>
        </div>

        <h2 className="text-[36px] sm:text-[52px] font-semibold text-fore leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Be among the first<br /><span className="text-primary">10,000 members</span>
        </h2>

        <p className="text-[17px] text-slate-500 mb-10 leading-relaxed max-w-lg mx-auto">
          Early access members get <strong className="text-fore">3 months of Pro free</strong> at launch. No credit card. No commitment.
        </p>

        {state.succeeded ? (
          <div className="inline-flex flex-col items-center gap-4 px-10 py-8 rounded-2xl border border-emerald-200 bg-emerald-50">
            <div className="w-14 h-14 rounded-full bg-white border border-emerald-200 flex items-center justify-center shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[20px] font-semibold text-fore" style={{ fontFamily: 'var(--font-heading)' }}>You're on the list!</p>
            <p className="text-[15px] text-slate-500">We'll email you the moment Trollii launches. Keep an eye on your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                autoComplete="email"
                className="flex-1 rounded-full border border-slate-200 px-5 py-3.5 text-[15px] text-fore placeholder-slate-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white aria-[invalid]:border-red-400"
              />
              <button
                type="submit"
                disabled={state.submitting}
                className="bg-primary text-white text-[15px] font-semibold px-7 py-3.5 rounded-full hover:bg-emerald-700 disabled:opacity-60 transition-colors cursor-pointer whitespace-nowrap"
              >
                {state.submitting ? 'Joining…' : 'Join the waitlist'}
              </button>
            </div>
            <ValidationError field="email" errors={state.errors} className="text-[13px] text-red-500 text-left pl-5" />
            <ValidationError errors={state.errors} className="text-[13px] text-red-500 text-left pl-5" />
          </form>
        )}

        {!state.succeeded && (
          <p className="text-[13px] text-slate-400 mt-4">
            Your data is private, encrypted, and never sold.{' '}
            <button onClick={onWaitlist} className="underline hover:text-primary transition-colors cursor-pointer">More options →</button>
          </p>
        )}

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 mt-12 flex-wrap">
          <div className="flex items-center gap-2 text-[13px] text-slate-500">
            <span className="text-lg">🔥</span>
            <span><strong className="text-fore">147 people</strong> joined this week</span>
          </div>
          <div className="w-px h-4 bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-2 text-[13px] text-slate-500">
            <span className="text-lg">⚡</span>
            <span>Launching <strong className="text-fore">Q3 2026</strong></span>
          </div>
          <div className="w-px h-4 bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-2 text-[13px] text-slate-500">
            <span className="text-lg">🎁</span>
            <span><strong className="text-fore">3 months Pro</strong> free for early members</span>
          </div>
        </div>
      </div>
    </section>
  )
}
