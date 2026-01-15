<script setup lang="ts">
import { createArgumentationFramework } from '@/argumentation/argumentationFramework'
import ArgumentationFrameworkEditor from '@/argumentation/ArgumentationFrameworkEditor.vue'
import EvaluationConsole from '@/argumentation/EvaluationConsole.vue'
import EditorLayout from '@/components/EditorLayout.vue'
import EditorNavbar, { type Dataset } from '@/components/EditorNavbar.vue'
import TheNotifications from '@/components/TheNotifications.vue'
import { ref, useTemplateRef } from 'vue'
import {
  deserializeFromDtoString,
  serializeToDto,
} from '@/argumentation/serialization/ArgumentationFrameworkDTO'
import { useNotifications } from '@/stores/notifications'
import datasets from '@/argumentation/examples'
const { addSuccessNotification, addErrorNotification, clearNotifications } = useNotifications()

const sampleDatasets: Dataset[] = datasets.map((dataset) => ({
  name: dataset.name,
  load() {
    argumentationFrameworkKeyCounter.value = argumentationFrameworkKeyCounter.value + 1
    argumentationFramework.value = dataset.load()
  },
}))
const argumentationFramework = ref(createArgumentationFramework())

// Key is used to render editor component and evaluation console from scratch after import.
const argumentationFrameworkKeyCounter = ref(0)
const showEvaluationConsole = ref<boolean>(true)

const editorRef = useTemplateRef('editor')

function getExportedData() {
  editorRef.value?.updatePositionsInArgumentationFramework()
  const dto = serializeToDto(argumentationFramework.value)
  return {
    data: dto,
    fileNamePart: 'argumentationFramework',
  }
}

async function loadArgumentationFramework(
  loadFileData: () => Promise<{ fileName: string; fileText: string }>,
) {
  const { fileName, fileText } = await loadFileData()
  const result = deserializeFromDtoString(fileText, fileName)
  if (!result.success) {
    clearNotifications()
    for (const error of result.errors) {
      addErrorNotification(error.message)
    }
    return
  }
  addSuccessNotification('Argumentation framework loaded successfully.')
  argumentationFrameworkKeyCounter.value = argumentationFrameworkKeyCounter.value + 1
  argumentationFramework.value = result.data
}
</script>

<template>
  <EditorLayout :show-sidebar-right="showEvaluationConsole">
    <template v-slot:navbar>
      <EditorNavbar
        title="Argumentation Framework Editor"
        :get-exported-data="getExportedData"
        :load-from-file-data="loadArgumentationFramework"
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
        ref="editor"
        :argumentationFramework="argumentationFramework"
        :key="argumentationFrameworkKeyCounter"
      ></ArgumentationFrameworkEditor>
    </template>
    <template v-slot:sidebarRight>
      <EvaluationConsole
        :argumentationFramework="argumentationFramework"
        :key="argumentationFrameworkKeyCounter"
      ></EvaluationConsole>
    </template>
  </EditorLayout>
  <TheNotifications />
</template>

<style scoped></style>
