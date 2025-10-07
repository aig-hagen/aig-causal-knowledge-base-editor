/// <reference types="vite/client" />

interface ViteTypeOptions {
  // Make the type of ImportMetaEnv strict to disallow unknown keys.
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_TWEETY_API_URL: string
  readonly VITE_EDITOR_VERSION: string | undefined
  readonly VITE_EDITOR_COMMIT: string | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
