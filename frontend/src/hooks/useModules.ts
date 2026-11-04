import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import { Module } from '../types'

export function useModules(courseId: string) {
  return useQuery({
    queryKey: ['modules', courseId],
    queryFn: async () => {
      const response = await api.get<Module[]>(`/courses/${courseId}/modules`)
      return response.data
    },
    enabled: !!courseId,
  })
}

export function useModule(moduleId: string) {
  return useQuery({
    queryKey: ['module', moduleId],
    queryFn: async () => {
      const response = await api.get<Module>(`/modules/${moduleId}`)
      return response.data
    },
    enabled: !!moduleId,
  })
}

export function useCreateModule() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ courseId, data }: { courseId: string; data: Partial<Module> }) => {
      const response = await api.post<Module>(`/courses/${courseId}/modules`, data)
      return response.data
    },
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ['modules', courseId] })
      queryClient.invalidateQueries({ queryKey: ['course', courseId] })
    },
  })
}

export function useUpdateModule() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Module> }) => {
      const response = await api.put<Module>(`/modules/${id}`, data)
      return response.data
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['modules'] })
      queryClient.invalidateQueries({ queryKey: ['module', id] })
    },
  })
}

export function useDeleteModule() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/modules/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] })
    },
  })
}

export function useReorderModules() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ courseId, modules }: { courseId: string; modules: { id: string; orderIndex: number }[] }) => {
      await api.put(`/courses/${courseId}/modules/reorder`, modules)
    },
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ['modules', courseId] })
    },
  })
}