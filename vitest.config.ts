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
            exclude: [...configDefaults.exclude],
            root: fileURLToPath(new URL('./', import.meta.url)),
          },
        },
      ],
    },
  }),
)
