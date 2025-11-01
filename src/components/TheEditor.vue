<script setup lang="ts">
import type { Atom, Conjunction, ConnectionId, Id } from '@/model/graphicalCausalKnowledgeBase'
import { getConnectionKey, useKnowledgeBase } from '@/stores/knowledgeBase'
import { useNotifications } from '@/stores/notifications'
import { useDebounceFn, useEventListener } from '@vueuse/core'
import { computed, nextTick, onMounted, ref, useTemplateRef, watchEffect } from 'vue'

import {
  NodeShape,
  type GraphComponent,
  type NodeCircle,
  type NodeSizeRect,
} from '@/util/graphComponentTypes'

import { hasMoreThenOneEntry } from '@/util/types'

defineExpose({
  getExportedData,
  loadKnowledgeBase,
})

const { atomIdsToHighlight } = defineProps<{
  atomIdsToHighlight: Id[]
}>()

const { addSuccessNotification, addErrorNotification, clearNotifications } = useNotifications()

const loadingData = ref(false)

// #3584e4 is the color used by Firefox for focused elements.
// It looks good for highlighting selected nodes.
const COLOR_HIGHLIGHT_SELECTED = '#3584e4'
// #00d1b2 is the Bulma success color.
// It is green and has a good contrast to the orange of nodes.
// Also it is consistent with the Bulma theme.
const COLOR_HIGHLIGHT_RELEVANT_FOR_EXPLANATION = '#48c78e'
const ID_DEF_COLOR_HIGHLIGHT_RELEVANT_FOR_EXPLANATION = 'highlight-relevant-for-explanation'

const COLOR_BACKGROUND_ATOM = 'hsl(37.14, 100%, 91.76%)' // PapayaWhip
const COLOR_EXPLAINABLE_ATOM = 'hsl(32.94, 100%, 50%)' // DarkOrange
const COLOR_BACKGROUND_ATOM_TRANSPARENT = 'rgba(255, 239, 213, 0.5)' // PapayaWhip
const COLOR_EXPLAINABLE_ATOM_TRANSPARENT = 'rgba(255, 140, 0, 0.5)' // DarkOrange
const COLOR_CONJUNCTION = 'LightGray'
const LABEL_CONJUNCTION = '&'
const ATOM_MIN_WIDTH_IN_PX = 128
const ATOM_HEIGHT_IN_PX = 56
const PORT_RADIUS_IN_PX = 16
// Use LaTex notation, after enabling LaTex support.
// const LABEL_CONJUNCTION = '$\\land$'

const COLOR_REGULAR_LINKS = 'HSL(240, 100%, 27%)' // DarkBlue
const COLOR_NEGATED_LINKS = 'HSL(0, 100%, 27%)' // DarkRed

type LinkType = 'REGULAR' | 'NEGATED'
const selectedLinkType = ref<LinkType>('REGULAR')

type AtomId = number

const DEFAULT_ASSUMPTION_VALUE = 3

function createAtomProps() {
  return {
    shape: NodeShape.RECTANGLE,
    width: ATOM_MIN_WIDTH_IN_PX,
    height: ATOM_HEIGHT_IN_PX,
    cornerRadius: 4,
    // Just choose left because, it looked ok.
    // There is not much consideration behind it.
    // Usually knowledge bases will not contain self-loops.
    reflexiveEdgeStart: 'LEFT',
  }
}

function createOperatorProps(): NodeCircle {
  return {
    shape: NodeShape.CIRCLE,
    radius: PORT_RADIUS_IN_PX,
  }
}

const selectedAtomIdRef = ref<AtomId | null>(null)
// selectedAtomId might be an outdated ID, if the atom was deleted while beeing selected
const selectedAtomRef = computed(() => {
  const selectedAtomId = selectedAtomIdRef.value
  if (selectedAtomId === null) return undefined
  return knowledgeBase.atoms.get(selectedAtomId)
})

const knowledgeBase = useKnowledgeBase()

const selectedConnectionIdRef = ref<ConnectionId | null>(null)
// selectedLinkId might be an outdated ID, if the link was deleted while beeing selected
const selectedConnectionRef = computed(() => {
  const selectedConnectionId = selectedConnectionIdRef.value
  if (selectedConnectionId === null) return undefined
  return knowledgeBase.connections.get(getConnectionKey(selectedConnectionId))
})

const graphComponentElementRef = useTemplateRef<HTMLElement>('graph-component-element')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const graphInstanceRef = ref<any>(null)
const graphHostRef = ref<HTMLElement | null>(null)

const nodeContainerRef = ref<SVGElement | null>(null)
const linkContainerRef = ref<SVGElement | null>(null)

computed(() => {
  const nodes = graphComponentElementRef.value?.getElementsByClassName('.nodes')
  if (nodes === undefined) return undefined
  return nodes[0] as HTMLElement
})
const nameInput = useTemplateRef<HTMLInputElement>('name-input')
const negatedInput = useTemplateRef<HTMLInputElement>('negated-input')

watchEffect(() => {
  const nodeElements = document.getElementsByClassName(
    'graph-controller__node',
  ) as HTMLCollectionOf<SVGCircleElement>
  for (const nodeElement of nodeElements) {
    nodeElement.style.stroke = ''
  }
  highlightSelectedNodes()
})

