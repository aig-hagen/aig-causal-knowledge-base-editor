<!--
  Causal Knowledge Base Editor - A graphical application to reason with causal knowledge.

  Copyright (C) 2026  Artificial Intelligence Group at the Faculty of Mathematics and Computer Science of the FernUniversität in Hagen <https://www.fernuni-hagen.de/aig/en/>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->
<script setup lang="ts">
import {
  NodeShape,
  SideType,
  type GraphComponent,
  type jsonLink,
  type jsonNode,
  type NodeProps,
} from '@/modules/common/graphComponentTypes'
import { onMounted, ref, useTemplateRef } from 'vue'
import * as Colors from '@/modules/common/colors'
import { useMutationObserver } from '@vueuse/core'
import type { DialectialSequenceExplanationDTO } from '@/modules/sequence-explanation/DialectialSequenceExplanationDTO'
import type { AttackDTO } from '@/modules/sequence-explanation/composables/useSequenceExplanationRequest'
import {
  addEdge,
  addNode,
  createDirectedGraph,
  getEdges,
  hasEdge,
  hasNode,
} from '@/modules/graph/graph'

const { explanation, attacks, getReadableArgument } = defineProps<{
  explanation: DialectialSequenceExplanationDTO
  attacks: AttackDTO[]
  getReadableArgument(argument: string): string
}>()

const ARGUMENT_WIDTH_IN_PX = 174
const ARGUMENT_HEIGHT_IN_PX = 56

const Y_OFFSET = ARGUMENT_HEIGHT_IN_PX * 1.5
const X_OFFSET = Y_OFFSET

const Y_SPACING = 64
const X_SPACING = Y_SPACING

function createArgumentProps(): NodeProps {
  return {
    shape: NodeShape.RECTANGLE,
    width: ARGUMENT_WIDTH_IN_PX,
    height: ARGUMENT_HEIGHT_IN_PX,
    cornerRadius: 4,
    // The generall direction is from left to right.
    // Most edges start at the right side of the left node and end on the left side of the right node.
    // Therefore reflecitve edges should also start on the right side of nodes.
    reflexiveEdgeStart: SideType.RIGHT,
  }
}

function getArgumentColor(isSupport: boolean) {
  const COLOR_SUPPORTES = Colors.NODE_GREEN
  const COLOR_DEFEATED = Colors.NODE_RED
  // The colors are taken form "Sequence Explanations for Acceptance in Abstract Argumentation" by Lars Bengel and Matthias Thimm
  if (isSupport) {
    return COLOR_SUPPORTES
  } else {
    return COLOR_DEFEATED
  }
}

const graphComponentElementRef = useTemplateRef<HTMLElement>('graph-component')
const graphInstanceRef = ref<GraphComponent | null>(null)

onMounted(() => {
  const graphComponentElement = graphComponentElementRef.value
  if (graphComponentElement === null) {
    throw new Error('Graph component element not available.')
  }

  if (graphComponentElement.childNodes.length === 0) {
    throw new Error('Graph component element empty.')
  }

  const graphHost = graphComponentElement.getElementsByClassName(
    'graph-controller__graph-host',
  )[0] as HTMLElement

  function isInitialised() {
    return !graphHost.classList.contains('uninitialised')
  }

  function initGraphInstance(graphComponentElement: HTMLElement) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const graphInstance = (graphComponentElement as any)._instance.exposed as GraphComponent
    graphInstanceRef.value = graphInstance
    graphInstance.toggleNodePhysics(false)
    graphInstance.toggleZoom(true)
    graphInstance.setDefaults({ nodeAutoGrowToLabelSize: false, nodeProps: createArgumentProps() })
    drawExplanation(graphInstance)
    graphInstance.setEditability(
      {
        fixedPosition: {
          x: false,
          y: false,
        },
        deletable: false,
        labelEditable: false,
        allowIncomingLinks: false,
        allowOutgoingLinks: false,
      },
      undefined,
    )
    const margin = ARGUMENT_HEIGHT_IN_PX
    graphInstance.centerView({
      marginTop: margin,
      marginRight: margin,
      marginBottom: margin,
      marginLeft: margin,
    })
  }

  if (isInitialised()) {
    initGraphInstance(graphComponentElement)
  }

  const stopObserver = useMutationObserver(
    graphHost,
    (mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          if (isInitialised()) {
            initGraphInstance(graphComponentElement)
            stopObserver.stop()
          }
        }
      }
    },
    { attributes: true, attributeFilter: ['class'] },
  )
})

