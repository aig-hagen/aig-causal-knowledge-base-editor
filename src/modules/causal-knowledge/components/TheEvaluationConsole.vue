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
import {
  getAssumptions,
  getDisplayName,
  type KnowledgeBase,
} from '@/modules/causal-knowledge/stores/knowledgeBase'
import { computed, ref, watchEffect } from 'vue'
import Multiselect from '@vueform/multiselect'
import ConclusionsText from '@/modules/causal-knowledge/components/ConclusionsText.vue'
import {
  getLiteralString,
  parseLiteralString,
  type Literal,
} from '@/modules/causal-knowledge/composables/useEvaluationRequestPayload'
import type { Atom, Id } from '@/modules/causal-knowledge/graphicalCausalKnowledgeBase'
import {
  useConclusionEvaluationRequest,
  useExplanationEvaluationRequest,
  useSequenceExplanationEvaluationRequest,
  type SequenceExplanationReply,
} from '@/modules/causal-knowledge/composables/useEvaluationRequest'
import EvaluationBlockerText from '@/modules/causal-knowledge/components/EvaluationBlockerText.vue'
import ExplanationText from '@/modules/causal-knowledge/components/ExplanationText.vue'
import { SEQUENCE_EXPLANATION_TAB, type Tab } from '../tabs'

const { knowledgeBase, observations, assumptions } = defineProps<{
  knowledgeBase: KnowledgeBase
  observations: Literal[]
  assumptions: Literal[]
  activeTab: Tab
}>()

const emit = defineEmits<{
  'update:atomIdsToHighlight': [atomIdsToHighlight: Id[]]
  'update:observations': [observations: Literal[]]
  'update:assumptions': [assumptions: Literal[]]
  'update:activeTab': [activeTab: Tab]
  'update:sequenceExplanations': [sequenceExplanations?: SequenceExplanationReply]
}>()

const atoms = computed(() => [...knowledgeBase.atoms.values()])
const modeledAssumptions = computed(() =>
  atoms.value
    .filter((atom) => atom.assumption !== undefined)
    .flatMap((atom) =>
      getAssumptions(atom).map((assumption) => ({ atomId: atom.id, negated: !assumption })),
    ),
)

const modeledAssumptionLiteralStrings = computed(() =>
  modeledAssumptions.value.map((assumption) => getLiteralString(assumption)),
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

const backgroundAtoms = computed(() => atoms.value.filter((atom) => atom.assumption !== undefined))

const assumptionOptions = computed(() => {
  return convertToOptions(backgroundAtoms.value)
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
    // Remove negation of new observation, because the only "x" or "not x" can be observerd.
    if (index !== -1) {
      newObservations.splice(index, 1)
    }
  }
  selectedObservations.value = newObservations
}

watchEffect(() => {
  const observationAtoms = selectedObservations.value.map((observation) =>
    parseLiteralString(observation),
  )
  emit('update:observations', observationAtoms)
})

const ignoreModeledAssumptions = ref(false)

function setIgnoreModeledAssumptions(newOverrideAssumptions: boolean) {
  ignoreModeledAssumptions.value = newOverrideAssumptions
  if (newOverrideAssumptions) {
    overridenAssumptions.value = modeledAssumptionLiteralStrings.value
  }
}

const overridenAssumptions = ref<string[]>([])

function setOverridenAssumptions(newAssumptions: string[]) {
  const previousAssumptions = overridenAssumptions.value
  const removedAssumptions = previousAssumptions.filter((value) => !newAssumptions.includes(value))
  for (const removedAssumption of removedAssumptions) {
    const literal = parseLiteralString(removedAssumption)
    const negatedLiteral = { ...literal, negated: !literal.negated }
    const negatedAssumption = getLiteralString(negatedLiteral)
    const index = selectedObservations.value.indexOf(negatedAssumption)
    // Add the negation of the removed assumption, because at least one assumption per background atom must exist.
    if (index === -1) {
      newAssumptions.push(negatedAssumption)
    }
  }
  overridenAssumptions.value = newAssumptions
}

const validOverridenAssumptions = computed(() => {
  return backgroundAtoms.value.flatMap((atom) => {
    const literal = getLiteralString({ atomId: atom.id, negated: false })
    const literalAlreadyIncluded = overridenAssumptions.value.includes(literal)
    const negatedLiteral = getLiteralString({ atomId: atom.id, negated: true })
    const negatedLiteralAlreadyIncluded = overridenAssumptions.value.includes(negatedLiteral)
    const newAssumptions = []
    if (literalAlreadyIncluded) {
      newAssumptions.push(literal)
    }
    if (negatedLiteralAlreadyIncluded) {
      newAssumptions.push(negatedLiteral)
    }
    if (!literalAlreadyIncluded && !negatedLiteralAlreadyIncluded) {
      const modeledAssumptions = getAssumptions(atom).map((assumption) =>
        getLiteralString({ atomId: atom.id, negated: !assumption }),
      )
      newAssumptions.push(...modeledAssumptions)
    }
    return newAssumptions
  })
})

watchEffect(() => {
  overridenAssumptions.value = validOverridenAssumptions.value
})

watchEffect(() => {
  let effectiveAssumptions
  if (ignoreModeledAssumptions.value) {
    effectiveAssumptions = overridenAssumptions.value
  } else {
    effectiveAssumptions = modeledAssumptionLiteralStrings.value
  }
  const assumptionLiterals = effectiveAssumptions.map((assumption) =>
    parseLiteralString(assumption),
  )
  emit('update:assumptions', assumptionLiterals)
})

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
  const selectedAtom = selectedAtomToShowExplanationFor.value
  if (selectedAtom !== null && knowledgeBase.atoms.has(selectedAtom)) {
    return
  }
  selectedAtomToShowExplanationFor.value = knowledgeBase.atoms.values().next().value?.id ?? null
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
  computed(() => observations),
  computed(() => assumptions),
  conclusionFilterEvaluation,
)