function updateAtomHighlightingForExplanation(atomId: number) {
  const nodeElement = document.getElementById(`gc-node-${atomId.toString()}`)
  if (nodeElement !== null) {
    if (isNodeHighlightedForExplanation(atomId)) {
      nodeElement.style.filter = `url(#${ID_DEF_COLOR_HIGHLIGHT_RELEVANT_FOR_EXPLANATION})`
    } else {
      nodeElement.style.filter = ''
    }
  }
}

function updateOperatorHighlightingForExplanation(operatorId: number) {
  const nodeElement = document.getElementById(`gc-node-${operatorId.toString()}`)
  if (nodeElement !== null) {
    // TODO Simplify logic
    // Fix with https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/317
    if (atomIdsToHighlight.length !== 0 && isNodeHighlighted(operatorId)) {
      nodeElement.style.filter = `url(#${ID_DEF_COLOR_HIGHLIGHT_RELEVANT_FOR_EXPLANATION})`
    } else {
      nodeElement.style.filter = ''
    }
  }
}

function updateConnectionHighlightingForExplanation(connectionId: ConnectionId) {
  const linkElement = document.getElementById(`gc-link-${getLinkId(connectionId)}`)
  if (linkElement !== null) {
    // TODO Simplify logic
    // Fix with https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/317
    const isHighlighted =
      atomIdsToHighlight.length !== 0 &&
      (isNodeHighlighted(connectionId.sourceId) ||
        someAncestorHighlighted(connectionId.sourceId)) &&
      (isNodeDirectlyHighlighted(connectionId.targetId) ||
        someDescendentHighlighed(connectionId.targetId))
    if (isHighlighted) {
      linkElement.style.filter = `url(#${ID_DEF_COLOR_HIGHLIGHT_RELEVANT_FOR_EXPLANATION})`
    } else {
      linkElement.style.filter = ''
    }
  }
}

function isNodeHighlightedForExplanation(atomId: number) {
  return atomIdsToHighlight.includes(atomId)
}

function isNodeDirectlyHighlighted(nodeId: number): boolean {
  if (atomIdsToHighlight.length === 0) {
    return true
  }

  return atomIdsToHighlight.includes(nodeId)
}

function isNodeHighlighted(nodeId: number) {
  if (isNodeDirectlyHighlighted(nodeId)) {
    return true
  }

  return someDescendentHighlighed(nodeId) && someAncestorHighlighted(nodeId)
}

function someAncestorHighlighted(nodeId: number): boolean {
  const ancestors = [...knowledgeBase.connections.values()]
    .filter((connection) => connection.id.targetId === nodeId)
    .map((connection) => connection.id.sourceId)

  return ancestors.some((ancestor) => {
    if (knowledgeBase.atoms.has(ancestor)) {
      return atomIdsToHighlight.includes(ancestor)
    }
    return someAncestorHighlighted(ancestor)
  })
}

function someDescendentHighlighed(nodeId: number): boolean {
  const descendents = [...knowledgeBase.connections.values()]
    .filter((connection) => connection.id.sourceId === nodeId)
    .map((connection) => connection.id.targetId)

  return descendents.some((descendent) => {
    if (knowledgeBase.atoms.has(descendent)) {
      return atomIdsToHighlight.includes(descendent)
    }
    return someDescendentHighlighed(descendent)
  })
}

function updateAtomColor(atom: Atom) {
  updateAtomHighlightingForExplanation(atom.id)
  graphInstanceRef.value.setColor(getAtomColor(atom), atom.id)
  highlightSelectedNodes()
}

function getAtomColor(atom: Atom) {
  if (atom.assumption === undefined) {
    return COLOR_EXPLAINABLE_ATOM
  } else {
    return COLOR_BACKGROUND_ATOM
  }
}

let nodeGrouping = new Map<number, Set<number>>()

const emptySet = new Set<number>()
function nodeGroupsFn(id: number): Set<number> {
  return nodeGrouping.get(id) ?? emptySet
}

function updateConjuctionsForAllAtoms(graphInstance: GraphComponent) {
  const connectionsWithoutSource = [...knowledgeBase.connections.values()].filter(
    (connection) =>
      !knowledgeBase.atoms.has(connection.id.sourceId) &&
      !knowledgeBase.operators.has(connection.id.sourceId),
  )

  for (const connectionWithoutSource of connectionsWithoutSource) {
    knowledgeBase.connections.delete(getConnectionKey(connectionWithoutSource.id))
    graphInstance.deleteElement(getLinkId(connectionWithoutSource.id))
  }

  const connectionsWithoutTarget = [...knowledgeBase.connections.values()].filter(
    (connection) =>
      !knowledgeBase.atoms.has(connection.id.targetId) &&
      !knowledgeBase.operators.has(connection.id.targetId),
  )

  for (const connection of connectionsWithoutTarget) {
    knowledgeBase.connections.delete(getConnectionKey(connection.id))
    // Source of connections without targets can only operators
    const removed = knowledgeBase.operators.delete(connection.id.sourceId)
    if (!removed) {
      throw new Error(`Source of ${JSON.stringify(connection)} is not an operator.`)
    }

    graphInstance.deleteElement(connection.id.sourceId)
    const connectionsIncommingToRemovedNode = [...knowledgeBase.connections.values()].filter(
      (maybeConnectionsIncommingToRemovedNode) =>
        maybeConnectionsIncommingToRemovedNode.id.targetId === connection.id.sourceId,
    )
    for (const connectionIncommingToRemovedNode of connectionsIncommingToRemovedNode) {
      knowledgeBase.connections.delete(getConnectionKey(connectionIncommingToRemovedNode.id))
      // graphInstance.deleteElement does not need to be called here,
      // because the link was already removed when the node was removed.
    }
    graphInstance.deleteElement(getLinkId(connection.id))
  }

  nodeGrouping = new Map()
  for (const atom of knowledgeBase.atoms.values()) {
    updateConjuctions(graphInstance, atom)
  }
}

