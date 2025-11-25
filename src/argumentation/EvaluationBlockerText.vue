<script setup lang="ts">
import {
  NoAttacksError,
  type SequenceExplanationRequestBlockingError,
} from '@/sequence-explanation/useSequenceExplanationRequest'
import { computed } from 'vue'

const props = defineProps<{
  blocker: SequenceExplanationRequestBlockingError
}>()

const hasNoAttacks = computed(() => props.blocker instanceof NoAttacksError)
</script>

Evaluation is therefore not possible.
<template>
  <div class="is-size-6">
    <p>
      <template v-if="hasNoAttacks">The argumentation framework has no attacks.</template>
    </p>
    <p>Evaluation is therefore not possible.</p>
  </div>
</template>

<style scoped></style>
