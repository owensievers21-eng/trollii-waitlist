const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 3v18h18" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 16l4-5 3 3 5-7" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Smart Macro Tracking',
    title: 'Every gram, accounted for',
    body: 'Log meals in seconds with AI-powered food search across 14 million items. Protein, carbs, fat, fiber — tracked in real time with daily and weekly summaries.',
    color: '#059669',
    bg: '#ECFDF5',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#3B82F6" strokeWidth="1.8" />
        <path d="M8 12l2 2 4-4" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 9h18" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    label: 'Barcode & Photo Scan',
    title: 'Point, shoot, logged',
    body: 'Scan any barcode or snap a photo of your meal. A.M.I. identifies the food, pulls the nutrition data, and logs it — all before you put the fork down.',
    color: '#3B82F6',
    bg: '#EFF6FF',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="#F59E0B" strokeWidth="1.8" />
        <path d="M12 7v5l3 3" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Personalized Goals',
    title: 'Your macros, your body',
    body: 'Input your stats and targets — fat loss, muscle gain, maintenance — and get macro targets calculated specifically for you. Adjust them any time as your body changes.',
    color: '#F59E0B',
    bg: '#FFFBEB',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" stroke="#EC4899" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Meal Planning',
    title: 'Plan the week. Hit the macros.',
    body: 'Build weekly meal plans from your logged favourites or let A.M.I. generate one that fits your macros, calorie budget, and food preferences — automatically.',
    color: '#EC4899',
    bg: '#FDF2F8',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="#8B5CF6" strokeWidth="1.8" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Community',
    title: 'Progress is better together',
    body: 'Share meals, streaks, and milestones with friends. Join group challenges, compare macros, and keep each other accountable — without the toxic diet culture.',
    color: '#8B5CF6',
    bg: '#F5F3FF',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#EA580C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Progress Insights',
    title: 'Data that actually tells you something',
    body: "Weekly and monthly reports surface your real patterns — not just totals. See which meals spike your calories, where you fall short on protein, and what's working.",
    color: '#EA580C',
    bg: '#FFF7ED',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="12" cy="14" rx="4" ry="3" stroke="#F43F5E" strokeWidth="1.8" />
        <ellipse cx="7" cy="11" rx="1.5" ry="2" stroke="#F43F5E" strokeWidth="1.5" />
        <ellipse cx="10" cy="9" rx="1.5" ry="2" stroke="#F43F5E" strokeWidth="1.5" />
        <ellipse cx="14" cy="9" rx="1.5" ry="2" stroke="#F43F5E" strokeWidth="1.5" />
        <ellipse cx="17" cy="11" rx="1.5" ry="2" stroke="#F43F5E" strokeWidth="1.5" />
      </svg>
    ),
    label: 'A.M.I. Pet System',
    title: 'Eat well. Level up your pet.',
    body: 'Every macro you log earns your pet XP. Hatch eggs, raise one of four creatures, and battle friends — nutrition tracking that actually feels like a game.',
    color: '#F43F5E',
    bg: '#FFF1F2',
  },
]

import { useScrollReveal } from '../hooks/useScrollReveal'

export function FeaturesSection() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="features"
      className="relative bg-white"
      style={{ zIndex: 2 }}
    >
      {/* Top divider wave */}
      <div className="w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 64 C360 0 1080 0 1440 64 L1440 0 L0 0 Z" fill="#DCFCE7" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-14 pt-4 pb-24">
        {/* Section header */}
        <div ref={headerRef} className={`mb-16 reveal${headerVisible ? ' visible' : ''}`}>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
            <span className="text-[13px] text-primary font-medium">What Trollii does</span>
          </div>
          <h2
            className="text-[36px] sm:text-[48px] font-semibold text-fore leading-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Everything you need
            <br />
            <span className="text-primary">to hit your goals</span>
          </h2>
          <p className="text-[17px] text-slate-500 max-w-xl leading-relaxed">
            No gimmicks, no complicated plans. Just clean tracking, smart AI, and the data to understand what's actually happening in your body.
          </p>
        </div>

        {/* Feature grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={f.label}
              className={`feature-card group rounded-2xl border border-slate-100 p-7 hover:border-transparent cursor-default reveal stagger-${Math.min(i + 1, 6)}${gridVisible ? ' visible' : ''}`}
              style={{ background: '#FAFAFA' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = f.bg
                el.style.boxShadow = `0 12px 40px ${f.color}20`
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = '#FAFAFA'
                el.style.boxShadow = ''
              }}
            >
              {/* Icon container */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: f.bg, border: `1px solid ${f.color}22` }}
              >
                {f.icon}
              </div>

              {/* Label chip */}
              <p
                className="text-[11px] font-semibold tracking-widest uppercase mb-2"
                style={{ color: f.color }}
              >
                {f.label}
              </p>

              {/* Title */}
              <h3
                className="text-[20px] font-semibold text-fore mb-3 leading-snug"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {f.title}
              </h3>

              {/* Body */}
              <p className="text-[14px] text-slate-500 leading-relaxed">
                {f.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="#plans"
            className="inline-flex items-center gap-2 bg-primary text-white text-[15px] font-medium px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors duration-200 cursor-pointer"
          >
            See pricing
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#nutrition"
            className="text-[15px] text-slate-500 hover:text-primary transition-colors duration-200 cursor-pointer underline underline-offset-2"
          >
            How the nutrition tracking works →
          </a>
        </div>
      </div>
    </section>
  )
}