function updateConjuctions(graphInstance: GraphComponent, atom: Atom) {
  const currnetConjunctions = [...knowledgeBase.operators.values()].filter((conjunction) => {
    const connectionId = { sourceId: conjunction.id, targetId: atom.id }
    const connectionIdKey = getConnectionKey(connectionId)
    return knowledgeBase.connections.has(connectionIdKey)
  })
  // Sort to keep it consisten
  currnetConjunctions.sort((a, b) => b.id - a.id)

  const remainingConjunctions: Conjunction[] = []

  for (let i = currnetConjunctions.length - 1; i >= 0; --i) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const conjunction = currnetConjunctions[i]!
    // Yeah, 0 is right because it works.
    // i == 0 is last because of how we sort...
    // I'm confused. Probably this will be cleaned up in the near future.
    if (i == 0) {
      remainingConjunctions.push(conjunction)
      continue
    }

    if (hasIncomingConnections(conjunction)) {
      remainingConjunctions.push(conjunction)
    } else {
      const connectionId = { sourceId: conjunction.id, targetId: atom.id }
      const connectionIdKey = getConnectionKey(connectionId)
      knowledgeBase.connections.delete(connectionIdKey)
      knowledgeBase.operators.delete(conjunction.id)
      graphInstance.deleteElement(conjunction.id)
    }
  }

  const lastConjunction = remainingConjunctions[remainingConjunctions.length - 1]
  if (lastConjunction === undefined || hasIncomingConnections(lastConjunction)) {
    const graphNodeId = graphInstance.createNode(
      createOperatorProps(),
      100,
      100,
      undefined,
      '',
      COLOR_CONJUNCTION,
      { x: true, y: true },
      false,
      false,
      true,
      false,
    )

    const newConjunction: Conjunction = {
      id: graphNodeId,
      type: 'conjunction',
      position: {
        x: 0,
        y: 0,
      },
    }
    remainingConjunctions.push(newConjunction)
    knowledgeBase.operators.set(graphNodeId, newConjunction)

    const connection = {
      id: { sourceId: graphNodeId, targetId: atom.id },
      negated: false,
    }
    knowledgeBase.connections.set(getConnectionKey(connection.id), connection)
    // When the event is handled, the HTML is not yet rendered.
  }

  const graphNodeForAtomSizeOld = graphInstance.getNodeSize(atom.id) as NodeSizeRect
  const graphNodeForAtomPositionOld = graphInstance.getNodeFixedPosition(atom.id)
  const conjunctionGraphNodesIds = new Set<number>()

  // Calculate minimum width for atom based on remaining conjunctions
  // diameter for each port + diamter between each port + two times have the diameter for padding
  const minAtomWidthBecauseOfPorts = PORT_RADIUS_IN_PX * 2 * 2 * remainingConjunctions.length
  const atomWidthNew = Math.max(ATOM_MIN_WIDTH_IN_PX, minAtomWidthBecauseOfPorts)
  const graphNodeForAtomSizeNew = {
    width: Math.max(ATOM_MIN_WIDTH_IN_PX, minAtomWidthBecauseOfPorts),
    height: graphNodeForAtomSizeOld.height,
  }
  graphInstance.setNodeSize(graphNodeForAtomSizeNew, atom.id)
  const graphNodeForAtomPositionNew = {
    x: graphNodeForAtomPositionOld.x + (atomWidthNew - graphNodeForAtomSizeOld.width) / 2,
    y: graphNodeForAtomPositionOld.y,
  }
  graphInstance.setNodePosition(graphNodeForAtomPositionNew, atom.id)
  const portOffset = (atomWidthNew - minAtomWidthBecauseOfPorts) / 2

  remainingConjunctions.forEach((conjunction, i) => {
    conjunctionGraphNodesIds.add(conjunction.id)
    const graphNodeForConjunctioPositionNew = {
      x:
        portOffset +
        (graphNodeForAtomPositionNew.x - graphNodeForAtomSizeNew.width / 2) +
        PORT_RADIUS_IN_PX * 2 * (2 * i + 1),
      y: graphNodeForAtomPositionNew.y - ATOM_HEIGHT_IN_PX / 2,
    }
    graphInstance.setNodeFixedPosition(graphNodeForConjunctioPositionNew, conjunction.id)
    graphInstance.setLabel(getOperatorLabel(conjunction), conjunction.id)
  })
  nodeGrouping.set(atom.id, conjunctionGraphNodesIds)
}

function getOperatorLabel(conjunction: Conjunction) {
  return hasMoreThanOneIncomingConnection(conjunction) ? LABEL_CONJUNCTION : ''
}

