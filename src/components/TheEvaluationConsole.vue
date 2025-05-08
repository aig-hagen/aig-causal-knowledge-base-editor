<script setup lang="ts">
import { getAssumptions, getDisplayName, useKnowledgeBase } from '@/stores/knowledgeBase'
import { computed, ref, watchEffect } from 'vue'
import Multiselect from '@vueform/multiselect'
import EvaluationText from './EvaluationText.vue'
import {
  getLiteralString,
  parseLiteralString,
  useEvaluationRequestPayload,
} from '@/composables/useEvaluationRequestPayload'
import type { Atom } from '@/model/graphicalCausalKnowledgeBase'
import { useEvaluationRequest } from '@/composables/useEvaluationRequest'
import EvaluationErrorText from './EvaluationBlockerText.vue'

const knowledgeBase = useKnowledgeBase()

const assumptions = computed(() =>
  [...knowledgeBase.atoms.values()]
    .filter((atom) => atom.assumption !== undefined)
    .flatMap((atom) =>
      getAssumptions(atom).map((assumption) => ({ atomId: atom.id, negated: !assumption })),
    ),
)

const assumptionLiteralStrings = computed(() =>
  assumptions.value.map((assumption) => getLiteralString(assumption)),
)

function convertToOptions(atoms: Atom[]): { label: string; value: string }[] {
  return atoms.flatMap((atom) => {
    return [
      {
        label: getDisplayName(atom, false),
        value: getLiteralString({ atomId: atom.id, negated: false }),
      },
      {
        label: getDisplayName(atom, true),
        value: getLiteralString({ atomId: atom.id, negated: true }),
      },
    ]
  })
}

const explainableAtoms = computed(() => {
  return [...knowledgeBase.atoms.values()].filter((atom) => atom.assumption === undefined)
})

const observationOptions = computed(() => {
  return convertToOptions(explainableAtoms.value)
})

const assumptionOptions = computed(() => {
  const backgroundAtoms = [...knowledgeBase.atoms.values()].filter(
    (atom) => atom.assumption !== undefined,
  )
  return convertToOptions(backgroundAtoms)
})

const selectedObservations = ref<string[]>([])

const validSelectedObservations = computed(() => {
  const sourceValues = explainableAtoms.value.flatMap((atom) => {
    return [
      getLiteralString({ atomId: atom.id, negated: false }),
      getLiteralString({ atomId: atom.id, negated: true }),
    ]
  })
  return selectedObservations.value.filter((observation) => sourceValues.includes(observation))
})

watchEffect(() => {
  selectedObservations.value = validSelectedObservations.value
})

function setObservations(newObservations: string[]) {
  const previousObservations = selectedObservations.value
  const addedObservations = newObservations.filter((value) => !previousObservations.includes(value))
  for (const observation of addedObservations) {
    const literal = parseLiteralString(observation)
    const negatedLiteral = { ...literal, negated: !literal.negated }
    const negatedObservation = getLiteralString(negatedLiteral)
    const index = selectedObservations.value.indexOf(negatedObservation)
    if (index !== -1) {
      newObservations.splice(index, 1)
    }
  }
  selectedObservations.value = newObservations
}

const obserervationAtoms = computed(() =>
  selectedObservations.value.map((observation) => parseLiteralString(observation)),
)

const evaluationRequestPayload = useEvaluationRequestPayload(
  computed(() => new Set(knowledgeBase.atoms.keys())),
  computed(() => new Set(knowledgeBase.operators.keys())),
  computed(() => [...knowledgeBase.connections.values()]),
  obserervationAtoms,
  assumptions,
)

const {
  evaluationBlocker,
  evaluate,
  abortEvaluation,
  isEvaluating,
  evaluationError,
  evaluationResult,
} = useEvaluationRequest(evaluationRequestPayload)
</script>

<template>
  <div class="evaluation-console p-5">
    <form
      @submit.prevent="
        () => {
          if (evaluate !== null) evaluate()
        }
      "
    >
      <div class="field">
        <label class="label">Assumptions</label>
        <div class="control">
          <!-- Setting `:allow-absent="true"` is workaround for the fact that `sources` is only updated after `assumptions` is updated.
           This leads to some values from `assumptions` not beeing shown in the multiselect.
           See https://github.com/vueform/multiselect/issues/446 -->
          <Multiselect
            :options="assumptionOptions"
            v-model="assumptionLiteralStrings"
            mode="tags"
            :searchable="true"
            :close-on-select="false"
            label="label"
            track-by="label"
            :allow-absent="true"
            :disabled="true"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Observations</label>
        <div class="control">
          <Multiselect
            :value="selectedObservations"
            :options="observationOptions"
            mode="tags"
            :searchable="true"
            :close-on-select="false"
            label="label"
            track-by="label"
            @input="setObservations($event)"
          />
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button :disabled="evaluate === null" type="submit" class="button is-primary">
            Evaluate
          </button>
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
    </form>
    <hr />
    <article v-if="isEvaluating" class="message">
      <div class="message-body is-size-6">Evaluating...</div>
    </article>
    <article v-if="evaluationBlocker !== null" class="message is-warning">
      <div class="message-body is-size-6">
        <EvaluationErrorText :atoms="knowledgeBase.atoms" :blocker="evaluationBlocker" />
      </div>
    </article>
    <article v-if="evaluationError !== null" class="message is-danger">
      <div class="message-body is-size-6">
        {{ evaluationError }}
      </div>
    </article>
    <article v-if="evaluationResult !== null" class="message is-primary">
      <div class="message-body is-size-6">
        <EvaluationText
          :atoms="knowledgeBase.atoms"
          :observations="obserervationAtoms"
          :conclusions="evaluationResult"
          :requesed-atoms-for-conclusion="[...knowledgeBase.atoms.keys()]"
        />
      </div>
    </article>
  </div>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.evaluation-console {
  border-left: 1px solid gray;
}
</style>
