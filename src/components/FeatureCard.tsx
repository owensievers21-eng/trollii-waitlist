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
        transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] },
      }}
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
