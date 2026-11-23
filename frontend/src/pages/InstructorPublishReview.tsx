import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'

export function InstructorPublishReview() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">
      {/* Page introduction — navy hero band */}
      <PageIntro
        breadcrumb="Publish Review"
        title="Review Before Publishing"
        metadata="Introduction to Computer Science"
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <Card variant="surface" padded className="max-w-[768px] w-full mx-auto">
          <div className="flex flex-col gap-5">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
              COURSE SUMMARY
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-[13px] text-aktibo-muted whitespace-nowrap">Title</p>
                <p className="text-[16px] font-bold text-aktibo-navy-deep">
                  Introduction to Computer Science
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[13px] text-aktibo-muted whitespace-nowrap">Category</p>
                <p className="text-[16px] font-bold text-aktibo-navy-deep">Computer Science</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[13px] text-aktibo-muted whitespace-nowrap">Modules</p>
                <p className="text-[16px] font-bold text-aktibo-navy-deep">5 modules • 18 lessons</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[13px] text-aktibo-muted whitespace-nowrap">
                  Practice Exercises
                </p>
                <p className="text-[16px] font-bold text-aktibo-navy-deep">6 exercises</p>
              </div>
            </div>

            <p className="mt-4 font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
              PUBLISH ACTION
            </p>
            <p className="text-[14px] text-aktibo-muted leading-relaxed">
              Publishing will make this course visible to students. You can unpublish at any time
              from your course dashboard.
            </p>

            <div className="mt-5 flex flex-col flex-row gap-3 w-full justify-end">
              <Button
                size="lg"
                fullWidth
                variant="outline"
                onClick={() => navigate('/instructor/courses')}
                className="w-auto"
              >
                GO BACK TO EDIT
              </Button>
              <Button
                size="lg"
                fullWidth
                variant="primary"
                onClick={() => navigate('/instructor/courses')}
                className="w-auto"
              >
                PUBLISH COURSE
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
