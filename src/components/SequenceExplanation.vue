<script setup lang="ts">
import type {
  AttackDTO,
  DialectialSequenceExplanationDTO,
} from '@/composables/useEvaluationRequest'
import {
  NodeShape,
  SideType,
  type GraphComponent,
  type NodeProps,
} from '@/util/graphComponentTypes'
import { onMounted, ref, useTemplateRef } from 'vue'

const { explanation, attacks, getReadableArgument } = defineProps<{
  explanation: DialectialSequenceExplanationDTO
  attacks: AttackDTO[]
  getReadableArgument(argument: string): string
}>()

const ARGUMNET_WIDTH_IN_PX = 174
const ARGUMNET_HEIGHT_IN_PX = 56

const Y_OFFSET = ARGUMNET_HEIGHT_IN_PX * 1.5
const X_OFFSET = Y_OFFSET

const Y_SPACING = 64
const X_SPACING = Y_SPACING

function createArgumentProps(): NodeProps {
  return {
    shape: NodeShape.RECTANGLE,
    width: ARGUMNET_WIDTH_IN_PX,
    height: ARGUMNET_HEIGHT_IN_PX,
    cornerRadius: 4,
    // The generall direction is from left to right.
    // Most edges start at the right side of the left node and end on the left side of the right node.
    // Therefore reflecitve edges should also start on the right side of nodes.
    reflexiveEdgeStart: SideType.RIGHT,
  }
}

function getArgumentColor(isSupport: boolean) {
  const COLOR_SUPPORTES = '#99ff99' // a shade of green
  const COLOR_DEFEATED = '#ff9999' // a shade of red
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
      // TODO https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/399 improve layout
      nodes.push({
        id: nodeId,
        props: createArgumentProps(),
        label: getReadableArgument(argument),
        x: column * (ARGUMNET_WIDTH_IN_PX + X_SPACING) + X_OFFSET,
        y: row * (ARGUMNET_HEIGHT_IN_PX + Y_SPACING) + Y_OFFSET,
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
  // TODO https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/399 center after drawing.
  graphInstance.setGraph(graph)
}
</script>

<template>
  <div class="sequence-explantion">
    <graph-component ref="graph-component"></graph-component>
  </div>
</template>

<style scoped></style>
