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

  loadKnowledgeBase(loadFileData)
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
        title="Causal Knowledge Base Editor"
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

<style scoped></style>
