import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-aktibo-canvas">
      <Navbar signedIn />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
