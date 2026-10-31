import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { AuthProvider } from '../../hooks/useAuth'

export function Layout() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-4 pb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </AuthProvider>
  )
}