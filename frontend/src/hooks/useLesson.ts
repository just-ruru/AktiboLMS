import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import { Lesson } from '../types'

export function useLesson(courseId: string, lessonId: string) {
  return useQuery({
    queryKey: ['lesson', courseId, lessonId],
    queryFn: async () => {
      const response = await api.get<Lesson>(`/courses/${courseId}/lessons/${lessonId}`)
      return response.data
    },
    enabled: !!courseId && !!lessonId,
  })
}

export function useCreateLesson() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ moduleId, data }: { moduleId: string; data: Partial<Lesson> }) => {
      const response = await api.post<Lesson>(`/modules/${moduleId}/lessons`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson'] })
    },
  })
}

export function useUpdateLesson() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Lesson> }) => {
      const response = await api.put<Lesson>(`/lessons/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson'] })
    },
  })
}

export function useDeleteLesson() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/lessons/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson'] })
    },
  })
}

export function useReorderLessons() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (lessons: { id: string; orderIndex: number }[]) => {
      await api.put('/lessons/reorder', lessons)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson'] })
    },
  })
}