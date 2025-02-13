<script setup lang="ts">
import { useDebounceFn, useEventListener, useMutationObserver } from '@vueuse/core'
import { computed, nextTick, ref, useTemplateRef, watchEffect } from 'vue'

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

type NodeId = number
type AtomId = number
type AssumptionValue = 1 | 2 | 3 | 4 | 5

const DEFAULT_ASSUMPTION_VALUE = 3

interface BackgroundAtom {
  id: AtomId
  type: 'BACKGROUND'
  name: string
  descritpion: string
  assumption: AssumptionValue
}

interface ExplainableAtom {
  id: AtomId
  type: 'EXPLAINABLE'
  name: string
  descritpion: string
}

type Atom = BackgroundAtom | ExplainableAtom
const atoms = ref<Map<NodeId, Atom>>(new Map())
const selectedAtomIdRef = ref<AtomId | null>(null)
// selectedAtomId might be an outdated ID, if the atom was deleted while beeing selected
const selectedAtomRef = computed(() => {
  const selectedAtomId = selectedAtomIdRef.value
  if (selectedAtomId === null) return undefined
  return atoms.value.get(selectedAtomId)
})

const conjunctions = ref<Set<NodeId>>(new Set())

type LinkId = string
interface Link {
  id: LinkId
  negated: boolean
}
const links = ref<Map<LinkId, Link>>(new Map())
const selectedLinkIdRef = ref<LinkId | null>(null)
// selectedLinkId might be an outdated ID, if the link was deleted while beeing selected
const selectedLinkRef = computed(() => {
  const selectedLinkId = selectedLinkIdRef.value
  if (selectedLinkId === null) return undefined
  return links.value.get(selectedLinkId)
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
  switch (atom.type) {
    case 'BACKGROUND':
      graphInstanceRef.value.setNodeColor(COLOR_BACKGROUND_ATOM, atom.id)
      break
    case 'EXPLAINABLE':
      graphInstanceRef.value.setNodeColor(COLOR_EXPLAINABLE_ATOM, atom.id)
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
  const nodesOfSelectedLink = selectedLinkRef.value?.id.split('-')
  if (nodesOfSelectedLink !== undefined) {
    nodeIdsToHighlight.push(...nodesOfSelectedLink)
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

  selectedAtomIdRef.value =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (target.closest('.graph-controller__node-container') as any)?.__data__?.id ?? null
  nextTick(() => {
    if (selectedAtomIdRef.value !== null) {
      nameInput.value?.focus()
    }
  })

  selectedLinkIdRef.value =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (target.closest('.graph-controller__link-container') as any)?.__data__?.id ?? null
  nextTick(() => {
    if (selectedLinkIdRef.value !== null) {
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
        type: 'BACKGROUND',
        name: '',
        descritpion: '',
        assumption: DEFAULT_ASSUMPTION_VALUE,
      }
      atoms.value.set(atom.id, atom)
      // When the event is handled, the HTML is not yet rendered.
      nextTick(() => {
        updateAtomColor(atom)
      })
      break
    case 'CONJUCTION':
      graphInstance.setNodeColor(COLOR_CONJUNCTION, createdNode.id)
      conjunctions.value.add(createdNode.id)
      // When the event is handled, the HTML is not yet rendered.
      nextTick(() => {
        setLabel(createdNode.id, '$\\land$')
      })
      break
  }
})

useEventListener(graphHostRef, 'nodedeleted', (event) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deletedNode = (event as any).detail.node
  conjunctions.value.delete(deletedNode.id)
  atoms.value.delete(deletedNode.id)
})

function updatedExplainableAtoms() {
  const explainableAtoms = [...atoms.value.values()].filter((atom) =>
    [...links.value.values()].some((link) => link.id.endsWith(`${atom.id}`)),
  )
  const backgroundAtoms = [...atoms.value.values()].filter(
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

useEventListener(graphHostRef, 'linkcreated', (event) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createdLink = (event as any).detail.link
  const graphInstance = graphInstanceRef.value
  const negated = selectedLinkType.value === 'NEGATED'

  const link = {
    id: createdLink.id,
    negated: negated,
  }
  links.value.set(link.id, link)

  // When the event is handled, the HTML is not yet rendered.
  nextTick(() => {
    graphInstance.setLabelEditable(false, graphInstance.id)
    const color = negated ? COLOR_NEGATED_LINKS : COLOR_REGULAR_LINKS
    graphInstance.setLinkColor(color, graphInstance.id)
  })

  updatedExplainableAtoms()
})

useEventListener(graphHostRef, 'linkdeleted', (event) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createdLink = (event as any).detail.link
  links.value.delete(createdLink.id)

  updatedExplainableAtoms()
})

function changeAtomToBackgroundAtom(atom: Atom) {
  if (atom.type === 'EXPLAINABLE') {
    ;(atom as unknown as BackgroundAtom).type = 'BACKGROUND'
    ;(atom as unknown as BackgroundAtom).assumption = DEFAULT_ASSUMPTION_VALUE
    updateAtomColor(atom)
  }
}

function changeAtomToExplainableAtom(atom: Atom) {
  if (atom.type === 'BACKGROUND') {
    ;(atom as unknown as ExplainableAtom).type = 'EXPLAINABLE'
    // @ts-expect-error: Legal, because we are changig the type here
    delete atom.assumption
    updateAtomColor(atom)
  }
}

function updateLinkType() {
  const newValue = negatedInput.value!.checked
  const selectedLink = selectedLinkRef.value
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
</script>

<template>
  <graph-component ref="graph-component-element"></graph-component>

  <div class="menu menu-top box m-5 p-0 is-flex is-flex-direction-row">
    <div class="p-4">Menu (WIP)</div>
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
      <label class="label">Descritpion</label>
      <div class="control">
        <textarea
          v-model="selectedAtomRef.descritpion"
          class="textarea"
          placeholder="Descritpion"
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
            :checked="selectedAtomRef.type == 'BACKGROUND'"
            disabled
          />
          Background atom
        </label>
        <label class="radio is-block">
          <input
            type="radio"
            name="question"
            :checked="selectedAtomRef.type == 'EXPLAINABLE'"
            disabled
          />
          Explainable atom
        </label>
      </div>
    </div>

    <div class="field" v-if="selectedAtomRef.type === 'BACKGROUND'">
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
  <div v-if="selectedLinkRef !== undefined" class="menu menu-right box m-5">
    <div class="title is-5"><h1>Connection properties</h1></div>
    <div class="field">
      <label class="label">Connection type</label>
      <div class="control">
        <label class="checkbox">
          <input
            ref="negated-input"
            type="checkbox"
            name="negated"
            :checked="selectedLinkRef.negated"
            @change="updateLinkType"
          />
          Negated
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-top {
  position: fixed;
  border: 1px solid gray;
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
