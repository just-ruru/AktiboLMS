/* ============================================================================
   STUDY NOTES — pages/landing/LandingPage.tsx  (public landing page)
   ----------------------------------------------------------------------------
   WHAT: Public landing page ("/" route). Full-bleed — no navbar, no Layout
         wrapper. Renders outside <Layout /> in App.tsx so it can be
         edge-to-edge.
   SURFACE (per claude-design): Decide/Learn — hero is correct here.
         One idea per section. No feature-tile grid of equal-weight cards.
   HOW IT WORKS:
     1. Hero: bold statement + two CTAs (Start learning / Build a course).
     2. How it works: 3 staggered steps (Read → Practice → Progress).
     3. Audience cards: student vs instructor value props.
     4. CTA section: final conversion.
     5. Theme toggle persists to localStorage (dark default).
     6. Scroll reveal via Intersection Observer (disabled under
        prefers-reduced-motion).
   WHERE THE API CONTRACT LIVES: none here — purely presentational.
         Links point to /login and /register (existing auth routes).
   WHAT TO CHANGE FOR THE NEW UI:
     • Replace the inline code-card preview with a real lesson screenshot
       or an embedded Monaco editor preview when available.
     • Swap the CTA links to real onboarding flows once auth is wired.
     • The color tokens here use inline styles matching the prototype;
       migrate them to CSS custom properties (design tokens) when you
       consolidate the theme system.
     • Add real copy — no fake metrics, testimonials, or decorative stats
       (anti-slop rule: every element must earn its place).
   QA LINK: qa-report.json — none specific to this file (new file).
   ============================================================================ */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, Rocket, Sun, Moon, Menu, X, ChevronRight, Check, BarChart2, Zap, Code2 } from 'lucide-react'
import { Button } from '../../components/ui/Button'

/* --------------------------------------------------------------------------
   Inline token scale matching the verified landing.html prototype.
   Migrate to CSS custom properties / design tokens when consolidating.
   -------------------------------------------------------------------------- */
const TOKENS = {
  brand: { 600: '#0d9488', 500: '#14b8a6', 700: '#0f766e' },
  accent: { 600: '#d97706', 500: '#f59e0b' },
  bgPage: '#0b0f14',
  bgSurface: '#131a24',
  bgSurfaceHover: '#1c2530',
  fgPrimary: '#f1f5f9',
  fgSecondary: '#cbd5e1',
  fgTertiary: '#94a3b8',
  border: '#1e293b',
  shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
  shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.4)',
  radiusXl: '1.5rem',
  radiusLg: '1rem',
  transitionSlow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
  sans: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
} as const

const cn = (...classes: (string | undefined | null)[]) =>
  classes.filter(Boolean).join(' ')

