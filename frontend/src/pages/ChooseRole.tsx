import { Link, useNavigate } from "react-router-dom"
import { Navbar } from "../components/ui/Navbar"
import { SiteFooter } from "../components/ui/SiteFooter"

const ROLE_CHOICES = [
  {
    id: "student",
    eyebrow: "FOR YOUR LEARNING JOURNEY",
    title: "I am a student",
    description: ["Join courses, work through interactive lessons,", "and keep track of your progress."],
    action: "CONTINUE AS STUDENT",
    to: "/account-profile",
  },
  {
    id: "instructor",
    eyebrow: "FOR YOUR CLASSROOM",
    title: "I am an instructor",
    description: ["Create interactive lessons, manage your courses,", "and support your learners."],
    action: "CONTINUE AS INSTRUCTOR",
    to: "/account/instructor-profile",
  },
] as const

export function ChooseRole() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col bg-aktif-navy animate-page-fade">
      <Navbar activePath="/login" className="mx-auto" />
      <main className="flex flex-1 items-center justify-center px-4">
        <section aria-labelledby="role-title" className="flex h-auto w-full max-w-[1080px] flex-col gap-6 overflow-visible rounded-[24px] bg-surface-white p-6 text-text-primary md:h-[600px] md:overflow-hidden md:p-10">
          <header className="flex h-[108px] flex-col justify-center gap-2 text-center">
            <p className="font-display text-[10px] font-bold text-text-secondary">WELCOME TO AKTIBO LMS</p>
            <h1 id="role-title" className="font-['Castoro_Titling'] text-[32px] leading-[1.5] text-aktif-navy">How will you use Aktibo?</h1>
            <p className="font-display text-[13px] text-text-secondary">Choose your role to open the right workspace for you.</p>
          </header>

          <div className="flex flex-col gap-6 md:flex-row">
            {ROLE_CHOICES.map((choice) => (
              <article key={choice.id} className="flex h-[276px] flex-col gap-5 rounded-[12px] border border-[#dfe5f0] bg-[#f4f6fa] p-6">
                <div className="flex h-[164px] flex-col gap-3 text-left">
                  <p className="font-display text-[10px] font-bold text-text-secondary">{choice.eyebrow}</p>
                  <h2 className="font-display text-[22px] font-bold leading-[1.5] text-aktif-navy">{choice.title}</h2>
                  <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
                    {choice.description[0]}
                    <br />
                    {choice.description[1]}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(choice.to)}
                  className="h-11 w-full rounded-[9px] border border-black bg-aktif-gold px-3 font-display text-[11px] font-bold text-aktif-navy transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  {choice.action}
                </button>
              </article>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              to="/login"
              className="flex h-11 w-[240px] items-center justify-center rounded-[9px] border border-[#dfe5f0] bg-white px-3 text-center font-display text-[11px] font-bold text-aktif-navy transition-colors hover:bg-surface-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              BACK TO SIGN IN
            </Link>
          </div>

          <p className="text-center font-display text-[11px] leading-[1.5] text-text-secondary">
            Your choice opens the matching learning or teaching workspace. Roles aren’t saved yet.
          </p>
        </section>
      </main>
      <div className="pt-[13px]">
        <SiteFooter />
      </div>
    </div>
  )
}
