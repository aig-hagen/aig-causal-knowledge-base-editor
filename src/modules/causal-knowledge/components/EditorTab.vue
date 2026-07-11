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
import type {
  Atom,
  Conjunction,
  ConnectionId,
  Id,
} from '@/modules/causal-knowledge/graphicalCausalKnowledgeBase'
import {
  getConnectionKey,
  type KnowledgeBase,
} from '@/modules/causal-knowledge/stores/knowledgeBase'
import { useNotifications } from '@/modules/common/stores/notifications'
import { useDebounceFn, useMutationObserver } from '@vueuse/core'
import { computed, nextTick, onMounted, ref, useTemplateRef, watchEffect } from 'vue'
import * as Colors from '@/modules/common/colors'
import { vFocus } from '@/modules/common/vFocus'
import ControlsExplanationTable from '@/modules/causal-knowledge/components/ControlsExplanationTable.vue'

import {
  hasProgrammaticCause,
  NodeShape,
  parseLinkId,
  type GraphComponent,
  type LinkClickedDetail,
  type LinkCreatedDetail,
  type LinkDeletedDetail,
  type NodeCircle,
  type NodeClickedDetail,
  type NodeCreatedDetail,
  type NodeDeletedDetail,
  type NodeSizeRect,
} from '@/modules/common/graphComponentTypes'
import { LEFT_MOUSE_BUTTON } from '@/modules/common/button'
import { controlElementNames } from '../controls'
import { X } from '@lucide/vue'

defineExpose({
  getExportedData,
  loadKnowledgeBase,
})

const { atomIdsToHighlight, knowledgeBase } = defineProps<{
  atomIdsToHighlight: Id[]
  knowledgeBase: KnowledgeBase
}>()

const { addSuccessNotification, addErrorNotification, clearNotifications } = useNotifications()

const loadingData = ref(false)

// See https://evilmartians.com/chronicles/how-to-detect-safari-and-ios-versions-with-ease
const isWebkit = 'GestureEvent' in window
const COLOR_HIGHLIGHT_SELECTED = Colors.HIGHLIGHT_BLUE
const COLOR_HIGHLIGHT_RELEVANT_FOR_EXPLANATION = Colors.HIGHLIGHT_GREEN
const ID_DEF_SVG_FILTER_HIGHLIGHT_RELEVANT_NODES_FOR_EXPLANATION =
  'highlight-relevant-for-explanation'
const ID_DEF_SVG_FILTER_HIGHLIGHT_RELEVANT_LINKS_FOR_EXPLANATION_WEBKIT =
  'highlight-relevant-for-explanation-links'
// Works in Firefox and Chrome but not Webkit
const CSS_FILTER_HIGHLIGHT_RELEVANT_LINKS_FOR_EXPLANATION = `drop-shadow(0 0 12px ${COLOR_HIGHLIGHT_RELEVANT_FOR_EXPLANATION}) drop-shadow(0 0 12px ${COLOR_HIGHLIGHT_RELEVANT_FOR_EXPLANATION})`
// Works in Webkit and Chrome but not Firefox
const SVG_FILTER_HIGHLIGHT_RELEVANT_LINKS_FOR_EXPLANATION_WEBKIT = `
    <defs>
    <filter id="${ID_DEF_SVG_FILTER_HIGHLIGHT_RELEVANT_LINKS_FOR_EXPLANATION_WEBKIT}" filterUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
      <feDropShadow dx="0" dy="0" stdDeviation="12"  flood-opacity="1" flood-color="${COLOR_HIGHLIGHT_RELEVANT_FOR_EXPLANATION}"/>
      <feDropShadow dx="0" dy="0" stdDeviation="12"  flood-opacity="1" flood-color="${COLOR_HIGHLIGHT_RELEVANT_FOR_EXPLANATION}"/>
    </filter>
  </defs>
  `
