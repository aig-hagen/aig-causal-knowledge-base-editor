<script setup lang="ts">
import type { Atom, Id } from '@/model/graphicalCausalKnowledgeBase'
import { getDisplayName } from '@/stores/knowledgeBase'
import { computed, ref, type Ref } from 'vue'
import type {
  DialectialSequenceExplanationDTO,
  SequenceExplanationReply,
} from '@/composables/useEvaluationRequest'
import SequenceExplanation from './SequenceExplanation.vue'

const props = defineProps<{
  atoms: Map<number, Atom>
  sequenceExplanationReply: SequenceExplanationReply
  requesedAtomForExplanation: Id
}>()

const explanations = computed(() => {
  return (
    props.sequenceExplanationReply.perAtomSequenceExplanations[props.requesedAtomForExplanation] ??
    []
  )
})

function getReadableArgument(argument: string): string {
  for (const [atomId, atom] of props.atoms) {
    argument = argument.replace(new RegExp(atomId.toString(), 'g'), getDisplayName(atom, false))
  }
  return argument
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
    <!-- TODO https://github.com/aig-hagen/aig-causal-knowledge-base-editor/issues/399
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
            :attacks="sequenceExplanationReply.attacks"
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
