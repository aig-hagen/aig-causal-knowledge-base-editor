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
 *-->
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
