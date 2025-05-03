import { it, expect } from 'vitest'
import { findCycle } from './cycles'

it('find self loop', () => {
  const connections = [{ sourceId: 0, targetId: 0 }]

  const cycle = findCycle(connections)
  expect(cycle).toEqual([0, 0])
})

it('should find cycle', () => {
  const connections = [
    { sourceId: 0, targetId: 1 },
    { sourceId: 1, targetId: 2 },
    { sourceId: 2, targetId: 0 },
  ]

  const cycle = findCycle(connections)
  expect(cycle).toEqual([0, 1, 2, 0])
})

it('should should return cycle and not full path', () => {
  const connections = [
    { sourceId: 0, targetId: 1 },
    { sourceId: 1, targetId: 2 },
    { sourceId: 2, targetId: 3 },
    { sourceId: 3, targetId: 1 },
  ]

  const cycle = findCycle(connections)
  expect(cycle).toEqual([1, 2, 3, 1])
})

it('should not find cycle', () => {
  const connections = [
    { sourceId: 0, targetId: 1 },
    { sourceId: 1, targetId: 2 },
    { sourceId: 2, targetId: 3 },
  ]

  const cycle = findCycle(connections)
  expect(cycle).toBeNull()
})

it('should find no cycle in empty graph', () => {
  const cycle = findCycle([])

  expect(cycle).toBeNull()
})
