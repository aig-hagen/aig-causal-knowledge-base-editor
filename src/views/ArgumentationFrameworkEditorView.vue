<script setup lang="ts">
import {
  createArgumentationFramework,
  getArguments,
  getAttacks,
} from '@/argumentation/argumentationFramework'
import ArgumentationFrameworkEditor from '@/argumentation/ArgumentationFrameworkEditor.vue'
import EvaluationConsole from '@/argumentation/EvaluationConsole.vue'
import type GraphicalArgumentationFrameworkDTO from '@/argumentation/GraphicalArgumentationFrameworkDTO'
import EditorLayout from '@/components/EditorLayout.vue'
import EditorNavbar from '@/components/EditorNavbar.vue'
import TheNotifications from '@/components/TheNotifications.vue'
import { ref, useTemplateRef } from 'vue'

const sampleDatasets: { name: string; load(): void }[] = []
const argumentationFramework = ref(createArgumentationFramework())
const showEvaluationConsole = ref<boolean>(true)

const editorRef = useTemplateRef('editor')

function getExportedData() {
  editorRef.value?.updatePositionsInArgumentationFramework()
  const allAguments = getArguments(argumentationFramework.value)
  const attacks = getAttacks(argumentationFramework.value)

  const data: GraphicalArgumentationFrameworkDTO = {
    arguments: allAguments.map((argument) => ({
      id: argument.id,
      name: argument.name,
      graphicalData: {
        shape: argument.graphicalData.shape,
        postions: {
          x: argument.graphicalData.position.x,
          y: argument.graphicalData.position.y,
        },
      },
    })),
    attacks: attacks.map(([attacker, attacked]) => ({
      attacker: attacker,
      attacked: attacked,
    })),
  }

  return {
    data: data,
    fileNamePart: 'argumentationFramework',
  }
}
</script>

<template>
  <EditorLayout :show-sidebar-right="showEvaluationConsole">
    <template v-slot:navbar>
      <EditorNavbar
        title="Argumentation Framework Editor"
        :get-exported-data="getExportedData"
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
      ></ArgumentationFrameworkEditor>
    </template>
    <template v-slot:sidebarRight>
      <EvaluationConsole :argumentationFramework="argumentationFramework"></EvaluationConsole>
    </template>
  </EditorLayout>
  <TheNotifications />
</template>

<style scoped></style>