const SVG_FILTER_HIGHLIGHT_RELEVANT_NODES_FOR_EXPLANATION = `
    <defs>
    <filter id="${ID_DEF_SVG_FILTER_HIGHLIGHT_RELEVANT_NODES_FOR_EXPLANATION}" x="-100%" y="-100%" width="300%" height="300%">
      <feDropShadow dx="0" dy="0" stdDeviation="12"  flood-opacity="1" flood-color="${COLOR_HIGHLIGHT_RELEVANT_FOR_EXPLANATION}"/>
      <feDropShadow dx="0" dy="0" stdDeviation="12"  flood-opacity="1" flood-color="${COLOR_HIGHLIGHT_RELEVANT_FOR_EXPLANATION}"/>
    </filter>
  </defs>
  `
const COLOR_BACKGROUND_ATOM = Colors.NODE_LIGHT_ORANGE
const COLOR_EXPLAINABLE_ATOM = Colors.NODE_DARK_ORANGE
const COLOR_CONJUNCTION = 'LightGray'
const LABEL_CONJUNCTION = '&'
const ATOM_MIN_WIDTH_IN_PX = 128
const ATOM_HEIGHT_IN_PX = 56
const PORT_RADIUS_IN_PX = 16
// Use LaTex notation, after enabling LaTex support.
// const LABEL_CONJUNCTION = '$\\land$'

const COLOR_REGULAR_LINKS = Colors.LINK_BLUE
const COLOR_NEGATED_LINKS = Colors.LINK_RED

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

const selectedConnectionIdRef = ref<ConnectionId | null>(null)
// selectedLinkId might be an outdated ID, if the link was deleted while beeing selected
const selectedConnectionRef = computed(() => {
  const selectedConnectionId = selectedConnectionIdRef.value
  if (selectedConnectionId === null) return undefined
  return knowledgeBase.connections.get(getConnectionKey(selectedConnectionId))
})

const graphComponentElementRef = useTemplateRef<HTMLElement>('graph-component')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const graphInstanceRef = ref<any>(null)

computed(() => {
  const nodes = graphComponentElementRef.value?.getElementsByClassName('.nodes')
  if (nodes === undefined) return undefined
  return nodes[0] as HTMLElement
})

watchEffect(() => {
  const nodeElements = (graphComponentElementRef.value?.getElementsByClassName(
    'graph-controller__node',
  ) ?? []) as Iterable<SVGCircleElement>
  for (const nodeElement of nodeElements) {
    nodeElement.style.stroke = ''
  }
  highlightSelectedNodes()
})

function updateAtomHighlightingForExplanation(atomId: number) {
  const nodeElement = document.getElementById(`${graphComponentId}-node-${atomId.toString()}`)
  if (nodeElement !== null) {
    if (isNodeHighlightedForExplanation(atomId)) {
      nodeElement.style.filter = `url(#${ID_DEF_SVG_FILTER_HIGHLIGHT_RELEVANT_NODES_FOR_EXPLANATION})`
    } else {
      nodeElement.style.filter = ''
    }
  }
}

