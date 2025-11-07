<script setup lang="ts">
import EditorLayout from '@/components/EditorLayout.vue'
import EditorNavbar from '@/components/EditorNavbar.vue'
import TheNotifications from '@/components/TheNotifications.vue'

const sampleDatasets: { name: string; load(): void }[] = []
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
      <ArgumentationFrameworkEditorView></ArgumentationFrameworkEditorView>
    </template>
  </EditorLayout>
  <TheNotifications />
</template>

<style scoped></style>