const conclusionFilterExplanation = computed(() => {
  const selectedAtomToShowExplanationForValue = selectedAtomToShowExplanationFor.value
  return selectedAtomToShowExplanationForValue === null
    ? null
    : [selectedAtomToShowExplanationForValue]
})

const {
  evaluationBlocker: explanationsEvaluationBlocker,
  evaluate: evaluateExplanations,
  abortEvaluation: abortExplanationEvaluation,
  isEvaluating: isEvaluatingExplanation,
  evaluationError: explanationEvaluationError,
  evaluationResult: explanationEvaluationResult,
} = useExplanationEvaluationRequest(
  computed(() => new Set(knowledgeBase.atoms.keys())),
  computed(() => new Set(knowledgeBase.operators.keys())),
  computed(() => [...knowledgeBase.connections.values()]),
  computed(() => observations),
  computed(() => assumptions),
  conclusionFilterExplanation,
)

const {
  evaluationBlocker: sequenceExplanationsEvaluationBlocker,
  evaluate: evaluateSequenceExplanations,
  abortEvaluation: abortSequenceExplanationEvaluation,
  isEvaluating: isEvaluatingSequenceExplanations,
  evaluationError: sequenceExplanationEvaluationError,
  evaluationResult: sequenceExplanationEvaluationResult,
} = useSequenceExplanationEvaluationRequest(
  computed(() => new Set(knowledgeBase.atoms.keys())),
  computed(() => new Set(knowledgeBase.operators.keys())),
  computed(() => [...knowledgeBase.connections.values()]),
  computed(() => observations),
  computed(() => assumptions),
  conclusionFilterExplanation,
)

watchEffect(() => {
  emit('update:sequenceExplanations', sequenceExplanationEvaluationResult.value ?? undefined)
})

const abortCombinedSequenceExplanationEvaluation = computed(() => {
  if (
    abortExplanationEvaluation.value === null &&
    abortSequenceExplanationEvaluation.value === null
  ) {
    return null
  }
  return () => {
    abortExplanationEvaluation.value?.()
    abortSequenceExplanationEvaluation.value?.()
  }
})
const evaluateCombinedSequenceExplanations = computed(() => {
  if (evaluateExplanations.value === null && evaluateSequenceExplanations.value === null) {
    return null
  }
  return () => {
    evaluateExplanations.value?.()
    evaluateSequenceExplanations.value?.()
  }
})
const combinedExplanationsEvaluationBlocker = computed(() => {
  return explanationsEvaluationBlocker.value ?? sequenceExplanationsEvaluationBlocker.value
})
</script>

