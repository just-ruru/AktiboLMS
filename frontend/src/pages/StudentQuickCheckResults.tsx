import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'

export function StudentQuickCheckResults() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">
      {/* Page introduction — navy hero band */}
      <PageIntro
        breadcrumb="Quick Check Results"
        title="Quick Check Complete"
        metadata="Module 3: Data Structures • Quick Check 3 of 5"
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <Card variant="surface" padded className="max-w-[768px] w-full mx-auto">
          <div className="flex flex-col gap-5">
            {/* Result banner */}
            <div className="bg-aktibo-success-bg border border-aktibo-success-fg rounded-control p-4 p-5 flex items-center justify-center gap-3">
              <p className="font-display font-bold text-aktibo-success-fg text-[18px] whitespace-nowrap text-center">
                ✅ 4 out of 5 Correct
              </p>
            </div>

            {/* Score */}
            <div className="flex flex-col gap-2">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                YOUR SCORE
              </p>
              <p className="font-display text-[32px] font-bold text-aktibo-navy-deep">
                80%
              </p>
            </div>

            {/* Progress bar */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-2 bg-aktibo-border rounded-full overflow-hidden">
                <div className="h-full bg-aktibo-gold w-[80%]" />
              </div>
              <p className="shrink-0 text-[12px] font-display font-bold text-aktibo-navy-deep">
                80%
              </p>
            </div>

            {/* Review answers */}
            <div className="mt-5 flex flex-col gap-3">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                REVIEW YOUR ANSWERS
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <p className="text-[14px] text-aktibo-navy-deep font-sans">
                    Q1. What is an array?
                  </p>
                  <p className="text-[14px] font-sans text-aktibo-success-fg">
                    ✅ Correct
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[14px] text-aktibo-navy-deep font-sans">
                    Q2. How do you add an element to an array?
                  </p>
                  <p className="text-[14px] font-sans text-aktibo-danger-fg">
                    ❌ Incorrect — answer: .push()
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col flex-row gap-3 w-full justify-end">
              <Button
                size="lg"
                fullWidth
                variant="outline"
                onClick={() => navigate('/student/courses')}
                className="w-auto"
              >
                BACK TO COURSES
              </Button>
              <Button
                size="lg"
                fullWidth
                variant="primary"
                onClick={() => navigate('/student/courses')}
                className="w-auto"
              >
                RETRY QUICK CHECK
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
