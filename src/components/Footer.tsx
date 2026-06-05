const LINKS = {
  Product:   ['Features', 'Nutrition', 'Meal Planning', 'AI Scanning', 'Progress Reports'],
  Company:   ['About', 'Blog', 'Careers', 'Press', 'Privacy Policy'],
  Community: ['Challenges', 'Leaderboard', 'Refer a Friend', 'Discord', 'Instagram'],
  Support:   ['Help Centre', 'Contact Us', 'App Status', 'Terms of Use', 'Cookie Settings'],
}

export function Footer() {
  return (
    <footer className="relative" style={{ background: '#0F172A', zIndex: 2 }}>
      <div className="w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 56" fill="none" className="w-full">
          <path d="M0 56 C360 0 1080 0 1440 56 L1440 0 L0 0 Z" fill="#ECFDF5" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-14 pt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M17 6C17 6 14 6 11 9C8 12 7 17 7 17C7 17 10.5 16.5 13 14C15.5 11.5 17 6 17 6Z" fill="#10B981" />
                <path d="M7 17C7 17 8 14 10 12" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-[20px] text-white" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>trollii</span>
            </div>
            <p className="text-[14px] text-slate-400 leading-relaxed mb-6">Smart nutrition for real people. Track macros in seconds, not minutes.</p>
            <div className="flex gap-3">
              <a href="#waitlist" className="flex items-center gap-1.5 bg-white/8 hover:bg-white/12 transition-colors rounded-lg px-3 py-2 cursor-pointer border border-white/10" aria-label="Download on App Store">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.2 1.3-2.18 3.87.03 3.06 2.69 4.08 2.72 4.09l-.09.26zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <p className="text-[9px] text-white/50 leading-none">Coming to</p>
                  <p className="text-[12px] text-white font-semibold leading-tight">App Store</p>
                </div>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-4">{heading}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[14px] text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-slate-500">© 2026 Trollii. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[12px] text-slate-500">A.M.I. in training · Launching Q3 2026</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
