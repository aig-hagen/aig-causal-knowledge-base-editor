<script setup lang="ts">
import { nextTick, useTemplateRef, watchEffect } from 'vue'

const show = defineModel<boolean>('show', { required: true })

function hideControlExplanationModal() {
  show.value = false
}

const controlExplanationModal = useTemplateRef('control-explanation-modal')
watchEffect(() => {
  if (show.value) {
    void nextTick(() => {
      controlExplanationModal.value?.focus()
    })
  }
})
</script>

<template>
  <div
    ref="control-explanation-modal"
    :class="{ 'is-active': show }"
    tabindex="0"
    @keydown.esc="hideControlExplanationModal"
    class="modal control-explanation-modal"
  >
    <div class="modal-background" @click="hideControlExplanationModal"></div>
    <div class="modal-content">
      <div class="box">
        <table class="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Action</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Create atom</td>
              <td><kbd>Left double-click</kbd> on canvas</td>
            </tr>
            <tr>
              <td>Delete atom</td>
              <td><kbd>Right-click</kbd> on atom and hold</td>
            </tr>
            <tr>
              <td>Move atom</td>
              <td><kbd>Left-click</kbd> on atom, hold and drag</td>
            </tr>
            <tr>
              <td>Create relation</td>
              <td><kbd>Right-click</kbd> on atom, hold and drag towards port</td>
            </tr>
            <tr>
              <td>Delete relation</td>
              <td><kbd>Right-click</kbd> on relation and hold</td>
            </tr>
            <tr>
              <td>Pan</td>
              <td><kbd>Left-click</kbd> on canvas, hold and drag</td>
            </tr>
            <tr>
              <td>Zoom in/out</td>
              <td><kbd>Scroll wheel</kbd> on canvas</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button
      class="modal-close is-large"
      @click="hideControlExplanationModal"
      aria-label="close"
    ></button>
  </div>
</template>

<style scoped>
th {
  font-weight: 700;
}
</style>
