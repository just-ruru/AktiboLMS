import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import { Activity } from '../types'

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

export function useActivity(activityId: string) {
  return useQuery({
    queryKey: ['activity', activityId],
    queryFn: async () => {
      const response = await api.get<Activity>(`/activities/${activityId}`)
      return response.data
    },
    enabled: !!activityId,
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] })
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

export function useReorderActivities() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (activities: { id: string; orderIndex: number }[]) => {
      await api.put('/activities/reorder', activities)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] })
    },
  })
}