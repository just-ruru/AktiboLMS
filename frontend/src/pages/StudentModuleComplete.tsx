import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'

export function StudentModuleComplete() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">

      {/* Page introduction — navy hero band */}
      <PageIntro
        breadcrumb="CS101 / Programming Fundamentals / Module 03"
        title="Module complete"
        metadata="Conditional Statements · Your activities and results have been saved."
        action={
          <Button
            size="lg"
            fullWidth
            variant="primary"
            onClick={() => navigate('/student/modules')}
            className="w-auto"
          >
            BACK TO MODULES
          </Button>
        }
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <div className="flex flex-col gap-6 w-full">
          {/* Completed + saved card */}
          <Card variant="surface" padded className="w-full">
            <div className="flex flex-col gap-4">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                COMPLETED & SAVED
              </p>
              <p className="font-titling text-[27px] font-bold text-aktibo-navy-deep leading-snug">
                One more concept put into practice.
              </p>
              <p className="text-[14px] text-aktibo-ink leading-relaxed">
                You completed Conditional Statements. You can now choose between if and else branches and test your decisions in Python.
              </p>
              <div className="mt-4 flex flex-col flex-row gap-3 w-full">
                <Button
                  size="lg"
                  fullWidth
                  variant="primary"
                  onClick={() => navigate('/student/loops-iteration')}
                  className="w-auto"
                >
                  CONTINUE TO LOOPS
                </Button>
                <Button
                  size="lg"
                  fullWidth
                  variant="outline"
                  onClick={() => navigate('/student/lesson')}
                  className="w-auto"
                >
                  REVIEW THIS LESSON
                </Button>
              </div>
            </div>
          </Card>

          {/* Result stat cards */}
          <div className="grid grid-cols-1 gap-4 grid-cols-3 w-full">
            <Card variant="surface" padded className="p-5 p-6 w-full">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                READING
              </p>
              <p className="mt-1 font-display text-[21px] font-bold text-aktibo-success-fg">
                Reviewed
              </p>
              <p className="mt-1 text-[11px] text-aktibo-muted">Choose what happens next</p>
            </Card>
            <Card variant="surface" padded className="p-5 p-6 w-full">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                PYTHON ACTIVITY
              </p>
              <p className="mt-1 font-display text-[21px] font-bold text-aktibo-success-fg">
                Passed
              </p>
              <p className="mt-1 text-[11px] text-aktibo-muted">Program executed successfully</p>
            </Card>
            <Card variant="surface" padded className="p-5 p-6 w-full">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                QUICK CHECK
              </p>
              <p className="mt-1 font-display text-[21px] font-bold text-aktibo-success-fg">
                1 / 1 correct
              </p>
              <p className="mt-1 text-[11px] text-aktibo-muted">Result saved to your progress</p>
            </Card>
          </div>

          {/* Progress + Up next */}
          <div className="mt-6 grid gap-6 grid-cols-[1fr_1fr] w-full">
            <Card variant="surface" padded className="p-6 p-8 w-full">
              <div className="flex flex-col gap-3">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                  INTRODUCTION TO COMPUTING
                </p>
                <p className="font-display text-[19px] font-bold text-aktibo-navy-deep">
                  Your progress is moving forward
                </p>
                <p className="font-titling text-[22px] font-bold text-aktibo-navy-deep">
                  5 / 12 modules complete
                </p>
                <div className="mt-3 h-2 w-full bg-aktibo-border-strong rounded-full overflow-hidden">
                  <div className="h-full bg-aktibo-gold" style={{ width: '42%' }} />
                </div>
                <p className="mt-2 text-[11px] text-aktibo-muted">
                  42% completed · Previously 4 of 12
                </p>
                <div className="mt-4 rounded-card border border-aktibo-border bg-aktibo-canvas p-4">
                  <p className="font-display text-[13px] font-bold text-aktibo-navy-deep">
                    Programming Fundamentals
                  </p>
                  <p className="mt-1 text-[12px] text-aktibo-muted">
                    3 of 4 modules complete · 75%
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="surface" padded className="p-6 p-8 w-full">
              <div className="flex flex-col gap-3">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                  UP NEXT / Module 04
                </p>
                <p className="font-titling text-[22px] font-bold text-aktibo-navy-deep leading-snug">
                  Loops and Iteration
                </p>
                <p className="text-[13px] text-aktibo-ink leading-relaxed">
                  Learn how to repeat actions without repeating your work. Try your first for loop in an embedded coding activity.
                </p>
                <p className="mt-2 text-[11px] text-aktibo-muted">
                  25 min · Reading · Python activity
                </p>
                <div className="mt-4 flex flex-col gap-3 w-full">
                  <Button
                    size="lg"
                    fullWidth
                    variant="primary"
                    onClick={() => navigate('/student/loops-iteration')}
                    className="w-auto"
                  >
                    START NEXT MODULE
                  </Button>
                  <p className="text-[10px] text-aktibo-muted whitespace-normal">
                    Your current lesson remains available to review.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

    </div>
  )
}
