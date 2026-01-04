interface ImportMetaEnv {
  readonly VITE_API_KEY: string
  readonly VITE_API_MODEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
