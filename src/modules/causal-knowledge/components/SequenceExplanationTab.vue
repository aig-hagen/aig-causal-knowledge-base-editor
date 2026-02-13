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
import { computed, ref, watch } from 'vue'
import type { SequenceExplanationReply } from '../composables/useEvaluationRequest'
import SequenceExplanation from '@/modules/sequence-explanation/components/SequenceExplanation.vue'
import { getDisplayName, type KnowledgeBase } from '../stores/knowledgeBase'

const { isActive, sequenceExplanations, knowledgeBase } = defineProps<{
  isActive: boolean
  sequenceExplanations?: SequenceExplanationReply
  knowledgeBase: KnowledgeBase
}>()

const explanations = computed(() => {
  if (sequenceExplanations === undefined) {
    return []
  }
  return Object.values(sequenceExplanations.perAtomSequenceExplanations).flatMap(
    (explanations) => explanations,
  )
})

const selectedExplanationIndex = ref<number>(0)
watch(explanations, () => {
  selectedExplanationIndex.value = 0
})
const selectedExplanation = computed(() => explanations.value[selectedExplanationIndex.value])
const selectedExplanationKey = ref(0)
watch(selectedExplanation, () => {
  selectedExplanationKey.value = selectedExplanationKey.value + 1
})

function getReadableArgument(argument: string): string {
  // TODO (https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/399) check if this always works out as expected
  for (const [atomId, atom] of knowledgeBase.atoms) {
    argument = argument.replace(new RegExp(atomId.toString(), 'g'), getDisplayName(atom, false))
  }
  return argument
}
</script>

<template>
  <div v-if="sequenceExplanations === undefined">
    <div class="container is-max-tablet pt-6">
      <div class="message is-info">
        <div class="message-body">
          Evaluate sequence explanations first in the evaluation console to display them here.
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="explanations.length === 0">
    <div class="container is-max-tablet pt-6">
      <div class="message is-warning">
        <div class="message-body">No sequence explanations to display.</div>
      </div>
    </div>
  </div>
  <div v-else-if="isActive">
    <div class="tabs mb-0" :style="{ width: 'max-content' }">
      <ul>
        <li
          @click="selectedExplanationIndex = index"
          v-for="(explanation, index) in explanations"
          :key="index"
          :class="{ 'is-active': selectedExplanationIndex === index }"
        >
          <a>Explanation {{ index + 1 }}</a>
        </li>
      </ul>
    </div>
    <SequenceExplanation
      v-if="selectedExplanation !== undefined"
      :key="selectedExplanationKey"
      :attacks="sequenceExplanations.attacks"
      :explanation="selectedExplanation"
      :getReadableArgument="getReadableArgument"
    ></SequenceExplanation>
  </div>
</template>
