import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../../components/ui/Navbar'
import { SiteFooter } from '../../components/ui/SiteFooter'

interface Answer {
  label: string
  text: string
}

const ANSWERS: Answer[] = [
  { label: 'A', text: 'Newer information is always correct.' },
  { label: 'B', text: 'The date helps you decide whether the information is still relevant.' },
  { label: 'C', text: 'Older sources never contain useful information.' },
]

const GOLD_BUTTON =
  'h-11 rounded-[9px] border border-[#000e53] bg-aktif-gold px-[10px] py-[10px] font-display text-[11px] font-bold text-aktif-navy flex items-center justify-center'

/**
 * Figma frame 142:3 — "Student · Final practice question".
 *
 * Reproduces the frame's composition: page shell (Navbar, page-introduction band,
 * workspace, SiteFooter), the "Final practice question" panel (question label,
 * question, instruction, answer options) and the "Practice completion guidance"
 * panel. The attempt, grade and submission are prototype content only — the
 * backend has no practice or quiz endpoint, so nothing is saved or graded here.
 */
export function PrototypeFinalPractice() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/courses" />

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start gap-6 px-6 pt-8 lg:px-[72px]">
        <section className="flex w-full flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px]">
          <p className="font-display text-[10px] font-bold text-aktif-gold">
            CS101 / DIGITAL CITIZENSHIP / MODULE 02
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:gap-4 w-full gap-4">
            <h1 className="font-['Castoro_Titling'] text-[26px] leading-[1.2] text-text-inverse sm:text-[30px] lg:text-[36px]">
              Check your understanding
            </h1>
            <Link
              role="button"
              to="/courses/lessons"
              className={`${GOLD_BUTTON} w-full max-w-[264px] shrink-0`}
            >
              BACK TO LESSON
            </Link>
          </div>
          <p className="font-display text-[13px] text-[#d1d8ee]">
            Question 3 of 3 · Select an answer to finish your quick check
          </p>
        </section>

        <section className="flex w-full flex-col gap-[24px]">
          <article
            className="rounded-[8px] border border-[#dfe5f0] border-solid bg-surface-white p-[24px] w-full"
          >
            <p className="font-display text-[11px] font-bold text-text-secondary">
              QUESTION 03 / 03 · SINGLE ANSWER
            </p>
            <h2 className="font-display text-[27px] font-bold leading-[1.5] text-aktif-navy">
              Why should you check when a source was published?
            </h2>
            <p className="font-display text-[14px] leading-[1.5] text-text-primary">
              Choose the statement that best describes how a publication date helps you evaluate
              information.
            </p>
            <div className="flex flex-col gap-4 mt-6">
              {ANSWERS.map((answer) => {
                const pressed = selected === answer.label
                return (
                  <button
                    key={answer.label}
                    type="button"
                    aria-pressed={pressed}
                    aria-checked={pressed}
                    onClick={() => setSelected(answer.label)}
                    className={`flex h-[72px] rounded-[8px] bg-[#f4f6fa] px-[20px] py-[20px] font-display text-[14px] font-bold text-text-primary ${pressed ? 'ring-2 ring-aktif-gold' : ''}`}
                  >
                    {answer.label}  {answer.text}
                  </button>
                )
              })}
            </div>
            {selected && (
              <p className="mt-4 font-display text-[12px] leading-[1.5] text-text-secondary">
                Answer {selected} selected. This is a prototype — no answer is saved to a backend.
              </p>
            )}
          </article>

          <article
            className="rounded-[8px] border border-[#dfe5f0] border-solid bg-[#fff4cd] p-[24px] w-full"
          >
            <h3 className="font-display text-[20px] font-bold text-aktif-navy">
              One last check. Then make it a habit.
            </h3>
            <p className="font-display text-[14px] leading-[1.5] text-text-primary">
              A reliable source is not defined by one clue. Check the author, follow the evidence,
              and consider the date together.
            </p>
            <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
              This is a prototype — no practice attempt was submitted, no answer was graded, and no
              score was recorded. There is no practice or quiz backend connected.
            </p>
          </article>
        </section>
      </main>

      <div className="pt-8">
        <SiteFooter accountLabel="My account" accountPath="/account-profile" />
      </div>
    </div>
  )
}
