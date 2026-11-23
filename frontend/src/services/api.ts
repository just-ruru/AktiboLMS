const API_BASE = "http://localhost:8080/api";

<<<<<<< HEAD
/* ============================================================================
   STUDY NOTES — services/api.ts  (data layer / HTTP client)
   ----------------------------------------------------------------------------
   WHAT: Shared axios instance used by every hook (useCourses, useAuth, …) to
         call the Spring Boot backend.
   HOW IT WORKS:
     1. baseURL is /api in dev (Vite proxy → http://localhost:8080/api, see
        vite.config.ts server.proxy) or VITE_API_URL in production.
     2. Request interceptor: reads accessToken from localStorage and attaches
        Authorization: Bearer <token> to every outgoing request.
     3. Response interceptor: on a 401, calls POST /auth/refresh with the
        refreshToken, stores the new accessToken, retries the original request.
        If refresh fails, removes tokens and dispatches a window
        "auth:logout" event (useAuth listens for this and logs the user out).
   WHERE THE API CONTRACT LIVES: backend controllers under /api
     (see ENDPOINT-AUDIT.md for the full inventory and which endpoints to
     KEEP / REMOVE / FIX / IMPLEMENT).
   WHAT TO CHANGE FOR THE NEW UI:
     • The new frontend consumes the same endpoints — no API changes needed
       for the UI overhaul itself, but apply ENDPOINT-AUDIT.md verdicts
       (e.g. remove public /code/execute; add /api/v1 versioning) before
       wiring real data.
     • QA HIGH: tokens live in localStorage (XSS theft risk). For the overhaul
       consider httpOnly cookies or at least short access-token expiry.
     • QA LOW: no centralized response normalization — some hooks read
       response.data, others assume nested structure. Consider a response
       interceptor that unwraps { content, totalElements, … } consistently.
   ============================================================================ */

const VITE_API_URL = (import.meta as unknown as Record<string, { VITE_API_URL?: string }>).env?.VITE_API_URL || '/api'
=======
export type Student = {
  id: number;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
>>>>>>> frontend

export type Instructor = {
  id: number;
  instructorId: string;
  firstName: string;
  lastName: string;
  email: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type StudentRequest = {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  description?: string;
};

export type InstructorRequest = {
  instructorId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  description?: string;
};

export type PageResponse<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
};

async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(body || `Request failed with status ${res.status}`);
  }
  return res.json();
}

// ---------- Students ----------

export function createStudent(data: StudentRequest): Promise<Student> {
  return request(`${API_BASE}/students`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

<<<<<<< HEAD
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const response = await axios.post(
            `${VITE_API_URL}/auth/refresh`,
            { refreshToken }
          )
          const { accessToken } = response.data
          localStorage.setItem('accessToken', accessToken)
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api(originalRequest)
        }
      } catch {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        // Don't do hard redirect - let the app handle auth state
        // Dispatch event for AuthProvider to handle logout
        window.dispatchEvent(new CustomEvent('auth:logout'))
      }
    }
=======
export function getStudentById(id: number): Promise<Student> {
  return request(`${API_BASE}/students/${id}`);
}
>>>>>>> frontend

export function getAllStudents(
  page = 0,
  size = 20
): Promise<PageResponse<Student>> {
  return request(
    `${API_BASE}/students?page=${page}&size=${size}&sort=createdAt,desc`
  );
}

export function updateStudent(id: number, data: StudentRequest): Promise<Student> {
  return request(`${API_BASE}/students/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deactivateStudent(id: number): Promise<{ message: string; id: string }> {
  return request(`${API_BASE}/students/${id}`, {
    method: "DELETE",
  });
}

// ---------- Instructors ----------

export function createInstructor(data: InstructorRequest): Promise<Instructor> {
  return request(`${API_BASE}/instructors`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getInstructorById(id: number): Promise<Instructor> {
  return request(`${API_BASE}/instructors/${id}`);
}

export function getAllInstructors(
  page = 0,
  size = 20
): Promise<PageResponse<Instructor>> {
  return request(
    `${API_BASE}/instructors?page=${page}&size=${size}&sort=createdAt,desc`
  );
}

export function updateInstructor(
  id: number,
  data: InstructorRequest
): Promise<Instructor> {
  return request(`${API_BASE}/instructors/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deactivateInstructor(id: number): Promise<{ message: string; id: string }> {
  return request(`${API_BASE}/instructors/${id}`, {
    method: "DELETE",
  });
}
