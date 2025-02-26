<script setup lang="ts">
import type { Atom, ConnectionId } from '@/model/graphicalCausalKnowledgeBase'
import { useKnowledgeBase } from '@/stores/knowledgeBase'
import { useDebounceFn, useEventListener, useMutationObserver } from '@vueuse/core'
import saveAs from 'file-saver'
import { computed, nextTick, ref, useTemplateRef, watchEffect } from 'vue'

const props = defineProps<{
  showTextEditor: boolean
}>()

const emit = defineEmits<{
  (e: 'update:showTextEditor', showTextEditor: boolean): void
}>()

function toogleTextEditor() {
  emit('update:showTextEditor', !props.showTextEditor)
}

const COLOR_HIGHLIGHT = 'LightBlue'

const COLOR_BACKGROUND_ATOM = 'PapayaWhip'
const COLOR_EXPLAINABLE_ATOM = 'DarkOrange'
const COLOR_CONJUNCTION = 'LightGray'

type NodeType = 'ATOM' | 'CONJUCTION'
const selectedNodeType = ref<NodeType>('ATOM')

const COLOR_REGULAR_LINKS = 'DarkBlue'
const COLOR_NEGATED_LINKS = 'DarkRed'

type LinkType = 'REGULAR' | 'NEGATED'
const selectedLinkType = ref<LinkType>('REGULAR')

type AtomId = number

const DEFAULT_ASSUMPTION_VALUE = 3

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
  return knowledgeBase.connections.get(selectedConnectionId)
})

const graphComponentElementRef = useTemplateRef<HTMLElement>('graph-component-element')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const graphInstanceRef = ref<any | null>(null)
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

function updateAtomColor(atom: Atom) {
  switch (atom.assumption) {
    case undefined:
      graphInstanceRef.value.setNodeColor(COLOR_EXPLAINABLE_ATOM, atom.id)
      break
    default:
      graphInstanceRef.value.setNodeColor(COLOR_BACKGROUND_ATOM, atom.id)
      break
  }
  highlightSelectedNodes()
}

function highlightSelectedNodes() {
  const nodeIdsToHighlight = []
  const selectedAtomId = selectedAtomIdRef.value
  if (selectedAtomId !== null) {
    nodeIdsToHighlight.push(selectedAtomId)
  }

  const selectedConnection = selectedConnectionRef.value
  if (selectedConnection !== undefined) {
    nodeIdsToHighlight.push(selectedConnection.id.sourceId)
    nodeIdsToHighlight.push(selectedConnection.id.targetId)
  }

  for (const nodeId of nodeIdsToHighlight) {
    const nodeElement = document.getElementById(`gc-node-${nodeId}`)! as unknown as SVGCircleElement
    nodeElement.style.stroke = COLOR_HIGHLIGHT
    nodeElement.style.strokeWidth = '4px'
    nodeElement.style.strokeDasharray = '5,5'
  }
}

const { stop } = useMutationObserver(
  graphComponentElementRef,
  () => {
    const graphComponentElement = graphComponentElementRef.value
    if (graphComponentElement === null) return
    if (graphComponentElement.childNodes.length === 0) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const graphInstance = (graphComponentElement as any)._instance.exposed
    graphInstanceRef.value = graphInstance
    graphInstance.toggleNodePhysics(false)
    graphInstance.toggleZoom(true)
    const graphHost = graphComponentElement.getElementsByClassName(
      'graph-controller__graph-host',
    )[0]
    graphHostRef.value = graphHost as HTMLElement
    const nodeContainer = graphComponentElement.getElementsByClassName('nodes')[0]
    nodeContainerRef.value = nodeContainer as SVGElement
    const linkContainer = graphComponentElement.getElementsByClassName('links')[0]
    linkContainerRef.value = linkContainer as SVGAElement
    stop()
  },
  {
    childList: true,
  },
)

useEventListener(graphComponentElementRef, 'click', (event) => {
  const pointerEvent = event as PointerEvent
  const target = pointerEvent.target as HTMLElement

  // TODO check, if `nodeclicked` or `linkclicked` can be used.
  selectedAtomIdRef.value =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (target.closest('.graph-controller__node-container') as any)?.__data__?.id ?? null
  nextTick(() => {
    if (selectedAtomIdRef.value !== null) {
      nameInput.value?.focus()
    }
  })

  selectedConnectionIdRef.value =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (target.closest('.graph-controller__link-container') as any)?.__data__?.id ?? null
  nextTick(() => {
    if (selectedConnectionIdRef.value !== null) {
      negatedInput.value?.focus()
    }
  })
})

