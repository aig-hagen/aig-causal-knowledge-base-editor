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
              <td>Create node</td>
              <td>Double-click</td>
            </tr>
            <tr>
              <td>Create link</td>
              <td>Right-click on node + hold + drag towards target</td>
            </tr>
            <tr>
              <td>Delete node/link</td>
              <td>Right-click + hold</td>
            </tr>
            <tr>
              <td>Move node</td>
              <td>Left-click + hold on node + drag</td>
            </tr>
            <tr>
              <td>Create/Update label</td>
              <td>Left-click on label</td>
            </tr>
            <tr>
              <td>Pan</td>
              <td>Left-click on canvas + hold + drag</td>
            </tr>
            <tr>
              <td>Zoom</td>
              <td>Mouse wheel</td>
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
