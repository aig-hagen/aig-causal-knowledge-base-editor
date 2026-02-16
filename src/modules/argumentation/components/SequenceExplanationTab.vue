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
import SequenceExplanation from '@/modules/sequence-explanation/components/SequenceExplanation.vue'
import type { Argument, ArgumentationFramework } from '../argumentationFramework'
import type { DialectialSequenceExplanationDTO } from '@/modules/sequence-explanation/DialectialSequenceExplanationDTO'

const { isActive, sequenceExplanations, argumentationFramework } = defineProps<{
  isActive: boolean
  argumentationFramework: ArgumentationFramework<Argument>
  sequenceExplanations?: DialectialSequenceExplanationDTO[]
}>()

const explantionsWithIndexInArgument = computed(() => {
  if (sequenceExplanations === undefined) {
    return []
  }

  const byArgumentIdExplanations = new Map<string, DialectialSequenceExplanationDTO[]>()
  for (const explanation of sequenceExplanations) {
    const argumentId = explanation.argument
    let explanations = byArgumentIdExplanations.get(argumentId)
    if (explanations === undefined) {
      explanations = []
      byArgumentIdExplanations.set(argumentId, explanations)
    }
    explanations.push(explanation)
  }

  const explantionsWithIndexInArgument: {
    explanation: DialectialSequenceExplanationDTO
    indexInArgument: number
  }[] = []
  for (const explanations of byArgumentIdExplanations.values()) {
    explanations.forEach((explanation, index) => {
      explantionsWithIndexInArgument.push({
        explanation: explanation,
        indexInArgument: index,
      })
    })
  }

  return explantionsWithIndexInArgument
})

const selectedExplanationIndex = ref<number>(0)
watch(explantionsWithIndexInArgument, () => {
  selectedExplanationIndex.value = 0
})
const selectedExplanation = computed(
  () => explantionsWithIndexInArgument.value[selectedExplanationIndex.value],
)
const selectedExplanationKey = ref(0)
watch(selectedExplanation, () => {
  selectedExplanationKey.value = selectedExplanationKey.value + 1
})
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
  <div v-else-if="explantionsWithIndexInArgument.length === 0">
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
          v-for="(explantionWithIndexInArgument, index) in explantionsWithIndexInArgument"
          :key="index"
          :class="{ 'is-active': selectedExplanationIndex === index }"
        >
          <a
            ><span
              >Explanation {{ explantionWithIndexInArgument.indexInArgument + 1 }} for
              <span class="is-underlined">{{
                explantionWithIndexInArgument.explanation.argument
              }}</span></span
            ></a
          >
        </li>
      </ul>
    </div>
    <SequenceExplanation
      v-if="selectedExplanation !== undefined"
      :key="selectedExplanationKey"
      :argumentationFramework="argumentationFramework"
      :explanation="selectedExplanation.explanation"
    ></SequenceExplanation>
  </div>
</template>
