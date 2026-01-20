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
export interface DirectedGraph<VertexT, VertexIdT> {
  perIdNodes: Map<VertexIdT, VertexT>
  perIdTargetIds: Map<VertexIdT, Set<VertexIdT>>
  perIdSourceIds: Map<VertexIdT, Set<VertexIdT>>
  getId(node: VertexT): VertexIdT
}

export function createDirectedGraph<VertexT, VertexIdT>(
  getId: (node: VertexT) => VertexIdT,
): DirectedGraph<VertexT, VertexIdT> {
  return {
    perIdNodes: new Map(),
    perIdTargetIds: new Map(),
    perIdSourceIds: new Map(),
    getId: getId,
  }
}

export function addNode<VertexT, VertexIdT>(
  graph: DirectedGraph<VertexT, VertexIdT>,
  node: VertexT,
) {
  const nodeId = graph.getId(node)
  if (graph.perIdNodes.has(nodeId)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw Error(`Node with ID \`${nodeId}\` already exists.`)
  }
  graph.perIdNodes.set(nodeId, node)
  graph.perIdTargetIds.set(nodeId, new Set())
  graph.perIdSourceIds.set(nodeId, new Set())
}

export function removeNode<VertexT, VertexIdT>(
  graph: DirectedGraph<VertexT, VertexIdT>,
  nodeId: VertexIdT,
) {
  if (!graph.perIdNodes.has(nodeId)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw Error(`Node with ID \`${nodeId}\` does not exist.`)
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const targetIds = graph.perIdTargetIds.get(nodeId)!
  for (const targetId of targetIds) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    graph.perIdSourceIds.get(targetId)!.delete(nodeId)
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const sourceIds = graph.perIdSourceIds.get(nodeId)!
  for (const sourceId of sourceIds) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    graph.perIdTargetIds.get(sourceId)!.delete(nodeId)
  }
  graph.perIdNodes.delete(nodeId)
  graph.perIdTargetIds.delete(nodeId)
  graph.perIdSourceIds.delete(nodeId)
}

export function hasEdge<VertexT, VertexIdT>(
  graph: DirectedGraph<VertexT, VertexIdT>,
  sourceId: VertexIdT,
  targetId: VertexIdT,
) {
  const targetIds = graph.perIdTargetIds.get(sourceId)
  if (targetIds === undefined) {
    return false
  }
  return targetIds.has(targetId)
}

export function getEdges<VertexT, VertexIdT>(
  graph: DirectedGraph<VertexT, VertexIdT>,
): [VertexIdT, VertexIdT][] {
  const edges: [VertexIdT, VertexIdT][] = []
  for (const [id, targetIds] of graph.perIdTargetIds.entries()) {
    for (const targetId of targetIds) {
      edges.push([id, targetId])
    }
  }
  return edges
}

export function addEdge<VertexT, VertexIdT>(
  graph: DirectedGraph<VertexT, VertexIdT>,
  sourceId: VertexIdT,
  targetId: VertexIdT,
) {
  if (hasEdge(graph, sourceId, targetId)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw Error(`Edge with source ID \`${sourceId}\` and target ID \`${targetId}\` already exist.`)
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  graph.perIdTargetIds.get(sourceId)!.add(targetId)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  graph.perIdSourceIds.get(targetId)!.add(sourceId)
}

export function removeEdge<VertexT, VertexIdT>(
  graph: DirectedGraph<VertexT, VertexIdT>,
  sourceId: VertexIdT,
  targetId: VertexIdT,
) {
  if (!hasEdge(graph, sourceId, targetId)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw Error(`Edge with source ID \`${sourceId}\` and target ID \`${targetId}\` does not exist.`)
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  graph.perIdTargetIds.get(sourceId)!.delete(targetId)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  graph.perIdSourceIds.get(targetId)!.delete(sourceId)
}

export function hasNode<VertexT, VertexIdT>(
  graph: DirectedGraph<VertexT, VertexIdT>,
  vertexId: VertexIdT,
) {
  return graph.perIdNodes.has(vertexId)
}

export function getNode<VertexT, VertexIdT>(
  graph: DirectedGraph<VertexT, VertexIdT>,
  vertexId: VertexIdT,
) {
  return graph.perIdNodes.get(vertexId)
}

export function getNodes<VertexT, VertexIdT>(graph: DirectedGraph<VertexT, VertexIdT>) {
  return [...graph.perIdNodes.values()]
}

export function getNodeIds<VertexT, VertexIdT>(graph: DirectedGraph<VertexT, VertexIdT>) {
  return [...graph.perIdNodes.keys()]
}
