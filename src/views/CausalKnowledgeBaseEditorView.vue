<script setup lang="ts">
import TheEditor from '@/components/TheEditor.vue'
import TheNotifications from '@/components/TheNotifications.vue'
import EditorLayout from '@/components/EditorLayout.vue'
import TheEvaluationConsole from '@/components/TheEvaluationConsole.vue'
import EditorNavbar from '@/components/EditorNavbar.vue'
import exampleDrowning from '@/assets/examples/drowning.json'
import exampleDiagnosis from '@/assets/examples/diagnosis.json'
import { computed, ref, useTemplateRef } from 'vue'
import type { Id } from '@/model/graphicalCausalKnowledgeBase'

const { previewFeatures } = defineProps<{
  previewFeatures: boolean
}>()

const editorRef = useTemplateRef('editor')

function getEditorRefValueOrFail() {
  const editorRefValue = editorRef.value
  if (editorRefValue === null) {
    throw Error('Editor ref is not set.')
  }
  return editorRefValue
}

function loadKnowledgeBase(loadFileData: () => Promise<{ fileName: string; fileText: string }>) {
  void getEditorRefValueOrFail().loadKnowledgeBase(loadFileData)
}

function getExportedData() {
  return getEditorRefValueOrFail().getExportedData()
}

const showEvaluationConsole = ref<boolean>(true)

function loadExampleDrowning() {
  function loadFileData() {
    return Promise.resolve({ fileName: 'drowning.json', fileText: JSON.stringify(exampleDrowning) })
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  void editorRef.value!.loadKnowledgeBase(loadFileData)
}

function loadExampleDiagnosis() {
  function loadFileData() {
    return Promise.resolve({
      fileName: 'diagnosis.json',
      fileText: JSON.stringify(exampleDiagnosis),
    })
  }

  loadKnowledgeBase(loadFileData)
}

const sampleDatasets = [
  {
    name: 'Diagnosis',
    load: loadExampleDiagnosis,
  },
  {
    name: 'Drowning',
    load: loadExampleDrowning,
  },
]

const atomIdsToHighlightIndependentOnOpenEvaluationConsole = ref<Id[]>([])

const atomIdsToHighlight = computed(() => {
  if (!showEvaluationConsole.value) {
    return []
  }
  return atomIdsToHighlightIndependentOnOpenEvaluationConsole.value
})
</script>

<template>
  <EditorLayout :show-sidebar-right="showEvaluationConsole">
    <template v-slot:navbar>
      <EditorNavbar
        :get-exported-data="getExportedData"
        :load-from-file-data="loadKnowledgeBase"
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
      <TheEditor ref="editor" :atom-ids-to-highlight="atomIdsToHighlight" />
    </template>
    <template v-slot:sidebarRight>
      <TheEvaluationConsole
        :preview-features="previewFeatures"
        v-model:atomIdsToHighlight="atomIdsToHighlightIndependentOnOpenEvaluationConsole"
      />
    </template>
  </EditorLayout>
  <TheNotifications />
</template>

<style></style>
