import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import { Course, PaginatedResponse } from '../types'

// For student catalog - browse published courses
export function useCourses(params?: { page?: number; size?: number; search?: string }) {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Course>>('/courses/public', { params })
      return response.data
    },
  })
}

export function useCourse(courseId: string) {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      const response = await api.get<Course>(`/courses/${courseId}`)
      return response.data
    },
    enabled: !!courseId,
  })
}

// For instructor dashboard - get instructor's own courses
export function useMyCourses() {
  return useQuery({
    queryKey: ['my-courses'],
    queryFn: async () => {
      const response = await api.get<Course[]>('/courses/my')
      return response.data
    },
  })
}

export function useCreateCourse() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Partial<Course>) => {
      const response = await api.post<Course>('/courses', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      queryClient.invalidateQueries({ queryKey: ['my-courses'] })
    },
  })
}

export function useUpdateCourse() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Course> }) => {
      const response = await api.put<Course>(`/courses/${id}`, data)
      return response.data
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      queryClient.invalidateQueries({ queryKey: ['course', id] })
    },
  })
}

export function usePublishCourse() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (courseId: string) => {
      const response = await api.post(`/courses/${courseId}/publish`)
      return response.data
    },
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      queryClient.invalidateQueries({ queryKey: ['course', courseId] })
      queryClient.invalidateQueries({ queryKey: ['my-courses'] })
    },
  })
}

export function useEnrollCourse() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (courseId: string) => {
      const response = await api.post(`/courses/${courseId}/enroll`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-courses'] })
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      queryClient.invalidateQueries({ queryKey: ['enrolled-courses'] })
    },
  })
}

export function useEnrolledCourses() {
  return useQuery({
    queryKey: ['enrolled-courses'],
    queryFn: async () => {
      const response = await api.get<Course[]>('/courses/enrolled')
      return response.data
    },
  })
}