import { expect, test } from 'vitest'
import {
  ConjunctionIsNotTargetedError,
  CycleError,
  EmptyKnowlegeBaseError,
  NonEvaluableKnowledgebaseError,
  useEvaluationRequestPayload,
  type Literal,
} from './useEvaluationRequestPayload'
import type { Connection } from '@/model/graphicalCausalKnowledgeBase'

interface PayloadInput {
  atoms?: Set<number>
  conjunctions?: Set<number>
  connections?: Connection[]
  observations?: Literal[]
  assumptions?: Literal[]
}

function constructPayloadSuccessfully(payloadInput: PayloadInput) {
  const payload = constructPayload(payloadInput)
  if (payload instanceof NonEvaluableKnowledgebaseError) {
    throw payload
  }
  return payload
}

function constructPayload({
  atoms,
  conjunctions,
  connections,
  observations,
  assumptions,
}: PayloadInput) {
  return useEvaluationRequestPayload(
    atoms ?? new Set(),
    conjunctions ?? new Set(),
    connections ?? [],
    observations ?? [],
    assumptions ?? [],
    'get_conclusions',
  ).value
}

test('constructs multiple equations', () => {
  const atoms = new Set([1, 2, 3])
  const connections = [
    {
      id: {
        sourceId: 3,
        targetId: 1,
      },
      negated: false,
    },
    {
      id: {
        sourceId: 3,
        targetId: 2,
      },
      negated: false,
    },
  ]

  const payload = constructPayloadSuccessfully({ atoms, connections })

  const expectedKb = '1 <=> 3\n2 <=> 3\n{}'
  expect(payload.kb).toEqual(expectedKb)
})

test('constructs disjunction', () => {
  const atoms = new Set([1, 2, 3])
  const connections = [
    {
      id: {
        sourceId: 2,
        targetId: 1,
      },
      negated: false,
    },
    {
      id: {
        sourceId: 3,
        targetId: 1,
      },
      negated: true,
    },
  ]

  const payload = constructPayloadSuccessfully({ atoms, connections })

  const expectedKb = '1 <=> 2 || !3\n{}'
  expect(payload.kb).toEqual(expectedKb)
})

test('constructs from conjunction', () => {
  const atoms = new Set([1, 3, 4])
  const conjunctions = new Set([2])
  const connections = [
    {
      id: {
        sourceId: 2,
        targetId: 1,
      },
      negated: true,
    },
    {
      id: {
        sourceId: 3,
        targetId: 2,
      },
      negated: true,
    },
    {
      id: {
        sourceId: 4,
        targetId: 2,
      },
      negated: false,
    },
  ]

  const payload = constructPayloadSuccessfully({ atoms, conjunctions, connections })

  const expectedKb = '1 <=> !(!3 && 4)\n{}'
  expect(payload.kb).toEqual(expectedKb)
})

test('constructs from chained conjunction', () => {
  const atoms = new Set([1, 4])
  const conjunctions = new Set([2, 3])
  const connections = [
    {
      id: {
        sourceId: 2,
        targetId: 1,
      },
      negated: true,
    },
    {
      id: {
        sourceId: 3,
        targetId: 2,
      },
      negated: true,
    },
    {
      id: {
        sourceId: 4,
        targetId: 3,
      },
      negated: false,
    },
  ]

  const payload = constructPayloadSuccessfully({ atoms, conjunctions, connections })

  const expectedKb = '1 <=> !(!(4))\n{}'
  expect(payload.kb).toEqual(expectedKb)
})

test('ignoring conjunction that have no incoming nodes', () => {
  const atoms = new Set([1])
  const conjunctions = new Set([2])
  const connections = [
    {
      id: {
        sourceId: 2,
        targetId: 1,
      },
      negated: true,
    },
  ]

  const payload = constructPayloadSuccessfully({ atoms, conjunctions, connections })

  const expectedKb = '{}'
  expect(payload.kb).toEqual(expectedKb)
})

