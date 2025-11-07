<script setup lang="ts">
import { createArgumentationFramework } from '@/argumentation/argumentationFramework'
import ArgumentationFrameworkEditor from '@/argumentation/ArgumentationFrameworkEditor.vue'
import EditorLayout from '@/components/EditorLayout.vue'
import EditorNavbar from '@/components/EditorNavbar.vue'
import TheNotifications from '@/components/TheNotifications.vue'
import { ref } from 'vue'

const sampleDatasets: { name: string; load(): void }[] = []
const argumentationFramework = ref(createArgumentationFramework())
</script>

<template>
  <EditorLayout :show-sidebar-right="false">
    <template v-slot:navbar>
      <EditorNavbar
        title="Argumentation Framework Editor"
        :datasets="sampleDatasets"
        :controlElementNames="{
          source: 'atom',
          target: 'port',
          link: 'relation',
        }"
        :show-sidebar-right="false"
      />
    </template>
    <template v-slot:editor>
      <ArgumentationFrameworkEditor
        :argumentationFramework="argumentationFramework"
      ></ArgumentationFrameworkEditor>
    </template>
  </EditorLayout>
  <TheNotifications />
</template>

<style scoped></style>
