<script setup lang="ts">
import type { Atom, ConnectionId } from '@/model/graphicalCausalKnowledgeBase'
import { getConnectionKey, useKnowledgeBase } from '@/stores/knowledgeBase'
import { useNotifications } from '@/stores/notifications'
import { useDebounceFn, useEventListener, useMutationObserver } from '@vueuse/core'
import saveAs from 'file-saver'
import { computed, nextTick, ref, useTemplateRef, watchEffect } from 'vue'

import { useId } from 'vue'

const uploadElementId = useId()

const props = defineProps<{
  showTextEditor: boolean
  showEvaluationConsole: boolean
}>()

const emit = defineEmits<{
  'update:showTextEditor': [showTextEditor: boolean]
  'update:showEvaluationConsole': [showEvaluationConsole: boolean]
}>()

function toogleTextEditor() {
  emit('update:showTextEditor', !props.showTextEditor)
}

function toogleEvaluationConsole() {
  emit('update:showEvaluationConsole', !props.showEvaluationConsole)
}

const { addSuccessNotification, addErrorNotification, clearNotifications } = useNotifications()

const loadingData = ref(false)

const COLOR_HIGHLIGHT = 'LightBlue'

const COLOR_BACKGROUND_ATOM = 'rgba(255, 239, 213, 1)' // PapayaWhip
const COLOR_EXPLAINABLE_ATOM = 'rgba(255, 140, 0, 1)' // DarkOrange
const COLOR_BACKGROUND_ATOM_TRANSPARENT = 'rgba(255, 239, 213, 0.5)' // PapayaWhip
const COLOR_EXPLAINABLE_ATOM_TRANSPARENT = 'rgba(255, 140, 0, 0.5)' // DarkOrange
const COLOR_CONJUNCTION = 'LightGray'
const LABEL_CONJUNCTION = '∧'
// Use LaTex notation, after enabling LaTex support.
// const LABEL_CONJUNCTION = '$\\land$'

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

