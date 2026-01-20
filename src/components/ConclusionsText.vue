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
 *-->
<script setup lang="ts">
import type { Atom, Id } from '@/model/graphicalCausalKnowledgeBase'
import { type Literal } from '@/composables/useEvaluationRequestPayload'
import { getDisplayName } from '@/stores/knowledgeBase'
import { computed } from 'vue'
import { hasOneEntry } from '@/misc/types'

const props = defineProps<{
  atoms: Map<number, Atom>
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

function getName(atomId: Id, negated: boolean): string {
  const atom = props.atoms.get(atomId)
  if (atom === undefined) {
    throw new Error(`Atom with ID ${String(atomId)} not found.`)
  }
  return getDisplayName(atom, negated)
}
</script>

<template>
  <div>
    <p>
      Given the assumptions and the causal model,
      <template v-if="observations.length === 0">from no observations </template>
      <template v-else-if="hasOneEntry(observations)"
        >from the observation
        <span class="is-underlined">{{
          getName(observations[0].atomId, observations[0].negated)
        }}</span>
        <span v-html="` `"></span>
      </template>
      <template v-else-if="observations.length > 1"
        >from the observations
        <template
          v-for="observation in observations.slice(0, -2)"
          :key="`${observation.atomId}-${observation.negated}`"
          ><span class="is-underlined">{{ getName(observation.atomId, observation.negated) }} </span
          >, </template
        ><span class="is-underlined">{{
          getName(
            observations[observations.length - 2]!.atomId,
            observations[observations.length - 2]!.negated,
          )
        }}</span>
        and
        <span class="is-underlined">{{
          getName(
            observations[observations.length - 1]!.atomId,
            observations[observations.length - 1]!.negated,
          )
        }}</span
        ><span v-html="` `"></span>
      </template>
      <template v-if="conclusionsToShow.length === 0">
        <template v-if="hasOneEntry(requesedAtomsForConclusion)"
          >follow no conclusions for
          <span class="is-underlined">{{ getName(requesedAtomsForConclusion[0], false) }}</span
          >.
        </template>
        <template v-else>follow no conclusions.</template>
      </template>
      <template v-else-if="hasOneEntry(conclusionsToShow)"
        >follows
        <span class="is-underlined">{{
          getName(conclusionsToShow[0].atomId, conclusionsToShow[0].negated)
        }}</span
        >.
      </template>
      <template v-else-if="conclusionsToShow.length > 1"
        >follows:
        <ul>
          <template
            v-for="conclusion in conclusionsToShow.slice(0, -1)"
            :key="`${conclusion.atomId}-${conclusion.negated}`"
          >
            <li>
              <span
                ><span class="is-underlined">{{
                  getName(conclusion.atomId, conclusion.negated)
                }}</span></span
              >
            </li>
          </template>
          <li>
            <span>
              <span class="is-underlined">{{
                getName(
                  conclusionsToShow[conclusionsToShow.length - 1]!.atomId,
                  conclusionsToShow[conclusionsToShow.length - 1]!.negated,
                )
              }}</span
              >.</span
            >
          </li>
        </ul>
      </template>
    </p>
    <p v-if="showNoFurtherConclusions">For other atoms, no conclusions can be made.</p>
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
