import type { ConnectionId, Id } from './graphicalCausalKnowledgeBase'

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
