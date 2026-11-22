import { useState } from 'react'
import { PageIntro } from '../components/ui/PageIntro'
import { TabsBar } from '../components/ui/TabsBar'
import { StatCard } from '../components/ui/StatCard'
import { ProgressBar } from '../components/ui/ProgressBar'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'history', label: 'Activity history' },
  { id: 'quizzes', label: 'Quiz results' },
]

const COURSES = [
  { name: 'Introduction to Computing', percent: 33, detail: '4 of 12 modules' },
  { name: 'Web Development', percent: 20, detail: '2 of 10 modules' },
  { name: 'Data Structures & Algorithms', percent: 0, detail: '0 of 14 modules' },
]

export function StudentProgress() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="flex min-h-screen w-full flex-col bg-aktibo-canvas animate-page-fade">

      <PageIntro
        breadcrumb="My account / Learning progress"
        title="Learning progress"
        metadata="Your activity across all enrolled courses"
      />

      <main className="mx-auto w-full max-w-[1296px] flex-1 px-6 py-8 sm:px-10 lg:px-[72px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <TabsBar tabs={TABS} activeId={activeTab} onChange={setActiveTab} />
          <p className="rounded-[9px] border border-aktibo-border bg-aktibo-surface px-4 py-2 text-[12px] font-display font-bold text-aktibo-navy">
            ALL COURSES · THIS WEEK
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard value="6 / 30" label="Modules complete" />
          <StatCard value="80%" label="Quick check average" tone="success" />
          <StatCard value="5" label="Practice completed" tone="info" />
          <StatCard value="2h 15m" label="Learning time" tone="gold" />
        </div>

        <section className="mt-8 rounded-[16px] border border-aktibo-border bg-aktibo-surface p-6 shadow-card">
          <h2 className="font-display text-[18px] font-bold text-aktibo-navy-deep">Your courses</h2>
          <div className="mt-5 flex flex-col gap-6">
            {COURSES.map((course) => (
              <div key={course.name}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[14px] font-bold text-aktibo-navy-deep">
                    {course.name}
                  </h3>
                  <span className="font-display text-[14px] font-bold text-aktibo-navy-deep">
                    {course.percent}%
                  </span>
                </div>
                <ProgressBar value={course.percent} className="mt-2" showValue={false} />
                <p className="mt-1 text-[11px] text-aktibo-muted">{course.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

    </div>
  )
}
