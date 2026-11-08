/* ============================================================================
   STUDY NOTES — main.tsx  (application entry point / provider composition)
   ----------------------------------------------------------------------------
   WHAT: Bootstraps the React app. Composes three providers from outside-in:
         QueryClientProvider (TanStack Query) → BrowserRouter (React Router)
         → AuthProvider → App. Renders ReactQueryDevtools alongside.
   HOW IT WORKS:
     1. A single QueryClient is created at module level (staleTime 5 min,
        retry 1, refetchOnWindowFocus: false) and shared via provider.
        QA LOW: module-level queryClient is hard to override for testing —
        consider a factory function later.
     2. AuthProvider wraps the router so every route can use useAuth().
     3. React.StrictMode is on (helps catch side-effects in dev).
   WHERE THE API CONTRACT LIVES: none here — but api.ts (baseURL /api) is the
     contract all queries/mutations use.
   WHAT TO CHANGE FOR THE NEW UI:
     • No structural change needed for the overhaul. If you add a LandingLayout
       vs AppLayout split, do it in App.tsx, not here.
     • QA LOW: consider moving queryClient creation inside a provider
       component for testability.
   ============================================================================ */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from './hooks/useAuth'
import { ThemeProvider } from './context/ThemeContext'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)