export function LandingPage() {
  const [isDark, setIsDark] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  /* --- Theme persistence (dark default) --- */
  useEffect(() => {
    const saved = localStorage.getItem('aktibolms-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = saved === null ? prefersDark : saved === 'dark'
    setIsDark(dark)
    document.documentElement.classList.toggle('theme-light', !dark)
  }, [])

  /* --- CSS Custom Properties for design tokens --- */
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--brand-50', '#f0fdfa')
    root.style.setProperty('--brand-500', TOKENS.brand[500])
    root.style.setProperty('--brand-600', TOKENS.brand[600])
    root.style.setProperty('--brand-700', TOKENS.brand[700])
    root.style.setProperty('--accent-500', TOKENS.accent[500])
    root.style.setProperty('--accent-600', TOKENS.accent[600])
    root.style.setProperty('--success-500', '#22c55e')
    root.style.setProperty('--error-500', '#ef4444')
    root.style.setProperty('--bg-page', TOKENS.bgPage)
    root.style.setProperty('--bg-surface', TOKENS.bgSurface)
    root.style.setProperty('--bg-surface-hover', TOKENS.bgSurfaceHover)
    root.style.setProperty('--bg-navbar', 'rgba(19, 26, 36, 0.8)')
    root.style.setProperty('--bg-inverse', '#ffffff')
    root.style.setProperty('--fg-primary', TOKENS.fgPrimary)
    root.style.setProperty('--fg-secondary', TOKENS.fgSecondary)
    root.style.setProperty('--fg-tertiary', TOKENS.fgTertiary)
    root.style.setProperty('--fg-muted', '#64748b')
    root.style.setProperty('--fg-inverse', '#0f172a')
    root.style.setProperty('--border', TOKENS.border)
    root.style.setProperty('--border-focus', TOKENS.brand[600])
    root.style.setProperty('--shadow-sm', '0 1px 2px 0 rgb(0 0 0 / 0.4)')
    root.style.setProperty('--shadow-md', '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.4)')
    root.style.setProperty('--shadow-lg', TOKENS.shadowLg)
    root.style.setProperty('--radius-md', '0.75rem')
    root.style.setProperty('--radius-lg', TOKENS.radiusLg)
    root.style.setProperty('--radius-xl', TOKENS.radiusXl)
    root.style.setProperty('--transition-fast', '120ms ease-out')
    root.style.setProperty('--transition-base', '200ms ease-out')
    root.style.setProperty('--transition-slow', TOKENS.transitionSlow)
    root.style.setProperty('--font-sans', TOKENS.sans)
    root.style.setProperty('--font-mono', TOKENS.mono)

    // Light theme overrides
    if (!isDark) {
      root.style.setProperty('--bg-page', '#fafafa')
      root.style.setProperty('--bg-surface', '#ffffff')
      root.style.setProperty('--bg-surface-hover', '#f3f4f6')
      root.style.setProperty('--bg-inverse', '#0f172a')
      root.style.setProperty('--fg-primary', '#0f172a')
      root.style.setProperty('--fg-secondary', '#334155')
      root.style.setProperty('--fg-tertiary', '#64748b')
      root.style.setProperty('--fg-muted', '#94a3b8')
      root.style.setProperty('--fg-inverse', '#f1f5f9')
      root.style.setProperty('--border', '#e2e8f0')
      root.style.setProperty('--border-focus', '#0d9488')
      root.style.setProperty('--shadow-sm', '0 1px 2px 0 rgb(0 0 0 / 0.05)')
      root.style.setProperty('--shadow-md', '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05)')
      root.style.setProperty('--shadow-lg', '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)')
      root.style.setProperty('--bg-navbar', 'rgba(255, 255, 255, 0.8)')
    }
  }, [isDark])

  const handleThemeToggle = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('aktibolms-theme', next ? 'light' : 'dark')
    document.documentElement.classList.toggle('theme-light', !next)
  }

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handlePrimaryCTAClick = (e: React.MouseEvent, href: string) => {
    if (href === '#') {
      e.preventDefault()
      showToast('This is a prototype — links will wire to the React app routes.')
    }
  }

  /* --- Scroll reveal (Intersection Observer) --- */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach((el) => {
        ;(el as HTMLElement).style.opacity = '1'
        ;(el as HTMLElement).style.transform = 'none'
      })
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target as Element)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="min-h-screen antialiased"
      style={{
        fontFamily: 'var(--font-sans)',
        backgroundColor: 'var(--bg-page)',
        color: 'var(--fg-primary)',
        transition: 'background-color 200ms ease-out, color 200ms ease-out',
      }}
    >
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 800px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr;
          }
        }
        .hero-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: flex-start;
        }
        @media (min-width: 640px) {
          .hero-actions {
            flex-direction: row;
            align-items: center;
          }
        }
        .cta-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 640px) {
          .cta-actions {
            flex-direction: row;
            justify-content: center;
          }
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (min-width: 960px) {
          .hero-inner {
            grid-template-columns: 1.15fr 0.85fr;
            gap: 5rem;
          }
        }
        .steps {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 800px) {
          .steps {
            grid-template-columns: repeat(3, 1fr);
            gap: 2.5rem;
          }
        }
        .audience {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 800px) {
          .audience {
            grid-template-columns: repeat(2, 1fr);
            gap: 3rem;
          }
        }
        .nav-links {
          display: none;
          align-items: center;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .nav-links {
            display: flex;
          }
        }
        .mobile-menu-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          background: transparent;
          color: var(--fg-secondary);
          cursor: pointer;
        }
        @media (min-width: 768px) {
          .mobile-menu-btn { display: none; }
        }
        .code-card {
          width: 100%;
          max-width: 420px;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
          background: var(--bg-surface);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          transform: perspective(1000px) rotateX(4deg) rotateY(-2deg);
          transform-origin: center bottom;
          transition: transform var(--transition-slow), box-shadow var(--transition-base);
        }
        .code-card:hover {
          transform: perspective(1000px) rotateX(0) rotateY(0);
          box-shadow: 0 20px 40px -10px rgb(0 0 0 / 0.5);
        }
        .theme-light .code-card:hover {
          box-shadow: 0 20px 40px -10px rgb(0 0 0 / 0.15);
        }
        .step {
          position: relative;
          padding: 2.5rem 2rem;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
          background: var(--bg-surface);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: border-color var(--transition-base), transform var(--transition-base);
        }
        .step:hover {
          border-color: var(--brand-600);
          transform: translateY(-3px);
        }
        .step-number {
          font-family: var(--font-mono);
          font-size: 3rem;
          font-weight: 700;
          color: var(--fg-muted);
          line-height: 1;
        }
        .step:hover .step-number {
          color: var(--brand-500);
        }
        .audience-card {
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
          background: var(--bg-surface);
          padding: 2.5rem;
          box-shadow: var(--shadow-sm);
          transition: box-shadow var(--transition-base), transform var(--transition-base);
        }
        .audience-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-3px);
        }
        .reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 700ms ease-out, transform 700ms ease-out;
        }
        .reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 80ms; }
        .reveal-delay-2 { transition-delay: 160ms; }
        .reveal-delay-3 { transition-delay: 240ms; }
        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
        .btn-ghost-white {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .btn-ghost-white:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .skip-link:focus {
          position: fixed;
          top: 1rem;
          left: 1rem;
          width: auto;
          height: auto;
          padding: 0.5rem 1rem;
          background: var(--bg-inverse);
          color: var(--fg-inverse);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-weight: 600;
          text-decoration: none;
          z-index: 9999;
        }
        :focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.4);
        }
        ::selection {
          background-color: var(--brand-500);
          color: #ffffff;
        }
        @media (max-width: 640px) {
          .hero { padding: 4.5rem 1.25rem 6rem; }
          .section { padding: 4.5rem 1.25rem; }
          .code-card { max-width: 100%; }
        }
        /* Base font rendering - matches prototype */
        * {
          box-sizing: border-box;
        }
        html {
          font-size: 16px;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        body {
          margin: 0;
        }
      `}</style>
      {/* Skip link (accessibility) */}
      <a
        href="#main"
        className="skip-link"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          zIndex: 9999,
        }}
      >
        Skip to main content
      </a>

      {/* Navbar */}
      <nav
        aria-label="Main navigation"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          borderBottom: `1px solid var(--border)`,
          background: 'var(--bg-navbar)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          transition: 'background-color 200ms ease-out',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 1.5rem',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              textDecoration: 'none',
              color: 'var(--fg-primary)',
              fontWeight: 700,
              fontSize: '1.25rem',
              letterSpacing: '-0.02em',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 0.5,
                background: `linear-gradient(135deg, var(--brand-600), var(--brand-500))`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.4)',
              }}
            >
              <BookOpen size="18" strokeWidth={2.5} fill="none" stroke="currentColor" />
            </div>
            <span>Aktibo<span style={{ color: 'var(--brand-500)' }}>LMS</span></span>
          </Link>

          <div
            className="nav-links"
            style={{
              display: mobileMenuOpen ? 'flex' : 'none',
              alignItems: 'center',
              gap: 1,
              flexDirection: 'column',
              position: 'absolute',
              top: 64,
              left: 0,
              right: 0,
              background: 'var(--bg-surface)',
              padding: '1rem',
              borderBottom: `1px solid var(--border)`,
              zIndex: 99,
            }}
          >
            <Link
              to="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: 'var(--fg-secondary)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                padding: '0.5rem 0',
                borderBottom: '2px solid transparent',
                width: '100%',
                textAlign: 'center',
              }}
              className="md:w-auto md:text-left"
            >
              How it works
            </Link>
            <Link
              to="#for-students"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: 'var(--fg-secondary)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                padding: '0.5rem 0',
                borderBottom: '2px solid transparent',
                width: '100%',
                textAlign: 'center',
              }}
              className="md:w-auto md:text-left"
            >
              For students
            </Link>
            <Link
              to="#for-instructors"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: 'var(--fg-secondary)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                padding: '0.5rem 0',
                borderBottom: '2px solid transparent',
                width: '100%',
                textAlign: 'center',
              }}
              className="md:w-auto md:text-left"
            >
              For instructors
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <button
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
              style={{
                width: 40,
                height: 40,
                border: `1px solid var(--border)`,
                borderRadius: '1rem',
                background: 'var(--bg-surface)',
                color: 'var(--fg-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 120ms ease-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--brand-600)'
                e.currentTarget.style.color = 'var(--fg-primary)'
                e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--fg-secondary)'
                e.currentTarget.style.backgroundColor = 'var(--bg-surface)'
              }}
            >
              {isDark ? (
                <Moon size="18" strokeWidth={2} fill="none" stroke="currentColor" />
              ) : (
                <Sun size="18" strokeWidth={2} fill="none" stroke="currentColor" />
              )}
            </button>
            <Link to="/login">
              <Button variant="primary" size="md">
                Sign in
              </Button>
            </Link>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              style={{
                width: 40,
                height: 40,
                border: `1px solid var(--border)`,
                borderRadius: '0.5rem',
                background: 'transparent',
                color: 'var(--fg-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {mobileMenuOpen ? <X size="20" strokeWidth={2} /> : <Menu size="20" strokeWidth={2} />}
            </button>
          </div>
        </div>
      </nav>

      <main id="main">
        {/* Hero */}
        <section
          style={{
            padding: '6rem 1.5rem 8rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            className="hero-glow"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '50vw',
              height: '50vw',
              background:
                'radial-gradient(circle at 60% 40%, rgba(20, 184, 166, 0.12), transparent 60%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <div
            className="hero-inner"
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: 1200,
              margin: '0 auto',
            }}
          >
            <div
              className={cn('hero-content reveal reveal-delay-1')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              <div
                className="eyebrow"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'var(--brand-500)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Interactive Learning, Made Active
              </div>
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: 'var(--fg-primary)',
                  margin: 0,
                  textWrap: 'balance',
                }}
              >
                Learn by doing. Not by reading walls of text.
              </h1>
              <p
                style={{
                  fontSize: '1.15rem',
                  color: 'var(--fg-secondary)',
                  lineHeight: 1.6,
                  maxWidth: '48ch',
                  margin: 0,
                }}
              >
                Courses that combine rich content with embedded activities —
                write and run code in the lesson, take instant-feedback quizzes,
                and track progress per activity. Built for students who learn by
                doing, and instructors who want to see where students struggle.
              </p>
              <div className="hero-actions">
                <Link to="/register?role=student" onClick={(e) => handlePrimaryCTAClick(e, '/register?role=student')}>
                  <Button variant="primary" size="lg" style={{ width: '100%', maxWidth: '100%' }}>
                    Start learning <ArrowRight className="w-5 h-5" stroke="2.5" />
                  </Button>
                </Link>
                <Link to="/register?role=instructor" onClick={(e) => handlePrimaryCTAClick(e, '/register?role=instructor')}>
                  <Button variant="outline" size="lg" style={{ width: '100%', maxWidth: '100%' }}>
                    Build a course
                  </Button>
                </Link>
              </div>
            </div>
            <div
              className="hero-preview reveal reveal-delay-2"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div
                className="code-card"
                style={{
                  width: '100%',
                  maxWidth: 420,
                  borderRadius: 'var(--radius-xl)',
                  border: `1px solid var(--border)`,
                  background: 'var(--bg-surface)',
                  boxShadow: 'var(--shadow-lg)',
                  overflow: 'hidden',
                  transform: 'perspective(1000px) rotateX(4deg) rotateY(-2deg)',
                  transformOrigin: 'center bottom',
                  transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms ease-out',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform =
                    'perspective(1000px) rotateX(0) rotateY(0)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow =
                    '0 20px 40px -10px rgb(0 0 0 / 0.5)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform =
                    'perspective(1000px) rotateX(4deg) rotateY(-2deg)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)'
                }}
              >
                <div
                  className="code-header"
                  style={{
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-surface-hover)',
                    borderBottom: `1px solid var(--border)`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.6,
                  }}
                >
                  <div
                    className="code-dots"
                    style={{ display: 'flex', gap: 0.5 }}
                  >
                    <div
                      className="code-dot red"
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: '#ef4444',
                      }}
                    />
                    <div
                      className="code-dot yellow"
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: '#f59e0b',
                      }}
                    />
                    <div
                      className="code-dot green"
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: '#22c55e',
                      }}
                    />
                  </div>
                  <span
                    className="code-lang"
                    style={{
                      marginLeft: 'auto',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--fg-tertiary)',
                      fontWeight: 500,
                    }}
                  >
                    javascript · lesson.js
                  </span>
                </div>
                <div
                  className="code-body"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    lineHeight: 1.6,
                    color: 'var(--fg-secondary)',
                    padding: '1.25rem',
                    overflow: 'auto',
                    maxHeight: 260,
                  }}
                >
                  <span className="code-keyword">function</span>{' '}
                  <span className="code-func">calculateGrade</span>(<span className="code-variable">scores</span>) {'{'}
                  <br />
                  &nbsp;&nbsp;<span className="code-comment">// embedded code exercise — runs inside the lesson</span>
                  <br />
                  &nbsp;&nbsp;<span className="code-variable">total</span> = <span className="code-variable">scores</span>.<span className="code-func">reduce</span>((<span className="code-variable">a</span>, <span className="code-variable">b</span>) {'=> '}<span className="code-variable">a</span> + <span className="code-variable">b</span>, <span className="code-string">0</span>)
                  <br />
                  &nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-variable">total</span> / <span className="code-variable">scores</span>.<span className="code-variable">length</span>
                  <br />
                  {'}'}
                  <br /><br />
                  &nbsp;&nbsp;<span className="code-keyword">const</span> <span className="code-variable">result</span> = <span className="code-func">calculateGrade</span>([<span className="code-string">85</span>, <span className="code-string">92</span>, <span className="code-string">78</span>])
                  <br />
                  &nbsp;&nbsp;<span className="code-func">console</span>.<span className="code-func">log</span>(<span className="code-string">Average: </span> + <span className="code-variable">result</span>)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          style={{ padding: '6rem 1.5rem' }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.75,
                marginBottom: 4,
                textAlign: 'center',
              }}
              className="section-head reveal reveal-delay-1"
            >
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--fg-primary)',
                  margin: 0,
                  textWrap: 'balance',
                }}
              >
                Read, practice, progress — in one view
              </h2>
              <p
                style={{
                  color: 'var(--fg-tertiary)',
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: '60ch',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                No context switching. Content, code editor, and quiz live on the
                same page so what you just read stays fresh when you apply it.
              </p>
            </div>
            <div
              className="steps"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 2,
              }}
            >
              <Step
                number="01"
                title="Read rich content"
                description="Text, images, and video blocks delivered in a clean, distraction-free reader optimized for long study sessions."
                delay={1}
              />
              <Step
                number="02"
                title="Practice in place"
                description="Write and run code with an embedded Monaco editor, or answer a quiz with immediate feedback — without leaving the lesson."
                delay={2}
              />
              <Step
                number="03"
                title="Track progress"
                description="Every activity is tracked per student. Completion, scores, and attempts feed your dashboard so you can see where learners get stuck."
                delay={3}
              />
            </div>
          </div>
        </section>

        {/* Audience cards */}
        <section
          id="for-students"
          style={{ padding: '6rem 1.5rem' }}
        >
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.75,
                marginBottom: 4,
                textAlign: 'center',
              }}
              className="section-head reveal reveal-delay-1"
            >
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--fg-primary)',
                  margin: 0,
                  textWrap: 'balance',
                }}
              >
                For students
              </h2>
              <p
                style={{
                  color: 'var(--fg-tertiary)',
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: '60ch',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Enroll in published courses, continue where you left off, and
                watch your progress grow lesson by lesson.
              </p>
            </div>
            <div
              className="audience"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 2,
              }}
            >
              <AudienceCard
                kind="student"
                tag="Student experience"
                title="Learn actively"
                description="Every lesson mixes content with interactive activities. Code exercises run in a safe sandbox; quizzes grade instantly with explanations."
                features={[
                  'Embedded code editor — no context switching',
                  'Instant quiz feedback & scoring',
                  'Per-activity progress tracking',
                ]}
                delay={2}
              />
              <AudienceCard
                kind="instructor"
                tag="Instructor experience"
                title="Teach interactively"
                description="Build courses module by module, add content blocks and activities, publish when ready, and watch class analytics update in real time."
                features={[
                  'Course builder with drag-drop ordering',
                  'Student performance analytics',
                  'Publish / unpublish courses',
                ]}
                delay={2}
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '6rem 1.5rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div
              className="cta reveal reveal-delay-1"
              style={{
                borderRadius: 'var(--radius-xl)',
                border: `1px solid var(--border)`,
                background: `linear-gradient(135deg, var(--brand-600), var(--brand-700))`,
                color: '#ffffff',
                padding: '4rem 2rem',
                textAlign: 'center',
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 700,
                  margin: '0 0 1rem',
                  letterSpacing: '-0.02em',
                  textWrap: 'balance',
                }}
              >
                Start building active courses today
              </h2>
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  margin: '0 0 2rem',
                  maxWidth: 560,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Free to start. No credit card. Create your first course or
                enroll in one and begin learning by doing.
              </p>
              <div className="cta-actions">
                <Link to="/register?role=student" onClick={(e) => handlePrimaryCTAClick(e, '/register?role=student')}>
                  <Button variant="primary" size="lg">
                    Start learning <Rocket size="18" strokeWidth={2.5} />
                  </Button>
                </Link>
                <Link to="/register?role=instructor" onClick={(e) => handlePrimaryCTAClick(e, '/register?role=instructor')}>
                  <Button
                    variant="outline"
                    size="lg"
                    style={{
                      color: '#ffffff',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    Build a course
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid var(--border)`,
          background: 'var(--bg-surface)',
          padding: '3rem 1.5rem',
          color: 'var(--fg-tertiary)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 2,
            alignItems: 'start',
          }}
          className="footer-grid"
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              fontWeight: 700,
              fontSize: '1.25rem',
              color: 'var(--fg-primary)',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 0.5,
                background: `linear-gradient(135deg, var(--brand-600), var(--brand-500))`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BookOpen size="16" strokeWidth={2.5} fill="none" stroke="currentColor" />
            </div>
            <span>Aktibo<span style={{ color: 'var(--brand-500)' }}>LMS</span></span>
          </Link>
          <FooterCol
            title="Platform"
            links={['Catalog', 'Student dashboard', 'Instructor dashboard', 'Documentation']}
          />
          <FooterCol
            title="Company"
            links={['About', 'Contact', 'Privacy', 'Terms']}
          />
          <p
            style={{
              borderTop: `1px solid var(--border)`,
              marginTop: 3,
              paddingTop: 1.5,
              fontSize: '0.85rem',
              color: 'var(--fg-tertiary)',
              textAlign: 'center',
              gridColumn: '1 / -1',
            }}
          >
            &copy; 2026 AktiboLMS. Built by IT students. Interactive learning, made active.
          </p>
        </div>
      </footer>

      {/* Toast */}
      {toastMessage && (
        <div
          id="toast"
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-lg)',
            border: `1px solid var(--border)`,
            background: 'var(--bg-surface)',
            color: 'var(--fg-primary)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            zIndex: 1000,
            transform: 'translateY(0)',
            opacity: 1,
            transition: 'transform 300ms ease-out, opacity 300ms ease-out',
            fontSize: '0.9rem',
            maxWidth: 360,
          }}
        >
          <BookOpen size="18" strokeWidth={2.5} fill="none" stroke={'var(--brand-500)'} style={{ flexShrink: 0 }} />
          <div id="toast-message">{toastMessage}</div>
        </div>
      )}
    </div>
  )
}

