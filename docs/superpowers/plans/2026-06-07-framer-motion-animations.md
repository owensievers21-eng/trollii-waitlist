# Framer Motion Animation Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace trollii-landing's hand-rolled CSS scroll-reveal system with Framer Motion and use 21st.dev Magic to generate polished animated components for FeaturesSection (FeatureCard) and CommunitySection (StatCard).

**Architecture:** A single `src/lib/variants.ts` exports shared config (`fadeUp`, `staggerContainer`). Every section uses `motion.div` + `whileInView` for scroll entrance. Magic-generated components replace their existing counterparts. Old `useScrollReveal`, `useCountUp`, and all related CSS are deleted at the end after all components are migrated.

**Tech Stack:** React 18, framer-motion (latest), TypeScript, Tailwind CSS, 21st.dev Magic MCP

---

### Task 1: Install framer-motion, create variants, wrap app with MotionConfig

**Files:**
- Modify: `package.json` (via npm)
- Create: `src/lib/variants.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: Install framer-motion**

```bash
cd C:\Users\Sieve\trollii-landing && npm install framer-motion
```

Expected: `framer-motion` appears in `dependencies` in `package.json`.

- [ ] **Step 2: Create `src/lib/variants.ts`**

```ts
import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}
```

- [ ] **Step 3: Wrap App with `MotionConfig` for reduced-motion support**

In `src/App.tsx`, add this import:
```tsx
import { MotionConfig } from 'framer-motion'
```

Wrap the return's root `<div>` with `MotionConfig`:
```tsx
return (
  <MotionConfig reducedMotion="user">
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
  </MotionConfig>
)
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd C:\Users\Sieve\trollii-landing && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/variants.ts src/App.tsx package.json package-lock.json
git commit -m "feat(anim): install framer-motion, add shared variants, wrap app with MotionConfig"
```

---

### Task 2: Animate HeroSection

**Files:**
- Modify: `src/components/HeroSection.tsx`

- [ ] **Step 1: Update imports, remove manual animation state**

At the top of `HeroSection.tsx`, replace:
```tsx
import { useState, useEffect, useRef } from 'react'
```
with:
```tsx
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../lib/variants'
```

Delete these two blocks inside `HeroSection`:
```tsx
const [pillsVisible, setPillsVisible] = useState(false)

