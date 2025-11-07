<script setup lang="ts">
import {
  hasProgrammaticCause,
  NodeShape,
  parseLinkId,
  SideType,
  type GraphComponent,
  type LinkCreatedDetail,
  type LinkDeletedDetail,
  type NodeCreatedDetail,
  type NodeDeletedDetail,
  type NodeId,
  type NodeProps,
} from '@/util/graphComponentTypes'
import {
  addArgument,
  addAttack,
  getArguments,
  removeArgument,
  removeAttack,
  type Argument,
  type ArgumentationFramework,
  type ArgumentId,
} from '@/argumentation/argumentationFramework'
import { onMounted, ref, useTemplateRef } from 'vue'

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
  graphInstance.setDefaults({ nodeAutoGrowToLabelSize: false, nodeProps: createArgumentProps() })
  const graphHost = graphComponentElement.getElementsByClassName(
    'graph-controller__graph-host',
  )[0] as HTMLElement
  graphHost.addEventListener('nodecreated', onNodeCreated)
  graphHost.addEventListener('nodedeleted', onNodeDeleted)
  graphHost.addEventListener('linkcreated', onLinkCreated)
  graphHost.addEventListener('linkdeleted', onLinkDeleted)
  // graphHost.addEventListener('nodeclicked', onNodeClicked)
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
</script>

<template>
  <graph-component ref="graph-component"></graph-component>
</template>

<style scoped></style>
