import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Navbar } from '../components/ui/Navbar'
import { LavaLampBg } from '../components/ui/LavaLampBg'

const ROWS = [
  { label: 'First name', value: 'Alex', valueColor: 'text-black', height: '55px' },
  { label: 'Last name', value: 'Smith', valueColor: 'text-black', height: '54px' },
  { label: 'Mobile number', value: '+1 650-213-7390', valueColor: 'text-black', height: '55px' },
  { label: 'Email address', value: 'alexsmith.mobbin@gmail.com', valueColor: 'text-black', height: '55px' },
  { label: 'Date of birth', value: '+ Add', valueColor: 'text-[#ffb700]', height: '54px' },
  { label: 'Gender', value: '+ Add', valueColor: 'text-[#ffb700]', height: '55px' },
]

export function AccountProfile() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#000e53] flex flex-col gap-[10px] items-center pb-[898px] pt-[10px] px-[10px] relative size-full">
      <LavaLampBg />
      <Navbar className="w-[1420px]" />
      <main className="flex flex-col h-[903px] items-center justify-center overflow-clip relative shrink-0 w-[1440px] animate-fade-in-up">
        <div className="flex flex-col items-center relative shrink-0 h-[850px]">
          <div className="bg-[rgba(217,217,217,0.1)] h-[850px] w-[1372px] rounded-[28px] relative" />
          <div className="absolute flex gap-[19px] h-[863px] items-start justify-center left-0 overflow-clip px-[10px] py-[51px] rounded-[28px] top-[-0.5px] w-[1372px]">
            {/* Left sidebar — profile card */}
            <aside className="bg-white flex flex-col h-[754px] items-center overflow-clip p-[10px] relative rounded-[11px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-[343px]">
              <div className="flex flex-col gap-[5px] h-[340px] items-center justify-center overflow-clip p-[24px] relative rounded-[24px] shrink-0 w-[306px]">
                <img
                  src="/assets/avatar.svg"
                  alt="Avatar"
                  className="size-[219px] rounded-full"
                />
                <h2 className="text-[32px] font-['Lexend Exa'] font-bold text-black text-center w-[239px] h-[53px]">
                  Alex Smith
                </h2>
                <p className="text-[#ffb700] text-[16px] text-center w-[179px] font-['Lexend Exa'] font-bold">
                  Edit basic info
                </p>
              </div>
            </aside>

            {/* Right panel */}
            <section className="flex flex-col gap-[25px] h-[754px] items-start overflow-clip relative rounded-[11px] shrink-0 w-[936px]">
              {/* Account Details card */}
              <div className="bg-white flex flex-col gap-[13px] h-[509px] items-start justify-center leading-[normal] overflow-clip px-[32px] py-[24px] relative rounded-[16px] shrink-0 w-[936px] whitespace-nowrap">
                <h2 className="text-[32px] font-['Lexend Exa'] font-bold text-black">
                  Account Details
                </h2>
                <div className="flex flex-col gap-[6px] items-start overflow-clip relative w-full">
                  {ROWS.map((row, i) => (
                    <div
                      key={i}
                      className={`flex flex-col gap-[6px] items-start overflow-clip relative shrink-0 w-[872px] h-[${row.height}]`}
                    >
                      <span className="text-[#595959] text-[16px]">
                        {row.label}
                      </span>
                      <span className={`text-[20px] ${row.valueColor}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edit Account Details */}
              <div className="bg-white flex flex-col items-center justify-center overflow-clip px-[18px] py-[24px] relative rounded-[16px] shrink-0 w-[936px] h-[100px]">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => navigate('/login')}
                  className="h-[58px] rounded-[12px] w-full text-[20px] bg-[#ffb700] border border-black text-black text-center whitespace-nowrap hover:bg-amber-400 active:bg-amber-500 transition-colors duration-200"
                >
                  Edit Account Details
                </Button>
              </div>

              {/* Log out */}
              <div className="bg-white flex flex-col items-center justify-center overflow-clip px-[18px] py-[24px] relative rounded-[16px] shrink-0 w-[936px] h-[100px]">
                <Button
                  variant="danger"
                  fullWidth
                  onClick={() => navigate('/login')}
                  className="h-[58px] rounded-[12px] w-full text-[20px] bg-[#ff585b] border-2 border-black text-black text-center whitespace-nowrap hover:bg-[#ff4044] active:bg-[#e83a3d] transition-colors duration-200"
                >
                  Log out
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