function Step({ number, title, description, delay }: { number: string; title: string; description: string; delay: number }) {
  return (
    <div
      className={cn(`step reveal reveal-delay-${delay}`)}
      style={{
        position: 'relative',
        padding: '2.5rem 2rem',
        borderRadius: 'var(--radius-xl)',
        border: `1px solid var(--border)`,
        background: 'var(--bg-surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.25,
        transition: 'border-color 200ms ease-out, transform 200ms ease-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--brand-600)'
        e.currentTarget.style.transform = 'translateY(-3px)'
        const numberEl = e.currentTarget.querySelector('.step-number') as HTMLElement
        if (numberEl) numberEl.style.color = 'var(--brand-500)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
        const numberEl = e.currentTarget.querySelector('.step-number') as HTMLElement
        if (numberEl) numberEl.style.color = 'var(--fg-tertiary)'
      }}
    >
      <div
        className="step-number"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '3rem',
          fontWeight: 700,
          color: 'var(--fg-tertiary)',
          lineHeight: 1,
          transition: 'color 200ms ease-out',
        }}
      >
        {number}
      </div>
      <h3
        style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'var(--fg-primary)',
          margin: 0,
          textWrap: 'balance',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: 'var(--fg-secondary)',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  )
}

function AudienceCard({
  kind,
  tag,
  title,
  description,
  features,
  delay,
}: {
  kind: 'student' | 'instructor'
  tag: string
  title: string
  description: string
  features: string[]
  delay: number
}) {
  const tagStyle =
    kind === 'student'
      ? {
          borderColor: 'rgba(20, 184, 166, 0.3)',
          color: '#14b8a6',
          background: 'rgba(20, 184, 166, 0.08)',
        }
      : {
          borderColor: 'rgba(245, 158, 11, 0.3)',
          color: '#f59e0b',
          background: 'rgba(245, 158, 11, 0.08)',
        }

  // Feature icons based on kind and feature index
  const getFeatureIcon = (index: number) => {
    if (kind === 'student') {
      const icons = [Code2, Zap, BarChart2]
      return icons[index] || Code2
    } else {
      const icons = [ChevronRight, BarChart2, Check]
      return icons[index] || ChevronRight
    }
  }

  return (
    <div
      className={cn('audience-card', kind, `reveal reveal-delay-${delay}`)}
      style={{
        borderRadius: 'var(--radius-xl)',
        border: `1px solid var(--border)`,
        background: 'var(--bg-surface)',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-sm)',
        transition: 'box-shadow 200ms ease-out, transform 200ms ease-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div
        className="tag"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.4,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 500,
          padding: '0.35rem 0.75rem',
          borderRadius: '999px',
          border: `1px solid ${tagStyle.borderColor}`,
          color: tagStyle.color,
          background: tagStyle.background,
          marginBottom: 1.5,
        }}
      >
        {tag}
      </div>
      <h3
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--fg-primary)',
          margin: '0 0 1rem',
          textWrap: 'balance',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: 'var(--fg-secondary)',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          margin: '0 0 1.75rem',
        }}
      >
        {description}
      </p>
      <ul
        className="feature-list reveal reveal-delay-3"
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.85,
        }}
      >
        {features.map((feature, i) => {
          const Icon = getFeatureIcon(i)
          return (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 0.75, color: 'var(--fg-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              <Icon size="16" strokeWidth={2} fill="none" stroke={'var(--brand-500)'} style={{ flexShrink: 0, marginTop: 0.1 }} />
              <span>{feature}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="footer-col">
      <h4
        style={{
          color: 'var(--fg-primary)',
          fontSize: '0.8rem',
          fontWeight: 600,
          margin: '0 0 1.25rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {title}
      </h4>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.75,
        }}
      >
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              style={{
                color: 'var(--fg-tertiary)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'color 120ms ease-out',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fg-primary)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-tertiary)' }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
