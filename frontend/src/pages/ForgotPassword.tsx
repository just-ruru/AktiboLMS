import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Card } from '../components/ui/Card'
import { Navbar } from '../components/ui/Navbar'
import { LavaLampBg } from '../components/ui/LavaLampBg'

export function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  return (
    <div className="bg-[#000e53] flex flex-col gap-[10px] items-center pb-[898px] pt-[10px] px-[10px] relative size-full">
      <LavaLampBg />
      <Navbar className="w-[1420px]" />
      <main className="flex flex-col items-center justify-center overflow-clip py-[47px] relative shrink-0 w-full animate-page-fade">
        <Card
          className="h-[621px] rounded-[28px] px-[20px] py-[60px] shrink-0 w-[550px] items-center overflow-clip"
        >
          <div className="flex flex-col items-start overflow-clip p-[10px] relative w-full">
            <h1 className="text-[40px] font-['Castoro Titling'] text-black text-center w-full leading-[normal]">
              Forgot Password
            </h1>
          </div>
          <div className="flex flex-col items-start overflow-clip p-[10px] relative w-full">
            <Label htmlFor="email" className="text-[24px] text-black whitespace-nowrap">
              Email:
            </Label>
          </div>
          <div className="flex flex-col items-center justify-center overflow-clip p-[10px] relative w-full">
            <Input
              id="email"
              type="email"
              inputSize="auth"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@cit.edu"
              className="w-full"
            />
          </div>
          <div className="flex h-[27px] items-center justify-center p-[10px] relative w-full" />
          <div className="flex h-[67px] items-center justify-center overflow-clip p-[10px] relative w-full">
            <Button
              variant="primary"
              onClick={() => navigate('/login')}
              className="w-full max-w-[490px] h-[42px] px-[179px] py-[8px] border border-black hover:bg-amber-400 active:bg-amber-500 transition-colors duration-200"
            >
              Send Reset Link
            </Button>
          </div>
          {/* Footer per Figma frame 54:2 */}
          <footer className="bg-white flex gap-[239px] h-[20px] items-center justify-center leading-[normal] overflow-clip relative shrink-0 text-[12px] text-black text-center w-[490px] whitespace-nowrap">
            <p className="font-['Lexend Exa'] font-normal relative shrink-0">
              Remember your password?
            </p>
            <p className="font-['Lexend Exa'] font-bold relative shrink-0">
              <Link
                to="/login"
                className="hover:text-aktif-gold transition-colors duration-200"
              >
                Log in
              </Link>
            </p>
          </footer>
        </Card>
      </main>
    </div>
  )
}
