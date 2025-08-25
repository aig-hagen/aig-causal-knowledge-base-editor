import { test, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import EvaluationBlockerText from './EvaluationBlockerText.vue'
import type { Atom } from '@/model/graphicalCausalKnowledgeBase'
import {
  ConjunctionIsNotTargetedError,
  CycleError,
  EmptyKnowlegeBaseError,
} from '@/composables/useEvaluationRequestPayload'

const atoms = new Map<number, Atom>()
atoms.set(1, {
  id: 1,
  name: 'a',
  description: '',
  position: { x: 0, y: 0 },
})
atoms.set(2, {
  id: 2,
  name: 'b',
  description: '',
  position: { x: 0, y: 0 },
})

function getCleanHtml(wrapper: VueWrapper) {
  return wrapper.html().replace(/ data-v-[a-z0-9]+=".*?"/g, '')
}

test('renders conjunction is not targeted error', () => {
  const blocker = new ConjunctionIsNotTargetedError({ sourceId: 99, targetId: 1 })
  const wrapper = mount(EvaluationBlockerText, {
    props: { atoms, blocker },
  })
  expect(wrapper.text()).toContain('A conjunction targeting a has no incomming edges.')
  expect(getCleanHtml(wrapper)).toContain('<span class="is-underlined">a</span>')
  expect(wrapper.text()).toContain('Evaluation is therefore not possible.')
})

test('renders cycle error with self-loop', () => {
  const blocker = new CycleError([2, 2])
  const wrapper = mount(EvaluationBlockerText, {
    props: { atoms, blocker },
  })
  expect(wrapper.text()).toContain('It exists a self-loop for b.')
  expect(getCleanHtml(wrapper)).toContain('<span class="is-underlined">b</span>')
  expect(wrapper.text()).toContain('Evaluation is therefore not possible.')
})

test('renders cycle error with cycle', () => {
  const blocker = new CycleError([1, 2, 1])
  const wrapper = mount(EvaluationBlockerText, {
    props: { atoms, blocker },
  })
  expect(wrapper.text()).toContain('It exists the following cycle:')
  expect(getCleanHtml(wrapper)).toContain('<span class="is-underlined">a</span>')
  expect(getCleanHtml(wrapper)).toContain('<span class="is-underlined">b</span>')
  expect(wrapper.text()).toContain('Evaluation is therefore not possible.')
})

test('renders empty knowledge base error', () => {
  const blocker = new EmptyKnowlegeBaseError()
  const wrapper = mount(EvaluationBlockerText, {
    props: { atoms, blocker },
  })
  expect(wrapper.text()).toContain('The knowledge base has no atoms.')
  expect(wrapper.text()).toContain('Evaluation is therefore not possible.')
})
