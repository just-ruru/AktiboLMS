import axios from 'axios'

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

export const api = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

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

    return Promise.reject(error)
  }
)

export default api