useEventListener(graphHostRef, 'nodecreated', (event) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createdNode = (event as any).detail.node
  const graphInstance = graphInstanceRef.value
  // When the event is handled, the HTML is not yet rendered.
  nextTick(() => {
    graphInstance.setLabelEditable(false, createdNode.id)
  })
  switch (selectedNodeType.value) {
    case 'ATOM':
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
      // When the event is handled, the HTML is not yet rendered.
      nextTick(() => {
        updateAtomColor(atom)
      })
      break
    case 'CONJUCTION':
      knowledgeBase.operators.set(createdNode.id, {
        id: createdNode.id,
        type: 'conjunction',
        position: {
          x: createdNode.x,
          y: createdNode.y,
        },
      })
      // When the event is handled, the HTML is not yet rendered.
      nextTick(() => {
        graphInstance.setNodeColor(COLOR_CONJUNCTION, createdNode.id)
        setLabel(createdNode.id, '$\\land$')
      })
      break
  }

  nextTick(() => {
    // const nodeElement = document.getElementById(`gc-node-${createdNode.id}`)!
    // const nodeContainerElement = nodeElement.closest('.graph-controller__node-container')! as SVGGElement
    // useMutationObserver(nodeContainerElement, (mutations, observer) => {
    //   observer.takeRecords()
    //   mutations.empty()
    //   console.log(event)
    //   console.log(graphInstance.getGraph())
    // }, {
    //   attributeFilter: ["transform"]
    // })
  })
})

useEventListener(graphHostRef, 'nodedeleted', (event) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deletedNode = (event as any).detail.node
  knowledgeBase.operators.delete(deletedNode.id)
  knowledgeBase.atoms.delete(deletedNode.id)
})

function updatedExplainableAtoms() {
  const explainableAtoms = [...knowledgeBase.atoms.values()].filter((atom) =>
    [...knowledgeBase.connections.values()].some((connection) => connection.id.targetId == atom.id),
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
  const [sourceIdString, targetIdString] = linkId.split('-')
  if (sourceIdString === undefined)
    throw `Link with ID \`${linkId}\` is not valid: Missing ID of source node.`
  if (targetIdString === undefined)
    throw `Link with ID \`${linkId}\` is not valid: Missing ID of target node..`
  const sourceId = parseInt(sourceIdString)
  const tragetId = parseInt(targetIdString)
  if (!Number.isSafeInteger(sourceId) || sourceId < 0)
    throw `Link with ID \`${linkId}\` is not valid: Invalid source node ID \`${sourceId}\`.`
  if (!Number.isSafeInteger(tragetId) || tragetId < 0)
    throw `Link with ID \`${linkId}\` is not valid: Invalid target node ID \`${tragetId}\`.`
  return {
    sourceId: sourceId,
    targetId: tragetId,
  }
}

useEventListener(graphHostRef, 'linkcreated', (event) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createdLink = (event as any).detail.link
  const graphInstance = graphInstanceRef.value
  const negated = selectedLinkType.value === 'NEGATED'
  const connectionId = parseLinkIdToConnectionId(createdLink.id)
  const connection = {
    id: connectionId,
    negated: negated,
  }
  knowledgeBase.connections.set(connection.id, connection)
  // When the event is handled, the HTML is not yet rendered.
  nextTick(() => {
    graphInstance.setLabelEditable(false, createdLink.id)
    const color = negated ? COLOR_NEGATED_LINKS : COLOR_REGULAR_LINKS
    graphInstance.setLinkColor(color, createdLink.id)
  })

  updatedExplainableAtoms()
})

useEventListener(graphHostRef, 'linkdeleted', (event) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deletedLink = (event as any).detail.link
  const connectionId = parseLinkIdToConnectionId(deletedLink.id)
  knowledgeBase.connections.delete(connectionId)
  updatedExplainableAtoms()
})

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

function updateLinkType() {
  const newValue = negatedInput.value!.checked
  const selectedLink = selectedConnectionRef.value
  if (selectedLink === undefined) return
  selectedLink.negated = newValue
  const color = newValue ? COLOR_NEGATED_LINKS : COLOR_REGULAR_LINKS
  graphInstanceRef.value.setLinkColor(color, selectedLink.id)
}

function setName(atom: Atom, newName: string) {
  atom.name = newName
  setLabel(atom.id, newName)
}

// HACK Change the label in D3 data and HTML.
// Slightly adapted version of https://github.com/aig-hagen/aig_graph_component/blob/d96e5140aa205a7076f25c6e8a72044ab98f79eb/src/components/GraphComponent.vue#L1510
function setLabel(nodeId: number, newName: string) {
  const nodeElement = document.getElementById(`gc-node-${nodeId}`)!
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (nodeElement as any).__data__
  data.label = newName
  const nodeContainerElement = nodeElement.closest('.graph-controller__node-container')!
  const nodeForeignObject = nodeContainerElement.querySelector('foreignObject')
  const labelDiv = nodeContainerElement.getElementsByTagName('div')[0]!
  labelDiv.setAttribute('class', `graph-controller__node-label`)
  labelDiv.textContent = newName

  // _redrawNodeContainer
  // Orignal implementation in https://github.com/aig-hagen/aig_graph_component/blob/d96e5140aa205a7076f25c6e8a72044ab98f79eb/src/components/GraphComponent.vue#L1475
  // removes and readds the `nodeContainer`.
  // Removing and readding the `nodeForeignObject` is enough.
  // Only adding removing and readding `nodeForeignObject` makes the hack to detect added nodes more peformant, because the mutation observer is not triggered needlessly.
  const nodeContainerElementParent = nodeForeignObject!.parentElement
  nodeForeignObject!.remove()
  nodeContainerElementParent?.append(nodeForeignObject!)
}

