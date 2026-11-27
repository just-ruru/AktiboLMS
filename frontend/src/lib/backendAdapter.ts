/**
 * Backend data adapter for AKTIBO LMS.
 *
 * The real backend lives on a separate backend-only branch. This adapter
 * defines the backend contract the frontend expects. A clearly marked local
 * fixture is available for UI testing; without its explicit flag, reads are empty.
 *
 * To connect to the real backend, replace the unavailable functions in
 * `mockBackend` with calls to the backend API (e.g. fetch to the backend
 * branch's endpoint). The shape returned by `getProfile` is the contract
 * both sides must agree on.
 */

export interface Profile {
  id: number
  studentId: string
  firstName: string
  lastName: string
  email: string
  description?: string | null
  /** The service serializes the boolean as `active` (Jackson `isActive()`). */
  active: boolean
  createdAt: string
  updatedAt: string
}

/**
 * Backend contract. Implement these against the real backend branch.
 */
export interface StudentRegistrationRequest {
  studentId: string
  firstName: string
  lastName: string
  email: string
  password: string
  description?: string
}

export class BackendRequestError extends Error {
  readonly status: number
  readonly fieldErrors: Record<string, string>

  constructor(
    message: string,
    status: number,
    fieldErrors: Record<string, string> = {},
  ) {
    super(message)
    this.name = "BackendRequestError"
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

/**
 * Fields the student account service can change. The service re-saves the
 * password it receives, so it is part of every update request.
 */
export interface StudentProfileUpdate {
  firstName: string
  lastName: string
  email: string
  password: string
}

/** Course status values the backend accepts. */
export type CourseStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED"

export interface Course {
  id: number
  courseCode: string
  courseTitle: string
  description?: string | null
  units: number
  status: CourseStatus
  createdAt: string
  updatedAt: string
}

export interface CourseRequest {
  courseCode: string
  courseTitle: string
  description?: string
  units: number
  status: CourseStatus
}

export interface CourseModule {
  id: number
  courseId: number
  moduleTitle: string
  sequenceOrder: number
  published: boolean
  archived: boolean
  createdAt: string
  updatedAt: string
}

export interface CourseModuleRequest {
  moduleTitle: string
  sequenceOrder: number
  published: boolean
}

export interface CourseAssignment {
  instructorId: string
  semester: string
  academicYear: string
  role: string
}

export interface CourseAssignmentRequest {
  instructorId: string
  semester: string
  academicYear: string
  role: string
}

/** Query accepted by the Spring `Page` list endpoints. */
export interface PageQuery {
  page?: number
  size?: number
  sort?: string
}

export interface BackendAdapter {
  getProfile: () => Promise<Profile | null>
  updateProfile: (profile: Profile, changes: StudentProfileUpdate) => Promise<Profile>
  /**
   * Stores a new password for an existing student record. The current password
   * is deliberately absent: the confirmed update endpoint has no field for it,
   * so it must never leave the browser.
   */
  changePassword: (profile: Profile, newPassword: string) => Promise<Profile>
  registerStudent: (request: StudentRegistrationRequest) => Promise<Profile>
  getCourses: (query?: PageQuery) => Promise<Course[]>
  getCourse: (id: number) => Promise<Course | null>
  createCourse: (request: CourseRequest) => Promise<Course>
  updateCourse: (id: number, request: CourseRequest) => Promise<Course>
  deleteCourse: (id: number) => Promise<void>
  getCourseModules: (courseId: number) => Promise<CourseModule[]>
  createCourseModule: (courseId: number, request: CourseModuleRequest) => Promise<CourseModule>
  updateCourseModule: (courseId: number, moduleId: number, request: CourseModuleRequest) => Promise<CourseModule>
  deleteCourseModule: (courseId: number, moduleId: number) => Promise<void>
  getCourseAssignments: () => Promise<CourseAssignment[]>
  assignCourse: (request: CourseAssignmentRequest) => Promise<void>
  removeCourseAssignment: (request: CourseAssignmentRequest) => Promise<void>
}

/** Temporary local fixture switch. Keep disabled outside UI testing. */
export const USE_MOCK_DATA = import.meta.env.VITE_ENABLE_MOCK_DATA === "true"

const MOCK_PROFILE: Profile = {
  id: 1,
  studentId: "TEST-STUDENT-001",
  firstName: "Test",
  lastName: "Learner",
  email: "test.learner@example.invalid",
  description: "Temporary profile for frontend testing only.",
  active: true,
  createdAt: "2026-01-01T00:00:00",
  updatedAt: "2026-01-01T00:00:00",
}

/**
 * Sample courses for local UI testing only. They are never shown when the
 * fixture flag is off, so they can never be mistaken for real course data.
 */
const MOCK_COURSES: Course[] = [
  {
    id: 101,
    courseCode: "DEMO-101",
    courseTitle: "Sample course for UI testing",
    description: "Temporary course record used to preview the course screens.",
    units: 3,
    status: "PUBLISHED",
    createdAt: "2026-01-01T00:00:00",
    updatedAt: "2026-01-01T00:00:00",
  },
  {
    id: 102,
    courseCode: "DEMO-102",
    courseTitle: "Second sample course",
    description: "Temporary course record used to preview empty and list states.",
    units: 4,
    status: "DRAFT",
    createdAt: "2026-01-01T00:00:00",
    updatedAt: "2026-01-01T00:00:00",
  },
]

const MOCK_COURSE_MODULES: CourseModule[] = [
  {
    id: 201,
    courseId: 101,
    moduleTitle: "Sample module one",
    sequenceOrder: 1,
    published: true,
    archived: false,
    createdAt: "2026-01-01T00:00:00",
    updatedAt: "2026-01-01T00:00:00",
  },
  {
    id: 202,
    courseId: 101,
    moduleTitle: "Sample module two",
    sequenceOrder: 2,
    published: false,
    archived: false,
    createdAt: "2026-01-01T00:00:00",
    updatedAt: "2026-01-01T00:00:00",
  },
]

/**
 * Backend API integration is not connected yet. Without the explicit local
 * flag, profile reads stay empty instead of presenting mock values as real.
 */
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080").replace(/\/+$/, "")

function readFieldErrors(payload: unknown): Record<string, string> {
  const details = payload && typeof payload === "object" && "details" in payload
    ? (payload.details as Record<string, unknown>)
    : {}
  return Object.fromEntries(
    Object.entries(details).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  )
}

/** Spring `Page` responses wrap the records in `content`. */
function readPageContent(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload
  if (payload && typeof payload === "object" && "content" in payload) {
    const content = (payload as { content: unknown }).content
    if (Array.isArray(content)) return content
  }
  return []
}

async function sendRequest(
  path: string,
  init: RequestInit & { failureMessage: string },
): Promise<Response> {
  try {
    return await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
    })
  } catch {
    throw new BackendRequestError(init.failureMessage, 0)
  }
}

