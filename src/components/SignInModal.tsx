import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface Props {
  open: boolean
  onClose: () => void
  initialMode?: Mode
}

type Mode = 'signin' | 'signup' | 'magic'

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M11.182 0c.05.637-.184 1.302-.58 1.79-.414.51-1.063.9-1.718.846-.063-.627.21-1.284.59-1.748.4-.49 1.074-.876 1.708-.888zm2.125 5.523c-.09.058-1.68.965-1.66 2.876.022 2.283 2.006 3.042 2.029 3.052-.012.065-.315 1.079-1.041 2.12-.623.895-1.271 1.785-2.266 1.803-.977.017-1.292-.577-2.412-.577-1.12 0-1.47.561-2.395.594-.961.034-1.692-.955-2.324-1.844C2.1 11.94 1.144 9.09 2.137 7.097c.485-.985 1.352-1.608 2.289-1.624.952-.017 1.854.638 2.44.638.587 0 1.688-.79 2.844-.674.484.02 1.845.196 2.718 1.48l-.121.106z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" fill="#4285F4" />
    </svg>
  )
}

export function SignInModal({ open, onClose, initialMode = 'signin' }: Props) {
  const [mode, setMode] = useState<Mode>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'magic') {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: window.location.origin },
        })
        if (error) throw error
        setSuccessMessage(`We sent a sign-in link to ${email}`)
      } else if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        onClose()
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        })
        if (error) throw error
        setSuccessMessage(`Check your email to confirm your account. We sent a link to ${email}`)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleOAuth = async (provider: 'google' | 'apple') => {
    setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    })
    if (error) setError(error.message)
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center px-4"
      style={{ zIndex: 50 }}
      role="dialog"
      aria-modal="true"
      aria-label="Sign in to Trollii"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/25 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div
        className="relative w-full max-w-sm rounded-2xl p-7 shadow-2xl"
        style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(24px)' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
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

        {successMessage ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M20 4L9 15l-5-5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-fore font-semibold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Check your email</p>
            <p className="text-[13px] text-slate-500">{successMessage}</p>
            <button onClick={() => { setSuccessMessage(''); setEmail('') }} className="mt-5 text-[13px] text-primary underline cursor-pointer">
              Use a different email
            </button>
          </div>
        ) : (
          <>
            {/* Heading */}
            <h2 className="text-[22px] font-semibold text-fore mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {mode === 'signup' ? 'Create account' : 'Welcome back'}
            </h2>
            <p className="text-[13px] text-slate-500 mb-6">
              {mode === 'signin' && 'Sign in to see your nutrition data.'}
              {mode === 'signup' && 'Start tracking your macros for free.'}
              {mode === 'magic' && 'Get a magic link sent to your email.'}
            </p>

            {/* OAuth buttons */}
            {mode !== 'magic' && (
              <>
                <div className="flex gap-3 mb-5">
                  <button
                    onClick={() => handleOAuth('apple')}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-[13px] font-medium text-fore hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <AppleIcon /> Apple
                  </button>
                  <button
                    onClick={() => handleOAuth('google')}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-[13px] font-medium text-fore hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <GoogleIcon /> Google
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-slate-100" />
                  <span className="text-[12px] text-slate-400">or</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>
              </>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-3 mb-4">
                <div>
                  <label htmlFor="email" className="block text-[12px] font-semibold text-slate-500 mb-1.5 tracking-wide uppercase">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-[14px] text-fore placeholder-slate-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                {mode !== 'magic' && (
                  <div>
                    <label htmlFor="password" className="block text-[12px] font-semibold text-slate-500 mb-1.5 tracking-wide uppercase">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-[14px] text-fore placeholder-slate-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                )}
              </div>

              {error && (
                <p className="text-[13px] text-red-500 mb-3" role="alert">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white rounded-xl py-3 text-[15px] font-medium hover:bg-emerald-700 disabled:opacity-60 transition-colors cursor-pointer mb-3"
              >
                {loading ? 'Just a moment…' : mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Send magic link'}
              </button>

              <button
                type="button"
                onClick={() => setMode(mode === 'magic' ? 'signin' : 'magic')}
                className="w-full text-[13px] text-slate-400 hover:text-primary transition-colors cursor-pointer py-1"
              >
                {mode === 'magic' ? '← Back to password sign in' : 'Or use a magic link instead'}
              </button>
            </form>

            {/* Mode toggle */}
            <p className="text-center text-[13px] text-slate-400 mt-5 pt-5 border-t border-slate-100">
              {mode === 'signup' ? (
                <>Already have an account?{' '}
                  <button onClick={() => setMode('signin')} className="text-primary font-medium cursor-pointer hover:underline">Sign in</button>
                </>
              ) : (
                <>New to Trollii?{' '}
                  <button onClick={() => setMode('signup')} className="text-primary font-medium cursor-pointer hover:underline">Create a free account</button>
                </>
              )}
            </p>
          </>
        )}

        {/* Security note */}
        <p className="text-center text-[11px] text-slate-300 mt-4">
          Your data is private, encrypted, and never sold.
        </p>
      </div>
    </div>
  )
}
