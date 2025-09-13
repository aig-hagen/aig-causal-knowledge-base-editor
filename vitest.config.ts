import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            environment: 'jsdom',
            include: ['**/*.test.ts'],
            exclude: [...configDefaults.exclude, '**/*.browser.test.ts'],
            root: fileURLToPath(new URL('./', import.meta.url)),
          },
        },
        {
          extends: true,
          test: {
            name: 'browser',
            include: ['**/*.browser.test.ts'],
            exclude: [...configDefaults.exclude],
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
        }
      ],
    },
  }),
)
