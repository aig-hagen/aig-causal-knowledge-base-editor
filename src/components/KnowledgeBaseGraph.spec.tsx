import { test, expect } from '@playwright/experimental-ct-vue'
import KnowledgeBaseGraph from './KnowledgeBaseGraph.vue'

test('create node', async ({ mount, page }) => {
  const position = { x: 150, y: 150 }
  const component = await mount(<KnowledgeBaseGraph />)
  await component.dblclick({ position })
  await expect(page).toHaveScreenshot()
})