async function readJson(response: Response): Promise<unknown> {
  return response.json().catch(() => null)
}

async function registerStudent(request: StudentRegistrationRequest): Promise<Profile> {
  const response = await sendRequest("/api/students", {
    method: "POST",
    body: JSON.stringify(request),
    failureMessage: "We couldn’t connect to the registration service. Please try again.",
  })

  const payload = await readJson(response)
  if (!response.ok) {
    throw new BackendRequestError(
      "Your account could not be created. Review the details and try again.",
      response.status,
      readFieldErrors(payload),
    )
  }

  if (!payload || typeof payload !== "object") {
    throw new BackendRequestError("The registration service returned an invalid response.", response.status)
  }
  return payload as Profile
}

/**
 * Updates an existing student record. `PUT /api/students/{id}` mirrors the
 * creation payload, so the student ID and description travel unchanged while
 * the editable fields are replaced. The service validates `password` as
 * required, so every update request carries one.
 */
async function updateStudentProfile(
  profile: Profile,
  changes: StudentProfileUpdate,
): Promise<Profile> {
  const response = await sendRequest(`/api/students/${profile.id}`, {
    method: "PUT",
    body: JSON.stringify({
      studentId: profile.studentId,
      firstName: changes.firstName,
      lastName: changes.lastName,
      email: changes.email,
      password: changes.password,
      description: profile.description ?? undefined,
    }),
    failureMessage: "We couldn’t connect to the account service. Please try again.",
  })

  const payload = await readJson(response)
  if (!response.ok) {
    throw new BackendRequestError(
      "We couldn’t save your changes. Review the details and try again.",
      response.status,
      readFieldErrors(payload),
    )
  }

  if (!payload || typeof payload !== "object") {
    throw new BackendRequestError("The account service returned an invalid response.", response.status)
  }
  return payload as Profile
}

