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
import { it, expect } from 'vitest'
import { findCycle } from '@/modules/causal-knowledge/cycles'

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
