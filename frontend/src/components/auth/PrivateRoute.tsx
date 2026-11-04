import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { memo } from 'react'

interface PrivateRouteProps {
  allowedRoles?: string[]
}

const PrivateRouteComponent = ({ allowedRoles }: PrivateRouteProps) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export const PrivateRoute = memo(PrivateRouteComponent)
PrivateRoute.displayName = 'PrivateRoute'