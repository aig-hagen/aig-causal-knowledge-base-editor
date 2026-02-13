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
import EditorTab from '@/modules/causal-knowledge/components/EditorTab.vue'
import TheNotifications from '@/modules/common/components/TheNotifications.vue'
import EditorLayout from '@/modules/causal-knowledge/components/EditorLayout.vue'
import TheEvaluationConsole from '@/modules/causal-knowledge/components/TheEvaluationConsole.vue'
import EditorNavbar from '@/modules/causal-knowledge/components/EditorNavbar.vue'
import exampleDrowning from '@/modules/causal-knowledge/examples/drowning.json'
import exampleDiagnosis from '@/modules/causal-knowledge/examples/diagnosis.json'
import { computed, ref, useTemplateRef } from 'vue'
import type { Id } from '@/modules/causal-knowledge/graphicalCausalKnowledgeBase'
import ArgumentationGraphTab from '../components/ArgumentationGraphTab.vue'
import SequenceExplanationTab from '../components/SequenceExplanationTab.vue'
import { useKnowledgeBase } from '../stores/knowledgeBase'
import type { Literal } from '../composables/useEvaluationRequestPayload'
import {
  ARGUMENTATION_GRAPH_TAB,
  CAUSAL_MODAL_TAB,
  SEQUENCE_EXPLANATION_TAB,
  type Tab,
} from '../tabs'
import type { SequenceExplanationReply } from '../composables/useEvaluationRequest'

const knowledgeBase = useKnowledgeBase()
const observations = ref<Literal[]>([])
const assumptions = ref<Literal[]>([])
const sequenceExplanations = ref<SequenceExplanationReply | undefined>(undefined)

const activeTab = ref<Tab>(CAUSAL_MODAL_TAB)

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

const isArgumentationGraphTabActive = computed(() => activeTab.value === ARGUMENTATION_GRAPH_TAB)
const isSequenceExplnationTabActive = computed(() => activeTab.value === SEQUENCE_EXPLANATION_TAB)
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
      <div>
        <div class="tabs mb-0" :style="{ width: 'max-content' }">
          <ul>
            <li
              :class="{ 'is-active': activeTab === CAUSAL_MODAL_TAB }"
              @click="activeTab = CAUSAL_MODAL_TAB"
            >
              <a>Causal Model</a>
            </li>
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
              <a>Sequence Explanation</a>
            </li>
          </ul>
        </div>
        <EditorTab
          v-show="activeTab === CAUSAL_MODAL_TAB"
          ref="editor"
          :atom-ids-to-highlight="atomIdsToHighlight"
          :knowledge-base="knowledgeBase"
        />
        <ArgumentationGraphTab
          v-show="isArgumentationGraphTabActive"
          :is-active="isArgumentationGraphTabActive"
          :observations="observations"
          :assumptions="assumptions"
        />
        <SequenceExplanationTab
          v-show="isSequenceExplnationTabActive"
          :is-active="isSequenceExplnationTabActive"
          :sequenceExplanations="sequenceExplanations"
          :knowledge-base="knowledgeBase"
        />
      </div>
    </template>
    <template v-slot:sidebarRight>
      <TheEvaluationConsole
        v-model:atomIdsToHighlight="atomIdsToHighlightIndependentOnOpenEvaluationConsole"
        v-model:observations="observations"
        v-model:assumptions="assumptions"
        :knowledge-base="knowledgeBase"
        v-model:active-tab="activeTab"
        @update:sequence-explanations="($event) => (sequenceExplanations = $event)"
      />
    </template>
  </EditorLayout>
  <TheNotifications />
</template>

<style scoped></style>
