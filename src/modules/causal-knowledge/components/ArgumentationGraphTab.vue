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
  useKnowledgeBase,
} from '@/modules/causal-knowledge/stores/knowledgeBase'
import { computed, watchEffect } from 'vue'
import ArgumentationFrameworkEditor from '@/modules/argumentation/components/ArgumentationFrameworkEditor.vue'
import { type Literal } from '@/modules/causal-knowledge/composables/useEvaluationRequestPayload'
import { useArgumentionFrameworkRequest } from '@/modules/causal-knowledge/composables/useEvaluationRequest'
import EvaluationBlockerText from '@/modules/causal-knowledge/components/EvaluationBlockerText.vue'
import {
  addArgument,
  addAttack,
  createArgumentationFramework,
  hasArgument,
  type Argument,
} from '@/modules/argumentation/argumentationFramework'
import { layout } from '@/modules/argumentation/layout'

const knowledgeBase = useKnowledgeBase()

const { isActive, observations } = defineProps<{
  isActive: boolean
  observations: Literal[]
}>()

const atoms = computed(() => [...knowledgeBase.atoms.values()])
const assumptions = computed(() =>
  atoms.value
    .filter((atom) => atom.assumption !== undefined)
    .flatMap((atom) =>
      getAssumptions(atom).map((assumption) => ({ atomId: atom.id, negated: !assumption })),
    ),
)

const { evaluationBlocker, evaluate, isEvaluating, evaluationError, evaluationResult } =
  useArgumentionFrameworkRequest(
    computed(() => new Set(knowledgeBase.atoms.keys())),
    computed(() => new Set(knowledgeBase.operators.keys())),
    computed(() => [...knowledgeBase.connections.values()]),
    computed(() => observations),
    assumptions,
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

const argumentationFramework = computed(() => {
  if (evaluationResult.value === null) {
    return null
  }
  const argumentationFrameworkReply = evaluationResult.value
  const argumentationFramework = createArgumentationFramework()
  for (const attack of argumentationFrameworkReply.attacks) {
    const { attacker: attackerId, attacked: attackedId } = attack
    if (!hasArgument(argumentationFramework, attackerId)) {
      const attackerArgument: Argument = {
        id: attackerId,
        name: getReadableArgument(attackerId),
        graphicalData: {
          shape: 'rectangle',
          position: {
            x: 0,
            y: 0,
          },
        },
      }
      addArgument(argumentationFramework, attackerArgument)
    }
    if (!hasArgument(argumentationFramework, attackedId)) {
      const attackedArgument: Argument = {
        id: attackedId,
        name: getReadableArgument(attackedId),
        graphicalData: {
          shape: 'rectangle',
          position: {
            x: 0,
            y: 0,
          },
        },
      }
      addArgument(argumentationFramework, attackedArgument)
    }
    addAttack(argumentationFramework, attackerId, attackedId)
  }
  layout(argumentationFramework)
  return argumentationFramework
})

function getReadableArgument(argumentId: string): string {
  // TODO (https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/399) check if this always works out as expected
  let argumentName = argumentId
  for (const atom of atoms.value) {
    argumentName = argumentName.replace(
      new RegExp(atom.id.toString(), 'g'),
      getDisplayName(atom, false),
    )
  }
  return argumentName
}
</script>

<template>
  <div>
    <div v-if="argumentationFramework !== null">
      <!-- TODO Continue here: Handle empty argumentationFramework specially and explain, when argumentation graph can be empty. -->
      <ArgumentationFrameworkEditor
        :argumentationFramework="argumentationFramework"
        :readonly="true"
      ></ArgumentationFrameworkEditor>
    </div>
    <div v-else class="container is-max-tablet pt-6">
      <div v-if="evaluationBlocker !== null" class="message is-warning">
        <div class="message-body">
          <EvaluationBlockerText :atoms="knowledgeBase.atoms" :blocker="evaluationBlocker" />
        </div>
      </div>
      <div v-if="isEvaluating" class="message">
        <div class="message-body">Evaluating...</div>
      </div>
      <div v-if="evaluationError !== null" class="message is-danger">
        <div class="message-body">
          {{ evaluationError }}
        </div>
      </div>
    </div>
  </div>
</template>
