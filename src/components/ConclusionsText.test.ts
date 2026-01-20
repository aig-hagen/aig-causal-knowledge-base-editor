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
import ConclusionsText from './ConclusionsText.vue'
import type { Atom, Id } from '@/model/graphicalCausalKnowledgeBase'
import type { Literal } from '@/composables/useEvaluationRequestPayload'

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
atoms.set(3, {
  id: 3,
  name: 'c',
  description: '',
  position: { x: 0, y: 0 },
})

function getCleanHtml(wrapper: VueWrapper) {
  return wrapper.html().replace(/ data-v-[a-z0-9]+=".*?"/g, '')
}

test('renders no observations and no conclusion', () => {
  const observations: Literal[] = []
  const conclusions: Literal[] = []
  const requesedAtomsForConclusion: Id[] = []

  const wrapper = mount(ConclusionsText, {
    props: { atoms, observations, conclusions, requesedAtomsForConclusion },
  })

  expect(wrapper.text()).toContain(
    'Given the assumptions and the causal model, from no observations follow no conclusions.',
  )
})

test('renders one observation', () => {
  const observations = [
    {
      atomId: 1,
      negated: false,
    },
  ]
  const conclusions: Literal[] = []
  const requesedAtomsForConclusion: Id[] = []

  const wrapper = mount(ConclusionsText, {
    props: { atoms, observations, conclusions, requesedAtomsForConclusion },
  })

  expect(wrapper.text()).toContain(
    'Given the assumptions and the causal model, from the observation a follow no conclusions.',
  )
  expect(getCleanHtml(wrapper)).toContain(`<span class="is-underlined">a</span>`)
})

test('renders negated observation', () => {
  const observations = [
    {
      atomId: 1,
      negated: true,
    },
  ]
  const conclusions: Literal[] = []
  const requesedAtomsForConclusion: Id[] = []

  const wrapper = mount(ConclusionsText, {
    props: { atoms, observations, conclusions, requesedAtomsForConclusion },
  })

  expect(wrapper.text()).toContain(
    'Given the assumptions and the causal model, from the observation not a follow no conclusions.',
  )
  expect(getCleanHtml(wrapper)).toContain(`<span class="is-underlined">not a</span>`)
})

test('renders multiple observation', () => {
  const observations = [
    {
      atomId: 1,
      negated: false,
    },
    {
      atomId: 2,
      negated: false,
    },
    {
      atomId: 3,
      negated: false,
    },
  ]
  const conclusions: Literal[] = []
  const requesedAtomsForConclusion: Id[] = []

  const wrapper = mount(ConclusionsText, {
    props: { atoms, observations, conclusions, requesedAtomsForConclusion },
  })

  expect(wrapper.text()).toContain(
    'Given the assumptions and the causal model, from the observations a, b and c follow no conclusions.',
  )
  const html = getCleanHtml(wrapper)
  expect(html).toContain(`<span class="is-underlined">a</span>`)
  expect(html).toContain(`<span class="is-underlined">b</span>`)
  expect(html).toContain(`<span class="is-underlined">c</span>`)
})

test('renders one conclusion', () => {
  const observations: Literal[] = []
  const conclusions = [
    {
      atomId: 1,
      negated: false,
    },
  ]
  const requesedAtomsForConclusion: Id[] = [1]

  const wrapper = mount(ConclusionsText, {
    props: { atoms, observations, conclusions, requesedAtomsForConclusion },
  })

  expect(wrapper.text()).toContain(
    'Given the assumptions and the causal model, from no observations follows a.',
  )
  expect(getCleanHtml(wrapper)).toContain(`<span class="is-underlined">a</span>`)
})

test('renders multiple conclusion', () => {
  const observations: Literal[] = []
  const conclusions = [
    {
      atomId: 1,
      negated: false,
    },
    {
      atomId: 2,
      negated: false,
    },
  ]
  const requesedAtomsForConclusion: Id[] = [1, 2]

  const wrapper = mount(ConclusionsText, {
    props: { atoms, observations, conclusions, requesedAtomsForConclusion },
  })

  expect(wrapper.text()).toContain(
    'Given the assumptions and the causal model, from no observations follows: ab.',
  )
  expect(getCleanHtml(wrapper)).toContain(
    `<ul>
    <li><span><span class="is-underlined">a</span></span></li>
    <li><span><span class="is-underlined">b</span>.</span></li>
  </ul>`,
  )
})

test('renders message about no further conclusions', () => {
  const observations: Literal[] = []
  const conclusions = [
    {
      atomId: 1,
      negated: false,
    },
  ]
  const requesedAtomsForConclusion: Id[] = [1, 2]

  const wrapper = mount(ConclusionsText, {
    props: { atoms, observations, conclusions, requesedAtomsForConclusion },
  })

  expect(wrapper.text()).toContain(
    'Given the assumptions and the causal model, from no observations follows a. For other atoms, no conclusions can be made.',
  )
})

test('renders message about missing one conclusion', () => {
  const observations: Literal[] = []
  const conclusions: Literal[] = []
  const requesedAtomsForConclusion: Id[] = [1]

  const wrapper = mount(ConclusionsText, {
    props: { atoms, observations, conclusions, requesedAtomsForConclusion },
  })

  expect(wrapper.text()).toContain(
    'Given the assumptions and the causal model, from no observations follow no conclusions for a.',
  )
})
