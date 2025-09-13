import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      // https://vitest.dev/guide/browser/playwright
      instances: [
      { browser: 'chromium' },
      { browser: 'firefox' },
      { browser: 'webkit' },
      ],
    },
  },
})
