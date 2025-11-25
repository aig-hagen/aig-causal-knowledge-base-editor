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
    <!-- TODO Oleks check if one or many .columns are needed. -->
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