function drawExplanation(graphInstance: GraphComponent) {
  // Create directed graph for lookup
  const directedGraph = createDirectedGraph<string, string>((argumentId) => argumentId)
  for (const [...defeated] of explanation.defeated) {
    for (const argument of defeated) {
      addNode(directedGraph, argument)
    }
  }
  for (const [...supporters] of explanation.supporters) {
    for (const argument of supporters) {
      addNode(directedGraph, argument)
    }
  }
  for (const { attacker, attacked } of attacks) {
    const atteckerInNodes = hasNode(directedGraph, attacker)
    if (!atteckerInNodes) {
      continue
    }
    const atteckedInNodes = hasNode(directedGraph, attacked)
    if (!atteckedInNodes) {
      continue
    }
    addEdge(directedGraph, attacker, attacked)
  }

  // Create init layout of arguments in columns and rows
  const columns = new Array<(string | undefined)[]>(
    explanation.defeated.length + explanation.supporters.length,
  )
  for (let columnIdx = 0; columnIdx < columns.length; columnIdx++) {
    const isSupporters = columnIdx % 2 === 0
    const argumentsInColumn = isSupporters
      ? explanation.supporters[Math.floor(columnIdx / 2)]
      : explanation.defeated[Math.floor(columnIdx / 2)]
    if (argumentsInColumn === undefined) {
      throw new Error('No argument list found.')
    }
    const column: string[] = []
    columns[columnIdx] = column
    for (const argument of argumentsInColumn) {
      column.push(argument)
    }
  }
  // Iterate to avoid some nodes overlapping links
  for (let rowIdx = 0; ; rowIdx++) {
    let noMoreRows = true
    for (const column of columns) {
      if (column.length > rowIdx) {
        noMoreRows = false
      }
    }
    if (noMoreRows) {
      break
    }
    for (let columnStartIdx = 0; columnStartIdx < columns.length; columnStartIdx++) {
      const argumentStart = columns[columnStartIdx]?.[rowIdx]
      if (argumentStart === undefined) {
        continue
      }
      let needsToMoveDown = false
      for (
        let columndEndIdx = columns.length - 1;
        columndEndIdx > columnStartIdx;
        columndEndIdx--
      ) {
        const argumentEnd = columns[columndEndIdx]?.[rowIdx]
        if (argumentEnd === undefined) {
          continue
        }
        if (needsToMoveDown) {
          columns[columndEndIdx]?.unshift(undefined)
        }
        if (
          hasEdge(directedGraph, argumentStart, argumentEnd) ||
          hasEdge(directedGraph, argumentStart, argumentEnd)
        ) {
          needsToMoveDown = true
        }
      }
    }
  }

  // Create and pass graph to graph component
  const nodes: jsonNode[] = []
  columns.forEach((column, columnIdx) => {
    const isSupporters = columnIdx % 2 === 0
    for (let rowIdx = 0; rowIdx < column.length; rowIdx++) {
      const argument = column[rowIdx]
      if (argument === undefined) {
        continue
      }
      const nodeId = argument
      nodes.push({
        id: nodeId,
        props: createArgumentProps(),
        label: getReadableArgument(argument),
        x: columnIdx * (ARGUMENT_WIDTH_IN_PX + X_SPACING) + X_OFFSET,
        y: rowIdx * (ARGUMENT_HEIGHT_IN_PX + Y_SPACING) + Y_OFFSET,
        color: getArgumentColor(isSupporters),
      })
    }
  })
  const links: jsonLink[] = []
  for (const [attacker, attacked] of getEdges(directedGraph)) {
    links.push({
      sourceId: attacker,
      targetId: attacked,
    })
  }
  const graph = { nodes, links }
  graphInstance.setGraph(graph)
}

// IDs starting with numbers break the graph component code
// because they are used without escaping in CSS selectors
const graphComponentId = 'g' + crypto.randomUUID()
</script>

<template>
  <div class="sequence-explantion">
    <graph-component ref="graph-component" :id="graphComponentId"></graph-component>
  </div>
</template>

<style scoped></style>
