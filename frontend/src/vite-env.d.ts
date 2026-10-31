declare interface ImportMetaEnv {
  VITE_API_URL?: string
  VITE_SUPABASE_URL?: string
  VITE_SUPABASE_ANON_KEY?: string
}

declare interface ImportMeta {
  env: ImportMetaEnv
}
