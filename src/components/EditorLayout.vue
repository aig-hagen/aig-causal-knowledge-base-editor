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
import { computed } from 'vue'

const { showSidebarRight } = defineProps<{
  showSidebarRight: boolean
}>()

const slots = defineSlots<{
  navbar(): unknown
  editor(): unknown
  sidebarRight?(): unknown
}>()

const isSidebarRightActive = computed(() => {
  return slots.sidebarRight !== undefined && showSidebarRight
})
</script>

<template>
  <div class="editor-layout" :class="{ 'sidebar-right-active': isSidebarRightActive }">
    <div class="editor-layout-navbar navbar-container">
      <slot name="navbar" />
    </div>
    <main class="editor-layout-editor">
      <slot name="editor" />
    </main>
    <aside v-show="isSidebarRightActive" class="editor-layout-sidebar-right">
      <slot name="sidebarRight" />
    </aside>
  </div>
</template>

<style scoped>
.editor-layout {
  display: grid;
  grid-template-rows: max-content 1fr;
  grid-template-columns: 1fr 512px;
  grid-auto-flow: column;
  height: 100vh;
}

.editor-layout-navbar {
  grid-row: 1;
  grid-column: 1 / span 2;
  width: max-content;
}

.editor-layout-editor {
  grid-row: 2;
  grid-column: 1 / span 2;
}

.editor-layout.sidebar-right-active > .editor-layout-editor {
  grid-row: 2;
  grid-column: 1;
}

.editor-layout.sidebar-right-active > .editor-layout-sidebar-right {
  grid-row: 1 / span 2;
  grid-column: 2;
  height: 100%;
  width: 100%;
  border-left: 2px solid black;
}

@media (max-width: 1279px) {
  .editor-layout-navbar {
    position: static;
    grid-column: 1 / span 2;
    width: unset;
  }

  .editor-layout.sidebar-right-active > .editor-layout-sidebar-right {
    grid-row: 2;
  }
}

.editor-layout-editor {
  position: relative;
  height: 100%;
}
</style>
