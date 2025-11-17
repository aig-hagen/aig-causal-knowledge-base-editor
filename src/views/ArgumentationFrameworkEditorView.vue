<script setup lang="ts">
import { createArgumentationFramework } from '@/argumentation/argumentationFramework'
import ArgumentationFrameworkEditor from '@/argumentation/ArgumentationFrameworkEditor.vue'
import EvaluationConsole from '@/argumentation/EvaluationConsole.vue'
import EditorLayout from '@/components/EditorLayout.vue'
import EditorNavbar from '@/components/EditorNavbar.vue'
import TheNotifications from '@/components/TheNotifications.vue'
import { ref } from 'vue'

const sampleDatasets: { name: string; load(): void }[] = []
const argumentationFramework = ref(createArgumentationFramework())
const showEvaluationConsole = ref<boolean>(true)
</script>

<template>
  <EditorLayout :show-sidebar-right="showEvaluationConsole">
    <template v-slot:navbar>
      <EditorNavbar
        title="Argumentation Framework Editor"
        :datasets="sampleDatasets"
        sidebarRightName="evaluation console"
        :controlElementNames="{
          source: 'atom',
          target: 'port',
          link: 'relation',
        }"
        v-model:show-sidebar-right="showEvaluationConsole"
      />
    </template>
    <template v-slot:editor>
      <ArgumentationFrameworkEditor
        :argumentationFramework="argumentationFramework"
      ></ArgumentationFrameworkEditor>
    </template>
    <template v-slot:sidebarRight>
      <EvaluationConsole :argumentationFramework="argumentationFramework"></EvaluationConsole>
    </template>
  </EditorLayout>
  <TheNotifications />
</template>

<style scoped></style>