function hasMoreThanOneIncomingConnection(conjunction: Conjunction) {
  // TODO Restructure because not efficent
  // Fix with https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/317
  return (
    [...knowledgeBase.connections.values()].filter(
      (connections) => connections.id.targetId === conjunction.id,
    ).length > 1
  )
}

function hasIncomingConnections(conjunction: Conjunction) {
  // TODO Restructure because not efficent
  // Fix with https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/317
  return [...knowledgeBase.connections.values()].some(
    (connections) => connections.id.targetId === conjunction.id,
  )
}

watchEffect(() => {
  for (const atom of knowledgeBase.atoms.values()) {
    updateAtomColor(atom)
  }
  for (const operator of knowledgeBase.operators.values()) {
    updateOperatorHighlightingForExplanation(operator.id)
  }

  for (const connection of knowledgeBase.connections.values()) {
    const color = getColorLink(connection.negated)
    graphInstanceRef.value.setColor(color, getLinkId(connection.id))
  }

  for (const connection of knowledgeBase.connections.values()) {
    updateConnectionHighlightingForExplanation(connection.id)
    const color = getColorLink(connection.negated)
    graphInstanceRef.value.setColor(color, getLinkId(connection.id))
  }
})

// Same as getConnectionKey, but only by chance.
// getConnectionKey might change in the future.
// But the ID of the link will only change if the graph library changes.
function getLinkId(connectionId: ConnectionId) {
  return `${connectionId.sourceId.toString()}-${connectionId.targetId.toString()}`
}

function highlightSelectedNodes() {
  const nodeIdsToHighlight = []
  const selectedAtom = selectedAtomRef.value
  if (selectedAtom !== undefined) {
    nodeIdsToHighlight.push(selectedAtom.id)
  }

  const selectedConnection = selectedConnectionRef.value
  if (selectedConnection !== undefined) {
    nodeIdsToHighlight.push(selectedConnection.id.sourceId)
    nodeIdsToHighlight.push(selectedConnection.id.targetId)
  }

  for (const nodeId of nodeIdsToHighlight) {
    const nodeElement = document.getElementById(`gc-node-${nodeId.toString()}`)
    if (nodeElement !== null) {
      nodeElement.style.stroke = COLOR_HIGHLIGHT_SELECTED
      nodeElement.style.strokeWidth = '4px'
      nodeElement.style.strokeDasharray = '10,5'
    }
  }
}

