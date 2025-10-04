<script setup lang="ts">
import type { Atom, Id } from '@/model/graphicalCausalKnowledgeBase'
import { getDisplayName } from '@/stores/knowledgeBase'
import { computed } from 'vue'
import { hasOneEntry } from '@/util/types'

const props = defineProps<{
  atoms: Map<number, Atom>
  perAtomIdSignificantAtomIds: Map<number, number[]>
  requesedAtomForExplanation: Id
}>()

const significantAtomIds = computed(() => {
  let significantAtomIds = props.perAtomIdSignificantAtomIds.get(props.requesedAtomForExplanation)
  significantAtomIds = significantAtomIds ?? []
  significantAtomIds = significantAtomIds.filter(
    (atomId) => atomId != props.requesedAtomForExplanation,
  )
  return significantAtomIds
})

function getName(atomId: Id): string {
  const atom = props.atoms.get(atomId)
  if (atom === undefined) {
    throw new Error(`Atom with ID ${String(atomId)} not found.`)
  }
  return getDisplayName(atom, false)
}
</script>

<template>
  <div>
    <p>
      The conclusion for
      <span class="is-underlined">{{ getName(props.requesedAtomForExplanation) }}</span>
      <template v-if="significantAtomIds.length === 0">
        is independent of any other atoms.</template
      >
      <template v-else-if="hasOneEntry(significantAtomIds)">
        depends on <span class="is-underlined">{{ getName(significantAtomIds[0]) }}</span
        >.
      </template>
      <template v-else-if="significantAtomIds.length > 1">
        depends on:
        <ul>
          <template v-for="atomId in significantAtomIds.slice(0, -1)" :key="`${atomId}`">
            <li>
              <span
                ><span class="is-underlined">{{ getName(atomId) }}</span></span
              >
            </li>
          </template>
          <li>
            <span>
              <span class="is-underlined">{{
                getName(significantAtomIds[significantAtomIds.length - 1]!)
              }}</span
              >.</span
            >
          </li>
        </ul>
      </template>
    </p>
  </div>
</template>

<style scoped>
ul {
  list-style-type: '- ';
}
li {
  list-style-position: inside;
}
</style>
