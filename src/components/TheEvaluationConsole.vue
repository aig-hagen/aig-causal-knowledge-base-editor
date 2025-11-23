<script setup lang="ts">
import { getAssumptions, getDisplayName, useKnowledgeBase } from '@/stores/knowledgeBase'
import { computed, ref, watchEffect } from 'vue'
import Multiselect from '@vueform/multiselect'
import ConclusionsText from './ConclusionsText.vue'
import { getLiteralString, parseLiteralString } from '@/composables/useEvaluationRequestPayload'
import type { Atom, Id } from '@/model/graphicalCausalKnowledgeBase'
import {
  useConclusionEvaluationRequest,
  useExplanationEvaluationRequest,
  useSequenceExplanationEvaluationRequest,
} from '@/composables/useEvaluationRequest'
import EvaluationErrorText from './EvaluationBlockerText.vue'
import ExplanationText from './ExplanationText.vue'
import SequenceExplanationText from '@/sequence-explanation/SequenceExplanationText.vue'

const { previewFeatures } = defineProps<{
  previewFeatures: boolean
}>()

const emit = defineEmits<{
  'update:atomIdsToHighlight': [atomIdsToHighlight: Id[]]
}>()

const knowledgeBase = useKnowledgeBase()

const atoms = computed(() => [...knowledgeBase.atoms.values()])
const assumptions = computed(() =>
  atoms.value
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
  return atoms.value.filter((atom) => atom.assumption === undefined)
})

const observationOptions = computed(() => {
  return convertToOptions(explainableAtoms.value)
})

