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
} from '@/util/graphComponentTypes'
import {
  addArgument,
  addAttack,
  getArgument,
  getArguments,
  removeArgument,
  removeAttack,
  type Argument,
  type ArgumentationFramework,
  type ArgumentId,
} from '@/argumentation/argumentationFramework'
import { computed, nextTick, onMounted, ref, useTemplateRef, watchEffect } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const { argumentationFramework } = defineProps<{
  argumentationFramework: ArgumentationFramework
}>()

const idCounter = ref(0)
function nextId() {
  return (idCounter.value++).toString(10)
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

const ARGUMNET_WIDTH_IN_PX = 174
const ARGUMNET_HEIGHT_IN_PX = 56

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

// TODO ArgumentationFrameworkEditor depulicate colors
// TODO ArgumentationFrameworkEditor actually set colors
const COLOR_ATTACK = 'HSL(240, 100%, 27%)' // DarkBlue
const COLOR_ARGUMENT = 'hsl(32.94, 100%, 50%)' // DarkOrange
const COLOR_HIGHLIGHT_SELECTED = '#3584e4'

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphInstance: GraphComponent = (graphComponentElement as any)._instance.exposed
  graphInstanceRef.value = graphInstance
  graphInstance.toggleNodePhysics(false)
  graphInstance.toggleZoom(true)
  graphInstance.setDefaults({
    nodeAutoGrowToLabelSize: false,
    nodeProps: createArgumentProps(),
    nodeGUIEditability: {
      labelEditable: false,
    },
    linkGUIEditability: {
      labelEditable: false,
    },
  })
  const graphHost = graphComponentElement.getElementsByClassName(
    'graph-controller__graph-host',
  )[0] as HTMLElement
  graphHost.addEventListener('nodecreated', onNodeCreated)
  graphHost.addEventListener('nodedeleted', onNodeDeleted)
  graphHost.addEventListener('linkcreated', onLinkCreated)
  graphHost.addEventListener('linkdeleted', onLinkDeleted)
  graphHost.addEventListener('nodeclicked', onNodeClicked)
  // graphHost.addEventListener('linkclicked', onLinkClicked)
})

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

  // When the event is handled, the HTML is not yet rendered.
  const argument: Argument = {
    id: nextId(),
    name: '',
    position: {
      x: createdNode.x,
      y: createdNode.y,
    },
  }
  addArgumentAndUpdateMappedIds(createdNode.id, argument)
  selectArgument(createdNode.id)
  updateGraphComponent()
}

function addArgumentAndUpdateMappedIds(internaId: NodeId, argument: Argument) {
  addArgument(argumentationFramework, argument)
  perInternalIdPublicId.set(internaId, argument.id)
  perPublicIdInternalId.set(argument.id, internaId)
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
  updateGraphComponent()
}

function onLinkDeleted(event: CustomEvent<LinkDeletedDetail>) {
  console.log('onLinkDeleted', event)
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
  updateGraphComponent()
}

// TODO ArgumentationFrameworkEditor deduplicate
const LEFT_MOUSE_BUTTON = 0

function onNodeClicked(event: CustomEvent<NodeClickedDetail>) {
  const detail = event.detail
  if (detail.button !== LEFT_MOUSE_BUTTON) return
  const internalId = detail.node.id
  selectArgument(internalId)
}

function getNodeIds(graphInstance: GraphComponent) {
  const graph = graphInstance.getGraph('json', false, false, false, false, false)
  const nodeIds = new Set(graph.nodes.map((node) => node.id))
  // const linkIds = new Set(graph.links.map((link) => link.sourceId))
  return nodeIds
}

function updateGraphComponent() {
  const graphInstance = ensureGraphInstance()
  const argumentsInFramework = getArguments(argumentationFramework)
  const internalNodeIdsToRemove = getNodeIds(graphInstance)
  const argumentsToCreate = []
  for (const argument of argumentsInFramework) {
    const internalId = getInternalId(argument)
    const existed = internalNodeIdsToRemove.delete(internalId)
    if (!existed) {
      argumentsToCreate.push(argument)
    }
  }
  graphInstance.deleteElement([...internalNodeIdsToRemove])
  if (argumentsToCreate.length > 0) {
    throw Error('Arguments cannot be created programmatically.')
  }
}

const nameInput = useTemplateRef<HTMLInputElement>('name-input')
const selectedNodeIdRef = ref<NodeId | null>(null)
// TODO ArgumentationFrameworkEditor there should be a better solution
// selectedAtomId might be an outdated ID, if the atom was deleted while beeing selected
const selectedArgumentRef = computed(() => {
  if (selectedNodeIdRef.value === null) return undefined
  const publicId = getPublicIdMaybe(selectedNodeIdRef.value)
  if (publicId === undefined) return undefined
  return getArgument(argumentationFramework, publicId)
})

