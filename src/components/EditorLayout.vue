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
    <aside v-if="$slots.sidebarRight" class="editor-layout-sidebar-right">
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
