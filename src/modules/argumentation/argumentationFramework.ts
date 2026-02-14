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
} from '@/modules/graph/graph'

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

export interface ArgumentationFramework<ArgumentT extends Argument> {
  graph: DirectedGraph<ArgumentT, ArgumentId>
}

export function createArgumentationFramework<
  ArgumentT extends Argument,
>(): ArgumentationFramework<ArgumentT> {
  return {
    graph: createDirectedGraph<ArgumentT, ArgumentId>((argument) => argument.id),
  }
}

export function hasArgument<ArgumentT extends Argument>(
  argumentationFramework: ArgumentationFramework<ArgumentT>,
  argumentId: ArgumentId,
) {
  return hasNode(argumentationFramework.graph, argumentId)
}

export function getArgument<ArgumentT extends Argument>(
  argumentationFramework: ArgumentationFramework<ArgumentT>,
  argumentId: ArgumentId,
) {
  return getNode(argumentationFramework.graph, argumentId)
}

export function getArguments<ArgumentT extends Argument>(
  argumentationFramework: ArgumentationFramework<ArgumentT>,
) {
  return getNodes(argumentationFramework.graph)
}

export function getArgumentIds<ArgumentT extends Argument>(
  argumentationFramework: ArgumentationFramework<ArgumentT>,
) {
  return getNodeIds(argumentationFramework.graph)
}

export function addArgument<ArgumentT extends Argument>(
  argumentationFramework: ArgumentationFramework<ArgumentT>,
  argument: ArgumentT,
) {
  addNode(argumentationFramework.graph, argument)
}

export function removeArgument<ArgumentT extends Argument>(
  argumentationFramework: ArgumentationFramework<ArgumentT>,
  argumentId: ArgumentId,
) {
  removeNode(argumentationFramework.graph, argumentId)
}

export type Attack = [ArgumentId, ArgumentId]

export function getAttacks<ArgumentT extends Argument>(
  argumentationFramework: ArgumentationFramework<ArgumentT>,
): Attack[] {
  return getEdges(argumentationFramework.graph)
}

export function addAttack<ArgumentT extends Argument>(
  argumentationFramework: ArgumentationFramework<ArgumentT>,
  attackerId: ArgumentId,
  attackedId: ArgumentId,
) {
  addEdge(argumentationFramework.graph, attackerId, attackedId)
}

export function removeAttack<ArgumentT extends Argument>(
  argumentationFramework: ArgumentationFramework<ArgumentT>,
  attackerId: ArgumentId,
  attackedId: ArgumentId,
) {
  removeEdge(argumentationFramework.graph, attackerId, attackedId)
}
