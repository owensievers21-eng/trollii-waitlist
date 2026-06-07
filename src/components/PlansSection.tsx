import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../lib/variants'

const PLANS = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    tagline: 'Start tracking today',
    color: '#64748B',
    features: [
      'Macro tracking (protein, carbs, fat)',
      'Food search — 14M+ items',
      'Barcode scanner',
      'Daily calorie goal',
      '7-day history',
      'Basic progress chart',
    ],
    cta: 'Get started free',
    ctaStyle: 'outline',
    popular: false,
  },
  {
    name: 'Pro',
    price: { monthly: 9.99, annual: 7.99 },
    tagline: 'For serious goal-getters',
    color: '#059669',
    features: [
      'Everything in Free',
      'AI meal scanning (photo)',
      'A.M.I. macro recommendations',
      'Unlimited history & reports',
      'Meal planning & recipes',
      'Micronutrient tracking',
      'Water & supplement logging',
      'Community challenges',
      'Weekly insights report',
    ],
    cta: 'Join waitlist — Pro early access',
    ctaStyle: 'filled',
    popular: true,
  },
  {
    name: 'Team',
    price: { monthly: 24.99, annual: 19.99 },
    tagline: 'Accountability for groups',
    color: '#8B5CF6',
    features: [
      'Everything in Pro',
      'Up to 5 accounts',
      'Shared group challenges',
      'Group dashboard',
      'Admin controls',
      'Family meal planning',
      'Priority support',
    ],
    cta: 'Start team trial',
    ctaStyle: 'outline-purple',
    popular: false,
  },
] as const

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7" fill={color + '18'} />
      <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface Props {
  onSignUp: () => void
}

export function PlansSection({ onSignUp }: Props) {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="plans" className="relative bg-surface" style={{ zIndex: 2 }}>
      {/* Wave top */}
      <div className="w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 64" fill="none" className="w-full">
          <path d="M0 0 C360 64 1080 64 1440 0 L1440 64 L0 64 Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-14 pb-24">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3.5 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
            <span className="text-[13px] text-primary font-medium">Pricing</span>
          </div>
          <h2
            className="text-[36px] sm:text-[48px] font-semibold text-fore leading-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Simple, honest pricing
          </h2>
          <p className="text-[17px] text-slate-500 mb-8">No upsells. Cancel any time. Free plan is free forever.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full px-2 py-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-[14px] font-medium transition-all duration-200 cursor-pointer ${!annual ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:text-fore'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-[14px] font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${annual ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:text-fore'}`}
            >
              Annual
              <span
                className="text-[11px] font-semibold px-1.5 py-0.5 rounded-full"
                style={{ background: annual ? 'rgba(255,255,255,0.25)' : '#DCFCE7', color: annual ? 'white' : '#059669' }}
              >
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plan cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className="rounded-2xl border p-7 relative"
              style={{
                background: plan.popular ? plan.color : '#FFFFFF',
                borderColor: plan.popular ? plan.color : '#E2E8F0',
                boxShadow: plan.popular ? `0 8px 40px ${plan.color}30` : undefined,
                transform: plan.popular ? 'scale(1.02)' : undefined,
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-400 text-amber-900 text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wide whitespace-nowrap">
                    Most popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <p
                className="text-[12px] font-bold uppercase tracking-widest mb-3"
                style={{ color: plan.popular ? 'rgba(255,255,255,0.7)' : plan.color }}
              >
                {plan.name}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-1">
                <span
                  className="text-[42px] font-semibold leading-none"
                  style={{ fontFamily: 'var(--font-heading)', color: plan.popular ? 'white' : '#0F172A' }}
                >
                  {plan.price[annual ? 'annual' : 'monthly'] === 0
                    ? 'Free'
                    : `$${plan.price[annual ? 'annual' : 'monthly']}`}
                </span>
                {plan.price.monthly > 0 && (
                  <span className="text-[14px]" style={{ color: plan.popular ? 'rgba(255,255,255,0.6)' : '#94A3B8' }}>
                    /mo
                  </span>
                )}
              </div>

              {annual && plan.price.monthly > 0 && (
                <p className="text-[12px] mb-4" style={{ color: plan.popular ? 'rgba(255,255,255,0.6)' : '#94A3B8' }}>
                  Billed ${(plan.price.annual * 12).toFixed(0)}/year
                </p>
              )}

              <p
                className="text-[14px] mb-7"
                style={{ color: plan.popular ? 'rgba(255,255,255,0.75)' : '#64748B' }}
              >
                {plan.tagline}
              </p>

              {/* CTA */}
              <button
                onClick={onSignUp}
                className={`
                  w-full flex items-center justify-center rounded-xl py-3 text-[15px] font-semibold mb-7 transition-all duration-200 cursor-pointer
                  ${plan.ctaStyle === 'filled'
                    ? 'bg-white text-primary hover:bg-emerald-50'
                    : plan.ctaStyle === 'outline-purple'
                      ? 'bg-transparent border-2 border-violet-300 text-violet-600 hover:bg-violet-50'
                      : 'bg-primary text-white hover:bg-emerald-700'}
                `}
              >
                {plan.cta}
              </button>

              {/* Feature list */}
              <div className="space-y-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <CheckIcon color={plan.popular ? 'rgba(255,255,255,0.9)' : plan.color} />
                    <span
                      className="text-[13px] leading-snug"
                      style={{ color: plan.popular ? 'rgba(255,255,255,0.85)' : '#475569' }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fine print */}
        <p className="text-center text-[13px] text-slate-400 mt-10">
          No credit card required to join the waitlist. Cancel any time, no questions asked.
        </p>
      </div>
    </section>
  )
}