function updateConnectionHighlightingForExplanation(connectionId: ConnectionId) {
  const linkElement = document.getElementById(`${graphComponentId}-link-${getLinkId(connectionId)}`)
  if (linkElement !== null) {
    // TODO(https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/317) Simplify logic
    const isHighlighted =
      atomIdsToHighlight.length !== 0 &&
      (isNodeHighlighted(connectionId.sourceId) ||
        someAncestorHighlighted(connectionId.sourceId)) &&
      (isNodeDirectlyHighlighted(connectionId.targetId) ||
        someDescendentHighlighed(connectionId.targetId))
    if (isHighlighted) {
      // CSS filter does not work in Safari/WebKit
      if (isWebkit) {
        linkElement.style.filter = `url(#${ID_DEF_SVG_FILTER_HIGHLIGHT_RELEVANT_LINKS_FOR_EXPLANATION_WEBKIT})`
      } else {
        linkElement.style.filter = CSS_FILTER_HIGHLIGHT_RELEVANT_LINKS_FOR_EXPLANATION
      }
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
  // TODO(https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/317) Restructure because not efficent
  return (
    [...knowledgeBase.connections.values()].filter(
      (connections) => connections.id.targetId === conjunction.id,
    ).length > 1
  )
}

function hasIncomingConnections(conjunction: Conjunction) {
  // TODO(https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/317) Restructure because not efficent
  return [...knowledgeBase.connections.values()].some(
    (connections) => connections.id.targetId === conjunction.id,
  )
}

watchEffect(() => {
  for (const atom of knowledgeBase.atoms.values()) {
    updateAtomColor(atom)
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
    const nodeElement = document.getElementById(`${graphComponentId}-node-${nodeId.toString()}`)
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

  const graphHost = graphComponentElement.getElementsByClassName(
    'graph-controller__graph-host',
  )[0] as HTMLElement

  function isInitialised() {
    return !graphHost.classList.contains('uninitialised')
  }

  function initGraphInstance(graphComponentElement: HTMLElement) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const graphInstance = (graphComponentElement as any)._instance.exposed
    graphInstanceRef.value = graphInstance
    graphInstance.toggleNodePhysics(false)
    graphInstance.toggleZoom(true)
    graphInstance.setNodeGroupsFn(nodeGroupsFn)
    graphInstance.setDefaults({ nodeAutoGrowToLabelSize: false, nodeProps: createAtomProps() })
    graphHost.addEventListener('nodecreated', onNodeCreated)
    graphHost.addEventListener('nodedeleted', onNodeDeleted)
    graphHost.addEventListener('linkcreated', onLinkCreated)
    graphHost.addEventListener('linkdeleted', onLinkDeleted)
    graphHost.addEventListener('nodeclicked', onNodeClicked)
    graphHost.addEventListener('linkclicked', onLinkClicked)
    addHighlightShadowDefinition(graphComponentElement)
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
    SVG_FILTER_HIGHLIGHT_RELEVANT_NODES_FOR_EXPLANATION,
  )
  if (isWebkit) {
    mainContainer.insertAdjacentHTML(
      'afterbegin',
      SVG_FILTER_HIGHLIGHT_RELEVANT_LINKS_FOR_EXPLANATION_WEBKIT,
    )
  }
}

function selectAtom(atomId: number | null) {
  selectedAtomIdRef.value = atomId
  if (atomId !== null) {
    selectedConnectionIdRef.value = null
  }
}

function selectConnection(connectionId: ConnectionId | null) {
  selectedConnectionIdRef.value = connectionId
  if (connectionId !== null) {
    selectedAtomIdRef.value = null
  }
}

function onNodeCreated(event: CustomEvent<NodeCreatedDetail>) {
  if (hasProgrammaticCause(event)) return
  if (loadingData.value) return
  const createdNode = event.detail.node
  const graphInstance = graphInstanceRef.value

  if (createdNode.label !== undefined) {
    throw Error('Created node has a set label.')
  }
  if (createdNode.x === undefined) {
    throw Error('X position is not defined.')
  }

  if (createdNode.y === undefined) {
    throw Error('Y position is not defined.')
  }

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

function onNodeDeleted(event: CustomEvent<NodeDeletedDetail>) {
  if (hasProgrammaticCause(event)) return
  if (loadingData.value) return
  const deletedNode = event.detail.node
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

function parseLinkIdToConnectionId(linkId: string): ConnectionId {
  const { sourceId, targetId } = parseLinkId(linkId)
  return {
    sourceId: sourceId,
    targetId: targetId,
  }
}

function onLinkCreated(event: CustomEvent<LinkCreatedDetail>) {
  if (loadingData.value) return
  if (hasProgrammaticCause(event)) return
  const createdLink = event.detail.link
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

function onLinkDeleted(event: CustomEvent<LinkDeletedDetail>) {
  if (hasProgrammaticCause(event)) return
  if (loadingData.value) return
  const deletedLink = event.detail.link
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
        // TODO(https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/317) This logic is replicatio of logic in onNodeCreated
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

function onNodeClicked(event: CustomEvent<NodeClickedDetail>) {
  const detail = event.detail
  if (detail.button !== LEFT_MOUSE_BUTTON) return
  const atomId = detail.node.id
  selectAtom(atomId)
}

function onLinkClicked(event: CustomEvent<LinkClickedDetail>) {
  const detail = event.detail
  if (detail.button !== LEFT_MOUSE_BUTTON) return
  // Prevent that something else is focused by the origina event,
  // because selecting a connection will focus an input programmatically.
  detail.originalEvent.preventDefault()
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
    <div class="controls-overlay" v-if="knowledgeBase.atoms.size === 0">
      <div style="width: fit-content; margin: auto">
        <ControlsExplanationTable
          :source-name="controlElementNames.source"
          :target-name="controlElementNames.target"
          :link-name="controlElementNames.link"
        />
      </div>
    </div>
    <div class="menu-left">
      <div
        class="node-selection bg-base-100 border-base-300 rounded-box border p-3.5 text-sm shadow-md"
      >
        <div class="legend-section-title">Atoms</div>
        <div class="legend-row">
          <div class="legend-swatch" :style="{ backgroundColor: COLOR_BACKGROUND_ATOM }"></div>
          Background atom
        </div>
        <div class="legend-row">
          <div class="legend-swatch" :style="{ backgroundColor: COLOR_EXPLAINABLE_ATOM }"></div>
          Explainable atom
        </div>
        <div class="legend-section-title mt-3">Causal relation</div>
        <div class="legend-row">
          <!-- https://en.wikipedia.org/wiki/Wedge_(symbol) -->
          <div
            class="legend-swatch legend-swatch-circle"
            :style="{ background: COLOR_CONJUNCTION }"
          ></div>
          Independent
        </div>
        <div class="legend-row">
          <!-- https://en.wikipedia.org/wiki/Wedge_(symbol) -->
          <div
            class="legend-swatch legend-swatch-circle"
            :style="{ background: COLOR_CONJUNCTION }"
          >
            {{ LABEL_CONJUNCTION }}
          </div>
          Dependent
        </div>
        <div class="legend-row">
          <div class="legend-swatch-arrow" :style="{ color: COLOR_REGULAR_LINKS }">&#8594;</div>
          Regular
        </div>
        <div class="legend-row">
          <div class="legend-swatch-arrow" :style="{ color: COLOR_NEGATED_LINKS }">&#8594;</div>
          Negated
        </div>
        <div class="legend-section-title mt-3">Highlighting</div>
        <div class="legend-row">
          <div
            class="legend-swatch"
            :style="{
              background: 'white',
              // Generated with https://css-tricks.com/more-control-over-css-borders-with-background-image/
              backgroundImage: `repeating-linear-gradient(0deg, ${COLOR_HIGHLIGHT_SELECTED}, ${COLOR_HIGHLIGHT_SELECTED} 5px, transparent 5px, transparent 8px, ${COLOR_HIGHLIGHT_SELECTED} 8px), repeating-linear-gradient(90deg, ${COLOR_HIGHLIGHT_SELECTED}, ${COLOR_HIGHLIGHT_SELECTED} 5px, transparent 5px, transparent 8px, ${COLOR_HIGHLIGHT_SELECTED} 8px), repeating-linear-gradient(180deg, ${COLOR_HIGHLIGHT_SELECTED}, ${COLOR_HIGHLIGHT_SELECTED} 5px, transparent 5px, transparent 8px, ${COLOR_HIGHLIGHT_SELECTED} 8px), repeating-linear-gradient(270deg, ${COLOR_HIGHLIGHT_SELECTED}, ${COLOR_HIGHLIGHT_SELECTED} 5px, transparent 5px, transparent 8px, ${COLOR_HIGHLIGHT_SELECTED} 8px)`,
              backgroundSize: `3px 100%, 100% 3px, 3px 100% , 100% 3px`,
              backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
              backgroundRepeat: 'no-repeat',
              border: 'none',
            }"
          ></div>
          Selected for editing
        </div>
        <div class="legend-row">
          <div
            class="legend-swatch"
            :style="{
              backgroundColor: 'white',
              boxShadow: `0px 0px 6px 2px ${COLOR_HIGHLIGHT_RELEVANT_FOR_EXPLANATION}`,
              border: 'none',
            }"
          ></div>
          Used in explanation
        </div>
      </div>
    </div>
    <div
      v-if="selectedAtomRef !== undefined"
      class="menu-right bg-base-100 border-base-300 rounded-box w-64 space-y-4 border p-4 shadow-md"
      @keydown.esc="selectAtom(null)"
    >
      <div class="flex items-center justify-between">
        <h1 class="text-lg font-semibold">Atom properties</h1>
        <button
          class="btn btn-sm btn-circle btn-ghost"
          aria-label="Close"
          @click="selectAtom(null)"
        >
          <X class="size-4" aria-hidden="true" />
        </button>
      </div>

      <div>
        <label class="text-base-content/80 mb-1 block text-sm font-medium">Name</label>
        <input
          v-focus
          :key="selectedAtomRef.id"
          :value="selectedAtomRef.name"
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
        <label class="text-base-content/80 mb-1 block text-sm font-medium">Description</label>
        <textarea
          v-model="selectedAtomRef.description"
          class="textarea w-full"
          placeholder="Description"
        ></textarea>
      </div>

      <div>
        <label class="text-base-content/80 mb-1 block text-sm font-medium">Type</label>
        <p class="text-sm">
          {{ selectedAtomRef.assumption !== undefined ? 'Background atom' : 'Explainable atom' }}
        </p>
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
    </div>
    <div
      v-if="selectedConnectionRef !== undefined"
      class="menu-right bg-base-100 border-base-300 rounded-box w-64 space-y-4 border p-4 shadow-md"
      @keydown.esc="selectConnection(null)"
    >
      <div class="flex items-center justify-between">
        <h1 class="text-lg font-semibold">Relation properties</h1>
        <button
          class="btn btn-sm btn-circle btn-ghost"
          aria-label="Close"
          @click="selectConnection(null)"
        >
          <X class="size-4" aria-hidden="true" />
        </button>
      </div>
      <div>
        <label class="text-base-content/80 mb-1 block text-sm font-medium">Relation type</label>
        <label class="label w-fit cursor-pointer gap-2 px-0">
          <input
            v-focus
            :key="getConnectionKey(selectedConnectionRef.id)"
            type="checkbox"
            name="negated"
            class="checkbox checkbox-sm"
            :checked="selectedConnectionRef.negated"
            @change="updateLinkType(!selectedConnectionRef.negated)"
          />
          Negated
        </label>
      </div>
    </div>
    <div
      class="overlay"
      v-if="loadingData"
      :style="{
        background: `linear-gradient(120deg, rgb(from ${COLOR_BACKGROUND_ATOM} r g b / 0.5)0%, rgb(from ${COLOR_EXPLAINABLE_ATOM} r g b / 0.5) 100%)`,
      }"
    >
      <div class="overlay-content">
        <progress class="progress progress-primary h-1.5" max="100">15%</progress>
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

.controls-overlay {
  pointer-events: none;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
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

.menu-right datalist option:first-child {
  margin-left: 6px;
}

.menu-right datalist option:last-child {
  margin-right: 5px;
}

.legend-section-title {
  color: var(--color-base-content);
  opacity: 0.6;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 0.375rem;
}

.legend-section-title:first-child {
  margin-top: 0;
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

.legend-swatch-circle {
  border-radius: 100%;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-base-content);
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
