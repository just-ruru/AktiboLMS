import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'

export function StudentFinalPracticeQuestion() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">
      {/* Page introduction — navy hero band */}
      <PageIntro
        breadcrumb="Final Practice Question"
        title="Capstone Practice"
        metadata="Module 4: Final Review • Question 10 of 10"
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <Card variant="surface" padded className="max-w-[768px] w-full mx-auto">
          <div className="flex flex-col gap-5">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
              FINAL QUESTION
            </p>
            <p className="font-display text-[20px] font-bold text-aktibo-navy-deep leading-snug">
              What will the following code output?
            </p>
            <pre className="mt-4 bg-aktibo-canvas border border-aktibo-border rounded-field p-4 p-5 text-[14px] font-sans text-aktibo-navy-deep whitespace-pre overflow-x-auto">
              {`for (let i = 0; i &lt; 3; i++) {
  console.log(i);
}`}
</pre>
            <div className="mt-5 flex flex-col gap-2">
              <p className="font-display text-[11px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                TYPE YOUR ANSWER
              </p>
              <textarea
                rows={3}
                className="w-full h-24 rounded-field border bg-aktibo-surface font-sans text-aktibo-ink placeholder:text-aktibo-muted/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-aktibo-gold focus:ring-offset-1 border-aktibo-border hover:border-aktibo-border-strong focus:border-aktibo-gold px-4 py-3 text-[15px]"
                placeholder="e.g. 0 1 2"
              />
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
                SUBMIT ANSWER
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