onMounted(() => {
  const graphComponentElement = graphComponentElementRef.value
  if (graphComponentElement === null) {
    throw new Error('Graph component element not available.')
  }

  if (graphComponentElement.childNodes.length === 0) {
    throw new Error('Graph component element empty.')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphInstance = (graphComponentElement as any)._instance.exposed
  graphInstanceRef.value = graphInstance
  graphInstance.toggleNodePhysics(false)
  graphInstance.toggleZoom(true)
  graphInstance.setNodeGroupsFn(nodeGroupsFn)
  graphInstance.setDefaults({ nodeAutoGrowToLabelSize: false, nodeProps: createAtomProps() })
  const graphHost = graphComponentElement.getElementsByClassName('graph-controller__graph-host')[0]
  graphHostRef.value = graphHost as HTMLElement
  const nodeContainer = graphComponentElement.getElementsByClassName('nodes')[0]
  nodeContainerRef.value = nodeContainer as SVGElement
  const linkContainer = graphComponentElement.getElementsByClassName('links')[0]
  linkContainerRef.value = linkContainer as SVGAElement
  addHighlightShadowDefinition(graphComponentElement)
})

function addHighlightShadowDefinition(graphComponentElement: HTMLElement) {
  const svgElement = graphComponentElement.getElementsByTagName('svg')[0]
  if (svgElement === undefined) {
    throw new Error('No SVG element found in graph component.')
  }
  const mainContainer = svgElement.getElementsByTagName('g')[0]
  if (mainContainer === undefined) {
    throw new Error('No main container found in SVG element of graph component.')
  }

  mainContainer.insertAdjacentHTML(
    'afterbegin',
    `
    <defs>
    <filter id="${ID_DEF_COLOR_HIGHLIGHT_RELEVANT_FOR_EXPLANATION}" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="8"  flood-opacity="1" flood-color="${COLOR_HIGHLIGHT_RELEVANT_FOR_EXPLANATION}"/>
    </filter>
  </defs>
  `,
  )
}

function selectAtom(atomId: number | null) {
  selectedAtomIdRef.value = atomId
  if (atomId !== null) {
    selectedConnectionIdRef.value = null
  }
  void nextTick(() => {
    requestAnimationFrame(() => {
      // focusVisible is a non-standard option used for improved accessibility in some browsers.
      // @ts-expect-error Ignore TypeScript error about unknown property in FocusOptions.
      nameInput.value?.focus({ focusVisible: true })
    })
  })
}

function selectConnection(connectionId: ConnectionId | null) {
  selectedConnectionIdRef.value = connectionId
  if (connectionId !== null) {
    selectedAtomIdRef.value = null
  }
  void nextTick(() => {
    requestAnimationFrame(() => {
      // focusVisible is a non-standard option used for improved accessibility in some browsers.
      // @ts-expect-error Ignore TypeScript error about unknown property in FocusOptions.
      negatedInput.value?.focus({ focusVisible: true })
    })
  })
}

function onNodeCreated(event: Event) {
  if (hasProgrammaticCause(event)) return
  if (loadingData.value) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createdNode = (event as any).detail.node
  const graphInstance = graphInstanceRef.value
  // When the event is handled, the HTML is not yet rendered.
  const atom: Atom = {
    id: createdNode.id,
    name: '',
    description: '',
    assumption: DEFAULT_ASSUMPTION_VALUE,
    position: {
      x: createdNode.x,
      y: createdNode.y,
    },
  }
  knowledgeBase.atoms.set(atom.id, atom)
  selectAtom(atom.id)
  // When the event is handled, the HTML is not yet rendered.
  void nextTick(() => {
    updateConjuctionsForAllAtoms(graphInstance)
    updateAtomColor(atom)
    graphInstance.setLabelEditable(false, createdNode.id)
    graphInstance.setNodesLinkPermission(false, true, createdNode.id)
  })
}

function onNodeDeleted(event: Event) {
  if (hasProgrammaticCause(event)) return
  if (loadingData.value) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deletedNode = (event as any).detail.node
  knowledgeBase.operators.delete(deletedNode.id)
  knowledgeBase.atoms.delete(deletedNode.id)
  const graphInstance = graphInstanceRef.value
  updateConjuctionsForAllAtoms(graphInstance)
}

function updatedExplainableAtoms() {
  const explainableAtoms = [...knowledgeBase.atoms.values()].filter((atom) =>
    [...knowledgeBase.connections.values()].some((connection) => {
      if (connection.id.targetId !== atom.id) {
        return false
      }
      const source = [...knowledgeBase.operators.values()].find(
        (operator) => operator.id === connection.id.sourceId,
      )
      return source !== undefined && hasIncomingConnections(source)
    }),
  )
  const backgroundAtoms = [...knowledgeBase.atoms.values()].filter(
    (atom) => !explainableAtoms.includes(atom),
  )

  for (const atom of explainableAtoms) {
    changeAtomToExplainableAtom(atom)
  }

  for (const atom of backgroundAtoms) {
    changeAtomToBackgroundAtom(atom)
  }
}

const processNameInput = computed(() => {
  const selectedAtom = selectedAtomRef.value
  return useDebounceFn((name) => {
    if (selectedAtom === undefined) return
    setName(selectedAtom, name)
  }, 100)
})

function nodeIdToMessageString(nodeId: number): string {
  return `\`${nodeId.toString()}\``
}

function parseLinkIdToConnectionId(linkId: string): ConnectionId {
  const linkParts = linkId.split('-')
  if (!hasMoreThenOneEntry(linkParts)) {
    throw new Error(`Link with ID \`${linkId}\` is not valid: Seperator \`-\` is not contained.`)
  }
  if (linkParts.length > 2) {
    throw new Error(
      `Link with ID \`${linkId}\` is not valid: Seperator \`-\` is contained more then once.`,
    )
  }
  const sourceId = parseInt(linkParts[0])
  const tragetId = parseInt(linkParts[1])
  if (!Number.isSafeInteger(sourceId) || sourceId < 0)
    throw new Error(
      `Link with ID \`${linkId}\` is not valid: Invalid source node ID ${nodeIdToMessageString(sourceId)}.`,
    )
  if (!Number.isSafeInteger(tragetId) || tragetId < 0)
    throw new Error(
      `Link with ID \`${linkId}\` is not valid: Invalid target node ID ${nodeIdToMessageString(tragetId)}.`,
    )
  return {
    sourceId: sourceId,
    targetId: tragetId,
  }
}

function onLinkCreated(event: Event) {
  if (loadingData.value) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createdLink = (event as any).detail.link
  const graphInstance = graphInstanceRef.value
  const negated = selectedLinkType.value === 'NEGATED'
  const connectionId = parseLinkIdToConnectionId(createdLink.id)
  const connection = {
    id: connectionId,
    negated: negated,
  }
  knowledgeBase.connections.set(getConnectionKey(connection.id), connection)
  selectConnection(connection.id)

  // When the event is handled, the HTML is not yet rendered.
  void nextTick(() => {
    updateConjuctionsForAllAtoms(graphInstance)
    graphInstance.setLabelEditable(false, createdLink.id)
    const color = getColorLink(negated)
    graphInstance.setColor(color, createdLink.id)
    // updateAtomColor(atom)
  })

  updatedExplainableAtoms()
}

function getColorLink(negated: boolean) {
  if (negated) {
    return COLOR_NEGATED_LINKS
  } else {
    return COLOR_REGULAR_LINKS
  }
}

function hasProgrammaticCause(event: Event): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (event as any).detail.cause === EVENT_CAUSE.PROGRAMMATIC_ACTION
}

function onLinkDeleted(event: Event) {
  if (hasProgrammaticCause(event)) return
  if (loadingData.value) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deletedLink = (event as any).detail.link
  const connectionId = parseLinkIdToConnectionId(deletedLink.id)
  knowledgeBase.connections.delete(getConnectionKey(connectionId))
  updatedExplainableAtoms()
  const graphInstance = graphInstanceRef.value
  updateConjuctionsForAllAtoms(graphInstance)
}

function changeAtomToBackgroundAtom(atom: Atom) {
  if (atom.assumption === undefined) {
    atom.assumption = DEFAULT_ASSUMPTION_VALUE
    updateAtomColor(atom)
  }
}

