<script setup lang="ts">
import TheEditor from '@/components/TheEditor.vue'
import TheNotifications from '@/components/TheNotifications.vue'

const { previewFeatures } = defineProps<{
  previewFeatures: boolean
}>()
</script>

<template>
  <main>
    <TheEditor :preview-features="previewFeatures" />
    <TheNotifications />
  </main>
</template>

<style></style>
