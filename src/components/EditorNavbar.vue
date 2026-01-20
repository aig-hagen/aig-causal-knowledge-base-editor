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
import { computed, ref, useTemplateRef } from 'vue'
import ControlsExplanation from '@/components/ControlsExplanation.vue'
import { hasOneEntry } from '@/misc/types'
import saveAs from 'file-saver'
import { useRouter } from 'vue-router'
import { NAV_MORE_NAME_KEY, NAV_SHOW_USERGUIDE_KEY } from '@/router'

export interface Dataset {
  name: string
  load(): void
}

const {
  title,
  getExportedData,
  loadFromFileData,
  datasets,
  showSidebarRight,
  sidebarRightName,
  controlElementNames,
} = defineProps<{
  title: string
  getExportedData?(): { data: unknown; fileNamePart: string }
  loadFromFileData?(loadFileData: () => Promise<{ fileName: string; fileText: string }>): void
  datasets: Dataset[]
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

  if (loadFromFileData === undefined) {
    throw Error('Illegal state: Trying to load data without specified load function.')
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

  if (getExportedData === undefined) {
    throw Error('Illegal state: Trying to export data without specified export function.')
  }

  const { data, fileNamePart } = getExportedData()
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
  const now = new Date()
  const fileName = `${pad(now.getFullYear(), 4)}-${pad(now.getMonth() + 1, 2)}-${pad(now.getDate(), 2)}.${fileNamePart}.json`
  saveAs(blob, fileName)
}

const router = useRouter()
const showUserGuide = computed(() => {
  return router.currentRoute.value.meta[NAV_SHOW_USERGUIDE_KEY] === true
})

const routesForMore = router.options.routes.filter(
  (route) => typeof route.meta?.[NAV_MORE_NAME_KEY] === 'string',
)
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
        <span class="title is-3 has-text-weight-bold"> {{ title }}</span>
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
        <div
          class="navbar-item has-dropdown is-hoverable"
          v-if="getExportedData !== undefined || loadFromFileData !== undefined"
        >
          <a class="navbar-link">File</a>
          <div class="navbar-dropdown">
            <a v-if="getExportedData" class="navbar-item" @click="saveToFile()">Save As...</a>
            <a v-if="loadFromFileData" class="navbar-item" @click="triggerFileUpload()"
              >Open File...</a
            >
            <input
              ref="file-input"
              type="file"
              v-show="false"
              accept="application/json"
              @change="loadFromFileInput($event)"
            />
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable" v-if="datasets.length > 0">
          <a class="navbar-link">Example</a>
          <div class="navbar-dropdown">
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
                >Open <em>{{ dataset.name }}</em></span
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
            <a
              v-if="showUserGuide"
              class="navbar-item"
              target="_blank"
              rel="noopener"
              href="/docs/user-guide.html"
            >
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
            <hr class="navbar-divider" />
            <a class="navbar-item" target="_blank" rel="noopener" href="/third-party-licenses">
              Third-Party Licenses &#8599;
            </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">More</a>

          <div class="navbar-dropdown">
            <a
              v-for="route in routesForMore"
              :key="route.path"
              class="navbar-item"
              target="_blank"
              rel="noopener"
              :href="route.path"
            >
              {{ route.meta?.[NAV_MORE_NAME_KEY] }} &#8599;
            </a>
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