useEffect(() => {
  const t = setTimeout(() => setPillsVisible(true), 400)
  return () => clearTimeout(t)
}, [])
```

- [ ] **Step 2: Replace left column with animated stagger container**

Find the entire left column `<div ref={textRef} ...>` block and replace it with:

```tsx
<motion.div
  ref={textRef}
  className="max-w-xl relative z-10 flex-shrink-0"
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  {/* AMI badge */}
  <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1.5 mb-4 sm:mb-5">
    <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
    <span className="text-[13px] sm:text-[14px] text-primary font-medium">
      Powered by A.M.I. · Adaptive Macro Intelligence
    </span>
  </motion.div>

  {/* H1 headline */}
  <motion.h1
    variants={fadeUp}
    className="text-fore leading-[1.1] mb-4"
    style={{
      fontFamily: 'var(--font-heading)',
      fontSize: 'clamp(36px, 5.5vw, 64px)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    }}
  >
    Track every macro.<br />
    <span style={{ color: 'var(--color-primary)' }}>Hit every goal.</span>
  </motion.h1>

  {/* Typewriter subtitle */}
  <motion.p
    variants={fadeUp}
    className="text-slate-500 mb-5 sm:mb-6"
    style={{ fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.6, fontWeight: 400, minHeight: '48px', maxWidth: '460px' }}
  >
    {displayed}
    {!done && (
      <span
        className="cursor-blink inline-block bg-slate-400 align-middle"
        style={{ width: '2px', height: '1em', marginLeft: '2px', verticalAlign: 'middle' }}
        aria-hidden="true"
      />
    )}
  </motion.p>

  {/* Pills */}
  <motion.div variants={fadeUp} className="flex flex-wrap gap-y-1">
    {WHITE_PILLS.map((label) => (
      <button
        key={label}
        className="inline-flex items-center justify-center bg-white/90 backdrop-blur-sm text-fore border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
      >
        {label}
      </button>
    ))}
    <button
      onClick={copyEmail}
      className="inline-flex items-center justify-center gap-2 sm:gap-3 text-white bg-primary border border-primary rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-white hover:text-primary transition-colors duration-200"
      aria-label="Copy email hello@trollii.app"
    >
      {emailCopied ? <span>✓ Copied!</span> : (
        <>
          <span>Reach us: <span className="underline underline-offset-1">hello@trollii.app</span></span>
          <CopyIcon />
        </>
      )}
    </button>
  </motion.div>
</motion.div>
```

- [ ] **Step 3: Wrap NutritionCard entrance**

Find `{/* Right: nutrition card */}` and replace the `<NutritionCard ... />` line with:

```tsx
{/* Right: nutrition card */}
<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
>
  <NutritionCard cardRef={cardRef} onSignIn={onSignIn} />
</motion.div>
```

- [ ] **Step 4: Verify visually**

```bash
cd C:\Users\Sieve\trollii-landing && npm run dev
```

Open http://localhost:5173. Badge → h1 → subtitle → pills animate in sequence on load. Nutrition card fades up with slight delay. 3D tilt still works on hover. No console errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat(anim): animate HeroSection with Framer Motion stagger sequence"
```

---

### Task 3: Generate FeatureCard with 21st.dev Magic

**Files:**
- Create: `src/components/FeatureCard.tsx`

- [ ] **Step 1: Use ToolSearch to find Magic MCP tools**

```
ToolSearch query: "magic component"
```

Then invoke the Magic MCP tool with this prompt:

> "Create a React TypeScript component called FeatureCard for a nutrition app landing page. File: src/components/FeatureCard.tsx. Props: `{ icon: React.ReactNode; label: string; title: string; body: string; color: string; bg: string }`. The root element must be a `motion.div` that accepts Framer Motion variants inheritance (no explicit initial/animate — parent stagger container drives entrance). On hover: `y: -6`, `background: bg prop`, `boxShadow: 0 12px 40px {color}20`, `borderColor: transparent`, transition `duration 0.25s ease [0.34,1.56,0.64,1]`. Default background #FAFAFA, border border-slate-100, rounded-2xl, padding p-7. Inside: 48x48 rounded-xl icon container with background=bg and border `1px solid {color}22`, then label in 11px uppercase tracking-widest, then title in 20px font-semibold font-family var(--font-heading), then body in 14px text-slate-500."

- [ ] **Step 2: If Magic output is unusable, use this implementation instead**

Create `src/components/FeatureCard.tsx`:

```tsx
import { motion } from 'framer-motion'

interface Props {
  icon: React.ReactNode
  label: string
  title: string
  body: string
  color: string
  bg: string
}

export function FeatureCard({ icon, label, title, body, color, bg }: Props) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
      className="rounded-2xl border border-slate-100 p-7 cursor-default"
      style={{ background: '#FAFAFA' }}
      whileHover={{
        y: -6,
        background: bg,
        boxShadow: `0 12px 40px ${color}20`,
        borderColor: 'transparent',
      }}
      transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ background: bg, border: `1px solid ${color}22` }}
      >
        {icon}
      </div>
      <p className="text-[11px] font-semibold tracking-widest uppercase mb-2" style={{ color }}>
        {label}
      </p>
      <h3
        className="text-[20px] font-semibold text-fore mb-3 leading-snug"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h3>
      <p className="text-[14px] text-slate-500 leading-relaxed">{body}</p>
    </motion.div>
  )
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

---

### Task 4: Animate FeaturesSection

**Files:**
- Modify: `src/components/FeaturesSection.tsx`

- [ ] **Step 1: Update imports**

Replace:
```tsx
import { useScrollReveal } from '../hooks/useScrollReveal'
```
with:
```tsx
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../lib/variants'
import { FeatureCard } from './FeatureCard'
```

- [ ] **Step 2: Remove `useScrollReveal` calls**

Delete:
```tsx
const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>()
```

- [ ] **Step 3: Animate section header**

Find:
```tsx
<div ref={headerRef} className={`mb-16 reveal${headerVisible ? ' visible' : ''}`}>
```
Replace with:
```tsx
<motion.div
  className="mb-16"
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-40px' }}
>
```
Change its closing `</div>` to `</motion.div>`.

- [ ] **Step 4: Replace feature grid with stagger + FeatureCard**

Find the entire grid `<div ref={gridRef} ...>` block (from `<div ref={gridRef}` through the closing `</div>` of the grid). Replace it with:

```tsx
<motion.div
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-40px' }}
>
  {FEATURES.map((f) => (
    <FeatureCard key={f.label} {...f} />
  ))}
</motion.div>
```

- [ ] **Step 5: Verify visually**

```bash
npm run dev
```

Scroll to Features. Header fades up, cards stagger in. Hover produces lift + glow. No `reveal`/`stagger-*` classes remain on feature elements.

- [ ] **Step 6: Commit**

```bash
git add src/components/FeaturesSection.tsx src/components/FeatureCard.tsx
git commit -m "feat(anim): animate FeaturesSection with stagger + Magic FeatureCard"
```

---

### Task 5: Animate NutritionSection

**Files:**
- Modify: `src/components/NutritionSection.tsx`

- [ ] **Step 1: Update imports**

Replace:
```tsx
import { useScrollReveal } from '../hooks/useScrollReveal'
```
with:
```tsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, staggerContainer } from '../lib/variants'
```

- [ ] **Step 2: Add `MacroBar` sub-component**

Insert this function directly before `export function NutritionSection()`:

```tsx
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
```

- [ ] **Step 3: Remove `useScrollReveal` calls and `ref` from section**

Inside `NutritionSection`, delete:
```tsx
const [sectionRef, sectionVisible] = useScrollReveal<HTMLElement>()
const [stepsRef, stepsVisible] = useScrollReveal<HTMLDivElement>()
```

Change `<section ref={sectionRef} id="nutrition" ...>` to `<section id="nutrition" ...>`.

- [ ] **Step 4: Animate section header**

Find:
```tsx
<div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 reveal${sectionVisible ? ' visible' : ''}`}>
```
Replace with:
```tsx
<motion.div
  className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-40px' }}
>
```
Change its closing `</div>` to `</motion.div>`.

- [ ] **Step 5: Replace macro bar inline divs with `MacroBar`**

Inside the `MACRO_BREAKDOWN.map` block, find:
```tsx
<div className="h-2 rounded-full overflow-hidden" style={{ background: m.track }}>
  <div
    className="h-full rounded-full"
    style={{
      width: sectionVisible ? `${m.pct * 1.7}%` : '0%',
      background: m.color,
      transition: sectionVisible ? 'width 1s cubic-bezier(0.22,1,0.36,1)' : 'none',
      transitionDelay: sectionVisible ? '0.3s' : '0s',
    }}
  />
</div>
```
Replace with:
```tsx
<MacroBar pct={m.pct} color={m.color} track={m.track} />
```

- [ ] **Step 6: Animate how-it-works steps**

Find:
```tsx
<div ref={stepsRef} className="space-y-8">
  {HOW_IT_WORKS.map((s, i) => (
    <div key={s.step} className={`flex gap-5 reveal stagger-${i + 1}${stepsVisible ? ' visible' : ''}`}>
```
Replace with:
```tsx
<motion.div
  className="space-y-8"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-40px' }}
>
  {HOW_IT_WORKS.map((s) => (
    <motion.div key={s.step} variants={fadeUp} className="flex gap-5">
```

The closing tags change from `</div>` to `</motion.div>` for both the step and the container. The CTA `<div className="pt-2">` and the `<a>` link remain inside the stagger container unchanged.

- [ ] **Step 7: Verify visually**

```bash
npm run dev
```

Scroll to Nutrition section. Header fades up, macro bars animate from 0, steps stagger in from below.

- [ ] **Step 8: Commit**

```bash
git add src/components/NutritionSection.tsx
git commit -m "feat(anim): animate NutritionSection with Framer Motion, animated macro bars"
```

---

### Task 6: Animate CommunitySection

**Files:**
- Modify: `src/components/CommunitySection.tsx`

- [ ] **Step 1: Update imports**

Replace:
```tsx
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCountUp } from '../hooks/useCountUp'
```
with:
```tsx
import { motion, useInView, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { fadeUp, staggerContainer } from '../lib/variants'
```

- [ ] **Step 2: Rewrite `StatCard` using Framer Motion**

Replace the entire existing `StatCard` function with:

```tsx
function StatCard({ countTo, suffix, label, color, decimal }: {
  countTo: number; suffix: string; label: string; color: string; decimal?: boolean
}) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, countTo, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) =>
        setValue(decimal ? parseFloat((v / 10).toFixed(1)) : Math.round(v)),
    })
    return controls.stop
  }, [inView, countTo, decimal])

  const formatted = decimal
    ? value.toFixed(1)
    : countTo >= 1000
      ? value.toLocaleString()
      : value.toString()

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="rounded-2xl border border-slate-100 p-6 text-center"
      style={{ background: '#FAFAFA' }}
    >
      <p
        className="text-[32px] sm:text-[38px] font-semibold leading-none mb-2"
        style={{ color, fontFamily: 'var(--font-heading)' }}
      >
        {formatted}{suffix}
      </p>
      <p className="text-[13px] text-slate-500">{label}</p>
    </motion.div>
  )
}
```

Note: `active` prop is removed — `StatCard` now detects its own in-view state.

- [ ] **Step 3: Remove `useScrollReveal` calls**

Delete:
```tsx
const [statsRef, statsVisible] = useScrollReveal<HTMLDivElement>()
const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
const [testimonialsRef, testimonialsVisible] = useScrollReveal<HTMLDivElement>()
```

- [ ] **Step 4: Animate header**

Find:
```tsx
<div ref={headerRef} className={`mb-14 reveal${headerVisible ? ' visible' : ''}`}>
```
Replace with:
```tsx
<motion.div
  className="mb-14"
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-40px' }}
>
```
Change its closing `</div>` to `</motion.div>`.

- [ ] **Step 5: Animate stats grid**

Find:
```tsx
<div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
  {STATS.map((s) => (
    <StatCard key={s.label} {...s} active={statsVisible} />
  ))}
</div>
```
Replace with:
```tsx
<motion.div
  className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-40px' }}
>
  {STATS.map((s) => (
    <StatCard
      key={s.label}
      countTo={s.countTo}
      suffix={s.suffix}
      label={s.label}
      color={s.color}
      decimal={s.decimal}
    />
  ))}
</motion.div>
```

- [ ] **Step 6: Animate testimonials**

Find:
```tsx
<div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
  {TESTIMONIALS.map((t, i) => (
    <div
      key={t.name}
      className={`rounded-2xl border border-slate-100 p-7 reveal stagger-${i + 1}${testimonialsVisible ? ' visible' : ''}`}
      style={{ background: '#FAFAFA' }}
    >
```
Replace with:
```tsx
<motion.div
  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-40px' }}
>
  {TESTIMONIALS.map((t) => (
    <motion.div
      key={t.name}
      variants={fadeUp}
      className="rounded-2xl border border-slate-100 p-7"
      style={{ background: '#FAFAFA' }}
    >
```

- [ ] **Step 7: Verify visually**

```bash
npm run dev
```

Scroll to Community. Header fades up, stat numbers count up from 0 on entry, testimonials stagger in. No TypeScript errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/CommunitySection.tsx
git commit -m "feat(anim): animate CommunitySection with counting stats and staggered testimonials"
```

---

### Task 7: Animate PlansSection

**Files:**
- Modify: `src/components/PlansSection.tsx`

- [ ] **Step 1: Update imports**

Replace:
```tsx
import { useScrollReveal } from '../hooks/useScrollReveal'
```
with:
```tsx
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../lib/variants'
```

- [ ] **Step 2: Remove `useScrollReveal` calls**

Delete:
```tsx
const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
const [cardsRef, cardsVisible] = useScrollReveal<HTMLDivElement>()
```

- [ ] **Step 3: Animate header**

Find:
```tsx
<div ref={headerRef} className={`text-center mb-12 reveal${headerVisible ? ' visible' : ''}`}>
```
Replace with:
```tsx
<motion.div
  className="text-center mb-12"
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-40px' }}
>
```
Change its closing `</div>` to `</motion.div>`.

- [ ] **Step 4: Animate plan cards with stagger**

Find:
```tsx
<div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
  {PLANS.map((plan, i) => (
    <div
      key={plan.name}
      className={`rounded-2xl border p-7 relative reveal stagger-${i + 1}${cardsVisible ? ' visible' : ''}`}
      style={{
        background: plan.popular ? plan.color : '#FFFFFF',
        borderColor: plan.popular ? plan.color : '#E2E8F0',
        boxShadow: plan.popular ? `0 8px 40px ${plan.color}30` : undefined,
        transform: plan.popular ? 'scale(1.02)' : undefined,
      }}
    >
```
Replace with:
```tsx
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
```

- [ ] **Step 5: Verify visually**

```bash
npm run dev
```

Scroll to Plans. Header fades up, three cards stagger in. Popular Pro card still has elevated shadow + scale.

- [ ] **Step 6: Commit**

```bash
git add src/components/PlansSection.tsx
git commit -m "feat(anim): animate PlansSection with Framer Motion stagger"
```

---

### Task 8: Animate WaitlistCTA

**Files:**
- Modify: `src/components/WaitlistCTA.tsx`

- [ ] **Step 1: Update imports**

Replace:
```tsx
import { useScrollReveal } from '../hooks/useScrollReveal'
```
with:
```tsx
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/variants'
```

- [ ] **Step 2: Remove `useScrollReveal` call and section ref**

Delete:
```tsx
const [ref, visible] = useScrollReveal<HTMLElement>()
```

Change `<section ref={ref} className="relative bg-white" ...>` to `<section className="relative bg-white" ...>`.

- [ ] **Step 3: Replace reveal div with motion entrance**

Find:
```tsx
<div className={`reveal${visible ? ' visible' : ''}`}>
```
Replace with:
```tsx
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-40px' }}
>
```
Change its closing `</div>` to `</motion.div>`.

- [ ] **Step 4: Verify visually**

```bash
npm run dev
```

Scroll to CTA section. Content fades up on entry. Email submission still works end-to-end.

- [ ] **Step 5: Commit**

```bash
git add src/components/WaitlistCTA.tsx
git commit -m "feat(anim): animate WaitlistCTA with Framer Motion"
```

---

### Task 9: Remove old animation infrastructure

**Files:**
- Delete: `src/hooks/useScrollReveal.ts`
- Delete: `src/hooks/useCountUp.ts`
- Modify: `src/index.css`

- [ ] **Step 1: Confirm no remaining imports of deleted hooks**

```bash
cd C:\Users\Sieve\trollii-landing && grep -r "useScrollReveal\|useCountUp" src/
```

Expected: no output. If any files still import these hooks, fix them before proceeding.

- [ ] **Step 2: Delete old hooks**

```bash
git rm src/hooks/useScrollReveal.ts src/hooks/useCountUp.ts
```

- [ ] **Step 3: Remove old CSS blocks from `src/index.css`**

Delete each of these blocks verbatim from `src/index.css`:

**Block A — fadeInUp:**
```css
/* Pill button fade-in-up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.5s ease forwards;
}
```

**Block B — scroll section entrance:**
```css
/* ── Scroll section entrance ── */
@keyframes sectionFadeUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Base reveal state: hidden until JS fires */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
              transform 0.65s cubic-bezier(0.22,1,0.36,1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delays for child cards */
.stagger-1 { transition-delay: 0.05s; }
.stagger-2 { transition-delay: 0.12s; }
.stagger-3 { transition-delay: 0.19s; }
.stagger-4 { transition-delay: 0.26s; }
.stagger-5 { transition-delay: 0.33s; }
.stagger-6 { transition-delay: 0.40s; }
```

**Block C — barFill:**
```css
/* Progress bar fill animation */
@keyframes barFill {
  from { width: 0%; }
}
.bar-fill {
  animation: barFill 1s cubic-bezier(0.22,1,0.36,1) both;
}
```

**Block D — feature-card hover (inside `.feature-card` rule):**
```css
.feature-card:hover {
  transform: translateY(-6px) scale(1.01);
}
```

- [ ] **Step 4: Simplify `@media (prefers-reduced-motion)` block**

Find the full `@media (prefers-reduced-motion: reduce)` block at the bottom of `index.css` and replace it with:

```css
@media (prefers-reduced-motion: reduce) {
  .cursor-blink {
    animation: none;
    opacity: 1;
  }
}
```

- [ ] **Step 5: Verify build**

```bash
cd C:\Users\Sieve\trollii-landing && npx tsc --noEmit && npm run build
```

Expected: TypeScript passes, Vite build succeeds with no errors.

- [ ] **Step 6: Final visual walkthrough**

```bash
npm run dev
```

Walk every section top-to-bottom. Verify:
- Hero text stagger plays on load
- All sections animate on scroll (Features, Nutrition, Community, Plans, CTA)
- Macro bars grow from 0 on scroll entry
- Stat counters count up from 0 on scroll entry
- Feature card hover: lift + glow (no `.feature-card` CSS hover conflict)
- No flash of invisible content on any section
- No console errors or TypeScript complaints

- [ ] **Step 7: Commit**

```bash
git add src/index.css
git commit -m "chore(anim): remove old CSS scroll-reveal system and unused animation hooks"
```
