<script setup lang="ts">
import {
  ConjunctionIsNotTargetedError,
  CycleError,
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

const trailWithCycle = computed(() => {
  if (props.blocker instanceof CycleError) {
    return props.blocker.trail
  } else {
    return null
  }
})
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
      <template v-if="trailWithCycle !== null">
        It exists a
        <template
          v-if="
            trailWithCycle[trailWithCycle.length - 1] === trailWithCycle[trailWithCycle.length - 2]
          "
          >self-loop</template
        >
        <template v-else>cycle</template>
        for
        <span class="is-underlined">{{ getName(trailWithCycle[trailWithCycle.length - 1]) }}</span>
        <template v-if="trailWithCycle.length == 2"> . </template>
        <template v-else>
          : <span class="is-underlined">{{ getName(trailWithCycle[0]) }}</span
          ><template v-for="(nodeId, index) in trailWithCycle.slice(1)" :key="index">
            ← <span class="is-underlined">{{ getName(nodeId) }}</span></template
          >.
        </template>
      </template>
    </p>
    <p>Evaluation is therefore not possible.</p>
  </div>
</template>

<style scoped>
ul {
  list-style-type: '- ';
}

li {
  list-style-position: inside;
}
</style>
