import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'

export function StudentPracticeFeedback() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">

      {/* Page introduction — navy hero band */}
      <PageIntro
        breadcrumb="Practice Feedback"
        title="Practice Exercise Review"
        metadata="Module 2: Programming Fundamentals • Practice 2 of 6"
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <Card variant="surface" padded className="max-w-[768px] w-full mx-auto">
          <div className="flex flex-col gap-5">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
              YOUR SUBMISSION
            </p>
            <p className="font-titling text-[22px] font-bold text-aktibo-navy-deep leading-snug">
              85% — Great work!
            </p>
            <p className="text-[14px] text-aktibo-muted leading-relaxed">
              You correctly identified the output of the loop exercise. One small detail to review: off-by-one errors in the boundary condition.
            </p>

            <div className="flex flex-col gap-4">
              <div className="bg-aktibo-success-bg border border-aktibo-success-fg/30 rounded-control p-4">
                <p className="font-display text-[13px] font-bold text-aktibo-success-fg whitespace-nowrap">
                  What you got right
                </p>
                <ul className="mt-2 flex flex-col gap-2 list-disc pl-5 text-[14px] text-aktibo-muted">
                  <li>Correct loop initialization</li>
                  <li>Proper use of template literals</li>
                </ul>
              </div>

              <div className="bg-aktibo-warning-bg border border-aktibo-warning-fg/30 rounded-control p-4">
                <p className="font-display text-[13px] font-bold text-aktibo-warning-fg whitespace-nowrap">
                  Suggestion for improvement
                </p>
                <p className="mt-1 text-[14px] text-aktibo-muted leading-relaxed">
                  Watch the boundary condition — use i &lt; array.length rather than i &lt;= array.length to avoid reading past the last element.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col flex-row gap-3 w-full justify-end">
              <Button
                size="lg"
                fullWidth
                variant="outline"
                onClick={() => navigate('/student/courses')}
                className="w-auto"
              >
                BACK TO PRACTICE
              </Button>
              <Button
                size="lg"
                fullWidth
                variant="primary"
                onClick={() => navigate('/student/courses')}
                className="w-auto"
              >
                TRY AGAIN
              </Button>
            </div>
          </div>
        </Card>
      </main>

    </div>
  )
}
