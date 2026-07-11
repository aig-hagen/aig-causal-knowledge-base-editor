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
  hasProgrammaticCause,
  NodeShape,
  parseLinkId,
  SideType,
  type GraphComponent,
  type LinkCreatedDetail,
  type LinkDeletedDetail,
  type NodeClickedDetail,
  type NodeCreatedDetail,
  type NodeDeletedDetail,
  type NodeId,
  type NodeProps,
} from '@/modules/common/graphComponentTypes'
import {
  addArgument,
  addAttack,
  getArgument,
  getArguments,
  getAttacks,
  hasArgument,
  removeArgument,
  removeAttack,
  type Argument,
  type ArgumentationFramework,
  type ArgumentId,
  type Shape,
} from '@/modules/argumentation/argumentationFramework'
import { computed, nextTick, onMounted, ref, useTemplateRef, watchEffect } from 'vue'
import { useDebounceFn, useMutationObserver } from '@vueuse/core'
import * as Colors from '@/modules/common/colors'
import { vFocus } from '@/modules/common/vFocus'
import { LEFT_MOUSE_BUTTON } from '@/modules/common/button'
import { getNextName } from '@/modules/argumentation/nextName'
import {
  ARGUMENT_HEIGHT_IN_PX,
  ARGUMENT_RADIUS_IN_PX,
  ARGUMENT_WIDTH_IN_PX,
} from '@/modules/argumentation/consts'
import { X } from '@lucide/vue'

interface NodeType {
  name: string
  color: string
}

const COLOR_ATTACK = Colors.LINK_BLACK
const COLOR_ARGUMENT = Colors.NODE_BLUE
const COLOR_HIGHLIGHT_SELECTED = Colors.HIGHLIGHT_BLUE

const LABEL_EDITABLE = false

const DEFAULT_NODE_TYPES = [
  {
    name: 'Argument',
    color: COLOR_ARGUMENT,
  },
]

const {
  argumentationFramework,
  readonly,
  nodeColorFn = () => undefined,
  hideLegend,
  disableSelection,
  nodeTypes,
} = defineProps<{
  argumentationFramework: ArgumentationFramework<Argument>
  readonly?: boolean
  nodeColorFn?(argumentId: ArgumentId): string | undefined
  hideLegend?: boolean
  disableSelection?: boolean
  nodeTypes?: NodeType[]
}>()

function getNodeColorForArgument(argumentId: ArgumentId) {
  return nodeColorFn(argumentId) ?? COLOR_ARGUMENT
}

// XXX After initially setting whether the argumentation framework is editable, changing the related prop will have no effect.
// It could be implemented but is currently not needed.
const readonlyStatic = readonly

defineExpose({
  updatePositionsInArgumentationFramework,
})

const idCounter = ref(0)

function nextId() {
  for (;;) {
    const nextId = (idCounter.value++).toString(10)
    const nextIdAlreadyExists = hasArgument(argumentationFramework, nextId)
    if (!nextIdAlreadyExists) {
      return nextId
    }
  }
}

function getNextArgumentName() {
  const existingNames = getArguments(argumentationFramework).map((argument) => argument.name)
  return getNextName(existingNames)
}

const perPublicIdInternalId = new Map<ArgumentId, NodeId>()
const perInternalIdPublicId = new Map<NodeId, ArgumentId>()

function getInternalIdMaybe(argument: Argument) {
  return perPublicIdInternalId.get(argument.id)
}

function getInternalId(argument: Argument): NodeId {
  const internalId = getInternalIdMaybe(argument)
  if (internalId === undefined) {
    throw Error(`Node with public ID ${argument.id} does not exist.`)
  }
  return internalId
}

function getPublicIdMaybe(nodeId: NodeId) {
  return perInternalIdPublicId.get(nodeId)
}

function getPublicId(nodeId: NodeId): ArgumentId {
  const publicId = getPublicIdMaybe(nodeId)
  if (publicId === undefined) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw Error(`Node with internal ID ${nodeId} does not exist.`)
  }
  return publicId
}

const DEFAULT_SHAPE: Shape = 'circle'

