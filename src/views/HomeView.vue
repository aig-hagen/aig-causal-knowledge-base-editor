<script setup lang="ts">
import TheTextEditor from '@/components/TheTextEditor.vue'
import TheEditor from '@/components/TheEditor.vue'
import TheNotifications from '@/components/TheNotifications.vue'
import { ref } from 'vue'

const showTextEditor = ref<boolean>(false)
</script>

<template>
  <main>
    <TheTextEditor v-if="showTextEditor" />
    <TheEditor v-model:showTextEditor="showTextEditor" />
    <TheNotifications />
  </main>
</template>

<style>
main {
  display: grid;
  grid-template-rows: 100vh;
  grid-template-columns: 768px 1fr;
}
</style>
