import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCountUp } from '../hooks/useCountUp'

const STATS = [
  { display: '2,400+', countTo: 2400, suffix: '+', label: 'Waitlist members', color: '#059669' },
  { display: '14M+',   countTo: 14,   suffix: 'M+', label: 'Foods in database', color: '#3B82F6' },
  { display: '4.8 ★', countTo: 48,   suffix: ' ★', label: 'Beta rating', color: '#F59E0B', decimal: true },
  { display: '9 days', countTo: 9,    suffix: ' days', label: 'Avg. beta streak', color: '#EC4899' },
]

const TESTIMONIALS = [
  {
    name: 'Maya R.',
    handle: '@maya_runs',
    avatar: 'M',
    avatarColor: '#3B82F6',
    quote: "I've tried every macro app out there. Trollii is the first one I've actually stuck with past two weeks. The A.M.I. suggestions feel like having a dietitian in my pocket.",
    detail: 'Lost 8 lbs in 6 weeks · Protein goal hit 5 days/week',
    streak: 42,
  },
  {
    name: 'James K.',
    handle: '@jklifts',
    avatar: 'J',
    avatarColor: '#059669',
    quote: "Bulking without tracking is just guessing. Trollii made it effortless — I scan my meal prep containers on Sunday and the whole week is done.",
    detail: 'Gained 4 lbs muscle in 8 weeks · 98% logging consistency',
    streak: 67,
  },
  {
    name: 'Priya S.',
    handle: '@priyaeats',
    avatar: 'P',
    avatarColor: '#EC4899',
    quote: "Finally an app that doesn't make me feel bad about food. It just gives me the numbers and lets me decide. The community challenges make it social without the pressure.",
    detail: 'Maintained weight for 3 months · Fiber goal unlocked',
    streak: 28,
  },
]

const CHALLENGES = [
  { emoji: '💪', title: 'Protein Week', participants: 38, label: 'Coming soon' },
  { emoji: '🥗', title: 'Clean Eating Sprint', participants: 61, label: 'Coming soon' },
  { emoji: '💧', title: 'Hydration Challenge', participants: 24, label: 'Coming soon' },
]

function StatCard({ countTo, suffix, label, color, decimal, active }: {
  countTo: number; suffix: string; label: string; color: string; decimal?: boolean; active: boolean
}) {
  const raw = useCountUp(countTo, 1600, active)
  const formatted = decimal
    ? (raw / 10).toFixed(1)
    : countTo >= 1000
      ? raw.toLocaleString()
      : raw.toString()
  return (
    <div className="rounded-2xl border border-slate-100 p-6 text-center" style={{ background: '#FAFAFA' }}>
      <p className="text-[32px] sm:text-[38px] font-semibold leading-none mb-2" style={{ color, fontFamily: 'var(--font-heading)' }}>
        {formatted}{suffix}
      </p>
      <p className="text-[13px] text-slate-500">{label}</p>
    </div>
  )
}

export function CommunitySection() {
  const [statsRef, statsVisible] = useScrollReveal<HTMLDivElement>()
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [testimonialsRef, testimonialsVisible] = useScrollReveal<HTMLDivElement>()

  return (
    <section id="community" className="relative bg-white" style={{ zIndex: 2 }}>
      {/* Wave top */}
      <div className="w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 64" fill="none" className="w-full">
          <path d="M0 64 C360 0 1080 0 1440 64 L1440 0 L0 0 Z" fill="#ECFDF5" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-14 pb-24">

        {/* Header */}
        <div ref={headerRef} className={`mb-14 reveal${headerVisible ? ' visible' : ''}`}>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
            <span className="text-[13px] text-primary font-medium">The community</span>
          </div>
          <h2
            className="text-[36px] sm:text-[48px] font-semibold text-fore leading-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Progress is better
            <br />
            <span className="text-primary">together</span>
          </h2>
          <p className="text-[17px] text-slate-500 max-w-lg leading-relaxed">
            Join thousands of people who track, share, and keep each other on track — without the toxic diet culture.
          </p>
        </div>

        {/* Stats strip */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} active={statsVisible} />
          ))}
        </div>

        {/* Testimonials */}
        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`rounded-2xl border border-slate-100 p-7 reveal stagger-${i + 1}${testimonialsVisible ? ' visible' : ''}`}
              style={{ background: '#FAFAFA' }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#F59E0B" aria-hidden="true">
                    <path d="M8 1l1.854 3.756L14 5.528l-3 2.924.708 4.131L8 10.667l-3.708 1.916L5 8.452 2 5.528l4.146-.772L8 1z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[14px] text-slate-600 leading-relaxed mb-5 italic">
                "{t.quote}"
              </p>

              {/* Detail */}
              <p className="text-[12px] text-primary font-medium mb-5">{t.detail}</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0"
                  style={{ background: t.avatarColor }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-fore">{t.name}</p>
                  <p className="text-[12px] text-slate-400">{t.handle}</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <span className="text-[14px]">🔥</span>
                  <span className="text-[12px] font-semibold text-slate-500">{t.streak}d</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active challenges */}
        <div
          className="rounded-2xl p-8"
          style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)', border: '1px solid #BBF7D0' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Live challenges</p>
              <h3
                className="text-[22px] font-semibold text-fore"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Join a group challenge
              </h3>
            </div>
            <a href="#plans" className="text-[13px] text-primary font-medium hover:underline cursor-pointer hidden sm:block">
              See all challenges →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CHALLENGES.map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-xl p-5 border border-emerald-100 hover:border-primary transition-colors duration-200 cursor-pointer group"
              >
                <span className="text-[28px] block mb-3">{c.emoji}</span>
                <p className="text-[15px] font-semibold text-fore mb-1 group-hover:text-primary transition-colors">{c.title}</p>
                <p className="text-[12px] text-slate-400">{c.participants.toLocaleString()} participants</p>
                <span
                  className="inline-block mt-3 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: '#F1F5F9', color: '#64748B' }}
                >
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
