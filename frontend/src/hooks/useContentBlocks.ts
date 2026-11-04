import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import { ContentBlock } from '../types'

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

export function useReorderContentBlocks() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (blocks: { id: string; orderIndex: number }[]) => {
      await api.put('/content-blocks/reorder', blocks)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-blocks'] })
    },
  })
}