function changeAtomToExplainableAtom(atom: Atom) {
  if (atom.assumption !== undefined) {
    delete atom.assumption
    updateAtomColor(atom)
  }
}

function updateLinkType(newValue: boolean) {
  const selectedConnection = selectedConnectionRef.value
  if (selectedConnection === undefined) return
  selectedConnection.negated = newValue
  const color = getColorLink(newValue)
  graphInstanceRef.value.setColor(
    color,
    // Same as getConnectionKey, but only by chance.
    // getConnectionKey might change in the future.
    // But the ID of the link will only change if the graph library changes.
    `${selectedConnection.id.sourceId.toString()}-${selectedConnection.id.targetId.toString()}`,
  )
}

function setName(atom: Atom, newName: string) {
  atom.name = newName
  setLabel(atom.id, newName)
}

function setLabel(nodeId: number, newName: string) {
  const graphInstance = graphInstanceRef.value
  graphInstance.setLabel(newName, nodeId)
}

function getExportedData() {
  knowledgeBase.updatePositionData(graphInstanceRef.value.getGraph())
  const knowledgeBaseData = knowledgeBase.knowledgeBaseExport
  return {
    data: knowledgeBaseData,
    fileNamePart: 'knowledgeBase',
  }
}

async function loadKnowledgeBase(
  loadFileData: () => Promise<{ fileName: string; fileText: string }>,
) {
  clearNotifications()
  try {
    loadingData.value = true
    const { fileName, fileText } = await loadFileData()
    const errors = knowledgeBase.importKnowledgeBase(fileName, fileText)

    if (errors.length > 0) {
      errors.forEach((error) => {
        addErrorNotification(error.message)
      })
      return
    }

    // Reset UI state related to the old graph
    selectConnection(null)
    selectAtom(null)

    const nodesFromAtoms = [...knowledgeBase.atoms.values()].map((atom) => {
      return {
        id: atom.id,
        props: createAtomProps(),
        label: atom.name,
        x: atom.position.x,
        y: atom.position.y,
        color: getAtomColor(atom),
        // TODO This logic is replicatio of logic in onNodeCreated
        // Fix with https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/317
        labelEditable: false,
        allowIncomingLinks: false,
        allowOutgoingLinks: true,
      }
    })

    const nodesFromOperators = [...knowledgeBase.operators.values()].map((operator) => {
      return {
        id: operator.id,
        props: createOperatorProps(),
        label: getOperatorLabel(operator),
        x: operator.position.x,
        y: operator.position.y,
        color: COLOR_CONJUNCTION,
        labelEditable: false,
        allowIncomingLinks: true,
        allowOutgoingLinks: false,
        fixedPosition: {
          x: true,
          y: true,
        },
      }
    })

    const nodes = [...nodesFromAtoms, ...nodesFromOperators]

    const links = [...knowledgeBase.connections.values()].map((connection) => {
      return {
        sourceId: connection.id.sourceId,
        targetId: connection.id.targetId,
        labelEditable: false,
        color: getColorLink(connection.negated),
      }
    })
    const graphAsObject = { nodes, links }
    graphInstanceRef.value.setGraph(graphAsObject)
    // `graphInstanceRef.value.setGraph` resets the SVG.
    // This also deletes custom `defs`.
    // Therefor we need to call `addHighlightShadowDefinition` again.
    const graphComponentElement = graphComponentElementRef.value
    if (graphComponentElement === null) {
      throw new Error('Graph component element not available.')
    }
    addHighlightShadowDefinition(graphComponentElement)

    // HACK
    // Fix with https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/317
    // This is a solution to for having the IDs used by the graph component after importing.
    // The proper solution would be to not directly importe to the `knowledgeBase` store,
    // but to import to a temporary data structure,
    // then create the nodes and links in the graph component,
    // and after that add the data to the `knowledgeBase` store.
    // In the long run the knowledgeBase store will be deprecated,
    // and this will be revised then.
    updateKnowledgebaseWithAssignedIds()

    // HACK
    // Fix with https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/317
    // Do not render actual links for connections between atoms and components
    const graphInstance = graphInstanceRef.value
    const connectionsWithUnwantedLinks = [...knowledgeBase.connections.values()].filter(
      (connection) => knowledgeBase.atoms.has(connection.id.targetId),
    )

    for (const connection of connectionsWithUnwantedLinks) {
      graphInstance.deleteElement(getLinkId(connection.id))
    }

    updateConjuctionsForAllAtoms(graphInstance)

    addSuccessNotification('Knowledge base loaded successfully.')
  } catch (error) {
    addErrorNotification(String(error))
  } finally {
    loadingData.value = false
  }

  function updateKnowledgebaseWithAssignedIds() {
    const originalAtoms = new Map(knowledgeBase.atoms)
    knowledgeBase.atoms.clear()
    knowledgeBase.operators.clear()
    knowledgeBase.connections.clear()

    const graph = graphInstanceRef.value.getGraph()

    for (const link of graph.links) {
      const connection = {
        id: {
          sourceId: link.sourceId,
          targetId: link.targetId,
        },
        negated: link.color === COLOR_NEGATED_LINKS,
      }
      knowledgeBase.connections.set(getConnectionKey(connection.id), connection)
    }

    for (const node of graph.nodes) {
      if (node.color === COLOR_CONJUNCTION) {
        const operator: Conjunction = {
          id: node.id,
          type: 'conjunction',
          position: {
            x: node.x,
            y: node.y,
          },
        }
        knowledgeBase.operators.set(operator.id, operator)
      } else {
        const idImported = node.idImported
        const orignalAtom = originalAtoms.get(idImported)
        if (orignalAtom === undefined) {
          throw new Error(`Atom with ID ${String(idImported)} not found.`)
        }
        const atom: Atom = {
          id: node.id,
          name: orignalAtom.name,
          description: orignalAtom.description,
          assumption: orignalAtom.assumption,
          position: {
            x: orignalAtom.position.x,
            y: orignalAtom.position.y,
          },
        }
        knowledgeBase.atoms.set(atom.id, atom)
      }
    }
  }
}

