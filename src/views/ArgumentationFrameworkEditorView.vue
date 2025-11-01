<script setup lang="ts">
import ArgumentationFrameworkEditor from '@/argumentation/components/ArgumentationFrameworkEditor.vue'
import TheNotifications from '@/components/TheNotifications.vue'

const { previewFeatures } = defineProps<{
  previewFeatures: boolean
}>()
</script>

<template>
  <ArgumentationFrameworkEditor :preview-features="previewFeatures" />
  <TheNotifications />
</template>

<style></style>
