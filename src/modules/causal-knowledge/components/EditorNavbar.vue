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
import { computed, ref, useTemplateRef } from 'vue'
import ControlsExplanationModal from '@/modules/causal-knowledge/components/ControlsExplanationModal.vue'
import { hasOneEntry } from '@/modules/common/types'
import saveAs from 'file-saver'
import { useRouter } from 'vue-router'
import { NAV_SHOW_HINTS, NAV_SHOW_USERGUIDE_KEY } from '@/app/router'
import EditorNavbarHint from './EditorNavbarHint.vue'
import { useMediaQuery } from '@vueuse/core'
import EditorNavbarBurgerMenuHint from './EditorNavbarBurgerMenuHint.vue'
import {
  Menu,
  X,
  ChevronDown,
  FolderOpen,
  Download,
  Upload,
  BookOpen,
  FileText,
  CircleQuestionMark,
  Keyboard,
  ExternalLink,
  Tag,
  GitCommitHorizontal,
  Scale,
  Ellipsis,
} from '@lucide/vue'

export interface Dataset {
  name: string
  load(): void
}

const { title, getExportedData, loadFromFileData, datasets, controlElementNames, showHints } =
  defineProps<{
    title: string
    getExportedData?(): { data: unknown; fileNamePart: string }
    loadFromFileData?(loadFileData: () => Promise<{ fileName: string; fileText: string }>): void
    datasets: Dataset[]
    controlElementNames: {
      source: string
      target: string
      link: string
    }
    showHints: boolean
  }>()

const isAbove1024 = useMediaQuery('(min-width: 1024px)')
const textExamples = 'Open one of the examples to get started quickly.'
const textDocs = 'Find out more about features in the user guide.'
const textDocsWithConjunction = 'Or find out more about features in the user guide.'

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
const doShowHints = computed(() => {
  return showHints && router.currentRoute.value.meta[NAV_SHOW_HINTS] === true
})

const examplesMenuItemRef = useTemplateRef('examples')
const docsMenuItemRef = useTemplateRef('docs')
const userGuideMenuItemRef = useTemplateRef('userGuide')
const burgerMenuItemRef = useTemplateRef('burger')
</script>

