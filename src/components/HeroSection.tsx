import { useState, useEffect, useRef } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'

interface Props {
  cardRef: React.RefObject<HTMLDivElement>
  textRef: React.RefObject<HTMLDivElement>
  onWaitlist: () => void
}

const TYPEWRITER_TEXT =
  "Smart nutrition, finally simplified. Your macros tracked in seconds — no spreadsheets, no guesswork. Let's build your healthiest day."

const WHITE_PILLS = [
  'Track my macros',
  'Scan a food label',
  'Build a meal plan',
  'Join 10k+ members',
] as const

const MACROS = [
  { label: 'Protein', value: 68,  goal: 95,  unit: 'g', color: '#3B82F6', track: '#DBEAFE' },
  { label: 'Carbs',   value: 142, goal: 260, unit: 'g', color: '#F59E0B', track: '#FEF3C7' },
  { label: 'Fat',     value: 34,  goal: 82,  unit: 'g', color: '#EC4899', track: '#FCE7F3' },
  { label: 'Fiber',   value: 18,  goal: 28,  unit: 'g', color: '#10B981', track: '#D1FAE5' },
] as const

const MEALS = [
  { emoji: '🥑', name: 'Avocado Toast', kcal: 320, time: '8:14 am' },
  { emoji: '🫐', name: 'Blueberries',   kcal: 84,  time: '10:30 am' },
  { emoji: '🥗', name: 'Greek Salad',   kcal: 215, time: '12:45 pm' },
]

function CalorieRing() {
  const r = 38, circ = 2 * Math.PI * r, prog = 0.78
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="48" cy="48" r={r} fill="none" stroke="#D1FAE5" strokeWidth="7" />
      <circle cx="48" cy="48" r={r} fill="none" stroke="#059669" strokeWidth="7" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={circ * (1 - prog)} transform="rotate(-90 48 48)" />
      <text x="48" y="42" textAnchor="middle" fontSize="14" fill="#059669" fontWeight="700" fontFamily="Raleway,sans-serif">1,840</text>
      <text x="48" y="57" textAnchor="middle" fontSize="10" fill="#94A3B8" fontFamily="Raleway,sans-serif">/ 2,400 kcal</text>
    </svg>
  )
}

function MacroRow({ label, value, goal, unit, color, track }: { label: string; value: number; goal: number; unit: string; color: string; track: string }) {
  const pct = Math.min(value / goal, 1) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[13px] text-slate-500 font-medium">{label}</span>
        <span className="text-[13px]" style={{ color }}>
          <span className="font-semibold">{value}</span>
          <span className="text-[11px]" style={{ color, opacity: 0.45 }}> / {goal}{unit}</span>
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: track }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

