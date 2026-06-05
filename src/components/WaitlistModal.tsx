import { useForm, ValidationError } from '@formspree/react'

interface Props {
  open: boolean
  onClose: () => void
}

export function WaitlistModal({ open, onClose }: Props) {
  const [state, handleSubmit] = useForm('xojzvnjp')

  if (!open) return null

  const handleClose = () => onClose()

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4" style={{ zIndex: 50 }} role="dialog" aria-modal="true" aria-label="Join the Trollii waitlist">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" onClick={handleClose} aria-hidden="true" />

      {/* Card */}
      <div className="relative w-full max-w-sm rounded-2xl p-7 shadow-2xl" style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(24px)' }}>
        {/* Close */}
        <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer" aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M17 6C17 6 14 6 11 9C8 12 7 17 7 17C7 17 10.5 16.5 13 14C15.5 11.5 17 6 17 6Z" fill="#059669" />
            <path d="M7 17C7 17 8 14 10 12" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-[17px] text-fore" style={{ fontFamily: 'var(--font-heading)' }}>trollii</span>
        </div>

        {state.succeeded ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-fore font-semibold text-[20px] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>You're on the list!</p>
            <p className="text-[14px] text-slate-500 mb-1">We'll email you the moment Trollii launches.</p>
            <p className="text-[13px] text-primary font-medium mt-3">🎁 3 months of Pro, on us.</p>
            <button onClick={handleClose} className="mt-6 w-full rounded-xl border border-slate-200 py-2.5 text-[14px] text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer">Close</button>
          </div>
        ) : (
          <>
            <h2 className="text-[22px] font-semibold text-fore mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Get early access</h2>
            <p className="text-[13px] text-slate-500 mb-6">
              Be among the first 10,000 members. Early access = <span className="text-primary font-medium">3 months Pro free</span> at launch.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-3 mb-4">
                <div>
                  <label htmlFor="modal-name" className="block text-[12px] font-semibold text-slate-500 mb-1.5 tracking-wide uppercase">
                    First name <span className="font-normal text-slate-400 normal-case tracking-normal">(optional)</span>
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    name="name"
                    placeholder="Alex"
                    autoComplete="given-name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-[14px] text-fore placeholder-slate-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="modal-email" className="block text-[12px] font-semibold text-slate-500 mb-1.5 tracking-wide uppercase">Email</label>
                  <input
                    id="modal-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-[14px] text-fore placeholder-slate-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all aria-[invalid]:border-red-400"
                  />
                  <ValidationError field="email" errors={state.errors} className="text-[12px] text-red-500 mt-1 block" />
                </div>
              </div>

              <ValidationError errors={state.errors} className="text-[13px] text-red-500 mb-3 block" />

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-primary text-white rounded-xl py-3 text-[15px] font-semibold hover:bg-emerald-700 disabled:opacity-60 transition-colors cursor-pointer"
              >
                {state.submitting ? 'Joining…' : 'Join the waitlist →'}
              </button>
            </form>

            {/* Perks */}
            <div className="mt-5 pt-5 border-t border-slate-100 space-y-2">
              {['3 months of Pro free at launch', 'First to know when we ship', 'Shape the product with early feedback'].map((perk) => (
                <div key={perk} className="flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" fill="#DCFCE7" />
                    <path d="M5 8l2 2 4-4" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[13px] text-slate-500">{perk}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-[11px] text-slate-300 mt-4">Your data is private, encrypted, and never sold.</p>
          </>
        )}
      </div>
    </div>
  )
}
