import { Link } from 'react-router-dom'
import { Navbar } from '../../components/ui/Navbar'
import { SiteFooter } from '../../components/ui/SiteFooter'

const GOLD_BUTTON =
  'h-11 rounded-[9px] border border-[#000e53] bg-aktif-gold px-[10px] py-[10px] font-display text-[11px] font-bold text-aktif-navy flex items-center justify-center'

const MODULES = [
  { label: '01', title: 'Variables and Data Types', status: 'Completed' },
  { label: '02', title: 'Operators and Expressions', status: 'Completed' },
  { label: '03', title: 'Conditional Statements', status: 'Completed' },
  { label: '04', title: 'Loops and Iteration', status: 'In progress' },
]

/**
 * Figma frame 142:207 — "Student · Loops and iteration".
 *
 * Reproduces the frame's composition: page shell, the "Module navigation" sidebar
 * (module outline with statuses), and the workspace row containing the "Short
 * reading lesson", "Embedded coding activity" (editor, output pane, run control)
 * and "Immediate practice feedback" (quick check). The code execution and quiz
 * result are prototype content only — the backend has no lesson, quiz or progress
 * endpoint, so nothing is run, saved or marked complete here.
 *
 * Layout is responsive: the sidebar stacks above the workspace on narrow
 * viewports so nothing overflows horizontally.
 */