function exportKnowledgeBase() {

  function pad(n: number): string {
    return n.toString().padStart(2, "0")
  }

  knowledgeBase.updatePositionData(graphInstanceRef.value.getGraph())
  const knowledgeBaseData = knowledgeBase.knowledgeBaseExport
  const json = JSON.stringify(knowledgeBaseData, null, 2)
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
  const now = new Date()
  const fileName = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}.knowledgeBase.json`
  saveAs(blob, fileName)
}
</script>

<template>
  <div>
    <graph-component ref="graph-component-element"></graph-component>

    <div class="menu menu-top box m-5 p-0 is-flex is-flex-direction-row">
      <div class="buttons has-addons">
        <!-- <button class="button" @click="toogleTextEditor">Preview</button> -->
        <button class="button" @click="exportKnowledgeBase()">Save</button>
        <button class="button" v-if="false">Load</button>
        <button class="button" v-if="false" @click="toogleTextEditor">
          {{ showTextEditor ? 'Close' : 'Open' }} preview
        </button>
      </div>
    </div>
    <div class="menu menu-left">
      <div class="node-selection box m-5 p-0">
        <div class="title is-5 p-2 m-0"><h1>Node type</h1></div>
        <div
          class="type p-2"
          :class="{ 'type-selected': selectedNodeType === 'ATOM' }"
          @click="selectedNodeType = 'ATOM'"
        >
          <div
            class="node-type-legend"
            :style="{
              background: `linear-gradient(120deg, ${COLOR_BACKGROUND_ATOM} 0%, ${COLOR_EXPLAINABLE_ATOM} 100%)`,
            }"
          ></div>
          Atom
        </div>
        <div
          class="type p-2"
          :class="{ 'type-selected': selectedNodeType === 'CONJUCTION' }"
          @click="selectedNodeType = 'CONJUCTION'"
        >
          <!-- https://en.wikipedia.org/wiki/Wedge_(symbol) -->
          <div class="node-type-legend" :style="{ backgroundColor: COLOR_CONJUNCTION }">∧</div>
          Conjunction
        </div>
      </div>
      <div class="link-selection box m-5 p-0">
        <div class="title is-5 p-2 m-0"><h1>Connection type</h1></div>
        <div
          class="type p-2"
          :class="{ 'type-selected': selectedLinkType === 'REGULAR' }"
          @click="selectedLinkType = 'REGULAR'"
        >
          <div class="link-type-legend" :style="{ color: COLOR_REGULAR_LINKS }">&#8594;</div>
          Regular connection
        </div>
        <div
          class="type p-2"
          :class="{ 'type-selected': selectedLinkType === 'NEGATED' }"
          @click="selectedLinkType = 'NEGATED'"
        >
          <div class="link-type-legend" :style="{ color: COLOR_NEGATED_LINKS }">&#8594;</div>
          Negated connection
        </div>
      </div>
    </div>
    <div v-if="selectedAtomRef !== undefined" class="menu menu-right box m-5">
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

      <div class="field" v-if="selectedAtomRef.assumption !== undefined">
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
      </div>
    </div>
    <div v-if="selectedConnectionRef !== undefined" class="menu menu-right box m-5">
      <div class="title is-5"><h1>Connection properties</h1></div>
      <div class="field">
        <label class="label">Connection type</label>
        <div class="control">
          <label class="checkbox">
            <input
              ref="negated-input"
              type="checkbox"
              name="negated"
              :checked="selectedConnectionRef.negated"
              @change="updateLinkType"
            />
            Negated
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-top {
  position: fixed;
}

.menu-top * + * {
  border-left: 1px solid gray;
}

.menu-left {
  top: 128px;
  position: fixed;
}

.node-selection,
.link-selection {
  border: 1px solid gray;
  overflow: hidden;
}

.node-selection * + *,
.link-selection * + * {
  border-top: 1px solid gray;
}

.type {
  cursor: pointer;
}

.type-selected {
  background-color: LightBlue;
}

.menu-right {
  top: 128px;
  right: 0;
  position: fixed;
  border: 1px solid gray;
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

.node-type-legend {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  /* center text inside div */
  text-align: center;
  line-height: 15px;
}

.link-type-legend {
  font-weight: bold;
  height: 20px;
  line-height: 17px;
}
</style>
