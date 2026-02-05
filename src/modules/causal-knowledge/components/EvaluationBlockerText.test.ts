/*
 * Causal Knowledge Base Editor - A graphical application to reason with causal knowledge.
 *
 * Copyright (C) 2026  Artificial Intelligence Group at the Faculty of Mathematics and Computer Science of the FernUniversität in Hagen <https://www.fernuni-hagen.de/aig/en/>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import { test, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import EvaluationBlockerText from '@/modules/causal-knowledge/components/EvaluationBlockerText.vue'
import type { Atom } from '@/modules/causal-knowledge/graphicalCausalKnowledgeBase'
import {
  ConjunctionIsNotTargetedError,
  CycleError,
  EmptyKnowlegeBaseError,
} from '@/modules/causal-knowledge/composables/useEvaluationRequestPayload'

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
  expect(wrapper.text()).toContain('The causal model has no atoms.')
  expect(wrapper.text()).toContain('Evaluation is therefore not possible.')
})
