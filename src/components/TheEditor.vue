<script setup lang="ts">
import { useMutationObserver } from '@vueuse/core'
import { computed, nextTick, ref, useTemplateRef } from 'vue'

// TODO add different arrow types for to show negation and no negation
// TODO add color to arrow type and node type selection

type NodeType = 'BACKGROUND_ATOM' | 'EXPLAINABLE_ATOM' | 'CONJUCTION'

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

const atoms = ref<Atom[]>([])
// selectedAtomId might be an outdated id, if the atom was deleted while beeing selected
const selectedAtomId = ref<AtomId | null>(null)
const selectedAtom = computed(() => {
  return atoms.value.find((atom) => atom.id === selectedAtomId.value)
})

const conjunctions = ref<NodeId[]>([])

const selectedNodeType = ref<NodeType>('BACKGROUND_ATOM')

const graphComponentElement = useTemplateRef<HTMLElement>('graph-component-element')
const nodeContainerRef = ref<SVGElement | null>(null)
const linkContainerRef = ref<SVGElement | null>(null)

computed(() => {
  const nodes = graphComponentElement.value?.getElementsByClassName('.nodes')
  if (nodes === undefined) return undefined
  return nodes[0] as HTMLElement
})
const nameInput = useTemplateRef<HTMLInputElement>('name-input')

const { stop } = useMutationObserver(
  graphComponentElement,
  () => {
    if ((graphComponentElement.value?.childNodes ?? []).length == 0) {
      return
    }
    const nodeContainer = graphComponentElement.value?.getElementsByClassName('nodes')[0]
    const linkContainer = graphComponentElement.value?.getElementsByClassName('links')[0]
    stop()
    nodeContainerRef.value = nodeContainer as SVGElement
    linkContainerRef.value = linkContainer as SVGAElement
  },
  {
    childList: true,
  },
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const instanceRef = ref<any | null>(null)

// HACK Detect added nodes.
useMutationObserver(
  nodeContainerRef,
  () => {
    if (!instanceRef.value) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      instanceRef.value = (graphComponentElement.value as any)?._instance?.exposed
      if (!instanceRef.value) return
      graphComponentElement.value?.addEventListener('click', (event) => {
        const pointerEvent = event as PointerEvent
        const target = pointerEvent.target as HTMLElement

        selectedAtomId.value =
          (target.closest('.graph-controller__node-container') as any)?.__data__?.id ?? null
        nextTick(() => {
          nameInput.value?.focus()
        })
      })
    }
    const instance = instanceRef.value
    const graph = instance.getGraph('json', false, false, false)
    const nodeIds: NodeId[] = graph.nodes.map((node: { id: number }) => node.id)
    const knownAtomIds = atoms.value.map((atom) => atom.id)
    const knownConjunctionIds = conjunctions.value
    const newNodeIds = nodeIds.filter(
      (nodeId) => !knownAtomIds.includes(nodeId) && !knownConjunctionIds.includes(nodeId),
    )

    newNodeIds.forEach((nodeId) => {
      instance.setLabelEditable(false, nodeId)
      switch (selectedNodeType.value) {
        case 'BACKGROUND_ATOM':
          instance.setNodeColor('PapayaWhip', nodeId)
          atoms.value.push({
            id: nodeId,
            type: 'BACKGROUND',
            name: '',
            descritpion: '',
            assumption: DEFAULT_ASSUMPTION_VALUE,
          })
          break
        case 'EXPLAINABLE_ATOM':
          instance.setNodeColor('Orange', nodeId)
          atoms.value.push({
            id: nodeId,
            type: 'EXPLAINABLE',
            name: '',
            descritpion: '',
          })
          break
        case 'CONJUCTION':
          instance.setNodeColor('lightgray', nodeId)
          conjunctions.value.push(nodeId)
          setLabel(nodeId, '$\\land$')
          break
      }
    })

    conjunctions.value = conjunctions.value.filter((nodeId) => nodeIds.includes(nodeId))
    atoms.value = atoms.value.filter((atom) => nodeIds.includes(atom.id))
  },
  {
    childList: true,
  },
)

