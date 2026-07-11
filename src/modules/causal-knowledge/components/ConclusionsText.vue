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
import type { Atom, Id } from '@/modules/causal-knowledge/graphicalCausalKnowledgeBase'
import { type Literal } from '@/modules/causal-knowledge/composables/useEvaluationRequestPayload'
import { getDisplayName } from '@/modules/causal-knowledge/stores/knowledgeBase'
import { computed } from 'vue'
import { hasOneEntry } from '@/modules/common/types'
import AtomName from './AtomName.vue'

const props = defineProps<{
  atoms: Map<Id, Atom>
  observations: Literal[]
  conclusions: Literal[]
  requesedAtomsForConclusion: Id[]
}>()

const conclusionsToShow = computed(() => {
  return props.conclusions.filter((conclusion) =>
    props.requesedAtomsForConclusion.includes(conclusion.atomId),
  )
})

const showNoFurtherConclusions = computed(() => {
  if (conclusionsToShow.value.length === 0) {
    return false
  }
  const allRequestedConclusionsHaveAResult = props.requesedAtomsForConclusion.every((atomId) =>
    props.conclusions.some((conclusion) => conclusion.atomId == atomId),
  )
  return !allRequestedConclusionsHaveAResult
})

function getAtomName(atomId: Id): string {
  const atom = props.atoms.get(atomId)
  if (atom === undefined) {
    throw new Error(`Atom with ID ${String(atomId)} not found.`)
  }
  return getDisplayName(atom, false)
}
</script>

<template>
  <div>
    <div>
      Given the assumptions and the causal model,
      <template v-if="observations.length === 0">from no observations </template>
      <template v-else-if="hasOneEntry(observations)"
        >from the observation
        <AtomName
          class="underline"
          :name="getAtomName(observations[0].atomId)"
          :negated="observations[0].negated"
        />
        <span v-html="` `"></span>
      </template>
      <template v-else-if="observations.length > 1"
        >from the observations
        <template
          v-for="observation in observations.slice(0, -2)"
          :key="`${observation.atomId}-${observation.negated}`"
          ><AtomName
            class="underline"
            :name="getAtomName(observation.atomId)"
            :negated="observation.negated"
          />, </template
        ><AtomName
          class="underline"
          :name="getAtomName(observations[observations.length - 2]!.atomId)"
          :negated="observations[observations.length - 2]!.negated"
        />
        and
        <AtomName
          class="underline"
          :name="getAtomName(observations[observations.length - 1]!.atomId)"
          :negated="observations[observations.length - 1]!.negated"
        /><span v-html="` `"></span>
      </template>
      <template v-if="conclusionsToShow.length === 0">
        <template v-if="hasOneEntry(requesedAtomsForConclusion)"
          >follow no conclusions for
          <AtomName
            class="underline"
            :name="getAtomName(requesedAtomsForConclusion[0])"
            :negated="false"
          />.
        </template>
        <template v-else>follow no conclusions.</template>
      </template>
      <template v-else-if="hasOneEntry(conclusionsToShow)"
        >follows
        <AtomName
          class="underline"
          :name="getAtomName(conclusionsToShow[0].atomId)"
          :negated="conclusionsToShow[0].negated"
        />.
      </template>
      <template v-else-if="conclusionsToShow.length > 1"
        >follows:
        <ul>
          <template
            v-for="conclusion in conclusionsToShow.slice(0, -1)"
            :key="`${conclusion.atomId}-${conclusion.negated}`"
          >
            <li>
              <AtomName
                class="underline"
                :name="getAtomName(conclusion.atomId)"
                :negated="conclusion.negated"
              />
            </li>
          </template>
          <li>
            <AtomName
              class="underline"
              :name="getAtomName(conclusionsToShow[conclusionsToShow.length - 1]!.atomId)"
              :negated="conclusionsToShow[conclusionsToShow.length - 1]!.negated"
            />.
          </li>
        </ul>
      </template>
    </div>
    <div v-if="showNoFurtherConclusions">For other atoms, no conclusions can be made.</div>
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
