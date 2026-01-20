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
