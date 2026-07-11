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
import { X } from '@lucide/vue'

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
    class="modal modal-open"
  >
    <div class="modal-box border-base-300 relative max-w-2xl border">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute top-3 right-3"
        @click="hideControlExplanationModal"
        aria-label="Close"
      >
        <X class="size-4" aria-hidden="true" />
      </button>
      <h3 class="mb-4 text-lg font-bold">Controls</h3>
      <ControlsExplanationTable
        :source-name="sourceName"
        :target-name="targetName"
        :link-name="linkName"
      />
    </div>
    <div class="modal-backdrop" @click="hideControlExplanationModal"></div>
  </div>
</template>
