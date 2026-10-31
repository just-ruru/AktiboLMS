import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import { Lesson, ContentBlock, Activity } from '../types'

export function useLesson(lessonId: string) {
  return useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: async () => {
      const response = await api.get<Lesson>(`/lessons/${lessonId}`)
      return response.data
    },
    enabled: !!lessonId,
  })
}

export function useCreateLesson(moduleId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Partial<Lesson>) => {
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

export function useContentBlocks(lessonId: string) {
  return useQuery({
    queryKey: ['content-blocks', lessonId],
    queryFn: async () => {
      const response = await api.get<ContentBlock[]>(`/lessons/${lessonId}/content-blocks`)
      return response.data
    },
    enabled: !!lessonId,
  })
}

export function useCreateContentBlock() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ lessonId, data }: { lessonId: string; data: Partial<ContentBlock> }) => {
      const response = await api.post<ContentBlock>(`/lessons/${lessonId}/content-blocks`, data)
      return response.data
    },
    onSuccess: (_, { lessonId }) => {
      queryClient.invalidateQueries({ queryKey: ['content-blocks', lessonId] })
    },
  })
}

export function useUpdateContentBlock() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ContentBlock> }) => {
      const response = await api.put<ContentBlock>(`/content-blocks/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-blocks'] })
    },
  })
}

export function useDeleteContentBlock() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/content-blocks/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-blocks'] })
    },
  })
}

export function useActivities(lessonId: string) {
  return useQuery({
    queryKey: ['activities', lessonId],
    queryFn: async () => {
      const response = await api.get<Activity[]>(`/lessons/${lessonId}/activities`)
      return response.data
    },
    enabled: !!lessonId,
  })
}

export function useCreateActivity() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ lessonId, data }: { lessonId: string; data: Partial<Activity> }) => {
      const response = await api.post<Activity>(`/lessons/${lessonId}/activities`, data)
      return response.data
    },
    onSuccess: (_, { lessonId }) => {
      queryClient.invalidateQueries({ queryKey: ['activities', lessonId] })
    },
  })
}

export function useUpdateActivity() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Activity> }) => {
      const response = await api.put<Activity>(`/activities/${id}`, data)
      return response.data
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      queryClient.invalidateQueries({ queryKey: ['activity', id] })
    },
  })
}

export function useDeleteActivity() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/activities/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] })
    },
  })
}