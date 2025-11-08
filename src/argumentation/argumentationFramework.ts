import {
  addEdge,
  addNode,
  createDirectedGraph,
  getNode,
  getNodes,
  removeEdge,
  removeNode,
  type DirectedGraph,
} from '@/graph/graph'

export type ArgumentId = string
export interface Position {
  x: number
  y: number
}
export interface Argument {
  id: ArgumentId
  name: string
  position: Position
}

export interface ArgumentationFramework {
  graph: DirectedGraph<Argument, ArgumentId>
}

export function createArgumentationFramework() {
  return {
    graph: createDirectedGraph<Argument, ArgumentId>((argument) => argument.id),
  }
}

export function getArgument(
  argumentationFramework: ArgumentationFramework,
  argumentId: ArgumentId,
) {
  return getNode(argumentationFramework.graph, argumentId)
}

export function getArguments(argumentationFramework: ArgumentationFramework) {
  return getNodes(argumentationFramework.graph)
}

export function addArgument(argumentationFramework: ArgumentationFramework, argument: Argument) {
  addNode(argumentationFramework.graph, argument)
}

export function removeArgument(
  argumentationFramework: ArgumentationFramework,
  argumentId: ArgumentId,
) {
  removeNode(argumentationFramework.graph, argumentId)
}

export function addAttack(
  argumentationFramework: ArgumentationFramework,
  attackerId: ArgumentId,
  attackedId: ArgumentId,
) {
  addEdge(argumentationFramework.graph, attackerId, attackedId)
}

export function removeAttack(
  argumentationFramework: ArgumentationFramework,
  attackerId: ArgumentId,
  attackedId: ArgumentId,
) {
  removeEdge(argumentationFramework.graph, attackerId, attackedId)
}