export function PrototypeLoopsIteration() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/courses" />

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start gap-6 px-6 pt-8 lg:px-[72px]">
        <section className="flex w-full flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px]">
          <p className="font-display text-[10px] font-bold text-aktif-gold">
            CS101 / PROGRAMMING FUNDAMENTALS / MODULE 04
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:gap-4 w-full gap-4">
            <h1 className="font-['Castoro_Titling'] text-[36px] leading-[1.2] text-text-inverse">
              Loops and iteration
            </h1>
            <Link
              role="button"
              to="/courses/modules/complete"
              className={`${GOLD_BUTTON} w-full shrink-0 lg:w-[264px]`}
            >
              MARK COMPLETE
            </Link>
          </div>
          <p className="font-display text-[13px] text-[#d1d8ee]">
            25 min · Reading · Python activity · Quick check
          </p>
        </section>

        <section className="flex w-full gap-[32px] flex-col xl:flex-row">
          {/* Module navigation sidebar */}
          <aside
            className="relative flex flex-col gap-[12px] w-full shrink-0 lg:w-[312px] min-w-0 rounded-[16px] border border-[#dee4ee] border-solid bg-surface-white pb-[68px] pt-[22px] px-[16px]"
          >
            <div className="flex flex-col items-start pl-[8px] w-[80px]">
              <p className="font-display text-[12px] font-bold text-aktif-navy whitespace-nowrap">
                MODULES
              </p>
            </div>
            <div className="flex flex-col items-start pl-[8px] pt-[4px] w-[143px]">
              <div className="font-display text-[15px] font-bold text-text-primary whitespace-nowrap leading-[1.5]">
                <p className="mb-0">Programming</p>
                <p>Fundamentals</p>
              </div>
            </div>
            <div className="flex flex-col items-start pt-[12px] w-full min-w-0">
              {MODULES.map((module) => (
                <div
                  key={module.label}
                  className={`flex flex-col gap-[24px] items-start overflow-clip pb-[13px] pt-[12px] px-[12px] w-full min-w-0 ${
                    module.status === 'In progress' ? 'bg-[#fff4cd]' : 'bg-surface-white'
                  } border border-[#dee4ee] border-solid rounded-[9px]`}
                >
                  <div className="flex gap-[20px] items-start w-full min-w-0">
                    <div className="flex items-start pt-[3px] shrink-0 w-[16px]">
                      <p className="font-display text-[11px] font-bold text-text-secondary whitespace-nowrap leading-[1.5]">
                        {module.label}
                      </p>
                    </div>
                    <div className="font-display text-[12px] font-bold text-text-primary leading-[1.5] min-w-0">
                      {module.title}
                    </div>
                  </div>
                  <div className="flex flex-col items-start pl-[36px] shrink-0 w-[107px]">
                    <p className={`font-display text-[10px] leading-[1.5] whitespace-nowrap ${
                      module.status === 'Completed' ? 'text-[#236543]' : 'text-text-secondary'
                    }`}>
                      {module.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start pl-[8px] pt-[40px] w-[123px]">
              <p className="font-display text-[10px] font-bold text-text-secondary whitespace-nowrap">
                ACTIVITY CHECKS
              </p>
            </div>
            <div className="flex flex-col items-start pl-[8px] pt-[5px] w-full min-w-0 lg:w-[272px] lg:shrink-0">
              <p className="font-display text-[11px] text-[#236543] leading-[1.5] whitespace-pre-wrap w-full min-w-0">
                Reading reviewed
                {' '}
                Code passed · Quiz correct
              </p>
            </div>
          </aside>

          <div className="flex-1 w-full min-w-0 flex flex-col gap-[24px] lg:w-[952px]">
            <article className="rounded-[16px] border border-[#dee4ee] border-solid bg-surface-white pb-[43px] pt-[18px] px-[24px] h-[176px] w-full min-w-0">
              <p className="font-display text-[10px] font-bold text-text-secondary whitespace-nowrap">
                01 / READ
              </p>
              <h2 className="font-display text-[20px] font-bold text-text-primary">
                Repeat actions with a loop
              </h2>
              <div className="flex flex-col items-start pt-[2px] w-full min-w-0">
                <p className="font-display text-[14px] text-text-primary max-w-[904px] leading-[1.5]">
                  A for loop repeats an action for each item in a sequence. Try changing the range
                  below to control how many times the loop runs.
                </p>
              </div>
            </article>

            <article className="rounded-[16px] border border-[#dee4ee] border-solid bg-surface-white pb-[18px] pt-[12px] px-[16px] h-[322px] w-full min-w-0">
              <div className="flex flex-col items-start pl-[8px] w-full min-w-0">
                <div className="flex flex-col lg:flex-row gap-[571px] items-start lg:items-center w-full min-w-0 lg:w-[904px]">
                  <div className="flex items-start pt-[6px] shrink-0 w-full lg:w-[157px]">
                    <p className="font-display text-[11px] font-bold text-aktif-navy whitespace-pre leading-[1.5]">
                      02 / TRY IT · PYTHON
                    </p>
                  </div>
                  <Link
                    role="button"
                    to="/courses/modules/complete"
                    className={`${GOLD_BUTTON} h-full shrink-0 w-full lg:w-auto lg:w-[176px]`}
                  >
                    RUN CODE
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-start pl-[8px] w-full min-w-0">
                <p className="font-display text-[12px] text-text-secondary leading-[1.5] max-w-full">
                  Change range(3) to range(5). How many lines are printed?
                </p>
              </div>
              <div className="flex flex-col items-start pt-[8px] h-[212px] w-full min-w-0">
                <div className="flex flex-col lg:flex-row gap-[16px] h-full w-full min-w-0">
                  <div className="rounded-[10px] bg-[#071747] pb-[30px] pt-[24px] px-[20px] flex flex-col items-start overflow-clip shrink-0 lg:w-[588px] w-full min-w-0">
                    <div className="font-mono text-[16px] text-[#e9edff] leading-[30px] w-full whitespace-pre-wrap">
                      <p className="mb-0">1&nbsp;&nbsp;for number in range(3):</p>
                      <p className="mb-0">2&nbsp;&nbsp;&nbsp;&nbsp;print(number)</p>
                      <p className="mb-0">3</p>
                      <p className="mb-0">4&nbsp;&nbsp;# Repeat an action 3 times</p>
                      <p>5&nbsp;&nbsp;# Output starts at zero</p>
                    </div>
                  </div>
                  <div className="rounded-[10px] bg-[#f4f6fa] pb-[55px] pt-[20px] px-[20px] flex flex-col items-start overflow-clip shrink-0 lg:w-[316px] w-full min-w-0">
                    <p className="font-display text-[10px] font-bold text-text-secondary whitespace-nowrap">
                      OUTPUT
                    </p>
                    <div className="font-mono text-[18px] text-[#236543] leading-[1.5] whitespace-nowrap w-full min-w-0">
                      <p className="mb-0">0</p>
                      <p className="mb-0">1</p>
                      <p>2</p>
                    </div>
                    <div className="flex flex-col items-start pt-[22px] w-full min-w-0">
                      <p className="font-display text-[11px] text-text-secondary max-w-[276px]" role="status">
                        Run completed successfully.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
                This is a prototype — there is no code execution backend connected. The editor and
                output above are a static demonstration.
              </p>
            </article>

            <article className="rounded-[16px] border border-[#dee4ee] border-solid bg-surface-white pb-[22px] pt-[16px] px-[24px] h-[202px] w-full min-w-0">
              <p className="font-display text-[10px] font-bold text-text-secondary whitespace-nowrap">
                03 / QUICK CHECK
              </p>
              <h2 className="font-display text-[15px] font-bold text-text-primary whitespace-normal lg:whitespace-nowrap">
                How many times does range(3) repeat?
              </h2>
              <div className="flex flex-col items-start pt-[11px] w-full min-w-0">
                <div className="flex flex-col lg:flex-row gap-[16px] w-full min-w-0">
                  <button type="button" className="rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white flex h-full items-center justify-center shrink-0 w-full lg:w-[144px]">
                    <p className="font-display text-[12px] font-bold text-aktif-navy whitespace-nowrap leading-[1.5] text-center">
                      A · TWO
                    </p>
                  </button>
                  <button type="button" className="rounded-[9px] border border-[#236543] border-solid bg-[#e9f5ef] flex h-full items-center justify-center shrink-0 w-full lg:w-[176px]">
                    <p className="font-display text-[12px] font-bold text-aktif-navy whitespace-nowrap leading-[1.5] text-center">
                      B · THREE
                    </p>
                  </button>
                  <div className="flex items-start pl-[24px] pt-px w-full min-w-0 lg:w-[552px]">
                    <div className="font-display text-[12px] text-[#236543] leading-[1.5] w-full min-w-0 whitespace-pre-wrap">
                      <p className="mb-0">Correct. range(3) produces</p>
                      <p>three values: 0, 1, and 2.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start pt-[5px] w-full min-w-0 lg:w-[340px]">
                <p className="font-display text-[10px] text-text-secondary whitespace-pre-line leading-[1.5]">
                  Quiz result saved · Ready to mark this module complete
                </p>
              </div>
              <p className="font-display text-[12px] leading-[1.5] text-text-secondary mt-4">
                This is a prototype — no quiz result is saved and the module is not marked complete.
                There is no quiz or progress backend connected.
              </p>
            </article>
          </div>
        </section>
      </main>

      <div className="pt-8">
        <SiteFooter accountLabel="My account" accountPath="/account-profile" />
      </div>
    </div>
  )
}