<template>
  <div class="evaluation-console p-5">
    <h3 class="title is-3">Evaluation</h3>
    <div class="columns">
      <div class="column is-full">
        <h5 class="title is-5">Inputs</h5>
        <form>
          <div class="field">
            <label class="label">Assumptions (modeled)</label>
            <div class="control">
              <!-- Setting `:allow-absent="true"` is workaround for the fact that `sources` is only updated after `assumptions` is updated.
           This leads to some values from `assumptions` not beeing shown in the multiselect.
           See https://github.com/vueform/multiselect/issues/446 -->
              <Multiselect
                :options="assumptionOptions"
                v-model="modeledAssumptionLiteralStrings"
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
            <label class="label">Assumptions (overridden)</label>
            <div class="control">
              <div class="checkboxes">
                <label class="checkbox">
                  <input
                    type="checkbox"
                    name="negated"
                    :checked="ignoreModeledAssumptions"
                    @change="setIgnoreModeledAssumptions(!ignoreModeledAssumptions)"
                  />
                  Override modeled assumptions for evaluation
                </label>
              </div>
            </div>
            <div class="control mt-2">
              <!-- Setting `:allow-absent="true"` is workaround for the fact that `sources` is only updated after `assumptions` is updated.
           This leads to some values from `assumptions` not beeing shown in the multiselect.
           See https://github.com/vueform/multiselect/issues/446 -->
              <Multiselect
                v-if="ignoreModeledAssumptions"
                :options="assumptionOptions"
                v-model="overridenAssumptions"
                mode="tags"
                :searchable="true"
                :close-on-select="false"
                label="label"
                track-by="label"
                :allow-absent="true"
                @input="setOverridenAssumptions($event)"
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
    <div class="columns">
      <div class="column is-full">
        <h5 class="title is-5">Conclusions</h5>
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
          <div class="message-body is-size-6">Computing conclusions...</div>
        </article>
        <article v-if="conclusionsEvaluationBlocker !== null" class="message is-warning">
          <div class="message-body is-size-6">
            <EvaluationBlockerText
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
              :observations="observations"
              :conclusions="conclusionsEvaluationResult"
              :requesed-atoms-for-conclusion="atomsToShowConclusionFor"
            />
          </div>
        </article>
      </div>
    </div>
    <div>
      <div class="columns">
        <div class="column is-full">
          <h5 class="title is-5">Explanations</h5>
          <form
            @submit.prevent="
              () => {
                if (evaluateCombinedSequenceExplanations !== null)
                  evaluateCombinedSequenceExplanations()
              }
            "
          >
            <div class="field is-grouped is-gapless">
              <div class="field has-addons is-flex-grow-1">
                <div class="control">
                  <button
                    :disabled="
                      evaluateCombinedSequenceExplanations === null ||
                      selectedAtomToShowExplanationFor === null
                    "
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
                      v-model="selectedAtomToShowExplanationFor"
                      :disabled="evaluateExplanations === null"
                    >
                      <option v-for="atom in atoms" :key="atom.id" :value="atom.id">
                        {{ getDisplayName(atom, false) }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="control">
                  <button
                    v-if="abortCombinedSequenceExplanationEvaluation !== null"
                    type="button"
                    class="button"
                    @click="abortCombinedSequenceExplanationEvaluation()"
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
      <div class="columns">
        <div class="column is-full">
          <article v-if="combinedExplanationsEvaluationBlocker !== null" class="message is-warning">
            <div class="message-body is-size-6">
              <EvaluationBlockerText
                :atoms="knowledgeBase.atoms"
                :blocker="combinedExplanationsEvaluationBlocker"
              />
            </div>
          </article>
          <article
            v-if="!isEvaluatingExplanation && isEvaluatingSequenceExplanations"
            class="message"
          >
            <div class="message-body is-size-6">Computing sequence explanations...</div>
          </article>
          <article v-if="sequenceExplanationEvaluationError !== null" class="message is-danger">
            <div class="message-body is-size-6">
              {{ sequenceExplanationEvaluationError }}
            </div>
          </article>
          <article
            v-if="
              sequenceExplanationEvaluationResult !== null && activeTab !== SEQUENCE_EXPLANATION_TAB
            "
            class="message is-link"
          >
            <div class="message-body is-size-6">
              Navigate to the
              <a @click="emit('update:activeTab', SEQUENCE_EXPLANATION_TAB)"
                >sequence explanation tab</a
              >
              to explore the sequence explanations.
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped></style>
