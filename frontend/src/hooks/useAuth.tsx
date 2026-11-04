import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
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