const assumptionOptions = computed(() => {
  const backgroundAtoms = atoms.value.filter((atom) => atom.assumption !== undefined)
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

const nonSelected = Symbol('nonSelected')
const selectedAtomToShowConclusionFor = ref<Id | typeof nonSelected>(nonSelected)

watchEffect(() => {
  const selectedAtom = selectedAtomToShowConclusionFor.value
  if (selectedAtom == nonSelected) {
    return
  }
  if (knowledgeBase.atoms.has(selectedAtom)) {
    return
  }
  selectedAtomToShowConclusionFor.value = nonSelected
})

const atomsToShowConclusionFor = computed(() => {
  const selectedAtom = selectedAtomToShowConclusionFor.value
  if (selectedAtom == nonSelected) {
    return [...knowledgeBase.atoms.keys()]
  } else {
    return [selectedAtom]
  }
})

const selectedAtomToShowExplanationFor = ref<Id | null>(null)

watchEffect(() => {
  const atomsToShowConclusionForValue = atomsToShowConclusionFor.value
  if (atomsToShowConclusionForValue.length === 1) {
    selectedAtomToShowExplanationFor.value = atomsToShowConclusionForValue[0] ?? null
  }

  const selectedAtom = selectedAtomToShowExplanationFor.value
  if (selectedAtom == null) {
    return
  }
  if (knowledgeBase.atoms.has(selectedAtom)) {
    return
  }
  selectedAtomToShowExplanationFor.value = null
})

function getAtomIdsToHighlight() {
  if (selectedAtomToShowExplanationFor.value === null) {
    return []
  }
  if (explanationEvaluationResult.value === null) {
    return []
  }
  const significantAtoms =
    explanationEvaluationResult.value.get(selectedAtomToShowExplanationFor.value) ?? []

  return significantAtoms
}

watchEffect(() => {
  emit('update:atomIdsToHighlight', getAtomIdsToHighlight())
})

const conclusionFilterEvaluation = computed(() => {
  const selectedAtomToShowConclusionForValue = selectedAtomToShowConclusionFor.value
  return selectedAtomToShowConclusionForValue === nonSelected
    ? null
    : [selectedAtomToShowConclusionForValue]
})

const {
  evaluationBlocker: conclusionsEvaluationBlocker,
  evaluate: evaluateConclusions,
  abortEvaluation: abortConclusionsEvaluation,
  isEvaluating: isEvaluatingConclusions,
  evaluationError: conclusionsEvaluationError,
  evaluationResult: conclusionsEvaluationResult,
} = useConclusionEvaluationRequest(
  computed(() => new Set(knowledgeBase.atoms.keys())),
  computed(() => new Set(knowledgeBase.operators.keys())),
  computed(() => [...knowledgeBase.connections.values()]),
  obserervationAtoms,
  assumptions,
  conclusionFilterEvaluation,
)

const conclusionFilterExplanation = computed(() => {
  const selectedAtomToShowExplanationForValue = selectedAtomToShowExplanationFor.value
  return selectedAtomToShowExplanationForValue === null
    ? null
    : [selectedAtomToShowExplanationForValue]
})

const {
  evaluate: evaluateExplanations,
  abortEvaluation: abortExplanationEvaluation,
  isEvaluating: isEvaluatingExplanation,
  evaluationError: explanationEvaluationError,
  evaluationResult: explanationEvaluationResult,
} = useExplanationEvaluationRequest(
  computed(() => new Set(knowledgeBase.atoms.keys())),
  computed(() => new Set(knowledgeBase.operators.keys())),
  computed(() => [...knowledgeBase.connections.values()]),
  obserervationAtoms,
  assumptions,
  conclusionFilterExplanation,
)

const {
  evaluate: evaluateSequenceExplanations,
  abortEvaluation: abortSequenceExplanationEvaluation,
  isEvaluating: isEvaluatingSequenceExplanations,
  evaluationError: sequenceExplanationEvaluationError,
  evaluationResult: sequenceExplanationEvaluationResult,
} = useSequenceExplanationEvaluationRequest(
  computed(() => new Set(knowledgeBase.atoms.keys())),
  computed(() => new Set(knowledgeBase.operators.keys())),
  computed(() => [...knowledgeBase.connections.values()]),
  obserervationAtoms,
  assumptions,
  conclusionFilterExplanation,
)
</script>

<template>
  <div class="evaluation-console p-5">
    <div class="columns">
      <div class="column is-full">
        <form>
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
        </form>
      </div>
    </div>
    <hr />
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
                  Evaluate
                </button>
              </div>
              <div class="control is-flex-grow-1">
                <div class="select is-fullwidth">
                  <select
                    class="is-fullwidt"
                    v-model="selectedAtomToShowConclusionFor"
                    :disabled="evaluateConclusions === null"
                  >
                    <option :value="nonSelected">all</option>
                    <hr />
                    <option v-for="atom in atoms" :key="atom.id" :value="atom.id">
                      {{ getDisplayName(atom, false) }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="control">
                <button
                  v-if="abortConclusionsEvaluation !== null"
                  type="button"
                  class="button"
                  @click="abortConclusionsEvaluation()"
                >
                  Abort
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <article v-if="isEvaluatingConclusions" class="message">
          <div class="message-body is-size-6">Evaluating...</div>
        </article>
        <article v-if="conclusionsEvaluationBlocker !== null" class="message is-warning">
          <div class="message-body is-size-6">
            <EvaluationErrorText
              :atoms="knowledgeBase.atoms"
              :blocker="conclusionsEvaluationBlocker"
            />
          </div>
        </article>
        <article v-if="conclusionsEvaluationError !== null" class="message is-danger">
          <div class="message-body is-size-6">
            {{ conclusionsEvaluationError }}
          </div>
        </article>
        <article v-if="conclusionsEvaluationResult !== null" class="message is-dark">
          <div class="message-body is-size-6">
            <ConclusionsText
              :atoms="knowledgeBase.atoms"
              :observations="obserervationAtoms"
              :conclusions="conclusionsEvaluationResult"
              :requesed-atoms-for-conclusion="atomsToShowConclusionFor"
            />
          </div>
        </article>
      </div>
    </div>
    <div v-if="conclusionsEvaluationResult !== null">
      <hr />
      <div class="columns">
        <div class="column is-full">
          <form
            @submit.prevent="
              () => {
                if (evaluateExplanations !== null) evaluateExplanations()
              }
            "
          >
            <div class="field is-grouped is-gapless">
              <div class="field has-addons is-flex-grow-1">
                <div class="control">
                  <button
                    :disabled="
                      evaluateExplanations === null || selectedAtomToShowExplanationFor === null
                    "
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
                      v-model="selectedAtomToShowExplanationFor"
                      :disabled="
                        evaluateExplanations === null || atomsToShowConclusionFor.length === 1
                      "
                    >
                      <option v-for="atom in atoms" :key="atom.id" :value="atom.id">
                        {{ getDisplayName(atom, false) }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="control">
                  <button
                    v-if="abortExplanationEvaluation !== null"
                    type="button"
                    class="button"
                    @click="abortExplanationEvaluation()"
                  >
                    Abort
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="columns" v-if="selectedAtomToShowExplanationFor !== null">
        <div class="column is-full">
          <article v-if="isEvaluatingExplanation" class="message">
            <div class="message-body is-size-6">Computing explanation...</div>
          </article>
          <article v-if="explanationEvaluationError !== null" class="message is-danger">
            <div class="message-body is-size-6">
              {{ explanationEvaluationError }}
            </div>
          </article>
          <article v-if="explanationEvaluationResult !== null" class="message is-dark">
            <div class="message-body is-size-6">
              <ExplanationText
                :atoms="knowledgeBase.atoms"
                :per-atom-id-significant-atom-ids="explanationEvaluationResult"
                :requesed-atom-for-explanation="selectedAtomToShowExplanationFor"
              />
            </div>
          </article>
        </div>
      </div>
      <div v-if="previewFeatures" class="columns">
        <div class="column is-full">
          <form
            @submit.prevent="
              () => {
                if (evaluateSequenceExplanations !== null) evaluateSequenceExplanations()
              }
            "
          >
            <div class="field is-grouped is-gapless">
              <div class="field has-addons is-flex-grow-1">
                <div class="control">
                  <button
                    :disabled="
                      evaluateSequenceExplanations === null ||
                      selectedAtomToShowExplanationFor === null
                    "
                    type="submit"
                    class="button is-primary"
                  >
                    Explain (Sequence)
                  </button>
                </div>
                <div class="control is-flex-grow-1">
                  <div class="select is-fullwidth">
                    <select
                      class="is-fullwidt"
                      v-model="selectedAtomToShowExplanationFor"
                      :disabled="
                        evaluateSequenceExplanations === null ||
                        atomsToShowConclusionFor.length === 1
                      "
                    >
                      <option v-for="atom in atoms" :key="atom.id" :value="atom.id">
                        {{ getDisplayName(atom, false) }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="control">
                  <button
                    v-if="abortSequenceExplanationEvaluation !== null"
                    type="button"
                    class="button"
                    @click="abortSequenceExplanationEvaluation()"
                  >
                    Abort
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="columns" v-if="selectedAtomToShowExplanationFor !== null">
        <div class="column is-full">
          <article v-if="isEvaluatingSequenceExplanations" class="message">
            <div class="message-body is-size-6">Computing explanation...</div>
          </article>
          <article v-if="sequenceExplanationEvaluationError !== null" class="message is-danger">
            <div class="message-body is-size-6">
              {{ sequenceExplanationEvaluationError }}
            </div>
          </article>
          <article v-if="sequenceExplanationEvaluationResult !== null" class="message is-dark">
            <div class="message-body is-size-6">
              <SequenceExplanationText
                :atoms="knowledgeBase.atoms"
                :sequence-explanation-reply="sequenceExplanationEvaluationResult"
                :requesed-atom-for-explanation="selectedAtomToShowExplanationFor"
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped></style>
