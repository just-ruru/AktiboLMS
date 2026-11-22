import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageIntro } from '../components/ui/PageIntro'
import { TabsBar } from '../components/ui/TabsBar'
import { SubjectSidebar } from '../components/ui/SubjectSidebar'
import { ModuleRow, type ModuleStatus } from '../components/ui/ModuleRow'
import { Button } from '../components/ui/Button'

const SIDEBAR_SUBJECTS = [
  { name: 'Programming Fundamentals', completion: '50% complete · 2 of 4 modules' },
  { name: 'Computer Systems', completion: '25% complete · 1 of 4 modules' },
  { name: 'Digital Citizenship', completion: 'Not started' },
]

const MODULES: { number: string; title: string; activityTypes: string; status: ModuleStatus; action: string }[] = [
  { number: '01', title: 'Getting started with code', activityTypes: 'Lesson · Video · Quiz', status: 'Completed', action: 'REVIEW' },
  { number: '02', title: 'Variables and data types', activityTypes: 'Lesson · Practice · Quiz', status: 'Completed', action: 'REVIEW' },
  { number: '03', title: 'Loops and iteration', activityTypes: 'Interactive lesson · Practice', status: 'In progress', action: 'CONTINUE' },
  { number: '04', title: 'Functions in practice', activityTypes: 'Lesson · Practice · Final quiz', status: 'Not started', action: 'START' },
]

const TABS = [
  { id: 'subjects', label: 'Subjects · 3' },
  { id: 'modules', label: 'Modules · 12' },
  { id: 'activity', label: 'Activity' },
]

export function StudentModules() {
  const [activeTab, setActiveTab] = useState('modules')
  const [activeSubject, setActiveSubject] = useState(0)
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen w-full flex-col bg-aktibo-canvas animate-page-fade">

      <PageIntro
        breadcrumb="Courses / CS101 / Programming Fundamentals"
        title="Programming Fundamentals"
        metadata="4 modules · 12 lessons · 50% complete"
        action={
          <Button
            variant="primary"
            className="h-[48px] w-full rounded-[9px] bg-aktibo-gold text-[12px] text-aktibo-ink-on-gold sm:w-[264px]"
            onClick={() => navigate('/student/courses/CS101/subjects/1/modules/3/lesson')}
          >
            RESUME LEARNING
          </Button>
        }
      />

      <main className="mx-auto w-full max-w-[1296px] flex-1 px-6 py-8 sm:px-10 lg:px-[72px]">
        <TabsBar tabs={TABS} activeId={activeTab} onChange={setActiveTab} />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          <SubjectSidebar
            heading="COURSE SUBJECTS"
            subjects={SIDEBAR_SUBJECTS}
            activeIndex={activeSubject}
            onSelect={setActiveSubject}
          />

          <section className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2 rounded-[16px] border border-aktibo-border bg-aktibo-surface px-6 py-4 shadow-card">
              <div>
                <h2 className="font-display text-[18px] font-bold text-aktibo-navy-deep">
                  Programming Fundamentals
                </h2>
                <p className="mt-1 text-[12px] text-aktibo-muted">4 modules · 12 lessons</p>
              </div>
              <p className="font-display text-[20px] font-bold text-aktibo-navy-deep">50%</p>
            </div>

            <div className="mt-4 flex flex-col gap-4">
              {MODULES.map((module) => (
                <ModuleRow
                  key={module.number}
                  number={module.number}
                  title={module.title}
                  activityTypes={module.activityTypes}
                  status={module.status}
                  actionLabel={module.action}
                  onAction={() => navigate('/student/courses/CS101/subjects/1/modules/' + module.number + '/lesson')}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

    </div>
  )
}