function NutritionCard({ cardRef, onWaitlist }: { cardRef: React.RefObject<HTMLDivElement>; onWaitlist: () => void }) {
  const innerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) scale(1.02)`
    el.style.boxShadow = `${-x * 20}px ${y * 16}px 48px rgba(5,150,105,0.18), 0 8px 32px rgba(5,150,105,0.10)`
  }

  const handleMouseLeave = () => {
    const el = innerRef.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)'
    el.style.boxShadow = '0 12px 40px rgba(5,150,105,0.13)'
  }

  return (
    <div ref={cardRef} className="hidden lg:block relative z-10 flex-shrink-0" style={{ perspective: '900px' }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div ref={innerRef} className="card-3d grain rounded-2xl border border-emerald-100/80 p-7 w-[360px]"
        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', boxShadow: '0 12px 40px rgba(5,150,105,0.13)', transition: 'transform 0.08s ease-out, box-shadow 0.08s ease-out' }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[11px] text-slate-400 font-semibold tracking-widest uppercase mb-1">Today</p>
            <p className="text-[26px] font-semibold text-fore leading-none" style={{ fontFamily: 'var(--font-heading)' }}>June 4</p>
            <p className="text-[12px] text-emerald-600 mt-1.5 font-medium">↑ Great progress — 78% of goal</p>
          </div>
          <CalorieRing />
        </div>

        {/* Macro rows */}
        <div className="space-y-3.5 mb-5">
          {MACROS.map((m) => <MacroRow key={m.label} {...m} />)}
        </div>

        {/* Water */}
        <div className="mb-5">
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-[13px] text-slate-500 font-medium">💧 Water</span>
            <span className="text-[13px] text-sky-500"><span className="font-semibold">1.8</span><span className="text-slate-400 text-[11px]"> / 2.5 L</span></span>
          </div>
          <div className="h-2 rounded-full overflow-hidden bg-sky-100">
            <div className="h-full rounded-full bg-sky-400" style={{ width: '72%' }} />
          </div>
        </div>

        {/* Meals */}
        <div className="border-t border-emerald-50 pt-4 mb-4">
          <p className="text-[11px] text-slate-400 font-semibold tracking-widest uppercase mb-3">Meals logged today</p>
          <div className="space-y-2.5">
            {MEALS.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <span className="text-[20px] leading-none">{m.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-slate-700 font-medium truncate">{m.name}</p>
                  <p className="text-[11px] text-slate-400">{m.time}</p>
                </div>
                <span className="text-[12px] text-slate-500 font-medium flex-shrink-0">{m.kcal} kcal</span>
              </div>
            ))}
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-3 py-3 px-3.5 rounded-xl bg-amber-50 border border-amber-100 mb-4">
          <span className="text-[20px]">🔥</span>
          <div>
            <p className="text-[13px] font-semibold text-amber-700">14-day streak</p>
            <p className="text-[11px] text-amber-500">Keep it up — you're on a roll</p>
          </div>
        </div>

        {/* Waitlist CTA */}
        <button onClick={onWaitlist} className="w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-200 py-2.5 text-[13px] font-medium text-primary hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200 cursor-pointer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM4 8l8 5 8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Join the waitlist — it's free
        </button>

        <div className="flex items-center gap-1.5 mt-3.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] text-slate-400">A.M.I. · Adaptive Macro Intelligence</span>
        </div>
      </div>
    </div>
  )
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function HeroSection({ cardRef, textRef, onWaitlist }: Props) {
  const { displayed, done } = useTypewriter({ text: TYPEWRITER_TEXT, speed: 36, startDelay: 600 })
  const [pillsVisible, setPillsVisible] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setPillsVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@trollii.app')
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch { /* clipboard unavailable */ }
  }

  return (
    <section
      className="relative h-screen overflow-hidden flex flex-col lg:flex-row items-end lg:items-center justify-end lg:justify-between px-5 sm:px-8 md:px-10 lg:px-14 pb-12 lg:pb-0 gap-8 lg:gap-16"
      style={{ zIndex: 1 }}
    >
      <div ref={textRef} className="max-w-xl relative z-10 flex-shrink-0">
        {/* AMI badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1.5 mb-5 sm:mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
          <span className="text-[13px] sm:text-[14px] text-primary font-medium">Powered by A.M.I. · Adaptive Macro Intelligence</span>
        </div>

        {/* Typewriter */}
        <p className="text-fore mb-5 sm:mb-6" style={{ fontSize: 'clamp(18px, 4vw, 26px)', lineHeight: 1.35, fontWeight: 400, minHeight: '54px' }}>
          {displayed}
          {!done && <span className="cursor-blink inline-block bg-fore align-middle" style={{ width: '2px', height: '1.1em', marginLeft: '2px', verticalAlign: 'middle' }} aria-hidden="true" />}
        </p>

        {/* Pills */}
        <div className="flex flex-wrap gap-y-1" style={{ opacity: pillsVisible ? 1 : 0, transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.4s ease, transform 0.4s ease' }}>
          {WHITE_PILLS.map((label) => (
            <button key={label} className="inline-flex items-center justify-center bg-white/90 backdrop-blur-sm text-fore border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200">
              {label}
            </button>
          ))}

          <button
            onClick={onWaitlist}
            className="inline-flex items-center justify-center gap-2 sm:gap-3 text-white bg-primary border border-primary rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-emerald-700 transition-colors duration-200 font-medium"
          >
            Join the waitlist →
          </button>

          <button onClick={copyEmail} className="inline-flex items-center justify-center gap-2 sm:gap-3 text-fore bg-white/90 border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200" aria-label="Copy email hello@trollii.app">
            {emailCopied ? <span>✓ Copied!</span> : <><span>Say hi: <span className="underline underline-offset-1">hello@trollii.app</span></span><CopyIcon /></>}
          </button>
        </div>
      </div>

      <NutritionCard cardRef={cardRef} onWaitlist={onWaitlist} />
    </section>
  )
}
