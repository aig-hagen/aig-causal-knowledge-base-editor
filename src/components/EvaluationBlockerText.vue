<script setup lang="ts">
import {
  ConjunctionIsNotTargetedError,
  CycleError,
  EmptyKnowlegeBaseError,
  NonEvaluableKnowledgebaseError,
} from '@/composables/useEvaluationRequestPayload'
import type { Atom, Id } from '@/model/graphicalCausalKnowledgeBase'
import { getDisplayName } from '@/stores/knowledgeBase'
import { computed } from 'vue'

const props = defineProps<{
  atoms: Map<number, Atom>
  blocker: NonEvaluableKnowledgebaseError
}>()

function getName(nodeId: Id): string {
  const atom = props.atoms.get(nodeId)
  if (atom === undefined) {
    return `cunjunction[id=${String(nodeId)}]`
  }
  return getDisplayName(atom, false)
}

const connectionIdWithNotTargetedConjunction = computed(() => {
  if (props.blocker instanceof ConjunctionIsNotTargetedError) {
    return props.blocker.connectionId
  } else {
    return null
  }
})

const cycle = computed(() => {
  if (props.blocker instanceof CycleError) {
    return props.blocker.cycle
  } else {
    return null
  }
})

const isEmptyKnowlegeBase = computed(() => props.blocker instanceof EmptyKnowlegeBaseError)
</script>

Evaluation is therefore not possible.
<template>
  <div class="is-size-6">
    <p>
      <template v-if="connectionIdWithNotTargetedConjunction !== null">
        A conjunction targeting
        <span class="is-underlined">{{
          getName(connectionIdWithNotTargetedConjunction.targetId)
        }}</span>
        has no incomming edges.
      </template>
      <template v-if="cycle !== null">
        <template v-if="cycle.length == 2"
          >It exists a self-loop for
          <span class="is-underlined">{{ getName(cycle[cycle.length - 0]) }}</span
          >.</template
        >
        <template v-else
          >It exists the following cycle:
          <ul>
            <li v-for="(nodeId, index) in cycle" :key="index">
              <span class="is-underlined">{{ getName(nodeId) }}</span>
            </li>
          </ul>
        </template>
      </template>
      <template v-if="isEmptyKnowlegeBase">The knowledge base has no atoms.</template>
    </p>
    <p>Evaluation is therefore not possible.</p>
  </div>
</template>

<style scoped>
ul {
  list-style-type: '→ ';
}

li {
  list-style-position: inside;
}
</style>
