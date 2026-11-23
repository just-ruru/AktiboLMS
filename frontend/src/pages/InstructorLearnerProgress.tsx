import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'

export function InstructorLearnerProgress() {
  const navigate = useNavigate()

  const learners = [
    { name: 'Hoshimi Miyabi', progress: 100, status: 'Completed' },
    { name: 'Alex Rivera', progress: 85, status: 'In Progress' },
    { name: 'Jordan Kim', progress: 60, status: 'In Progress' },
    { name: 'Sam Wilson', progress: 25, status: 'Started' },
  ]

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">

      {/* Page introduction — navy hero band */}
      <PageIntro
        breadcrumb="Instructors / Learner Progress"
        title="Course Learners"
        metadata="Introduction to Computer Science • 42 enrolled learners"
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <div className="flex flex-col gap-5 w-full">
          <Card variant="surface" padded className="w-full">
            <div className="flex flex-col gap-4">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                LEARNER LIST
              </p>

              <div className="overflow-x-auto border border-aktibo-border rounded-card">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-aktibo-canvas">
                      <th className="pb-3 px-4 text-[12px] font-display font-bold text-aktibo-muted whitespace-nowrap">
                        Learner
                      </th>
                      <th className="pb-3 px-4 text-[12px] font-display font-bold text-aktibo-muted whitespace-nowrap">
                        Progress
                      </th>
                      <th className="pb-3 px-4 text-[12px] font-display font-bold text-aktibo-muted whitespace-nowrap">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {learners.map((learner) => (
                      <tr
                        key={learner.name}
                        className="border-b border-aktibo-border hover:bg-aktibo-canvas/50 transition-colors duration-200"
                      >
                        <td className="py-4 px-4 text-[13px] text-aktibo-navy-deep">
                          {learner.name}
                        </td>
                        <td className="py-4 px-4 text-[13px] text-aktibo-navy-deep">
                          {learner.progress}%
                        </td>
                        <td className="py-4 px-4 text-[13px] font-bold">
                          {learner.status === 'Completed' ? (
                            <span className="text-aktibo-success-fg">Completed</span>
                          ) : learner.status === 'In Progress' ? (
                            <span className="text-aktibo-warning-fg">In Progress</span>
                          ) : (
                            <span className="text-aktibo-info-fg">Started</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          <div className="flex flex-col flex-row gap-3 w-full">
            <Button
              size="lg"
              fullWidth
              variant="primary"
              onClick={() => navigate('/instructor/courses')}
              className="w-auto"
            >
              EXPORT REPORT
            </Button>
            <Button
              size="lg"
              fullWidth
              variant="outline"
              onClick={() => navigate('/instructor/courses')}
              className="w-auto"
            >
              BACK TO COURSES
            </Button>
          </div>
        </div>
      </main>

    </div>
  )
}
