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
import { vFocus } from '@/modules/common/vFocus'
import ControlsExplanationTable from './ControlsExplanationTable.vue'

const show = defineModel<boolean>('show', { required: true })
const { sourceName, targetName, linkName } = defineProps<{
  sourceName: string
  targetName: string
  linkName: string
}>()

function hideControlExplanationModal() {
  show.value = false
}
</script>

<template>
  <div
    v-focus
    v-if="show"
    tabindex="0"
    @keydown.esc="hideControlExplanationModal"
    class="modal control-explanation-modal is-active"
  >
    <div class="modal-background" @click="hideControlExplanationModal"></div>
    <div class="modal-content">
      <div class="box">
        <ControlsExplanationTable
          class="is-fullwidth is-hoverable"
          :source-name="sourceName"
          :target-name="targetName"
          :link-name="linkName"
        />
      </div>
    </div>
    <button
      class="modal-close is-large"
      @click="hideControlExplanationModal"
      aria-label="close"
    ></button>
  </div>
</template>

<style scoped>
th {
  font-weight: 700;
}
</style>
