# Animation Overhaul — Framer Motion + 21st.dev Magic

**Date:** 2026-06-07
**Status:** Approved

## Goal

Replace the hand-rolled CSS scroll-reveal system with Framer Motion. Use 21st.dev Magic to generate polished animated components for the two highest-impact sections. Animation style: subtle & clean.

## What Gets Removed

- `src/hooks/useScrollReveal.ts` — deleted entirely
- CSS from `index.css`: `.reveal`, `.reveal.visible`, `.stagger-1` through `.stagger-6`, `.fade-in-up`, `@keyframes fadeInUp`, `@keyframes sectionFadeUp`, `.bar-fill`, `@keyframes barFill`

## New Shared Infrastructure

**`src/lib/variants.ts`** — single source of truth for all animation config:

```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
```

All `whileInView` calls use: `{ amount: 0.1 }`, `once: true`, `viewport={{ margin: "-40px" }}`.

## Per-Section Changes

### HeroSection — Framer Motion
- Wrap badge, h1, subtitle p, and pills row each in `motion.div` with `fadeUp` variant
- Use `staggerContainer` on the outer left column so they sequence naturally
- Hero nutrition card gets a `fadeUp` entrance (separate from the stagger, delayed 0.3s)
- 3D tilt logic stays as-is (inline `onMouseMove` handlers, not animation-related)
- Typewriter effect stays as-is

### FeaturesSection — Framer Motion + 21st.dev Magic
- Section header: `motion.div` with `fadeUp` + `whileInView`
- Feature card grid: `motion.div` stagger container with each card as `motion.div` child
- **21st.dev Magic**: Generate a polished `FeatureCard` component with a smooth hover lift + colored glow that replaces the current CSS `.feature-card` hover. Keep all existing card data (label, icon, title, body, color, bg).

### NutritionSection — Framer Motion
- How-it-works steps: stagger container, each step fades up
- Macro bars: replace CSS `barFill` with Framer Motion `animate={{ width: \`${pct}%\` }}` triggered on scroll entry via `useInView`

### CommunitySection — Framer Motion + 21st.dev Magic
- **21st.dev Magic**: Generate an `AnimatedStat` component — number counts up from 0 when scrolled into view. Replaces the existing `useCountUp` hook (used only in `CommunitySection.tsx` — delete `src/hooks/useCountUp.ts` after migration).
- Testimonial cards: stagger container with `whileInView`
- Stats grid: wrap with stagger container

### PlansSection — Framer Motion
- Plan cards: stagger container with `whileInView`
- Featured/highlighted plan card gets `scale: [0.97, 1]` on entrance for extra emphasis

### WaitlistCTA + Footer — Framer Motion
- Single `motion.div` with `fadeUp` + `whileInView` on each section root

## What Stays Untouched

- Hero 3D card tilt (inline `onMouseMove` JS)
- Typewriter effect (`useTypewriter` hook)
- Navbar scroll blur (CSS `.nav-scrolled` class)
- `cursor-blink`, `pulse-ring`, `grain` CSS
- `.feature-card` CSS hover rule (`translateY(-6px)`) — **delete** after Magic component is in place (Magic component owns hover state)
- All visual design, layout, copy, and color

## Dependencies

```
npm install framer-motion
```

No other new dependencies. 21st.dev Magic MCP is already configured.

## Reduced-Motion

Framer Motion respects `prefers-reduced-motion` automatically when using the `LazyMotion` + `domAnimation` bundle. The existing `@media (prefers-reduced-motion)` block in CSS can be simplified after migration.
