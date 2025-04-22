<script setup lang="ts">
import TheTextEditor from '@/components/TheTextEditor.vue'
import TheEditor from '@/components/TheEditor.vue'
import TheNotifications from '@/components/TheNotifications.vue'
import { ref } from 'vue'
import TheEvaluationConsole from '@/components/TheEvaluationConsole.vue'

const showTextEditor = ref<boolean>(false)
const showEvaluationConsole = ref<boolean>(true)
</script>

<template>
  <main>
    <TheTextEditor v-if="showTextEditor" />
    <div class="editor-container" :class="{ 'evaluation-active': showEvaluationConsole }">
      <TheEditor
        v-model:showTextEditor="showTextEditor"
        v-model:showEvaluationConsole="showEvaluationConsole"
      />
    </div>
    <TheEvaluationConsole v-if="showEvaluationConsole" />
    <TheNotifications />
  </main>
</template>

<style>
main {
  display: grid;
  grid-template-rows: 100vh;
  grid-template-columns: 1fr 512px;
  grid-auto-flow: column;
}

.editor-container {
  grid-column: 1 / span 2;
}

.editor-container.evaluation-active {
  grid-column: 1 / span 1;
}
</style>
