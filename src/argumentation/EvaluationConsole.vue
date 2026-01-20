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
} from './argumentationFramework'
import { useSequenceExplanationRequest } from '@/sequence-explanation/useSequenceExplanationRequest'
import EvaluationBlockerText from './EvaluationBlockerText.vue'
import SequenceExplanationText2 from '@/sequence-explanation/SequenceExplanationText2.vue'

const { argumentationFramework } = defineProps<{
  argumentationFramework: ArgumentationFramework
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
</script>

<template>
  <div class="evaluation-console p-5">
    <div class="columns">
      <div class="column is-full">
        <form
          @submit.prevent="
            () => {
              if (evaluate !== null) evaluate()
            }
          "
        >
          <div class="field is-grouped is-gapless">
            <div class="field has-addons is-flex-grow-1">
              <div class="control">
                <button :disabled="evaluate === null" type="submit" class="button is-primary">
                  Explain
                </button>
              </div>
              <div class="control is-flex-grow-1">
                <div class="select is-fullwidth">
                  <select
                    class="is-fullwidt"
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
                </div>
              </div>
              <div class="control">
                <button
                  v-if="abortEvaluation !== null"
                  type="button"
                  class="button"
                  @click="abortEvaluation()"
                >
                  Abort
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- TODO Check if one or many .columns are needed. -->
    <div class="columns">
      <div class="column is-full">
        <article v-if="isEvaluating" class="message">
          <div class="message-body is-size-6">Evaluating...</div>
        </article>
        <article v-if="evaluationBlocker !== null" class="message is-warning">
          <div class="message-body is-size-6">
            <EvaluationBlockerText :blocker="evaluationBlocker" />
          </div>
        </article>
        <article v-if="evaluationError !== null" class="message is-danger">
          <div class="message-body is-size-6">
            {{ evaluationError }}
          </div>
        </article>
        <article v-if="evaluationResult !== null" class="message is-dark">
          <div class="message-body is-size-6">
            <SequenceExplanationText2
              :argumentation-framework="argumentationFramework"
              :sequence-explanation-result="evaluationResult"
            />
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped></style>
