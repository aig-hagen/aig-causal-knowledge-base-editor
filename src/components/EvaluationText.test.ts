import { test, expect } from 'vitest'

import { mount, VueWrapper } from '@vue/test-utils'
import EvaluationText from './EvaluationText.vue'
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

  const wrapper = mount(EvaluationText, {
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

  const wrapper = mount(EvaluationText, {
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

  const wrapper = mount(EvaluationText, {
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

  const wrapper = mount(EvaluationText, {
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

  const wrapper = mount(EvaluationText, {
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

  const wrapper = mount(EvaluationText, {
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

  const wrapper = mount(EvaluationText, {
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

  const wrapper = mount(EvaluationText, {
    props: { atoms, observations, conclusions, requesedAtomsForConclusion },
  })

  expect(wrapper.text()).toContain(
    'Given the assumptions and the causal model, from no observations follow no conclusions for a.',
  )
})
