<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import {
  getArgument,
  getArgumentIds,
  getArguments,
  hasArgument,
  type Argument,
  type ArgumentationFramework,
  type ArgumentId,
} from './argumentationFramework'

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

const evaluateConclusions = null
</script>

<template>
  <div class="evaluation-console p-5">
    <div class="columns">
      <div class="column is-full">
        <form
          @submit.prevent="
            () => {
              if (evaluateConclusions !== null) evaluateConclusions()
            }
          "
        >
          <div class="field is-grouped is-gapless">
            <div class="field has-addons is-flex-grow-1">
              <div class="control">
                <button
                  :disabled="evaluateConclusions === null"
                  type="submit"
                  class="button is-primary"
                >
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
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped></style>
