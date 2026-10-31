export interface User {
  id: string
  email: string
  fullName: string
  role: 'student' | 'instructor'
  avatarUrl?: string
  createdAt: string
}

export interface Course {
  id: string
  title: string
  description: string
  thumbnailUrl?: string
  instructorId: string
  instructor?: User
  published: boolean
  modules: Module[]
  enrolledCount?: number
  progress?: number
  createdAt: string
  updatedAt: string
}

export interface Module {
  id: string
  courseId: string
  title: string
  description?: string
  orderIndex: number
  lessons: Lesson[]
  createdAt: string
}

export interface Lesson {
  id: string
  moduleId: string
  title: string
  description?: string
  orderIndex: number
  contentBlocks: ContentBlock[]
  activities: Activity[]
  createdAt: string
}

export interface ContentBlock {
  id: string
  lessonId: string
  type: 'text' | 'video' | 'image' | 'code_snippet'
  content: ContentBlockContent
  orderIndex: number
}

export interface ContentBlockContent {
  text?: string
  videoUrl?: string
  imageUrl?: string
  language?: string
  code?: string
}

export interface Activity {
  id: string
  lessonId: string
  type: 'code_exercise' | 'quiz'
  config: ActivityConfig
  orderIndex: number
  points: number
  progress?: ActivityProgress
}

export interface ActivityConfig {
  // Code exercise
  language?: string
  starterCode?: string
  solutionCode?: string
  testCases?: TestCase[]

  // Quiz
  questions?: QuizQuestion[]
}

export interface TestCase {
  input: string
  expectedOutput: string
  hidden?: boolean
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export interface ActivityProgress {
  id: string
  userId: string
  activityId: string
  status: 'not_started' | 'in_progress' | 'submitted' | 'completed'
  score?: number
  submittedAt?: string
  completedAt?: string
}

export interface CodeSubmission {
  id: string
  userId: string
  activityId: string
  code: string
  language: string
  output?: string
  passed?: boolean
  executionTimeMs?: number
  createdAt: string
}

export interface QuizAttempt {
  id: string
  userId: string
  activityId: string
  answers: number[]
  score: number
  passed: boolean
  createdAt: string
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  course?: Course
  enrolledAt: string
  completedAt?: string
}

export interface CourseAnalytics {
  courseId: string
  totalEnrollments: number
  completionRate: number
  averageScore: number
  activityStats: ActivityAnalytics[]
}

export interface ActivityAnalytics {
  activityId: string
  activityTitle: string
  activityType: 'code_exercise' | 'quiz'
  attempts: number
  completions: number
  averageScore: number
  commonFailures: string[]
}

export interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  currentPage: number
  pageSize: number
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}