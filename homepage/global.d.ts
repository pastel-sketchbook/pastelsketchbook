interface ImportMetaEnv {
  readonly VITE_API_KEY: string
  readonly VITE_API_MODEL: string
  readonly VITE_YOUTUBE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
