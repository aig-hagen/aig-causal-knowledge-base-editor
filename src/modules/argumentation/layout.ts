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
  getArguments,
  getAttacks,
  type Argument,
  type ArgumentationFramework,
  type ArgumentId,
  type Position,
} from '@/modules/argumentation/argumentationFramework'
import { Graphviz } from '@hpcc-js/wasm-graphviz'

import {
  ARGUMENT_HEIGHT_IN_PX,
  ARGUMENT_RADIUS_IN_PX,
  ARGUMENT_WIDTH_IN_PX,
} from '@/modules/argumentation/consts'

const graphviz = await Graphviz.load()

export function layout<ArgumentT extends Argument>(
  argumentationFramework: ArgumentationFramework<ArgumentT>,
) {
  const nodePositions = getNodePositions(argumentationFramework)
  for (const argument of getArguments(argumentationFramework)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newPosition = nodePositions.get(argument.id)!
    argument.graphicalData.position.x = newPosition.x
    argument.graphicalData.position.y = newPosition.y
  }
}

interface DotJson {
  // Objects is unset, when the graph has no nodes.
  objects?: {
    name: string
    pos: string
  }[]
}

function getNodePositions(
  argumentationFramework: ArgumentationFramework<Argument>,
): Map<ArgumentId, Position> {
  // The argument ID can be an arbitrary string, which might break the generated dot source.
  // Instead of escaping (and forgetting to consider special cases), we used the indieces as IDs.
  const argumentIdToSafeId = new Map<string, string>()
  const safeIdToArgumentId = new Map<string, string>()
  for (const [index, argument] of getArguments(argumentationFramework).entries()) {
    const safeId = index.toString()
    argumentIdToSafeId.set(argument.id, safeId)
    safeIdToArgumentId.set(safeId, argument.id)
  }
  const dotSource = argumentationFrameworkToDotSource(argumentationFramework, argumentIdToSafeId)
  const dotJsonString = graphviz.dot(dotSource, 'json')
  const dotJson = JSON.parse(dotJsonString) as DotJson

  const nodePositions = new Map()
  for (const object of dotJson.objects ?? []) {
    const safeId = object.name
    const [xString, yString] = object.pos.split(',')
    if (xString === undefined || yString === undefined) {
      throw new Error('Invalid object position: ' + object.pos)
    }
    const x = Number.parseFloat(xString)
    const y = Number.parseFloat(yString)
    if (!Number.isFinite(x)) {
      throw new Error('Invalid x value in object position: ' + object.pos)
    }
    if (!Number.isFinite(y)) {
      throw new Error('Invalid y value in object position: ' + object.pos)
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id = safeIdToArgumentId.get(safeId)!
    nodePositions.set(id, {
      x: x,
      y: y,
    })
  }

  return convertPositionsForArgumentEditor(nodePositions)
}

function convertPositionsForArgumentEditor(
  byIdPositions: Map<ArgumentId, { x: number; y: number }>,
): Map<ArgumentId, Position> {
  if (byIdPositions.size === 0) {
    return byIdPositions
  }
  const positions = [...byIdPositions.values()]
  const ys = positions.map((position) => position.y)
  const yMin = Math.min(...ys)
  const yMax = Math.max(...ys)
  const height = yMax - yMin

  return new Map(
    [...byIdPositions.entries()].map(([id, position]) => [
      id,
      {
        x: position.x,
        y: height - position.y,
      },
    ]),
  )
}

function argumentationFrameworkToDotSource(
  argumentationFramework: ArgumentationFramework<Argument>,
  argumentIdToSafeId: Map<string, string>,
) {
  // The final dot will look like:
  //
  // ```
  // digraph {
  //   rankdir="BT"
  //   ranksep=1
  //    node [shape=circle, fixedsize=true, width=1.72, height=0.56]
  //
  //     a[shape=circle, fixedsize=true, width=0.56, height=0.56]
  //     b[shape=circle, fixedsize=true, width=0.56, height=0.56]
  //     c[shape=circle, fixedsize=true, width=0.56, height=0.56]
  //
  //     b -> a
  //     c -> a
  //     c -> b
  //     b -> c
  // }
  // ```
  // 72 is the default scale used by Graphviz.
  // See https://graphviz.org/doc/info/command.html#-s
  const PIXEL_PER_IN = 72
  function toInch(px: number) {
    return px / PIXEL_PER_IN
  }
  const ARGUMENT_DIAMETER_IN_IN = toInch(ARGUMENT_RADIUS_IN_PX) * 2
  const ARGUMENT_WIDTH_IN_IN = toInch(ARGUMENT_WIDTH_IN_PX)
  const ARGUMENT_HEIGHT_IN_IN = toInch(ARGUMENT_HEIGHT_IN_PX)
  const MIN_HORIZONTAL_ARGUMENT_DISTANCE = ARGUMENT_HEIGHT_IN_IN / 2

  const dotSourceLines = []
  dotSourceLines.push('digraph {')
  // NOTE Can be made configurable in the future
  dotSourceLines.push('  rankdir="BT"')
  dotSourceLines.push('  ranksep=1')
  dotSourceLines.push(`  nodesep=${MIN_HORIZONTAL_ARGUMENT_DISTANCE.toString()}`)
  dotSourceLines.push(`  node[fixedsize=true]`)
  dotSourceLines.push('')
  for (const argument of getArguments(argumentationFramework)) {
    let shapeProps: string
    switch (argument.graphicalData.shape) {
      case 'circle':
        shapeProps = `shape=circle width=${ARGUMENT_DIAMETER_IN_IN.toString()} height=${ARGUMENT_DIAMETER_IN_IN.toString()}`
        break
      case 'rectangle':
        shapeProps = `shape=rect width=${ARGUMENT_WIDTH_IN_IN.toString()} height=${ARGUMENT_HEIGHT_IN_IN.toString()}`
        break
      default:
        throw Error('Unexpected shape in argument:' + JSON.stringify(argument))
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const safeId = argumentIdToSafeId.get(argument.id)!
    dotSourceLines.push(`  "${safeId}"[margin="0,0" ${shapeProps}]`)
  }
  for (const [attackerId, attackedId] of getAttacks(argumentationFramework)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const safeAttackerId = argumentIdToSafeId.get(attackerId)!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const safeAttackedId = argumentIdToSafeId.get(attackedId)!
    dotSourceLines.push(`  "${safeAttackerId}" -> "${safeAttackedId}"`)
  }
  dotSourceLines.push('')
  dotSourceLines.push('}')
  return dotSourceLines.join('\n')
}
