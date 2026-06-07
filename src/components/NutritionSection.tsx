import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, staggerContainer } from '../lib/variants'

const MACRO_BREAKDOWN = [
  { label: 'Protein', grams: 68, pct: 28, color: '#3B82F6', bg: '#EFF6FF', track: '#DBEAFE', desc: 'Builds muscle, keeps you full' },
  { label: 'Carbs',   grams: 142, pct: 58, color: '#F59E0B', bg: '#FFFBEB', track: '#FEF3C7', desc: 'Primary energy source' },
  { label: 'Fat',     grams: 34,  pct: 14, color: '#EC4899', bg: '#FDF2F8', track: '#FCE7F3', desc: 'Hormones, brain function' },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Log your food',
    body: 'Search 14M+ foods, scan a barcode, or snap a photo. A.M.I. handles the rest in under 3 seconds.',
    color: '#059669',
  },
  {
    step: '02',
    title: 'See the breakdown',
    body: 'Every meal is instantly broken into protein, carbs, fat, fiber, and micronutrients. No maths needed.',
    color: '#3B82F6',
  },
  {
    step: '03',
    title: 'Hit your targets',
    body: 'Daily targets adapt as your body changes. A.M.I. nudges you when you\'re off track — gently.',
    color: '#F59E0B',
  },
]

function MacroDonut() {
  const cx = 80
  const cy = 80
  const r = 60
  const circ = 2 * Math.PI * r

  const segments = [
    { pct: 0.28, color: '#3B82F6', label: 'Protein' },
    { pct: 0.58, color: '#F59E0B', label: 'Carbs' },
    { pct: 0.14, color: '#EC4899', label: 'Fat' },
  ]

  let cumulative = 0
  const arcs = segments.map((s) => {
    const len = s.pct * circ
    cumulative += s.pct
    return { ...s, offset: circ - len, dashArray: `${len} ${circ - len}`, rotate: cumulative * 360 - s.pct * 360 }
  })

  return (
    <div className="relative inline-block">
      <svg width="160" height="160" viewBox="0 0 160 160" aria-hidden="true">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F1F5F9" strokeWidth="18" />
        {arcs.map((arc, i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={arc.color}
            strokeWidth="18"
            strokeDasharray={arc.dashArray}
            strokeDashoffset={arc.offset}
            transform={`rotate(${-90 + (i === 0 ? 0 : segments.slice(0,i).reduce((a,b)=>a+b.pct,0)*360)} ${cx} ${cy})`}
          />
        ))}
        <text x={cx} y={cy - 8} textAnchor="middle" fontSize="22" fontWeight="700" fill="#0F172A" fontFamily="Lora,serif">1,840</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="11" fill="#94A3B8" fontFamily="Raleway,sans-serif">calories today</text>
      </svg>
    </div>
  )
}

function MacroBar({ pct, color, track }: { pct: number; color: string; track: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <div ref={ref} className="h-2 rounded-full overflow-hidden" style={{ background: track }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: inView ? `${pct * 1.7}%` : 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />
    </div>
  )
}

export function NutritionSection() {
  return (
    <section id="nutrition" className="relative bg-surface" style={{ zIndex: 2 }}>
      {/* Wave top */}
      <div className="w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 64" fill="none" className="w-full">
          <path d="M0 0 C360 64 1080 64 1440 0 L1440 64 L0 64 Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-14 pb-24">

        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3.5 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-[13px] text-primary font-medium">How it works</span>
            </div>
            <h2
              className="text-[36px] sm:text-[48px] font-semibold text-fore leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              The science of your plate,
              <br />
              <span className="text-primary">made simple</span>
            </h2>
          </div>
          <p className="text-[16px] text-slate-500 max-w-sm leading-relaxed lg:text-right">
            Trollii doesn't just count calories. It breaks every meal into the macronutrients that actually drive your results.
          </p>
        </motion.div>

        {/* Main content: two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">

          {/* Left: macro visual */}
          <div className="flex flex-col items-center lg:items-start">
            <div
              className="rounded-3xl p-8 w-full max-w-md"
              style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(5,150,105,0.1)', boxShadow: '0 8px 40px rgba(5,150,105,0.08)' }}
            >
              <div className="flex items-center gap-6 mb-8">
                <MacroDonut />
                <div>
                  <p className="text-[13px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Today's split</p>
                  <p className="text-[28px] font-semibold text-fore leading-none mb-1" style={{ fontFamily: 'var(--font-heading)' }}>244g</p>
                  <p className="text-[13px] text-slate-500">total macros</p>
                </div>
              </div>

              {MACRO_BREAKDOWN.map((m) => (
                <div key={m.label} className="mb-4 last:mb-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: m.color }} />
                      <span className="text-[14px] font-medium text-slate-700">{m.label}</span>
                      <span className="text-[12px] text-slate-400">{m.desc}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[15px] font-semibold" style={{ color: m.color }}>{m.grams}g</span>
                      <span className="text-[12px]" style={{ color: m.color, opacity: 0.5 }}>{m.pct}%</span>
                    </div>
                  </div>
                  <MacroBar pct={m.pct} color={m.color} track={m.track} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: how it works steps */}
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {HOW_IT_WORKS.map((s) => (
              <motion.div key={s.step} variants={fadeUp} className="flex gap-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: s.color + '15', border: `1px solid ${s.color}30` }}
                >
                  <span className="text-[12px] font-bold" style={{ color: s.color }}>{s.step}</span>
                </div>
                <div>
                  <h3
                    className="text-[20px] font-semibold text-fore mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-[15px] text-slate-500 leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}

            <div className="pt-2">
              <a
                href="#plans"
                className="inline-flex items-center gap-2 bg-primary text-white text-[15px] font-medium px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors duration-200 cursor-pointer"
              >
                Start tracking free
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Micronutrient chips */}
        <div>
          <p className="text-[13px] text-slate-400 uppercase tracking-widest font-semibold mb-4">Also tracked automatically</p>
          <div className="flex flex-wrap gap-2">
            {['Sodium', 'Potassium', 'Vitamin C', 'Vitamin D', 'Iron', 'Calcium', 'Magnesium', 'Zinc', 'B12', 'Folate', 'Omega-3', 'Cholesterol', 'Sugar', 'Saturated Fat'].map((n) => (
              <span key={n} className="text-[13px] text-slate-600 bg-white border border-slate-200 rounded-full px-3.5 py-1">
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
