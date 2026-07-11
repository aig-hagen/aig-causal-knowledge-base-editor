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
import AtomName from '@/modules/causal-knowledge/components/AtomName.vue'
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
} from '@/modules/causal-knowledge/composables/useEvaluationRequest'
import EvaluationBlockerText from '@/modules/causal-knowledge/components/EvaluationBlockerText.vue'
import ExplanationText from '@/modules/causal-knowledge/components/ExplanationText.vue'
import { SEQUENCE_EXPLANATION_TAB, type Tab } from '../tabs'
import type { SequenceExplanations } from '../sequenceExplanation'
import { argumentationFrameworkFromCausalArguments } from '../argumentation'
import { NODE_LIGHT_ORANGE } from '@/modules/common/colors'

const assumptionTagStyle = {
  '--ms-tag-bg': NODE_LIGHT_ORANGE,
  '--ms-tag-bg-disabled': NODE_LIGHT_ORANGE,
}

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
  'update:sequenceExplanations': [sequenceExplanations?: SequenceExplanations]
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

interface AtomOption {
  label: string
  value: string
  name: string
  negated: boolean
}

function convertToOptions(atoms: Atom[]): AtomOption[] {
  return atoms.flatMap((atom) => {
    const name = getDisplayName(atom, false)
    return [
      {
        label: name,
        value: getLiteralString({ atomId: atom.id, negated: false }),
        name,
        negated: false,
      },
      {
        label: getDisplayName(atom, true),
        value: getLiteralString({ atomId: atom.id, negated: true }),
        name,
        negated: true,
      },
    ]
  })
}

