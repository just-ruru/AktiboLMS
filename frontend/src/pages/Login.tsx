import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Card } from '../components/ui/Card'
import { Navbar } from '../components/ui/Navbar'

export function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="bg-[#000e53] flex flex-col gap-[10px] items-center pb-[898px] px-[10px] relative size-full">
      <Navbar className="w-[1420px]" />
      <main className="flex flex-col items-center justify-center overflow-clip py-[47px] relative shrink-0 w-full animate-page-fade">
        <Card
          className="h-[621px] rounded-[28px] px-[20px] py-[60px] shrink-0 w-[550px] items-center overflow-clip"
        >
          <div className="flex flex-col items-start overflow-clip p-[10px] relative w-full">
            <h1 className="text-[64px] font-['Castoro Titling'] text-black text-center w-full leading-[normal]">
              LOGIN
            </h1>
          </div>

          <div className="flex flex-col items-start overflow-clip p-[10px] relative w-full pt-[10px]">
            <Label htmlFor="username" className="text-[24px] text-black whitespace-nowrap">
              Username:
            </Label>
          </div>
          <div className="flex flex-col items-start overflow-clip p-[10px] relative w-full">
            <Input
              id="username"
              type="text"
              inputSize="auth"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex flex-col items-start overflow-clip p-[10px] relative w-full pt-[10px]">
            <Label htmlFor="password" className="text-[24px] text-black whitespace-nowrap">
              Password:
            </Label>
          </div>
          <div className="flex flex-col items-start overflow-clip p-[10px] relative w-full">
            <Input
              id="password"
              type="password"
              inputSize="auth"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex h-[67px] items-start justify-start overflow-clip p-[10px] relative w-full pt-[20px]">
            <Button
              variant="primary"
              onClick={() => navigate('/account-profile')}
              className="w-full max-w-[490px] h-[42px] px-[179px] py-[8px] border border-black hover:bg-amber-400 active:bg-amber-500 transition-colors duration-200"
            >
              SIGN IN
            </Button>
          </div>

          {/* Footer per Figma frame 34:169 — two separate p elements with gap-[185px] */}
          <div className="flex gap-[100px] h-[20px] items-center justify-center leading-[normal] overflow-clip p-[10px] relative shrink-0 text-[12px] text-black text-center w-full whitespace-nowrap">
            <p className="relative shrink-0">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-bold hover:text-aktif-gold transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
            <p className="relative shrink-0">
              <Link
                to="/forgot-password"
                className="font-bold hover:text-aktif-gold transition-colors duration-200"
              >
                Forgot Password
              </Link>
            </p>
          </div>
        </Card>
      </main>
    </div>
  )
}
