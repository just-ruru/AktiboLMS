import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageIntro } from '../components/ui/PageIntro'
import { TabsBar } from '../components/ui/TabsBar'
import { SubjectSidebar } from '../components/ui/SubjectSidebar'
import { ModuleRow, type ModuleStatus } from '../components/ui/ModuleRow'
import { Button } from '../components/ui/Button'

const SIDEBAR_SUBJECTS = [
  { name: 'Programming Fundamentals', completion: '4 modules · Published' },
  { name: 'Computer Systems', completion: '4 modules · Draft' },
  { name: 'Digital Citizenship', completion: '4 modules · Draft' },
]

const MODULES: { number: string; title: string; activityTypes: string; status: ModuleStatus; action: string }[] = [
  { number: '01', title: 'Getting started with code', activityTypes: 'Lesson · Video · Quiz', status: 'Completed', action: 'EDIT MODULE' },
  { number: '02', title: 'Variables and data types', activityTypes: 'Lesson · Practice · Quiz', status: 'Completed', action: 'EDIT MODULE' },
  { number: '03', title: 'Loops and iteration', activityTypes: 'Interactive lesson · Practice', status: 'In progress', action: 'EDIT MODULE' },
  { number: '04', title: 'Functions in practice', activityTypes: 'Lesson · Practice · Final quiz', status: 'Not started', action: 'EDIT MODULE' },
]

const TABS = [
  { id: 'subjects', label: 'Subjects · 3' },
  { id: 'modules', label: 'Modules · 12' },
  { id: 'activity', label: 'Activity' },
]

export function InstructorModules() {
  const [activeTab, setActiveTab] = useState('modules')
  const [activeSubject, setActiveSubject] = useState(0)
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">

      <PageIntro
        breadcrumb="Courses / CS101 / Programming Fundamentals"
        title="Programming Fundamentals"
        metadata="4 modules · 12 lessons · Draft"
        action={
          <Button
            size="lg"
            fullWidth
            variant="primary"
            onClick={() => navigate('/instructor/courses/CS101/subjects/1/modules/new')}
            className="w-auto"
          >
            ADD MODULE
          </Button>
        }
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <TabsBar tabs={TABS} activeId={activeTab} onChange={setActiveTab} />

        <div className="mt-8 flex flex-col gap-6 flex-row">
          <SubjectSidebar
            heading="COURSE SUBJECTS"
            subjects={SIDEBAR_SUBJECTS}
            activeIndex={activeSubject}
            onSelect={setActiveSubject}
          />

          <section className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2 rounded-card border border-aktibo-border bg-aktibo-surface p-6 p-8 shadow-card">
              <div>
                <h2 className="font-display text-[18px] font-bold text-aktibo-navy-deep">
                  Programming Fundamentals
                </h2>
                <p className="mt-1 text-[12px] text-aktibo-muted">4 modules · 12 lessons · Published</p>
              </div>
              <Button size="sm" variant="secondary" onClick={() => navigate('/instructor/courses/CS101/publish')}>
                PUBLISH REVIEW
              </Button>
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
                  onAction={() => navigate('/instructor/courses/CS101/subjects/1/modules/' + module.number + '/edit')}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

    </div>
  )
}
