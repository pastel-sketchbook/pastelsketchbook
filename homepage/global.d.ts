interface ImportMetaEnv {
  readonly VITE_API_KEY: string
  readonly VITE_API_MODEL: string
  // Note: VITE_YOUTUBE_API_KEY is server-side only (in Vercel functions)
  // Client code should call /api/videos/metadata instead
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
