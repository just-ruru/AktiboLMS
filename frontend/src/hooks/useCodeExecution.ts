import { useMutation } from '@tanstack/react-query'
import { api } from '../services/api'

export interface CodeExecutionRequest {
  code: string
  language: string
  stdin?: string
}

export interface CodeExecutionResponse {
  output: string
  error?: string
  executionTimeMs: number
  memoryUsed?: number
  exitCode: number
}

export function useCodeExecution() {
  return useMutation({
    mutationFn: async (data: CodeExecutionRequest) => {
      const response = await api.post<CodeExecutionResponse>('/code/execute', data)
      return response.data
    },
  })
}

export function useCodeRuntimes() {
  return useMutation({
    mutationFn: async () => {
      const response = await api.get<{ runtimes: string[] }>('/code/runtimes')
      return response.data
    },
  })
}

export function useSubmitCode(activityId: string) {
  return useMutation({
    mutationFn: async (data: { code: string; language: string }) => {
      const response = await api.post(`/activities/${activityId}/code/submit`, data)
      return response.data
    },
  })
}

export function useSubmitQuiz(activityId: string) {
  return useMutation({
    mutationFn: async (answers: number[]) => {
      const response = await api.post(`/activities/${activityId}/quiz/submit`, { answers })
      return response.data
    },
  })
}