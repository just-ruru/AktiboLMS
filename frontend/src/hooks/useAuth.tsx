import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

/* ============================================================================
   STUDY NOTES — hooks/useAuth.tsx  (authentication context)
   ----------------------------------------------------------------------------
   WHAT: React context that holds the signed-in user and auth actions
         (login, register, logout, refreshUser). Provided once in main.tsx
         and consumed by pages/components via the useAuth() hook.
   HOW IT WORKS:
     1. AuthProvider keeps user/loading in React state; tokens (accessToken,
        refreshToken) live in localStorage.
     2. On mount with a stored accessToken it calls refreshUser() →
        GET /auth/me to hydrate the user object.
     3. login(email, password) → POST /auth/login; register(data) →
        POST /auth/register. Both store tokens + set the normalized user.
     4. logout() clears localStorage + state; the axios interceptor also
        dispatches a window "auth:logout" event on refresh failure, which
        AuthProvider listens for.
     5. normalizeUser() lowercases the role so role checks are case-insensitive.
   WHERE THE API CONTRACT LIVES: POST /auth/register, POST /auth/login,
     POST /auth/refresh, GET /auth/me (backend AuthController).
   WHAT TO CHANGE FOR THE NEW UI:
     • Keep the hook as-is; the new Login/Register pages call the same
       login()/register() and handle the returned { accessToken, refreshToken,
       user }.
     • Role-based redirect after login already exists in Login.tsx/Register.tsx
       (instructor → /instructor, student → /dashboard).
     • QA HIGH: User interface is duplicated here and in types/index.ts
       (this copy lacks avatarUrl? / createdAt). Prefer importing User from
       types/index.ts and removing the local duplicate.
     • QA MEDIUM: refreshUser used in useEffect without being wrapped in
       useCallback — harmless but worth fixing when you touch this file.
   ============================================================================ */
import { api } from '../services/api'
import { User } from '../types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  register: (data: RegisterData) => Promise<User>
  logout: () => void
  refreshUser: () => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  fullName: string
  role: 'student' | 'instructor'
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = async () => {
    try {
      const response = await api.get('/auth/me')
      setUser(normalizeUser(response.data))
    } catch {
      setUser(null)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      refreshUser()
    } else {
      setLoading(false)
    }

    // Listen for auth logout event from axios interceptor
    const handleAuthLogout = () => handleLogout()
    window.addEventListener('auth:logout', handleAuthLogout)
    return () => window.removeEventListener('auth:logout', handleAuthLogout)
  }, [])

  const normalizeUser = (userData: User) => ({
    ...userData,
    role: userData.role.toLowerCase() as 'student' | 'instructor'
  })

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    const { accessToken, refreshToken, user: userData } = response.data
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    const normalizedUser = normalizeUser(userData)
    setUser(normalizedUser)
    return normalizedUser
  }

  const register = async (data: RegisterData) => {
    const response = await api.post('/auth/register', data)
    const { accessToken, refreshToken, user: userData } = response.data
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    const normalizedUser = normalizeUser(userData)
    setUser(normalizedUser)
    return normalizedUser
  }

  const logout = () => {
    handleLogout()
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}