<script setup lang="ts">
import { useNotifications } from '@/stores/notifications'
const notifications = useNotifications()
</script>

<template>
  <div class="notifications">
    <div
      v-for="notification in notifications.notifications"
      :key="notification.id"
      :class="['notification', notification.type === 'error' ? 'is-danger' : 'is-success']"
    >
      <button
        v-if="notification.type === 'error'"
        class="delete"
        @click="notifications.removeNotification(notification.id)"
      ></button>
      <div style="white-space: pre-wrap">{{ notification.message }}</div>
    </div>
  </div>
</template>

<style scoped>
.notifications {
  max-width: 512px;
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1000;
}
</style>