<template>
  <nav
    class="navbar bg-base-100 border-base-300 relative z-20 max-w-[100vw] flex-wrap gap-x-2 gap-y-1 border-b px-2 shadow-sm sm:px-4"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="flex min-w-0 flex-1 items-center gap-3">
      <img
        src="@/app/logoaig2025_transparent.png"
        alt="Artificial Intelligence Group of the Faculty of Mathematics and Computer Science"
        class="h-8 w-auto shrink-0"
      />
      <span class="text-base-content min-w-0 truncate text-lg font-bold">{{ title }}</span>

      <button
        ref="burger"
        type="button"
        class="btn btn-ghost btn-square ml-auto lg:hidden"
        aria-label="Toggle menu"
        :aria-expanded="isNavbarBurgerActive"
        aria-controls="navbarEditor"
        @click="toogleNavbarBurgerActive"
      >
        <X v-if="isNavbarBurgerActive" class="size-5" aria-hidden="true" />
        <Menu v-else class="size-5" aria-hidden="true" />
      </button>

      <EditorNavbarHint
        v-if="doShowHints && !isNavbarBurgerActive && !isAbove1024"
        :reference="burgerMenuItemRef"
        :offset-y="64"
        >{{ textExamples }}<br />{{ textDocsWithConjunction }}</EditorNavbarHint
      >
    </div>

    <div
      id="navbarEditor"
      class="w-full flex-col gap-1 lg:flex lg:w-auto lg:flex-row lg:items-center"
      :class="isNavbarBurgerActive ? 'flex' : 'hidden'"
    >
      <div
        class="dropdown lg:dropdown-hover"
        v-if="getExportedData !== undefined || loadFromFileData !== undefined"
      >
        <div tabindex="0" role="button" class="btn btn-ghost btn-sm justify-start gap-1.5">
          <FolderOpen class="size-4" aria-hidden="true" />
          File
          <ChevronDown class="size-3.5 opacity-60" aria-hidden="true" />
        </div>
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box border-base-300 z-30 w-56 border p-2 shadow-lg"
        >
          <li v-if="getExportedData">
            <a @click="saveToFile()"><Download class="size-4" aria-hidden="true" />Save As...</a>
          </li>
          <li v-if="loadFromFileData">
            <a @click="triggerFileUpload()"
              ><Upload class="size-4" aria-hidden="true" />Open File...</a
            >
          </li>
          <input
            ref="file-input"
            type="file"
            class="hidden"
            accept="application/json"
            @change="loadFromFileInput($event)"
          />
        </ul>
      </div>

      <div class="dropdown lg:dropdown-hover" v-if="datasets.length > 0">
        <div tabindex="0" role="button" class="btn btn-ghost btn-sm justify-start gap-1.5">
          <BookOpen class="size-4" aria-hidden="true" />
          <span ref="examples">Example</span>
          <ChevronDown class="size-3.5 opacity-60" aria-hidden="true" />
        </div>
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box border-base-300 z-30 w-64 border p-2 shadow-lg"
        >
          <input
            ref="file-input"
            type="file"
            class="hidden"
            accept="application/json"
            @change="loadFromFileInput($event)"
          />
          <li v-for="dataset in datasets" :key="dataset.name">
            <a @click="dataset.load"
              ><FileText class="size-4" aria-hidden="true" /><span
                >Open <em>{{ dataset.name }}</em></span
              ></a
            >
          </li>
        </ul>
      </div>

      <EditorNavbarHint
        v-if="isAbove1024 && doShowHints"
        :reference="examplesMenuItemRef"
        :offset-y="128"
        >{{ textExamples }}</EditorNavbarHint
      >
      <EditorNavbarBurgerMenuHint
        v-if="isNavbarBurgerActive && !isAbove1024 && doShowHints"
        :reference="examplesMenuItemRef"
        :offset-x="64"
        >{{ textExamples }}</EditorNavbarBurgerMenuHint
      >

      <div class="dropdown lg:dropdown-hover">
        <div tabindex="0" role="button" class="btn btn-ghost btn-sm justify-start gap-1.5">
          <CircleQuestionMark class="size-4" aria-hidden="true" />
          <span ref="docs">Docs</span>
          <ChevronDown class="size-3.5 opacity-60" aria-hidden="true" />
        </div>
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box border-base-300 z-30 w-64 border p-2 shadow-lg"
        >
          <li>
            <a @click="isShowControlExplanationModal = true"
              ><Keyboard class="size-4" aria-hidden="true" />Controls</a
            >
          </li>
          <li v-if="showUserGuide">
            <a target="_blank" rel="noopener" href="/docs/user-guide.html">
              <BookOpen class="size-4" aria-hidden="true" />
              <span ref="userGuide">User Guide</span>
              <ExternalLink class="size-3.5 opacity-60" aria-hidden="true" />
            </a>
          </li>
          <li v-if="editorVersion !== undefined || editorCommit !== undefined">
            <hr class="border-base-300 my-1" />
          </li>
          <li v-if="editorVersion !== undefined">
            <a
              target="_blank"
              rel="noopener"
              :href="`https://github.com/aig-hagen/aig-causal-knowledge-base-editor/releases/tag/${editorVersion}`"
            >
              <Tag class="size-4" aria-hidden="true" />Version {{ editorVersion }}
              <ExternalLink class="size-3.5 opacity-60" aria-hidden="true" />
            </a>
          </li>
          <li v-if="editorCommit !== undefined">
            <a
              target="_blank"
              rel="noopener"
              :href="`https://github.com/aig-hagen/aig-causal-knowledge-base-editor/commit/${editorCommit}`"
            >
              <GitCommitHorizontal class="size-4" aria-hidden="true" />Commit {{ editorCommit }}
              <ExternalLink class="size-3.5 opacity-60" aria-hidden="true" />
            </a>
          </li>
          <li><hr class="border-base-300 my-1" /></li>
          <li>
            <a target="_blank" rel="noopener" href="/third-party-licenses">
              <Scale class="size-4" aria-hidden="true" />Third-Party Licenses
              <ExternalLink class="size-3.5 opacity-60" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
      <EditorNavbarHint
        v-if="isAbove1024 && doShowHints"
        :reference="docsMenuItemRef"
        :offset-y="224"
        >{{ textDocs }}</EditorNavbarHint
      >
      <EditorNavbarBurgerMenuHint
        v-if="isNavbarBurgerActive && !isAbove1024 && doShowHints"
        :reference="userGuideMenuItemRef"
        :offset-x="64"
      >
        {{ textDocs }}</EditorNavbarBurgerMenuHint
      >
      <div class="dropdown lg:dropdown-hover">
        <div tabindex="0" role="button" class="btn btn-ghost btn-sm justify-start gap-1.5">
          <Ellipsis class="size-4" aria-hidden="true" />
          More
        </div>
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box border-base-300 z-30 w-56 border p-2 shadow-lg"
        >
          <li>
            <a target="_blank" rel="noopener" href="http://agon.tweetyproject.org">
              AgonProject
              <ExternalLink class="size-3.5 opacity-60" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <ControlsExplanationModal
    v-model:show="isShowControlExplanationModal"
    :source-name="controlElementNames.source"
    :target-name="controlElementNames.target"
    :link-name="controlElementNames.link"
  />
</template>