function updateAtomColor(atom: Atom) {
  switch (atom.assumption) {
    case undefined:
      graphInstanceRef.value.setColor(COLOR_EXPLAINABLE_ATOM, atom.id)
      break
    default:
      graphInstanceRef.value.setColor(COLOR_BACKGROUND_ATOM, atom.id)
      break
  }
  highlightSelectedNodes()
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
    if (nodeElement === null) {
      throw new Error(`Node element for node ${nodeIdToMessageString(nodeId)} not found.`)
    }
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

function selectAtom(atomId: number | null) {
  selectedAtomIdRef.value = atomId
  if (atomId !== null) {
    selectedConnectionIdRef.value = null
    void nextTick(() => {
      if (selectedAtomIdRef.value !== null) {
        nameInput.value?.focus()
      }
    })
  }
}

function selectConnection(connectionId: ConnectionId | null) {
  selectedConnectionIdRef.value = connectionId
  if (connectionId !== null) {
    selectedAtomIdRef.value = null
    void nextTick(() => {
      if (selectedConnectionIdRef.value !== null) {
        negatedInput.value?.focus()
      }
    })
  }
}

function onNodeCreated(event: Event) {
  if (loadingData.value) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createdNode = (event as any).detail.node
  const graphInstance = graphInstanceRef.value
  // When the event is handled, the HTML is not yet rendered.
  void nextTick(() => {
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
      selectAtom(atom.id)
      // When the event is handled, the HTML is not yet rendered.
      void nextTick(() => {
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
      void nextTick(() => {
        graphInstance.setColor(COLOR_CONJUNCTION, createdNode.id)
        setLabel(createdNode.id, LABEL_CONJUNCTION)
      })
      break
  }

  void nextTick(() => {
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
}

function onNodeDeleted(event: Event) {
  if (loadingData.value) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deletedNode = (event as any).detail.node
  knowledgeBase.operators.delete(deletedNode.id)
  knowledgeBase.atoms.delete(deletedNode.id)
}

function updatedExplainableAtoms() {
  const explainableAtoms = [...knowledgeBase.atoms.values()].filter((atom) =>
    [...knowledgeBase.connections.values()].some(
      (connection) => connection.id.targetId === atom.id,
    ),
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
  if (linkParts.length < 2) {
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
    graphInstance.setLabelEditable(false, createdLink.id)
    const color = negated ? COLOR_NEGATED_LINKS : COLOR_REGULAR_LINKS
    graphInstance.setColor(color, createdLink.id)
  })

  updatedExplainableAtoms()
}

function onLinkDeleted(event: Event) {
  if (loadingData.value) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deletedLink = (event as any).detail.link
  const connectionId = parseLinkIdToConnectionId(deletedLink.id)
  knowledgeBase.connections.delete(getConnectionKey(connectionId))
  updatedExplainableAtoms()
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
  const color = newValue ? COLOR_NEGATED_LINKS : COLOR_REGULAR_LINKS
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

function saveKnowledgeBase() {
  function pad(value: number, maxLenght: number): string {
    return value.toString().padStart(maxLenght, '0')
  }

  knowledgeBase.updatePositionData(graphInstanceRef.value.getGraph())
  const knowledgeBaseData = knowledgeBase.knowledgeBaseExport
  const json = JSON.stringify(knowledgeBaseData, null, 2)
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
  const now = new Date()
  const fileName = `${pad(now.getFullYear(), 4)}-${pad(now.getMonth() + 1, 2)}-${pad(now.getDate(), 2)}.knowledgeBase.json`
  saveAs(blob, fileName)
}

function loadTextData(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      resolve(reader.result as string)
    })
    reader.addEventListener('error', () => {
      const error = reader.error
      if (error === null) {
        throw new Error('Error callback called but reader provided no error.')
      }
      reject(error)
    })
    reader.readAsText(file)
  })
}

async function loadKnowledgeBase(inputEvent: Event) {
  const input = inputEvent.target as HTMLInputElement
  const files = input.files ?? []
  if (files.length === 0) return

  clearNotifications()
  try {
    loadingData.value = true
    if (files.length !== 1) throw new Error('Only one file can be loaded at a time.')
    const file = files[0]
    const text = await loadTextData(file)
    const errors = knowledgeBase.importKnowledgeBase(file.name, text)

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
        label: atom.name,
        x: atom.position.x,
        y: atom.position.y,
        color: atom.assumption === undefined ? COLOR_EXPLAINABLE_ATOM : COLOR_BACKGROUND_ATOM,
        labelEditable: false,
      }
    })

    const nodesFromOperators = [...knowledgeBase.operators.values()].map((atom) => {
      return {
        id: atom.id,
        label: LABEL_CONJUNCTION,
        x: atom.position.x,
        y: atom.position.y,
        color: COLOR_CONJUNCTION,
        labelEditable: false,
      }
    })

    const nodes = [...nodesFromAtoms, ...nodesFromOperators]

    const links = [...knowledgeBase.connections.values()].map((connection) => {
      return {
        sourceId: connection.id.sourceId,
        targetId: connection.id.targetId,
        labelEditable: false,
        color: connection.negated ? COLOR_NEGATED_LINKS : COLOR_REGULAR_LINKS,
      }
    })
    const graphAsObject = { nodes, links }
    graphInstanceRef.value.setGraph(graphAsObject)
    addSuccessNotification('Knowledge base loaded successfully.')
  } catch (error) {
    addErrorNotification(String(error))
  } finally {
    loadingData.value = false
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

function updateSelection(clickTarget: HTMLElement) {
  selectAtom(null)

  const linkContainer = clickTarget.closest('.graph-controller__link-container')
  if (linkContainer !== null) {
    // @ts-expect-error __data__ is defined by D3
    selectConnection(parseLinkIdToConnectionId(linkContainer.__data__.id))
  } else {
    selectConnection(null)
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

useEventListener(graphHostRef, 'nodecreated', onNodeCreated)
useEventListener(graphHostRef, 'nodedeleted', onNodeDeleted)
useEventListener(graphHostRef, 'linkcreated', onLinkCreated)
useEventListener(graphHostRef, 'linkdeleted', onLinkDeleted)
useEventListener(graphHostRef, 'nodeclicked', onNodeClicked)
// `labelclicked` is not used, because clicking a label also triggers the click event that updates `updateSelection`.
</script>

<template>
  <div class="editor">
    <graph-component
      @click="updateSelection($event.target)"
      @nodedeleted="onNodeDeleted"
      ref="graph-component-element"
    ></graph-component>

    <div class="menu menu-top box m-5 p-0 is-flex is-flex-direction-row">
      <div class="buttons has-addons">
        <button class="button" @click="saveKnowledgeBase()">Save</button>
        <input
          :id="uploadElementId"
          type="file"
          v-show="false"
          accept="application/json"
          @change="loadKnowledgeBase($event)"
        />
        <label class="button" :for="uploadElementId">Load</label>
        <button v-if="false" class="button" @click="toogleTextEditor">
          {{ showTextEditor ? 'Hide' : 'Show' }} preview
        </button>
        <button class="button" @click="toogleEvaluationConsole">
          {{ showEvaluationConsole ? 'Hide' : 'Show' }} evaluation console
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
    <div v-if="selectedConnectionRef !== undefined" class="menu menu-right box m-5">
      <div class="title is-5"><h1>Connection properties</h1></div>
      <div class="field">
        <label class="label">Connection type</label>
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
.editor {
  position: relative;
  height: 100%;
}

.menu-top {
  position: absolute;
}

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

.menu-top * + * {
  border-left: 1px solid gray;
}

.menu-left {
  top: 128px;
  position: absolute;
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
  position: absolute;
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
