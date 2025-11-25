<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import SequenceExplanation from '@/sequence-explanation/SequenceExplanation.vue'
import {
  getArgument,
  getAttacks,
  type ArgumentationFramework,
  type ArgumentId,
} from '@/argumentation/argumentationFramework'
import type { GetSequenceExplanationsResult } from '@/sequence-explanation/GetSequenceExplanationsResult'
import type { DialectialSequenceExplanationDTO } from '@/sequence-explanation/DialectialSequenceExplanationDTO'
import type { AttackDTO } from '@/sequence-explanation/useSequenceExplanationRequest'
// TODO (https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/399) Deduplicate SequenceExplanationText2
const props = defineProps<{
  argumentationFramework: ArgumentationFramework
  sequenceExplanationResult: GetSequenceExplanationsResult
}>()

const explanations = computed(() => {
  const sequenceExplanations = Object.values(
    props.sequenceExplanationResult.perArgumentSequenceExplanations,
  )
  return sequenceExplanations.flatMap((sequenceExplanations) => sequenceExplanations)
})

const attacks: ComputedRef<AttackDTO[]> = computed(() => {
  return getAttacks(props.argumentationFramework).map(([attacker, attacked]) => ({
    attacker: attacker,
    attacked: attacked,
  }))
})

function getReadableArgument(argumentId: ArgumentId): string {
  const argument = getArgument(props.argumentationFramework, argumentId)

  if (argument === undefined) {
    throw new Error('Argument not found.')
  }

  return argument.name
}

const selectedExplanation: Ref<DialectialSequenceExplanationDTO | null> = ref(null)
</script>

<template>
  <div>
    <ul>
      <li v-for="(explanation, index) in explanations" :key="index">
        <a @click="selectedExplanation = explanation"
          >Sequence explanation {{ index + 1 }} (for argument
          {{ getReadableArgument(explanation.argument) }})</a
        >
      </li>
    </ul>
    <!-- TODO(https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/399) Improve modals:
     - extract modal into component
     - deduplicate generic modal functionality with the controls modal
     - ensure ESC key works on modals -->
    <div
      class="modal is-active"
      v-if="selectedExplanation !== null"
      tabindex="0"
      @keydown.esc="selectedExplanation = null"
    >
      <div class="modal-background" @click="selectedExplanation = null"></div>
      <div class="modal-content" style="height: 768px; width: 1280px">
        <div class="box" style="height: 100%; width: 100%">
          <SequenceExplanation
            :attacks="attacks"
            :explanation="selectedExplanation"
            :getReadableArgument="getReadableArgument"
          ></SequenceExplanation>
        </div>
      </div>
      <button
        @click="selectedExplanation = null"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
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
