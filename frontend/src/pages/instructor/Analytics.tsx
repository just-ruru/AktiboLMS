import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Users, TrendingUp, BarChart2, AlertCircle, CheckCircle } from 'lucide-react'

export function InstructorAnalytics() {
  const mockAnalytics = {
    totalStudents: 77,
    activeStudents: 45,
    completionRate: 68,
    averageScore: 82,
    totalActivities: 24,
    activitiesByType: { code: 14, quiz: 10 },
  }

  const mockActivityStats = [
    { activity: 'Variables Quiz', type: 'quiz', attempts: 45, completions: 38, avgScore: 85, commonIssue: 'Confusion between int/float' },
    { activity: 'Hello World Exercise', type: 'code', attempts: 42, completions: 40, avgScore: 95, commonIssue: 'Syntax errors in print()' },
    { activity: 'Data Types Quiz', type: 'quiz', attempts: 38, completions: 30, avgScore: 72, commonIssue: 'Boolean vs string confusion' },
    { activity: 'Control Flow Exercise', type: 'code', attempts: 35, completions: 28, avgScore: 78, commonIssue: 'Indentation errors' },
    { activity: 'Functions Quiz', type: 'quiz', attempts: 32, completions: 25, avgScore: 65, commonIssue: 'Return vs print confusion' },
    { activity: 'Lists Exercise', type: 'code', attempts: 30, completions: 22, avgScore: 70, commonIssue: 'Index out of range errors' },
  ]

  const mockStudentProgress = [
    { name: 'Alice Johnson', email: 'alice@example.com', progress: 85, avgScore: 88, lastActive: '2 hours ago', status: 'active' },
    { name: 'Bob Smith', email: 'bob@example.com', progress: 72, avgScore: 82, lastActive: '5 hours ago', status: 'active' },
    { name: 'Carol Williams', email: 'carol@example.com', progress: 45, avgScore: 75, lastActive: '2 days ago', status: 'struggling' },
    { name: 'David Brown', email: 'david@example.com', progress: 12, avgScore: 55, lastActive: '1 week ago', status: 'at_risk' },
    { name: 'Eva Martinez', email: 'eva@example.com', progress: 90, avgScore: 92, lastActive: '1 hour ago', status: 'active' },
    { name: 'Frank Lee', email: 'frank@example.com', progress: 30, avgScore: 60, lastActive: '3 days ago', status: 'struggling' },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return { variant: 'success' as const, label: 'Active' }
      case 'struggling': return { variant: 'warning' as const, label: 'Struggling' }
      case 'at_risk': return { variant: 'error' as const, label: 'At Risk' }
      default: return { variant: 'gray' as const, label: 'Unknown' }
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-fg-primary">Course Analytics</h1>
        <p className="text-fg-secondary mt-1">Track student performance and identify areas for improvement</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="bordered" accent="brand">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-fg-secondary">Total Students</p>
                <p className="text-3xl font-bold text-fg-primary">{mockAnalytics.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </div>
            </div>
          </CardBody>
        </Card>
        <Card variant="bordered" accent="success">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-fg-secondary">Active This Week</p>
                <p className="text-3xl font-bold text-fg-primary">{mockAnalytics.activeStudents}</p>
              </div>
              <div className="w-12 h-12 bg-success-50 dark:bg-success-500/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success-600 dark:text-success-500" />
              </div>
            </div>
          </CardBody>
        </Card>
        <Card variant="bordered" accent="info">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-fg-secondary">Completion Rate</p>
                <p className="text-3xl font-bold text-fg-primary">{mockAnalytics.completionRate}%</p>
              </div>
              <div className="w-12 h-12 bg-info-50 dark:bg-info-500/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-info-600 dark:text-info-500" />
              </div>
            </div>
          </CardBody>
        </Card>
        <Card variant="bordered" accent="warning">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-fg-secondary">Avg. Score</p>
                <p className="text-3xl font-bold text-fg-primary">{mockAnalytics.averageScore}%</p>
              </div>
              <div className="w-12 h-12 bg-warning-50 dark:bg-warning-500/10 rounded-xl flex items-center justify-center">
                <BarChart2 className="w-6 h-6 text-warning-600 dark:text-warning-500" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card variant="bordered">
          <CardHeader>
            <h2 className="text-lg font-semibold text-fg-primary flex items-center gap-2">
              <BarChart2 className="w-5 h-5" />
              Activity Performance
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {mockActivityStats.map((stat, index) => (
                <div key={index} className="p-4 bg-tertiary rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        stat.type === 'code' ? 'bg-brand-100 dark:bg-brand-900/30' : 'bg-warning-50 dark:bg-warning-500/10'
                      }`}>
                        {stat.type === 'code' ? (
                          <BarChart2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-warning-600 dark:text-warning-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-fg-primary">{stat.activity}</p>
                        <p className="text-sm text-fg-tertiary capitalize">{stat.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-fg-primary">{stat.avgScore}%</p>
                      <p className="text-xs text-fg-tertiary">avg score</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-fg-tertiary">
                      {stat.completions}/{stat.attempts} completed ({Math.round(stat.completions/stat.attempts*100)}%)
                    </span>
                    {stat.commonIssue && (
                      <span className="flex items-center gap-1 text-warning-600 dark:text-warning-400">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {stat.commonIssue}
                      </span>
                    )}
                  </div>
                  <div className="w-full bg-border-primary rounded-full h-2 mt-2">
                    <div
                      className="bg-brand-600 h-2 rounded-full"
                      style={{ width: `${Math.round(stat.completions/stat.attempts*100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card variant="bordered">
          <CardHeader>
            <h2 className="text-lg font-semibold text-fg-primary flex items-center gap-2">
              <Users className="w-5 h-5" />
              Student Progress
            </h2>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-primary bg-tertiary/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-fg-tertiary uppercase tracking-wider">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-fg-tertiary uppercase tracking-wider">Progress</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-fg-tertiary uppercase tracking-wider">Avg. Score</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-fg-tertiary uppercase tracking-wider">Last Active</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-fg-tertiary uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-primary">
                  {mockStudentProgress.map((student, index) => {
                    const badge = getStatusBadge(student.status)
                    return (
                      <tr key={index} className="hover:bg-tertiary/30 transition-colors">
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium text-fg-primary">{student.name}</p>
                            <p className="text-sm text-fg-tertiary">{student.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-border-primary rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  student.progress > 70 ? 'bg-success-600' : student.progress > 40 ? 'bg-warning-600' : 'bg-error-600'
                                }`}
                                style={{ width: `${student.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-fg-tertiary">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-fg-primary">{student.avgScore}%</td>
                        <td className="px-4 py-4 text-sm text-fg-tertiary">{student.lastActive}</td>
                        <td className="px-4 py-4">
                          <Badge variant={badge.variant}>{badge.label}</Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}