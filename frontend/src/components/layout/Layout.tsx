import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

/* ============================================================================
   STUDY NOTES — components/layout/Layout.tsx  (app shell)
   ----------------------------------------------------------------------------
   WHAT: Shared layout wrapper rendered around every protected route. Provides
         the navbar, main content area, and the React Router <Outlet /> where
         the active page component is injected.
   HOW IT WORKS:
     1. <Outlet /> is the placeholder React Router fills with the matched
        route's element (e.g. StudentDashboard, InstructorDashboard).
     2. <Navbar /> is always present — role-aware links + user menu.
     3. Currently a single fixed shell: min-h-screen, gray-50 background,
        centered max-width content.
   WHERE THE API CONTRACT LIVES: none here (pure presentation).
   WHAT TO CHANGE FOR THE NEW UI:
     • The new landing page ("/") should be FULL-BLEED with NO navbar —
       render it outside this Layout group in App.tsx so it isn't wrapped.
     • For protected pages, keep this shell but restyle:
         – bg-gray-50 → new --bg-surface token (dark-first theme)
         – add theme-awareness (worktree ThemeContext shows the pattern)
     • Consider splitting into two layouts later: LandingLayout (no nav) and
       AppLayout (navbar + sidebar), instead of one Layout for everything.
   QA NOTE: none critical for this file; it's a thin presentational wrapper.
   ============================================================================ */

export function Layout() {
  return (
    <div className="page-container">
      <Navbar />
      <main className="pt-6 pb-8">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  )
}