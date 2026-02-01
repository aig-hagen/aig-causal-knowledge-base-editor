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
import type { ConnectionId, Id } from '@/modules/causal-knowledge/graphicalCausalKnowledgeBase'

// Detect a cycle with Kahn's Algorithm
export function findCycle(connections: ConnectionId[]): Id[] | null {
  const perSourceIdToTargetIds = new Map<Id, Id[]>()

  for (const { sourceId, targetId } of connections) {
    let targetIds = perSourceIdToTargetIds.get(sourceId)
    if (targetIds === undefined) {
      targetIds = []
      perSourceIdToTargetIds.set(sourceId, targetIds)
    }
    targetIds.push(targetId)
  }

  const visited = new Set<Id>()
  const recursionStack = new Set<Id>()

  function depthFirstTraversal(node: Id): Id[] | null {
    if (recursionStack.has(node)) {
      // Elements in a set are iterated in insertion order,
      // so we can use it to make construct a path.
      const path = [...recursionStack, node]
      const cycle = path.slice(path.indexOf(node))
      return cycle
    }

    if (visited.has(node)) {
      return null
    }

    visited.add(node)
    recursionStack.add(node)

    const targetIds = perSourceIdToTargetIds.get(node)
    if (targetIds) {
      for (const targetId of targetIds) {
        const cycle = depthFirstTraversal(targetId)
        if (cycle) {
          return cycle
        }
      }
    }

    recursionStack.delete(node)
    return null
  }

  for (const sourceId of perSourceIdToTargetIds.keys()) {
    const cycle = depthFirstTraversal(sourceId)
    if (cycle) {
      return cycle
    }
  }

  return null
}