// HACK Detect added links.
useMutationObserver(
  linkContainerRef,
  () => {
    const instance = instanceRef.value
    const graph = instance.getGraph('json', false, false, false)
    const links: string[] = graph.links.map(
      (link: { sourceId: number; targetId: number }) => `${link.sourceId}-${link.targetId}`,
    )
    instance.setLabelEditable(false, links)
  },
  {
    childList: true,
  },
)

function changeAtomToBackgroundAtom(atom: Atom) {
  if (atom.type === 'EXPLAINABLE') {
    ;(atom as unknown as BackgroundAtom).type = 'BACKGROUND'
    ;(atom as unknown as BackgroundAtom).assumption = DEFAULT_ASSUMPTION_VALUE
    instanceRef.value?.setNodeColor('PapayaWhip', atom.id)
  }
}

function changeAtomToExplainableAtom(atom: Atom) {
  if (atom.type === 'BACKGROUND') {
    ;(atom as unknown as ExplainableAtom).type = 'EXPLAINABLE'
    // @ts-expect-error: Legal, because we are changig the type here
    delete atom.assumption
    instanceRef.value?.setNodeColor('Orange', atom.id)
  }
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
  <!-- <div style="height: 100%;"/> -->
  <graph-component ref="graph-component-element"></graph-component>

  <div class="menu menu-top box m-5 p-0 is-flex is-flex-direction-row">
    <div class="p-4">Menu (WIP)</div>
  </div>
  <div class="menu menu-left box m-5 p-0">
    <div class="title is-5 p-2 m-0"><h1>Node type (TODO add color to name)</h1></div>
    <div
      class="node-type p-2"
      :class="{ 'node-type-selected': selectedNodeType === 'BACKGROUND_ATOM' }"
      @click="selectedNodeType = 'BACKGROUND_ATOM'"
    >
      Background atom
    </div>
    <div
      class="node-type p-2"
      :class="{ 'node-type-selected': selectedNodeType === 'EXPLAINABLE_ATOM' }"
      @click="selectedNodeType = 'EXPLAINABLE_ATOM'"
    >
      Explainable atom
    </div>
    <div
      class="node-type p-2"
      :class="{ 'node-type-selected': selectedNodeType === 'CONJUCTION' }"
      @click="selectedNodeType = 'CONJUCTION'"
    >
      Conjunction
    </div>
  </div>
  <div v-if="selectedAtom !== undefined" class="menu menu-right box m-5">
    <div class="title is-5"><h1>Atom properties</h1></div>

    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          ref="name-input"
          :value="selectedAtom.name"
          @input="
            (event) => {
              const target = (event as InputEvent).target as HTMLInputElement
              setName(selectedAtom!!, target.value)
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
          v-model="selectedAtom.descritpion"
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
            :checked="selectedAtom.type == 'BACKGROUND'"
            @change="() => changeAtomToBackgroundAtom(selectedAtom!!)"
          />
          Background atom
        </label>
        <label class="radio is-block">
          <input
            type="radio"
            name="question"
            :checked="selectedAtom.type == 'EXPLAINABLE'"
            @change="() => changeAtomToExplainableAtom(selectedAtom!!)"
          />
          Explainable atom
        </label>
      </div>
    </div>

    <div class="field" v-if="selectedAtom.type === 'BACKGROUND'">
      <label class="label">Assumption</label>
      <div class="control is-flex is-flex-direction-column" style="width: fit-content">
        <input
          v-model="selectedAtom.assumption"
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
</template>

<style scoped>
.menu {
  border: 1px solid gray;
}

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

.menu-left * + * {
  border-top: 1px solid gray;
}

.node-type {
  cursor: pointer;
}

.node-type-selected {
  background: lightgray;
}

.menu-right {
  top: 128px;
  right: 0;
  position: fixed;
}

.menu-right datalist option:first-child {
  margin-left: 6px;
}

.menu-right datalist option:last-child {
  margin-right: 5px;
}
</style>