function createArgumentProps(shape: Shape): NodeProps {
  switch (shape) {
    case 'circle':
      return {
        shape: NodeShape.CIRCLE,
        radius: ARGUMENT_RADIUS_IN_PX,
      }

    case 'rectangle':
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
}

const graphInstanceRef = ref<GraphComponent | null>(null)

function ensureGraphInstance() {
  const graphInstance = graphInstanceRef.value
  if (graphInstance === null) {
    throw new Error('Graph instance is unset.')
  }
  return graphInstance
}

const graphComponentElementRef = useTemplateRef<HTMLElement>('graph-component')

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
    const graphInstance: GraphComponent = (graphComponentElement as any)._instance.exposed
    graphInstanceRef.value = graphInstance
    graphInstance.toggleNodePhysics(false)
    graphInstance.toggleZoom(true)
    graphInstance.setDefaults({
      nodeAutoGrowToLabelSize: false,
      nodeProps: createArgumentProps(DEFAULT_SHAPE),
      allowNodeCreationViaGUI: !readonlyStatic,
      nodeGUIEditability: {
        // Allow moving even if readonly.
        fixedPosition: { x: false, y: false },
        deletable: !readonlyStatic,
        labelEditable: LABEL_EDITABLE,
        allowIncomingLinks: !readonlyStatic,
        allowOutgoingLinks: !readonlyStatic,
      },
      linkGUIEditability: {
        deletable: !readonlyStatic,
        labelEditable: LABEL_EDITABLE,
      },
    })
    createInitialGraph(graphInstance)
    graphHost.addEventListener('nodecreated', onNodeCreated)
    graphHost.addEventListener('nodedeleted', onNodeDeleted)
    graphHost.addEventListener('linkcreated', onLinkCreated)
    graphHost.addEventListener('linkdeleted', onLinkDeleted)
    graphHost.addEventListener('nodeclicked', onNodeClicked)
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

function createInitialGraph(graphInstance: GraphComponent) {
  const nodes = getArguments(argumentationFramework).map((argument) => {
    return {
      id: argument.id,
      props: createArgumentProps(argument.graphicalData.shape),
      label: argument.name,
      x: argument.graphicalData.position.x,
      y: argument.graphicalData.position.y,
      color: getNodeColorForArgument(argument.id),
    }
  })
  const links = getAttacks(argumentationFramework).map(([attacker, attacked]) => {
    return {
      sourceId: attacker,
      targetId: attacked,
      color: COLOR_ATTACK,
    }
  })

  graphInstance.setGraph({ nodes: nodes, links: links })
  const { nodes: nodesWithInternalIds } = graphInstance.getGraph(
    'json',
    false,
    false,
    false,
    false,
    true,
  )
  for (const node of nodesWithInternalIds) {
    const internalId = node.id
    const publicId = node.idImported
    if (typeof publicId !== 'string') {
      throw Error(`Unexptected imported ID: ${JSON.stringify(publicId)}`)
    }
    addToMappedIds(internalId, publicId)
  }
  const margin = ARGUMENT_HEIGHT_IN_PX
  graphInstance.centerView(
    {
      marginTop: margin,
      marginRight: margin,
      marginBottom: margin,
      marginLeft: margin,
    },
    undefined,
    1,
  )
}

function onNodeCreated(event: CustomEvent<NodeCreatedDetail>) {
  if (hasProgrammaticCause(event)) return
  const createdNode = event.detail.node

  if (createdNode.label !== undefined) {
    throw Error('Created node has a set label.')
  }
  if (createdNode.x === undefined) {
    throw Error('X position is not defined.')
  }

  if (createdNode.y === undefined) {
    throw Error('Y position is not defined.')
  }

  const argument: Argument = {
    id: nextId(),
    name: getNextArgumentName(),
    graphicalData: {
      shape: DEFAULT_SHAPE,
      position: {
        x: createdNode.x,
        y: createdNode.y,
      },
    },
  }
  const internalId = createdNode.id
  addArgument(argumentationFramework, argument)
  addToMappedIds(createdNode.id, argument.id)
  selectArgument(argument.id)
  void nextTick(() => {
    const graphInstance = ensureGraphInstance()
    graphInstance.setLabel(argument.name, internalId)
    graphInstance.setColor(getNodeColorForArgument(argument.id), internalId)
  })
}

function addToMappedIds(internaId: NodeId, argumentId: ArgumentId) {
  perInternalIdPublicId.set(internaId, argumentId)
  perPublicIdInternalId.set(argumentId, internaId)
}

function onNodeDeleted(event: CustomEvent<NodeDeletedDetail>) {
  if (hasProgrammaticCause(event)) return
  const deletedNode = event.detail.node
  const publicId = perInternalIdPublicId.get(deletedNode.id)
  if (publicId === undefined) {
    throw Error('Deleted node was no registerd.')
  }
  perPublicIdInternalId.delete(publicId)
  perInternalIdPublicId.delete(deletedNode.id)
  removeArgument(argumentationFramework, publicId)
}

function onLinkCreated(event: CustomEvent<LinkCreatedDetail>) {
  if (hasProgrammaticCause(event)) return
  const createdLink = event.detail.link
  const { sourceId: internalSourceId, targetId: internalTargetId } = parseLinkId(createdLink.id)
  const publicSourceId = getPublicIdMaybe(internalSourceId)
  // If mapping is not found, this link deletion was triggered after deleting a node for an argument.
  // Deleting the argument already deleted the attack.
  if (publicSourceId === undefined) return
  const publicTargetId = getPublicIdMaybe(internalTargetId)
  // If mapping is not found, this link deletion was triggered after deleting a node for an argument.
  // Deleting the argument already deleted the attack.
  if (publicTargetId === undefined) return

  addAttack(argumentationFramework, publicSourceId, publicTargetId)
  void nextTick(() => {
    const graphInstance = ensureGraphInstance()
    graphInstance.setColor(COLOR_ATTACK, createdLink.id)
  })
}

function onLinkDeleted(event: CustomEvent<LinkDeletedDetail>) {
  if (hasProgrammaticCause(event)) return
  const createdLink = event.detail.link
  const { sourceId: internalSourceId, targetId: internalTargetId } = parseLinkId(createdLink.id)
  const publicSourceId = getPublicIdMaybe(internalSourceId)
  // If mapping is not found, this link deletion was triggered after deleting a node for an argument.
  // Deleting the argument already deleted the attack.
  if (publicSourceId === undefined) return
  const publicTargetId = getPublicIdMaybe(internalTargetId)
  // If mapping is not found, this link deletion was triggered after deleting a node for an argument.
  // Deleting the argument already deleted the attack.
  if (publicTargetId === undefined) return

  removeAttack(argumentationFramework, publicSourceId, publicTargetId)
}

function onNodeClicked(event: CustomEvent<NodeClickedDetail>) {
  if (disableSelection) {
    return
  }
  const detail = event.detail
  if (detail.button !== LEFT_MOUSE_BUTTON) return
  const internalId = detail.node.id
  const publicId = getPublicId(internalId)
  selectArgument(publicId)
}

const selectedArgumentRef = ref<Argument | null>(null)

function selectArgument(argumentId: ArgumentId | null) {
  if (argumentId === null) {
    selectedArgumentRef.value = null
    return
  }
  const argument = getArgument(argumentationFramework, argumentId) ?? null
  selectedArgumentRef.value = argument
}

watchEffect(() => {
  // Deselects argument, if it is removed from argumentationFramework.
  selectArgument(selectedArgumentRef.value?.id ?? null)
})

const processNameInput = computed(() => {
  const selectedArgument = selectedArgumentRef.value
  return useDebounceFn((name) => {
    if (selectedArgument === null) return
    setNameAndLabel(selectedArgument, name)
  }, 100)
})

function processShapeInput(argument: Argument, newShape: Shape) {
  argument.graphicalData.shape = newShape
  const internalId = getInternalId(argument)
  const newProps = createArgumentProps(newShape)
  graphInstanceRef.value?.setNodeProps(newProps, internalId)
}

function setNameAndLabel(argument: Argument, newName: string) {
  argument.name = newName
  const internalId = getInternalId(argument)
  const graphInstance = graphInstanceRef.value
  graphInstance?.setLabel(newName, internalId)
}

watchEffect(() => {
  highlightSelectedNodes()
})

function updateSelection(clickTarget: HTMLElement) {
  // Calling `event.detail.stopPropagation()` in `onNodeClicked` does not work,
  // because "nodeclicked" is actually triggered by "pointerdown".
  const nodeContainer = clickTarget.closest('.graph-controller__node-container')
  if (nodeContainer === null) {
    // If clicked outside a node, deselect argument.
    selectArgument(null)
  }
}

function highlightSelectedNodes() {
  for (const argument of getArguments(argumentationFramework)) {
    const stroke = argument.id === selectedArgumentRef.value?.id ? COLOR_HIGHLIGHT_SELECTED : ''
    const internalId = getInternalIdMaybe(argument)
    if (internalId === undefined) return
    const nodeElement = document.getElementById(`${graphComponentId}-node-${internalId.toString()}`)
    if (nodeElement !== null) {
      nodeElement.style.stroke = stroke
      nodeElement.style.strokeWidth = '4px'
      nodeElement.style.strokeDasharray = '10,5'
    }
  }
}

function updatePositionsInArgumentationFramework() {
  const graphInstance = ensureGraphInstance()
  const graph = graphInstance.getGraph('json', true, false, false, false, false)
  for (const node of graph.nodes) {
    const internaId = node.id
    if (node.x === undefined) {
      throw Error('X position is undefined.')
    }
    if (node.y === undefined) {
      throw Error('Y position is undefined.')
    }
    const publicId = getPublicId(internaId)
    const argument = getArgument(argumentationFramework, publicId)
    if (argument === undefined) {
      throw Error(`Argument not found.`)
    }
    argument.graphicalData.position.x = node.x
    argument.graphicalData.position.y = node.y
  }
}

watchEffect(() => {
  if (disableSelection) {
    selectArgument(null)
  }
})

// IDs starting with numbers break the graph component code
// because they are used without escaping in CSS selectors
const graphComponentId = 'g' + crypto.randomUUID()
</script>

<template>
  <div>
    <graph-component
      @click="updateSelection($event.target)"
      ref="graph-component"
      :id="graphComponentId"
    ></graph-component>
    <div v-if="!hideLegend" class="menu-left">
      <div
        class="node-selection bg-base-100 border-base-300 rounded-box border p-3.5 text-sm shadow-md"
      >
        <div
          v-for="nodeType of nodeTypes ?? DEFAULT_NODE_TYPES"
          :key="nodeType.name"
          class="legend-row"
        >
          <div class="legend-swatch" :style="{ backgroundColor: nodeType.color }"></div>
          {{ nodeType.name }}
        </div>
        <div class="legend-row">
          <div class="legend-swatch-arrow" :style="{ color: COLOR_ATTACK }">&#8594;</div>
          Attack
        </div>
      </div>
    </div>
    <div
      v-if="selectedArgumentRef !== null"
      class="menu-right bg-base-100 border-base-300 rounded-box w-64 space-y-4 border p-4 shadow-md"
      @keydown.esc="selectArgument(null)"
    >
      <slot name="argumentMenu" :argument="selectedArgumentRef">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-semibold">Argument properties</h1>
          <button
            class="btn btn-sm btn-circle btn-ghost"
            aria-label="Close"
            @click="selectArgument(null)"
          >
            <X class="size-4" aria-hidden="true" />
          </button>
        </div>

        <div>
          <label class="text-base-content/80 mb-1 block text-sm font-medium">Name</label>
          <input
            v-focus
            :key="selectedArgumentRef.id"
            :value="selectedArgumentRef.name"
            :readonly="readonlyStatic"
            @input="
              (event) => {
                const target = (event as InputEvent).target as HTMLInputElement
                processNameInput(target.value)
              }
            "
            class="input w-full"
            type="text"
            placeholder="Name"
          />
        </div>
        <div>
          <label class="text-base-content/80 mb-1 block text-sm font-medium">Shape</label>
          <div class="space-y-1">
            <label class="label w-fit cursor-pointer gap-2 px-0">
              <input
                type="radio"
                name="shape"
                class="radio radio-sm"
                :disabled="readonlyStatic"
                :checked="selectedArgumentRef.graphicalData.shape === 'circle'"
                @change="processShapeInput(selectedArgumentRef, 'circle')"
              />
              Circle
            </label>
            <label class="label w-fit cursor-pointer gap-2 px-0">
              <input
                type="radio"
                name="shape"
                class="radio radio-sm"
                :disabled="readonlyStatic"
                :checked="selectedArgumentRef.graphicalData.shape === 'rectangle'"
                @change="processShapeInput(selectedArgumentRef, 'rectangle')"
              />
              Rectangle
            </label>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.overlay-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 512px;
}

.menu-left {
  position: absolute;
  top: 128px;
  left: 1rem;
}

.menu-right {
  position: absolute;
  top: 128px;
  right: 1rem;
}

.legend-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  padding-block: 0.125rem;
}

.legend-swatch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 0.25rem;
  border: 1px solid var(--color-base-300);
}

.legend-swatch-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.125rem;
  height: 1.125rem;
  font-weight: 700;
}
</style>
