import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'

export function StudentMultimediaLesson() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">

      {/* Page introduction — navy hero band */}
      <PageIntro
        breadcrumb="Multimedia Lesson"
        title="Introduction to Computer Science"
        metadata="Module 2: Programming Fundamentals • Lesson 5 of 18"
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <div className="flex flex-col gap-5 w-full">
          {/* Video player area */}
          <Card variant="surface" padded className="w-full">
            <div className="flex flex-col gap-4">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                VIDEO LESSON
              </p>
              <p className="font-display text-[20px] font-bold text-aktibo-navy-deep">
                Control Structures in JavaScript
              </p>
              <p className="text-[14px] text-aktibo-muted leading-relaxed">
                Watch the video below to learn about if statements, loops, and how control flow works in JavaScript.
              </p>
              <div className="mt-4 flex items-center justify-center rounded-control border border-aktibo-border bg-aktibo-canvas min-h-[256px]">
                <p className="text-[14px] text-aktibo-muted font-sans">Video placeholder</p>
              </div>
            </div>
          </Card>

          {/* Lesson actions */}
          <div className="flex flex-col flex-row gap-3 w-full justify-end">
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
              MARK LESSON COMPLETE
            </Button>
          </div>
        </div>
      </main>

    </div>
  )
}
