import * as z from 'zod'

import {
  addArgument,
  addAttack,
  createArgumentationFramework,
  type ArgumentationFramework,
  type Position,
} from './argumentationFramework'
import { Graphviz } from '@hpcc-js/wasm-graphviz'

import dix from '@/../third-party/xai-ca/xray/7a83aa5/examples/dix.json'
import double_loop from '@/../third-party/xai-ca//xray/7a83aa5/examples/double_loop.json'
import martin_str from '@/../third-party/xai-ca/xray/7a83aa5/examples/martin_str.json'
import matti_lpnmr_2024 from '@/../third-party/xai-ca/xray/7a83aa5/examples/matti_lpnmr_2024.json'
import meal_wine from '@/../third-party/xai-ca/xray/7a83aa5/examples/meal_wine.json'
import min_uniq_stb from '@/../third-party/xai-ca/xray/7a83aa5/examples/min_uniq_stb.json'
import pierson_post from '@/../third-party/xai-ca/xray/7a83aa5/examples/pierson_post.json'
import safa24 from '@/../third-party/xai-ca/xray/7a83aa5/examples/safa24.json'
import simple_game from '@/../third-party/xai-ca/xray/7a83aa5/examples/simple_game.json'
import tapp24 from '@/../third-party/xai-ca/xray/7a83aa5/examples/tapp24.json'
import tapp25 from '@/../third-party/xai-ca/xray/7a83aa5/examples/tapp25.json'
import unique_stb from '@/../third-party/xai-ca/xray/7a83aa5/examples/unique-stb.json'
import wild_animals from '@/../third-party/xai-ca/xray/7a83aa5/examples/wild-animals.json'

const afXrayExampleSources = [
  dix,
  double_loop,
  { ...martin_str, name: 'martin_str' },
  matti_lpnmr_2024,
  meal_wine,
  { ...min_uniq_stb, name: 'min_uniq_stb' },
  { ...pierson_post, name: 'pierson_post' },
  safa24,
  simple_game,
  tapp24,
  tapp25,
  { ...unique_stb, name: 'unique_stb' },
  wild_animals,
]

import { ARGUMENT_RADIUS_IN_PX } from '@/argumentation/consts'

const graphviz = await Graphviz.load()

// Validate IDs to prevent injection when creating the dot source for Graphviz.
const AfXrayExampleId = z.string().regex(/^[a-zA-Z0-9]+$/, {
  message: 'IDs can only contain alphanumeric characters',
})
type AfXrayExampleId = z.infer<typeof AfXrayExampleId>

const AfXrayExample = z.object({
  name: z.string(),
  arguments: z.array(
    z.object({
      id: AfXrayExampleId,
      annotation: z.optional(z.string()),
      name: z.optional(z.string()),
    }),
  ),
  defeats: z.array(
    z.object({
      from: AfXrayExampleId,
      to: AfXrayExampleId,
    }),
  ),
})
type AfXrayExample = z.infer<typeof AfXrayExample>

interface DotJson {
  objects: {
    name: string
    pos: string
  }[]
}

export interface LazyArgumentationFrameworkDataset {
  name: string
  load(): ArgumentationFramework
}

const datasets: LazyArgumentationFrameworkDataset[] = afXrayExampleSources.map(
  (unverfiedSource) => {
    return {
      name: unverfiedSource.name,
      load: () => {
        const source = AfXrayExample.parse(unverfiedSource)
        const nodePositions = getNodePositions(source)
        const argumentationFramework = createArgumentationFramework()
        for (const argument of source.arguments) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const position = nodePositions.get(argument.id)!
          addArgument(argumentationFramework, {
            id: argument.id,
            name: argument.id,
            graphicalData: {
              shape: 'circle',
              position: {
                x: position.x,
                y: position.y,
              },
            },
          })
        }
        for (const defeat of source.defeats) {
          addAttack(argumentationFramework, defeat.from, defeat.to)
        }
        return argumentationFramework
      },
    }
  },
)

function getNodePositions(example: AfXrayExample): Map<AfXrayExampleId, Position> {
  const dotSource = afXrayExampleToDotSource(example)
  console.log(dotSource)
  const dotJsonString = graphviz.dot(dotSource, 'json')
  const dotJson = JSON.parse(dotJsonString) as DotJson

  const nodePositions = new Map()
  for (const object of dotJson.objects) {
    const id = object.name
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
    nodePositions.set(id, {
      x: x,
      y: y,
    })
  }

  return convertPositionsForArgumentEditor(nodePositions)
}

function convertPositionsForArgumentEditor(
  byIdPositions: Map<AfXrayExampleId, { x: number; y: number }>,
): Map<AfXrayExampleId, Position> {
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
        // Offset because of left-side legend
        // XXX Legend should go to right-side after evaluation console is removed.
        x: position.x + 8 * ARGUMENT_RADIUS_IN_PX,
        // Invert because SVG y-axis goes in other direction
        // Offset because of navigation bar
        // XXX Navigation bar should overlay the editor in the future.
        y: height - position.y + 4 * ARGUMENT_RADIUS_IN_PX,
      },
    ]),
  )
}

function afXrayExampleToDotSource(example: AfXrayExample) {
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
  const PIXEL_PER_IN = 96
  const ARGUMENT_DIAMETER_IN_IN = (ARGUMENT_RADIUS_IN_PX * 2) / PIXEL_PER_IN

  const dotSourceLines = []
  dotSourceLines.push('digraph {')
  // NOTE Can be made configurable in the future
  dotSourceLines.push('  rankdir="BT"')
  dotSourceLines.push('  ranksep=1')
  dotSourceLines.push(
    `  node[shape=circle, fixedsize=true, width=${ARGUMENT_DIAMETER_IN_IN.toString()}, height=${ARGUMENT_DIAMETER_IN_IN.toString()}]`,
  )
  dotSourceLines.push('')
  for (const argument of example.arguments) {
    dotSourceLines.push(`  ${argument.id}`)
  }
  for (const defeated of example.defeats) {
    dotSourceLines.push(`  ${defeated.from} -> ${defeated.to}`)
  }
  dotSourceLines.push('')
  dotSourceLines.push('}')
  return dotSourceLines.join('\n')
}

export default datasets
