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
-->
<script setup lang="ts">
import {
  createArgumentationFramework,
  type Argument,
  type ArgumentationFramework,
} from '@/modules/argumentation/argumentationFramework'
import ArgumentationFrameworkEditor from '@/modules/argumentation/components/ArgumentationFrameworkEditor.vue'
import EvaluationConsole from '@/modules/argumentation/components/EvaluationConsole.vue'
import EditorLayout from '@/modules/causal-knowledge/components/EditorLayout.vue'
import EditorNavbar, { type Dataset } from '@/modules/causal-knowledge/components/EditorNavbar.vue'
import SequenceExplanationTab from '@/modules/argumentation/components/SequenceExplanationTab.vue'
import TheNotifications from '@/modules/common/components/TheNotifications.vue'
import { computed, ref, useTemplateRef } from 'vue'
import {
  deserializeFromDtoString,
  serializeToDto,
} from '@/modules/argumentation/serialization/ArgumentationFrameworkDTO'
import { useNotifications } from '@/modules/common/stores/notifications'
import datasets from '@/modules/argumentation/examples'
import type { DialectialSequenceExplanationDTO } from '@/modules/sequence-explanation/DialectialSequenceExplanationDTO'
import { ARGUMENTATION_GRAPH_TAB, SEQUENCE_EXPLANATION_TAB, type Tab } from '../tabs'
const { addSuccessNotification, addErrorNotification, clearNotifications } = useNotifications()

const activeTab = ref<Tab>(ARGUMENTATION_GRAPH_TAB)
const isSequenceExplnationTabActive = computed(() => activeTab.value === SEQUENCE_EXPLANATION_TAB)

const sampleDatasets: Dataset[] = datasets.map((dataset) => ({
  name: dataset.name,
  load() {
    setNewArgumentationFramework(dataset.load())
  },
}))
const argumentationFramework = ref(createArgumentationFramework())
const sequenceExplanations = ref<DialectialSequenceExplanationDTO[] | undefined>(undefined)

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
  setNewArgumentationFramework(result.data)
}

function setNewArgumentationFramework(newArgumentationFramework: ArgumentationFramework<Argument>) {
  // Argumentation graph tab needs to be visible before setting argumentation graph,
  // because the argumentation graph will be centered to view.
  // HACK This is only a quick fix for it and should better handled directly inside ArgumentationFrameworkEditor.
  activeTab.value = ARGUMENTATION_GRAPH_TAB
  argumentationFrameworkKeyCounter.value = argumentationFrameworkKeyCounter.value + 1
  argumentationFramework.value = newArgumentationFramework
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
      <div>
        <div class="tabs mb-0" :style="{ width: 'max-content' }">
          <ul>
            <li
              :class="{ 'is-active': activeTab === ARGUMENTATION_GRAPH_TAB }"
              @click="activeTab = ARGUMENTATION_GRAPH_TAB"
            >
              <a>Argumentation Graph</a>
            </li>
            <li
              :class="{ 'is-active': activeTab === SEQUENCE_EXPLANATION_TAB }"
              @click="activeTab = SEQUENCE_EXPLANATION_TAB"
            >
              <a>Sequence Explanations</a>
            </li>
          </ul>
        </div>
        <ArgumentationFrameworkEditor
          v-show="activeTab === ARGUMENTATION_GRAPH_TAB"
          ref="editor"
          :argumentationFramework="argumentationFramework"
          :key="argumentationFrameworkKeyCounter"
        ></ArgumentationFrameworkEditor>
        <SequenceExplanationTab
          v-show="isSequenceExplnationTabActive"
          :is-active="isSequenceExplnationTabActive"
          :argumentation-framework="argumentationFramework"
          :sequenceExplanations="sequenceExplanations"
        />
      </div>
    </template>
    <template v-slot:sidebarRight>
      <EvaluationConsole
        :argumentationFramework="argumentationFramework"
        :key="argumentationFrameworkKeyCounter"
        v-model:active-tab="activeTab"
        :is-active="isSequenceExplnationTabActive"
        @update:sequence-explanations="($event) => (sequenceExplanations = $event)"
      ></EvaluationConsole>
    </template>
  </EditorLayout>
  <TheNotifications />
</template>

<style scoped></style>