function selectArgument(nodeId: NodeId | null) {
  selectedNodeIdRef.value = nodeId
  // TODO ArgumentationFrameworkEditor Focusing should be bound to actually showing the input menu
  void nextTick(() => {
    requestAnimationFrame(() => {
      // focusVisible is a non-standard option used for improved accessibility in some browsers.
      // @ts-expect-error Ignore TypeScript error about unknown property in FocusOptions.
      nameInput.value?.focus({ focusVisible: true })
    })
  })
}

const processNameInput = computed(() => {
  const selectedArgument = selectedArgumentRef.value
  return useDebounceFn((name) => {
    if (selectedArgument === undefined) return
    setName(selectedArgument, name)
  }, 100)
})

function setName(argument: Argument, newName: string) {
  argument.name = newName
  const internalId = getInternalId(argument)
  const graphInstance = graphInstanceRef.value
  graphInstance?.setLabel(newName, internalId)
}

watchEffect(() => {
  highlightSelectedNodes()
})

function highlightSelectedNodes() {
  for (const argument of getArguments(argumentationFramework)) {
    const internalId = getInternalId(argument)
    const stroke = internalId === selectedNodeIdRef.value ? COLOR_HIGHLIGHT_SELECTED : ''
    const nodeElement = document.getElementById(`gc-node-${internalId.toString()}`)
    if (nodeElement !== null) {
      nodeElement.style.stroke = stroke
      nodeElement.style.strokeWidth = '4px'
      nodeElement.style.strokeDasharray = '10,5'
    }
  }
}
</script>

<template>
  <graph-component ref="graph-component"></graph-component>
  <div class="menu menu-left">
    <div class="node-selection p-2">
      <div class="type p-2">
        <div class="atom-type-legend" :style="{ backgroundColor: COLOR_ARGUMENT }"></div>
        Argument
      </div>
      <div class="type p-2">
        <div
          class="atom-type-legend"
          :style="{
            background: COLOR_ARGUMENT,
            // Generated with https://css-tricks.com/more-control-over-css-borders-with-background-image/
            backgroundImage: `repeating-linear-gradient(0deg, ${COLOR_HIGHLIGHT_SELECTED}, ${COLOR_HIGHLIGHT_SELECTED} 5px, transparent 5px, transparent 8px, ${COLOR_HIGHLIGHT_SELECTED} 8px), repeating-linear-gradient(90deg, ${COLOR_HIGHLIGHT_SELECTED}, ${COLOR_HIGHLIGHT_SELECTED} 5px, transparent 5px, transparent 8px, ${COLOR_HIGHLIGHT_SELECTED} 8px), repeating-linear-gradient(180deg, ${COLOR_HIGHLIGHT_SELECTED}, ${COLOR_HIGHLIGHT_SELECTED} 5px, transparent 5px, transparent 8px, ${COLOR_HIGHLIGHT_SELECTED} 8px), repeating-linear-gradient(270deg, ${COLOR_HIGHLIGHT_SELECTED}, ${COLOR_HIGHLIGHT_SELECTED} 5px, transparent 5px, transparent 8px, ${COLOR_HIGHLIGHT_SELECTED} 8px)`,
            backgroundSize: `3px 100%, 100% 3px, 3px 100% , 100% 3px`,
            backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
            backgroundRepeat: 'no-repeat',
          }"
        ></div>
        Selected Argument
      </div>
      <div class="type p-2">
        <div class="link-type-legend" :style="{ color: COLOR_ATTACK }">&#8594;</div>
        Attack
      </div>
    </div>
  </div>
  <div
    v-if="selectedArgumentRef !== undefined"
    class="menu menu-right p-2"
    @keydown.esc="selectArgument(null)"
  >
    <div class="title is-5"><h1>Argument properties</h1></div>

    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          ref="name-input"
          :value="selectedArgumentRef.name"
          @input="
            (event) => {
              const target = (event as InputEvent).target as HTMLInputElement
              processNameInput(target.value)
            }
          "
          class="input"
          type="text"
          placeholder="Name"
        />
      </div>
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
  background-color: white;
  top: 128px;
  position: absolute;
}

.node-selection {
  border: 2px solid black;
  border-radius: 4px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
  overflow: hidden;
}

.menu-right {
  background-color: white;
  top: 128px;
  right: 0;
  position: absolute;
  border: 2px solid black;
  border-right: none;
  border-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.type {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
}

/* TODO ArgumentationFrameworkEditor rename to node type */
.atom-type-legend {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  /* center text inside div */
  text-align: center;
}

.link-type-legend {
  font-weight: bold;
  height: 20px;
  line-height: 17px;
}
</style>
