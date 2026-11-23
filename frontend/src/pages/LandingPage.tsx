import { Link } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'

/**
 * Landing Page — matches Figma frame 6:11.
 * Navy bg, shared pre-signup Navbar (HOME active), hero with Castoro Titling heading
 * "Less searching. More learning.", learning workspace preview, learning principles,
 * benefits cards, how-it-works steps, explore AKTIBO, FAQ, get started CTA, footer.
 *
 * Cleanup notes (Phase 2):
 * - Inline hex colours replaced with `aktibo` Tailwind tokens (single source of truth).
 * - Arbitrary font-face references replaced with `font-sans` / `font-display` / `font-titling`.
 * - Fixed `w-[1440px]` containers replaced with responsive `max-w-[1440px] mx-auto`
 *   plus responsive gutters (`px-6 px-10 px-[72px]`), matching the `.shell`
 *   pattern in index.css.
 * - Absolute positioning kept only where Figma requires it (badges, dividers,
 *   active-page indicator). All content flow is native flex.
 */
export function LandingPage() {
  return (
    <div className="landing-page bg-aktibo-navy min-h-screen flex flex-col animate-page-fade">
      {/* Navigation — pre-signup Navbar matches Figma 92:158 / 95:171 */}
      <Navbar signedIn={false} />

      {/* Hero */}
      <section
        className="relative w-full max-w-[1440px] mx-auto px-[72px] pt-[72px] pb-[120px]"
      >
        <div className="flex gap-[474px] items-start relative w-full">
          <p className="font-sans font-bold text-aktibo-gold text-[12px] whitespace-nowrap">
            A MORE FOCUSED WAY TO LEARN
          </p>
          <div className="flex h-full items-start pt-[4px] w-[219px]">
            <p className="font-sans font-medium text-aktibo-muted-on-navy text-[11px] whitespace-nowrap">
              AN EXAMPLE OF YOUR LEARNING SPACE
            </p>
          </div>
        </div>

        <div className="flex gap-[76px] items-start relative w-full mt-[10px]">
          {/* Left column */}
          <div className="flex items-start pt-[2px] w-[600px]">
            <div className="flex flex-col gap-[22px] h-[402px] items-start w-[600px]">
              {/* Heading */}
              <div className="font-sans font-bold min-w-full not-italic text-[64px] text-white tracking-[-1.92px] w-[min-content]">
                <p className="leading-[1.1] mb-0">Less searching.</p>
                <p className="leading-[1.1] text-aktibo-gold">More learning.</p>
              </div>

              {/* Description */}
              <div className="flex flex-col h-[70px] items-start pt-[12px] w-[520px]">
                <p className="font-sans text-aktibo-muted-on-navy text-[20px] w-[520px]">
                  Make room for your next step. Bring your courses and your learning journey together with AKTIBO LMS.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col h-[106px] items-start pt-[50px] w-[432px]">
                <div className="cursor-pointer flex gap-[16px] h-[56px] items-start w-[432px]">
                  <Link
                    to="/register"
                    className="bg-aktibo-gold text-aktibo-navy flex h-full items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[216px] font-sans font-semibold text-[16px] whitespace-nowrap"
                  >
                    <p className="leading-[1.45] mb-0 text-left">Create an account</p>
                  </Link>
                  <Link
                    to="/pricing"
                    className="border border-[#5d6994] border-solid text-white flex h-full items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[200px] font-sans font-semibold text-[16px] whitespace-nowrap"
                  >
                    <p className="leading-[1.45] mb-0 text-left">Explore courses</p>
                  </Link>
                </div>
              </div>

              {/* Already learning link */}
              <Link
                to="/login"
                className="block cursor-pointer font-sans text-aktibo-muted-on-navy text-[14px] whitespace-nowrap"
              >
                <p className="leading-[1.45]">Already learning with us? Log in to continue.</p>
              </Link>
            </div>
          </div>

          {/* Right column — illustrative learning workspace */}
          <div className="bg-aktibo-surface flex flex-col items-start overflow-clip relative rounded-[14px] w-[620px]">
            {/* Workspace title bar */}
            <div className="bg-aktibo-canvas flex gap-[364px] h-[52px] items-start overflow-clip pb-[17px] pl-[20px] pr-[54px] pt-[16px] w-full">
              <p className="font-sans font-semibold text-aktibo-navy text-[13px] w-[134px]">
                AKTIBO / My learning
              </p>
              <div className="flex h-[17px] items-start pt-[2px] w-[48px]">
                <p className="font-sans font-semibold text-aktibo-muted text-[10px] whitespace-nowrap">
                  EXAMPLE
                </p>
              </div>
            </div>

            <div className="flex gap-[24px] items-start relative w-[596px]">
              {/* Workspace navigation */}
              <div className="bg-aktibo-canvas flex flex-col gap-[16px] items-start overflow-clip pb-[207px] pt-[28px] px-[12px] relative shrink-0 w-[140px]">
                <div className="flex flex-col items-start pl-[6px] w-[64px]">
                  <p className="font-sans font-bold text-aktibo-muted text-[9px] whitespace-nowrap">
                    WORKSPACE
                  </p>
                </div>
                <div className="flex flex-col h-[39px] items-start pt-px w-full">
                  <Link
                    className="bg-aktibo-navy cursor-pointer flex h-[38px] items-center justify-center overflow-clip relative rounded-[6px] shrink-0 w-[116px]"
                    to="/account-profile"
                  >
                    <p className="font-sans font-semibold text-[14px] text-white whitespace-nowrap">
                      My learning
                    </p>
                  </Link>
                </div>
                <div className="flex flex-col items-start pl-[12px] w-[79px]">
                  <Link
                    className="block cursor-pointer font-sans text-aktibo-muted text-[12px] whitespace-nowrap"
                    to="/account-profile"
                  >
                    <p className="leading-[1.45]">My account</p>
                  </Link>
                </div>
                <div className="flex flex-col items-start pl-[12px] pt-[5px] w-[60px]">
                  <Link
                    className="block cursor-pointer font-sans text-aktibo-muted text-[12px] whitespace-nowrap"
                    to="/help-support"
                  >
                    <p className="leading-[1.45]">Get help</p>
                  </Link>
                </div>
              </div>

              {/* Course preview */}
              <div className="flex items-start pt-[24px] w-[432px]">
                <div className="flex flex-col gap-[5px] items-start overflow-clip pb-[16px] w-full">
                  <p className="font-sans font-semibold text-aktibo-navy-deep text-[23px] whitespace-nowrap">
                    Welcome back.
                  </p>
                  <p className="font-sans text-aktibo-muted text-[13px] whitespace-nowrap">
                    A small step forward starts here.
                  </p>
                  <div className="flex flex-col items-start pt-[20px] w-full">
                    {/* Example course card */}
                    <div className="bg-aktivo-surface border border-aktibo-border border-solid flex flex-col gap-[6px] items-start overflow-clip pb-[19px] pt-[18px] px-[20px] relative rounded-[10px] w-[432px]">
                      <p className="font-sans font-bold text-aktibo-muted text-[9px] whitespace-nowrap">
                        CONTINUE LEARNING
                      </p>
                      <div className="flex flex-col items-start pt-[5px] w-[179px]">
                        <p className="font-sans font-semibold text-aktibo-navy-deep text-[19px] whitespace-nowrap">
                          Learning essentials
                        </p>
                      </div>
                      <p className="font-sans text-aktibo-muted text-[12px] whitespace-nowrap">
                        Lesson 3 of 5
                      </p>
                      <div className="flex flex-col items-start pt-[8px] w-full">
                        <div className="bg-[#e7ebf3] flex flex-col h-[6px] items-start overflow-clip pr-[157px] relative rounded-[3px] w-[392px]">
                          <div className="bg-aktibo-gold h-[6px] relative rounded-[3px] w-full" />
                        </div>
                      </div>
                      <div className="flex flex-col items-start pt-[12px] w-[41px]">
                        <p className="font-sans text-aktibo-muted text-[11px] whitespace-nowrap">
                          Up next
                        </p>
                      </div>
                      <div className="flex gap-[52px] items-start relative w-full">
                        <p className="font-sans font-medium text-aktibo-navy-deep text-[14px] whitespace-nowrap">
                          Build your learning routine
                        </p>
                        <div className="flex items-start pt-[18px] w-[164px]">
                          <Link
                            className="bg-aktibo-navy cursor-pointer flex h-[36px] items-center justify-center overflow-clip relative rounded-[6px] shrink-0 w-[164px]"
                            to="/student/courses"
                          >
                            <p className="font-sans font-semibold text-[14px] text-left text-white whitespace-nowrap">
                              Continue lesson
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning encouragement (absolute badge) */}
        <div className="absolute bg-aktibo-gold flex flex-col h-[100px] items-start overflow-clip pb-[22px] pl-[24px] pr-[74px] pt-[18px] rounded-[12px] left-[1078px] top-[500px] w-[266px]">
          <div className="font-sans font-semibold leading-[0] not-italic text-aktibo-navy text-[21px] w-full">
            <p className="leading-[1.45] mb-0">A little progress.</p>
            <p className="leading-[1.45]">Every day.</p>
          </div>
        </div>
      </section>

      {/* Learning principles */}
      <section
        className="relative w-full max-w-[1440px] mx-auto px-[72px] bg-aktibo-gold pt-[29px] pb-[39px] pl-[72px] pr-[260px]"
      >
        <div className="flex gap-[230px] items-start relative w-full">
          <p className="font-sans font-semibold text-aktibo-navy text-[20px] w-[187px]">
            Find your direction.
          </p>
          <div className="flex items-start pl-[31px] w-[249px]">
            <p className="font-sans font-semibold text-aktibo-navy text-[20px] whitespace-nowrap">
              Build your momentum.
            </p>
          </div>
          <p className="font-sans font-semibold text-aktibo-navy text-[20px] w-[212px]">
            Keep moving forward.
          </p>
        </div>
        <div className="flex gap-[277px] items-start relative w-[1022px] mt-[3px]">
          <p className="font-sans text-aktibo-navy text-[14px] w-[171px]">
            Explore what comes next.
          </p>
          <p className="font-sans text-aktibo-navy text-[14px] w-[152px]">
            Make time for learning.
          </p>
          <div className="flex items-start pl-[19px] w-[145px]">
            <p className="font-sans text-aktibo-navy text-[14px] whitespace-nowrap">
              One step at a time.
            </p>
          </div>
        </div>
        <div className="absolute bg-[#c28b00] h-[68px] left-[480px] top-[28px] w-px" />
        <div className="absolute bg-[#c28b00] h-[68px] left-[928px] top-[28px] w-px" />
      </section>

      {/* Benefits */}
      <section
        className="w-full max-w-[1440px] mx-auto px-[72px] bg-aktibo-surface pt-[58px] pb-[54px]"
      >
        <p className="font-sans font-bold text-aktibo-muted text-[12px] whitespace-nowrap">
          LEARNING, WITH LESS FRICTION
        </p>
        <div className="flex flex-col items-start pt-[8px] w-[578px]">
          <p className="font-sans font-semibold text-aktibo-navy-deep text-[38px] whitespace-nowrap">
            More focus. Fewer distractions.
          </p>
        </div>
        <p className="font-sans text-aktibo-muted text-[18px] whitespace-nowrap">
          A simpler starting point for the things that matter.
        </p>
        <div className="flex flex-col items-start pt-[39px] w-full">
          <div className="flex gap-[24px] items-start relative w-[1296px]">
            {[
              {
                number: '01',
                title: 'Your courses, together',
                description:
                  'Spend less time looking around and more time finding the learning that matters to you.',
              },
              {
                number: '02',
                title: 'A clear place to start',
                description:
                  'From exploring a course to returning to your account, know where to go next.',
              },
              {
                number: '03',
                title: 'Your own learning space',
                description:
                  'Keep your profile and contact details organised, so you can focus on your next step.',
              },
            ].map((benefit) => (
              <div
                key={benefit.number}
                className="bg-aktibo-canvas flex flex-col gap-[13px] items-start overflow-clip pb-[56px] pt-[22px] px-[24px] relative rounded-[12px] w-[416px]"
              >
                <p className="font-sans font-bold text-aktibo-navy text-[14px] whitespace-nowrap">
                  {benefit.number}
                </p>
                <div className="flex flex-col items-start pt-[5px] w-full">
                  <p className="font-sans font-semibold text-aktibo-navy-deep text-[23px] whitespace-nowrap">
                    {benefit.title}
                  </p>
                </div>
                <p className="font-sans text-aktibo-muted text-[16px]">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        className="relative w-full max-w-[1440px] mx-auto px-[72px] bg-aktibo-canvas pt-[54px] pb-[89px] pl-[72px] pr-[102px]"
      >
        <div className="absolute bg-[#cad2e2] h-px left-[98px] top-[194px] w-[894px]" />
        <p className="font-sans font-bold text-aktibo-muted text-[12px] whitespace-nowrap">
          MAKE YOUR NEXT MOVE
        </p>
        <div className="flex flex-col items-start pt-[4px] w-[590px]">
          <p className="font-sans font-semibold text-aktibo-navy-deep text-[38px] whitespace-nowrap">
            A simple start. A steady rhythm.
          </p>
        </div>
        <div className="flex flex-col items-start pt-[22px] w-[944px]">
          <div className="flex gap-[400px] items-start relative w-[944px]">
            {['01', '02', '03'].map((step) => (
              <div
                key={step}
                className={`bg-aktibo-navy flex flex-col items-start overflow-clip relative rounded-[10px] shrink-0 w-[48px] pt-[12px] pb-[13px] ${
                  step === '01' ? 'pl-[14px] pr-[15px]' : step === '02' ? 'pl-[14px] pr-[13px]' : 'pl-[14px] pr-[12px]'
                }`}
              >
                <p className="font-sans font-semibold text-[16px] text-white w-full">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start pt-[17px] w-[1109px]">
          <div className="flex gap-[211px] items-start relative w-[1109px]">
            <p className="font-sans font-semibold text-aktibo-navy-deep text-[24px] w-[237px]">
              Create your account
            </p>
            <p className="font-sans font-semibold text-aktibo-navy-deep text-[24px] w-[193px]">
              Explore a course
            </p>
            <div className="flex items-start pl-[44px] w-[257px]">
              <p className="font-sans font-semibold text-aktibo-navy-deep text-[24px] whitespace-nowrap">
                Keep coming back
              </p>
            </div>
          </div>
        </div>
        <div className="flex font-sans text-aktibo-muted text-[16px] gap-[78px] items-start leading-[1.45] not-italic w-full">
          <p className="w-[370px]">Start with a profile that is yours.</p>
          <p className="w-[370px]">Find the right next step for your goals.</p>
          <p className="w-[370px]">Make learning part of your routine.</p>
        </div>
      </section>

      {/* Explore AKTIBO */}
      <section
        className="flex flex-wrap gap-[32px] w-full max-w-[1440px] mx-auto px-[72px] py-[52px]"
      >
        <div className="bg-aktibo-navy flex flex-col gap-[16px] items-start overflow-clip pb-[32px] pl-[32px] pr-[308px] pt-[28px] relative rounded-[16px] w-[632px]">
          <p className="font-sans font-bold text-aktibo-gold text-[11px] whitespace-nowrap">
            EXPLORE AKTIBO
          </p>
          <div className="flex flex-col items-start pt-[2px] w-[261px]">
            <div className="font-sans font-semibold leading-[0] not-italic text-[34px] text-white whitespace-nowrap w-[min-content]">
              <p className="leading-[1.45] mb-0">Make space for</p>
              <p className="leading-[1.45]">something new.</p>
            </div>
          </div>
          <div className="font-sans leading-[0] min-w-full not-italic text-aktibo-muted-on-navy text-[16px] w-[min-content]">
            <p className="leading-[1.45] mb-0">Your next chapter starts with curiosity.</p>
            <p className="leading-[1.45]">Take a look at the courses on AKTIBO.</p>
          </div>
          <div className="flex flex-col items-start pt-[14px] w-[188px]">
            <Link
              to="/register"
              className="bg-aktibo-gold cursor-pointer flex h-[52px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[188px] font-sans font-semibold text-[16px] whitespace-nowrap"
            >
              <p className="leading-[1.45] mb-0 text-left text-aktibo-navy">Explore courses</p>
            </Link>
          </div>
        </div>
        <div className="bg-aktibo-canvas flex flex-col gap-[16px] items-start overflow-clip pb-[32px] pl-[32px] pr-[315px] pt-[28px] relative rounded-[16px] w-[632px]">
          <p className="font-sans font-bold text-aktibo-muted text-[11px] whitespace-nowrap">
            FIND YOUR FIT
          </p>
          <div className="flex flex-col items-start pt-[2px] w-[248px]">
            <div className="font-sans font-semibold leading-[0] not-italic text-aktibo-navy-deep text-[34px] whitespace-nowrap w-[min-content]">
              <p className="leading-[1.45] mb-0">Your goals.</p>
              <p className="leading-[1.45]">Your next step.</p>
            </div>
          </div>
          <div className="font-sans leading-[0] min-w-full not-italic text-aktibo-muted text-[16px] w-[min-content]">
            <p className="leading-[1.45] mb-0">Review pricing before you get started</p>
            <p className="leading-[1.45]">and choose what works for you.</p>
          </div>
          <div className="flex flex-col items-start pt-[14px] w-[174px]">
            <Link
              to="/pricing"
              className="bg-aktibo-surface border border-aktibo-border border-solid cursor-pointer flex h-[52px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[174px] font-sans font-semibold text-[16px] whitespace-nowrap"
            >
              <p className="leading-[1.45] mb-0 text-left text-aktibo-navy">View pricing</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Common questions */}
      <section
        className="w-full max-w-[1440px] mx-auto px-[72px] bg-aktibo-canvas py-[56px]"
      >
        <div className="flex gap-[247px] items-start relative w-full">
          <div className="flex items-start pt-[4px] w-[217px]">
            <div className="flex flex-col gap-[15px] items-start w-[217px]">
              <p className="font-sans font-bold text-aktibo-muted text-[12px] whitespace-nowrap">
                A LITTLE CLARITY
              </p>
              <div className="font-sans font-semibold leading-[0] not-italic text-aktibo-navy-deep text-[38px] whitespace-nowrap">
                <p className="leading-[1.45] mb-0">Before you</p>
                <p className="leading-[1.45]">get started.</p>
              </div>
              <div className="flex flex-col items-start pt-[3px] w-full">
                <div className="font-sans leading-[0] not-italic text-aktibo-muted text-[17px] whitespace-nowrap">
                  <p className="leading-[1.45] mb-0">A few helpful answers for</p>
                  <p className="leading-[1.45]">your first steps on AKTIBO.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="cursor-pointer flex flex-col items-start relative w-[832px]">
            <Link
              className="flex flex-col gap-[10px] items-start overflow-clip pb-[40px] pr-[32px] pt-[10px] w-full"
              to="/register"
            >
              <p className="font-sans font-semibold text-aktibo-navy-deep text-[20px] text-left whitespace-nowrap">
                How do I get started?
              </p>
              <p className="font-sans text-aktibo-muted text-[16px] text-left">
                Choose Create an account, then complete your registration.
              </p>
              <div className="absolute bg-aktibo-border h-px left-0 top-[110px] w-[832px]" />
            </Link>
            <Link
              className="flex flex-col gap-[10px] items-start overflow-clip pb-[40px] pr-[32px] pt-[10px] w-full"
              to="/login"
            >
              <p className="font-sans font-semibold text-aktibo-navy-deep text-[20px] text-left whitespace-nowrap">
                Already have an account?
              </p>
              <p className="font-sans text-aktibo-muted text-[16px] text-left">
                Use Log in to return to your AKTIBO account.
              </p>
              <div className="absolute bg-aktibo-border h-px left-0 top-[110px] w-[832px]" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-start pl-[464px] w-full">
          <Link
            className="cursor-pointer flex flex-col gap-[10px] items-start leading-[1.45] not-italic overflow-clip pb-[40px] pr-[32px] pt-[10px] text-left w-[832px]"
            to="/forgot-password"
          >
            <p className="font-sans font-semibold text-aktibo-navy-deep text-[20px] whitespace-nowrap">
              What if I forget my password?
            </p>
            <p className="font-sans text-aktibo-muted text-[16px]">
              Choose Forgot Password on the login page to request a reset link.
            </p>
          </Link>
        </div>
      </section>

      {/* Get started */}
      <section
        className="w-full max-w-[1440px] mx-auto px-[72px] bg-aktibo-navy pt-[52px] pb-[107px]"
      >
        <p className="font-sans font-bold text-aktibo-gold text-[12px] whitespace-nowrap">
          YOUR NEXT CHAPTER
        </p>
        <div className="flex flex-col items-start pt-[3px] w-full">
          <div className="flex gap-[525px] items-start relative w-[1296px]">
            <p className="font-sans font-bold text-[44px] text-white w-[483px]">
              Start small. Go further.
            </p>
            <div className="flex items-start pt-[8px] w-[288px]">
              <Link
                to="/register"
                className="bg-aktibo-gold cursor-pointer flex h-[56px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[288px] font-sans font-semibold text-[16px] whitespace-nowrap"
              >
                <p className="leading-[1.45] mb-0 text-left text-aktibo-navy">
                  Create an account
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex gap-[636px] items-start relative w-[1229px] mt-[10px]">
          <p className="font-sans text-aktibo-muted-on-navy text-[18px] whitespace-nowrap">
            Make your next step a learning step with AKTIBO.
          </p>
          <div className="flex items-start pt-[9px] w-[173px]">
            <Link
              to="/login"
              className="block cursor-pointer font-sans text-aktibo-muted-on-navy text-[14px] whitespace-nowrap"
            >
              <p className="leading-[1.45]">Already registered? Log in</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer signedIn={false} />
    </div>
  )
}
