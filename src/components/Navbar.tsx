import { useState, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'

const NAV_LINKS = ['Features', 'Nutrition', 'Community', 'Plans'] as const

interface Props {
  onSignIn: () => void
  user: User | null
  onSignOut: () => void
}

export function Navbar({ onSignIn, user, onSignOut }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        style={{ zIndex: 10, transition: 'background 0.3s ease, box-shadow 0.3s ease' }}
        className={`fixed top-0 left-0 right-0 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5${scrolled ? ' nav-scrolled' : ''}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#059669" opacity="0.15" />
            <path d="M17 6C17 6 14 6 11 9C8 12 7 17 7 17C7 17 10.5 16.5 13 14C15.5 11.5 17 6 17 6Z" fill="#059669" />
            <path d="M7 17C7 17 8 14 10 12" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
            className="text-[21px] sm:text-[26px] text-fore select-none"
          >
            trollii
          </span>
          <span
            style={{ letterSpacing: '-0.02em' }}
            className="text-[22px] sm:text-[27px] text-primary select-none leading-none"
            aria-hidden="true"
          >
            ✳︎
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center text-[15px] text-fore gap-1">
          {NAV_LINKS.map((link, i) => (
            <span key={link} className="flex items-center">
              <a
                href={`#${link.toLowerCase()}`}
                className="px-3 py-1 rounded-md hover:bg-black/5 transition-colors duration-150 cursor-pointer"
              >
                {link}
              </a>
              {i < NAV_LINKS.length - 1 && (
                <span className="opacity-20 select-none text-[11px]">·</span>
              )}
            </span>
          ))}
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-[14px] text-slate-500 max-w-[180px] truncate">{user.email}</span>
              <button
                onClick={onSignOut}
                className="text-[14px] text-slate-400 hover:text-slate-700 transition-colors duration-200 cursor-pointer font-medium"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onSignIn}
                className="text-[16px] text-fore hover:text-primary transition-colors duration-200 cursor-pointer font-medium"
              >
                Sign in
              </button>
              <a
                href="#plans"
                className="inline-flex items-center gap-2 bg-primary text-white text-[15px] font-medium px-5 py-2 rounded-full hover:bg-emerald-700 transition-colors duration-200 cursor-pointer"
              >
                Get early access
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 cursor-pointer"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="ham-bar" style={open ? { transform: 'translateY(7px) rotate(45deg)' } : undefined} />
          <span className="ham-bar" style={open ? { opacity: 0 } : undefined} />
          <span className="ham-bar" style={open ? { transform: 'translateY(-7px) rotate(-45deg)' } : undefined} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        style={{ zIndex: 9 }}
        className={`
          fixed inset-0 bg-white/95 backdrop-blur-sm
          flex flex-col justify-center px-8 gap-8
          transition-opacity duration-300 md:hidden
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        aria-hidden={!open}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={() => setOpen(false)}
            className="text-[32px] font-medium text-fore hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            {link}
          </a>
        ))}
        {user ? (
          <button
            onClick={() => { setOpen(false); onSignOut() }}
            className="text-[28px] font-medium text-slate-400 text-left cursor-pointer hover:text-primary transition-colors"
          >
            Sign out
          </button>
        ) : (
          <>
            <button
              onClick={() => { setOpen(false); onSignIn() }}
              className="text-[28px] font-medium text-slate-400 text-left cursor-pointer hover:text-primary transition-colors"
            >
              Sign in
            </button>
            <a
              href="#plans"
              onClick={() => setOpen(false)}
              className="text-[28px] font-medium text-primary underline underline-offset-2 cursor-pointer"
            >
              Get started free
            </a>
          </>
        )}
      </div>
    </>
  )
}