function buildPageQuery(query: PageQuery = {}): string {
  const params = new URLSearchParams()
  if (query.page !== undefined) params.set("page", String(query.page))
  if (query.size !== undefined) params.set("size", String(query.size))
  if (query.sort !== undefined) params.set("sort", query.sort)
  const search = params.toString()
  return search ? `?${search}` : ""
}

async function getCourses(query: PageQuery = {}): Promise<Course[]> {
  const response = await sendRequest(`/api/courses${buildPageQuery(query)}`, {
    method: "GET",
    failureMessage: "We couldn’t connect to the course service. Please try again.",
  })
  const payload = await readJson(response)
  if (!response.ok) {
    throw new BackendRequestError(
      "We couldn’t load the courses. Please try again.",
      response.status,
      readFieldErrors(payload),
    )
  }
  return readPageContent(payload) as Course[]
}

async function getCourse(id: number): Promise<Course | null> {
  const response = await sendRequest(`/api/courses/${id}`, {
    method: "GET",
    failureMessage: "We couldn’t connect to the course service. Please try again.",
  })
  if (response.status === 404) return null
  const payload = await readJson(response)
  if (!response.ok) {
    throw new BackendRequestError(
      "We couldn’t load that course. Please try again.",
      response.status,
      readFieldErrors(payload),
    )
  }
  return (payload ?? null) as Course | null
}

async function createCourse(courseRequest: CourseRequest): Promise<Course> {
  const response = await sendRequest("/api/courses", {
    method: "POST",
    body: JSON.stringify(courseRequest),
    failureMessage: "We couldn’t connect to the course service. Please try again.",
  })
  const payload = await readJson(response)
  if (!response.ok) {
    throw new BackendRequestError(
      "We couldn’t create that course. Review the details and try again.",
      response.status,
      readFieldErrors(payload),
    )
  }
  return payload as Course
}

