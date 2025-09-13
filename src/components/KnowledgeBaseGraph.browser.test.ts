import { expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import KnowledgeBaseGraph from './KnowledgeBaseGraph.vue'
import { page } from '@vitest/browser/context'


test('renders', async () => {
  render(KnowledgeBaseGraph, {
    props: { name: 'Vitest' },
  })
  await expect.element(page).toMatchScreenshot()
})
