import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'

export function StudentLoopsIteration() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">
      {/* Page introduction — navy hero band */}
      <PageIntro
        breadcrumb="Loops and Iteration"
        title="for, while, and do…while Loops"
        metadata="Module 2: Programming Fundamentals • Lesson 4 of 18"
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <Card variant="surface" padded className="max-w-[768px] w-full mx-auto">
          <div className="flex flex-col gap-5">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
              LESSON CONTENT
            </p>
            <p className="font-display text-[20px] font-bold text-aktibo-navy-deep leading-snug">
              for, while, and do…while Loops
            </p>
            <p className="text-[14px] text-aktibo-muted leading-relaxed">
              Loops let you run a block of code repeatedly. JavaScript offers several loop types
              depending on your use case.
            </p>

            <pre className="mt-5 bg-aktibo-canvas border border-aktibo-border rounded-field p-4 p-5 text-[13px] font-sans text-aktibo-navy-deep whitespace-pre overflow-x-auto">
              {`// for loop
	for (let i = 0; i < 5; i++) {
	  console.log(i);
	}

	// while loop
	let i = 0;
	while (i < 5) {
	  console.log(i);
	  i++;
	}`}
            </pre>

            <div className="mt-5 flex flex-col gap-2">
              <p className="font-display text-[11px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                PRACTICE: WRITE A LOOP
              </p>
              <textarea
                rows={3}
                className="w-full h-24 rounded-field border bg-aktibo-surface font-sans text-aktibo-ink placeholder:text-aktibo-muted/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-aktibo-gold focus:ring-offset-1 border-aktibo-border hover:border-aktibo-border-strong focus:border-aktibo-gold px-4 py-3 text-[15px]"
                placeholder="Write a loop that prints numbers 1 to 5..."
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
                MARK COMPLETE
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
