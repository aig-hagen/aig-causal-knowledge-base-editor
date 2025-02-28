<script setup lang="ts">
import { templateRef } from '@vueuse/core'
import { computed, onMounted, shallowRef, watchEffect } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { useKnowledgeBase } from '@/stores/knowledgeBase'

const monacoElement = templateRef('monaco-element')
const editorRef = shallowRef<monaco.editor.IStandaloneCodeEditor | null>(null)
const knowledgeBase = useKnowledgeBase()
const knowledgeBaseJson = computed(() => {
  return JSON.stringify(knowledgeBase.knowledgeBaseExport, null, 2)
})

onMounted(() => {
  editorRef.value = monaco.editor.create(monacoElement.value, {
    language: 'json',
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
    theme: 'vs-dark',
    mouseWheelZoom: true,
    fontSize: 18,
  })
})

watchEffect(() => {
  const editor = editorRef.value
  if (editor === null) return
  const model = editor.getModel()
  if (model === null) return
  model.setValue(knowledgeBaseJson.value)
})
</script>

<template>
  <div style="height: 100vh" ref="monaco-element"></div>
</template>
<style scoped></style>
