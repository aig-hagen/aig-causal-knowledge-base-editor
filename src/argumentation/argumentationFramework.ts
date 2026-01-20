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
import {
  addEdge,
  addNode,
  createDirectedGraph,
  getEdges,
  getNode,
  getNodeIds,
  getNodes,
  hasNode,
  removeEdge,
  removeNode,
  type DirectedGraph,
} from '@/graph/graph'

export type ArgumentId = string

export type Shape = 'circle' | 'rectangle'

export interface Position {
  x: number
  y: number
}

export interface GraphicalData {
  shape: Shape
  position: Position
}

export interface Argument {
  id: ArgumentId
  name: string
  graphicalData: GraphicalData
}

export interface ArgumentationFramework {
  graph: DirectedGraph<Argument, ArgumentId>
}

export function createArgumentationFramework(): ArgumentationFramework {
  return {
    graph: createDirectedGraph<Argument, ArgumentId>((argument) => argument.id),
  }
}

export function hasArgument(
  argumentationFramework: ArgumentationFramework,
  argumentId: ArgumentId,
) {
  return hasNode(argumentationFramework.graph, argumentId)
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

export function getArgumentIds(argumentationFramework: ArgumentationFramework) {
  return getNodeIds(argumentationFramework.graph)
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

export function getAttacks(argumentationFramework: ArgumentationFramework) {
  return getEdges(argumentationFramework.graph)
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
