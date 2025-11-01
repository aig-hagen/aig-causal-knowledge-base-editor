<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import ControlsExplanation from '@/components/ControlsExplanation.vue'
import { hasOneEntry } from '@/util/types'
import saveAs from 'file-saver'

const {
  getExportedData,
  loadFromFileData,
  datasets,
  showSidebarRight,
  sidebarRightName,
  controlElementNames,
} = defineProps<{
  getExportedData(): { data: unknown; fileNamePart: string }
  loadFromFileData(loadFileData: () => Promise<{ fileName: string; fileText: string }>): void
  datasets: { name: string; load(): void }[]
  showSidebarRight: boolean
  sidebarRightName?: string
  controlElementNames: {
    source: string
    target: string
    link: string
  }
}>()

const emit = defineEmits<{
  'update:showSidebarRight': [showSidebarRight: boolean]
}>()

const editorCommit = import.meta.env.VITE_EDITOR_COMMIT?.slice(0, 7)
const editorVersion = import.meta.env.VITE_EDITOR_VERSION

const isNavbarBurgerActive = ref<boolean>(false)
function toogleNavbarBurgerActive() {
  isNavbarBurgerActive.value = !isNavbarBurgerActive.value
}

const fileInput = useTemplateRef<HTMLInputElement>('file-input')

function triggerFileUpload() {
  fileInput.value?.click()
}

function loadFromFileInput(inputEvent: Event) {
  const input = inputEvent.target as HTMLInputElement
  const files = [...(input.files ?? [])]
  if (files.length === 0) return
  if (!hasOneEntry(files)) throw new Error('Only one file can be loaded at a time.')
  const file = files[0]

  async function loadFileData() {
    const text = await loadTextData(file)
    return { fileName: file.name, fileText: text }
  }

  loadFromFileData(loadFileData)
}

async function loadTextData(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      resolve(reader.result as string)
    })
    reader.addEventListener('error', () => {
      const error = reader.error
      if (error === null) {
        throw new Error('Error callback called but reader provided no error.')
      }
      reject(error)
    })
    reader.readAsText(file)
  })
}

function toogleSidebarRight() {
  emit('update:showSidebarRight', !showSidebarRight)
}

const isShowControlExplanationModal = ref(false)

function saveToFile() {
  function pad(value: number, maxLenght: number): string {
    return value.toString().padStart(maxLenght, '0')
  }

  const { data, fileNamePart } = getExportedData()
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
  const now = new Date()
  const fileName = `${pad(now.getFullYear(), 4)}-${pad(now.getMonth() + 1, 2)}-${pad(now.getDate(), 2)}.${fileNamePart}.json`
  saveAs(blob, fileName)
}
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item">
        <img
          src="@/assets/logoaig2025_transparent.png"
          alt="Artificial Intelligence Group of the Faculty of Mathematics and Computer Science"
        />
      </div>
      <div class="navbar-item pt-0">
        <span class="title is-3 has-text-weight-bold">Causal Knowledge Base Editor</span>
      </div>

      <a
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': isNavbarBurgerActive }"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarEditor"
        @click="toogleNavbarBurgerActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarEditor" class="navbar-menu" :class="{ 'is-active': isNavbarBurgerActive }">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Data</a>
          <div class="navbar-dropdown">
            <a class="navbar-item" @click="saveToFile()">Save to disk</a>
            <a class="navbar-item" @click="triggerFileUpload()">Load from disk</a>
            <input
              ref="file-input"
              type="file"
              v-show="false"
              accept="application/json"
              @change="loadFromFileInput($event)"
            />
            <a
              class="navbar-item"
              v-for="dataset in datasets"
              :key="dataset.name"
              @click="dataset.load"
              ><span
                >Load example <em>{{ dataset.name }}</em></span
              ></a
            >
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable" v-if="sidebarRightName !== undefined">
          <a class="navbar-link">View</a>

          <div class="navbar-dropdown">
            <a class="navbar-item" @click="toogleSidebarRight">
              {{ showSidebarRight ? 'Hide' : 'Show' }} {{ sidebarRightName }}
            </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Docs</a>

          <div class="navbar-dropdown">
            <a class="navbar-item" @click="isShowControlExplanationModal = true"> Controls </a>
            <a class="navbar-item" target="_blank" rel="noopener" href="/docs/user-guide.html">
              User guide &#8599;</a
            >
            <hr
              v-if="editorVersion !== undefined || editorCommit !== undefined"
              class="navbar-divider"
            />
            <a
              v-if="editorVersion !== undefined"
              class="navbar-item"
              target="_blank"
              rel="noopener"
              :href="`https://github.com/aig-hagen/aig-causal-knowledge-base-editor/releases/tag/${editorVersion}`"
            >
              Version {{ editorVersion }} &#8599;</a
            >
            <a
              v-if="editorCommit !== undefined"
              class="navbar-item"
              target="_blank"
              rel="noopener"
              :href="`https://github.com/aig-hagen/aig-causal-knowledge-base-editor/commit/${editorCommit}`"
            >
              Commit {{ editorCommit }} &#8599;</a
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
  <ControlsExplanation
    v-model:show="isShowControlExplanationModal"
    :source-name="controlElementNames.source"
    :target-name="controlElementNames.target"
    :link-name="controlElementNames.link"
  />
</template>

<style>
.navbar {
  border-bottom-right-radius: 4px;
  border-bottom: 2px solid black;
  border-right: 2px solid black;
}

@media (max-width: 1279px) {
  .navbar {
    border-bottom-right-radius: 0;
    border-right: none;
  }
}
</style>
