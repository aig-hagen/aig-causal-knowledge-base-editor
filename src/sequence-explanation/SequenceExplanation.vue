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
 *-->
<script setup lang="ts">
import {
  NodeShape,
  SideType,
  type GraphComponent,
  type NodeProps,
} from '@/misc/graphComponentTypes'
import { onMounted, ref, useTemplateRef } from 'vue'
import * as Colors from '@/common/colors'
import { useMutationObserver } from '@vueuse/core'
import type { DialectialSequenceExplanationDTO } from '@/sequence-explanation/DialectialSequenceExplanationDTO'
import type { AttackDTO } from '@/sequence-explanation/useSequenceExplanationRequest'

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
          x: true,
          y: true,
        },
        deletable: false,
        labelEditable: false,
        allowIncomingLinks: false,
        allowOutgoingLinks: false,
      },
      undefined,
    )
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function drawExplanation(graphInstance: any) {
  const nodes = []
  for (
    let column = 0;
    column < explanation.defeated.length + explanation.supporters.length;
    column++
  ) {
    const isSupporters = column % 2 === 0
    const argumentsInColumn = isSupporters
      ? explanation.supporters[Math.floor(column / 2)]
      : explanation.defeated[Math.floor(column / 2)]
    if (argumentsInColumn === undefined) {
      throw new Error('No argument list found.')
    }
    for (let row = 0; row < argumentsInColumn.length; row++) {
      const argument = argumentsInColumn[row]
      if (argument === undefined) {
        throw new Error('Argument is undefined.')
      }
      const nodeId = argument
      // TODO(https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/399) improve layouting
      nodes.push({
        id: nodeId,
        props: createArgumentProps(),
        label: getReadableArgument(argument),
        x: column * (ARGUMENT_WIDTH_IN_PX + X_SPACING) + X_OFFSET,
        y: row * (ARGUMENT_HEIGHT_IN_PX + Y_SPACING) + Y_OFFSET,
        color: getArgumentColor(isSupporters),
      })
    }
  }
  const links = []
  for (const attack of attacks) {
    const atteckerInNodes = nodes.some((node) => node.id === attack.attacker)
    if (!atteckerInNodes) {
      continue
    }
    const atteckedInNodes = nodes.some((node) => node.id === attack.attacked)
    if (!atteckedInNodes) {
      continue
    }
    links.push({
      sourceId: attack.attacker,
      targetId: attack.attacked,
    })
  }
  const graph = { nodes, links }
  // TODO(https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/399) center after drawing.
  graphInstance.setGraph(graph)
  // NOTE Consider zooming out after setting inital graph
  // Would also be relevant for other graphs
}
</script>

<template>
  <div class="sequence-explantion">
    <graph-component ref="graph-component"></graph-component>
  </div>
</template>

<style scoped></style>