async function updateCourse(id: number, courseRequest: CourseRequest): Promise<Course> {
  const response = await sendRequest(`/api/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(courseRequest),
    failureMessage: "We couldn’t connect to the course service. Please try again.",
  })
  const payload = await readJson(response)
  if (!response.ok) {
    throw new BackendRequestError(
      "We couldn’t save that course. Review the details and try again.",
      response.status,
      readFieldErrors(payload),
    )
  }
  return payload as Course
}

async function deleteCourse(id: number): Promise<void> {
  const response = await sendRequest(`/api/courses/${id}`, {
    method: "DELETE",
    failureMessage: "We couldn’t connect to the course service. Please try again.",
  })
  if (!response.ok) {
    throw new BackendRequestError(
      "We couldn’t remove that course. Please try again.",
      response.status,
      readFieldErrors(await readJson(response)),
    )
  }
}

async function getCourseModules(courseId: number): Promise<CourseModule[]> {
  const response = await sendRequest(`/api/courses/${courseId}/modules`, {
    method: "GET",
    failureMessage: "We couldn’t connect to the module service. Please try again.",
  })
  const payload = await readJson(response)
  if (!response.ok) {
    throw new BackendRequestError(
      "We couldn’t load the modules. Please try again.",
      response.status,
      readFieldErrors(payload),
    )
  }
  return readPageContent(payload) as CourseModule[]
}

async function createCourseModule(courseId: number, moduleRequest: CourseModuleRequest): Promise<CourseModule> {
  const response = await sendRequest(`/api/courses/${courseId}/modules`, {
    method: "POST",
    body: JSON.stringify(moduleRequest),
    failureMessage: "We couldn’t connect to the module service. Please try again.",
  })
  const payload = await readJson(response)
  if (!response.ok) {
    throw new BackendRequestError(
      "We couldn’t create that module. Review the details and try again.",
      response.status,
      readFieldErrors(payload),
    )
  }
  return payload as CourseModule
}

async function updateCourseModule(
  courseId: number,
  moduleId: number,
  moduleRequest: CourseModuleRequest,
): Promise<CourseModule> {
  const response = await sendRequest(`/api/courses/${courseId}/modules/${moduleId}`, {
    method: "PUT",
    body: JSON.stringify(moduleRequest),
    failureMessage: "We couldn’t connect to the module service. Please try again.",
  })
  const payload = await readJson(response)
  if (!response.ok) {
    throw new BackendRequestError(
      "We couldn’t save that module. Review the details and try again.",
      response.status,
      readFieldErrors(payload),
    )
  }
  return payload as CourseModule
}

async function deleteCourseModule(courseId: number, moduleId: number): Promise<void> {
  const response = await sendRequest(`/api/courses/${courseId}/modules/${moduleId}`, {
    method: "DELETE",
    failureMessage: "We couldn’t connect to the module service. Please try again.",
  })
  if (!response.ok) {
    throw new BackendRequestError(
      "We couldn’t remove that module. Please try again.",
      response.status,
      readFieldErrors(await readJson(response)),
    )
  }
}

async function getCourseAssignments(): Promise<CourseAssignment[]> {
  const response = await sendRequest("/api/courses/assignments", {
    method: "GET",
    failureMessage: "We couldn’t connect to the course service. Please try again.",
  })
  const payload = await readJson(response)
  if (!response.ok) {
    throw new BackendRequestError(
      "We couldn’t load the course assignments. Please try again.",
      response.status,
      readFieldErrors(payload),
    )
  }
  return readPageContent(payload) as CourseAssignment[]
}

async function assignCourse(assignment: CourseAssignmentRequest): Promise<void> {
  const response = await sendRequest("/api/courses/assignments", {
    method: "POST",
    body: JSON.stringify(assignment),
    failureMessage: "We couldn’t connect to the course service. Please try again.",
  })
  if (!response.ok) {
    throw new BackendRequestError(
      "We couldn’t assign that instructor. Review the details and try again.",
      response.status,
      readFieldErrors(await readJson(response)),
    )
  }
}

async function removeCourseAssignment(assignment: CourseAssignmentRequest): Promise<void> {
  const response = await sendRequest("/api/courses/assignments", {
    method: "DELETE",
    body: JSON.stringify(assignment),
    failureMessage: "We couldn’t connect to the course service. Please try again.",
  })
  if (!response.ok) {
    throw new BackendRequestError(
      "We couldn’t remove that assignment. Please try again.",
      response.status,
      readFieldErrors(await readJson(response)),
    )
  }
}

export const backend: BackendAdapter = {
  getProfile: async () => USE_MOCK_DATA ? { ...MOCK_PROFILE } : null,
  updateProfile: async (profile, changes) => {
    if (!USE_MOCK_DATA) {
      return updateStudentProfile(profile, changes)
    }
    if (!changes.firstName.trim() || !changes.lastName.trim() || !changes.email.trim()) {
      throw new BackendRequestError(
        "We couldn’t save your changes. Review the details and try again.",
        400,
      )
    }
    if (changes.password.length < 6) {
      throw new BackendRequestError(
        "We couldn’t save your changes. Review the details and try again.",
        400,
        { password: "Password must be between 6 and 255 characters" },
      )
    }
    return {
      ...profile,
      firstName: changes.firstName,
      lastName: changes.lastName,
      email: changes.email,
      updatedAt: new Date().toISOString(),
    }
  },
  changePassword: async (profile, newPassword) => {
    if (!USE_MOCK_DATA) {
      // The confirmed update endpoint replaces the whole record, so the
      // unchanged fields travel with it and only `password` differs.
      return updateStudentProfile(profile, {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        password: newPassword,
      });
    }
    if (newPassword.length < 6 || newPassword.length > 255) {
      throw new BackendRequestError(
        "We couldn’t update your password. Review the details and try again.",
        400,
        { password: "Password must be between 6 and 255 characters" },
      );
    }
    return { ...profile, updatedAt: new Date().toISOString() };
  },
  registerStudent,
  getCourses: async (query) => {
    if (!USE_MOCK_DATA) return getCourses(query)
    const size = query?.size ?? MOCK_COURSES.length
    const page = query?.page ?? 0
    return MOCK_COURSES.slice(page * size, page * size + size).map((course) => ({ ...course }))
  },
  getCourse: async (id) => {
    if (!USE_MOCK_DATA) return getCourse(id)
    const found = MOCK_COURSES.find((course) => course.id === id)
    return found ? { ...found } : null
  },
  createCourse: async (courseRequest) => {
    if (!USE_MOCK_DATA) return createCourse(courseRequest)
    const created: Course = {
      id: Math.max(0, ...MOCK_COURSES.map((course) => course.id)) + 1,
      courseCode: courseRequest.courseCode,
      courseTitle: courseRequest.courseTitle,
      description: courseRequest.description ?? null,
      units: courseRequest.units,
      status: courseRequest.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    MOCK_COURSES.push(created)
    return { ...created }
  },
  updateCourse: async (id, courseRequest) => {
    if (!USE_MOCK_DATA) return updateCourse(id, courseRequest)
    const index = MOCK_COURSES.findIndex((course) => course.id === id)
    if (index < 0) {
      throw new BackendRequestError("We couldn’t save that course. Please try again.", 404)
    }
    const updated: Course = {
      ...MOCK_COURSES[index],
      ...courseRequest,
      description: courseRequest.description ?? null,
      updatedAt: new Date().toISOString(),
    }
    MOCK_COURSES[index] = updated
    return { ...updated }
  },
  deleteCourse: async (id) => {
    if (!USE_MOCK_DATA) return deleteCourse(id)
    const index = MOCK_COURSES.findIndex((course) => course.id === id)
    if (index < 0) {
      throw new BackendRequestError("We couldn’t remove that course. Please try again.", 404)
    }
    MOCK_COURSES.splice(index, 1)
  },
  getCourseModules: async (courseId) => {
    if (!USE_MOCK_DATA) return getCourseModules(courseId)
    return MOCK_COURSE_MODULES.filter((module) => module.courseId === courseId).map((module) => ({ ...module }))
  },
  createCourseModule: async (courseId, moduleRequest) => {
    if (!USE_MOCK_DATA) return createCourseModule(courseId, moduleRequest)
    const created: CourseModule = {
      id: Math.max(0, ...MOCK_COURSE_MODULES.map((module) => module.id)) + 1,
      courseId,
      moduleTitle: moduleRequest.moduleTitle,
      sequenceOrder: moduleRequest.sequenceOrder,
      published: moduleRequest.published,
      archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    MOCK_COURSE_MODULES.push(created)
    return { ...created }
  },
  updateCourseModule: async (courseId, moduleId, moduleRequest) => {
    if (!USE_MOCK_DATA) return updateCourseModule(courseId, moduleId, moduleRequest)
    const index = MOCK_COURSE_MODULES.findIndex((module) => module.id === moduleId && module.courseId === courseId)
    if (index < 0) {
      throw new BackendRequestError("We couldn’t save that module. Please try again.", 404)
    }
    const updated: CourseModule = {
      ...MOCK_COURSE_MODULES[index],
      ...moduleRequest,
      updatedAt: new Date().toISOString(),
    }
    MOCK_COURSE_MODULES[index] = updated
    return { ...updated }
  },
  deleteCourseModule: async (courseId, moduleId) => {
    if (!USE_MOCK_DATA) return deleteCourseModule(courseId, moduleId)
    const index = MOCK_COURSE_MODULES.findIndex((module) => module.id === moduleId && module.courseId === courseId)
    if (index < 0) {
      throw new BackendRequestError("We couldn’t remove that module. Please try again.", 404)
    }
    MOCK_COURSE_MODULES.splice(index, 1)
  },
  getCourseAssignments: async () => {
    if (!USE_MOCK_DATA) return getCourseAssignments()
    return []
  },
  assignCourse: async (assignment) => {
    if (!USE_MOCK_DATA) return assignCourse(assignment)
  },
  removeCourseAssignment: async (assignment) => {
    if (!USE_MOCK_DATA) return removeCourseAssignment(assignment)
  },
}

export { updateStudentProfile }
