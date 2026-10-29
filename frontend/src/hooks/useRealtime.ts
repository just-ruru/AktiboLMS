import { useEffect, useRef, useState, useCallback } from 'react'
import { createClient, RealtimeChannel, SupabaseClient } from '@supabase/supabase-js'
import { useAuth } from './useAuth'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let supabaseInstance: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

export function useSupabase() {
  return getSupabaseClient()
}

interface RealtimeSubscriptionOptions {
  table: string
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*'
  filter?: string
  onInsert?: (payload: any) => void
  onUpdate?: (payload: any) => void
  onDelete?: (payload: any) => void
}

export function useRealtimeSubscription({
  table,
  event = '*',
  filter,
  onInsert,
  onUpdate,
  onDelete,
}: RealtimeSubscriptionOptions) {
  const { user } = useAuth()
  const channelRef = useRef<RealtimeChannel | null>(null)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !supabaseUrl || !supabaseAnonKey) return

    const supabase = getSupabaseClient()

    const channel = supabase
      .channel(`realtime:${table}`)
      .on(
        'postgres_changes',
        {
          event,
          schema: 'public',
          table,
          filter,
        },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              onInsert?.(payload.new)
              break
            case 'UPDATE':
              onUpdate?.(payload.new)
              break
            case 'DELETE':
              onDelete?.(payload.old)
              break
          }
        }
      )
      .subscribe((status) => {
        setConnected(status === 'SUBSCRIBED')
        if (status === 'CHANNEL_ERROR') {
          setError('Failed to connect to realtime')
        }
      })

    channelRef.current = channel

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
        setConnected(false)
      }
    }
  }, [user, table, event, filter, onInsert, onUpdate, onDelete])

  return { connected, error }
}

export function useRealtimeProgress(userId: string) {
  const [progress, setProgress] = useState<any[]>([])

  useRealtimeSubscription({
    table: 'activity_progress',
    filter: `user_id=eq.${userId}`,
    onInsert: (newProgress) => {
      setProgress(prev => [...prev, newProgress])
    },
    onUpdate: (updatedProgress) => {
      setProgress(prev => prev.map(p => p.id === updatedProgress.id ? updatedProgress : p))
    },
  })

  return progress
}

export function useRealtimeQuizSubmissions(courseId: string) {
  const [submissions, setSubmissions] = useState<any[]>([])

  useRealtimeSubscription({
    table: 'quiz_attempts',
    filter: `course_id=eq.${courseId}`,
    onInsert: (newSubmission) => {
      setSubmissions(prev => [newSubmission, ...prev].slice(0, 50))
    },
  })

  return submissions
}