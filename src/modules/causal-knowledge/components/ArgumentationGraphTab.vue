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
import { useKnowledgeBase } from '@/modules/causal-knowledge/stores/knowledgeBase'
import { computed, watchEffect } from 'vue'
import ArgumentationFrameworkEditor from '@/modules/argumentation/components/ArgumentationFrameworkEditor.vue'
import { type Literal } from '@/modules/causal-knowledge/composables/useEvaluationRequestPayload'
import {
  useArgumentionFrameworkRequest,
  type ArgumentionFrameworkReply,
} from '@/modules/causal-knowledge/composables/useEvaluationRequest'
import EvaluationBlockerText from '@/modules/causal-knowledge/components/EvaluationBlockerText.vue'
import { layout } from '@/modules/argumentation/layout'
import { argumentationFrameworkFromCausalArguments } from '../argumentation'
import CausalArgumentDescription from './CausalArgumentDescription.vue'
import type { CausalArgument } from '../causalArgument'
import { computedIfActive } from '@/modules/common/computedIfActive'

const knowledgeBase = useKnowledgeBase()

const { isActive, observations, assumptions } = defineProps<{
  isActive: boolean
  observations: Literal[]
  assumptions: Literal[]
}>()

const { evaluationBlocker, evaluate, isEvaluating, evaluationError, evaluationResult } =
  useArgumentionFrameworkRequest(
    computed(() => new Set(knowledgeBase.atoms.keys())),
    computed(() => new Set(knowledgeBase.operators.keys())),
    computed(() => [...knowledgeBase.connections.values()]),
    computed(() => observations),
    computed(() => assumptions),
    null,
  )

watchEffect(() => {
  if (!isActive) {
    return
  }
  if (isEvaluating.value) {
    return
  }
  if (evaluationResult.value !== null) {
    return
  }
  if (evaluationError.value !== null) {
    return
  }
  evaluate.value?.()
})

function createGraphToShow(evaluationResult: ArgumentionFrameworkReply) {
  const aditionalArguments = evaluationResult.arguments
  const attacks = evaluationResult.attacks
  const argumentationFramework = argumentationFrameworkFromCausalArguments(
    attacks,
    knowledgeBase.atoms,
    aditionalArguments,
  )
  layout(argumentationFramework)
  return {
    graph: argumentationFramework,
    key: crypto.randomUUID(),
  }
}

const graphToShow = computedIfActive(
  () => isActive,
  () => {
    if (evaluationResult.value === null) {
      return null
    }
    return createGraphToShow(evaluationResult.value)
  },
)
</script>

<template>
  <div>
    <div v-if="graphToShow !== null">
      <ArgumentationFrameworkEditor
        :argumentationFramework="graphToShow.graph"
        :readonly="true"
        :key="graphToShow.key"
        ><template #argumentMenu="{ argument }"
          ><CausalArgumentDescription
            :argument="argument as CausalArgument"
            :atoms="knowledgeBase.atoms" /></template
      ></ArgumentationFrameworkEditor>
    </div>
    <div v-else class="max-w-3xl space-y-3 pt-6">
      <div v-if="evaluationBlocker !== null" role="alert" class="alert alert-warning text-sm">
        <EvaluationBlockerText :atoms="knowledgeBase.atoms" :blocker="evaluationBlocker" />
      </div>
      <div v-if="isEvaluating" role="alert" class="alert text-sm">Evaluating...</div>
      <div v-if="evaluationError !== null" role="alert" class="alert alert-error text-sm">
        {{ evaluationError }}
      </div>
    </div>
  </div>
</template>