const LEFT_MOUSE_BUTTON = 0

function onNodeClicked(event: Event) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const detail = (event as any).detail
  if (detail.button !== LEFT_MOUSE_BUTTON) {
    return
  }
  const atomId = detail.node.id
  selectAtom(atomId)
}

function onLinkClicked(event: Event) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const detail = (event as any).detail
  if (detail.button !== LEFT_MOUSE_BUTTON) {
    return
  }
  const linkId = detail.link.id
  const connectionId = parseLinkIdToConnectionId(linkId)
  selectConnection(connectionId)
}

function updateSelection(clickTarget: HTMLElement) {
  // If clicked outside a link.
  const linkContainer = clickTarget.closest('.graph-controller__link-container')
  if (linkContainer === null) {
    selectConnection(null)
  }

  // If clicked outside a node.
  const nodeContainer = clickTarget.closest('.graph-controller__node-container')
  if (nodeContainer === null) {
    selectAtom(null)
  }
}

function toogleAsumption(toogledValue: boolean) {
  const selectedAtom = selectedAtomRef.value
  if (selectedAtom === undefined) return
  const currentAssumption = selectedAtom.assumption
  if (currentAssumption === undefined) return
  if ([1, 2].includes(currentAssumption)) {
    // current assumption is false
    if (toogledValue) {
      // true is added
      // changed assumption is true and false
      selectedAtom.assumption = 3
    } else {
      // false is removed
      // changed assumption is automatically changed to true
      selectedAtom.assumption = 5
    }
  } else if (currentAssumption === 3) {
    // current assumption is true and false
    if (toogledValue) {
      // true is removed
      // changed assumption is false
      selectedAtom.assumption = 1
    } else {
      // false is removed
      // changed assumption is true
      selectedAtom.assumption = 5
    }
  } else {
    // current assumption is true
    if (toogledValue) {
      // true is removed
      // changed assumption is automatically changed to false
      selectedAtom.assumption = 1
    } else {
      // false is added
      // changed assumption is true and false
      selectedAtom.assumption = 3
    }
  }
}

const enum EVENT_CAUSE {
  USER_ACTION = 'user-action',
  PROGRAMMATIC_ACTION = 'programmatic-action',
}

useEventListener(graphHostRef, 'nodecreated', onNodeCreated)
useEventListener(graphHostRef, 'nodedeleted', onNodeDeleted)
useEventListener(graphHostRef, 'linkcreated', onLinkCreated)
useEventListener(graphHostRef, 'linkdeleted', onLinkDeleted)
useEventListener(graphHostRef, 'nodeclicked', onNodeClicked)
useEventListener(graphHostRef, 'linkclicked', onLinkClicked)
</script>

