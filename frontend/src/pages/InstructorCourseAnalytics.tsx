import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'
import { StatCard } from '../components/ui/StatCard'

export function InstructorCourseAnalytics() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">

      {/* Page introduction — navy hero band */}
      <PageIntro
        breadcrumb="Instructors / Analytics"
        title="Introduction to Computer Science"
        metadata="Course performance overview"
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        {/* Stat cards row */}
        <div className="mt-6 grid gap-4 w-full grid-cols-3">
          <StatCard value="42" label="Total Enrollments" />
          <StatCard value="68%" label="Average Progress" />
          <StatCard value="12" label="Completed" />
        </div>

        {/* Course detail card */}
        <Card variant="surface" padded className="mt-6 w-full">
          <div className="flex flex-col gap-4">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
              COURSE DETAILS
            </p>
            <div className="grid gap-4 grid-cols-3">
              <div className="flex flex-col gap-2">
                <p className="text-[13px] text-aktibo-muted whitespace-nowrap">Instructor</p>
                <p className="text-[16px] font-bold text-aktibo-navy-deep">Dr. Sarah Chen</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[13px] text-aktibo-muted whitespace-nowrap">Status</p>
                <p className="text-[16px] font-bold text-aktibo-success-fg">Published</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[13px] text-aktibo-muted whitespace-nowrap">Last Updated</p>
                <p className="text-[16px] font-bold text-aktibo-navy-deep">Today</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6 flex flex-col flex-row gap-3 w-full justify-end">
          <Button
            size="lg"
            fullWidth
            variant="outline"
            onClick={() => navigate('/instructor/courses')}
            className="w-auto"
          >
            BACK TO COURSES
          </Button>
          <Button
            size="lg"
            fullWidth
            variant="primary"
            onClick={() => navigate('/instructor/courses')}
            className="w-auto"
          >
            VIEW LEARNERS
          </Button>
        </div>
      </main>

    </div>
  )
}
