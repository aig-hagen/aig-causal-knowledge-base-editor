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
import { computed, ref, type Ref } from 'vue'
import SequenceExplanation from '@/modules/sequence-explanation/components/SequenceExplanation.vue'
import {
  getArgument,
  type ArgumentationFramework,
  type ArgumentId,
} from '@/modules/argumentation/argumentationFramework'
import type { GetSequenceExplanationsResult } from '@/modules/sequence-explanation/GetSequenceExplanationsResult'
import type { DialectialSequenceExplanationDTO } from '@/modules/sequence-explanation/DialectialSequenceExplanationDTO'

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
            :argumentationFramework="argumentationFramework"
            :explanation="selectedExplanation"
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