<template>
  <graph-component
    @click="updateSelection($event.target)"
    @nodedeleted="onNodeDeleted"
    ref="graph-component-element"
  ></graph-component>

  <div class="menu menu-left">
    <div class="node-selection p-2">
      <div class="title is-5 m-0"><h1>Atoms</h1></div>
      <div class="type p-2">
        <div
          class="atom-type-legend"
          :style="{
            background: COLOR_BACKGROUND_ATOM,
          }"
        ></div>
        Background atom
      </div>
      <div class="type p-2">
        <div class="atom-type-legend" :style="{ backgroundColor: COLOR_EXPLAINABLE_ATOM }"></div>
        Explainable atom
      </div>
      <div class="title is-5 m-0"><h1>Causal relation</h1></div>
      <div class="type p-2">
        <!-- https://en.wikipedia.org/wiki/Wedge_(symbol) -->
        <div class="operator-type-legend" :style="{ backgroundColor: COLOR_CONJUNCTION }"></div>
        Independent
      </div>
      <div class="type p-2">
        <!-- https://en.wikipedia.org/wiki/Wedge_(symbol) -->
        <div class="operator-type-legend" :style="{ backgroundColor: COLOR_CONJUNCTION }">
          {{ LABEL_CONJUNCTION }}
        </div>
        Dependent
      </div>
      <div class="type p-2">
        <div class="link-type-legend" :style="{ color: COLOR_REGULAR_LINKS }">&#8594;</div>
        Regular
      </div>
      <div class="type p-2">
        <div class="link-type-legend" :style="{ color: COLOR_NEGATED_LINKS }">&#8594;</div>
        Negated
      </div>
      <div class="title is-5 m-0"><h1>Highlighting</h1></div>
      <div class="type p-2">
        <div
          class="atom-type-legend"
          :style="{
            background: 'white',
            // Generated with https://css-tricks.com/more-control-over-css-borders-with-background-image/
            backgroundImage: `repeating-linear-gradient(0deg, ${COLOR_HIGHLIGHT_SELECTED}, ${COLOR_HIGHLIGHT_SELECTED} 5px, transparent 5px, transparent 8px, ${COLOR_HIGHLIGHT_SELECTED} 8px), repeating-linear-gradient(90deg, ${COLOR_HIGHLIGHT_SELECTED}, ${COLOR_HIGHLIGHT_SELECTED} 5px, transparent 5px, transparent 8px, ${COLOR_HIGHLIGHT_SELECTED} 8px), repeating-linear-gradient(180deg, ${COLOR_HIGHLIGHT_SELECTED}, ${COLOR_HIGHLIGHT_SELECTED} 5px, transparent 5px, transparent 8px, ${COLOR_HIGHLIGHT_SELECTED} 8px), repeating-linear-gradient(270deg, ${COLOR_HIGHLIGHT_SELECTED}, ${COLOR_HIGHLIGHT_SELECTED} 5px, transparent 5px, transparent 8px, ${COLOR_HIGHLIGHT_SELECTED} 8px)`,
            backgroundSize: `3px 100%, 100% 3px, 3px 100% , 100% 3px`,
            backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
            backgroundRepeat: 'no-repeat',
          }"
        ></div>
        Selected for editing
      </div>
      <div class="type p-2">
        <div
          class="atom-type-legend"
          :style="{
            backgroundColor: 'white',
            boxShadow: `0px 0px 6px 2px ${COLOR_HIGHLIGHT_RELEVANT_FOR_EXPLANATION}`,
          }"
        ></div>
        Used in explanation
      </div>
    </div>
  </div>
  <div
    v-if="selectedAtomRef !== undefined"
    class="menu menu-right p-2"
    @keydown.esc="selectAtom(null)"
  >
    <div class="title is-5"><h1>Atom properties</h1></div>

    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          ref="name-input"
          :value="selectedAtomRef.name"
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

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea
          v-model="selectedAtomRef.description"
          class="textarea"
          placeholder="Description"
        ></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Atom type</label>
      <div class="control">
        <label class="radio is-block">
          <input
            type="radio"
            name="question"
            :checked="selectedAtomRef.assumption !== undefined"
            disabled
          />
          Background atom
        </label>
        <label class="radio is-block">
          <input
            type="radio"
            name="question"
            :checked="selectedAtomRef.assumption === undefined"
            disabled
          />
          Explainable atom
        </label>
      </div>
    </div>
    <!-- UI for sliders, when we enable selecting between five values again. -->
    <!-- <div class="field" v-if="selectedAtomRef.assumption !== undefined">
        <label class="label">Assumption</label>
        <div class="control is-flex is-flex-direction-column" style="width: fit-content">
          <input
            v-model="selectedAtomRef.assumption"
            type="range"
            min="1"
            max="5"
            step="1"
            list="values"
            value="2"
          />
          <datalist
            id="values"
            class="is-flex is-flex-direction-row is-justify-content-space-between"
          >
            <option value="1" label="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5" label="5"></option>
          </datalist>
        </div>
      </div> -->

    <div class="field" v-if="selectedAtomRef.assumption !== undefined">
      <label class="label">Assumptions</label>
      <div class="control">
        <div class="checkboxes">
          <label class="checkbox">
            <input
              type="checkbox"
              :checked="[3, 4, 5].includes(selectedAtomRef.assumption)"
              @change="toogleAsumption(true)"
            />
            true
          </label>
          <label class="checkbox">
            <input
              type="checkbox"
              :checked="[1, 2, 3].includes(selectedAtomRef.assumption)"
              @change="toogleAsumption(false)"
            />
            false
          </label>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="selectedConnectionRef !== undefined"
    class="menu menu-right p-2"
    @keydown.esc="selectConnection(null)"
  >
    <div class="title is-5"><h1>Relation properties</h1></div>
    <div class="field">
      <label class="label">Relation type</label>
      <div class="control">
        <div class="checkboxes">
          <label class="checkbox">
            <input
              ref="negated-input"
              type="checkbox"
              name="negated"
              :checked="selectedConnectionRef.negated"
              @change="updateLinkType(!selectedConnectionRef.negated)"
            />
            Negated
          </label>
        </div>
      </div>
    </div>
  </div>
  <div
    class="overlay"
    v-if="loadingData"
    :style="{
      background: `linear-gradient(120deg, ${COLOR_BACKGROUND_ATOM_TRANSPARENT} 0%, ${COLOR_EXPLAINABLE_ATOM_TRANSPARENT} 100%)`,
    }"
  >
    <div class="overlay-content">
      <progress class="progress is-small is-primary" max="100">15%</progress>
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

.node-selection,
.link-selection {
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

.menu-right datalist option:first-child {
  margin-left: 6px;
}

.menu-right datalist option:last-child {
  margin-right: 5px;
}

.type {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
}

.atom-type-legend {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  /* center text inside div */
  text-align: center;
}

.operator-type-legend {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  /* center text inside div */
  text-align: center;
  line-height: 19px;
}

.link-type-legend {
  font-weight: bold;
  height: 20px;
  line-height: 17px;
}
</style>
