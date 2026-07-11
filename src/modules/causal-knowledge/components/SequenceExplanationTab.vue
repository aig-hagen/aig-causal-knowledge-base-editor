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
import type { SequenceExplanations } from '../sequenceExplanation'
import type { CausalArgument } from '../causalArgument'
import type { KnowledgeBase } from '../stores/knowledgeBase'
import CausalArgumentDescription from './CausalArgumentDescription.vue'

const { isActive, sequenceExplanations } = defineProps<{
  isActive: boolean
  sequenceExplanations?: SequenceExplanations
  knowledgeBase: KnowledgeBase
}>()

const explanations = computed(() => {
  if (sequenceExplanations === undefined) {
    return []
  }
  return sequenceExplanations.explanations
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
</script>

<template>
  <div v-if="sequenceExplanations === undefined">
    <div class="max-w-3xl pt-6">
      <div role="alert" class="alert alert-info text-sm">
        Evaluate sequence explanations first in the evaluation console to display them here.
      </div>
    </div>
  </div>
  <div v-else-if="explanations.length === 0">
    <div class="max-w-3xl pt-6">
      <div role="alert" class="alert alert-warning text-sm">
        No sequence explanations to display.
      </div>
    </div>
  </div>
  <div v-else-if="isActive">
    <div class="tabs tabs-lift" :style="{ width: 'max-content' }">
      <a
        v-for="(explanation, index) in explanations"
        :key="index"
        class="tab"
        :class="{ 'tab-active': selectedExplanationIndex === index }"
        @click="selectedExplanationIndex = index"
        >Explanation {{ index + 1 }}</a
      >
    </div>
    <SequenceExplanation
      v-if="selectedExplanation !== undefined"
      :key="selectedExplanationKey"
      :argumentationFramework="sequenceExplanations.argumentationFramework"
      :explanation="selectedExplanation"
    >
      <template #argumentMenu="{ argument }"
        ><CausalArgumentDescription
          :argument="argument as CausalArgument"
          :atoms="knowledgeBase.atoms" /></template
    ></SequenceExplanation>
  </div>
</template>
