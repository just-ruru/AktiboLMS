import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Card } from '../components/ui/Card'
import { Navbar } from '../components/ui/Navbar'

export function Register() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className="bg-[#000e53] flex flex-col gap-[10px] items-center pb-[898px] px-[10px] relative size-full">
      <Navbar className="w-[1420px]" />
      <main className="flex flex-col items-center justify-center overflow-clip py-[47px] relative w-full flex-1 animate-page-fade">
        <Card
          className="h-[753px] rounded-[28px] px-[20px] py-[35px] shrink-0 w-[1246px] items-center overflow-clip"
        >
          <div className="flex flex-col items-start overflow-clip p-[10px] relative w-full max-w-[1420px]">
            <h1 className="text-[64px] font-['Castoro Titling'] text-black text-center w-full leading-[normal]">
              REGISTER
            </h1>
          </div>
          <div className="flex gap-[10px] h-[488px] items-start overflow-clip relative w-full">
            {/* Left Panel */}
            <div className="flex-1 flex flex-col h-[488px] items-start justify-center min-w-px overflow-clip relative w-full">
              <div className="flex flex-col items-start relative w-full">
                <div className="flex flex-col items-start overflow-clip py-[6px] px-[10px] relative w-full">
                  <Label htmlFor="firstName" className="text-[24px] text-black">
                    First Name
                  </Label>
                </div>
                <div className="flex flex-col items-center justify-center overflow-clip py-[5px] px-[10px] relative w-full">
                  <Input
                    id="firstName"
                    type="text"
                    inputSize="register"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col items-start overflow-clip py-[6px] px-[10px] relative w-full">
                  <Label htmlFor="email" className="text-[24px] text-black whitespace-nowrap">
                    Email
                  </Label>
                </div>
                <div className="flex flex-col items-center justify-center overflow-clip py-[5px] px-[10px] relative w-full">
                  <Input
                    id="email"
                    type="email"
                    inputSize="register"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@cit.edu"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col items-start overflow-clip py-[6px] px-[10px] relative w-full">
                  <Label htmlFor="password" className="text-[24px] text-black whitespace-nowrap">
                    Password
                  </Label>
                </div>
                <div className="flex flex-col items-center justify-center overflow-clip py-[5px] px-[10px] relative w-full">
                  <Input
                    id="password"
                    type="password"
                    inputSize="register"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col items-start overflow-clip py-[6px] px-[10px] relative w-full">
                  <Label htmlFor="confirmPassword" className="text-[24px] text-black whitespace-nowrap">
                    Re-enter Password
                  </Label>
                </div>
                <div className="flex flex-col items-center justify-center overflow-clip py-[5px] px-[10px] relative w-full">
                  <Input
                    id="confirmPassword"
                    type="password"
                    inputSize="register"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter Password"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex flex-col h-[383px] items-start justify-center min-w-px overflow-clip relative w-full">
              <div className="flex flex-col items-start relative w-full">
                <div className="flex flex-col items-start overflow-clip py-[6px] px-[10px] relative w-full">
                  <Label htmlFor="lastName" className="text-[24px] text-black">
                    Last Name
                  </Label>
                </div>
                <div className="flex flex-col items-center justify-center overflow-clip py-[5px] px-[10px] relative w-full">
                  <Input
                    id="lastName"
                    type="text"
                    inputSize="register"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col items-start overflow-clip py-[6px] px-[10px] relative w-full">
                  <Label htmlFor="course" className="text-[24px] text-black">
                    Course
                  </Label>
                </div>
                <div className="flex flex-col items-center justify-center overflow-clip py-[5px] px-[10px] relative w-full">
                  <Input
                    id="course"
                    type="text"
                    inputSize="register"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="Course"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col items-start overflow-clip py-[6px] px-[10px] relative w-full">
                  <Label htmlFor="phone" className="text-[24px] text-black">
                    Phone Number
                  </Label>
                </div>
                <div className="flex flex-col items-center justify-center overflow-clip py-[5px] px-[10px] relative w-full">
                  <Input
                    id="phone"
                    type="text"
                    inputSize="register"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-[67px] items-center justify-center overflow-clip py-[5px] px-[10px] relative w-full">
            <Button
              variant="primary"
              onClick={() => navigate('/account-profile')}
              className="w-full max-w-[588px] h-[51px] px-[179px] py-[8px] border border-black hover:bg-amber-400 active:bg-amber-500 transition-colors duration-200"
            >
              SUBMIT
            </Button>
          </div>
          <footer className="flex gap-[199px] h-[20px] items-center justify-center leading-[normal] overflow-clip p-[10px] relative shrink-0 text-[12px] text-black text-center w-full whitespace-nowrap">
            <p className="relative shrink-0">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold hover:text-aktif-gold transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
            <p className="relative shrink-0">
              <Link
                to="/forgot-password"
                className="font-bold hover:text-aktif-gold transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </p>
          </footer>
        </Card>
      </main>
    </div>
  )
}
