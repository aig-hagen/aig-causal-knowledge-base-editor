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
import { computed, ref, watchEffect } from 'vue'
import {
  getArgumentIds,
  getArguments,
  hasArgument,
  type Argument,
  type ArgumentationFramework,
  type ArgumentId,
} from '@/modules/argumentation/argumentationFramework'
import { useSequenceExplanationRequest } from '@/modules/sequence-explanation/composables/useSequenceExplanationRequest'
import EvaluationBlockerText from '@/modules/argumentation/components/EvaluationBlockerText.vue'
import type { DialectialSequenceExplanationDTO } from '@/modules/sequence-explanation/DialectialSequenceExplanationDTO'
import { SEQUENCE_EXPLANATION_TAB, type Tab } from '../tabs'

const { argumentationFramework } = defineProps<{
  argumentationFramework: ArgumentationFramework<Argument>
  activeTab: Tab
}>()

const emit = defineEmits<{
  'update:sequenceExplanations': [sequenceExplanations?: DialectialSequenceExplanationDTO[]]
  'update:activeTab': [activeTab: Tab]
}>()

function getDisplayName(argument: Argument): string {
  return argument.name.length == 0 ? `unnamed[id=${argument.id}]` : argument.name
}

const nonSelected = Symbol('nonSelected')
const selectedArgumentToShowConclusionFor = ref<ArgumentId | typeof nonSelected>(nonSelected)

watchEffect(() => {
  const selectedArgument = selectedArgumentToShowConclusionFor.value
  if (selectedArgument == nonSelected) {
    return
  }
  if (hasArgument(argumentationFramework, selectedArgument)) {
    return
  }
  selectedArgumentToShowConclusionFor.value = nonSelected
})

const argumentsToShowConclusionFor = computed(() => {
  const selectedArgument = selectedArgumentToShowConclusionFor.value
  if (selectedArgument == nonSelected) {
    return getArgumentIds(argumentationFramework)
  } else {
    return [selectedArgument]
  }
})

const {
  evaluationBlocker,
  evaluate,
  abortEvaluation,
  isEvaluating,
  evaluationError,
  evaluationResult,
} = useSequenceExplanationRequest(argumentationFramework, argumentsToShowConclusionFor)

const sequenceExplanations = computed<DialectialSequenceExplanationDTO[] | undefined>(() => {
  if (evaluationResult.value === null) {
    return undefined
  }

  const explanations = Object.values(
    evaluationResult.value.perArgumentSequenceExplanations,
  ).flatMap((explanations) => explanations)

  return explanations
})

watchEffect(() => {
  emit('update:sequenceExplanations', sequenceExplanations.value)
})
</script>

<template>
  <div class="evaluation-console space-y-3 p-5">
    <form
      @submit.prevent="
        () => {
          if (evaluate !== null) evaluate()
        }
      "
    >
      <div class="join w-full">
        <button :disabled="evaluate === null" type="submit" class="btn btn-primary join-item">
          Explain
        </button>
        <select
          class="select join-item flex-1"
          v-model="selectedArgumentToShowConclusionFor"
          :disabled="getArguments(argumentationFramework).length == 0"
        >
          <option :value="nonSelected">all</option>
          <hr />
          <option
            v-for="argument in getArguments(argumentationFramework)"
            :key="argument.id"
            :value="argument.id"
          >
            {{ getDisplayName(argument) }}
          </option>
        </select>
        <button
          v-if="abortEvaluation !== null"
          type="button"
          class="btn join-item"
          @click="abortEvaluation()"
        >
          Abort
        </button>
      </div>
    </form>
    <div class="space-y-3">
      <div v-if="isEvaluating" role="alert" class="alert text-sm">Evaluating...</div>
      <div v-if="evaluationBlocker !== null" role="alert" class="alert alert-warning text-sm">
        <EvaluationBlockerText :blocker="evaluationBlocker" />
      </div>
      <div v-if="evaluationError !== null" role="alert" class="alert alert-error text-sm">
        {{ evaluationError }}
      </div>
      <div
        v-if="evaluationResult !== null && activeTab !== SEQUENCE_EXPLANATION_TAB"
        role="alert"
        class="alert alert-info text-sm"
      >
        Navigate to the
        <a class="link" @click="emit('update:activeTab', SEQUENCE_EXPLANATION_TAB)"
          >sequence explanation tab</a
        >
        to explore the sequence explanations.
      </div>
    </div>
  </div>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped></style>
