<script setup lang="ts">
import { useNotifications } from '@/stores/notifications'
// TODO animate in and out
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
      {{ notification.message }}
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
}
</style>