// `option` here is usually a full `AtomOption`, but when `:allow-absent="true"` lets the
// v-model contain a value not (yet) present in `:options`, Multiselect synthesizes a bare
// `{ label, value }` fallback for it — so `name`/`negated` must be re-derived from `value`.
// See the `allow-absent` comment above each Multiselect for why that can happen.
function getOptionDisplay(option: { value: string; name?: string; negated?: boolean }): {
  name: string
  negated: boolean
} {
  if (option.name !== undefined && option.negated !== undefined) {
    return { name: option.name, negated: option.negated }
  }
  const literal = parseLiteralString(option.value)
  const atom = knowledgeBase.atoms.get(literal.atomId)
  return {
    name: atom === undefined ? option.value : getDisplayName(atom, false),
    negated: literal.negated,
  }
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

const sequenceExplanations = computed<SequenceExplanations | undefined>(() => {
  if (sequenceExplanationEvaluationResult.value === null) {
    return undefined
  }

  const explanations = Object.values(
    sequenceExplanationEvaluationResult.value.perAtomSequenceExplanations,
  ).flatMap((explanations) => explanations)

  const allArguments = new Set<string>()
  for (const explanation of explanations) {
    allArguments.add(explanation.argument)
    explanation.supporters.forEach((supporter) => {
      supporter.forEach((arg) => {
        allArguments.add(arg)
      })
    })
    explanation.defeated.forEach((defeated) => {
      defeated.forEach((arg) => {
        allArguments.add(arg)
      })
    })
  }

  const attacks = sequenceExplanationEvaluationResult.value.attacks
  const argumentationFramework = argumentationFrameworkFromCausalArguments(
    attacks,
    knowledgeBase.atoms,
    [...allArguments],
  )

  return {
    argumentationFramework: argumentationFramework,
    explanations: explanations,
  }
})

watchEffect(() => {
  emit('update:sequenceExplanations', sequenceExplanations.value)
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
  <div class="evaluation-console space-y-6 p-5">
    <h4 class="text-xl font-bold">Evaluation</h4>
    <div>
      <h5 class="mb-3 text-lg font-semibold">Inputs</h5>
      <form class="space-y-4">
        <div>
          <label class="text-base-content/80 mb-1 block text-sm font-medium"
            >Assumptions (modeled)</label
          >
          <!-- Setting `:allow-absent="true"` is workaround for the fact that `sources` is only updated after `assumptions` is updated.
           This leads to some values from `assumptions` not beeing shown in the multiselect.
           See https://github.com/vueform/multiselect/issues/446 -->
          <Multiselect
            class="assumption-multiselect"
            :style="assumptionTagStyle"
            :options="assumptionOptions"
            v-model="modeledAssumptionLiteralStrings"
            mode="tags"
            :searchable="true"
            :close-on-select="false"
            label="label"
            track-by="label"
            :allow-absent="true"
            :disabled="true"
          >
            <template v-slot:tag="{ option, disabled }">
              <div class="multiselect-tag" :class="{ 'is-disabled': disabled }">
                <AtomName
                  :name="getOptionDisplay(option).name"
                  :negated="getOptionDisplay(option).negated"
                />
              </div>
            </template>
            <template v-slot:option="{ option }">
              <AtomName
                :name="getOptionDisplay(option).name"
                :negated="getOptionDisplay(option).negated"
              />
            </template>
          </Multiselect>
        </div>
        <div>
          <label class="text-base-content/80 mb-1 block text-sm font-medium"
            >Assumptions (overridden)</label
          >
          <label class="label w-fit cursor-pointer gap-2 px-0">
            <input
              type="checkbox"
              name="negated"
              class="checkbox checkbox-sm"
              :checked="ignoreModeledAssumptions"
              @change="setIgnoreModeledAssumptions(!ignoreModeledAssumptions)"
            />
            Override modeled assumptions for evaluation
          </label>
          <div class="mt-2">
            <!-- Setting `:allow-absent="true"` is workaround for the fact that `sources` is only updated after `assumptions` is updated.
           This leads to some values from `assumptions` not beeing shown in the multiselect.
           See https://github.com/vueform/multiselect/issues/446 -->
            <Multiselect
              class="assumption-multiselect"
              :style="assumptionTagStyle"
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
            >
              <template v-slot:tag="{ option, handleTagRemove, disabled }">
                <div class="multiselect-tag" :class="{ 'is-disabled': disabled }">
                  <AtomName
                    :name="getOptionDisplay(option).name"
                    :negated="getOptionDisplay(option).negated"
                  />
                  <span
                    v-if="!disabled"
                    class="multiselect-tag-remove"
                    @click="handleTagRemove(option, $event)"
                  >
                    <span class="multiselect-tag-remove-icon"></span>
                  </span>
                </div>
              </template>
              <template v-slot:option="{ option }">
                <AtomName
                  :name="getOptionDisplay(option).name"
                  :negated="getOptionDisplay(option).negated"
                />
              </template>
            </Multiselect>
          </div>
        </div>
        <div>
          <label class="text-base-content/80 mb-1 block text-sm font-medium">Observations</label>
          <Multiselect
            :value="selectedObservations"
            :options="observationOptions"
            mode="tags"
            :searchable="true"
            :close-on-select="false"
            label="label"
            track-by="label"
            @input="setObservations($event)"
          >
            <template v-slot:tag="{ option, handleTagRemove, disabled }">
              <div class="multiselect-tag" :class="{ 'is-disabled': disabled }">
                <AtomName
                  :name="getOptionDisplay(option).name"
                  :negated="getOptionDisplay(option).negated"
                />
                <span
                  v-if="!disabled"
                  class="multiselect-tag-remove"
                  @click="handleTagRemove(option, $event)"
                >
                  <span class="multiselect-tag-remove-icon"></span>
                </span>
              </div>
            </template>
            <template v-slot:option="{ option }">
              <AtomName
                :name="getOptionDisplay(option).name"
                :negated="getOptionDisplay(option).negated"
              />
            </template>
          </Multiselect>
        </div>
      </form>
    </div>
    <div>
      <h5 class="mb-3 text-lg font-semibold">Conclusions</h5>
      <form
        @submit.prevent="
          () => {
            if (evaluateConclusions !== null) evaluateConclusions()
          }
        "
      >
        <div class="join w-full">
          <button
            :disabled="evaluateConclusions === null"
            type="submit"
            class="btn btn-primary join-item"
          >
            Evaluate
          </button>
          <select
            class="select join-item flex-1"
            v-model="selectedAtomToShowConclusionFor"
            :disabled="evaluateConclusions === null"
          >
            <option :value="nonSelected">all</option>
            <hr />
            <option v-for="atom in atoms" :key="atom.id" :value="atom.id">
              {{ getDisplayName(atom, false) }}
            </option>
          </select>
          <button
            v-if="abortConclusionsEvaluation !== null"
            type="button"
            class="btn join-item"
            @click="abortConclusionsEvaluation()"
          >
            Abort
          </button>
        </div>
      </form>
    </div>
    <div class="space-y-3">
      <div v-if="isEvaluatingConclusions" role="alert" class="alert text-sm">
        Computing conclusions...
      </div>
      <div
        v-if="conclusionsEvaluationBlocker !== null"
        role="alert"
        class="alert alert-warning text-sm"
      >
        <EvaluationBlockerText
          :atoms="knowledgeBase.atoms"
          :blocker="conclusionsEvaluationBlocker"
        />
      </div>
      <div
        v-if="conclusionsEvaluationError !== null"
        role="alert"
        class="alert alert-error text-sm"
      >
        {{ conclusionsEvaluationError }}
      </div>
      <div
        v-if="conclusionsEvaluationResult !== null"
        class="bg-base-200 border-base-300 rounded-box border p-4 text-sm"
      >
        <ConclusionsText
          :atoms="knowledgeBase.atoms"
          :observations="observations"
          :conclusions="conclusionsEvaluationResult"
          :requesed-atoms-for-conclusion="atomsToShowConclusionFor"
        />
      </div>
    </div>
    <div class="space-y-6">
      <div>
        <h5 class="mb-3 text-lg font-semibold">Explanations</h5>
        <form
          @submit.prevent="
            () => {
              if (evaluateCombinedSequenceExplanations !== null)
                evaluateCombinedSequenceExplanations()
            }
          "
        >
          <div class="join w-full">
            <button
              :disabled="
                evaluateCombinedSequenceExplanations === null ||
                selectedAtomToShowExplanationFor === null
              "
              type="submit"
              class="btn btn-primary join-item"
            >
              Evaluate
            </button>
            <select
              class="select join-item flex-1"
              v-model="selectedAtomToShowExplanationFor"
              :disabled="evaluateExplanations === null"
            >
              <option v-for="atom in atoms" :key="atom.id" :value="atom.id">
                {{ getDisplayName(atom, false) }}
              </option>
            </select>
            <button
              v-if="abortCombinedSequenceExplanationEvaluation !== null"
              type="button"
              class="btn join-item"
              @click="abortCombinedSequenceExplanationEvaluation()"
            >
              Abort
            </button>
          </div>
        </form>
      </div>
      <div class="space-y-3" v-if="selectedAtomToShowExplanationFor !== null">
        <div v-if="isEvaluatingExplanation" role="alert" class="alert text-sm">
          Computing explanation...
        </div>
        <div
          v-if="explanationEvaluationError !== null"
          role="alert"
          class="alert alert-error text-sm"
        >
          {{ explanationEvaluationError }}
        </div>
        <div
          v-if="explanationEvaluationResult !== null"
          class="bg-base-200 border-base-300 rounded-box border p-4 text-sm"
        >
          <ExplanationText
            :atoms="knowledgeBase.atoms"
            :per-atom-id-significant-atom-ids="explanationEvaluationResult"
            :requesed-atom-for-explanation="selectedAtomToShowExplanationFor"
          />
        </div>
      </div>
      <div class="space-y-3">
        <div
          v-if="combinedExplanationsEvaluationBlocker !== null"
          role="alert"
          class="alert alert-warning text-sm"
        >
          <EvaluationBlockerText
            :atoms="knowledgeBase.atoms"
            :blocker="combinedExplanationsEvaluationBlocker"
          />
        </div>
        <div
          v-if="!isEvaluatingExplanation && isEvaluatingSequenceExplanations"
          role="alert"
          class="alert text-sm"
        >
          Computing sequence explanations...
        </div>
        <div
          v-if="sequenceExplanationEvaluationError !== null"
          role="alert"
          class="alert alert-error text-sm"
        >
          {{ sequenceExplanationEvaluationError }}
        </div>
        <div
          v-if="
            sequenceExplanationEvaluationResult !== null && activeTab !== SEQUENCE_EXPLANATION_TAB
          "
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
  </div>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
/* Keep the overridden-assumptions tags visually matching the (always-disabled) modeled-assumptions
   tags, rather than the default active/primary tag color used elsewhere (e.g. Observations).
   Background color (same as background-atom graph nodes) comes from `assumptionTagStyle` since
   it's a JS color constant; a light background keeps the atom name and the muted "not" prefix
   from AtomName.vue (styled for light backgrounds) readable. */
.assumption-multiselect {
  --ms-tag-color: var(--color-base-content);
  --ms-tag-color-disabled: var(--color-base-content);
}

.assumption-multiselect .multiselect-tag {
  border: 1px solid var(--color-base-300);
}
</style>