test('fail to construct when source ID does not exit', () => {
  const atoms = new Set([1])
  const connections = [
    {
      id: {
        sourceId: 2,
        targetId: 1,
      },
      negated: false,
    },
  ]

  const constructPayloadFn = () => constructPayload({ atoms, connections })

  expect(constructPayloadFn).toThrow('Source ID 2 is not an atom or conjunction.')
})

test('fail to construct when selfloop exists', () => {
  const atoms = new Set([1])
  const connections = [
    {
      id: {
        sourceId: 1,
        targetId: 1,
      },
      negated: false,
    },
  ]

  const payload = constructPayload({ atoms, connections })

  expect(payload).toEqual(new CycleError([1, 1]))
})

test('fail to construct when cycle exists', () => {
  const atoms = new Set([1])
  const conjunctions = new Set([2, 3])
  const connections = [
    {
      id: {
        sourceId: 2,
        targetId: 1,
      },
      negated: false,
    },
    {
      id: {
        sourceId: 2,
        targetId: 3,
      },
      negated: false,
    },
    {
      id: {
        sourceId: 3,
        targetId: 2,
      },
      negated: false,
    },
  ]

  const payload = constructPayload({ atoms, conjunctions, connections })

  expect(payload).toEqual(new CycleError([2, 3, 2]))
})

test('construct when node appears twice in equation and do not detect cycle', () => {
  const atoms = new Set([1, 4, 5])
  const conjunctions = new Set([2, 3])
  const connections = [
    {
      id: {
        sourceId: 2,
        targetId: 1,
      },
      negated: false,
    },
    {
      id: {
        sourceId: 3,
        targetId: 1,
      },
      negated: false,
    },
    {
      id: {
        sourceId: 4,
        targetId: 2,
      },
      negated: false,
    },
    {
      id: {
        sourceId: 5,
        targetId: 3,
      },
      negated: false,
    },
  ]

  const payload = constructPayloadSuccessfully({ atoms, conjunctions, connections })

  const expectedKb = '1 <=> (4) || (5)\n{}'
  expect(payload.kb).toEqual(expectedKb)
})

test('ignore atoms without equation', () => {
  const atoms = new Set([1])

  const payload = constructPayloadSuccessfully({ atoms })

  expect(payload.kb).toEqual('{}')
})

test('constructs assumptions', () => {
  const atoms = new Set([1, 2, 3])
  const connections = [
    {
      id: {
        sourceId: 1,
        targetId: 3,
      },
      negated: false,
    },
    {
      id: {
        sourceId: 2,
        targetId: 3,
      },
      negated: false,
    },
  ]
  const assumptions = [
    {
      atomId: 1,
      negated: false,
    },
    {
      atomId: 2,
      negated: true,
    },
  ]

  const payload = constructPayloadSuccessfully({ atoms, connections, assumptions })

  expect(payload.kb).toEqual('3 <=> 1 || 2\n{1, !2}')
})

test('construct ignoring unused background atoms', () => {
  // If observations for unused background atoms are sent,
  // the server throws an error.
  const atoms = new Set([1])
  const assumptions = [
    {
      atomId: 1,
      negated: false,
    },
  ]

  const payload = constructPayloadSuccessfully({ atoms, assumptions })

  expect(payload.kb).toEqual('{}')
})

test('constructs observations', () => {
  const atoms = new Set([1])
  const observations: Literal[] = [
    {
      atomId: 1,
      negated: false,
    },
    {
      atomId: 2,
      negated: true,
    },
  ]

  const payload = constructPayloadSuccessfully({ atoms, observations })

  expect(payload.observations).toEqual('1, !2')
})

test('fail to construct with no atoms', () => {
  const atoms = new Set<number>()
  const payload = constructPayload({ atoms })

  expect(payload).toEqual(new EmptyKnowlegeBaseError())
})
