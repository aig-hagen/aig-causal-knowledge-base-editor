import { expect, test, beforeEach } from 'vitest'
import { render } from 'vitest-browser-vue'
import KnowledgeBaseGraph from './KnowledgeBaseGraph.vue'
import '@/assets/browser-test-reset.css'
import '@/assets/aig_graph_component-2ab9bf1/graph-component.js'
import '@/assets/aig_graph_component-2ab9bf1/graph-component.css'
import { page } from '@vitest/browser/context'

beforeEach(async () => {
  await page.viewport(1280, 720)
})

test('create node', async () => {
  const { locator } = render(KnowledgeBaseGraph)

  await locator.dblClick({ position: { x: 150, y: 150 } })

  await expect(locator).toMatchScreenshot()
})
